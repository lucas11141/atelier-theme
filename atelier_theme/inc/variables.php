<?php
define("BOOK_URL", "https://buchung.atelier-delatron.de");
// define("BOOK_URL", "http://localhost:4300");

// In functions.php oder einem benutzerdefinierten Theme-Plugin
function custom_setup_globals()
{
    global $websiteMode;
    $websiteMode = 'atelier';
}
add_action('init', 'custom_setup_globals');
