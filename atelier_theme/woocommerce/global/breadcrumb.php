<?php

/**
 * Shop breadcrumb
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/breadcrumb.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     2.3.0
 * @see         woocommerce_breadcrumb()
 */

if (!defined('ABSPATH')) {
	exit;
}

if (!empty($breadcrumb)) {

	echo '<ul class="woocommerce-breadcrumb" itemscope="" itemtype="https://schema.org/BreadcrumbList">';

	$count = count($breadcrumb);
	$index = 1;

	foreach ($breadcrumb as $key => $crumb) {

		echo '<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">';

		if (!empty($crumb[1]) && sizeof($breadcrumb) !== $key + 1) {
			echo '<a href="' . esc_url($crumb[1]) . '">' . esc_html($crumb[0]) . '</a>';
		} else {
			echo '<span>' . esc_html($crumb[0]) . '</span>';
		}

		echo '<meta itemprop="position" content="' . $index . '">';
		echo '<meta itemprop="name" content="' . esc_html($crumb[0]) . '">';

		if (sizeof($breadcrumb) !== $key + 1) {
			echo "<svg class='seperator' width='5' height='9' viewBox='0 0 5 9' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.970001 1.39999L3.97 4.39999L0.970001 7.39999' stroke='white' style='stroke:white;stroke-opacity:1;' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>";
		}

		echo '</li>';
	}

	echo '</ul>';
}
