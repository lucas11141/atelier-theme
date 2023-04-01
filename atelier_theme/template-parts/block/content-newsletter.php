<?php
/**
 * Block Name: Newsletter
 *
 */

// get fields
$uberschrift_h5 = get_field('uberschrift_h5');
$uberschrift_h2 = get_field('uberschrift_h2');
$text = get_field('text');
$bild = get_field('bild');

$id = $block['id'];


// create align class ("alignwide") from block setting ("wide")
$align_class = $block['align'] ? 'align' . $block['align'] : '';

?>

<div id="<?php echo $id; ?>" class="newsletter__field wrapper">
    <div class="newsletter__content">

        <img class="newsletter__arrow" src="<?php echo get_template_directory_uri(); ?>/img/icons/newsletter_plane.svg" alt="">

        <h6><?php echo $uberschrift_h5; ?></h6>
        <h2><?php echo $uberschrift_h2; ?></h2>
        <p><?php echo $text; ?></p>

        <div class="form--newsletter">
            <?= do_shortcode('[sibwp_form id=2]'); ?>
        </div>

    </div>

    <div class="newsletter__image">
        <?php if( !empty( $bild ) ): ?>
            <img src="<?php echo esc_url($bild['sizes']['woocommerce_thumbnail']); ?>" alt="<?php echo esc_attr($bild['alt']); ?>"/>
        <?php endif; ?>
    </div>
</div>



<!-- <dialog class="popup popup--newsletter">
    <form method="dialog">
        <button class="button --color-white popup__close" value="cancel"></button>
    </form>
    <div class="popup__content">
        <div class="popup__text">

            <h5><?php echo $uberschrift_h5; ?></h5>
            <h2><?php echo $uberschrift_h2; ?></h2>
            <p><?php echo $text; ?></p>

            <div class="form--newsletter">
                <?= do_shortcode('[sibwp_form id=3]'); ?>
            </div>

        </div>

        <?php if( !empty( $bild ) ): ?>
            <img class="popup__image" src="<?php echo esc_url($bild['sizes']['woocommerce_thumbnail']); ?>" alt="<?php echo esc_attr($bild['alt']); ?>"/>
        <?php endif; ?>

    </div>
</dialog> -->