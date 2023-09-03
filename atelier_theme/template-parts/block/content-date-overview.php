<?php
// TODO: when clicking on next month, load dates of next month. When clicking back the dates are still there

/*------------------------------------*/
/* Block name: 	Terminübersicht
/*------------------------------------*/

$id = $anchor['id'] ?? $block['id'];

// ACF Fields
$uberschrift_h1 = get_field("uberschrift_h1");
$subline = get_field("subline");
$beschreibung = get_field("beschreibung");

$colors = [
    'course-child' => 'text-cyan-400',
    'course-adult' => 'text-indigo-600',
    'workshop' => 'text-red-500',
    'holiday_workshop' => 'text-yellow-500',
];

$categories = array_keys($colors);

// TODO: Create array with better structure for filters

$target_month = 9; // Hier kannst du den gewünschten Monat festlegen, z.B. 8 für August
$target_year = date('Y'); // Aktuelles Jahr

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
            'value'   => array($target_year . "-" . $target_month . "-01", $target_year . "-" . $target_month . "-31"), // Format: JJJJ-MM-TT
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
            'value'   => array($target_year . "-" . $target_month . "-01", $target_year . "-" . $target_month . "-31"), // Format: JJJJ-MM-TT
            'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
            'type'    => 'DATE',
        ),
        array(
            'key'     => 'date_2_date', // Name des ACF-Felds
            'value'   => array($target_year . "-" . $target_month . "-01", $target_year . "-" . $target_month . "-31"), // Format: JJJJ-MM-TT
            'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
            'type'    => 'DATE',
        ),
    ),
));

