<?php
/*------------------------------------*/
/* Woocoommerce single */
/*------------------------------------*/

// Replace product image gallery
function at_woo_product_gallery() {
    global $product;

    $galleryImages = $product->get_gallery_image_ids(); // get gallery images 
    $mainImage = $product->get_image_id(); // get product main image 

    // Merge all images
    $productImages = array_merge(
        [$mainImage],
        $galleryImages
    );

    get_template_part('components/shop/product-gallery', NULL, array('imageIds' => $productImages));
}


/*------------------------------------*/
/* Hooks */
/*------------------------------------*/
remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);

add_action('woocommerce_before_single_product_summary', 'at_woo_product_gallery', 20);
