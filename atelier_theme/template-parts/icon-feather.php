<?php
$icon = $args['icon'] ?? false;
?>

<svg class="feather">
    <use href="<?= get_template_directory_uri() ?>/assets/feather-sprite.svg#<?= $icon ?>" />
</svg>