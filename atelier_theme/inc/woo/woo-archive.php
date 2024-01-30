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
    foreach ($terms as $category) {
        $category_name = get_field('singular_name', $category->taxonomy . '_' . $category->term_id) ?? $category->name;
        $cat_links[] = $category_name;
    }
    $on_cat = join(" ", $cat_links);

    echo '<span class="product__category">' . $on_cat . '</span>';
}

// Add short description to loop item
function woocommerce_atelier_loop_short_description() {
    global $post;
    $short_description = get_field("short_description", $post->ID);

    if (!$short_description) return; // Return if no short description

    echo '<p class="product__description">' . $short_description . '</p>';
}

// insert custom html on product archive page
function woocommerce_atelier_products_filter() {
    echo '<button class="button --color-main filters-slideover__button">' . __('Produkte filtern', 'atelier') . '</button>';
    echo '<div class="filters-slideover">';
    echo '<div class="filters-slideover__header"><h3>Filtern und Sortieren</h3><a class="filters-slideover__close"></a></div>';

    if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('product-filters'));

    echo '<div class="filters-slideover__confirm">
        <a class="button --color-main">Anwenden</a>
    </div>';

    echo '</div>';
    echo '<div class="filters-slideover__backdrop"></div>';
}

/*------------------------------------*/
/* Hooks */
/*------------------------------------*/
add_action('woocommerce_before_shop_loop', 'woocommerce_atelier_products_filter', 5);
add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_category', 5);
add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_short_description', 15);
add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_product_badge', 20);
