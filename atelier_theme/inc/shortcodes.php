<?php
// Shortcode Demo with Nested Capability
function atelier_shortcode_demo($atts, $content = null)
{
    return '<div class="shortcode-demo">' . do_shortcode($content) . '</div>'; // do_shortcode allows for nested Shortcodes
}

// Shortcode Demo with simple <h2> tag
function atelier_shortcode_demo_2($atts, $content = null) // Demo Heading H2 shortcode, allows for nesting within above element. Fully expandable.
{
    return '<h2>' . $content . '</h2>';
}

add_shortcode('atelier_shortcode_demo', 'atelier_shortcode_demo'); // You can place [atelier_shortcode_demo] in Pages, Posts now.
add_shortcode('atelier_shortcode_demo_2', 'atelier_shortcode_demo_2'); // Place [atelier_shortcode_demo_2] in Pages, Posts now.