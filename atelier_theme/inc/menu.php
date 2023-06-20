<?php
// Allgemein: Rechtsmenü
function law_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'law-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="nav--law">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

/*------------------------------------*\
	Website - Definitionen
\*------------------------------------*/
// Atelier: Hauptmenü (links)
function atelier_nav_left()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-left',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

// Atelier: Hauptmenü (rechts)
function atelier_nav_right()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-right',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

// Atelier: Hauptmenü Mobil (oben)
function atelier_nav_mobile_first()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-mobile-first',
            'menu'            => 'testmenu',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}

// Atelier: Hauptmenü Mobil (unten)
function atelier_nav_mobile_second()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-header-menu-mobile-second',
            'menu'            => 'testmenu',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}

// Atelier: Footer-Menü
function atelier_footer_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'atelier-footer-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="footer__links">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

/*------------------------------------*\
	Shop - Definitionen
\*------------------------------------*/
// Shop: Hauptmenü (links)
function shop_nav_left()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-left',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

// Shop: Hauptmenü (rechts)
function shop_nav_right()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-right',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

// Shop: Hauptmenü Mobil (oben)
function shop_nav_mobile_first()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-mobile-first',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}

// Shop: Hauptmenü Mobil (unten)
function shop_nav_mobile_second()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-header-menu-mobile-second',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'items_wrap'      => '<ul>%3$s</ul>',
            'depth'           => 0,
            'walker'          => '',
        )
    );
}

// Shop: Footer-Menü
function shop_footer_nav()
{
    wp_nav_menu(
        array(
            'theme_location'  => 'shop-footer-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="footer__links">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
        )
    );
}

// Register Navigation
function register_atelier_menu()
{
    register_nav_menus(array( // Using array to specify more menus if needed
        'atelier-header-menu-left' => __('Atelier: Hauptmenü (links)', 'atelier'), // Main Navigation
        'atelier-header-menu-right' => __('Atelier Hauptmenü (rechts)', 'atelier'), // Main Navigation
        'atelier-header-menu-mobile-first' =>  __('Atelier: Hauptmenü Mobil (oben)', 'atelier'), // Main Navigation,
        'atelier-header-menu-mobile-second' =>  __('Atelier: Hauptmenu Mobil (unten)', 'atelier'), // Main Navigation,
        'atelier-footer-menu' => __('Atelier: Footer-Menü', 'atelier'), // Main Navigation
        'atelier-law-menu' => __('Atelier: Rechtsmenü', 'atelier'), // Main Navigation

        'shop-header-menu-left' => __('Shop: Hauptmenü (links)', 'atelier'), // Main Navigation
        'shop-header-menu-right' => __('Shop Hauptmenü (rechts)', 'atelier'), // Main Navigation
        'shop-header-menu-mobile-first' =>  __('Shop: Hauptmenü Mobil (oben)', 'atelier'), // Main Navigation,
        'shop-header-menu-mobile-second' =>  __('Shop: Hauptmenu Mobil (unten)', 'atelier'), // Main Navigation,
        'shop-footer-menu' => __('Shop: Footer-Menü', 'atelier'), // Main Navigation
        'shop-law-menu' => __('Shop: Rechtsmenü', 'atelier'), // Main Navigation      

        'law-menu' => __('Rechtsmenü', 'atelier'), // Main Navigation
    ));
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '')
{
    $args['container'] = false;
    return $args;
}

add_action('init', 'register_atelier_menu'); // Add HTML5 Blank Menu
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation

/*------------------------------------*\
	Funktionen
\*------------------------------------*/
function prefix_nav_description($item_output, $item, $depth, $args)
{
    if (!empty($item->description)) {
        $item_output = str_replace($args->link_after . '</a>', '<p class="menu-item-description">' . $item->description . '</p>' . $args->link_after . '</a>', $item_output);
    }

    return $item_output;
}
add_filter('walker_nav_menu_start_el', 'prefix_nav_description', 10, 4);


// custom menu example @ https://digwp.com/2011/11/html-formatting-custom-menus/
function custom_menu_theme_mobile_big($menu_name)
{
    if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
        $menu = wp_get_nav_menu_object($locations[$menu_name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list = "\t\t\t\t" . '<ul>' . "\n";
        foreach ((array) $menu_items as $key => $menu_item) {
            // Level 1
            if ($menu_item->menu_item_parent === '0') {
                // if(true) {
                $template_directory_uri = get_template_directory_uri();
                $url = $menu_item->url;
                $title = $menu_item->title;
                $description = $menu_item->description;
                $classes = $menu_item->classes;
                $classes = implode(" ", $classes);
                $bild = get_field('bild', $menu_item);
                $bild_url = $bild["url"];
                $menu_list .= "<li class='dropdown__links__item {$classes}'>
                    <a class='main-link' href='{$url}'>
                        <div>
                            <p class='title__arrow'>{$title}<img src='{$template_directory_uri}/assets/img/elements/arrow_dropdown_dark.svg' alt=''></p>
                            <span>{$description}</span>
                            </div>";
                if ($bild_url) {
                    $menu_list .= "<img class='image' src='{$bild_url}' alt=''>";
                }
                $menu_list .= "</a>";

                // // Level 2
                $menu_list .= "<ul class='submenu' style='display:none;'>";
                foreach ((array) $menu_items as $key => $sub_menu_item) {
                    if ((int) $sub_menu_item->menu_item_parent === $menu_item->ID) {
                        $classes = implode(" ", $sub_menu_item->classes);
                        $menu_list .= "<li class='{$classes}'><a href='{$sub_menu_item->url}'>{$sub_menu_item->title}</a></li>";
                    }
                }
                $menu_list .= "</ul>";

                $menu_list .= "</li>";
            }
        }
        $menu_list .= "\t\t\t\t" . '</ul>' . "\n";
    } else {
        // $menu_list = '<!-- no list defined -->';
    }
    echo $menu_list;
}
// custom menu example @ https://digwp.com/2011/11/html-formatting-custom-menus/
function custom_menu_theme_mobile_small($menu_name)
{
    if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
        $menu = wp_get_nav_menu_object($locations[$menu_name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list = "\t\t\t\t" . '<ul>' . "\n";
        foreach ((array) $menu_items as $key => $menu_item) {
            $template_directory_uri = get_template_directory_uri();
            $url = $menu_item->url;
            $title = $menu_item->title;
            $classes = $menu_item->classes;
            $classes = implode(" ", $classes);
            $icon = get_field('icon', $menu_item);
            $menu_list .= "<li>
                <a class='button --color-main-light {$classes}' href='{$url}'>
                    <span class='title__arrow'>{$title}<img src='{$template_directory_uri}/assets/img/elements/arrow_dropdown_white.svg' alt=''></span>
                    <img class='icon' src='{$icon}' alt=''>
                    <img class='icon__bg' src='{$icon}' alt=''>
                </a>
            </li>";
        }
        $menu_list .= "\t\t\t\t" . '</ul>' . "\n";
    } else {
        // $menu_list = '<!-- no list defined -->';
    }
    echo $menu_list;
}
