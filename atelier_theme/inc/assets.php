<?php
function atelier_styles()
{
    wp_register_style('normalize', get_template_directory_uri() . '/assets/css/normalize.min.css', array(), '1.1.0', 'all');
    wp_enqueue_style('normalize'); // Enqueue it!

    wp_register_style('atelierstyle', get_template_directory_uri() . '/assets/css/main.css', array(), '1.1.0', 'all');
    wp_enqueue_style('atelierstyle'); // Enqueue it!
}

function atelier_header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

        wp_register_script('atelierscripts', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.1.0'); // Custom scripts
        wp_enqueue_script('atelierscripts'); // Enqueue it!
    }
}

//Remove Gutenberg Block Library CSS from loading on the frontend
function wp_remove_wp_block_library_css()
{
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-block-style'); // Remove WooCommerce block CSS
}
add_action('wp_enqueue_scripts', 'wp_remove_wp_block_library_css', 100);
remove_filter('render_block', 'wp_render_layout_support_flag', 10, 2);

add_action('init', 'atelier_header_scripts');
add_action('wp_enqueue_scripts', 'atelier_styles');
