<?php
function add_custom_api()
{
    // wordpress rest api callback function
    function findAllKunstangebote($request)
    {
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
    function findKunstangebot($request)
    {
        $postId = $request->get_param('postId');

        // query all posts of type course, workshop, birthday, event, holiday_workshop
        $args = array(
            'post_type' => array('course', 'workshop', 'birthday', 'event', 'holiday_workshop'),
            'p' => $postId,
        );

        $post = get_posts($args)[0] ?? null;

        if (!$post) wp_send_json_error(array('message' => 'Kunstangebot nicht gefunden'), 404);

        $post->acf = get_fields($postId);
        $post->thumbnail = get_the_post_thumbnail_url($postId, 'medium');
        $post->link = get_permalink($postId);

        if ($post->post_type === 'workshop') {
            // $dates = $post->acf->dates;
            $dates = get_field('dates', $postId);

            $dates = array_map(function ($date) {
                $date_1 = get_field('date_1', $date->ID);
                $date_1['date'] = strtotime($date_1['date']);
                $date_2 = get_field('date_2', $date->ID);
                $date_2['date'] = strtotime($date_2['date']);
                if ($date_2['date']) return [$date_1, $date_2];
                return [$date_1];
            }, $dates);

            $post->dates = $dates;
        }

        return $post;
    }
    register_rest_route('wp/v2', '/kunstangebot/(?P<postId>\d+)', array(
        'methods' => 'GET',
        'callback' => 'findKunstangebot',
    ));

    //
    function get_course_times($request)
    {
        $postId = $request->get_param('postId');

        // TODO Finde alle Termine für den Kurs

        wp_send_json(array('message' => 'Not implemented'), 501);
    }
    register_rest_route('wp/v2', '/course/(?P<postId>\d+)/times', array(
        'methods' => 'GET',
        'callback' => 'get_course_times',
    ));
}

add_action('rest_api_init', 'add_custom_api');
