<?php
/*------------------------------------*/
/* AJAX */
/*------------------------------------*/

// Add ajaxurl to frontend
function myplugin_ajaxurl() {
    echo '<script type="text/javascript">
    var ajaxurl = "' . admin_url('admin-ajax.php') . '";
    </script>';
}

// Get all dates of a product
function date_overview_get_product_dates() {
    $productId = $_POST['productId'];
    $year = $_POST['year'];
    $month = $_POST['month'];

    $yearEnd = $year + 1;

    /* ------------------------------------ */
    /* Courses
    /* ------------------------------------ */

    // Query dates
    $courseDateIds = get_posts(array(
        'post_type' => 'course_date',
        'posts_per_page' => -1,
        'fields' => 'ids',

        // Get all dates of current month
        'meta_query'     => array(
            array(
                'key'     => 'date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $yearEnd . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
        ),
    ));

    // Get data of dates
    $courseDates = [];
    foreach ($courseDateIds as $dateId) {
        $date = get_field('date', $dateId);
        $date = new DateTime($date);
        $date->setTimezone(new DateTimeZone('Europe/Berlin'));
        $date = $date->format('Y-m-d'); // convert into string of format Y-m-d

        // get all courses of this date
        $courseTimes = get_field('course_time', $dateId);

        foreach ($courseTimes as $timeId) {
            $course = get_field('course', 'course_time_' . $timeId)[0];
            $courseDates[] = array(
                'date' => $date,
                'product' => array(
                    'ID' => $course->ID,
                    'starttime' =>  get_field('starttime', 'course_time_' . $timeId),
                    'endtime' =>  get_field('endtime', 'course_time_' . $timeId),
                    'title' => $course->post_title,
                    'category' => $course->post_type . '-' . get_field('group', $course->ID)['value'],
                    'group' => get_field('group', $course->ID),
                    'courseTimeId' => $timeId,
                    'weekday' => get_field('weekday', 'course_time_' . $timeId),
                    'bookingUrl' => BOOK_URL . '/?productId=' . $course->ID . '&courseTime=' . $timeId . '&startDate=' . $dateId,
                    'thumbnail' => get_the_post_thumbnail_url($course->ID, 'thumbnail')
                )
            );
        }
    }

    /* ------------------------------------ */
    /* Workshops
    /* ------------------------------------ */

    // Query dates
    $workshopDateIds = get_posts(array(
        'post_type' => 'workshop_date',
        'posts_per_page' => -1,
        'fields' => 'ids',

        // Get all items with date in current month
        'meta_query'     => array(
            'relation' => 'OR',
            array(
                'key'     => 'date_1_date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $yearEnd . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
            array(
                'key'     => 'date_2_date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $yearEnd . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
        ),
    ));

    // Get data of dates
    $workshopDates = [];
    foreach ($workshopDateIds as $dateId) {
        $dateField = get_field('date_1', $dateId);
        $date = new DateTime($dateField['date']);
        $date->setTimezone(new DateTimeZone('Europe/Berlin'));
        $date = $date->format('Y-m-d'); // convert into string of format Y-m-d

        // get all workshops of this date
        $workshops = get_field('workshop', $dateId);

        foreach ($workshops as $workshopId) {
            $workshopDates[] = array(
                'date' => $date,
                'product' => array(
                    'ID' => $workshopId,
                    'starttime' =>  $dateField['starttime'],
                    'endtime' =>  $dateField['endtime'],
                    'title' => get_the_title($workshopId),
                    'category' => get_post_type($workshopId),
                    'group' => get_field('group', $workshopId),
                    'bookingUrl' => BOOK_URL . '/?productId=' . $workshopId . '&workshopDate=' . $dateId,
                    'thumbnail' => get_the_post_thumbnail_url($course->ID, 'thumbnail')
                )
            );
        }
    }

    /* ------------------------------------ */
    /* Holiday Workshops
    /* ------------------------------------ */

    // Query dates
    $holidayWorkshopDateIds = get_posts(array(
        'post_type' => 'h_workshop_date',
        'posts_per_page' => -1,
        'fields' => 'ids',

        // Get all items with date in current month
        'meta_query'     => array(
            'relation' => 'OR',
            array(
                'key'     => 'date_1_date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $yearEnd . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
            array(
                'key'     => 'date_2_date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $yearEnd . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
        ),
    ));

    // Get data of dates
    $holidayWorkshopDates = [];
    foreach ($holidayWorkshopDateIds as $dateId) {
        $dateField = get_field('date_1', $dateId);
        $date = new DateTime($dateField['date']);
        $date->setTimezone(new DateTimeZone('Europe/Berlin'));
        $date = $date->format('Y-m-d'); // convert into string of format Y-m-d

        // get all workshops of this date
        $workshops = get_field('workshop', $dateId);

        foreach ($workshops as $workshopId) {
            $holidayWorkshopDates[] = array(
                'date' => $date,
                'product' => array(
                    'ID' => $workshopId,
                    'starttime' =>  $dateField['starttime'],
                    'endtime' =>  $dateField['endtime'],
                    'title' => get_the_title($workshopId),
                    'category' => get_post_type($workshopId),
                    'group' => get_field('group', $workshopId),
                    'bookingUrl' => BOOK_URL . '/?productId=' . $workshopId . '&workshopDate=' . $dateId,
                    'thumbnail' => get_the_post_thumbnail_url($course->ID, 'thumbnail')
                )
            );
        }
    }

    // Merge all dates
    $dates = array_merge($courseDates, $workshopDates, $holidayWorkshopDates);

    // Sort dates by date
    usort($dates, function ($a, $b) {
        return $a['date'] <=> $b['date'];
    });

    // // Sort products by starttime
    // // go through $calenderGrid and when products is given sort the items by starttime
    // foreach ($dates as $key => $day) {
    //     if (isset($day['products']) && count($day['products']) > 1) {
    //         $products = $day['products'];
    //         usort($products, function ($a, $b) {
    //             $timeA = new DateTime($a['starttime']);
    //             $timeB = new DateTime($b['starttime']);
    //             // return $timeA <=> $timeB;
    //             return $timeB <=> $timeA;
    //         });
    //         $calenderGrid[$key]['products'] = $products;
    //     }
    // }

    wp_send_json_success($dates);
}

/*------------------------------------*/
/* Hooks */
/*------------------------------------*/
add_action('wp_head', 'myplugin_ajaxurl');

add_action('wp_ajax_date_overview_get_product_dates', 'date_overview_get_product_dates');
add_action('wp_ajax_nopriv_date_overview_get_product_dates', 'date_overview_get_product_dates');
