<?php
/* ------------------------------------*\
/* Ajax
\* ------------------------------------*/

// Add ajaxurl to frontend
function myplugin_ajaxurl()
{
    echo '<script type="text/javascript">
    var ajaxurl = "' . admin_url('admin-ajax.php') . '";
    </script>';
}
add_action('wp_head', 'myplugin_ajaxurl');

// Get the calendar grid for the given month and year
function get_date_overview_product_dates()
{
    $productId = $_POST['productId'];

    // fetch product from wordpress api
    $product = wp_remote_get('https://dev.atelier-delatron.de/wp-json/wp/v2/kunstangebot/' . $productId);
    $product = json_decode($product['body'], true);

    if ($product['post_type'] === 'course') {
        $courseTimes = $product['times'];
    }

    wp_send_json_success($product);

    // $exampleCourse = array(
    //     'product' => array(
    //         'ID' => 1,
    //         'title' => 'Beispielkurs',
    //         'category' => 'course',
    //         'group' => array(
    //             'label' => 'Kinder',
    //             'value' => 'child'
    //         ),
    //         'times' => array(
    //             array(
    //                 'weekday' => 'Montag',
    //                 'starttime' => '16:00',
    //                 'endtime' => '17:00',
    //                 'dates' => array(
    //                     '2021-10-01',
    //                     '2021-10-08',
    //                     '2021-10-15',
    //                     '2021-10-22',
    //                     '2021-10-29',
    //                 )
    //             ),
    //             array(
    //                 'weekday' => 'Dienstag',
    //                 'starttime' => '16:00',
    //                 'endtime' => '17:00',
    //                 'dates' => array(
    //                     '2021-10-02',
    //                     '2021-10-09',
    //                     '2021-10-16',
    //                     '2021-10-23',
    //                     '2021-10-30',
    //                 )
    //             ),
    //             array(
    //                 'weekday' => 'Mittwoch',
    //                 'starttime' => '16:00',
    //                 'endtime' => '17:00',
    //                 'dates' => array(
    //                     '2021-10-03',
    //                     '2021-10-10',
    //                     '2021-10-17',
    //                     '2021-10-24',
    //                     '2021-10-31',
    //                 )
    //             ),
    //         )
    //     )
    // );
}
add_action('wp_ajax_get_date_overview_product_dates', 'get_date_overview_product_dates');
add_action('wp_ajax_nopriv_get_date_overview_product_dates', 'get_date_overview_product_dates');

// Get the calendar grid for the given month and year
function render_date_overview_calender_items()
{
    $year = $_POST['year'];
    $month = $_POST['month'];

    $calendarGrid = getCalendarGrid($year, $month);

    $content = getDateOverviewCalendarDays($calendarGrid, $year, $month);

    echo $content;
}

add_action('wp_ajax_render_date_overview_calender_items', 'render_date_overview_calender_items');
add_action('wp_ajax_nopriv_render_date_overview_calender_items', 'render_date_overview_calender_items');

// Get the calendar grid for the given month and year
function render_date_overview_calender_items_2()
{
    $year = $_POST['year'];
    $month = $_POST['month'];

    $calendarGrid = getCalendarGrid($year, $month);

    $content = getDateOverviewDaysList($calendarGrid, $year, $month);

    echo $content;
}

add_action('wp_ajax_render_date_overview_calender_items_2', 'render_date_overview_calender_items_2');
add_action('wp_ajax_nopriv_render_date_overview_calender_items_2', 'render_date_overview_calender_items_2');
