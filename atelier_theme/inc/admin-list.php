<?php


function my_pre_get_posts($query)
{
    // do not modify queries in the admin
    if (is_admin()) {
        return $query;
    }

    // only modify queries for 'event' post type
    if (isset($query->query_vars['post_type']) && $query->query_vars['post_type'] == 'course_date') {

        $query->set('orderby', 'meta_value');
        $query->set('meta_key', 'date');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', 100);
    }


    // return
    return $query;
}
add_action('pre_get_posts', 'my_pre_get_posts');
