<?php
// // Funktion für die geplante Aufgabe
// function reset_holiday_workshop_schedule()
// {
//     // Code fired every day at 00:00
//     $bookable_from = get_field('bookable_from', 'holiday_workshop_options');
//     if ($bookable_from) $bookable_from = date('d.m.Y', strtotime($bookable_from));
//     if (date('d.m.Y') >= $bookable_from || !$bookable_from) {
//         // reset booking_scheduled
//         update_field('booking_scheduled', '0', 'holiday_workshop_options');
//         update_field('bookable_from', '', 'holiday_workshop_options');
//     }
// }

// // Funktion zum Planen der geplanten Aufgabe
// function planning_reset_holiday_workshop_schedule()
// {
//     if (!wp_next_scheduled('reset_holiday_workshop_schedule')) {
//         wp_schedule_event(time(), 'daily', 'reset_holiday_workshop_schedule');
//     }
// }

// // Hook, um die Funktionen zu registrieren
// add_action('init', 'planning_reset_holiday_workshop_schedule');
// add_action('reset_holiday_workshop_schedule', 'reset_holiday_workshop_schedule');
