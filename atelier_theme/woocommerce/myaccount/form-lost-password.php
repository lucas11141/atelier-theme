<?php

/**
 * Lost password form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/form-lost-password.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.2
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_lost_password_form');
?>

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
		<?php if ($image) : ?>
			<img src="<?php echo $image; ?>" alt="">
		<?php endif; ?>
	</div>

	<?php get_template_part('components/header-bar', '', array('type' => 'shop', 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

	<div class="shop-hero-banner__content wrapper">

		<?php if ($image) : ?>
			<div class="category__header__thumbnail">
				<img src="<?php echo $image; ?>" alt="" />
			</div>
		<?php endif; ?>

		<div class="category__header__content">

			<h1>Konto</h1>

		</div>
	</div>

</header>

<div class="wrapper --small page--login">

	<form method="post" class="woocommerce-ResetPassword lost_reset_password">

		<h2><strong>Passwort vergessen?</strong></h2>

		<p><?php echo apply_filters('woocommerce_lost_password_message', esc_html__('Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.', 'woocommerce')); ?></p><?php // @codingStandardsIgnoreLine 
																																																											?>

		<p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first form-input">
			<label for="user_login"><?php esc_html_e('Username or email', 'woocommerce'); ?></label>
			<input class="woocommerce-Input woocommerce-Input--text input-text" type="text" name="user_login" id="user_login" autocomplete="username" />
		</p>

		<div class="clear"></div>

		<?php do_action('woocommerce_lostpassword_form'); ?>

		<p class="woocommerce-form-row form-row">
			<input type="hidden" name="wc_reset_password" value="true" />
			<button type="submit" class="woocommerce-Button button --color-main  " value="<?php esc_attr_e('Reset password', 'woocommerce'); ?>"><?php esc_html_e('Reset password', 'woocommerce'); ?></button>
		</p>

		<?php wp_nonce_field('lost_password', 'woocommerce-lost-password-nonce'); ?>

	</form>

</div>

<?php
do_action('woocommerce_after_lost_password_form');
