<?php
function d(...$vars)
{
    echo '<pre>', var_dump(...$vars), '</pre>';
}

function dd(...$vars)
{
    echo '<pre>', var_dump(...$vars), '</pre>';
    die();
}

function substrwords($text, $maxchar, $end = '...')
{
    if (!$text) return;

    if (strlen($text) > $maxchar || $text == '') {
        $words = preg_split('/\s/', $text);
        $output = '';
        $i      = 0;
        while (1) {
            $length = strlen($output) + strlen($words[$i]);
            if ($length > $maxchar) {
                break;
            } else {
                $output .= " " . $words[$i];
                ++$i;
            }
        }
        $output .= $end;
    } else {
        $output = $text;
    }
    return $output;
}

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

function translateReadableDateToGerman($str)
{
    $searchVal = array("March", "May", "June", "July", "October", "December", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
    $replaceVal = array("März", "Mai", "Juni", "Juli", "Oktober", "Dezember", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");
    return str_replace($searchVal, $replaceVal, $str);
}

function get_paper_structure()
{
    $template_directory_uri = get_template_directory_uri();
    return "<img class='paper-structure' src='{$template_directory_uri}/assets/img/elements/paper_structure_500x.jpg' alt=''>";
    // src="https://atelier-delatron.de/wp-content/themes/atelier_theme/assets/img/paper_structure.webp"
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


        function product_has_dates($postId)
        {
            $postType = get_post_type($postId);
            $hasDates = false;

            if ($postType === 'birthday' || $postType === 'event') {
                $hasDates = true;
            }

            if ($postType === 'course') {
                $course_times = get_field('course_times', $postId);

                foreach ($course_times as $time) {
                    $dates = get_course_dates($time->term_id);
                    if (!empty($dates)) $hasDates = true;
                }
            }

            if ($postType === 'workshop' || $postType === 'holiday_workshop') {
                $dates = get_field('dates', $postId);

                // filter out dates that are not published
                if (!empty($dates)) {
                    $dates = array_filter($dates, function ($date) {
                        return $date->post_status === 'publish';
                    });
                }

                $hasDates = ($dates === '' || empty($dates)) ? false : true;
            }

            return $hasDates;
        }

        function get_course_dates(int $timeId): array
        {
            // Check if course_time has dates in the future
            $dates = get_field('dates', 'course_time_' . $timeId);

            // filter all dates that are not published
            if (!empty($dates)) {
                $dates = array_filter($dates, function ($dateId) {
                    return get_post_status($dateId) === 'publish';
                });
            }

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

        function get_booking_button($postId, $hasDates = false)
        {
            global $color;
            $buttonColor = $color;
            $postType = get_post_type($postId);

            if ($postType === 'course' && get_field('group')['value'] === 'adult') $buttonColor = 'purple';

            if ($hasDates) {
                $blocked = is_booking_scheduled();
                $booking_link = get_permalink($postId) . '#book';

                if ($postType === 'holiday_workshop' && $blocked) {
                    $bookable_from = get_field('bookable_from', 'holiday_workshop_options');
                    $bookable_from = date('d.m.Y', strtotime($bookable_from));
                    $postType = get_post_type($postId);
                    $group = get_field('group', $postId);

                    get_template_part('template-parts/button', '', array(
                        'button' => array(
                            'url' => $booking_link,
                            'title' => 'Buchung ab ' . $bookable_from,
                        ),
                        'icon' => 'bookmark',
                        'color' => $postType === 'course' ? 'course-' . $group['value'] : $buttonColor
                    ));

                    return;
                }

                get_template_part('template-parts/button', '', array(
                    'button' => array(
                        'url' => $booking_link,
                        'title' => 'Jetzt Buchen',
                    ),
                    'icon' => 'bookmark',
                    'color' => $buttonColor
                ));

                return;
            }

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

        function is_booking_scheduled(): bool
        {
            $blocked = get_field('booking_scheduled', 'holiday_workshop_options');
            $bookable_from = get_field('bookable_from', 'holiday_workshop_options');

            if (!$bookable_from) {
                $blocked = false;
            }

            return $blocked;
        }

        function get_booking_schedule_date(): string
        {
            $bookable_from = get_field('bookable_from', 'holiday_workshop_options');
            $bookable_from = date('d.m.Y', strtotime($bookable_from));
            return $bookable_from;
        }
