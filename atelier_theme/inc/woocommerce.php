<?php
function woocommerce_support()
{
    add_theme_support("woocommerce");
    //add_theme_support( "wc-product-gallery-zoom" );
    //add_theme_support( "wc- product-gallery-lightbox" );
    //add_theme_support( "wc-product-gallery-slider" );
}
add_action("after_setup_theme", "woocommerce_support");
add_filter('woocommerce_enqueue_styles', '__return_empty_array');





add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_category', 5);
add_action('woocommerce_shop_loop_item_title', 'woocommerce_atelier_loop_short_description', 15);
// Shop Item adding category
function woocommerce_atelier_loop_category()
{
    global $post;
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
    global $post;
    $short_description = get_field("short_description", $post->id);
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
                            <img class="--ll-disabled" src="<?php echo get_template_directory_uri(); ?>/assets/img/shop/bullet_checkmark.svg" alt="">
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
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo_kunsttuete_hell.svg" alt="Kunsttüte Logo">
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
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/shop/more_categories_background.svg" alt="">
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
