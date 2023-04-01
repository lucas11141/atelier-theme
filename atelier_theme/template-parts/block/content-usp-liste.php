<?php
/**
 * Block Name: Bild & Text
 *
 */

// get fields
$id = $block["id"];
?>



<?php if( have_rows('usp_list') ): ?>
    <div class="usp__list wrapper" id="<?php echo $id; ?>">
    <?php while ( have_rows('usp_list') ) : the_row();
        $icon = get_sub_field( "icon" );
        $headline_h3 = get_sub_field( "headline_h3" );
        $headline_h6 = get_sub_field( "headline_h6" );
        $text = get_sub_field( "text" );
        ?>
        <div class="overview__item">
            <?php if( !empty( $icon ) ) : ?>
                <div><img src="<?= $icon[ "url" ]; ?>" alt="<?= $icon[ "alt" ]; ?>"></div>
            <?php endif; ?>
            <?php if( !empty( $headline_h3 ) ) : ?>
                <h3><?= $headline_h3 ?></h3>
            <?php endif; ?>
            <?php if( !empty( $headline_h6 ) ) : ?>
                <h6><?= $headline_h6 ?></h6>
            <?php endif; ?>
            <?php if( !empty( $text ) ) : ?>
                <?= $text ?>
            <?php endif; ?>
        </div>
    <?php endwhile; ?>
    </div>
<?php endif; ?>