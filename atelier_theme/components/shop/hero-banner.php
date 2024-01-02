<?php
$title = $args['title'] ?? null;
$image = $args['image'] ?? null;
?>

<header class="shop-hero-banner shop-hero-banner--small show-header-on-offset">

    <div class="background-image shop-hero-banner__background-image">
        <?php if (!empty($image)) : ?>
            <img src="<?php echo $image; ?>" alt="">
        <?php endif; ?>
    </div>

    <?php get_template_part('components/header-bar', '', array('type' => 'shop', 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

    <div class="content">
        <?php if (!empty($title)) : ?>
            <h1><?php echo $title; ?></h1>
        <?php endif; ?>
        <?php woocommerce_breadcrumb(); ?>
    </div>

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

</header>