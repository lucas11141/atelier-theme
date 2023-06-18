<?php
function alter_wpcf7_posted_data($data)
{
    // true if $_POST['course'] doesnt contain "Kinder"
    if (strpos($_POST['course'], 'Kinder') === false) {
        $_POST['childname'] = "Replaced by filter";
        $_POST['childage'] = "Replaced by filter";
    }

    return $data;
}
add_filter("wpcf7_posted_data", "alter_wpcf7_posted_data");
