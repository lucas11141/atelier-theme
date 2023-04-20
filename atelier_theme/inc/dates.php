<?php
/*------------------------------------*\
Custom Admin List: Termine
\*------------------------------------*/

// add list columns
add_filter('manage_workshop_date_posts_columns', 'bs_workshop_date_table_head');
function bs_workshop_date_table_head($cols)
{
    $cols['datum'] = 'Datum';
    $cols['time'] = 'Uhrzeit';
    $cols['status'] = 'Status';
    return $cols;
}

// add list column contents
add_action('manage_workshop_date_posts_custom_column', 'bs_workshop_date_table_content', 10, 2);
function bs_workshop_date_table_content($column_name, $post_id)
{
    $postType = get_post_type($post_id);
    if ($postType !== 'workshop_date') return;

    $date_format = 'j. F Y';
    $date_1 = get_field('date_1', $post_id);
    $date_2 = get_field('date_2', $post_id);

    //
    if ($column_name == 'datum') {
        if (!empty($date_1['date'])) {
            $datum_1 = date($date_format, strtotime($date_1['date']));
            echo '<span>' . $datum_1 . '</span>';
        }
        if (!empty($date_2['date'])) {
            $datum_2 = date($date_format, strtotime($date_2['date']));
            echo ',<br><span>' . $datum_2 . '</span>';
        }
    }

    //
    if ($column_name == 'time') {
        if (!empty($date_1['date'])) echo '<span>' . $date_1['starttime'] . ' - ' . $date_1['endtime'] . ' Uhr</span>';
        if (!empty($date_2['date'])) echo ',<br><span>' . $date_2['starttime'] . ' - ' . $date_2['endtime'] . ' Uhr</span>';
    }

    //
    if ($column_name == 'status') {
        $datum = new DateTime($date_1['date']);
        $today = new DateTime();

        if ($datum > $today) {
            echo '<span style="color:green;">In der Zukunft</span>';
        } else {
            echo '<span style="color:red;">Vergangen</span>';
        }
    }
}

// Order by configuration
add_filter('manage_edit-workshop_date_sortable_columns', 'bs_workshop_date_table_sorting');
function bs_workshop_date_table_sorting($columns)
{
    $columns['termin'] = 'termin';
    $columns['product'] = 'product';
    return $columns;
}
add_filter('request', 'bs_workshop_date_column_orderby');
function bs_workshop_date_column_orderby($vars)
{
    if (isset($vars['orderby']) && 'termin' == $vars['orderby']) {
        $vars = array_merge($vars, array(
            'meta_key' => 'termin',
            'orderby' => 'meta_value',
        ));
    }
    return $vars;
}
add_filter('request', 'bs_product_column_orderby');
function bs_product_column_orderby($vars)
{
    if (isset($vars['orderby']) && 'product' == $vars['orderby']) {
        $vars = array_merge($vars, array(
            'meta_key' => 'kunstangebot',
            'orderby' => 'meta_value',
        ));
    }
    return $vars;
}



function remove_date_from_post($the_date, $format, $post)
{
    if (is_admin()) {
        return $the_date;
    }

    if ('post' !== $post->post_type) {
        return $the_date;
    }
    return '';
}

function remove_time_from_post($the_time, $format, $post)
{
    if (is_admin()) {
        return $the_time;
    }

    if ('post' !== $post->post_type) {
        return $the_time;
    }
    return '';
}

add_filter('get_the_date', 'remove_date_from_post', 10, 3);
add_filter('get_the_time', 'remove_time_from_post', 10, 3);







// add list columns
add_filter('manage_edit-course_time_columns', 'bs_course_time_table_head');
function bs_course_time_table_head($cols)
{
    $cols['dates'] = 'Termine';
    return $cols;
}

// add list column contents
add_action('manage_course_time_custom_column_display', 'bs_course_time_table_content', 10, 2);
function bs_course_time_table_content($content, $column_name, $post_id)
{
    if ($column_name === 'dates') {
        return 'fdkdfgjlk';
    }

    return '';
}
