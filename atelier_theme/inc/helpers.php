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

        function holiday_workshop_has_dates($postId): bool
        {
            $dates = get_field('dates', $postId);
            $booking_link = get_field('booking_link', $postId);
            return ($dates === '' || empty($dates) || !isset($booking_link)) ? false : true;
        }

        function get_booking_button($postId, $hasDates)
        {
            global $color;

            if ($hasDates) {
                $blocked = is_booking_scheduled();
                $booking_link = get_permalink($postId) . '#book';

                if (!$blocked) {
                    get_template_part('template-parts/button', '', array(
                        'button' => array(
                            'url' => $booking_link,
                            'title' => 'Jetzt Buchen',
                        ),
                        'icon' => 'bookmark',
                        'color' => $color
                    ));
                } else {
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
                        'color' => $postType === 'course' ? 'course-' . $group['value'] : $color
                    ));
                }
            } else {
                get_template_part('template-parts/button', '', array(
                    'button' => array(
                        'url' => '#',
                        'title' => 'Keine Termine',
                    ),
                    'icon' => 'calendar',
                    'disabled' => true,
                    'color' => $color
                ));
            }
        }

        function is_booking_scheduled(): bool
        {
            $blocked = get_field('booking_scheduled', 'holiday_workshop_options');
            $bookable_from = get_field('bookable_from', 'holiday_workshop_options');

            if (!$bookable_from) {
                $blocked = false;
            }
            // else {
            //     $blocked = $bookable_from;
            // }

            return $blocked;
        }

        function get_booking_schedule_date(): string
        {
            $bookable_from = get_field('bookable_from', 'holiday_workshop_options');
            $bookable_from = date('d.m.Y', strtotime($bookable_from));
            return $bookable_from;
        }

        // function is_future_date($date)
        // {
        //     $date = date('d/m/Y', $date);
        //     $today = date('d/m/Y');

        //     $compare = strcmp($date, $today);

        //     if ($compare > 0) {
        //         return true; // Das Datum liegt in der Zukunft
        //     } elseif ($compare === 0) {
        //         return false; // Das Datum ist heute
        //     } else {
        //         return false; // Das Datum liegt in der Vergangenheit
        //     }
        // }
