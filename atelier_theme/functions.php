<?php
/*
 * Author: Lucas Delatron @atelier
 * URL: atelier-delatron.de
 *
 */

/*------------------------------------*\
	External Modules/Files
\*------------------------------------*/

// Load any external files you have here


/*------------------------------------*\
	WooCommerce Support
\*------------------------------------*/

function add_woocommerce_support()
{
    add_theme_support('woocommerce');
    /* add_theme_support( 'woocommerce', array(
        'thumbnail_image_width' => 520,
        'single_image_width' => 520,
        'gallery_thumbnail_image_width' => 520,
    ) ); */
}
add_action('after_setup_theme', 'add_woocommerce_support');


add_filter('woocommerce_enqueue_styles', '__return_empty_array');



require get_template_directory() . '/inc/helpers.php'; // Helper functions
require get_template_directory() . '/inc/api.php'; // API functions
require get_template_directory() . '/inc/variables.php'; // Variables





function prefix_nav_description($item_output, $item, $depth, $args)
{
    if (!empty($item->description)) {
        $item_output = str_replace($args->link_after . '</a>', '<p class="menu-item-description">' . $item->description . '</p>' . $args->link_after . '</a>', $item_output);
    }

    return $item_output;
}
add_filter('walker_nav_menu_start_el', 'prefix_nav_description', 10, 4);






/*------------------------------------*\
	Theme Support
\*------------------------------------*/

if (function_exists('acf_add_options_page')) {

    acf_add_options_page('atelier Theme Options');
}

if (!isset($content_width)) {
    $content_width = 900;
}

if (function_exists('add_theme_support')) {
    // Add Menu Support
    add_theme_support('menus');

    // Enables post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Localisation Support
    load_theme_textdomain('atelier', get_template_directory() . '/languages');
}

/*------------------------------------*\
	Functions
\*------------------------------------*/

// navigation
// Atelier: Hauptmenü (links)
function atelier_nav_left()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-left',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}
// Atelier: Hauptmenü (rechts)
function atelier_nav_right()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-right',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}
// Atelier: Hauptmenü Mobil (oben)
function atelier_nav_mobile_first()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-mobile-first',
            'menu'            => 'testmenu',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
} // Atelier: Hauptmenü Mobil (unten)
function atelier_nav_mobile_second()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-mobile-second',
            'menu'            => 'testmenu',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}
// Atelier: Footer-Menü
function atelier_footer_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-footer-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="footer__links">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}
// Atelier: Rechtsmenü
function atelier_law_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-law-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="nav--law">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}


// Shop: Hauptmenü (links)
function shop_nav_left()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-left',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}
// Shop: Hauptmenü (rechts)
function shop_nav_right()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-right',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}
// Shop: Hauptmenü Mobil (oben)
function shop_nav_mobile_first()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-mobile-first',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}
// Shop: Hauptmenü Mobil (unten)
function shop_nav_mobile_second()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-mobile-second',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}
// Shop: Footer-Menü
function shop_footer_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-footer-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="footer__links">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}
// Shop: Rechtsmenü
function shop_law_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-law-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="nav--law">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}








$template_directory_uri = get_template_directory_uri();






// Load scripts (header.php) 
function atelier_header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        wp_register_script('atelierscripts', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '06_12_22'); // Custom scripts
        wp_enqueue_script('atelierscripts'); // Enqueue it!
    }
}

// Load Blank styles
function atelier_styles()
{
    wp_register_style('normalize', get_template_directory_uri() . '/assets/css/normalize.min.css', array(), '29_11_22_2', 'all');
    wp_enqueue_style('normalize'); // Enqueue it!

    wp_register_style('atelierstyle', get_template_directory_uri() . '/assets/css/main.css', array(), '29_11_22_13', 'all');
    wp_enqueue_style('atelierstyle'); // Enqueue it!
}


//Remove Gutenberg Block Library CSS from loading on the frontend
function wp_remove_wp_block_library_css()
{
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-block-style'); // Remove WooCommerce block CSS
}
add_action('wp_enqueue_scripts', 'wp_remove_wp_block_library_css', 100);


// Register Navigation
function register_atelier_menu()
{
    register_nav_menus(array( // Using array to specify more menus if needed
        'atelier-header-menu-left' => __('Atelier: Hauptmenü (links)', 'atelier'), // Main Navigation
        'atelier-header-menu-right' => __('Atelier Hauptmenü (rechts)', 'atelier'), // Main Navigation
        'atelier-header-menu-mobile-first' =>  __('Atelier: Hauptmenü Mobil (oben)', 'atelier'), // Main Navigation,
        'atelier-header-menu-mobile-second' =>  __('Atelier: Hauptmenu Mobil (unten)', 'atelier'), // Main Navigation,
        'atelier-footer-menu' => __('Atelier: Footer-Menü', 'atelier'), // Main Navigation
        'atelier-law-menu' => __('Atelier: Rechtsmenü', 'atelier'), // Main Navigation

        'shop-header-menu-left' => __('Shop: Hauptmenü (links)', 'atelier'), // Main Navigation
        'shop-header-menu-right' => __('Shop Hauptmenü (rechts)', 'atelier'), // Main Navigation
        'shop-header-menu-mobile-first' =>  __('Shop: Hauptmenü Mobil (oben)', 'atelier'), // Main Navigation,
        'shop-header-menu-mobile-second' =>  __('Shop: Hauptmenu Mobil (unten)', 'atelier'), // Main Navigation,
        'shop-footer-menu' => __('Shop: Footer-Menü', 'atelier'), // Main Navigation
        'shop-law-menu' => __('Shop: Rechtsmenü', 'atelier'), // Main Navigation        
    ));
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '')
{
    $args['container'] = false;
    return $args;
}

