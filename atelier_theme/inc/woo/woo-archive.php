<?php
/*------------------------------------*/
/* Woocoommerce global */
/*------------------------------------*/

// Add product category to loop item
function woocommerce_atelier_loop_category() {
    global $post;
    $terms = get_the_terms($post->ID, 'product_cat');

    if (!$terms || is_wp_error($terms)) return; // Return if no terms

    // only displayed if the product has at least one category
    $cat_links = array();
    foreach ($terms as $term) {
        $cat_links[] = $term->name;
    }
    $on_cat = join(" ", $cat_links);

    echo '<span class="product__category">' . $on_cat . '</span>';
}

// Add short description to loop item
function woocommerce_atelier_loop_short_description() {
    global $post;
    $short_description = get_field("short_description", $post->id);

    if (!$short_description) return; // Return if no short description

    echo '<p class="product__description">' . $short_description . '</p>';
}


/*------------------------------------*/
/* Hooks */
/*------------------------------------*/
// remove_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5); // remove rating

add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_category', 5);
add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_short_description', 15);
