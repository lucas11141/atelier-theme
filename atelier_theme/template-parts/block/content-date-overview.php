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

$target_month = date('n'); // Aktueller Monat
$target_year = date('Y'); // Aktuelles Jahr

$calendarGrid = getCalendarGrid($target_year, $target_month);

// TODO: sepeare calenderGrid and datesList?
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
                <span id="calendar__month"><?= date('F'); ?></span>
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

            <!-- Render the calender days component -->
            <?php getDateOverviewCalendarDays($calendarGrid, $target_year, $target_month) ?>
        </div>

    </div>

    <?php get_template_part('template-parts/paper'); ?>
    <div class="hero-rounded__circle--new"></div>
</div>

<div class="inner">
    <div class="grid grid-cols-2 mt-8 gap-x-5 gap-y-12">
        <div class="row-start-2">
            <div id="date-overview__selector" class="mr-10 h-20 bg-gray-100 rounded-2xl">
                <select>
                    <?php foreach ($allProducts as $product) : ?>
                        <option value="<?= $product['id'] ?>"><?= $product['title'] ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

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

        <div class="w-full row-start-2 flex-1 ml-auto">
            <div class="flex items-center gap-4">
                <span class="text-sm font-extrabold uppercase leading-none"><?= $month = date('F'); ?></span>
                <div class="h-px w-px flex-auto bg-gray-200"></div>
            </div>

            <div id="date-overview__list">
                <?php getDateOverviewDaysList($calendarGrid, $target_year, $target_month) ?>
            </div>
        </div>
    </div>
</div>

</div>

<div class="space-extralarge"></div>