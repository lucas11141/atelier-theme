<?php
/**
 * Order details
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/order-details.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.6.0
 */

defined( 'ABSPATH' ) || exit;

$order = wc_get_order( $order_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

if ( ! $order ) {
	return;
}

$order_items           = $order->get_items( apply_filters( 'woocommerce_purchase_order_item_types', 'line_item' ) );
$show_purchase_note    = $order->has_status( apply_filters( 'woocommerce_purchase_note_order_statuses', array( 'completed', 'processing' ) ) );
$show_customer_details = is_user_logged_in() && $order->get_user_id() === get_current_user_id();
$downloads             = $order->get_downloadable_items();
$show_downloads        = $order->has_downloadable_item() && $order->is_download_permitted();

if ( $show_downloads ) {
	wc_get_template(
		'order/order-downloads.php',
		array(
			'downloads'  => $downloads,
			'show_title' => true,
		)
	);
}

$payment_method = $order->get_payment_method();
$payment_method_names = array(
	'ppcp-gateway' => 'Paypal',
);
$payment_method_title = $order->get_payment_method_title();

$payment_date = $order->get_date_paid();










$status = $order->get_status();
$status_title = esc_html( wc_get_order_status_name( $status ));

if ($status === 'pending') {
	$status_class = '--step-payment';
	$status_description = '';
}

if ($status === 'processing') {
	$status_class = '--step-progress';
	$status_description = 'Deine Bestellung wurde bezahlt und kann jetzt bearbeitet werden.';
}

if ($status === 'completed') {
	$tracking_items = ast_get_tracking_items($order_id);
	$status_class = '--step-sending';
	$status_description = 'Deine Bestellung wurde versendet und ist auf dem Weg zu Dir.';
}


// if ($status_title === 'In Bearbeitung') {
// 	$status_class = '--step-one';
// 	$status_description = 'Deine Bestellung wurde bezahlt und kann jetzt bearbeitet werden.';
// }







?>

<div class="account--order-single checkout-split">
	<div class="left">
		<div class="container">

			<!-- Order Header -->
			<div class="order__header">
				<?php
					$notes = $order->get_customer_order_notes();

					$data = $order->get_data();

					$date = strftime('%d. %B %Y', strtotime($data['date_created']->date('d. F Y')));
					$number = $order->get_order_number();
					$total = $order->get_formatted_order_total();
					$status = $data["status"];
				?>
				<ul class="order__facts">
					<li class="order__fact">
						<h6>Bestellung vom</h6>
						<p class="order-date"><?php echo $date; ?></p>
					</li>
					<li class="order__fact">
						<h6>Bestellnummer</h6>
						<p class="order-number"># <?php echo $number; ?></p>
					</li>
					<li class="order__fact">
						<h6>Summe</h6>
						<p class="order-total"><?php echo $total; ?></p>
					</li>
				</ul>
			</div>

			<!-- Order Status -->
			<div class="order__status <?= $status_class ?>">
				<ul class="order__facts">
					<li class="order__fact">
						<h6>Status</h6>
						<p class="order-status"><?= $status_title ?></p>
					</li>
					<?php if ($shipping_date) : ?>
						<li class="order__fact">
							<h6>Versanddatum</h6>
							<p class="order-number"><?= $shipping_date ?></p>
						</li>
					<?php endif; ?>
				</ul>

				<div class="order__status__timeline">
					<div class="labels">
						<span>Bezahlung</span>
						<span>Bearbeitung</span>
						<span>Versand</span>
					</div>
					<div class="timeline"><div></div></div>
				</div>

				<p class="order__status__description"><?= $status_description ?></p>
			</div>

			<!-- Shipping Infos -->		
			<?php //if ( !empty($tracking_items) ) : ?>	
				<div class="shipping__status">
					<h4>Sendungen</h4>
				</div>
			<?php //endif; ?>

			<!-- Order Cart -->
			<?php do_action( 'woocommerce_order_details_before_order_table', $order ); ?>
			<div class="order__cart">
				<h4>Warenkorb</h4>

				<div class="order__products">
	
					<?php $order = wc_get_order($order_id); ?>
					<!-- <h3 class="woocommerce-order-details__title"><strong><?php esc_html_e( 'Order details', 'woocommerce' ); ?></strong></h3>
					<h6 class="cart__productcount"><?php echo $order->get_item_count(); ?> Artikel</h6> -->
					
	
					<div class="cart__items //products__list">
							
						<?php do_action( 'woocommerce_order_details_before_order_table_items', $order ); ?>
	
						<?php foreach ($order->get_items() as $item_key => $item ):
							// Item ID is directly accessible from the $item_key in the foreach loop or
							$item_id = $item->get_id();
	
							$product = $item->get_product();
							$thumbnail = $product->get_image(array( 36, 36));
							$product_permalink = $product->get_permalink();
							$quantity = $item->get_quantity();
							?>
	
							<div class="cart__item //order__item">
	
								<div class="product__image">
									<?php
									$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $product->get_image(), $item, $item_key );
									if ( ! $product_permalink ) :
										echo $thumbnail; // PHPCS: XSS ok.
									else:
										printf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $thumbnail ); // PHPCS: XSS ok.
									endif;
									?>
								</div>
	
								<div class="product__infos">
	
									<span class="product__category"><?php echo wc_get_product_category_list( $item['product_id'] ); ?></span>
	
	
									<div class="product__name__price">
	
										<span class="product__name" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
											<?php
											if ( ! $product_permalink ) :
												echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $product->get_name(), $item, $item_key ) . '&nbsp;' );
											else:
												echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $product->get_name() ), $item, $item_key ) );
											endif;
											do_action( 'woocommerce_after_cart_item_name', $item, $item_key );
											?>
										</span>
	
										<span class="product__price" data-title="<?php esc_attr_e( 'Price', 'woocommerce' ); ?>">
											<?php echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_subtotal( $product, $quantity ), $item, $item_key ); // PHPCS: XSS ok. ?>
										</span>
	
									</div>
	
	
									<?php if( $product->is_type('variation') ) :
										// Get the variation attributes
										$variation_attributes = $product->get_variation_attributes();
										// Loop through each selected attributes
										foreach($variation_attributes as $attribute_taxonomy => $term_slug ) :
											// Get product attribute name or taxonomy
											$taxonomy = str_replace('attribute_', '', $attribute_taxonomy );
											// The label name from the product attribute
											$attribute_name = wc_attribute_label( $taxonomy, $product );
											// The term name (or value) from this attribute
											if( taxonomy_exists($taxonomy) ) :
												$attribute_value = get_term_by( 'slug', $term_slug, $taxonomy )->name;
											else:
												$attribute_value = $term_slug; // For custom product attributes
											endif;
										endforeach; ?>
										<span class="product__variation"><?php echo $attribute_name; ?>:&nbsp;<span><?php echo $attribute_value; ?></span></span>
									<?php endif; ?>
	
	
									<span class="product__quantity">Menge:&nbsp;<span><?php echo $quantity; ?></span></span>
	
								</div>
							</div>
	
						<?php endforeach; ?>
	
						<?php do_action( 'woocommerce_order_details_after_order_table_items', $order ); ?>
						
					</div>
	
				</div>
			</div>

			<!-- Customer Information -->
			<div class="order__infos">
				<h4>Weitere Informationen</h4>

				<ul class="order__facts --proxima">
					<li class="order__fact">
						<h6>Lieferadresse</h6>
						<p><?= $order->get_formatted_shipping_address(); ?></p>
					</li>
					<li class="order__fact">
						<h6>Rechnungsadresse</h6>
						<p><?= $order->get_formatted_billing_address(); ?></p>
					</li>
				</ul>
			</div>

			<!-- Notes -->
			<?php if ( $notes ) : ?>
				<div>
					<h4><?php esc_html_e( 'Order updates', 'woocommerce' ); ?></h4>
					
					<ol class="woocommerce-OrderUpdates commentlist notes">
						<?php foreach ( $notes as $note ) : ?>
						<li class="woocommerce-OrderUpdate comment note">
							<div class="woocommerce-OrderUpdate-inner comment_container">
								<div class="woocommerce-OrderUpdate-text comment-text">
									<p class="woocommerce-OrderUpdate-meta meta"><?php echo date_i18n( esc_html__( 'l jS \o\f F Y, h:ia', 'woocommerce' ), strtotime( $note->comment_date ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
									<div class="woocommerce-OrderUpdate-description description">
										<?php echo wpautop( wptexturize( $note->comment_content ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
									</div>
									<div class="clear"></div>
								</div>
								<div class="clear"></div>
							</div>
						</li>
						<?php endforeach; ?>
					</ol>
				</div>
			<?php endif; ?>

		</div>
	</div>

	<div class="right">
		<div class="container">

			<?php
			$actions = wc_get_account_orders_actions( $order );
			if ( ! empty( $actions ) ) : ?>
				<div class="order__controls">
					<?php foreach ( $actions as $key => $action ) : ?>
						<a class="button woocommerce-button <?php echo sanitize_html_class( $key ); ?>" href="<?php echo $action['url']; ?>">
							<span><?php echo esc_html( $action['name'] ); ?></span>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<div class="cart__calculation">
				<h4>Bestellübersicht</h4>

				<table class="woocommerce-table woocommerce-table--order-details shop_table order_details">
					<tfoot>
						<?php foreach ( $order->get_order_item_totals() as $key => $total ) : ?>
							<?php if ($key === 'discount') : ?>
								<tr data-row="<?= $key ?>">
									<th scope="row">
										<div class="shop_table__icon shop_table__icon--discount"></div>
										<?php echo esc_html( rtrim($total['label'], ':') ); ?>
									</th>
									<td><?= wc_price( $order->get_discount_total() ) ?></td>
								</tr>
								<tr data-row="<?= $key ?>_subtotal">
									<th scope="row">Zwischensumme</th>
									<td><?= wc_price( $order->get_subtotal() - $order->get_discount_total() ) ?></td>
								</tr>
							<?php else: ?>
								<tr data-row="<?= $key ?>">
									<th scope="row">
										<?php if ($key === 'shipping') { echo '<div class="shop_table__icon shop_table__icon--shipping"></div>'; } ?>
										<?php echo esc_html( rtrim($total['label'], ':') ); ?>
									</th>
									<td><?php echo ( 'payment_method' === $key ) ? esc_html( $total['value'] ) : wp_kses_post( $total['value'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></td>
								</tr>
							<?php endif; ?>
						<?php endforeach; ?>
						
						<?php if ( $order->get_customer_note() ) : ?>
							<tr>
								<th><?php esc_html_e( 'Note:', 'woocommerce' ); ?></th>
								<td><?php echo wp_kses_post( nl2br( wptexturize( $order->get_customer_note() ) ) ); ?></td>
							</tr>
						<?php endif; ?>
					</tfoot>
				</table>
			</div>
			<?php do_action( 'woocommerce_order_details_after_order_table', $order ); ?>

			<!-- Payment -->
			<?php if ($order->is_paid()) :
				$order_date_paid = $order->get_date_paid();
				$timestamp = $order_date_paid->getTimestamp() + (60*60*2);
				$payment_date = date('d. F o', $timestamp);
				$payment_time = date('G:i', $timestamp);
				?>
				<div class="order__payment">
					<h4>Zahlung</h4>

					<div class="order__payment__content">
						<?php if($payment_method_title !== '') : ?>
							<img src="<?= get_template_directory_uri() ?>/img/logos/logo-<?= $payment_method_title ?>.svg" alt="">
						<?php endif; ?>
						<p>Bezahlt <?php if($payment_method_title !== '') { echo 'mit '; } ?><strong><?= $payment_method_title ?></strong> am <?= $payment_date ?> um <?= $payment_time ?> Uhr.</p>
					</div>
				</div>
			<?php endif; ?>

		</div>
	</div>


	<?php
	/**
	 * Action hook fired after the order details.
	 *
	 * @since 4.4.0
	 * @param WC_Order $order Order data.
	 */
	do_action( 'woocommerce_after_order_details', $order );

	if ( $show_customer_details ) {
		wc_get_template( 'order/order-details-customer.php', array( 'order' => $order ) );
	}

	?>
</div>