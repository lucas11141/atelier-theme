<?php get_header(); /* Template Name: Newsletter Anmeldung */ ?>

<?php
$newsletter_bild = get_field("newsletter_bild", "options");
?>

<span id="transfered__email" style="display:none;"><?php echo $_GET["email"]; ?></span>

<section class="allcont page__newsletter">

	<div class="newsletter__img">
		<div class="img__overlay">
			<a class="back__button" onclick="window.history.back();">
				<span>Zurück zur Webseite</span>
			</a>
			<img class="paper__structure" src="<?= get_template_directory_uri() ?>/img/elements/paper_structure_500x.jpg" alt="">
		</div>
		<img class="img__img" src="<?= $newsletter_bild["url"] ?>" alt="">
	</div>

	<div class="newsletter__content">
		<img class="logo" src="<?= get_template_directory_uri() ?>/img/logos/logo_4_dark.svg" alt="Logo">
		<h6>immer informiert</h6>
		<h2>Newsletter Abonnieren</h2>
		<div class="newsletter__process">
			<div class="process__step">
				<img src="<?= get_template_directory_uri() ?>/img/icons/icon_newsletter_send.svg" alt="">
				<h5>Absenden</h5>
			</div>
			<div class="process__step">
				<img src="<?= get_template_directory_uri() ?>/img/icons/icon_newsletter_mail.svg" alt="">
				<h5>Bestätigen</h5>
			</div>
			<div class="process__step">
				<img src="<?= get_template_directory_uri() ?>/img/icons/icon_newsletter_done.svg" alt="">
				<h5>Fertig</h5>
			</div>
		</div>
		<?php echo do_shortcode('[sibwp_form id=1]'); ?>
	</div>

	<div class="newsletter__success">
		<div class="process__step">
			<img src="<?= get_template_directory_uri() ?>/img/icons/icon_newsletter_done.svg" alt="">
			<h4>Anmeldung<br>Erfolgreich</h5>
		</div>
		<a class="button --color-main  " href="https://www.atelier-delatron.de">
			<span>Zurück zur Webseite</span>
		</a>
	</div>

</section>

<?php get_footer(); ?>

<style>
	.header,
	.footer {
		display: none !important;
	}
	#main {
		padding: 0;
	}
</style>