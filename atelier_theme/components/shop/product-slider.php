<?php
$products = $args['products'];
?>

<?php if ($products) : ?>

    <div class="slider__container">
        <div class="swiper">
            <div class="swiper-wrapper">

                <?php foreach ($products as $productId) :
                    $permalink = get_permalink($productId);
                    $title = get_the_title($productId);
                    $short_description = get_field('short_description', $productId);
                    $category = wp_get_post_terms($productId, 'product_cat')[0]->name;
                    $product = wc_get_product($productId);

                    if ($product->get_status() === 'publish') :
                        $product_status = $product->get_status();
                        $images = $product->get_gallery_image_ids();
                        $image_main = get_the_post_thumbnail_url($productId, 'woocommerce_thumbnail');
                        $image_zoom = wp_get_attachment_image_src($images[0], 'woocommerce_thumbnail')[0];
                        $price = $product->get_price();
                        $regular_price = $product->get_regular_price();

                        $product_data = $product->get_data();
                        $attributes = $product->get_attributes(); // get attributes
                        $is_variation = $product->is_type('variable'); // check if is variation

                        if ($is_variation) {
                            $available_variations = $product->get_available_variations();
                            $variation_id = $available_variations[0]['variation_id']; // Getting the variable id of just the 1st product. You can loop $available_variations to get info about each variation.
                            $variable_product1 = new WC_Product_Variation($variation_id);
                            $regular_price = $variable_product1->regular_price;
                        } ?>

                        <li class="swiper-slide product product-list__item">

                            <a href="<?= $permalink ?>" class="woocommerce-LoopProduct-link woocommerce-loop-product__link" aria-label="Produkt '<?= $title ?>' ansehen">
                                <img class="product-image attachment-woocommerce_thumbnail" src="<?= $image_main; ?>" alt="">
                                <img class="product-image product-image--hover hover-image" src="<?= $image_zoom; ?>" alt="">
                            </a>

                            <div class="product__text">
                                <a href="<?= $permalink ?>" class="woocommerce-LoopProduct-link woocommerce-loop-product__link" aria-label="Produkt '<?= $title ?>' ansehen">
                                    <span class="product__category"><?= $category ?></span>
                                    <h3 class="product__title"><?= $title ?></h3>
                                    <p class="product__description"><?= $short_description ?></p>
                                    <?php woocommerce_atelier_product_badges($productId); ?>

                                    <?php if (!$product->is_on_sale()) : ?>
                                        <span class="price"><span class="woocommerce-Price-amount amount"><bdi><?= $price ?>&nbsp;<span class="woocommerce-Price-currencySymbol">€</span></bdi></span></span>
                                    <?php else : ?>
                                        <span class="price"><del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><?= $regular_price ?>&nbsp;<span class="woocommerce-Price-currencySymbol">€</span></bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi><?= $price ?>&nbsp;<span class="woocommerce-Price-currencySymbol">€</span></bdi></span></ins></span>
                                    <?php endif; ?>

                                </a>
                                <a href="?add-to-cart=<?= $productId ?>" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart button__loop" data-product_id="<?= $productId ?>" data-product_sku="" aria-label="„<?= $title ?>“ zu deinem Warenkorb hinzufügen" rel="nofollow">In den Warenkorb</a>
                            </div>
                        </li>
                    <?php endif; ?>
                <?php endforeach; ?>

            </div>

            <div class="slider__controls">
                <div class="slider__buttons">
                    <div class="slider__button --prev"></div>
                    <div class="slider__button --next"></div>
                </div>

                <div class="slider__pagination"></div>
            </div>
        </div>
    </div>

<?php endif; ?>