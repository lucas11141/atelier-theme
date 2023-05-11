<?php
// always update values of all bidirectional fields
add_filter('acfe/bidirectional/force_update', '__return_true');

// or target a specific field only
add_filter('acfe/bidirectional/force_update/name=my_field', '__return_true');
