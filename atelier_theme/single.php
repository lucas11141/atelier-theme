<?php get_header(); ?>

<main role="main" class="website">
    <!-- section -->
    <section>

        <style>
            body {
                overflow-x: unset !important;
            }
        </style>

        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                <?php
                $is_bookable_note = "Aktuell nicht buchbar."; // TODO: Richtigen Wert einsetzen

                $postId = get_the_ID();
                $postType = get_post_type();
                $options = $postType . '_options';

                // Options - Kunstangebote (Einzelseite)
                $archive_button_title = get_field("archive_button_title", $options);
                $short_description = get_field("short_description", $options);
                $ablauf = get_field("ablauf", $options);
                $booking = get_field("booking", $options);
                $category_note = get_field("note", $options);

                // Options - Kunstangebote (Allgemein)
                $faq = get_field("faq", $options);
                $plural = get_field("plural", $options);

                // Wordpress Post Werte
                $title = get_the_title();
                $thumbnail = [];
                $thumbnail['url'] = get_the_post_thumbnail_url();
                $archive_link = get_post_type_archive_link($postType);
                $group = get_field("group");
                $weekdays = get_field("weekdays");
                $description = get_field("description");
                $note = get_field("note");
                $age = get_field("age");

                $color = load_product_colors($postType, $group['value'] ?? null);

                // Buchung
                $state = get_field("state");
                $isBookable = $state === 'active';
                $isBookable = true; // TODO: Richtigen Wert einsetzen
                $booking_button_title = $isBookable ? translateString($postType) . ' ' . $booking['verb'] : 'Termine ansehen';

                // Preise
                $pricing = get_field("pricing");
                $price = $pricing['base'];
                $price_base = $pricing['base'];

                // Leere Werte
                $duration = null;

                // Kurse
                if ($postType === 'course') {
                    $hasDates = course_has_dates($postId);

                    $sessions = get_field("sessions");
                    $duration = get_field("duration");
                    $duration = $sessions . ' x ' . $duration;

                    // Load weekdays from course_times and order them
                    $course_times = get_field('course_times');
                    $order = array_column($course_times, 'term_order');
                    array_multisort($order, SORT_ASC, $course_times);

                    if ($course_times) {
                        $weekdays = array_map(function ($time) {
                            $weekday = get_field('weekday', 'course_time_' . $time->term_id);
                            return $weekday['value'];
                        }, get_field('course_times'));
                        $weekdays = array_values(array_unique($weekdays));
                    } else {
                        $weekdays = [];
                    }
                }

                // Workshops
                if ($postType === 'workshop' || $postType === 'holiday_workshop') {
                    $hasDates = workshop_has_dates($postId);

                    $duration = get_field('duration_1');
                    if (get_field('duration_2', $postId)) $duration .= ' + ' . get_field('duration_2');
                }

                // Kindergeburtstage
                if ($postType === 'birthday') {
                    $hasDates = true;
                    $duration = get_field('duration');
                    $max_persons = get_field('max_persons');
                    $weekdays = get_field('weekdays', $options);
                }

                // Kunstevents
                if ($postType === 'event') {
                    $hasDates = true;
                    $weekdays = get_field('weekdays', $options);

                    $event_pricing = get_field("pricing", $options);
                    $price_hours = $event_pricing["hours"];
                    $price_food = $event_pricing["food"];
                    $price_material = $pricing['material'];
                    $price = (intval($price_hours[7]['value']) * 3.5 / 10) + intval($price_food) + $price_material;
                    $price = ceil($price);

                    $duration = "3,5 / 4,5";
                }

                // // Produktfakten
                // $age = get_field("age");
                // $description = get_field("description");
                // $price = get_field("price");
                // $duration = get_field("duration");
                // $skill_level = get_field("skill_level");
                // $person_count = get_field("person_count");

                // $baseprice_hour = get_field("baseprice_hour");
                // $price_person = get_field("price_person");

                function render_fact($title, $value, $icon)
                {
                    global $color;
                    if (!$title || !$value) return;
                ?>

                    <div class="item">
                        <div>
                            <h6><?= $title; ?></h6><span><?= $value; ?></span>
                        </div><img src="<?= get_template_directory_uri() ?>/img/icons/icon_<?= $icon ?>_<?= $color ?>.svg" alt="">
                    </div>
                <?php } ?>

                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                    <div id="<?php echo $id; ?>" class="page__start product__header --background-image">

                        <?php get_template_part('template-parts/header-bar', '', array('type' => 'atelier', 'color' => 'white', 'drop' => false, 'hero' => true)); ?>

                        <div class="wrapper">

                            <?php get_template_part('template-parts/button', 'link', array('color' => $color, 'direction' => 'left', 'button' => array('url' => $archive_link, 'title' => $archive_button_title ?? 'Zurück'))) ?>

                            <div class="header__content">
                                <div class="header__text">

                                    <!-- <?php if (!$is_bookable && !empty($is_bookable_note)) : ?>
                                        <div class="info__badge">
                                            <div></div>
                                            <p><?= $is_bookable_note ?></p>
                                        </div>
                                    <?php endif; ?> -->

                                    <h1 class="title">
                                        <?= $title ?>
                                        <?php if ($postType === 'course') : ?>
                                            <br><b>für <?= $group['label'] ?></b>
                                        <?php endif; ?>
                                    </h1>

                                    <?php if ($short_description) : ?>
                                        <p class="h6 subline"><?= $short_description ?></p>
                                    <?php endif; ?>

                                    <?php if ($description) : ?>
                                        <p class="description"><?= $description ?></p>
                                    <?php endif; ?>

                                    <div class="two-buttons">
                                        <?php get_template_part('template-parts/button', '', array('icon' => 'pen-tool', 'button' => array('url' => '#services', 'title' => 'So läuft`s ab'), 'color' => 'white')) ?>

                                        <?php if ($hasDates) : ?>
                                            <?php get_template_part('template-parts/button', '', array(
                                                'button' => array(
                                                    'url' => '#book',
                                                    'title' => 'Jetzt ' . $booking['verb'],
                                                ),
                                                'icon' => 'bookmark',
                                                'color' => $color
                                            )); ?>
                                        <?php else : ?>
                                        <?php get_template_part('template-parts/button', '', array(
                                                'button' => array(
                                                    'url' => '#',
                                                    'title' => 'Keine Termine',
                                                ),
                                                'icon' => 'calendar',
                                                'disabled' => true,
                                                'color' => $color
                                            ));
                                        endif; ?>
                                    </div>

                                    <?php if ($category_note) :  ?>
                                        <div class="info__badge">
                                            <div></div>
                                            <p><?= $category_note; ?></p>
                                        </div>
                                    <?php endif; ?>
                                </div>

                                <?php if ($thumbnail['url']) : ?>
                                    <img class="image" src="<?= $thumbnail['url'] ?>" alt="">
                                <?php endif; ?>
                            </div>
                        </div>

                        <?php if ($thumbnail['url']) : ?>
                            <img class="background__image" src="<?= $thumbnail['url'] ?>" alt="">
                        <?php endif; ?>

                        <?php get_template_part('template-parts/paper'); ?>
                        <img class="background__circle" src="<?= get_template_directory_uri() ?>/img/website/kontakt/kontakt_background_circle_<?= $color ?>.svg" alt="">
                    </div>

                    <div class="product__page">

                        <div class="product__split wrapper">
                            <div class="product__split__left">

                                <div class="product__explanation" id="services">
                                    <?php if (!empty($ablauf["headline_h2"])) : ?>
                                        <h2 class="h3"><?= $ablauf["headline_h2"] ?></h2>
                                    <?php endif; ?>

                                    <?php if ($ablauf["steps"]) :
                                        $i = 0; ?>

                                        <div class="explanation__list">
                                            <?php foreach ($ablauf["steps"] as $step) :
                                                $show_clock = $step["show_clock"];
                                                $subline = $step["subline"];
                                                $headline_h3 = $step["headline_h3"];
                                                $description = $step["description"];
                                                $i++;
                                            ?>

                                                <div class="list__item">
                                                    <?php if ($subline) : ?>
                                                        <h6>
                                                            <?php if ($show_clock) : ?>
                                                                <img src="<?= get_template_directory_uri() ?>/img/icons/icon_mini_clock_<?= $color ?>.svg">
                                                            <?php endif; ?>
                                                            <?php if ($postType === "birthday" && $i === 3) :
                                                                echo ($duration - 0.5) . " Stunden";
                                                            else :
                                                                echo $subline;
                                                            endif; ?>
                                                        </h6>
                                                    <?php endif; ?>

                                                    <?php if ($headline_h3) : ?>
                                                        <h3 class="h4"><?= $headline_h3 ?></h3>
                                                    <?php endif; ?>

                                                    <?php if ($description) : ?>
                                                        <p><?= $description ?></p>
                                                    <?php endif; ?>

                                                    <span class="background__number"><?= $i ?></span>
                                                </div>

                                            <?php endforeach; ?>
                                        </div>
                                    <?php endif; ?>

                                    <h2 class="h3">Überblick</h2>

                                    <div class="product__facts">
                                        <div class="facts__list">

                                            <div class="product__title__box">
                                                <div>
                                                    <h6><?= translateString($postType) ?></h6>
                                                    <h4><?= $title ?>
                                                        <?php if ($postType === "course") : ?>
                                                            <b>für <?= $group['label']; ?></b>
                                                    </h4>
                                                <?php endif; ?>
                                                </div>
                                                <?php if ($thumbnail['url']) : ?>
                                                    <img src="<?= $thumbnail['url'] ?>" alt="">
                                                <?php endif; ?>
                                            </div>

                                            <?php
                                            if ($postType === "course") {
                                                render_fact("Dauer", $duration . " Stunden", "clock");
                                                render_fact("Rhythmus", "14-Tägig", "calender");
                                                if ($group['value'] === 'child') {
                                                    if ($age) render_fact("Alter", $age . "+ Jahre", "user");
                                                }
                                                render_fact("Material", "Inkl. Material*", "infinity");
                                            } else if ($postType == "workshop") {
                                                render_fact("Dauer", $duration . " Stunden", "clock");
                                                if ($group['value'] === "child") {
                                                    render_fact("Alter", $age . "+ Jahre", "user");
                                                }
                                                render_fact("Material", "Inkl. Material*", "infinity");
                                            } else if ($postType == "birthday") {
                                                render_fact("Dauer", $duration . " Stunden", "clock");
                                                render_fact("Alter", $age . "+ Jahre", "user");
                                                render_fact("Teilnehmer", "Max. " . $max_persons . " Kinder", "group");
                                                render_fact("Wochentage", "Samstags oder Sonntags", "calender");
                                            } else if ($postType === "event") {
                                                render_fact("Service", "Individuelle Planung", "star");
                                                render_fact("Dauer", $duration . " Stunden", "clock");
                                                render_fact("Teilnehmer", "Beliebige Gruppengröße", "group");
                                            } else if ($postType === "holiday_workshop") {
                                                render_fact("Dauer", $duration . " Stunden", "clock");
                                                render_fact("Alter", $age . "+ Jahre", "user");
                                                render_fact("Material", "Inkl. Material*", "infinity");
                                            }
                                            ?>

                                        </div>
                                    </div>

                                    <?php if ($note) : ?>
                                        <p class="product__note"><?= $note ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>

                            <div class="product__split__right">
                                <div class="product__info__sticky">
                                    <div class="price">
                                        <h3 class="price__price">
                                            <?php if ($postType === 'event' || $postType === 'birthday') : ?>
                                                <span class="price__from">ab</span>
                                            <?php endif; ?>
                                            <?= $price ?>€
                                        </h3>

                                        <span class="price__perperson">
                                            <?php if ($postType == "birthday") {
                                                echo "+ " . $pricing['per_person'] . "€ Material pro Person";
                                            } else if ($postType == "event") {
                                                echo "pro Person";
                                            } ?>
                                        </span>

                                        <span class="price__duration">
                                            <?= $duration ?> Stunden
                                        </span>

                                        <span class="price__background"><?php echo $price; ?></span>
                                    </div>
                                    <div class="rest">
                                        <?php if ($postType == 'course' ||  $postType == 'birthday' || $postType == 'event') : ?>
                                            <?php get_template_part('template-parts/kunstangebot/available-days', '', array('days' => $weekdays)); ?>
                                        <?php endif; ?>

                                        <?php if ($hasDates) : ?>
                                            <?php get_template_part('template-parts/button', '', array(
                                                'button' => array(
                                                    'url' => '#book',
                                                    'title' => 'Jetzt ' . $booking['verb'],
                                                ),
                                                'icon' => 'bookmark',
                                                'color' => $color
                                            )); ?>
                                        <?php else : ?>
                                        <?php get_template_part('template-parts/button', '', array(
                                                'button' => array(
                                                    'url' => '#',
                                                    'title' => 'Keine Termine',
                                                ),
                                                'icon' => 'calendar',
                                                'disabled' => true,
                                                'color' => $color
                                            ));
                                        endif; ?>

                                        <?php if ($postType === "Kunstevent") : ?>
                                            <a class="button --color-transparent --open__popup button__pricelist" data-popup="preisliste">
                                                <span>Preisliste ansehen</span>
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="product__book" id="book">
                            <img class="border__top" src="<?= get_template_directory_uri() ?>/img/website/border_round_top_white.svg">
                            <div class="book__content wrapper">
                                <div class="book__info">
                                    <h2><img src="<?= get_template_directory_uri() ?>/img/website/icon_bookmark_<?= $color ?>.svg">
                                        <?php if ($postType === "course" || $postType === "workshop" || $postType === "holiday_workshop") { ?>
                                            Buchung
                                        <?php } else { ?>
                                            Anfrage
                                        <?php } ?>
                                    </h2>
                                    <h6><?= $booking['subline'] ?></h6>
                                    <p><?= $booking['description'] ?></p>
                                </div>
                                <img class="arrow__right" src="<?= get_template_directory_uri() ?>/img/website/book_arrow_right_<?= $color ?>.svg">
                                <div class="book__dates">

                                    <?php if ($postType === "course" || $postType === "workshop") : ?>
                                        <h5 class="headline">Buchung beginnen...</h5>
                                    <?php endif; ?>

                                    <?php if (!$isBookable && !empty($is_bookable_note)) : ?>
                                        <div class="info__badge">
                                            <div></div>
                                            <p><?= $is_bookable_note ?></p>
                                        </div>
                                    <?php endif; ?>

                                    <div class="dates__list" style="color:white;">

                                        <?php if ($postType === "course") :

                                            if (empty($course_times)) : ?>

                                                <div class="no__dates__available">
                                                    <span>Keine Termine verfügbar!</span>
                                                </div>

                                            <?php else : ?>

                                                <?php array_map(function ($time) {
                                                    global $postId, $isBookable;

                                                    $timeId = $time->term_id;
                                                    $weekday = get_field('weekday', 'course_time_' . $timeId);
                                                    $starttime = get_field('starttime', 'course_time_' . $timeId);
                                                    $endtime = get_field('endtime', 'course_time_' . $timeId); ?>

                                                    <a class="date <?= empty(get_course_dates($timeId)) ? '--disabled' : '' ?>" href="<?= BOOK_URL ?>/?productId=<?= $postId ?>&courseTime=<?= $timeId ?>">
                                                        <div>
                                                            <h5><?= $weekday['label'] ?></h5>
                                                            <h6><?= $starttime . ' - ' . $endtime . ' Uhr' ?></h6>
                                                        </div>
                                                        <img src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
                                                    </a>

                                                <?php }, $course_times); ?>

                                            <?php endif; ?>

                                        <?php endif; ?>

                                        <?php if ($postType === "workshop" || $postType === "holiday_workshop") :

                                            $dates = get_field('dates');

                                            if (empty($dates)) : ?>

                                                <div class="no__dates__available">
                                                    <span>Keine Termine verfügbar!</span>
                                                </div>

                                            <?php else : ?>

                                                <?php array_map(function ($date) {
                                                    global $postId, $isBookable;

                                                    $date_1 = get_field('date_1', $date->ID);
                                                    $date_2 = get_field('date_2', $date->ID);

                                                    if (empty($date_2['date'])) :

                                                        $date_1_timestamp = strtotime($date_1["date"]);
                                                        $date_readable = translateReadableDateToGerman(date("d. F Y", $date_1_timestamp));
                                                        $date_day = translateReadableDateToGerman(date("l", $date_1_timestamp)); ?>

                                                        <a class="date <?= $isBookable ?>" href="<?= BOOK_URL ?>/?productId=<?= $postId ?>&date=<?= $date->ID ?>">
                                                            <div>
                                                                <h5><?= $date_readable ?></h5>
                                                                <h6><?= $date_day ?></h6>
                                                            </div>
                                                            <span><?= $date_1["starttime"] ?> - <?= $date_1['endtime'] ?> Uhr</span>
                                                            <img src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
                                                        </a>

                                                    <?php else :

                                                        $date_1_timestamp = strtotime($date_1["date"]);
                                                        $date_2_timestamp = strtotime($date_2["date"]);
                                                        $date_readable = translateReadableDateToGerman(date("d.", $date_1_timestamp) . " + " . date("d. F Y", $date_2_timestamp));
                                                        $date_day = translateReadableDateToGerman(date("l", $date_1_timestamp) . " + " . date("l", $date_2_timestamp)); ?>

                                                        <a class="date <?= $isBookable ?>" href="<?= BOOK_URL ?>/?productId=<?= $postId ?>&date=<?= $date->ID ?>">
                                                            <div>
                                                                <h5><?= $date_readable ?></h5>
                                                                <h6><?= $date_day ?></h6>
                                                            </div>
                                                            <div>
                                                                <span><?= $date_1["starttime"] ?> - <?= $date_1['endtime'] ?> Uhr</span>
                                                                <span><?= $date_2["starttime"] ?> - <?= $date_2['endtime'] ?> Uhr</span>
                                                            </div>
                                                            <img src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
                                                        </a>

                                                    <?php endif; ?>

                                                <?php }, get_field('dates')); ?>

                                            <?php endif; ?>

                                            <!-- <div class="no__dates__available">
                                                <span>Keine Termine verfügbar!</span>
                                            </div> -->

                                        <?php endif; ?>

                                        <?php if ($postType === "birthday" || $postType === "event") :
                                            $sql_id = get_field("sql_id"); ?>

                                            <a class="date" href="<?= BOOK_URL ?>/?productId=<?= get_the_ID(); ?>">
                                                <div>
                                                    <h5>Jetzt Anfragen</h5>
                                                </div>
                                                <img class="--visible" src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
                                            </a>

                                        <?php endif; ?>

                                    </div>
                                </div>
                            </div>
                            <img class="border__bottom" src="<?= get_template_directory_uri() ?>/img/website/border_round_bottom_<?= $color ?>.svg">
                        </div>

                        <?php if ($faq) : ?>

                            <div class="faq product__faq">
                                <div class="wrapper">
                                    <div class="faq__header">
                                        <span>FAQ</span>
                                        <h2>Häufig gestellte Fragen</h2>
                                    </div>

                                    <div class="faq__accordeon accordeon accordeon--closed">
                                        <?php foreach ($faq as $row) :
                                            $question = $row["question"];
                                            $answer = $row["answer"];
                                        ?>
                                            <div class="accordeon__item">
                                                <dt class="accordeon__header">
                                                    <h5><?= $question ?></h5>
                                                    <div class="button__plusminus">
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                </dt>
                                                <dd class="accordeon__content">
                                                    <div>
                                                        <?= $answer ?>
                                                    </div>
                                                </dd>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>

                                </div>
                            </div>

                        <?php endif; ?>

                        <!-- <div class="popup popup__pricelist --preisliste --hidden">
                            <div class="popup__field">
                                <a class="button --color-white   popup__close"><img src="<?php echo get_template_directory_uri(); ?>/img/elements/cross_dark.svg" alt=""></a>
                                <div class="popup__content">
                                    <div class="pricelist__description">
                                        <h3>Preisliste<br><b>Kunstevents</b></h3>
                                        <h6><?= $title ?></h6>
                                        <p>Der Gesamtpreis richtet sich nach der <b>Dauer des Events</b> und der <b>Teilnehmerzahl</b> (inkl. Material)</p>
                                        <a class="" href="https://atelier-delatron.shop/buchung?step=0&product_id=<?= get_the_ID(); ?>&product_cat=<?= $postType ?>">
                                            <span>Event anfragen</span>
                                            <img src="<?= get_template_directory_uri() ?>/img/website/book/arrow_right_circle_pink.svg" alt="">
                                        </a>
                                    </div>
                                    <div class="pricelist__prices">
                                        <h5>Grundpreis</h5>
                                        <div class="prices__list">
                                            <div>
                                                <h6>3 Stunden</h6>
                                                <span><?= $baseprice_hour * 3; ?>€</span>
                                            </div>
                                            <div>
                                                <h6>4 Stunden</h6>
                                                <span><?= $baseprice_hour * 4; ?>€</span>
                                            </div>
                                            <div>
                                                <h6>5 Stunden</h6>
                                                <span><?= $baseprice_hour * 5; ?>€</span>
                                            </div>
                                        </div>
                                        <h5>Preis pro Person</h5>
                                        <div class="prices__list">
                                            <div>
                                                <h6>pro Person</h6>
                                                <span><?= $price_person ?>€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                    </div>

                </article>

            <?php endwhile; ?>

        <?php else : ?>

            <article>
                <h1><?php _e('Sorry, nothing to display.', 'atelier'); ?></h1>
            </article>

        <?php endif; ?>

    </section>

</main>

<?php get_footer(); ?>