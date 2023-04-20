<?php
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
                'keywords' => array('newsletter'),
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
                'name' => 'newsletter-sendinblue',
                'title' => __('Newsletter Sendinblue'),
                'description' => __(''),
                'render_callback' => 'my_acf_block_render_callback',
                'category' => 'design',
                'category' => 'inhaltselemente',
                'mode' => 'edit',
                'keywords' => array('newsletter', 'sendinblue'),
                'align' => false,
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
    }
}
