<?php get_header(); ?>

	<main role="main" class="website">
		<!-- section -->
		<section>

		<style>
			body {
				overflow-x: unset !important;
			}
		</style>

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

			<?php
			// Ist Buchbar
			$is_bookable = get_field( "is_bookable" );
			if( $is_bookable === false ) {
				$is_bookable = false;
			} else {
				$is_bookable = true;
			}
			$is_bookable_class = "";
			if( !$is_bookable ) {
				$is_bookable_class = "--disabled";
			}
			$is_bookable_note = get_field( "is_bookable_note" );



			// Kategorie
			$category = get_the_category();
			$category = $category[0]->name;

			// Options Fakten
			$category_options = get_field( $category, "options" );
			$back_button_text = $category_options[ "back_button_text" ];
			$category_url = $category_options[ "category_url" ];
			$product_description = $category_options[ "product_description" ];
			$book_headline = $category_options[ "book_headline" ];
			$book_description = $category_options[ "book_description" ];

			//
			$title = get_field( "title" );
			$group = get_field( "group" );
			if( $group === "child" ) {
				$group = "Kinder";
			} else if( $group === "adult" ) {
				$group = "Erwachsene";
			}


			// Produktfakten
			$age = get_field( "age" );
			$description = get_field( "description" );
			$price = get_field( "price" );
			$duration = get_field( "duration" );
			$skill_level = get_field( "skill_level" );
			$person_count = get_field( "person_count" );

			$baseprice_hour = get_field( "baseprice_hour" );
			$price_person = get_field( "price_person" );


			//Kunstevents
			$kunstevents_preise = get_field("kunstevents_preise", "options");
			$kunstevents_preis_stunde = $kunstevents_preise["preis_stunde"];
			$kunstevents_preis_essen = $kunstevents_preise["preis_essen"];
			$kunstevents_preis_material = get_field("preis_material", $sql_id);
			$kunstevents_baseprice = (intval($kunstevents_preis_stunde["dauer_10"]) * 3.5 / 10 ) + intval($kunstevents_preis_essen) + $kunstevents_preis_material;
			$kunstevents_baseprice = ceil($kunstevents_baseprice);
			if( $category === "Kunstevent" ) {
				$price = $duration * $baseprice_hour;
				$duration = "3,5 / 4,5";
			}



			?>



			<?php if( $category === "Kurs" ) {
				if( $group === "Kinder" ) {
					$color_name = "blue";
					?>
					<style> :root { --product-color: #3fcad6; } </style>
				<?php }
				if( $group === "Erwachsene" ) {
					$color_name = "purple";
					?>
					<style> :root { --product-color: #4248de; } </style>
				<?php }
			} else if( $category === "Workshop" ) {
				$color_name = "red";
				?>
				<style> :root { --product-color: #de332a; } </style>
			<?php } else if( $category === "Geburtstag" ) {
				$color_name = "green";
				?>
				<style> :root { --product-color: #55d045; } </style>
			<?php } else if( $category === "Kunstevent" ) {
				$color_name = "pink";
				?>
				<style> :root { --product-color: #b23cdf; } </style>
			<?php } else if( $category === "Ferienprogramm" ) {
				$color_name = "yellow";
				?>
				<style> :root { --product-color: #eae22a; } </style>
			<?php } ?>




			<?php
			if( $category == "Kurs" ||  $category == "Workshop" || $category === "Ferienprogramm" ) {
				$booking_word = "Buchung";
				$booking_verb = "Buchen";
			} else {
				$booking_word = "Anfrage";
				$booking_verb = "Anfragen";
			}
			?>



			<?php function product_days() {
				$days = get_field( "weekdays" );
				$days_active = [false, false, false, false, false, false, false];
				$days_active_index = 0;
				for ($i = 0; $i <= 7; $i++) {
					if( $days[$days_active_index] === strval($i+1) ) {
						$days_active[$i] = true;
						$days_active_index++;
					}
				}
				$days_index = 0;
				$days_names = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
				?>
				<div class="days">
					<span class="days__title">Verfügbare Tage</span>
					<div class="days__list">
					<?php foreach($days_active as $day_active) {
						if( $day_active === true) {
							?> <div class="--active"><span><?= $days_names[$days_index] ?></span></div> <?php
						} else {
							?> <div></div> <?php
						}
						$days_index++; 
						} ?>
					</div>
				</div>
			<?php } ?>








			<!-- article -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>





			<?php
			$thumbnail_url = get_the_post_thumbnail_url();
			?>


			<div id="<?php echo $id; ?>" class="page__start product__header --background-image">

				<?php get_template_part('template-parts/header-bar', '', array( 'type'=>'atelier', 'color'=>'white', 'drop'=>false, 'hero'=>true )); ?>

				<div class="wrapper" style="margin-bottom:<?= get_field( "margin" ) ?>px;">
					<a class="back__button --color-<?= $color_name ?>" href="<?= $category_url[ "url" ] ?>">
						<span><?= $back_button_text ?></span>
					</a>
					<div class="header__content">
						<div class="header__text">

							<?php if( !$is_bookable && !empty( $is_bookable_note ) ): ?>
								<div class="info__badge"> 
									<div></div>
									<p><?= $is_bookable_note ?></p>
								</div>
							<?php endif; ?>

							<h1><?= $title ?><br><b><?php if( $category == "Kurs" || $category == "Workshop" ) { echo "für " . $group; } ?></b></h1>
							<h6><?= $product_description ?></h6>
							<p><?= $description ?></p>
							<div class="two-buttons">
								<a class="button --color-white  " href="#services">
									<span>Mehr Erfahren</span>
								</a>
								<a class="button --color-<?= $color_name ?>" href="#book">
									<?php if( $is_bookable ) : ?>
										<span><?= $category ?> <?= $booking_verb ?></span>
									<?php else: ?>
										<span>Termine ansehen</span>
									<?php endif; ?>
								</a>
							</div>
							<!-- <div class="info__badge">
								<div></div>
								<p>Kindergeburtstage finden nur an Samstagen & Sonntagen statt.</p>
							</div> -->
						</div>
						<?php if( $thumbnail_url ) : ?>
							<img src="<?= $thumbnail_url ?>" alt="">
						<?php endif; ?>
					</div>
				</div>

				<?php if( $thumbnail_url ) : ?>
					<img class="background__image" src="<?= $thumbnail_url ?>" alt="">
				<?php endif; ?>

				<?php get_template_part('template-parts/paper'); ?>
				<img class="background__circle" src="<?= get_template_directory_uri() ?>/img/website/kontakt/kontakt_background_circle_<?= $color_name ?>.svg" alt="">
			</div>




			<div class="product__page">

				
				<div class="product__split wrapper">

					<div class="product__split__left">


						<div class="product__info__sticky _vp-mobile _vp-flex">
							<div class="price">
								<h3 class="price__price">
									<?php if( $category === "Kunstevent" ) : ?>
										<span class="price__from">ab</span> 
										<?php $price = $kunstevents_baseprice; ?>
									<?php endif; ?>
									<?= $price ?>€
								</h3>
								<span class="price__perperson">
									<?php if( $category == "Geburtstag" ) {
										echo "+ " . $price_person . "€ Material pro Person";
									} else if( $category == "Kunstevent" ) {
										echo "pro Person";
									} ?>
								</span>
								<!-- <span class="price__duration">
									<?= $duration ?> Stunden
								</span> -->
								<span class="price__duration"><?php if( $category === "Kunstevent" ) { echo "ab "; } ?><?= $duration ?> Stunden</span>
								<span class="price__background"><?php echo $price; ?></span>
							</div>
							<div class="rest">
								<?php if( $category == "Kurs" ||  $category == "Geburtstag" || $category == "Kunstevent" ) { product_days(); } ?>
								<a class="button --color-<?= $color_name ?> button__book" href="#book">
									<img src="<?= get_template_directory_uri() ?>/img/website/icon_bookmark.svg" alt="">
									<?php if( $is_bookable ) : ?>
										<span><?= $category ?> <?= $booking_verb ?></span>
									<?php else: ?>
										<span>Termine ansehen</span>
									<?php endif; ?>
								</a>
								<?php if( $category === "Kunstevent" ) : ?>
									<!-- <a class="button --color-transparent --open__popup button__pricelist" data-popup="preisliste">
										<span>Preisliste ansehen</span>
									</a> -->
								<?php endif; ?>
							</div>
						</div>


						<div class="product__explanation" id="services">

							<?php
							$ablauf = get_field( "ablauf" );
							$change_ablauf = $ablauf[ "change_ablauf" ];
							$ablauf_headline = $ablauf[ "ablauf_headline" ];
							?>

							<?php if( $change_ablauf ) : ?>

								<?php
								$i = 0;
								?>
								<?php if( !empty( $ablauf_headline )) : ?>
									<h3><?= $ablauf_headline ?></h3>
									<?php endif; ?>

									<?php if( have_rows( "ablauf" ) ) : ?>
										<?php while( have_rows( "ablauf" ) ) : the_row(); ?>
										
										<?php if( have_rows( "liste" ) ): ?>
											<div class="explanation__list">
												<?php while( have_rows( "liste" ) ) : the_row(); ?>
	
													<?php
													$headline_h6 = get_sub_field( "headline_h6" );
													$show_clock = get_sub_field( "show_clock" );
													$headline_h5 = get_sub_field( "headline_h5" );
													$text = get_sub_field( "text" );
													$i++;
													?>
													
													<div class="list__item">
														<?php if( !empty( $headline_h6 ) ) : ?>
															<h6>
																<?php if( $show_clock ) : ?>
																	<img src="<?= get_template_directory_uri() ?>/img/icons/icon_mini_clock_<?= $color_name ?>.svg">
																<?php endif; ?>
																<?= $headline_h6 ?>
															</h6>
														<?php endif; ?>
														<h4><?= $headline_h5 ?></h4>
														<p><?= $text ?></p>
														<span class="background__number"><?= $i ?></span>
													</div>
											
												<?php endwhile; ?>
											</div>
										<?php endif; ?>
										
									<?php endwhile; ?>
								<?php endif; ?>

							<?php else: ?>	

								<?php if( have_rows( $category, "options" ) ): ?>
									<?php while( have_rows( $category, "options" ) ) : the_row(); ?>
										<?php
										$i = 0;
										$ablauf_headline = get_sub_field( "ablauf_headline" );
										?>
										<?php if( !empty( $ablauf_headline )) : ?>
											<h3><?= $ablauf_headline ?></h3>
										<?php endif; ?>
										<?php if( have_rows( "ablauf" ) ): ?>
											<div class="explanation__list">
												<?php while( have_rows( "ablauf" ) ) : the_row(); ?>
	
													<?php
													$headline_h6 = get_sub_field( "headline_h6" );
													$show_clock = get_sub_field( "show_clock" );
													$headline_h5 = get_sub_field( "headline_h5" );
													$text = get_sub_field( "text" );
													$i++;
													?>
													
													<div class="list__item">
														<?php if( !empty( $headline_h6 ) ) : ?>
															<h6>
																<?php if( $show_clock ) : ?>
																	<img src="<?= get_template_directory_uri() ?>/img/icons/icon_mini_clock_<?= $color_name ?>.svg">
																<?php endif; ?>
																<?php if( $category === "Geburtstag" && $i === 3 ) :
																	echo ($duration - 0.5) . " Stunden";
																else :
																	echo $headline_h6;
																endif; ?>
															</h6>
														<?php endif; ?>
														<h5><?= $headline_h5 ?></h5>
														<p><?= $text ?></p>
														<span class="background__number"><?= $i ?></span>
													</div>
											
												<?php endwhile; ?>
											</div>
										<?php endif; ?>
										
									<?php endwhile; ?>
								<?php endif; ?>

							<?php endif; ?>



							<div class="product__facts">
								<h3>Überblick</h3>
								<div class="facts__list">

									<div class="product__title__box">
										<div>
											<h6><?= $category ?></h6>
											<h4><?= $title ?>
											<?php if( $category === "Kurs" ) : ?>
												 <b>für <?= $group ?></b></h4>
											<?php endif; ?>
										</div>
										<?php if( $thumbnail_url ) : ?>
											<img src="<?= $thumbnail_url ?>" alt="">
										<?php endif; ?>
									</div>

									<?php
									function render_fact($title, $value, $icon, $color_name) {
										?><div class="item"><div><h6><?= $title; ?></h6><span><?= $value; ?></span></div><img src="<?= get_template_directory_uri() ?>/img/icons/icon_<?= $icon ?>_<?= $color_name ?>.svg" alt=""></div><?php
									}
									if( $category === "Kurs" ) {
										render_fact("Dauer", $duration . " Stunden", "clock", $color_name);
										render_fact("Rhythmus", "14-Tägig", "calender", $color_name);
										if( $group === "Kinder" ) {
											render_fact("Alter", $age . "+ Jahre", "user", $color_name);
										}
										render_fact("Material", "Inkl. Material*", "infinity", $color_name);
									} else if( $category == "Workshop" ) {
										render_fact("Dauer", $duration . " Stunden", "clock", $color_name);
										if( $group === "Kinder" ) {
											render_fact("Alter", $age . "+ Jahre", "user", $color_name);
										}
										render_fact("Material", "Inkl. Material*", "infinity", $color_name);
									} else if( $category == "Geburtstag" ) {
										render_fact("Dauer", $duration . " Stunden", "clock", $color_name);
										render_fact("Alter", $age . "+ Jahre", "user", $color_name);
										render_fact("Teilnehmer", "Max. " . $person_count . " Kinder", "group", $color_name);
										render_fact("Wochentage", "Samstags oder Sonntags", "calender", $color_name);
									} else if( $category === "Kunstevent" ) {
										render_fact("Service", "Individuelle Planung", "star", $color_name);
										render_fact("Dauer", $duration . " Stunden", "clock", $color_name);
										render_fact("Teilnehmer", "Beliebige Gruppengröße", "group", $color_name);
									}
									else if( $category === "Ferienprogramm" ) {
										render_fact("Dauer", $duration . " Stunden", "clock", $color_name);
										render_fact("Alter", $age . "+ Jahre", "user", $color_name);
										render_fact("Material", "Inkl. Material*", "infinity", $color_name);
									}
									?>
		
								</div>

								<?php  if( $category == "Workshop" || $category === "Kurs" ) : ?>
									<p>*Farben und sonstige Arbeitsutensilien werden dir zur Verfügung gestellt. Es kann dazu kommen, dass du deine Eigene Leinwand mitbringen musst.</p>
								<?php endif; ?>

							</div>

						</div>


					</div>

					<div class="product__split__right">
						<div class="product__info__sticky">
							<div class="price">
								<h3 class="price__price">
									<?php if( $category === "Kunstevent" ) : ?>
										<span class="price__from">ab</span> 
										<?php $price = $kunstevents_baseprice; ?>
									<?php endif; ?>
									<?= $price ?>€
								</h3>
								<span class="price__perperson">
									<?php if( $category == "Geburtstag" ) {
										echo "+ " . $price_person . "€ Material pro Person";
									} else if( $category == "Kunstevent" ) {
										echo "pro Person";
									} ?>
								</span>
								<span class="price__duration">
									<?= $duration ?> Stunden
								</span>
								<span class="price__background"><?php echo $price; ?></span>
							</div>
							<div class="rest">
								<?php if( $category == "Kurs" ||  $category == "Geburtstag" || $category == "Kunstevent" ) { product_days(); } ?>
								<a class="button --color-<?= $color_name ?> button__book" href="#book">
									<img src="<?= get_template_directory_uri() ?>/img/website/icon_bookmark.svg">
									<?php if( $is_bookable ) : ?>
										<span><?= $category ?> <?= $booking_verb ?></span>
									<?php else: ?>
										<span>Termine ansehen</span>
									<?php endif; ?>
								</a>
								<?php if( $category === "Kunstevent" ) : ?>
									<!-- <a class="button --color-transparent --open__popup button__pricelist" data-popup="preisliste">
										<span>Preisliste ansehen</span>
									</a> -->
								<?php endif; ?>
							</div>
						</div>
					</div>

				</div>





				<div class="product__book" id="book">
					<img class="border__top" src="<?= get_template_directory_uri() ?>/img/website/border_round_top_white.svg">
					<div class="book__content wrapper">
						<div class="book__info">
							<h2><img src="<?= get_template_directory_uri() ?>/img/website/icon_bookmark_<?= $color_name ?>.svg">
								<?php if( $category === "Kurs" || $category === "Workshop" || $category === "Ferienprogramm" ) { ?>
									Buchung
									<!-- Anfrage -->
								<?php } else { ?>
									Anfrage
								<?php } ?>
							</h2>
							<h6><?= $book_headline ?></h6>
							<p><?= $book_description ?></p>
						</div>
						<img class="arrow__right" src="<?= get_template_directory_uri() ?>/img/website/book_arrow_right_<?= $color_name ?>.svg">
						<div class="book__dates">

							<?php if( $category === "Kurs" || $category === "Workshop" ) : ?>
								<h5 class="headline">Buchung beginnen...</h5>
							<?php endif; ?>

							<?php if( !$is_bookable && !empty( $is_bookable_note ) ): ?>
								<div class="info__badge"> 
									<div></div>
									<p><?= $is_bookable_note ?></p>
								</div>
							<?php endif; ?>

							<div class="dates__list">

								<?php
								$hasDates = false;
								$sql_id = get_field( "sql_id" );
								$servername = "db5001988950.hosting-data.io"; $username = "dbu782740"; $password = "P6kgZoW8cJckujXLQqKY"; $dbname = "dbs1623575";
								$mysql = new mysqli($servername, $username, $password, $dbname);
								?>

								<?php
								if( $category === "Kurs" )  {
									
									$sql_id = get_field( "sql_id" );
									$sql = "SELECT kurs_nummer, kurs_tag, kurs_zeit FROM kurse WHERE kurs_name = '" . $sql_id . "' ORDER BY kurs_nummer ASC";
									$result = $mysql->query($sql);
									
									if ($result->num_rows > 0) {
										$has_no_dates = false;
										while($row = $result->fetch_assoc()) {

											$kurs_nummer = $row["kurs_nummer"];
											$sql2 = "SELECT datum FROM termine_kurse WHERE datum >= NOW() AND kurs_name = '" . $sql_id . "' AND kurs_nummer = '" . $kurs_nummer . "' ORDER BY datum ASC LIMIT 1";
											$result2 = $mysql->query($sql2);

											if ($result2->num_rows > 0) {
												while($row2 = $result2->fetch_assoc()) {

													$datum = strtotime($row2["datum"]);
													$date_output = date("Y-m-d", $datum);
													$date_readable = date("d. F Y", $datum);
													$date_readable = translateReadableDateToGerman( $date_readable );
									 				?>

									 				<a class="date" href="https://atelier-delatron.shop/buchung?step=0&product_id=<?= get_the_ID(); ?>&product_cat=<?= $category ?>&sql_id=<?= $sql_id ?>&course_num=<?= $kurs_nummer ?>">
									 					<div>
									 						<h5><?= $row["kurs_tag"] ?></h5>
									 						<h6><?= $row["kurs_zeit"] ?></h6>
									 					</div>
									 					<span><?= $date_readable ?></span>
									 					<img src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
									 				</a>

									 				<?php
												}
											}
											else {
												if( $has_no_dates ) {
													?>
													<div class="no__dates__available">
														<span>Keine Termine verfügbar!</span>
													</div>
													<?php
												}
												$has_no_dates = true;
											}
										}
									}

								}
								?>


								<?php if( $category === "Workshop" || $category === "Ferienprogramm" ) :

									$sql = "";

									if( $category === "Workshop" ) :
										$sql = "SELECT datum, zeit, datum_2, zeit_2 FROM termine_workshops WHERE datum >= NOW() AND workshop = '" . $sql_id . "' ORDER BY datum ASC LIMIT 10";
									endif;
									if( $category === "Ferienprogramm" ) :
										$sql = "SELECT datum, zeit, datum_2, zeit_2, extern, extern_link FROM termine_ferienprogramm WHERE datum >= NOW() AND ferienprogramm = '" . $sql_id . "' ORDER BY datum ASC LIMIT 10";
									endif;

									$result = $mysql->query($sql);

									if ($result->num_rows > 0) :
										$hasDates = true;
										$i = 0;
										while($row = $result->fetch_assoc()) :
											$i++;

											$date = strtotime($row["datum"]);
											$date_output = date("Y-m-d", $date);

											if( $row["extern"] == 1 ) {
												$booking_link = $row["extern_link"];
											} else {
												$id = get_the_ID();
												$booking_link = "https://atelier-delatron.shop/buchung?step=0&product_id={$id}&product_cat={$category}&sql_id={$sql_id}&date_selected={$date_output}";
											}
											?>

											<?php if ( $row["datum_2"] === "0000-00-00" ) :

												$date_readable = date("d. F Y", $date);
												$date_readable = translateReadableDateToGerman( $date_readable );
												$date_day = date("l", $date);
												$date_day = translateReadableDateToGerman( $date_day );
												?>

												<a class="date <?= $is_bookable_class ?>" href="<?= $booking_link ?>">
													<div>
														<h5><?= $date_readable ?></h5>
														<h6><?= $date_day ?></h6>
													</div>
													<span><?= $row["zeit"] ?></span>
													<img src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
												</a>

											<?php else :
										
												$date_2 = strtotime($row["datum_2"]);
												$date_readable = date("d.", $date) . " + " . date("d. F Y", $date_2);
												$date_readable = translateReadableDateToGerman( $date_readable );
												$date_day = date("l", $date) . " + " . date("l", $date_2);
												$date_day = translateReadableDateToGerman( $date_day );
												$date_double = true;
												?>

												<a class="date <?= $is_bookable_class ?>" href="<?= $booking_link ?>">
													<div>
														<h5><?= $date_readable ?></h5>
														<h6><?= $date_day ?></h6>
													</div>
													<div>
														<span><?= $row["zeit"] ?></span>
														<span><?= $row["zeit_2"] ?></span>
													</div>
													<img src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
												</a>

											<?php endif; ?>

											<?php
										endwhile;
									else :
										?><div class="no__dates__available">
											<span>Keine Termine verfügbar!</span>
										</div><?php
									endif;
									?>



								<?php endif; ?>



								<?php if( $category === "Geburtstag" || $category === "Kunstevent" ) :
									$sql_id = get_field( "sql_id" );
									?>
									<a class="date" href="https://atelier-delatron.shop/buchung?step=0&product_id=<?= get_the_ID(); ?>&product_cat=<?= $category ?>">
										<div>
											<h5>Jetzt Anfragen</h5>
										</div>
										<img class="--visible" src="<?= get_template_directory_uri() ?>/img/website/arrow_right_circle.svg">
									</a>
								<?php endif; ?>



							</div>
						</div>
					</div>
					<img class="border__bottom" src="<?= get_template_directory_uri() ?>/img/website/border_round_bottom_<?= $color_name ?>.svg">
				</div>





				<div class="faq product__faq">
					<div class="wrapper">
						<div class="faq__header">
							<span>FAQ</span>
							<h2>Häufig gestellte Fragen</h2>
						</div>

						<?php if( have_rows( $category, "options" ) ): ?>
							<?php while( have_rows( $category, "options" ) ) : the_row(); ?>

								<?php if( have_rows( "faq" ) ): ?>
									<div class="faq__accordeon accordeon accordeon--closed">
										<?php while( have_rows( "faq" ) ) : the_row();
											$question = get_sub_field( "question" );
											$answer = get_sub_field( "answer" );
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
										<?php endwhile; ?>
									</div>
								<?php endif; ?>
								
							<?php endwhile; ?>
						<?php endif; ?>

					</div>
				</div>
    
				



				<!-- <div class="popup popup__pricelist --preisliste --hidden">
					<div class="popup__field">
						<a class="button --color-white   popup__close"><img src="<?php echo get_template_directory_uri(); ?>/img/elements/cross_dark.svg" alt=""></a>
						<div class="popup__content">
							<div class="pricelist__description">
								<h3>Preisliste<br><b>Kunstevents</b></h3>
								<h6><?= $title ?></h6>
								<p>Der Gesamtpreis richtet sich nach der <b>Dauer des Events</b> und der <b>Teilnehmerzahl</b> (inkl. Material)</p>
								<a class="" href="https://atelier-delatron.shop/buchung?step=0&product_id=<?= get_the_ID(); ?>&product_cat=<?= $category ?>">
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
			<!-- /article -->

		<?php endwhile; ?>

		<?php else: ?>

			<!-- article -->
			<article>

				<h1><?php _e( 'Sorry, nothing to display.', 'atelier' ); ?></h1>

			</article>
			<!-- /article -->

		<?php endif; ?>

		</section>
		<!-- /section -->
	</main>


<?php get_footer(); ?>
