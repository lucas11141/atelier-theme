<?php
$id = $args['id'] ?? null;

$button = $args['button'] ?? null;
$color = $args['color'] ?? 'main';
?>

<?php if ($button) : ?>
    <a class="button  --color-<?= $color ?>" href="<?php echo $button["url"] ?>" target="<?php echo $button["target"]; ?>">
        <span><?php echo $button["title"]; ?></span>
    </a>
<?php endif; ?>