// Remove Injected classes, ID's and Page ID's from Navigation <li> items
function my_css_attributes_filter($var)
{
    return is_array($var) ? array() : '';
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

// If Dynamic Sidebar Exists
if (function_exists('register_sidebar')) {
    // Define Sidebar Widget Area 1
    register_sidebar(array(
        'name' => __('Widget Area 1', 'atelier'),
        'description' => __('Description for this widget-area...', 'atelier'),
        'id' => 'widget-area-1',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
}

// Pagination for paged posts, Page 1, Page 2, Page 3, with Next and Previous Links, No plugin
function atelierwp_pagination()
{
    global $wp_query;
    $big = 999999999;
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', get_pagenum_link($big)),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $wp_query->max_num_pages
    ));
}

// Custom Excerpts
function atelierwp_index($length) // Create 20 Word Callback for Index page Excerpts, call using html5wp_excerpt('html5wp_index');
{
    return 20;
}

// Create 40 Word Callback for Custom Post Excerpts, call using html5wp_excerpt('html5wp_custom_post');
function atelierwp_custom_post($length)
{
    return 40;
}

// Create the Custom Excerpts callback
function atelierwp_excerpt($length_callback = '', $more_callback = '')
{
    global $post;
    if (function_exists($length_callback)) {
        add_filter('excerpt_length', $length_callback);
    }
    if (function_exists($more_callback)) {
        add_filter('excerpt_more', $more_callback);
    }
    $output = get_the_excerpt();
    $output = apply_filters('wptexturize', $output);
    $output = apply_filters('convert_chars', $output);
    $output = '<p>' . $output . '</p>';
    echo $output;
}

// Custom View Article link to Post
function atelier_blank_view_article($more)
{
    global $post;
    return '... <a class="view-article" href="' . get_permalink($post->ID) . '">' . __('View Article', 'atelier') . '</a>';
}

// Remove Admin bar
function remove_admin_bar()
{
    return false;
}

// Remove 'text/css' from our enqueued stylesheet
function atelier_style_remove($tag)
{
    return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}

// Remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
function remove_thumbnail_dimensions($html)
{
    $html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
    return $html;
}

// Custom Gravatar in Settings > Discussion
function ateliergravatar($avatar_defaults)
{
    $myavatar = get_template_directory_uri() . '/img/gravatar.jpg';
    $avatar_defaults[$myavatar] = "atelier Avatar";
    return $avatar_defaults;
}



/*------------------------------------*\
	Actions + Filters + ShortCodes
\*------------------------------------*/

// Add Actions
add_action('init', 'atelier_header_scripts'); // Add Custom Scripts to wp_head
add_action('wp_enqueue_scripts', 'atelier_styles'); // Add Theme Stylesheet
add_action('init', 'register_atelier_menu'); // Add HTML5 Blank Menu
add_action('init', 'atelierwp_pagination'); // Add our HTML5 Pagination

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

// Add Filters
add_filter('avatar_defaults', 'ateliergravatar'); // Custom Gravatar in Settings > Discussion
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('widget_text', 'do_shortcode'); // Allow shortcodes in Dynamic Sidebar
add_filter('widget_text', 'shortcode_unautop'); // Remove <p> tags in Dynamic Sidebars (better!)
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation
// add_filter('nav_menu_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected classes (Commented out by default)
// add_filter('nav_menu_item_id', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected ID (Commented out by default)
// add_filter('page_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> Page ID's (Commented out by default)
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('the_excerpt', 'shortcode_unautop'); // Remove auto <p> tags in Excerpt (Manual Excerpts only)
add_filter('the_excerpt', 'do_shortcode'); // Allows Shortcodes to be executed in Excerpt (Manual Excerpts only)
add_filter('excerpt_more', 'atelier_blank_view_article'); // Add 'View Article' button instead of [...] for Excerpts
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar
add_filter('style_loader_tag', 'atelier_style_remove'); // Remove 'text/css' from enqueued stylesheet
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter('image_send_to_editor', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to post images

// Remove Filters
remove_filter('the_excerpt', 'wpautop'); // Remove <p> tags from Excerpt altogether

// Shortcodes
add_shortcode('atelier_shortcode_demo', 'atelier_shortcode_demo'); // You can place [atelier_shortcode_demo] in Pages, Posts now.
add_shortcode('atelier_shortcode_demo_2', 'atelier_shortcode_demo_2'); // Place [atelier_shortcode_demo_2] in Pages, Posts now.


require get_template_directory() . '/inc/custom_post_type.php';


/*------------------------------------*\
	ShortCode Functions
\*------------------------------------*/

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

add_action('template_redirect', 'my_custom_disable_author_page');

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
add_filter('auto_core_update_send_email', 'wpb_stop_auto_update_emails', 10, 4);

function wpb_stop_update_emails($send, $type, $core_update, $result)
{
    if (!empty($type) && $type == 'success') {
        return false;
    }
    return true;
}
add_filter('auto_plugin_update_send_email', '__return_false');
add_filter('send_password_change_email', '__return_false');

// Backend vergroessern
function custom_admin_css()
{
    echo '<style type="text/css">
    .wp-block { max-width: 1400px; }
    </style>';
}
add_action('admin_head', 'custom_admin_css');


/********************************************
 ********************************************
              Register Blocks 
 ********************************************
 *******************************************/
function creat_category($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'inhaltselemente',
                'title' => __('Atelier Blöcke', 'inhaltselemente'),
            ),
        )
    );
}
add_filter('block_categories', 'creat_category', 10, 2);


require get_template_directory() . '/inc/blocks.php'; // register custom gutenberg blocks


function my_acf_block_render_callback($block)
{

    // convert name ("acf/testimonial") into path friendly slug ("testimonial")
    $slug = str_replace('acf/', '', $block['name']);

    // include a template part from within the "template-parts/block" folder
    if (file_exists(get_theme_file_path("/template-parts/block/content-{$slug}.php"))) {
        include(get_theme_file_path("/template-parts/block/content-{$slug}.php"));
    }
}








add_filter('wp_nav_menu_objects', 'my_menu_class');
function my_menu_class($menu)
{
    $level = 0;
    $stack = array('0');
    foreach ($menu as $key => $item) {
        while ($item->menu_item_parent != array_pop($stack)) {
            $level--;
        }
        $level++;
        $stack[] = $item->menu_item_parent;
        $stack[] = $item->ID;
        $menu[$key]->classes[] = 'level-' . ($level - 1);
    }
    return $menu;
}















































