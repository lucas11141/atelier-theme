<?php
$button = $args['button'];
$color = $args['color'] ?? 'main';
$direction = $args['direction'] ?? 'right';
if ($button) :
    $link_url = $button['url'];
    $link_title = $button['title'];
    $link_target = !empty($button['target']) ? $button['target'] : '_self';
?>
    <a class="back__button button-link --color-<?= $color ?> --direction-<?= $direction ?>" href="<?php echo $link_url; ?>" target="<?php echo $link_target; ?>">
        <span><?php echo $link_title; ?></span>
    </a>
<?php endif; ?>