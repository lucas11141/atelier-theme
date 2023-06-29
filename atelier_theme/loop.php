<?php
// args
$args = array(
    'numberposts'   => 1,
);

// query
$the_query = new WP_Query($args);
?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

        <?php
        $postId = get_the_ID();
        $postType = get_post_type($postId);

        // Dates
        $hasDates = false;

        // Allgemein
        global $color;
        $title = get_the_title();
        $duration = get_field("duration", $postId);
        $group = get_field("group", $postId);
        $description = get_field("description", $postId);

        // Options
        $options = $postType . '_options';
        $booking = get_field("booking", $options);

        // Kurse
        if ($postType === 'course') {
            $hasDates = course_has_dates($postId);
            $duration = get_field('sessions') . ' x ' . $duration;
        }

        // Workshops
        if ($postType === 'workshop' || $postType === 'holiday_workshop') {
            $hasDates = workshop_has_dates($postId);
            $duration = get_field('duration_1', $postId);
            if (get_field('duration_2', $postId)) $duration .= ' + ' . get_field('duration_2', $postId);
        }

        // Ferienworkshops
        if ($postType === 'holiday_workshop') {
            $booking_scheduled = get_field('booking_scheduled', 'holiday_workshop_options');
        }

        // Kindergeburtstage
        if ($postType === 'birthday') {
            $hasDates = true;
            $duration = get_field('duration', $postId);
        }

        // Kunstevents
        if ($postType === 'event') {
            $hasDates = true;
            $duration = get_field('duration', $postId);
        }
        ?>

        <article class="product__item <?= $postType === '--course' ? '--' . $group['value'] : '' ?> <?= $hasDates ? '' : '--disabled' ?>">

            <div class="product__image">
                <?php
                the_post_thumbnail('gallery-slider');
                ?>
                <img class="border__right" src="<?= get_template_directory_uri() ?>/assets/img/website/border_round_right_white.svg" alt="">
                <div class="product__time">
                    <span class="time"><?= $duration ?> Stunden</span>
                    <span class="hour">Dauer</span>
                </div>
            </div>

            <div class="product__content">
                <?php if ($postType === 'event') : ?>
                    <h6>Thema</h6>
                <?php endif; ?>

                <h2>
                    <?= $title ?>
                    <?php if (!empty($group)) : ?>
                        <br>
                        <span class="h6"><?= $group['label'] ?></span>
                    <?php endif; ?>
                </h2>

                <?php if ($description) : ?>
                    <p><?= substrwords($description, 150) ?></p>
                <?php endif; ?>


                <div class="two-buttons">
                    <?php get_template_part('template-parts/button', '', array(
                        'button' => array(
                            'url' => get_permalink(),
                            'title' => 'Weitere Infos',
                        ),
                        'color' => 'transparent'
                    )); ?>
                    <?php get_booking_button($postId, $hasDates, $booking_scheduled); ?>
                </div>
            </div>

        </article>

    <?php endwhile; ?>

<?php else : ?>

    <!-- <h2><?php _e('Sorry, nothing to display.', 'atelier'); ?></h2> -->
    <article class="border__box no__workshops__available">
        <?php
        $postType = $wp_query->query['post_type'];
        $no_posts = get_field('no_results', $postType . '_options');
        ?>
        <?php if ($no_posts) : ?>
            <?= $no_posts; ?>
        <?php else : ?>
            <h3><?= __('Sorry, nothing to display.', 'atelier') ?></h3>
        <?php endif; ?>
    </article>


<?php endif; ?>