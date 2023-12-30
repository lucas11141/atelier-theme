<?php
/*------------------------------------*/
/* Block name: Abstand  */
/*------------------------------------*/

$id = $block['anchor'] ?? $block['id'];

// BUGFIX: Mobile spacing not working

// get fields
$abstand = get_field_object('abstand');
$abstand_mobile = get_field_object('abstand_mobile');
?>

<div class="space-<?= $abstand['value'] ?>" id="<?= $id ?>"></div>