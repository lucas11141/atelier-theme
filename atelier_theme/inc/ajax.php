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

// Register ajax function for frontend
add_action('wp_ajax_get_date_overview_product_dates', 'get_date_overview_product_dates');
add_action('wp_ajax_nopriv_get_date_overview_product_dates', 'get_date_overview_product_dates');

// function render_date_overview_list_item()
// {
//     $date = get_field('date', $);
//     $date = new DateTime($date);
//     $date->setTimezone(new DateTimeZone('Europe/Berlin'));
//     $date->format('Y-m-d');

//     // get post with id
//     $product = array(
//         'date' => $date,
//         'product' => array(
//             'ID' => $course->ID,
//             'starttime' =>  get_field('starttime', 'course_time_' . $timeId),
//             'endtime' =>  get_field('endtime', 'course_time_' . $timeId),
//             'title' => $course->post_title,
//             'category' => $course->post_type . '-' . get_field('group', $course->ID)['value'],
//             'group' => get_field('group', $course->ID)
//         )
//     );

//     wp_send_json_success($product);
//     die();
//     return;

//     $content = 'Product ID: ' . $_POST['productId'];

//     // Hier den HTML-Inhalt Ihrer Komponente generieren
//     //     $content = '<div id="date-overview__list__item" class="bg-white rounded-2xl shadow border border-solid border-gray-200 justify-start items-stretch flex ' . $colors[$product['category']] . '" data-[active=false]:hidden" data-product-id="' . $product['ID'] . '" data-product-category="' . $product['category'] . '" data-date="' . $date['date'] . '">
//     //     <div class="w-20 p-5 bg-gray-50 border-r border-solid border-gray-200 flex flex-col items-center">
//     //         <div class="text-main text-[22px] font-bold uppercase leading-relaxed">' . $date['day'] . '</div>
//     //         <div class="text-gray-300 text-xs font-bold uppercase leading-[13.80px]">' . $date['month'] . '</div>
//     //     </div>
//     //     <div class="flex-auto px-6 py-4 justify-between items-center gap-2.5 flex">
//     //         <div class="flex-col justify-start items-start gap-1.5 inline-flex">
//     //             <div class="text-main text-base font-extrabold uppercase leading-[18.40px]">' . $product['title'] . '</div>
//     //             <div class="text-current text-sm font-extrabold uppercase leading-none">' . $product['category'] . '</div>
//     //         </div>
//     //         <div class="justify-start items-center gap-3.5 flex">
//     //             <div class="filter-button w-9 h-9 py-[18px] bg-gray-50 rounded-[10px] border border-gray-100 justify-center items-center gap-2.5 flex"></div>
//     //             <div class="w-9 h-9 py-[18px] bg-current rounded-[10px] justify-center items-center gap-2.5 flex">
//     //                 <div class="w-[15px] h-[15px] relative"></div>
//     //             </div>
//     //         </div>
//     //     </div>
//     // </div>';
//     echo $content;
// }

// // AJAX-Handler für Ihre Komponente registrieren
// add_action('wp_ajax_render_date_overview_list_item', 'render_date_overview_list_item');
// add_action('wp_ajax_nopriv_render_date_overview_list_item', 'render_date_overview_list_item');


// AJAX-Handler für Ihre Komponente registrieren
add_action('wp_ajax_render_calendar', 'renderCalendar');
add_action('wp_ajax_nopriv_render_calendar', 'renderCalendar');


function render_date_overview_calender_items()
{
    $year = $_POST['year'];
    $month = $_POST['month'];

    $calendarGrid = getCalendarGrid($year, $month);

    $content = renderCalendar($calendarGrid, $year, $month);

    echo $content;
}

add_action('wp_ajax_render_date_overview_calender_items', 'render_date_overview_calender_items');
add_action('wp_ajax_nopriv_render_date_overview_calender_items', 'render_date_overview_calender_items');
