<?php

function translateString($string)
{
    $translations = array(
        'adult' => 'Erwachsene',
        'child' => 'Kinder',
        'course' => 'Kurs',
        'workshop' => 'Workshop',
        'birthday' => 'Kindergeburtstag',
        'event' => 'Kunstevent',
        'holiday_workshop' => 'Ferienworkshop',
    );

    return $translations[$string] ?? $string;
}


function load_product_colors($postType, $group = 'child'): string
{
    $color = "";
    if ($postType == 'course') : ?>
        <?php if ($group !== 'adult') :
            $color = "blue"; ?>
            <style>
                :root {
                    --product-color: #3fcad6;
                    --product-color-1: #3fcad6;
                    --product-color-2: #4248de;
                }
            </style>
        <?php else :
            $color = 'purple'; ?>
            <style>
                :root {
                    --product-color: #4248de;
                    --product-color-1: #3fcad6;
                    --product-color-2: #4248de;
                }
            </style>
        <?php endif; ?>
    <?php endif; ?>
    <?php if ($postType == 'workshop') {
        $color = "red";
    ?><style>
            :root {
                --product-color: #de332a;
                --product-color-1: #de332a;
                --product-color-2: #de332a;
            }
        </style><?php
            }
            if ($postType == 'birthday') {
                $color = "green";
                ?><style>
            :root {
                --product-color: #55d045;
                --product-color-1: #55d045;
                --product-color-2: #55d045;
            }
        </style><?php
            }
            if ($postType == 'event') {
                $color = "pink";
                ?><style>
            :root {
                --product-color: #b23cdf;
                --product-color-1: #b23cdf;
                --product-color-2: #b23cdf;
            }
        </style><?php
            }
            if ($postType == 'holiday_workshop') {
                $color = "yellow";
                ?><style>
            :root {
                --product-color: #eae22a;
                --product-color-1: #eae22a;
                --product-color-2: #eae22a;
            }
        </style><?php
            }
            return $color;
        }



        function get_course_dates(int $timeId): array
        {
            // Check if course_time has dates in the future
            $dates = get_field('dates', 'course_time_' . $timeId);

            if (!empty($dates)) {
                $dates = array_filter($dates, function ($dateId) {
                    return time() < strtotime(get_field('date', $dateId));
                });

                $dates = array_map(function ($dateId) {
                    $date = get_field('date', $dateId);
                    return strtotime($date);
                }, $dates);
            }

            if ($dates === '') return [];

            return $dates;
        }

        function course_has_dates($postId): bool
        {
            $hasDates = false;
            $course_times = get_field('course_times', $postId);

            foreach ($course_times as $time) {
                $dates = get_course_dates($time->term_id);
                if (!empty($dates)) $hasDates = true;
            }

            return $hasDates;
        }

        function workshop_has_dates($postId): bool
        {
            $dates = get_field('dates', $postId);
            return ($dates === '' || empty($dates)) ? false : true;
        }

        function get_booking_button($postId, $hasDates, $buttonColor)
        {
            if ($hasDates) {
                get_template_part('template-parts/button', '', array(
                    'button' => array(
                        'url' => get_permalink($postId) . '#book',
                        'title' => 'Jetzt Buchen',
                    ),
                    'icon' => 'bookmark',
                    'color' => $buttonColor
                ));
            } else {
                get_template_part('template-parts/button', '', array(
                    'button' => array(
                        'url' => '#',
                        'title' => 'Keine Termine',
                    ),
                    'icon' => 'calendar',
                    'disabled' => true,
                    'color' => $buttonColor
                ));
            }
        }
