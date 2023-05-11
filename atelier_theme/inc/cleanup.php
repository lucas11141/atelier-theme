<?php
// Disable Author Page
function my_custom_disable_author_page()
{
    global $wp_query;

    if (is_author()) {
        // Redirect to homepage, set status to 301 permenant redirect. 
        // Function defaults to 302 temporary redirect. 
        wp_redirect(get_option('home'), 301);
        exit;
    }
}

// Disable Update E-Mails
function wpb_stop_update_emails($send, $type, $core_update, $result)
{
    if (!empty($type) && $type == 'success') {
        return false;
    }
    return true;
}

// Backend vergroessern
function custom_admin_css()
{
    echo '<style type="text/css">
    .wp-block { max-width: 1400px; }
    </style>';
}

// Remove Admin bar
function remove_admin_bar()
{
    return false;
}

// Remove invalid rel attribute values in the categorylist
function remove_category_rel_from_category_list($thelist)
{
    return str_replace('rel="category tag"', 'rel="tag"', $thelist);
}

// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes)
{
    global $post;
    if (is_home()) {
        $key = array_search('blog', $classes);
        if ($key > -1) {
            unset($classes[$key]);
        }
    } elseif (is_page()) {
        $classes[] = sanitize_html_class($post->post_name);
    } elseif (is_singular()) {
        $classes[] = sanitize_html_class($post->post_name);
    }

    return $classes;
}

// Remove 'text/css' from our enqueued stylesheet
function atelier_style_remove($tag)
{
    return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}



add_action('template_redirect', 'my_custom_disable_author_page');
add_action('admin_head', 'custom_admin_css');
add_filter('auto_core_update_send_email', 'wpb_stop_auto_update_emails', 10, 4);
add_filter('auto_plugin_update_send_email', '__return_false');
add_filter('send_password_change_email', '__return_false');
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('style_loader_tag', 'atelier_style_remove'); // Remove 'text/css' from enqueued stylesheet
add_filter('wpcf7_autop_or_not', '__return_false'); // Remove formating of cf7

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
