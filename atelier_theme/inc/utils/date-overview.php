<?php
function getCalendarGrid($year, $month)
{
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
                'value'   => array($year . "-" . $month . "-01", $year . "-" . $month . "-31"), // Format: JJJJ-MM-TT
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
        $date->format('Y-m-d');

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
                    'group' => get_field('group', $course->ID)
                )
            );
        }
    }

    /* ------------------------------------ */
    /* Workshops
    /* ------------------------------------ */

    // TODO: Make shure to correctly display workshops with multiple dates

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
                'value'   => array($year . "-" . $month . "-01", $year . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
            array(
                'key'     => 'date_2_date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $year . "-" . $month . "-31"), // Format: JJJJ-MM-TT
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
        $date->format('Y-m-d');

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
                    'group' => get_field('group', $workshopId)
                )
            );
        }
    }

    /* ------------------------------------ */
    /* Holiday Workshops
    /* ------------------------------------ */

    // TODO: Make shure to correctly display workshops with multiple dates

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
                'value'   => array($year . "-" . $month . "-01", $year . "-" . $month . "-31"), // Format: JJJJ-MM-TT
                'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
                'type'    => 'DATE',
            ),
            array(
                'key'     => 'date_2_date', // Name des ACF-Felds
                'value'   => array($year . "-" . $month . "-01", $year . "-" . $month . "-31"), // Format: JJJJ-MM-TT
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
        $date->format('Y-m-d');

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
                    'group' => get_field('group', $workshopId)
                )
            );
        }
    }

    /* ------------------------------------ */
    /* Create Calendar Grid data
    /* ------------------------------------ */

    $calenderGrid = generateCalendarGrid($year, $month);
    $dates = array_merge($courseDates, $workshopDates, $holidayWorkshopDates);

    // map $dates to $calenderGrid
    foreach ($dates as $date) {
        $date['date'] = $date['date']->format('Y-m-d');

        foreach ($calenderGrid as $key => $day) {
            if ($date['date'] === $day['date']) {
                $calenderGrid[$key]['products'][] = $date['product'];
            }
        }
    }

    // Sort products by starttime
    // go through $calenderGrid and when products is given sort the items by starttime
    foreach ($calenderGrid as $key => $day) {
        if (isset($day['products']) && count($day['products']) > 1) {
            $products = $day['products'];
            usort($products, function ($a, $b) {
                $timeA = new DateTime($a['starttime']);
                $timeB = new DateTime($b['starttime']);
                // return $timeA <=> $timeB;
                return $timeB <=> $timeA;
            });
            $calenderGrid[$key]['products'] = $products;
        }
    }

    return $calenderGrid;
}

function generateCalendarGrid($year = null, $month = null)
{
    // Falls Jahr oder Monat nicht angegeben sind, verwende das aktuelle Datum
    if ($year === null || $month === null) {
        $today = new DateTime();
        $year = $today->format('Y');
        $month = $today->format('n');
    }

    // Erster Tag des angegebenen Monats und Jahres
    $firstDayOfMonth = new DateTime("$year-$month-01");

    // Erster Tag der Woche (z.B. Montag)
    $firstDayOfWeek = 1; // Montag (0 = Sonntag, 1 = Montag, usw.)

    // Festlegen des Startdatums unter Berücksichtigung des ersten Wochentags
    $startDate = clone $firstDayOfMonth;
    $startDate->modify('last monday');

    // Erzeuge das Grid
    $calendarGrid = array();

    while ($startDate->format('Y-m-d') <= $firstDayOfMonth->format('Y-m-t')) {
        $calendarGrid[] = [
            // 'date' => $startDate,
            'date' => $startDate->format('Y-m-d'),
            'day' => $startDate->format('d'),
            'month' => $startDate->format('m'),
            'currentMonth' => $startDate->format('m') == $month
        ];
        $startDate->modify('+1 day');
    }

    // Füge die ersten Tage des nächste Monats hinzu, um das Grid zu vervollständigen
    $endDate = clone $startDate;
    $endDate->modify('next monday');

    while ($startDate->format('Y-m-d') < $endDate->format('Y-m-d')) {
        $calendarGrid[] = [
            'date' => $startDate->format('Y-m-d'),
            'day' => $startDate->format('d'),
            'month' => $startDate->format('m'),
            'currentMonth' => $startDate->format('m') == $month
        ];
        $startDate->modify('+1 day');
    }
    return $calendarGrid;
}

function renderCalendar($calendarGrid, $year, $month)
{
    // TODO: globalize colors
    $colors = [
        'course-child' => 'text-cyan-400',
        'course-adult' => 'text-indigo-600',
        'workshop' => 'text-red-500',
        'holiday_workshop' => 'text-yellow-500',
    ];


    $content = '<div id="date-overview__calendar__days" class="col-span-full grid grid-cols-7 gap-px full" data-year="' . $year . '" data-month="' . $month . '">';

    foreach ($calendarGrid as $date) {
        if ($date['currentMonth']) {
            if (!empty($date['products'])) {
                $products = $date['products'];

                // safe product ids in one string
                $productIds = '';
                foreach ($products as $product) {
                    $productIds .= $product['ID'] . ',';
                }
                $productIds = rtrim($productIds, ',');

                $productCategories = '';
                foreach ($products as $product) {
                    $productCategories .= $product['category'] . ',';
                }
                $productCategories = rtrim($productCategories, ',');

                $content .= '
                <button type="button" id="date-overview__calendar__day" class="group relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10" data-product-ids="' . $productIds . '" data-product-categories="' . $productCategories . '" data-date="' . $date['date'] . '" data-active="true">
                    <time class="mx-auto my-1 w-7 h-7 overflow-hidden relative rounded-lg border border-black border-opacity-5 flex-col justify-center items-center flex" datetime="' . $date['date'] . '" data-group="' . $date['group'] . '" data-category="' . $date['category'] . '">
                        <div class="text-white text-sm font-semibold uppercase leading-[14px] z-10">' . $date['day'] . '</div>
                        <div class="absolute flex inset-0 rotate-45 scale-125 pointer-none bg-gray-300">
                        ';

                foreach ($products as $product) {
                    $content .= '<div id="date-overview__calendar__product-part" class="h-full w-px flex-auto bg-current ' . $colors[$product['category']] . ' group-data-[active=false]:bg-gray-300 data-[active=false]:hidden" data-product-id="' . $product['ID'] . '" data-product-category="' . $product['category'] . '" data-active="true"></div>';
                }

                $content .= '</div>
                    </time>
                </button>
                ';
            } else {

                $content .= '
                <button type="button" id="date-overview__calendar__day" class="relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                    <time datetime="' . $date['date'] . '" class="mx-auto flex h-9 w-9 items-center justify-center rounded-full">' . $date['day'] . '</time>
                </button>
                ';
            }
        } else {

            $content .= '
            <button type="button" id="date-overview__calendar__day" class="relative bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                <time datetime="' . $date['date'] . '" class="mx-auto flex h-9 w-9 items-center justify-center rounded-full">' . $date['day'] . '</time>
            </button>
            ';
        }
    }

    echo $content;
}
