<?php
// TODO: Use args to display cart/checkout/confirmation
$step = $args['step'] ?? null;
$image = $args['image'] ?? null;

$steps = array(
    'cart' => array(
        'title' => 'Warenkorb',
        'link' => esc_url(wc_get_cart_url())
    ),
    'checkout' => array(
        'title' => 'Kasse',
        'link' => esc_url(wc_get_checkout_url())
    ),
    'payment' => array(
        'title' => 'Zahlung',
        'link' => esc_url(wc_get_checkout_url())
    ),
    'confirmation' => array(
        'title' => 'Bestätigung',
        'link' => 'https://atelier-delatron.shop/bestellung'
    ),
);
?>

<header class="shop-hero-banner shop-hero-banner--small show-header-on-offset">

    <?php get_template_part('components/header-bar', '', array('type' => 'shop', 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

    <div class="content">
        <?php if (!empty($step)) : ?>
            <h1><?php echo $steps[$step]['title']; ?></h1>
        <?php endif; ?>

        <ul class="woocommerce-breadcrumb" itemscope="" itemtype="https://schema.org/BreadcrumbList">
            <?php $index = 1; ?>
            <?php foreach ($steps as $key => $value) : ?>

                <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                    <?php if ($key == $step) : ?>
                        <span class=" --current"><?= $value['title']; ?></span>
                        <meta itemprop="item" content="<?= $value['link'] ?>">
                        <?php $currentRendered = true ?>
                    <?php elseif ($currentRendered) : ?>
                        <span><?= $value['title'] ?></span>
                        <meta itemprop="item" content="<?= $value['link'] ?>">
                    <?php else : ?>
                        <a href="<?= $value['link']; ?>" itemtype="https://schema.org/Thing" itemprop="item"><?= $value['title']; ?></a>
                    <?php endif; ?>

                    <meta itemprop="position" content="<?= $index ?>">
                    <meta itemprop="name" content="<?= $value['title'] ?>">
                    <svg class='seperator' width='5' height='9' viewBox='0 0 5 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0.970001 1.39999L3.97 4.39999L0.970001 7.39999' stroke='white' style='stroke:white;stroke-opacity:1;' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' />
                    </svg>
                </li>

                <?php $i++; ?>
            <?php endforeach; ?>
        </ul>
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


<!-- <ul class="breadcrumb" itemscope="" itemtype="https://schema.org/BreadcrumbList">
    <li class="breadcrumb-item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
        <svg viewBox="0 0 100 100" class="breadcrumb-item-separator breadcrumb-item-separator--left">
            <use xlink:href="#chevron-left"></use>
        </svg>
        <a class="breadcrumb-item-link" itemtype="https://schema.org/Thing" href="https://eu.puma.com/de/de/home" itemprop="item">
            Home
        </a>
        <div class="breadcrumb-item-separator breadcrumb-item-separator--right">
            <span class="breadcrumb-item-separator-dot"></span>
        </div>
        <meta itemprop="position" content="1">
        <meta itemprop="name" content="Home">
    </li>
    <li class="breadcrumb-item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
        <svg viewBox="0 0 100 100" class="breadcrumb-item-separator breadcrumb-item-separator--left">
            <use xlink:href="#chevron-left"></use>
        </svg>
        <a class="breadcrumb-item-link" itemtype="https://schema.org/Thing" href="https://eu.puma.com/de/de/kinder" itemprop="item">
            Kinder
        </a>
        <div class="breadcrumb-item-separator breadcrumb-item-separator--right">
            <span class="breadcrumb-item-separator-dot"></span>
        </div>
        <meta itemprop="position" content="2">
        <meta itemprop="name" content="Kinder">
    </li>
    <li class="breadcrumb-item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
        <svg viewBox="0 0 100 100" class="breadcrumb-item-separator breadcrumb-item-separator--left">
            <use xlink:href="#chevron-left"></use>
        </svg>
        <a class="breadcrumb-item-link" itemtype="https://schema.org/Thing" href="https://eu.puma.com/de/de/kinder/jungen" itemprop="item">
            Jungen
        </a>
        <div class="breadcrumb-item-separator breadcrumb-item-separator--right">
            <span class="breadcrumb-item-separator-dot"></span>
        </div>
        <meta itemprop="position" content="3">
        <meta itemprop="name" content="Jungen">
    </li>
    <li class="breadcrumb-item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
        <svg viewBox="0 0 100 100" class="breadcrumb-item-separator breadcrumb-item-separator--left">
            <use xlink:href="#chevron-left"></use>
        </svg>
        <a class="breadcrumb-item-link" itemtype="https://schema.org/Thing" href="https://eu.puma.com/de/de/kinder/jungen/bekleidung" itemprop="item">
            Bekleidung
        </a>
        <div class="breadcrumb-item-separator breadcrumb-item-separator--right">
            <span class="breadcrumb-item-separator-dot"></span>
        </div>
        <meta itemprop="position" content="4">
        <meta itemprop="name" content="Bekleidung">
    </li>
    <li class="breadcrumb-item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
        Borussia Dortmund 23/24 Heimspieltrikot Kleinkinder
        <meta itemprop="item" content="https://eu.puma.com/de/de/pd/borussia-dortmund-23%2F24-heimspieltrikot-kleinkinder/770610.html">
        <meta itemprop="position" content="5">
        <meta itemprop="name" content="Borussia Dortmund 23/24 Heimspieltrikot Kleinkinder">
    </li>
</ul> -->