<?php
/**
 * My Account navigation
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/navigation.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_account_navigation' );


$current_user = wp_get_current_user();
$username = $current_user->display_name;
?>




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
		<div class="shop-hero-banner--account__header">
			<h5><?= $username ?></h5>
			<h1>Persönlicher Bereich</h1>

			<div class="header__buttons">
				<nav class="account__navigation">
					<?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
						<a class="button button--mini --color-transparent-white   <?php echo wc_get_account_menu_item_classes( $endpoint ); ?>" href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>">
							<span><?php echo esc_html( $label ); ?></span>
						</a>
					<?php endforeach; ?>
					<a class="account__logout button button--mini --color-red  " href="<?php echo wc_logout_url(); ?>">
						<span>Abmelden</span>
						<?php get_template_part('template-parts/icon', '', array( 'icon'=>'logout', 'color'=>'white', 'size'=>'small', 'alt'=>'Aus Konto ausloggen' )); ?>
					</a>
				</nav>
				<a class="account__logout button button--mini --color-red  " href="<?php echo wc_logout_url(); ?>">
					<span>Abmelden</span>
					<?php get_template_part('template-parts/icon', '', array( 'icon'=>'logout', 'color'=>'white', 'size'=>'small', 'alt'=>'Aus Konto ausloggen' )); ?>
				</a>
			</div>

			<?php do_action( 'woocommerce_after_account_navigation' ); ?>

			<!-- <a class="back__button --color-accent" data-product-link="">
				<span>Zurück zur Übersicht</span>
			</a> -->

		</div>
	</div>

</header>



