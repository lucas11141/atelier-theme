			</main>

			<?php
            if (is_page('shop') || is_woocommerce() || is_shop() || is_product_category() || is_product_tag() || is_product() || is_cart() || is_checkout() || is_account_page() || is_page('sendungsverfolgung')) {
                $websiteCat = 'shop';
            } else {
                $websiteCat = 'atelier';
            }

            $seitenkategorie = get_field('seitenkategorie');
            if ($seitenkategorie === 'shop' || $websiteCat === 'website') {
                $websiteCat = $seitenkategorie;
            }

            if ($websiteCat === 'shop') {
                $contactLink = get_permalink(get_page_by_path('kontakt-shop'));
            } else {
                $contactLink = get_permalink(get_page_by_path('kontakt')) . '#allgemein';
            }
            ?>

			<footer class="footer footer--desktop">

			    <?php get_template_part('template-parts/paper'); ?>
			    <img class="footer__decoration" src="<?php echo get_template_directory_uri(); ?>/img/elements/footer_decoration.svg" alt="">

			    <div class="wrapper">

			        <div class="footer__content">

			            <?php if ($websiteCat === 'atelier') :
                            atelier_footer_nav();
                        elseif ($websiteCat === 'shop') :
                            shop_footer_nav();
                        endif; ?>

			            <div class="footer__contact">
			                <img class="footer__logo" src="<?php echo get_template_directory_uri(); ?>/img/logos/logo_1_white.svg" height="80" width="279" alt="Atelier Kunst & Gestalten Logo">
			                <ul class="links__list">
			                    <li>
			                        <a href="https://www.google.com/maps?client=safari&rls=en&q=atelier+delatron&oe=UTF-8&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiUtZjd1Jr3AhXlRfEDHVjzBnAQ_AUoAXoECAEQAw" target="_blank">
			                            <?php get_template_part('template-parts/icon', '', array('icon' => 'map_pin', 'color' => 'white',  'size' => 'small', 'alt' => 'Stecknadel Icon')); ?>
			                            <span>Burgstallstr. 6, 1OG<br>90587 Obermichelbach</span>
			                        </a>
			                    </li>
			                    <li>
			                        <a href="tel:0173-3958815">
			                            <?php get_template_part('template-parts/icon', '', array('icon' => 'phone', 'color' => 'white', 'size' => 'small', 'alt' => 'Telefon Icon')); ?>
			                            <span>0173-3958815</span>
			                        </a>
			                    </li>
			                    <li>
			                        <a href="mailto:info@atelier-delatron.de">
			                            <?php get_template_part('template-parts/icon', '', array('icon' => 'mail', 'color' => 'white', 'size' => 'small', 'alt' => 'E-Mail Icon')); ?>
			                            <span>info@atelier-delatron.de</span>
			                        </a>
			                    </li>
			                </ul>

			                <?php if ($websiteCat !== 'shop') : ?>
			                    <a class="button button--small --color-white button__contact" href="<?= $contactLink ?>">
			                        <span>Zum Kontaktformular</span>
			                    </a>
			                <?php endif; ?>

			                <?php if ($websiteCat === 'atelier') : ?>
			                    <a href="<?= get_permalink(get_page_by_path('shop')) ?>" class="button button--small --color-accent button--toggle-site --to-shop">
			                        <span>Zum Online-Shop</span>
			                        <img src="<?php echo get_template_directory_uri(); ?>/img/shop/arrow_next_page.svg" alt="">
			                    </a>
			                <?php elseif ($websiteCat === 'shop') : ?>
			                    <a href="<?= home_url() ?>" class="button button--small --color-accent button--toggle-site --to-website">
			                        <span>Zu den Kunstkursen</span>
			                        <img src="<?php echo get_template_directory_uri(); ?>/img/shop/arrow_next_page.svg" alt="">
			                    </a>
			                <?php endif; ?>
			            </div>

			        </div>

			        <?php
                    if ($websiteCat === 'atelier') {
                        atelier_law_nav();
                    } elseif ($websiteCat === 'shop') {
                        shop_law_nav();
                    }
                    ?>


			        <p class="copyright">© 2022 Atelier Kunst & Gestalten.</p>

			    </div>

			</footer>

			<footer class="footer footer--mobile">

			    <?php get_template_part('template-parts/paper'); ?>
			    <img class="footer__decoration" src="<?php echo get_template_directory_uri(); ?>/img/elements/footer_decoration.svg" alt="">

			    <div class="wrapper">

			        <div class="footer__content">

			            <img class="footer__logo" src="<?php echo get_template_directory_uri(); ?>/img/logos/logo_1_white.svg" height="80" width="279" alt="Atelier Kunst & Gestalten Logo">

			            <?php if ($websiteCat === 'atelier') :
                            atelier_footer_nav();
                        elseif ($websiteCat === 'shop') :
                            shop_footer_nav();
                        endif; ?>

			            <div class="footer__contact">
			                <h4 class="contact__header">Kontakt & Anfahrt</h4>

			                <ul class="links__list">
			                    <li>
			                        <a href="https://www.google.com/maps?client=safari&rls=en&q=atelier+delatron&oe=UTF-8&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiUtZjd1Jr3AhXlRfEDHVjzBnAQ_AUoAXoECAEQAw" target="_blank">
			                            <?php get_template_part('template-parts/icon', '', array('icon' => 'map_pin', 'color' => 'white',  'size' => 'small', 'alt' => 'Stecknadel Icon')); ?>
			                            <span>Burgstallstr. 6, 1OG<br>90587 Obermichelbach</span>
			                        </a>
			                    </li>
			                    <li>
			                        <a href="tel:0173-3958815">
			                            <?php get_template_part('template-parts/icon', '', array('icon' => 'phone', 'color' => 'white', 'size' => 'small', 'alt' => 'Telefon Icon')); ?>
			                            <span>0173-3958815</span>
			                        </a>
			                    </li>
			                    <li>
			                        <a href="mailto:info@atelier-delatron.de">
			                            <?php get_template_part('template-parts/icon', '', array('icon' => 'mail', 'color' => 'white', 'size' => 'small', 'alt' => 'E-Mail Icon')); ?>
			                            <span>info@atelier-delatron.de</span>
			                        </a>
			                    </li>
			                </ul>

			                <a class="button --color-transparent-white   button__contact" href="<?= $contactLink ?>">
			                    <span>Zum Kontaktformular</span>
			                </a>

			                <?php if ($websiteCat === 'atelier') : ?>
			                    <a href="<?= get_permalink(get_page_by_path('shop')) ?>" class="button --color-accent button--toggle-site --to-shop">
			                        <span>Zum Online-Shop</span>
			                        <img src="<?php echo get_template_directory_uri(); ?>/img/shop/arrow_next_page.svg" alt="">
			                    </a>
			                <?php elseif ($websiteCat === 'shop') : ?>
			                    <a href="<?= home_url() ?>" class="button --color-accent button--toggle-site --to-website">
			                        <span>Zu den Kunstkursen</span>
			                        <img src="<?php echo get_template_directory_uri(); ?>/img/shop/arrow_next_page.svg" alt="">
			                    </a>
			                <?php endif; ?>
			            </div>


			        </div>

			        <p class="copyright">© 2022 Atelier Kunst & Gestalten.</p>

			        <?php
                    if ($websiteCat === 'atelier') {
                        atelier_law_nav();
                    } elseif ($websiteCat === 'shop') {
                        shop_law_nav();
                    }
                    ?>

			    </div>

			</footer>

			<?php wp_footer(); ?>

			</body>

			</html>