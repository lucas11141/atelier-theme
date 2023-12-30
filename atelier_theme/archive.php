<?php get_header(); ?>

<main role="main">

    <section>
        <?php
        $postType = get_queried_object()->name;
        $category = $postType; // TODO: Change to $postType
        $options = $postType . '_options';
        $color = load_product_colors($postType);
        $plural = get_field('plural', $options);

        $post_count = $wp_query->found_posts;
        ?>

        <!-- Hero banner -->
        <div class="page__start category__header">

            <?php get_template_part('components/header-bar', '', array('type' => 'atelier', 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

            <div class="wrapper header__content">

                <?php
                $thumbnail = get_field("thumbnail", $options);
                $status = get_field("status", $options);
                $hero_banner = get_field("hero_banner", $options);
                $headline_h1 = $hero_banner["headline_h1"] ?? null;
                $subline_h1 = $hero_banner["subline_h1"] ?? null;
                $description = $hero_banner["description"] ?? null;

                if ($postType === 'holiday_workshop') {
                    $booking_scheduled = is_booking_scheduled();
                    if ($booking_scheduled) $status = 'Buchung ab ' . get_booking_schedule_date();
                }
                ?>

                <?php get_template_part('components/button', 'link', array('color' => $color, 'direction' => 'left', 'button' => array('title' => 'Zurück zur Übersicht', 'url' => get_site_url() . '/#' . $postType))); ?>

                <div class="header__text">

                    <?php if ($status) : ?>
                        <div class="info__badge">
                            <div></div>
                            <p><?= $status ?></p>
                        </div>
                    <?php endif; ?>

                    <?php if ($headline_h1) : ?>
                        <h1><?= $headline_h1 ?>
                            <?php if ($subline_h1) : ?>
                                <br><span class="h6"><?= $subline_h1 ?></span>
                            <?php endif; ?>
                        </h1>
                    <?php endif; ?>

                    <?php if ($description) : ?>
                        <p><?= $description ?></p>
                    <?php endif; ?>

                    <?php if ($post_count > 0) : ?>
                        <?php if ($postType !== 'course') : ?>
                            <?php get_template_part('components/button', '', array('color' => $color, 'button' => array('title' => $plural . ' entdecken', 'url' => '#list'))); ?>
                        <?php else : ?>
                            <div class="two-buttons">
                                <?php get_template_part('components/button', '', array('color' => 'blue', 'class' => 'button--filter --child', 'button' => array('title' => 'Für Kinder', 'url' => '#list'))); ?>
                                <?php get_template_part('components/button', '', array('color' => 'purple', 'class' => 'button--filter --adult', 'button' => array('title' => 'Für Erwachsene', 'url' => '#list'))); ?>
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>

                </div>

                <div class="space-large"></div>

                <?php if ($thumbnail) : ?>
                    <img class="header__image" src="<?= $thumbnail["url"] ?>" alt="<?= $thumbnail["alt"] ?>">
                <?php endif; ?>

            </div>


            <?php get_template_part('components/paper'); ?>
            <img class="background__circle" src="<?= get_template_directory_uri() ?>/assets/img/website/kontakt/kontakt_background_circle.svg" alt="">

        </div>

        <!-- Page start anchor -->
        <div id="pagestart"></div>


        <!-- USP -->
        <?php
        $items = [];
        if (have_rows('usp', $options)) : ?>
            <h2 class="text-center wrapper"><?= get_field('headline_h2', $options) ?></h2>
            <div class="space-medium"></div>

            <?php while (have_rows('usp', $options)) : the_row();
                $items[] = array(
                    'icon' => get_sub_field("icon"),
                    'headline_h3' => get_sub_field("headline_h3"),
                    'headline_h6' => get_sub_field("subline"),
                    'text' => get_sub_field("text"),
                );
            endwhile; ?>

            <?php get_template_part('components/usp-tiles', '', array('items' => $items)) ?>
            <div class="space-large"></div>
        <?php endif; ?>


        <?php if ($post_count > 0) : ?>

            <?php if ($postType !== 'course') : ?>

                <!-- Anzahl der Ergebnisse -->
                <?php get_template_part('components/kunstangebot/product-count', '', array('label' => $post_count > 1 ? $plural : translateString($postType), 'value' => $post_count)); ?>

            <?php else : ?>

                <!-- Kurse: Filter nach Gruppe -->
                <div class="products__filter wrapper" id="list">
                    <div class="filter__button button--filter --child">Kinder</div>

                    <div class="filter__count">
                        <?php get_template_part('components/kunstangebot/product-count', '', array('label' => $post_count > 1 ? $plural : translateString($postType), 'value' => $post_count)); ?>

                        <div class="filter__reset --hidden">
                            <?php get_template_part('components/icon-feather', '', array('icon' => 'trash')); ?>
                            <span>Filter löschen</span>
                        </div>
                    </div>

                    <div class="filter__button button--filter --adult">Erwachsene</div>
                </div>

            <?php endif; ?>

        <?php endif; ?>

        <!-- Ferienprogramm -->
        <!-- <?php if ($postType == "holiday_workshop") : ?>
            <div class="ferienprogramm__discount wrapper">
                <h6>Rabattaktion</h6>
                <h3>Buche mehrere Workshops</h3>
                <div class="discount__list">
                    <div class="discount__item">
                        <h4>-10<span>%</span></h4>
                        <span class="span">Rabatt ab</span>
                        <h5>2 Workshops</h5>
                    </div>
                    <div class="discount__item">
                        <h4>-15<span>%</span></h4>
                        <span class="span">Rabatt ab</span>
                        <h5>3 Workshops</h5>
                    </div>
                    <div class="discount__item">
                        <h4>-20<span>%</span></h4>
                        <span class="span">Rabatt ab</span>
                        <h5>4 Workshops</h5>
                    </div>
                </div>
                <p>Der Preisnachlass wird auf alle gebuchten Workshops angewendet. Du bekommst den Preisnachlass beim letzten Workshopbesuch zurückerstattet. Das Angebot gilt nur für die Buchung von Workshops im Rahmen des Ferienprogrammes.</p>
            </div>
        <?php endif; ?> -->

        <div class="space-medium"></div>

        <div class="product-list">
            <?php get_template_part('loop'); ?>
            <?php get_template_part('pagination'); ?>
        </div>

        <div class="space-large"></div>

    </section>

</main>

<?php get_footer(); ?>