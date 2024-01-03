<?php
/*------------------------------------*/
/* Woocoommerce global */
/*------------------------------------*/

// Add theme support
function woocommerce_support() {
    add_theme_support("woocommerce");
}

// Custom image sizes
function atelier_woocommerce_custom_image_sizes() {
    remove_image_size('woocommerce_thumbnail');
    remove_image_size('woocommerce_single');
    remove_image_size('woocommerce_gallery_thumbnail');
    remove_image_size('1536x1536');
    remove_image_size('2048x2048');

    add_image_size('woocommerce_single', 640, 800, false);
    add_image_size('woocommerce_thumbnail', 350, 410, false);
    add_image_size('woocommerce_miniature', 120, 150, false);
}


// Breadcrumb Settings - More adjustments habe been made here
// LINK atelier_theme/woocommerce/global/breadcrumb.php
function atelier_breadcrumbs_settings() {
    return array(
        'home'        => 'Shop',
        'delimiter'   => "<svg class='seperator' width='5' height='9' viewBox='0 0 5 9' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.970001 1.39999L3.97 4.39999L0.970001 7.39999' stroke='white' style='stroke:white;stroke-opacity:1;' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>",
        'wrap_before' => '<ul class="woocommerce-breadcrumb" itemscope="" itemtype="https://schema.org/BreadcrumbList">',
        'wrap_after'  => '</ul>',
        'before'      => '<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">',
        'after'       => '</li>',
    );
}

// Change breadcrumb home url
function atelier_custom_breadrumb_home_url() {
    return site_url() . '/shop';
}

// Custom order status
function register_shipment_arrival_order_status() {
    register_post_status('wc-arrival-shipment', array(
        'label'                     => 'Point of Sale',
        'public'                    => true,
        'show_in_admin_status_list' => true,
        'show_in_admin_all_list'    => true,
        'exclude_from_search'       => false,
        'label_count'               => _n_noop('Point of Sale <span class="count">(%s)</span>', 'Point of Sale <span class="count">(%s)</span>')
    ));
}

// Add custom order status to order page drop down
function add_awaiting_shipment_to_order_statuses($order_statuses) {
    $new_order_statuses = array();
    foreach ($order_statuses as $key => $status) {
        $new_order_statuses[$key] = $status;
        if ('wc-processing' === $key) {
            $new_order_statuses['wc-arrival-shipment'] = 'Point of Sale';
        }
    }
    return $new_order_statuses;
}

/*------------------------------------*/
/* Hooks */
/*------------------------------------*/

remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb');

add_filter('woocommerce_enqueue_styles', '__return_empty_array'); // Remove woocommerce styles
add_filter('woocommerce_breadcrumb_defaults', 'atelier_breadcrumbs_settings');
add_filter('woocommerce_breadcrumb_home_url', 'atelier_custom_breadrumb_home_url');
add_filter('wc_order_statuses', 'add_awaiting_shipment_to_order_statuses');

add_action("after_setup_theme", "woocommerce_support");
add_action('after_setup_theme', 'atelier_woocommerce_custom_image_sizes');
add_action('init', 'register_shipment_arrival_order_status');

/*------------------------------------*/
/* REVIEW */
/*------------------------------------*/

// // add image to category banner
// add_action('atelier_category_banner', 'woocommerce_atelier_category_thumbnail', 5);
// function woocommerce_atelier_category_thumbnail() {
//     // verify that this is a product category page
//     if (is_product_category()) {
//         global $wp_query;

//         // get the query object
//         $cat = $wp_query->get_queried_object();

//         // get the thumbnail id using the queried category term_id
//         $thumbnail_id = get_term_meta($cat->term_id, 'thumbnail_id', true);

//         // get the image URL
//         $image = wp_get_attachment_url($thumbnail_id);

//         // print the IMG HTML
//         echo "<img src='{$image}' alt='' width='762' height='365' />";
//     }
// }

add_filter('woocommerce_product_tabs', 'woo_remove_product_tabs', 98);
function woo_remove_product_tabs($tabs) {
    unset($tabs['additional_information']);
    return $tabs;
}

// Nav Cart Icon - Update Count
add_filter('woocommerce_add_to_cart_fragments', 'atelier_add_to_cart_fragment');
function atelier_add_to_cart_fragment($fragments) {
    global $woocommerce;
    $fragments['.nav__cart__quantity'] = '<div class="nav__cart__quantity"><span>' .  $woocommerce->cart->cart_contents_count . '</span></div>';
    return $fragments;
}

// Get Woocommerce variation price based on product ID
function get_variation_price_by_id($product_id, $variation_id) {
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