// Get data of dates
$workshopsDates = [];
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
            'value'   => array($target_year . "-" . $target_month . "-01", $target_year . "-" . $target_month . "-31"), // Format: JJJJ-MM-TT
            'compare' => 'BETWEEN', // Abgleich auf einen Wert zwischen dem 1. und letzten Tag des Monats
            'type'    => 'DATE',
        ),
        array(
            'key'     => 'date_2_date', // Name des ACF-Felds
            'value'   => array($target_year . "-" . $target_month . "-01", $target_year . "-" . $target_month . "-31"), // Format: JJJJ-MM-TT
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

$calenderGrid = generateCalendarGrid();
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

function generateCalendarGrid(Int $year = null, Int $month = null)
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
?>

<div id="<?php echo $id; ?>" class="hero-rounded">

    <?php get_template_part('template-parts/header-bar', '', array('type' => $websitMode, 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

    <div class="hero-rounded__content">

        <div class="hero-rounded__text">
            <?php if (!empty($uberschrift_h1)) : ?>
                <h1><?= $uberschrift_h1 ?></h1>
            <?php endif; ?>

            <?php if (!empty($subline)) : ?>
                <h5><?= $subline ?></h5>
            <?php endif; ?>

            <?php if (!empty($beschreibung)) : ?>
                <p><?= $beschreibung ?></p>
            <?php endif; ?>
        </div>

        <div id="date-overview__calendar" class="isolate grid grid-cols-7 gap-px bg-gray-200 border border-solid border-gray-200 w-[490px] rounded-[16px] text-center overflow-hidden text-sm">

            <!-- Month controls -->
            <button type="button" id="calendar__prev" class="col-span-1 relative bg-gray-50 py-1.5 hover:bg-gray-100 focus:z-10">
                <span class="mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold">
                    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 9L1.75 5L5.75 1" stroke="#001E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </button>
            <div class="font-extrabold uppercase leading-none bg-gray-50 col-span-5 flex justify-center items-center">
                <span id="calendar__month"><?= $month = date('F'); ?></span>
            </div>
            <button type="button" id="calendar__next" class="col-span-1 relative bg-gray-50 py-1.5 hover:bg-gray-100 focus:z-10">
                <span class="mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold">
                    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 1L5.25 5L1.25 9" stroke="#001E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </button>


            <!-- Weekdays -->
            <?php $weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']; ?>
            <?php foreach ($weekdays as $weekday) : ?>
                <span class="relative bg-gray-50 py-1.5 border-b border-gray-200">
                    <span class="mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"><?php echo $weekday ?></span>
                </span>
            <?php endforeach; ?>

            <!-- Days -->
            <?php foreach ($calenderGrid as $index => $date) : ?>
                <?php if ($date['currentMonth']) :
                    if (!empty($date['products'])) :
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
                ?>
                        <button type="button" id="calendar__day" class="group relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10" data-product-ids="<?= $productIds ?>" data-product-categories="<?= $productCategories ?>" data-date="<?= $date['date'] ?>" data-active="true">

                            <time class="mx-auto my-1 w-7 h-7 overflow-hidden relative rounded-lg border border-black border-opacity-5 flex-col justify-center items-center flex" datetime="<?= $date['date'] ?>" data-group="<?= $date['group'] ?>" data-category="<?= $product['category'] ?>">
                                <div class="text-white text-sm font-semibold uppercase leading-[14px] z-10"><?= $date['day'] ?></div>
                                <div class="absolute flex inset-0 rotate-45 scale-125 pointer-none bg-gray-300">
                                    <?php foreach ($products as $product) : ?>
                                        <div id="date-overview__calendar__product-part" class="h-full w-px flex-auto bg-current <?= $colors[$product['category']] ?> group-data-[active=false]:bg-gray-300 data-[active=false]:hidden" data-product-id="<?= $product['ID'] ?>" data-product-category="<?= $product['category'] ?>" data-active="true"></div>
                                    <?php endforeach; ?>
                                </div>
                            </time>

                        </button>

                    <?php else : ?>

                        <button type="button" class="relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                            <time datetime="<?= $date['date'] ?>" data-product-ids="<?= $productIds ?>" class="mx-auto flex h-9 w-9 items-center justify-center rounded-full"><?= $date['day'] ?></time>
                        </button>

                    <?php endif; ?>
                <?php else : ?>

                    <button type="button" class="relative bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                        <time datetime="<?= $date['date'] ?>" data-product-ids="<?= $productIds ?>" class="mx-auto flex h-9 w-9 items-center justify-center rounded-full"><?= $date['day'] ?></time>
                    </button>

                <?php endif; ?>
            <?php endforeach; ?>


        </div>

    </div>

    <?php get_template_part('template-parts/paper'); ?>
    <div class="hero-rounded__circle--new"></div>
</div>

<div class="inner">
    <div class="grid grid-cols-2 mt-8 gap-x-5 gap-y-12">
        <div class="row-start-2">
            <div class="mr-10 h-20 bg-gray-100 rounded-2xl"></div>
        </div>

        <div id="date-overview__filter" class="col-start-2 flex flex-wrap justify-center gap-x-5 gap-y-3">
            <?php foreach ($categories as $category) : ?>
                <div id="date-overview__filter__button" class="group items-center gap-2.5 flex cursor-pointer <?= $colors[$category] ?>" data-category="<?= $category ?>" data-active="true" data-selected="false">
                    <div class="relative w-2.5 aspect-square bg-current rounded-full group-data-[selected=true]:scale-[80%] group-data-[active=false]:text-gray-300">
                        <div class="hidden absolute -inset-1 border-2 border-solid border-current rounded-full group-data-[selected=true]:block group-data-[selected=true]:opacity-100"></div>
                    </div>
                    <p class="gap-1 flex leading-none text-sm text-main group-data-[active=false]:text-gray-300">
                        <b class="font-extrabold uppercase"><?= $category ?></b>
                        <span class="font-normal"></span>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="date-overview__list" class="w-full row-start-2 flex-1 ml-auto flex flex-col justify-start items-stretch gap-3.5">
            <div class="flex items-center gap-4">
                <span class="text-sm font-extrabold uppercase leading-none"><?= $month = date('F'); ?></span>
                <div class="h-px w-px flex-auto bg-gray-200"></div>
            </div>

            <?php foreach ($calenderGrid as $date) :
                $products = $date['products'] ?? false;

                // skip if no products
                if (!isset($products) || empty($products)) continue; ?>

                <?php foreach ($products as $product) : ?>
                    <div id="date-overview__list__item" class="bg-white rounded-2xl shadow border border-solid border-gray-200 justify-start items-stretch flex <?= $colors[$product['category']] ?> data-[active=false]:hidden" data-product-id="<?= $product['ID'] ?>" data-product-category="<?= $product['category'] ?>" data-date="<?= $date['date'] ?>">
                        <div class="w-20 p-5 bg-gray-50 border-r border-solid border-gray-200 flex flex-col items-center">
                            <div class="text-main text-[22px] font-bold uppercase leading-relaxed"><?= $date['day'] ?></div>
                            <div class="text-gray-300 text-xs font-bold uppercase leading-[13.80px]"><?= $date['month'] ?></div>
                        </div>
                        <div class="flex-auto px-6 py-4 justify-between items-center gap-2.5 flex">
                            <div class="flex-col justify-start items-start gap-1.5 inline-flex">
                                <div class="text-main text-base font-extrabold uppercase leading-[18.40px]"><?= $product['title'] ?></div>
                                <div class="text-current text-sm font-extrabold uppercase leading-none"><?= $product['category'] ?></div>
                            </div>
                            <div class="justify-start items-center gap-3.5 flex">
                                <div class="filter-button w-9 h-9 py-[18px] bg-gray-50 rounded-[10px] border border-gray-100 justify-center items-center gap-2.5 flex"></div>
                                <div class="w-9 h-9 py-[18px] bg-current rounded-[10px] justify-center items-center gap-2.5 flex">
                                    <div class="w-[15px] h-[15px] relative"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </div>
    </div>
</div>

</div>

<div class="space-extralarge"></div>