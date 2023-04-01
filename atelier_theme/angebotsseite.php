<?php get_header(); /* Template Name: Angebotsseite */ ?>

<div class="website category__page">


	<?php
	$category = get_field( "category" );
	$category = get_the_category_by_ID($category);
	?>

	<?php
	$color_name = "";
	if( $category == "Kurs" ) :
		$color_name = "blue";
		// if( $group === "Kinder" ) {
		// 	$color_name = "blue";
		// }
		// if( $group === "Erwachsene" ) {
		// 	$color_name = "purple";
		// }
		// ?>
		<style> :root { --product-color-1: #3fcad6; --product-color-2: #4248de; } </style>
	<?php endif; ?>
	<?php if( $category == "Workshop" ) :
		$color_name = "red"; ?>
		<style> :root { --product-color-1: #de332a; --product-color-2: #de332a; } </style>
	<?php endif; ?>
	<?php if( $category == "Geburtstag" ) :
		$color_name = "green"; ?>
		<style> :root { --product-color-1: #55d045; --product-color-2: #55d045; } </style>
	<?php endif; ?>
	<?php if( $category == "Kunstevent" ) :
		$color_name = "pink"; ?>
		<style> :root { --product-color-1: #b23cdf; --product-color-2: #b23cdf; } </style>
	<?php endif; ?>
	<?php if( $category == "Ferienprogramm" ) :
		$color_name = "yellow"; ?>
		<style> :root { --product-color-1: #eae22a; --product-color-2: #eae22a; } </style>
	<?php endif; ?>




		







	<div class="page__start category__header">

		<?php get_template_part('template-parts/header-bar', '', array( 'type'=>'atelier', 'color'=>'white', 'drop'=>false, 'hero'=>true )); ?>

		<?php
		$category_image = get_field( $category, "options" )[ "category_image" ];
		?>
		
		<div class="wrapper header__content">
			<?php
			$header = get_field( "header" );
			$headline_h1 = $header[ "headline_h1" ];
			$headline_h6 = $header[ "headline_h6" ];
			$text = $header[ "text" ];
			$button_1 = $header[ "button_1" ];
			$button_2 = $header[ "button_2" ];
			?>
			<a class="back__button --color-<?= $color_name ?>" href="https://atelier-delatron.de/#<?= $category ?>">
				<span>Zurück zur Übersicht</span>
			</a>
			<div class="header__text">

				<?php if( !empty( get_field( "info_badge") ) ) : ?>
					<div class="info__badge"> 
						<div></div>
						<p><?= get_field( "info_badge") ?></p>
					</div>
				<?php endif; ?>
				<h1><?= $headline_h1 ?></h1>
				<h6><?= $headline_h6 ?></h6>
				<p><?= $text ?></p>
				<?php if( !empty( $button_1 ) ) : ?>
					<a class="button filter--1 --color-<?= $color_name ?>" href="<?= $button_1[ "url" ]; ?>"><span><?= $button_1[ "title" ] ?></span></a>
				<?php endif; ?>
				<?php $color_name_2 = "purple"; ?>
				<?php if( !empty( $button_2 ) ) : ?>
					<a class="button filter--2 --color-<?= $color_name_2 ?>" href="<?= $button_2[ "url" ]; ?>"><span><?= $button_2[ "title" ] ?></span></a>
				<?php endif; ?>
			</div>
					
			<div class="space-large"></div>
			
			<img class="header__image" src="<?= $category_image[ "url" ] ?>" alt="<?= $category_image["alt"] ?>">

		</div>


		<?php get_template_part('template-parts/paper'); ?>
   		<img class="background__circle" src="<?= get_template_directory_uri() ?>/img/website/kontakt/kontakt_background_circle.svg" alt="">

	</div>







	<div id="pagestart"></div>



	<?php if( have_rows('overview') ): ?>
		<div class="usp__list category__overview wrapper" id="overview">
		<?php while ( have_rows('overview') ) : the_row();
			$icon = get_sub_field( "icon" );
			$headline_h3 = get_sub_field( "headline_h3" );
			$headline_h6 = get_sub_field( "headline_h6" );
			$text = get_sub_field( "text" );
			?>
			<div class="overview__item">
				<?php if( !empty( $icon ) ) : ?>
					<div><img src="<?= $icon[ "url" ]; ?>" alt="<?= $icon[ "alt" ]; ?>"></div>
				<?php endif; ?>
				<?php if( !empty( $headline_h3 ) ) : ?>
					<h3><?= $headline_h3 ?></h3>
				<?php endif; ?>
				<?php if( !empty( $headline_h6 ) ) : ?>
					<h6><?= $headline_h6 ?></h6>
				<?php endif; ?>
				<?php if( !empty( $text ) ) : ?>
					<?= $text ?>
				<?php endif; ?>
			</div>
		<?php endwhile; ?>
		</div>
	<?php endif; ?>



	<?php
	$args = array(
		'post_type' => 'kunstangebot',
		'post_status' => array('publish'),
		'category_name' => $category,
		'posts_per_page' => 20,
	);
	$arr_posts = new WP_Query( $args );
	



	if( $category == "Ferienprogramm" ) : ?>

		<!-- <div class="ferienprogramm__discount wrapper">
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
		</div> -->
	
	<?php endif;







	if( $category == "Kurs" ) : ?>

		<div class="products__filter wrapper" id="list">
			<div class="filter__button button--one">
				Kinder
				<img class="icon__main" src="<?= get_template_directory_uri() ?>/img/website/angebotsseite/icon_child.svg" alt="Kind Icon">
				<img class="icon__background" src="<?= get_template_directory_uri() ?>/img/website/angebotsseite/icon_child.svg" alt="">
			</div>
			<div class="filter__text">
				<span>Kurse</span>
				<div class="filter__reset --hidden">
					<img src="<?= get_template_directory_uri() ?>/img/shop/icon_bin.svg" alt="Paperkorb">
					<span>Filter löschen</span>
				</div>
			</div>
			<div class="filter__button button--two">
				Erwachsene
				<img class="icon__main" src="<?= get_template_directory_uri() ?>/img/website/angebotsseite/icon_adult.svg" alt="Erwachsener Icon">
				<img class="icon__background" src="<?= get_template_directory_uri() ?>/img/website/angebotsseite/icon_adult.svg" alt="">
			</div>
		</div>

	<?php else: ?>

		<div class="products__count" id="list">
			<?php
			$post_count = $arr_posts->found_posts
			?>
			<span class="number"><?= $post_count ?></span>
			<span class="label">
				<?php if( $post_count > 1) {
					echo "Workshops";
				} else {
					echo "Workshop";
				} ?>
			</span>
		</div>

	<?php endif;








	
	if ( $arr_posts->have_posts() ) : ?>

		<div class="products__list wrapper">
			<?php while ( $arr_posts->have_posts() ) :
				$arr_posts->the_post();

				//
				$title = get_field( "title" );
				$group = get_field( "group" );
				if( $group === "child" ) {
					$group = "Kinder";
				} else if( $group === "adult" ) {
					$group = "Erwachsene";
				}
				$description = get_field( "description" );

				if( $category === "Kurs" ) {
					if( $group === "Kinder" ) {
						$color_name = "blue";
						$color_number = "one";
					}
					if( $group === "Erwachsene" ) {
						$color_name = "purple";
						$color_number = "two";
					}
				}
				?>

				<article class="product__item --<?= $color_number ?>">

					<div class="product__image"> 
						<?php the_post_thumbnail(); ?>
						<img class="border__right" src="<?= get_template_directory_uri() ?>/img/website/border_round_right_white.svg" alt="">
						<div class="product__time">
							<span class="time"><?= get_field( "duration" ); ?> Stunden</span>
							<span class="hour">Dauer</span>
						</div>
					</div>

					<div class="product__content">
						<?php if( $category === "Kunstevent" ) : ?>
							<h6>Thema</h6>
						<?php endif; ?>
						<h2><?= $title ?></h2>
						<?php if( !empty( $group ) ) : ?>
							<h6><?= $group ?></h6>
						<?php endif; ?>
						<p><?= substrwords( $description, 150 ) ?></p>
						<a class="button --color-<?= $color_name ?>" href="<?= get_permalink() ?>">
							<span><?= $category ?> entdecken</span>
						</a>
					</div>

				</article>

			<?php endwhile; ?>

			<?php if( $category === "Kunstevent" ) : ?>
				<div class="border__box kunstevent__idea">
					<h3><b>Möchtest du dein</b><br>eigenes Thema Vorschlagen?</h3>
					<h6>Ich setze deine Idee um</h6>
					<p>Du hast eine Technik oder Thema, welche(s) du gerne ausprobieren möchtest? Dann sende mir deine Idee und wir finden eine passende Lösung als Event. Ich versuche, dir jeden Wunsch zu erfüllen.</p>
					<a class="button" href="https://atelier-delatron.shop/kunstevent-vorschlag">
						<span>Vorschlag senden</span>
					</a>
				</div>
			<?php endif; ?>

		</div>

	<?php else: ?>

		<div class="border__box no__workshops__available">
			<?php
			$no_workshops_text = get_field( "no_workshops_text" );
			echo $no_workshops_text;
			?>
		</div>

	<?php endif; ?>


</div>

<?php get_footer(); ?>