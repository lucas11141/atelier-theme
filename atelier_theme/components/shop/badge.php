<?php
$label = $args['label'];
if (!$label) return;

$class = $args['class'];
$icon = $args['icon'];
$tooltip = $args['tooltip'];
$color = $args['color'];
$hideOnArchive = $args['hideOnArchive'];

// Set color style when color is given
if ($color) $colorStyle = 'color:' . $color;
?>

<?php if ($label) : ?>
    <div class="info-badge" style="<?= $colorStyle ?>">
        <span class="label">
            <?php if ($icon) : ?>
                <?php get_template_part('components/icon', 'feather', array('icon' => $icon)); ?>
            <?php endif; ?>

            <?= $label ?>
        </span>

        <?php if ($tooltip) : ?>
            <i class="info tooltip" data-tippy-content="<?= $tooltip ?>">
                <?php get_template_part('components/icon', 'feather', array('icon' => 'info')); ?>
            </i>
        <?php endif; ?>
    </div>
<?php endif; ?>