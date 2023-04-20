<?php
$button = $args['button'];
$color = $args['color'] ?? 'main';
$icon = $args['icon'] ?? false;
$disabled = $args['disabled'] ?? false;
if ($button) :
    $link_url = $button['url'];
    $link_title = $button['title'];
    $link_target = !empty($button['target']) ? $button['target'] : '_self';
?>
    <a class="button --color-<?php echo $color; ?>" href="<?php echo $link_url; ?>" target="<?php echo $link_target; ?>" <?= $disabled ? 'disabled' : '' ?>>
        <?php if ($icon) : ?>
            <!-- <img src="<?= get_template_directory_uri() ?>/img/website/icon_<?= $icon ?>.svg"> -->

            <svg class="feather">
                <use href="<?= get_template_directory_uri() ?>/assets/feather-sprite.svg#<?= $icon ?>" />
            </svg>
        <?php endif; ?>

        <span><?php echo $link_title; ?></span>
    </a>
<?php endif; ?>