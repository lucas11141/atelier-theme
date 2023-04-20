<?php

/**
 * Block Name: Abstand
 *
 */

// get fields
$abstand = get_field_object('abstand');
$abstand_mobile = get_field_object('abstand_mobile');
?>

<div class="space-<?= $abstand['value'] ?> --mobile-space-<?= $abstand_mobile["value"] ?>"></div>