<?php
$label = $args['label'];
$class = $args['class'];
$icon = $args['icon'];
$tooltip = $args['tooltip'];
$color = $args['color'];

// Set color style when color is given
if ($color) $colorStyle = 'background-color:' . $color;
?>

<?php if ($tooltip) : ?>
    <div class="badge-tooltip">
    <?php endif; ?>

    <span class="product__badge" style="<?= $colorStyle; ?>">
        <?php get_template_part('components/icon', '', $icon); ?>
        <?php //get_template_part('components/icon', '', array('url' => $badge_icon['url'], 'alt' => $badge_icon['alt'], 'size' => 'small')); 
        ?>
        <?= $label ?>
    </span>

    <?php if ($tooltip) : ?>
        <div class="tooltip">
            <?php get_template_part('components/icon', '', array('icon' => 'info')); ?>
            <span><?= $tooltip ?></span>
        </div>
    </div>
<?php endif; ?>