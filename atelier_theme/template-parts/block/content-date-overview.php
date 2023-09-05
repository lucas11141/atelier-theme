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

$filterButtonLabels = array(
    'course-child' => array(
        'label' => 'Kurse',
        'group' => array(
            'value' => 'child',
            'label' => 'Kind',
        )
    ),
    'course-adult' => array(
        'label' => 'Kurse',
        'group' => array(
            'value' => 'adult',
            'label' => 'Erwachsene',
        )
    ),
    'workshop' => array(
        'label' => 'Workshops',
    ),
    'holiday_workshop' => array(
        'label' => 'Ferienprogramm',
    ),
);

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

        <div id="date-overview__calendar" class="isolate grid grid-cols-7 gap-px bg-gray-200 border border-solid border-gray-200 w-[490px] rounded-[16px] text-center overflow-hidden text-sm shadow-calendar">

            <!-- Month controls -->
            <button type="button" id="calendar__prev" class="col-span-1 relative bg-gray-50 py-1.5 hover:bg-gray-100 focus:z-10 data-[active=false]:opacity-20 data-[active=false]:pointer-events-none" data-active="false">
                <span class="mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold">
                    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 9L1.75 5L5.75 1" stroke="#001E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </button>
            <div class="font-extrabold uppercase leading-none bg-gray-50 col-span-5 flex justify-center items-center">
                <span id="calendar__month"><?= date('F'); ?></span>
            </div>
            <button type="button" id="calendar__next" class="col-span-1 relative bg-gray-50 py-1.5 hover:bg-gray-100 focus:z-10  data-[active=false]:opacity-20 data-[active=false]:pointer-events-none" data-active="true">
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
            <div id="date-overview__calendar__days" class="col-span-full grid grid-cols-7 gap-px full"></div>
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
                    <option value="">Produkt auswählen ...</option>
                </select>
            </div>

        </div>

        <div id="date-overview__filter" class="col-start-2 flex flex-wrap justify-center gap-x-5 gap-y-3">
            <?php foreach ($categories as $category) :
                $filterButtonLabel = $filterButtonLabels[$category];
            ?>
                <div id="date-overview__filter__button" class="group items-center gap-2.5 flex cursor-pointer <?= $colors[$category] ?>" data-category="<?= $category ?>" data-active="true" data-selected="false">
                    <div class="relative w-2.5 aspect-square bg-current rounded-full group-data-[selected=true]:scale-[80%] group-data-[active=false]:text-gray-300">
                        <div class="hidden absolute -inset-1 border-2 border-solid border-current rounded-full group-data-[selected=true]:block group-data-[selected=true]:opacity-100"></div>
                    </div>
                    <p class="gap-1 flex leading-none items-baseline text-sm text-main group-data-[active=false]:text-gray-300">
                        <b class="font-extrabold uppercase"><?= $filterButtonLabel['label'] ?></b>
                        <span class="font-normal"><?= isset($filterButtonLabel['group']) ? 'für ' . $filterButtonLabel['group']['label'] : '' ?></span>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="date-overview__list" class="w-full row-start-2 flex-1 ml-auto flex flex-col"></div>
    </div>
</div>

</div>

<div class="space-extralarge"></div>

<template id="template--date-overview__list__item">
    <div id="date-overview__list__item" class="mt-4 bg-white rounded-2xl shadow-calendar border border-solid border-gray-200 justify-start items-stretch flex <?= $colors[$product['category']] ?> overflow-hidden">
        <div class="w-20 p-5 bg-gray-50 border-r border-solid border-gray-200 flex flex-col items-center">
            <div template-day class="text-main text-[22px] font-bold uppercase leading-relaxed"></div>
            <div template-month class="text-gray-300 text-xs font-bold uppercase leading-[13.80px]"></div>
        </div>
        <div class="flex-auto px-6 py-4 justify-between items-center gap-2.5 flex">
            <div class="flex-col justify-start items-start gap-1.5 inline-flex">
                <div template-title class="text-main text-base font-extrabold uppercase leading-[18.40px]"></div>
                <div template-category class="text-current text-sm font-extrabold uppercase leading-none"></div>
            </div>
            <div class="justify-start items-center gap-3.5 flex">
                <button template-filter-button class="relative w-9 h-9 py-[18px] bg-gray-50 rounded-[10px] border border-solid border-gray-200 justify-center items-center gap-2.5 flex" role="button">
                    <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 1H1L6.6 7.83222V12.5556L9.4 14V7.83222L15 1Z" stroke="#042135" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <a template-booking-button class="relative w-9 h-9 py-[18px] bg-current rounded-[10px] justify-center items-center gap-2.5 flex">
                    <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.375 13.125L8 10L3.625 13.125V3.125C3.625 2.79348 3.7567 2.47554 3.99112 2.24112C4.22554 2.0067 4.54348 1.875 4.875 1.875H11.125C11.4565 1.875 11.7745 2.0067 12.0089 2.24112C12.2433 2.47554 12.375 2.79348 12.375 3.125V13.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<template id="template--date-overview__list__month">
    <div id="date-overview__list__month" class="mt-12 mb-1 flex gap-4 items-center first:mt-0">
        <span template-label class="text-sm font-extrabold uppercase leading-none"></span>
        <div class="w-px h-px flex-auto bg-gray-200"></div>
    </div>
</template>

<template id="template--date-overview__calendar__day--filled">
    <button type="button" id="date-overview__calendar__day--filled" class="group relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
        <time class="mx-auto my-1 w-7 h-7 overflow-hidden relative rounded-lg border border-black border-opacity-5 flex-col justify-center items-center flex">
            <div template-day class="text-white text-sm font-semibold uppercase leading-[14px] z-10"></div>
            <div id="date-overview__calendar__day__slide__color-container" class="absolute flex inset-0 rotate-45 scale-125 pointer-none bg-gray-300"></div>
        </time>
    </button>
</template>

<template id="template--date-overview__calendar__day__color-slice">
    <div id="date-overview__calendar__day__color-slice" class="h-full w-px flex-auto bg-current <?= $colors[$product['category']] ?> group-data-[active=false]:bg-gray-300 data-[active=false]:hidden"></div>
</template>

<template id="template--date-overview__calendar__day--empty">
    <button id="date-overview__calendar__day--empty" type="button" class="relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10 cursor-default">
        <time template-day class="mx-auto flex h-9 w-9 items-center justify-center rounded-full"></time>
    </button>
</template>

<template id="template--date-overview__calendar__day--other-month">
    <button id="date-overview__calendar__day--other-month" type="button" class="relative bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10 cursor-default">
        <time template-day class="mx-auto flex h-9 w-9 items-center justify-center rounded-full"></time>
    </button>
</template>