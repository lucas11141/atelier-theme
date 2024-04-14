<?php
function add_custom_api() {
    // // Set timezone to UTC
    // date_default_timezone_set('Europe/Berlin');

    // wordpress rest api callback function
    function findAllKunstangebote($request) {
        // query all posts of type course, workshop, birthday, event, holiday_workshop
        $args = array(
            'post_type' => array('course', 'workshop', 'birthday', 'event', 'holiday_workshop'),
            'posts_per_page' => -1,
            'post_status' => 'publish',
        );

        $posts = get_posts($args);

        foreach ($posts as $post) {
            $post->acf = get_fields($post->ID);
        }

        return $posts;
    }
    register_rest_route('wp/v2', '/kunstangebot', array(
        'methods' => 'GET',
        'callback' => 'findAllKunstangebote',
    ));

    //
    function findKunstangebot($request) {
        $postId = $request->get_param('postId');
        $postId = intval($postId);

        // query all posts of type course, workshop, birthday, event, holiday_workshop
        $args = array(
            'post_type' => array('course', 'workshop', 'birthday', 'event', 'holiday_workshop'),
            'p' => $postId,
        );

        $post = get_posts($args)[0] ?? null;

        // Error handling: Kunstangebot nicht gefunden
        if (!$post) wp_send_json_error(array('message' => 'Kunstangebot nicht gefunden'), 404);

        $postType = $post->post_type;

        $post->acf = get_fields($postId);
        $post->thumbnail = get_the_post_thumbnail_url($postId, 'medium');
        $post->link = get_permalink($postId);

        // Zusätzliche Daten für Kurse
        if ($postType === 'course') {
            // Sortiere Kurszeiten nach aufsteigender term_order
            $course_times = $post->acf["course_times"];

            // change array of ids to array of objects to be able to sort by term_order
            $course_times = array_map(function ($courseTimeId) {
                $term = get_term($courseTimeId, 'course_time');
                return $term;
            }, $course_times);

            usort($course_times, function ($a, $b) {
                // get term order of term_id $a and $b
                return $a->term_order - $b->term_order;
            });

            // Erweitere Kurszeiten mit den zugehörigen Terminen
            $course_times = array_map(function ($course_time_id) {
                $course_time_id = $course_time_id->term_id;

                $weekday = get_field('weekday', 'course_time_' . $course_time_id);

                $time = get_field('starttime', 'course_time_' . $course_time_id);
                $time = getUtcTimestamp($time);

                // get all dates by term_id of course_times
                $args = array(
                    'post_type' => 'course_date',
                    'posts_per_page' => -1,
                    'post_status' => 'publish',
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'course_time',
                            'field' => 'term_id',
                            'terms' => $course_time_id,
                        ),
                    ),
                );
                $dates = get_posts($args);
                $dates = array_map(function ($date) {
                    $dateId = $date->ID;
                    $date = get_field('date', $dateId);
                    $date = strtotime($date);

                    return array(
                        'id' => $dateId,
                        'date' => $date
                    );
                }, $dates);

                // remove all dates that are in the past
                $dates = array_filter($dates, function ($date) {
                    return $date['date'] >= strtotime('today');
                });
                // reset array keys
                $dates = array_values($dates);

                return array(
                    'id' => $course_time_id,
                    'weekday' => $weekday,
                    'utcTimestamp' => $time,
                    'dates' => $dates,
                );
            }, $course_times);

            // Numerate weekdays
            $course_times = numerateWeekdays($course_times);

            $post->times = $course_times;
        }

        // Zusätzliche Daten für Workshops
        if ($postType === 'workshop') {
            // $dates = $post->acf->dates;
            $dates = get_field('dates', $postId);

            if ($dates) {
                $dates = array_map(function ($dateId) {
                    $date_1 = get_field('date_1', $dateId);
                    $date_1['date'] = strtotime($date_1['date']);

                    // Filter out dates that are in the past
                    if ($date_1['date'] <= strtotime('today')) return null;

                    $date_2 = get_field('date_2', $dateId);
                    $date_2['date'] = strtotime($date_2['date']);

                    if ($date_2['date']) return [
                        'id' => $dateId,
                        'parts' => array($date_1, $date_2)
                    ];

                    return array(
                        'id' => $dateId,
                        'parts' => array($date_1)
                    );
                }, $dates);

                // remove all false dates
                $dates = array_filter($dates, function ($date) {
                    return $date;
                });
                // reset array keys
                $dates = array_values($dates);
            } else {
                $dates = [];
            }

            $post->dates = $dates;
        }

        if ($postType === 'event') {
            $pricing = get_field('pricing', $postType . '_options');
            $hours = array_map(function ($hour) {
                if (intval($hour["value"]) === 0) return null;
                return intval($hour["value"]);
            }, $pricing['hours']);
            $pricing["hours"] = $hours;
            $pricing["food"] = intval($pricing["food"]);
            $pricing["material"] = intval(get_field('pricing', $postId)['material']);
            $post->pricing = $pricing;

            $durations = get_field('durations', $postType . '_options');
            $post->durations = array_map(function ($duration) {
                return $duration["value"];
            }, $durations);
        }

        if (isset($post->acf['pricing'])) {
            // rename per_person to perPerson in $post->pricing object
            if (isset($post->acf['pricing']["per_person"])) {
                $post->acf['pricing']["perPerson"] = $post->acf['pricing']["per_person"];
                unset($post->acf['pricing']["per_person"]);
            }

            // conver all values of $post->acf['pricing'] into int values
            $post->acf['pricing'] = array_map(function ($value) {
                return intval($value);
            }, $post->acf['pricing']);
        }


        return $post;
    }
    register_rest_route('wp/v2', '/kunstangebot/(?P<postId>\d+)', array(
        'methods' => 'GET',
        'callback' => 'findKunstangebot',
    ));
}

add_action('rest_api_init', 'add_custom_api');
