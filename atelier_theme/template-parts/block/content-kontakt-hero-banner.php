<?php
/**
 * Block Name: Kontakt Hero Banner
 *
 */

// get fields
$uberschrift_h1 = get_field( "uberschrift_h1" );
$uberschrift_h5 = get_field( "uberschrift_h5" );
$bild = get_field( "bild" );
$tab_1 = get_field( "tab_1" );
$tab_2 = get_field( "tab_2" );
$tab_3 = get_field( "tab_3" );

$id = $block["id"];
?>



<div id="<?php echo $id; ?>" class="kontakt__banner">

    <?php get_template_part('template-parts/header-bar', '', array( 'type'=>'atelier', 'color'=>'white', 'drop'=>false, 'hero'=>true )); ?>

    <div class="wrapper">

        <div class="banner__text">
            <div>
                <?php if( !empty( $uberschrift_h1 ) ) : ?>
                    <h1><?= $uberschrift_h1 ?></h1>
                <?php endif; ?>
                <?php if( !empty( $uberschrift_h5 ) ) : ?>
                    <h5><?= $uberschrift_h5 ?></h5>
                <?php endif; ?>
            </div>
            <?php if( !empty( $bild ) ) : ?>
                <img src="<?= $bild["url"] ?>" alt="<?= $bild["alt"] ?>">
            <?php endif; ?>
        </div>
        
        <div class="kontakt__methods">
            <div class="methods__item --arrows" data-index="0" data-hash="allgemein">
                <h5><?= $tab_1["titel"]; ?></h5>
                <p><?= $tab_1["beschreibung"]; ?></p>
            </div>
            <div class="methods__item --arrows" data-index="1" data-hash="schnuppern">
                <h5><?= $tab_2["titel"]; ?></h5>
                <p><?= $tab_2["beschreibung"]; ?></p>
            </div>
            <div class="methods__item --arrows" data-index="2" data-hash="telefon">
                <h5><?= $tab_3["titel"]; ?></h5>
                <p><?= $tab_3["beschreibung"]; ?></p>
            </div>
        </div>
        
    </div>

    <?php get_template_part('template-parts/paper'); ?>
    <img class="background__circle" src="<?= get_template_directory_uri() ?>/img/website/kontakt/kontakt_background_circle.svg" alt="">

</div>

<div class="kontakt__forms wrapper">

    <div class="form__dummy">
        <p>Kontaktmöglichkeit oberhalb wählen...</p>
        <div class="dummy__item dummy__title"></div>
        <div class="flex-row">
            <div class="flex-column">
                <div class="dummy__item dummy__input"></div>
                <div class="dummy__item dummy__input"></div>
                <div class="dummy__item dummy__input"></div>
            </div>
            <div class="flex-column">
                <div class="dummy__item dummy__textarea"></div>
            </div>
        </div>
    </div>

    <div class="methods__content --hidden" data-index="0">
        <h4><img src="<?= get_template_directory_uri() ?>/img/icons/icon_send_green.svg"><?= $tab_1["formularname"]; ?></h4>
        <?php echo do_shortcode($tab_1["formular_shortcode"]); ?>
    </div>

    <div class="methods__content --hidden" data-index="1">
        <h4><img src="<?= get_template_directory_uri() ?>/img/icons/icon_send_green.svg"><?= $tab_2["formularname"]; ?></h4>
        <div class="schnuppertermin">
            <?php echo do_shortcode($tab_2["formular_shortcode"]); ?>
        </div>
    </div>

    <div class="methods__content --hidden" data-index="2">
        <h4><img src="<?= get_template_directory_uri() ?>/img/icons/icon_phone_green.svg"><?= $tab_3["formularname"]; ?></h4>
        <div class="contact__list">
            <a class="contact__item" href="tel:<?= get_field("telefon", "option") ?>">
                <img src="<?= get_template_directory_uri() ?>/img/icons/icon_phone_green.svg" alt="">
                <div>
                    <h6>Telefon</h6>
                    <h4><?= get_field("telefon", "option") ?></h4>
                </div>
            </a>
        </div>
    </div>

</div>