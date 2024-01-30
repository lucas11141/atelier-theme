<?php
$label = $args['label'];
if (!$label) return;

$class = $args['class'];
$icon = $args['icon'];
$tooltip = $args['tooltip'];
$color = $args['color'];
$hideOnArchive = $args['hideOnArchive'];

// Set color style when color is given
if ($color) $colorStyle = 'background-color:' . $color;
?>

<?php if ($tooltip) : ?>
    <div class="badge-tooltip">
    <?php endif; ?>

    <span class="product__badge <?= $hideOnArchive ? '--hide-on-archive' : '' ?>" style="<?= $colorStyle; ?>">
        <?php get_template_part('components/icon', '', $icon); ?>
        <?= $label ?>
    </span>

    <?php if ($tooltip) : ?>
        <div class="tooltip">
            <?php get_template_part('components/icon', '', array('icon' => 'info')); ?>
            <span><?= $tooltip ?></span>
        </div>
    </div>
<?php endif; ?>