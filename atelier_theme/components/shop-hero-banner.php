<?php
// TODO: Use args to display cart/checkout/confirmation
$image = $args['image'] ?? null;
?>

<!-- <div class="cart__header step--two">
    <span>
        <h6><a href="https://atelier-delatron.shop/warenkorb">Warenkorb</a></h6><img src="<?php echo get_template_directory_uri(); ?>/assets/img/elements/arrow_right_green.svg">
        <h6>Zahlung</h6><img src="<?php echo get_template_directory_uri(); ?>/assets/img/elements/arrow_right_inputgray.svg">
        <h6>Bestätigung</h6>
    </span>
    <h2>Zahlung abschließen</h2>
</div> -->

<header class="shop-hero-banner shop-hero-banner--small show-header-on-offset">

    <?php get_template_part('components/paper'); ?>

    <div class="decoration">
        <div class="wrapper">
            <img src="<?= get_template_directory_uri() ?>/assets/img/modules/shop-hero-banner/snowflake_medium.svg" alt="">
            <img src="<?= get_template_directory_uri() ?>/assets/img/modules/shop-hero-banner/snowflake_large.svg" alt="">
            <img src="<?= get_template_directory_uri() ?>/assets/img/modules/shop-hero-banner/snowflake_large.svg" alt="">
            <img src="<?= get_template_directory_uri() ?>/assets/img/modules/shop-hero-banner/snowflake_medium.svg" alt="">
            <img src="<?= get_template_directory_uri() ?>/assets/img/modules/shop-hero-banner/snowflake_small.svg" alt="">
        </div>
    </div>

    <div class="shop-hero-banner__background-image">
        <?php if (!empty($image)) : ?>
            <img src="<?php echo $image; ?>" alt="">
        <?php endif; ?>
    </div>

    <?php get_template_part('components/header-bar', '', array('type' => 'shop', 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

    <div class="shop-hero-banner__content wrapper">
        <div class="shop-hero-banner--header">

            <div class="checkout-header">
                <h1>Warenkorb</h1>
                <nav class="woocommerce-breadcrumb" itemprop="breadcrumb">
                    <span class="item --current">Warenkorb</span>
                    <span class="divider">/</span>
                    <span class="item" href="">Kasse</span>
                    <span class="divider">/</span>
                    <span class="item" href="">Bestätigung</span>
                    <span class="divider">/</span>
                </nav>
            </div>

        </div>
    </div>

</header>