// Disable Image Links
add_action('after_setup_theme', 'default_attachment_display_settings');
function default_attachment_display_settings()
{
    update_option('image_default_link_type', 'none');
}






add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_category', 5);
add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_short_description', 15);
// Shop Item adding category
function woocommerce_atelier_loop_category()
{
    $terms = get_the_terms($post->ID, 'product_cat');
    if ($terms && !is_wp_error($terms)) :
        //only displayed if the product has at least one category
        $cat_links = array();
        foreach ($terms as $term) {
            $cat_links[] = $term->name;
        }
        $on_cat = join(" ", $cat_links);
?>
        <span class="product__category">
            <?php echo $on_cat; ?>
        </span>
    <?php endif;
}
function woocommerce_atelier_loop_short_description()
{
    $short_description = get_field("short_description", $product->id);
    if ($short_description) : ?>
        <p class="product__description"><?php echo $short_description; ?></p>
    <?php endif; ?>
    <?php }






// remove rating
remove_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5);






// add image to category banner
add_action('atelier_category_banner', 'woocommerce_atelier_category_thumbnail', 5);
function woocommerce_atelier_category_thumbnail()
{
    // verify that this is a product category page
    if (is_product_category()) {
        global $wp_query;

        // get the query object
        $cat = $wp_query->get_queried_object();

        // get the thumbnail id using the queried category term_id
        $thumbnail_id = get_term_meta($cat->term_id, 'thumbnail_id', true);

        // get the image URL
        $image = wp_get_attachment_url($thumbnail_id);

        // print the IMG HTML
        echo "<img src='{$image}' alt='' width='762' height='365' />";
    }
}






// Change number of related products
function woo_related_products_limit()
{
    global $product;

    $args['posts_per_page'] = 6;
    return $args;
}
add_filter('woocommerce_output_related_products_args', 'jk_related_products_args');
function jk_related_products_args($args)
{
    $args['posts_per_page'] = 6; // 4 related products
    $args['columns'] = 1; // arranged in 2 columns
    return $args;
}






