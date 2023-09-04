<?php
function creat_category($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'inhaltselemente',
                'title' => __('Atelier Blöcke', 'inhaltselemente'),
            ),
        )
    );
}
add_filter('block_categories', 'creat_category', 10, 2);


add_action('acf/init', 'my_acf_init');
function my_acf_init()
{

    // check function exists
    if (function_exists('acf_register_block')) {

        acf_register_block(
            array(
                'name' => 'button',
                'title' => __('Button'),
                'description' => __('Eine verlinkte Schaltfläche.'),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'inhaltselemente',
                'icon' => 'button',
                'mode' => 'auto',
                'keywords' => array('button', 'cta'),
            )
        );

        acf_register_block(
            array(
                'name' => 'abstand',
                'title' => __('Abstand'),
                'description' => __('Ein Abstand zwischen den Elementen.'),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('abstand'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'page-start',
                'title' => 'Seitenanfang',
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'inhaltselemente',
                'mode' => 'preview',
                'supports' => array(
                    'align' => true,
                    'mode' => false,
                    'jsx' => true
                )
            )
        );

        acf_register_block(
            array(
                'name' => 'drei-schritte',
                'title' => __('3 Schritte'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('drei', "schritte"),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'newsletter',
                'title' => __('Newsletter'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('newsletter', 'sendinblue', 'brevo'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'schulederphantasie',
                'title' => __('Schule der Phantasie'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('Schule der Phantasie'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'zitat',
                'title' => __('Zitat'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('Zitat'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'atelier-entdecken',
                'title' => __('Atelier entdecken'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('atelier', 'entdecken'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'bild-text',
                'title' => __('Bild & Text'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('bild', 'text'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'produktslider',
                'title' => __('Produktslider'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('produkt', 'slider'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'video',
                'title' => __('Video'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('video'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'banner',
                'title' => __('Banner'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('banner'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'button-liste',
                'title' => __('Button Liste'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('button', 'liste'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'angebote-liste',
                'title' => __('Angebote Liste'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('angebote', 'liste'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'kunstangebot',
                'title' => __('Kunstangebot'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('angebote', 'liste'),
                'align' => false,
                'supports' => array('anchor' => true)
            )
        );

        acf_register_block(
            array(
                'name' => 'home-banner',
                'title' => __('Home Banner'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('home', 'banner'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'testimonials',
                'title' => __('Testimonials'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('testimonials'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'usp',
                'title' => __('USP'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('usp'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'usp-liste',
                'title' => __('USP Liste'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('usp', 'liste'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'usp-tiles',
                'title' => __('USP Kacheln'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('usp', 'kacheln'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'headline-button',
                'title' => __('Überschrift & Button'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('überschrift', 'button'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'bild-text-round',
                'title' => __('Bild & Text Rund'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('Bild', 'Text', 'rund'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'map',
                'title' => __('Karte'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('Karte', 'Map'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'uber-mich',
                'title' => __('Über mich'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('über', 'mich'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'bilder-slider',
                'title' => __('Bilder Slider'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('bilder', 'slider'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'galerie-ausstellung',
                'title' => __('Galerie Ausstellung'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('galerie', 'ausstellung'),
                'align' => false,
                'supports' => array('anchor' => true)
            )
        );

        acf_register_block(
            array(
                'name' => 'kontakt-hero-banner',
                'title' => __('Kontakt Hero Banner'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('kontakt', 'hero', 'banner'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'faq',
                'title' => __('FAQ'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('faq', 'fragen', 'antworten'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'hero-banner',
                'title' => __('Hero Banner'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('hero', 'banner'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'shop-hero-banner',
                'title' => __('Shop Hero Banner'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('shop', 'hero', 'banner'),
                'align' => false,
            )
        );


        acf_register_block(
            array(
                'name' => 'media-text',
                'title' => __('Media & Text'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('media', 'text'),
                'align' => false,
            )
        );

        acf_register_block(
            array(
                'name' => 'date-overview',
                'title' => __('Terminüberblick'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('termin', 'übersicht'),
                'align' => false,
                'supports' => array('anchor' => true)
            )
        );
    }
}

function my_acf_block_render_callback($block, $content = '', $is_preview = false, $post_id = 0)
{

    $slug = str_replace('acf/', '', $block['name']);

    $src = $block['data']['src'] ?? '';
    if ($is_preview) :
        echo '<img src="' . $src . '" width="100%" height="auto" />';
    endif;

    if (file_exists(get_theme_file_path("/template-parts/block/content-{$slug}.php"))) {
        include(get_theme_file_path("/template-parts/block/content-{$slug}.php"));
    }

    // include css if exist
    if (file_exists(get_theme_file_path("/assets/css/{$slug}.css"))) {
        wp_register_style($slug . '_style', get_template_directory_uri() . "/assets/css/{$slug}.css", array(), '1.0', 'all');
        wp_enqueue_style($slug . '_style'); // Enqueue it!
    }

    // include js if exist
    if (file_exists(get_theme_file_path("/assets/js/{$slug}.js"))) {
        wp_register_script($slug . '_js', get_template_directory_uri() . "/assets/js/{$slug}.js", array('jquery'), '1.0.0'); // Custom scripts
        wp_enqueue_script($slug . '_js'); // Enqueue it!
    }
}
