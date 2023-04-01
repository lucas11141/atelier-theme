<?php
/**
 * Empty cart page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-empty.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

defined( 'ABSPATH' ) || exit;

/*
 * @hooked wc_empty_cart_message - 10
 */
// do_action( 'woocommerce_cart_is_empty' );

if ( wc_get_page_id( 'shop' ) > 0 ) : ?>

	<header class="shop-hero-banner shop-hero-banner--small show-header-on-offset">

		<?php get_template_part('template-parts/paper'); ?>
		<div class="shop-hero-banner__decoration"><div class="wrapper">
			<img src="<?= get_template_directory_uri() ?>/img/modules/shop-hero-banner/snowflake_medium.svg" alt=""> 
			<img src="<?= get_template_directory_uri() ?>/img/modules/shop-hero-banner/snowflake_large.svg" alt=""> 
			<img src="<?= get_template_directory_uri() ?>/img/modules/shop-hero-banner/snowflake_large.svg" alt=""> 
			<img src="<?= get_template_directory_uri() ?>/img/modules/shop-hero-banner/snowflake_medium.svg" alt=""> 
			<img src="<?= get_template_directory_uri() ?>/img/modules/shop-hero-banner/snowflake_small.svg" alt=""> 
		</div></div>

		<div class="shop-hero-banner__background-image">
			<?php if ( $image ): ?>
				<img src="<?php echo $image; ?>" alt="">
			<?php endif; ?>
		</div>

		<?php get_template_part('template-parts/header-bar', '', array( 'type'=>'shop', 'color'=>'white', 'drop'=>false, 'hero'=>true )); ?>

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

	<div class="checkout-split cart--empty">

		<div class="left">
			<div class="container">

				<h4>Dein Warenkorb ist noch leer.</h4>
				<a class="button --color-accent" href="<?php echo get_permalink( woocommerce_get_page_id( 'shop' ) ); ?>">
					<span>Produkte entdecken</span>
				</a>

			</div>
		</div>
		
		<div class="right">
			<div class="container">
				<div class="placeholders">
					<!-- <div class="placeholder placeholder--medium"></div> -->
					<div class="placeholder placeholder--large"></div>
					<!-- <div class="placeholder placeholder--small"></div> -->
					<!-- <div class="placeholder placeholder--small"></div> -->
				</div>
			</div>
		</div>

	</div>

<?php endif; ?>