// remove single-product information
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
remove_action('woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15);


add_filter('woocommerce_product_tabs', 'woo_remove_product_tabs', 98);
function woo_remove_product_tabs($tabs)
{
    unset($tabs['additional_information']);
    return $tabs;
}




add_filter('woocommerce_get_image_size_gallery_thumbnail', function ($size) {
    return array(
        'width' => 520,
        'height' => 520,
        'crop' => 0,
    );
});






// Nav Cart Icon - Update Count
add_filter('woocommerce_add_to_cart_fragments', 'atelier_add_to_cart_fragment');
function atelier_add_to_cart_fragment($fragments)
{
    global $woocommerce;
    $fragments['.nav__cart__quantity'] = '<div class="nav__cart__quantity"><span>' .  $woocommerce->cart->cart_contents_count . '</span></div>';
    return $fragments;
}






// Breadcrumb Settings
add_filter('woocommerce_breadcrumb_defaults', 'atelier_breadcrumbs_settings');
function atelier_breadcrumbs_settings()
{
    return array(
        'delimiter'   => ' <span>&#47;</span> ',
        'wrap_before' => '<nav class="woocommerce-breadcrumb" itemprop="breadcrumb">',
        'wrap_after'  => '</nav>',
        'before'      => '',
        'after'       => '',
        'home'        => 'Shop',
    );
}
add_filter('woocommerce_breadcrumb_home_url', 'atelier_custom_breadrumb_home_url');
function atelier_custom_breadrumb_home_url()
{
    return 'http://kunstausdertuete.de/shop';
}






//Produktseite anpassungen
add_action('woocommerce_single_product_summary', 'atelier_custom_field_short_description', 8);
add_action('woocommerce_single_product_summary', 'atelier_custom_field_delivery_info', 35);
add_action('woocommerce_single_product_summary', 'atelier_custom_field_bulletpoints', 45);
add_action('woocommerce_single_product_summary', 'atelier_custom_field_quote', 46);
add_action('woocommerce_single_product_summary', 'atelier_custom_field_accordeon', 47);

function atelier_custom_field_short_description()
{
    global $product;
    $short_description = get_field("short_description", $product->get_id());
    // $short_description = get_the_excerpt( $product->get_id() );
    if (!empty($short_description)) {
    ?>
        <span class="short__description"><?= $short_description ?></span>
    <?php
    }
}

function atelier_custom_field_delivery_info()
{
    ?>
    <p class="delivery__info"><?php echo get_field("versandinformationen_kurz", "options"); ?></p>
    <?php
}

function atelier_custom_field_quote()
{
    $spruch_aktivieren = get_field('spruch_aktivieren');
    $spruch_uberschrift = get_field('spruch_uberschrift');
    $spruch = get_field('spruch');
    if ($spruch_aktivieren && $spruch) : ?>
        <div class="product__quote">
            <h4><?= $spruch_uberschrift ?></h4>
            <blockquote><?= $spruch ?></blockquote>
        </div>
    <?php endif;
}

function atelier_custom_field_bulletpoints()
{
    global $product;
    $uberschrift = get_field('uberschrift');
    if (!empty($uberschrift) || have_rows('stichpunkte')) : ?>
        <div class="product__bulletpoints">
            <?php //echo $product->get_short_description(); 
            ?>
            <?php if (!empty($uberschrift)) : ?>
                <h4><?php echo $uberschrift; ?></h4>
            <?php endif;
            if (have_rows('stichpunkte')) : ?>
                <ul>
                    <?php while (have_rows('stichpunkte')) : the_row();
                        $punkt = get_sub_field('punkt');
                    ?>
                        <li>
                            <img class="--ll-disabled" src="<?php echo get_template_directory_uri(); ?>/img/shop/bullet_checkmark.svg" alt="">
                            <span><?php echo $punkt; ?></span>
                        </li>
                    <?php
                    endwhile; ?>
                </ul>
            <?php endif; ?>
        </div>
    <?php
    endif;
}

function atelier_custom_field_accordeon()
{ ?>
    <div class="accordeon">
        <?php global $product; ?>

        <?php if (!empty(get_field("lieferumfang"))) : ?>
            <div class="accordeon__item accordeon--lieferumfang">
                <dt class="accordeon__header">
                    <h5>Lieferumfang</h5>
                    <div class="button__plusminus">
                        <div></div>
                        <div></div>
                    </div>
                </dt>
                <dd class="accordeon__content">
                    <div>
                        <?php if (have_rows('lieferumfang')) : ?>
                            <ul>
                                <?php while (have_rows('lieferumfang')) : the_row();
                                    $inhalt = get_sub_field('inhalt');
                                ?>
                                    <li><?php echo $inhalt; ?></li>
                                <?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                        <?php if (have_rows('weiteres_material')) : ?>
                            <h5>Weiteres Material</h5>
                            <ul>
                                <?php while (have_rows('weiteres_material')) : the_row();
                                    $inhalt = get_sub_field('inhalt');
                                ?>
                                    <li><?php echo $inhalt; ?></li>
                                <?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                    <div class="content__logotext">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/logo_kunsttuete_hell.svg" alt="Kunsttüte Logo">
                        <p>Eine ganz neue Möglichkeit seine Kreativität Zuhause auszuleben!</p>
                    </div>
                </dd>
            </div>
        <?php endif; ?>

        <?php if ($product->get_description() !== "") : ?>
            <div class="accordeon__item">
                <dt class="accordeon__header">
                    <h5>Beschreibung</h5>
                    <div class="button__plusminus"></div>
                </dt>
                <dd class="accordeon__content">
                    <?= wpautop($product->get_description()); ?>
                </dd>
            </div>
        <?php endif; ?>

        <?php if ($product->has_dimensions()) : ?>
            <div class="accordeon__item">
                <dt class="accordeon__header">
                    <h5>Produktgröße<?php /* echo __( 'Dimensions', 'woocommerce' ); */ ?></h5>
                    <div class="button__plusminus">
                        <div></div>
                        <div></div>
                    </div>
                </dt>
                <dd class="accordeon__content">
                    <div>
                        <ul>
                            <?php
                            $dimensions = $product->get_dimensions(false);
                            if ($dimensions["length"] != "") :
                            ?> <li><strong>Länge:</strong> <?php echo $dimensions["length"]; ?>cm</li> <?php
                                                                                                    endif;
                                                                                                    if ($dimensions["width"] != "") :
                                                                                                        ?> <li><strong>Breite:</strong> <?php echo $dimensions["width"]; ?>cm</li> <?php
                                                                                                                                                                                endif;
                                                                                                                                                                                if ($dimensions["height"] != "") :
                                                                                                                                                                                    ?> <li><strong>Höhe:</strong> <?php echo $dimensions["height"]; ?>cm</li> <?php
                                                                                                                                                                                                                                                            endif;
                                                                                                                                                                                                                                                                ?>
                        </ul>
                    </div>
                </dd>
            </div>
        <?php endif; ?>

        <?php if (!empty(get_field("versandinformationen_lang", "options"))) : ?>
            <div class="accordeon__item">
                <dt class="accordeon__header">
                    <h5>Versand & Rückversand</h5>
                    <div class="button__plusminus"></div>
                </dt>
                <dd class="accordeon__content">
                    <?php echo get_field("versandinformationen_lang", "options") ?>
                </dd>
            </div>
        <?php endif; ?>

        <?php if (have_rows('kacheln')) :
            while (have_rows('kacheln')) : the_row();
                $uberschrift = get_sub_field('uberschrift');
                $inhalt = get_sub_field('inhalt'); ?>

                <div class="accordeon__item">
                    <dt class="accordeon__header">
                        <h5><?php echo $uberschrift; ?></h5>
                        <div class="button__plusminus"></div>
                    </dt>
                    <dd class="accordeon__content">
                        <?php echo $inhalt; ?>
                    </dd>
                </div>

        <?php endwhile;
        endif; ?>

    </div> <?php
        }






        //Warenkorb - Item Mengenauswahl als Select Input
        function woocommerce_quantity_input($args = array(), $product = null, $echo = true)
        {

            if (is_null($product)) {
                $product = $GLOBALS['product'];
            }

            $defaults = array(
                'input_id' => uniqid('quantity_'),
                'input_name' => 'quantity',
                'input_value' => '1',
                'classes' => apply_filters('woocommerce_quantity_input_classes', array('input-text', 'qty', 'text'), $product),
                'max_value' => apply_filters('woocommerce_quantity_input_max', -1, $product),
                'min_value' => apply_filters('woocommerce_quantity_input_min', 0, $product),
                'step' => apply_filters('woocommerce_quantity_input_step', 1, $product),
                'pattern' => apply_filters('woocommerce_quantity_input_pattern', has_filter('woocommerce_stock_amount', 'intval') ? '[0-9]*' : ''),
                'inputmode' => apply_filters('woocommerce_quantity_input_inputmode', has_filter('woocommerce_stock_amount', 'intval') ? 'numeric' : ''),
                'product_name' => $product ? $product->get_title() : '',
            );

            $args = apply_filters('woocommerce_quantity_input_args', wp_parse_args($args, $defaults), $product);


            $args['min_value'] = max($args['min_value'], 0);
            $args['max_value'] = 0 < $args['max_value'] ? $args['max_value'] : 20;

            if ('' !== $args['max_value'] && $args['max_value'] < $args['min_value']) {
                $args['max_value'] = $args['min_value'];
            }

            $options = '';

            for ($count = $args['min_value']; $count <= $args['max_value']; $count = $count + $args['step']) {

                if ('' !== $args['input_value'] && $args['input_value'] >= 1 && $count == $args['input_value']) {
                    $selected = 'selected';
                } else $selected = '';

                $options .= '<option value="' . $count . '"' . $selected . '>' . $count . '</option>';
            }

            $string = '<div class="quantity"><span>Menge:</span><select name="' . $args['input_name'] . '">' . $options . '</select></div>';

            if ($echo) {
                echo $string;
            } else {
                return $string;
            }
        }






        add_filter('woocommerce_product_variation_title_include_attributes', 'custom_product_variation_title', 10, 2);
        function custom_product_variation_title($should_include_attributes, $product)
        {
            $should_include_attributes = false;
            return $should_include_attributes;
        }







        add_filter('woocommerce_account_menu_items', 'remove_my_account_links');
        function remove_my_account_links($menu_links)
        {
            // unset( $menu_links['dashboard'] ); // Remove Logout link
            unset($menu_links['customer-logout']); // Remove Logout link
            return $menu_links;
        }





        // Unterkategorien am Anfang der Kategorieseiten
        function atelier_product_subcategories($args = array())
        {
            $parentid = get_queried_object_id();
            $args = array(
                'parent' => $parentid
            );
            $terms = get_terms('product_cat', $args);
            if ($terms) {
                echo '<p class="shop__button__list shop__subcategories">';
                foreach ($terms as $term) { ?>
            <a class="button  --color-gray   <?php echo $term->slug; ?>" href="<?php echo esc_url(get_term_link($term)); ?>">
                <span><?php echo $term->name; ?></span>
            </a>
        <?php }
                echo '</p>';
            }
        }
        add_action('woocommerce_archive_description', 'atelier_product_subcategories', 20);





        // Unterkategorien am Ende der Kategorieseiten
        function tutsplus_product_subcategories($args = array())
        {
            if (is_product_category()) {
                $parentid = get_queried_object_id();
                $args = array(
                    'parent' => $parentid
                );
                $terms = get_terms('product_cat', $args);
                if ($terms) {
        ?>
            <div class="wrapper--ignore shop__category__suggestions">
                <?php get_template_part('template-parts/paper'); ?>
                <div class="wrapper">
                    <h2>Mehr<br><?php echo single_cat_title('', false); ?><br>entdecken
                        <img src="<?php echo get_template_directory_uri(); ?>/img/shop/more_categories_background.svg" alt="">
                    </h2>
                    <div class="category__suggestions__items">
                        <?php
                        $i = 1;
                        foreach ($terms as $term) {
                            if ($i <= 4) { ?>
                                <a href="<?php echo esc_url(get_term_link($term)); ?>" class="<?php echo $term->slug; ?>">
                                    <div><?php woocommerce_subcategory_thumbnail($term); ?></div>
                                    <h4><strong><?php echo $term->name; ?></strong></h4>
                                </a> <?php
                                        $i++;
                                    }
                                } ?>
                    </div>
                </div>
            </div>
        <?php
                }
            }
        }




        function cw_discount()
        {
            global $woocommerce;
            $cw_discount = 0;
            $cart = WC()->cart;

            foreach ($woocommerce->cart->get_cart() as $cw_cart_key => $values) {
                $_product = $values['data'];
                if ($_product->is_on_sale()) {
                    $regular_price = $_product->get_regular_price();
                    $sale_price = $_product->get_sale_price();
                    $discount = ($regular_price - $sale_price) * $values['quantity'];
                    $cw_discount += $discount;
                }
            }
            if ($cw_discount > 0 || count(WC()->cart->get_applied_coupons()) > 0) : ?>
        <span class="total__savings"><?= get_template_part('template-parts/icon', '', array('icon' => 'tag', 'color' => 'red')); ?>Deine Ersparnis<?php echo wc_price($cw_discount + $woocommerce->cart->discount_cart); ?></span>
    <?php endif; ?>

    <?php if ($cart->get_shipping_total() == 0) : ?>
        <span class="total__savings"><?= get_template_part('template-parts/icon', '', array('icon' => 'tag', 'color' => 'red')); ?>Kostenloser Versand<?php echo wc_price($cart->get_shipping_total()); ?></span>
    <?php endif;
        }




        function acf_filter_rest_api_preload_paths($preload_paths)
        {
            if (!get_the_ID()) {
                return $preload_paths;
            }
            $remove_path = '/wp/v2/' . get_post_type() . 's/' . get_the_ID() . '?context=edit';
            $v1 =  array_filter(
                $preload_paths,
                function ($url) use ($remove_path) {
                    return $url !== $remove_path;
                }
            );
            $remove_path = '/wp/v2/' . get_post_type() . 's/' . get_the_ID() . '/autosaves?context=edit';
            return array_filter(
                $v1,
                function ($url) use ($remove_path) {
                    return $url !== $remove_path;
                }
            );
        }
        add_filter('block_editor_rest_api_preload_paths', 'acf_filter_rest_api_preload_paths', 10, 1);








        function woocommerce_support()
        {
            add_theme_support("woocommerce");
            //add_theme_support( "wc-product-gallery-zoom" );
            //add_theme_support( "wc- product-gallery-lightbox" );
            //add_theme_support( "wc-product-gallery-slider" );
        }
        add_action("after_setup_theme", "woocommerce_support");









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




        function translateReadableDateToGerman($str)
        {
            $searchVal = array("March", "May", "June", "July", "October", "December", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
            $replaceVal = array("März", "Mai", "Juni", "Juli", "Oktober", "Dezember", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");
            return str_replace($searchVal, $replaceVal, $str);
        }






        function register_custom_image_sizes()
        {
            if (!current_theme_supports('post-thumbnails')) {
                add_theme_support('post-thumbnails');
            }
            add_image_size('full', 2000, 2000, false);
            add_image_size('gallery-lightbox', 1500, 1000, false);
            add_image_size('gallery-slider', 600, 600, false);
        }
        add_action('after_setup_theme', 'register_custom_image_sizes');







        // custom menu example @ https://digwp.com/2011/11/html-formatting-custom-menus/
        function custom_menu_theme_mobile_big($menu_name)
        {
            if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
                $menu = wp_get_nav_menu_object($locations[$menu_name]);
                $menu_items = wp_get_nav_menu_items($menu->term_id);

                $menu_list = "\t\t\t\t" . '<ul>' . "\n";
                foreach ((array) $menu_items as $key => $menu_item) {
                    // Level 1
                    if ($menu_item->menu_item_parent === '0') {
                        // if(true) {
                        $template_directory_uri = get_template_directory_uri();
                        $url = $menu_item->url;
                        $title = $menu_item->title;
                        $description = $menu_item->description;
                        $classes = $menu_item->classes;
                        $classes = implode(" ", $classes);
                        $bild = get_field('bild', $menu_item);
                        $bild_url = $bild["url"];
                        $menu_list .= "<li class='dropdown__links__item {$classes}'>
                    <a class='main-link' href='{$url}'>
                        <div>
                            <p class='title__arrow'>{$title}<img src='{$template_directory_uri}/img/elements/arrow_dropdown_dark.svg' alt=''></p>
                            <span>{$description}</span>
                            </div>";
                        if ($bild_url) {
                            $menu_list .= "<img class='image' src='{$bild_url}' alt=''>";
                        }
                        $menu_list .= "</a>";

                        // // Level 2
                        $menu_list .= "<ul class='submenu' style='display:none;'>";
                        foreach ((array) $menu_items as $key => $sub_menu_item) {
                            if ((int) $sub_menu_item->menu_item_parent === $menu_item->ID) {
                                $classes = implode(" ", $sub_menu_item->classes);
                                $menu_list .= "<li class='{$classes}'><a href='{$sub_menu_item->url}'>{$sub_menu_item->title}</a></li>";
                            }
                        }
                        $menu_list .= "</ul>";

                        $menu_list .= "</li>";
                    }
                }
                $menu_list .= "\t\t\t\t" . '</ul>' . "\n";
            } else {
                // $menu_list = '<!-- no list defined -->';
            }
            echo $menu_list;
        }
        // custom menu example @ https://digwp.com/2011/11/html-formatting-custom-menus/
        function custom_menu_theme_mobile_small($menu_name)
        {
            if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
                $menu = wp_get_nav_menu_object($locations[$menu_name]);
                $menu_items = wp_get_nav_menu_items($menu->term_id);

                $menu_list = "\t\t\t\t" . '<ul>' . "\n";
                foreach ((array) $menu_items as $key => $menu_item) {
                    $template_directory_uri = get_template_directory_uri();
                    $url = $menu_item->url;
                    $title = $menu_item->title;
                    $classes = $menu_item->classes;
                    $classes = implode(" ", $classes);
                    $icon = get_field('icon', $menu_item);
                    $menu_list .= "<li>
                <a class='button --color-main-light {$classes}' href='{$url}'>
                    <span class='title__arrow'>{$title}<img src='{$template_directory_uri}/img/elements/arrow_dropdown_white.svg' alt=''></span>
                    <img class='icon' src='{$icon}' alt=''>
                    <img class='icon__bg' src='{$icon}' alt=''>
                </a>
            </li>";
                }
                $menu_list .= "\t\t\t\t" . '</ul>' . "\n";
            } else {
                // $menu_list = '<!-- no list defined -->';
            }
            echo $menu_list;
        }






        function get_paper_structure()
        {
            $template_directory_uri = get_template_directory_uri();
            return "<img class='paper-structure' src='{$template_directory_uri}/img/elements/paper_structure_500x.jpg' alt=''>";
            // src="https://atelier-delatron.de/wp-content/themes/atelier_theme/img/paper_structure.webp"
        }

        function d(...$vars)
        {
            echo '<pre>', var_dump(...$vars), '</pre>';
        }

        function dd(...$vars)
        {
            echo '<pre>', var_dump(...$vars), '</pre>';
            die();
        }








        // remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form');
        // add_action('woocommerce_checkout_before_order_review_heading', 'woocommerce_checkout_coupon_form');








        /**
         * Hide shipping rates when free shipping is available, but keep "Local pickup" 
         * Updated to support WooCommerce 2.6 Shipping Zones
         */

        function hide_shipping_when_free_is_available($rates, $package)
        {
            $new_rates = array();
            foreach ($rates as $rate_id => $rate) {
                // Only modify rates if free_shipping is present.
                if ('free_shipping' === $rate->method_id) {
                    $new_rates[$rate_id] = $rate;
                    break;
                }
            }

            if (!empty($new_rates)) {
                //Save local pickup if it's present.
                foreach ($rates as $rate_id => $rate) {
                    if ('local_pickup' === $rate->method_id) {
                        $new_rates[$rate_id] = $rate;
                        break;
                    }
                }
                return $new_rates;
            }

            return $rates;
        }

        add_filter('woocommerce_package_rates', 'hide_shipping_when_free_is_available', 10, 2);






        add_action('woocommerce_before_shop_loop_item_title', 'neueFunktion', 20);
        function neueFunktion()
        {
            global $product;

            $attachment_ids = $product->get_gallery_image_ids();

            $image_link = wp_get_attachment_image_url($attachment_ids[0], 'medium');

            echo '<img class="hover-image" src="' . $image_link . '" alt="">';

            // foreach( $attachment_ids as $attachment_id ) {
            //     echo $image_link = wp_get_attachment_url( $attachment_id );
            // }
        }


















































        // Display Product Badges
        function woocommerce_atelier_product_badges($product_id, $position = 'archive')
        {
            $product = wc_get_product($product_id);
            $terms = wp_get_post_terms($product_id, 'product_badge');

            // Überspringen, wenn kein Badge vorhanden
            if (empty($terms)) return;

            $badge = wp_get_post_terms($product_id, 'product_badge')[0];
            $badge_name = $badge->name;
            $badge_icon = get_field('icon', $badge);
            $badge_color = get_field('farbe', $badge);
            $badge_tooltip = $badge->description;
            $badge_in_archive = get_field('badge_in_archive', $product_id);
    ?>

    <?php if ($product->is_featured()) : ?>
        <span class="product__badge --featured">
            <?php get_template_part('template-parts/icon', '', array('icon' => 'star', 'color' => 'white',  'size' => 'small')); ?>
            Besonders beliebt
        </span>
        <?php return; ?>
    <?php endif; ?>

    <?php if ($product->is_on_sale()) : ?>
        <span class="product__badge --onsale">
            <?php get_template_part('template-parts/icon', '', array('icon' => 'tag', 'color' => 'white',  'size' => 'small')); ?>
            Im Angebot
        </span>
        <?php return; ?>
    <?php endif; ?>

    <?php if (!$badge) return; ?>

    <?php if ($position === 'product' || ($position === 'archive' && $badge_in_archive)) : ?>
        <div class="badge-tooltip">
            <span class="product__badge" style="background-color:<?= $badge_color; ?>">
                <?php get_template_part('template-parts/icon', '', array('url' => $badge_icon['url'], 'alt' => $badge_icon['alt'], 'size' => 'small')); ?>
                <?= $badge_name ?>
            </span>
            <?php if ($badge_tooltip && $position == 'product') : ?>
                <div class="tooltip">
                    <?php get_template_part('template-parts/icon', '', array('icon' => 'info')); ?>
                    <span><?= $badge_tooltip ?></span>
                </div>
            <?php endif; ?>
        </div>
<?php endif;
        }






        remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb');







        add_filter('woocommerce_cart_item_subtotal', 'show_coupon_item_subtotal_discount', 100, 3);
        function show_coupon_item_subtotal_discount($subtotal, $cart_item, $cart_item_key)
        {
            //Check if sale price is not empty

            //Get product object
            $_product = $cart_item['data'];
            $line_subtotal_tax  = $cart_item['line_subtotal_tax'];

            if ($cart_item['line_subtotal'] !== $cart_item['line_total']) {

                $line_tax = $cart_item['line_tax'];
                $regular_price = $_product->get_regular_price() * $cart_item['quantity'];
                $discountAmt = wc_price(($regular_price - $cart_item['line_subtotal'] - $line_tax) + ($cart_item['line_subtotal'] - $cart_item['line_total']));

                if (!empty($_product->get_sale_price())) {

                    $subtotal = sprintf(
                        '
                <del aria-hidden="true">
                    %s
                </del>
                <ins>
                    <span class="woocommerce-Price-amount amount">
                        <bdi>
                            %s
                        </bdi>
                    </span>
                </ins>
                <p>
                    Ersparnis
                    <span class="woocommerce-Price-amount amount">
                        <bdi>
                            %s
                        </bdi>
                    </span>
                </p>',
                        wc_price($regular_price),
                        wc_price($cart_item['line_total'] + $line_tax),
                        $discountAmt
                    );
                } else {

                    $subtotal = sprintf(
                        '
                <del>%s</del>
                <ins>%s</ins>
                <p>
                    <span>Ersparnis</span>
                    %s
                </p>',
                        wc_price($regular_price),
                        wc_price($cart_item['line_total'] + $line_tax),
                        $discountAmt
                    );
                }
            } else if ('' !== $_product->get_sale_price()) {

                $regular_price = $_product->get_regular_price() * $cart_item['quantity'];
                $sale_price = $_product->get_sale_price() * $cart_item['quantity'];
                $discountAmt = wc_price($regular_price - $sale_price);

                $subtotal = sprintf(
                    '
            <del>%s</del>
            <ins>%s</ins>
            <p>
                <span>Ersparnis</span>
                %s
            </p>',
                    wc_price($regular_price),
                    wc_price($_product->get_sale_price() * $cart_item['quantity']),
                    $discountAmt
                );
            }

            return $subtotal;
        }









        // function vd_add_order_status( $statuses ) {
        //     $statuses['wc-my-custom-status'] = __( 'My Custom Status', 'text-domain' );
        //     return $statuses;
        // }
        // add_filter( 'wc_order_statuses', 'vd_add_order_status', 10, 1 );



        // function vd_register_order_post_status( $statuses ) {
        //     $statuses['wc-my-custom-status'] = array(
        //         'label'                     => _x( 'My Custom Status', 'Order status', 'text-domain' ),
        //         'public'                    => false,
        //         'exclude_from_search'       => false,
        //         'show_in_admin_all_list'    => true,
        //         'show_in_admin_status_list' => true,
        //         'label_count'               => _n_noop( 'Custom Desc <span class="count">(%s)</span>', 'Custom Desc <span class="count">(%s)</span>', 'text-domain' ),
        //    );
        // }
        // add_filter( 'woocommerce_register_shop_order_post_statuses', 'vd_register_order_post_status', 10, 1 );






        // // Remove Yoast
        // function my_remove_wp_seo_meta_box() {
        //     remove_meta_box('wpseo_meta', 'termin', 'normal');
        // }
        // add_action('add_meta_boxes', 'my_remove_wp_seo_meta_box', 100);








        // always update values of all bidirectional fields
        add_filter('acfe/bidirectional/force_update', '__return_true');

        // or target a specific field only
        add_filter('acfe/bidirectional/force_update/name=my_field', '__return_true');





        require get_template_directory() . '/inc/dates.php'; // Dates admin list

        //         /*------------------------------------*\
        // 	Custom Admin List: Termine
        // \*------------------------------------*/

        //         // add list columns
        //         add_filter('manage_termin_posts_columns', 'bs_termin_table_head');
        //         function bs_termin_table_head($defaults)
        //         {
        //             $defaults['termin']  = 'Termin';
        //             $defaults['time']  = 'Uhrzeit';
        //             $defaults['status']    = 'Status';
        //             return $defaults;
        //             // $defaults['category']    = 'Kategorie';
        //             // $defaults['product']    = 'Kunstangebot';
        //         }

        //         // add list column contents
        //         add_action('manage_termin_posts_custom_column', 'bs_termin_table_content', 10, 2);
        //         function bs_termin_table_content($column_name, $post_id)
        //         {

        //             $date_format = 'j. F Y';

        //             $category_slug = get_the_category($post_id)[0]->slug;

        //             if ($category_slug === 'workshop') {
        //                 $termin_1 = get_field('termin_1', $post_id);
        //                 $termin_2 = get_field('termin_2', $post_id);
        //             }
        //             if ($category_slug === 'kurs') {
        //                 $datum = get_field('datum', $post_id);
        //             }

        //             if ($column_name == 'termin') {
        //                 if ($category_slug === 'workshop') {
        //                     if (!empty($termin_1['datum'])) {
        //                         $datum_1 = date($date_format, strtotime($termin_1['datum']));
        //                         echo '<a class="row-title" href="' . get_edit_post_link($post_id) . '">' . $datum_1 . '</a>';
        //                     }
        //                     if (!empty($termin_2['datum'])) {
        //                         $datum_2 = date($date_format, strtotime($termin_2['datum']));
        //                         echo ',<br><a class="row-title" href="' . get_edit_post_link($post_id) . '">' . $datum_2 . '</a>';
        //                     }
        //                 }
        //                 if ($category_slug === 'kurs') {
        //                     $datum = date($date_format, strtotime($datum));
        //                     echo '<a class="row-title" href="' . get_edit_post_link($post_id) . '">' . $datum . '</a>';
        //                 }
        //             }
        //             if ($column_name == 'time') {
        //                 if ($category_slug === 'workshop') {
        //                     if (!empty($termin_1['datum'])) echo '<a class="row-title" href="' . get_edit_post_link($post_id) . '">' . $termin_1['startzeit'] . ' - ' . $termin_1['endzeit'] . ' Uhr</a>';
        //                     if (!empty($termin_2['datum'])) echo ',<br><a class="row-title" href="' . get_edit_post_link($post_id) . '">' . $termin_2['startzeit'] . ' - ' . $termin_2['endzeit'] . ' Uhr</a>';
        //                 }
        //                 if ($category_slug === 'kurs') {
        //                     //
        //                 }
        //             }
        //             if ($column_name == 'status') {
        //                 if ($category_slug === 'workshop') {
        //                     $datum = new DateTime($termin_1['datum']);
        //                 }
        //                 if ($category_slug === 'kurs') {
        //                     $datum = new DateTime($datum);
        //                 }
        //                 $today = new DateTime();
        //                 if ($datum > $today) {
        //                     echo '<span style="color:green;">In der Zukunft</span>';
        //                 } else {
        //                     echo '<span style="color:red;">Vergangen</span>';
        //                 }
        //             }
        //             // if ($column_name == 'category') {
        //             //     $product_id = get_field( 'kunstangebot', $post_id )->ID;
        //             //     $product_cat = get_the_category( $product_id )[0]->name;
        //             //     echo $product_cat;
        //             // }
        //             // if ($column_name == 'product') {
        //             //     $product_id = get_field( 'kunstangebot', $post_id )->ID;
        //             //     $product_name = get_the_title( $product_id );
        //             //     echo $product_name;
        //             // }
        //         }

        //         // Order by configuration
        //         add_filter('manage_edit-termin_sortable_columns', 'bs_termin_table_sorting');
        //         function bs_termin_table_sorting($columns)
        //         {
        //             $columns['termin'] = 'termin';
        //             $columns['product'] = 'product';
        //             return $columns;
        //         }









        // Get Woocommerce variation price based on product ID
        function get_variation_price_by_id($product_id, $variation_id)
        {
            $currency_symbol = get_woocommerce_currency_symbol();
            $product = new WC_Product_Variable($product_id);
            $variations = $product->get_available_variations();
            $var_data = [];
            foreach ($variations as $variation) {
                if ($variation['variation_id'] == $variation_id) {
                    $display_regular_price = $variation['display_regular_price'] . '<span class="currency">' . $currency_symbol . '</span>';
                    $display_price = $variation['display_price'] . '<span class="currency">' . $currency_symbol . '</span>';
                }
            }

            //Check if Regular price is equal with Sale price (Display price)
            if ($display_regular_price == $display_price) {
                $display_price = false;
            }

            $priceArray = array(
                'display_regular_price' => $display_regular_price,
                'display_price' => $display_price
            );
            $priceObject = (object)$priceArray;
            return $priceObject;
        }






        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
        function wvnderlab_single_title()
        {
            global $post;
            $category = get_the_terms($post->ID, 'product_cat');
            $category = $category[0]->name;
            $product = wc_get_product($post->ID);
            echo '<h1 class="product_title entry-title"><span style="font-size:0;">' . $category . ' </span>' . $product->get_title() . '</h1>';
        }
        add_action('woocommerce_single_product_summary', 'wvnderlab_single_title', 5);






















        // Benutzerdefinierter Bestellstatus
        function register_shipment_arrival_order_status()
        {
            register_post_status('wc-arrival-shipment', array(
                'label'                     => 'Point of Sale',
                'public'                    => true,
                'show_in_admin_status_list' => true,
                'show_in_admin_all_list'    => true,
                'exclude_from_search'       => false,
                'label_count'               => _n_noop('Point of Sale <span class="count">(%s)</span>', 'Point of Sale <span class="count">(%s)</span>')
            ));
        }
        add_action('init', 'register_shipment_arrival_order_status');
        function add_awaiting_shipment_to_order_statuses($order_statuses)
        {
            $new_order_statuses = array();
            foreach ($order_statuses as $key => $status) {
                $new_order_statuses[$key] = $status;
                if ('wc-processing' === $key) {
                    $new_order_statuses['wc-arrival-shipment'] = 'Point of Sale';
                }
            }
            return $new_order_statuses;
        }
        add_filter('wc_order_statuses', 'add_awaiting_shipment_to_order_statuses');





        function my_pre_get_posts($query)
        {
            // do not modify queries in the admin
            if (is_admin()) {
                return $query;
            }

            // only modify queries for 'event' post type
            if (isset($query->query_vars['post_type']) && $query->query_vars['post_type'] == 'course_date') {

                $query->set('orderby', 'meta_value');
                $query->set('meta_key', 'date');
                $query->set('order', 'ASC');
                $query->set('posts_per_page', 100);
            }


            // return
            return $query;
        }
        add_action('pre_get_posts', 'my_pre_get_posts');
