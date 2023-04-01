<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon/favicon.svg">
        <link rel="icon" type="image/ico" sizes="256x256" href="<?php echo get_template_directory_uri(); ?>/img/favicon/favicon.ico">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta name="description" content="<?php bloginfo('description'); ?>">

		<meta name="theme-color" content="#00162e">

		<?php wp_head(); ?>

		<?php if (is_page('buchung')) : ?>
			<script type="text/javascript" src="<?= get_template_directory_uri() ?>/js/pages/booking.js" defer></script>
		<?php endif; ?>

		<?php if (is_page('galerie')) : ?>
			<script type="text/javascript" src="<?= get_template_directory_uri() ?>/js/pages/gallery.js" defer></script>
		<?php endif; ?>

	</head>
	<body <?php body_class(); ?>>
		<!-- site -->

			<?php
			// d(wp_get_registered_image_subsizes());

			if( is_page('shop') || is_woocommerce() || is_shop() || is_product_category() || is_product_tag() || is_product() || is_cart() || is_checkout() || is_account_page() || is_page('sendungsverfolgung') ) {
				$websiteCat = 'shop';
			} else {
				$websiteCat = 'atelier';
			}

			$seitenkategorie = get_field('seitenkategorie');
			if ($seitenkategorie === 'shop' || $websiteCat === 'website') {
				$websiteCat = $seitenkategorie;
			}
			?>
			<div id="website-mode--<?= $websiteCat ?>"></div>

			<?php
			if( !is_page('impressum') && !is_page('datenschutz')  && !is_page('agb-shop')  ) {
				$header_hidden = "--hidden-on-load";
				$header_hidden_offset = get_field("anzeige_offset");
			} else {
				$header_hidden = "";
			}
			?>

 			<header class="header <?= $header_hidden ?> <?php if( is_page("Kunstangebote") ) { echo "--hidden"; } ?> header--<?= $websiteCat ?>" data-show-offset="<?= $header_hidden_offset ?>">

				<?php if ($websiteCat === 'atelier') :
					get_template_part('template-parts/header-bar', '', array( 'type'=>'atelier', 'nav'=>true ));
				elseif ($websiteCat === 'shop') :
					get_template_part('template-parts/header-bar', '', array( 'type'=>'shop', 'nav'=>true ));
				endif; ?>

				<div class="header__dropdown header__dropdown__mobile" style="display:none;">

					<div class="dropdown__links">
						<?php if ($websiteCat === 'atelier') :
							custom_menu_theme_mobile_big("atelier-header-menu-mobile-first");
						elseif ($websiteCat === 'shop') :
							custom_menu_theme_mobile_big("shop-header-menu-mobile-first");
						endif; ?>
					</div>

					<div class="dropdown__dark">
						<?php if ($websiteCat === 'atelier') :
							custom_menu_theme_mobile_small("atelier-header-menu-mobile-second");
						elseif ($websiteCat === 'shop') :
							custom_menu_theme_mobile_small("shop-header-menu-mobile-second");
						endif; ?>
						
						<?php
						if ($websiteCat === 'atelier') {
							atelier_law_nav();
						} elseif ($websiteCat === 'shop') {
							shop_law_nav();
						}
						?>

						<?php echo get_paper_structure(); ?>
					</div>

				</div>

			</header>

			<main id="main">