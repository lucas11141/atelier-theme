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

            <div id="date-overview__calendar__days" class="col-span-full grid grid-cols-7 gap-px full" data-year="<?= $target_year ?>" data-month="<?= $target_month ?>">
                <!-- Days -->
                <?php foreach ($calendarGrid as $index => $date) : ?>
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
                            <button type="button" id="date-overview__calendar__day" class="group relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10" data-product-ids="<?= $productIds ?>" data-product-categories="<?= $productCategories ?>" data-date="<?= $date['date'] ?>" data-active="true">

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

                            <button id="date-overview__calendar__day" type="button" class="relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time datetime="<?= $date['date'] ?>" data-product-ids="<?= $productIds ?>" class="mx-auto flex h-9 w-9 items-center justify-center rounded-full"><?= $date['day'] ?></time>
                            </button>

                        <?php endif; ?>
                    <?php else : ?>

                        <button id="date-overview__calendar__day" type="button" class="relative bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                            <time datetime="<?= $date['date'] ?>" data-product-ids="<?= $productIds ?>" class="mx-auto flex h-9 w-9 items-center justify-center rounded-full"><?= $date['day'] ?></time>
                        </button>

                    <?php endif; ?>
                <?php endforeach; ?>
            </div>


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

        <div id="date-overview__list" class="w-full row-start-2 flex-1 ml-auto flex flex-col justify-start items-stretch gap-3.5">
            <div class="flex items-center gap-4">
                <span class="text-sm font-extrabold uppercase leading-none"><?= $month = date('F'); ?></span>
                <div class="h-px w-px flex-auto bg-gray-200"></div>
            </div>

            <?php foreach ($calendarGrid as $date) :
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