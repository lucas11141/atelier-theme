// @prepros-prepend "options/variables.js";
// @prepros-prepend "lib/jquery.magnific-popup.min.js";
// @prepros-prepend "lib/mc-calendar.min.js";
// @prepros-prepend "lib/slick.min.js";
// @prepros-prepend "lib/js.cookie-2.2.1.min.js";
// @prepros-prepend "scripts/websiteMode.js";

jQuery(document).ready(function ($) {
	function onElementLoad(selector, execution) {
		const observer = new MutationObserver((mutations) => {
			if (document.querySelectorAll(selector).length > 0) {
				execution();
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	if (document.querySelector(".tracking-detail")) {
		$(".shipping__status").append($(".tracking-detail"));
	}

	/*------------------------------------*\
    // order review - move elements to split left
	\*------------------------------------*/
	if (document.querySelector(".woocommerce-thankyou-order-details")) {
		$(".checkout-split .left .container").prepend(
			$(".woocommerce-thankyou-order-details")
		);
	}
	if (document.querySelector(".woocommerce-thankyou-order-received")) {
		$(".checkout-split .left .container").prepend(
			$(".woocommerce-thankyou-order-received")
		);
	}

	class ShopHeroSlider {
		constructor(textSliderClass, imageSliderClass) {
			this.textSlider = $(textSliderClass).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				fade: true,
				cssEase: "linear",
				adaptiveHeight: true,
				draggable: false,
				responsive: [
					{
						breakpoint: 520,
						settings: {
							adaptiveHeight: false,
						},
					},
				],
			});
			this.imageSlider = $(imageSliderClass).slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				prevArrow: $(".hero__slider__button--prev"),
				nextArrow: $(".hero__slider__button--next"),
				asNavFor: ".shop-hero-banner__text",
			});

			this.sliderLength = this.imageSlider.slick("getSlick").slideCount;
			this.processBar = document.querySelector(
				".process-button .process"
			);
			this.processButton = document.querySelector(".process-button");
			this.isPaused = false;

			this.declareEventListeners();
		}

		declareEventListeners() {
			this.processButton.addEventListener("click", () => {
				if (this.isPaused) {
					this.imageSlider.slick("slickPlay");
					this.processButton.classList.remove("--paused");
					this.isPaused = false;
				} else {
					this.imageSlider.slick("slickPause");
					this.processButton.classList.add("--paused");
					this.isPaused = true;
				}
			});
			this.textSlider.on("beforeChange", () => {
				this.processButton.classList.remove("--filled");
				setTimeout(() => {
					this.processButton.classList.add("--filled");
				}, 1);
			});
			this.processBar.addEventListener("animationend", () => {
				this.imageSlider.slick("slickNext");
			});
		}
	}
	if (document.querySelector(".shop-hero-banner .hero__slider")) {
		const shopHeroSlider = new ShopHeroSlider(
			".shop-hero-banner__text",
			".hero__slider"
		);
	}

	//
	let dropdownIsOpened = false;
	$(".hamburger").click(function () {
		const hamburgers = document.querySelectorAll(".hamburger");
		hamburgers.forEach((hamburger) => {
			hamburger.classList.toggle("is-active");
		});
		$(".header__dropdown").slideToggle(300);
		$(".header__dropdown").toggleClass("header__dropdown--opened");
		$(".header__dropdown").parent().toggleClass("--dropdown-opened");
		if (dropdownIsOpened) {
			dropdownIsOpened = false;
			enableScroll();
		} else {
			dropdownIsOpened = true;
			disableScroll();
		}
	});

	// Nav mit Unterpunkten bekommt eine Klasse
	$(".dropdown__nav li").find("UL").parent().addClass("has-sub");
	$(".dropdown__nav ul li").each(function () {
		var hasSubnav = $(this).find("ul").length;
		if (hasSubnav >= 1) {
			$(this).prepend('<div class="showSub" />');
		}
	});

	//
	$(".showSub").on("click", function () {
		$(this).toggleClass("open");
		$(this).parent("li").toggleClass("open");
		$(this).parent("li").children(".sub-menu").slideToggle(200);
	});

	$(".header__dropdown__mobile .dropdown__links__item .submenu").each(
		(index, element) => {
			if ($(element).find("li").length > 0) {
				$(element).parent().addClass("hasSub");
			}
		}
	);

	$(".header__dropdown__mobile .hasSub .main-link").on("click", function (e) {
		e.preventDefault();
		$(this).parent().toggleClass("--opened");
		$(this).parent().find(".submenu:not(:empty)").slideToggle(300);
	});

	// Leichtes Scrollen
	$("a[href*=\\#]:not([href=\\#])").click(function () {
		if (
			location.pathname.replace(/^\//, "") ==
				this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length
				? target
				: $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html,body").animate(
					{
						scrollTop: target.offset().top - scrollOffset,
					},
					1000
				);
				return false;
			}
		}
	});

	// ANnchor scroll offset on Page Load
	scrollToAnchor();
	function scrollToAnchor() {
		var hash = window.location.hash;
		var target = $(hash);
		if (hash == "" || hash == "#" || hash == undefined) return false;
		// headerHeight = 120;
		target = target.length ? target : $("[name=" + hash.slice(1) + "]");
		if (target.length) {
			$("html,body")
				.stop()
				.animate(
					{
						scrollTop: target.offset().top - 150, //offsets for fixed header
					},
					10
				);
		}
	}

	// Hide Header on Load
	const hiddenHeader = document.querySelector(".header.--hidden-on-load");
	if (hiddenHeader) {
		let dropdownIsOpened = false;
		let showOffset = hiddenHeader.dataset.showOffset;
		let wScroll = $(window).scrollTop();

		const pageStart = document.querySelector(".page__start");
		if (pageStart) {
			showOffset = pageStart.offsetHeight - 350;
		}
		const showHeader = document.querySelector(".show-header-on-offset");
		if (showHeader) {
			showOffset = showHeader.offsetHeight - 350;
		}

		// toggleHeader(wScroll);
		window.addEventListener(
			"scroll",
			() => {
				wScroll = $(window).scrollTop();
				toggleHeader(wScroll);
			},
			{ passive: true }
		);
		// $(window).on("scroll", function() {
		// });
		function toggleHeader(wScroll) {
			if (wScroll > showOffset && wScroll > 20) {
				hiddenHeader.classList.add("--show");
			} else {
				if (!dropdownIsOpened) hiddenHeader.classList.remove("--show");
			}
		}

		hiddenHeader.querySelector("ul").addEventListener("mouseenter", () => {
			dropdownIsOpened = true;
		});
		hiddenHeader.querySelector("ul").addEventListener("mouseleave", () => {
			dropdownIsOpened = false;
			if (wScroll < showOffset) {
				hiddenHeader.classList.remove("--show");
			}
		});

		// Header anzeigen, wenn kein Element mit der Klasse "page_start" vorhanden ist
		if (
			!pageStart &&
			!document.querySelector(".header--shop") &&
			!document.querySelector(".home__banner")
		) {
			// hiddenHeader.classList.remove("--hidden-on-load");
		}
	}

	// Scrolling Controls: Enable/Disable
	function disableScroll() {
		// Get the current page scroll position
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		(scrollLeft =
			window.pageXOffset || document.documentElement.scrollLeft),
			// if any scroll is attempted, set this to the previous value
			(window.onscroll = function () {
				window.scrollTo(scrollLeft, scrollTop);
			});
	}

	function enableScroll() {
		window.onscroll = function () {};
		$("body").removeClass("--hide-scrollbar");
	}

	//Accordeon
	$(".accordeon__item .accordeon__header").click(function (e) {
		$(this)
			.parent(".accordeon__item")
			.toggleClass("accordeon__item--opened");
		$accordion_content = $(this)
			.parent(".accordeon__item")
			.find(".accordeon__content");
		$(".accordeon__content").not($accordion_content).slideUp(200);
		$(".accordeon__item")
			.find(".accordeon__content")
			.not($accordion_content)
			.parent(".accordeon__item")
			.removeClass("accordeon__item--opened");
		$accordion_content.stop(true, true).slideToggle(200);

		target = e.currentTarget.parentElement;
		if (target.classList.contains("accordeon__item--opened")) {
			setTimeout(function () {
				if (window.innerHeight < target.offsetHeight + 100) {
					window.scrollTo({
						behavior: "smooth",
						top:
							target.getBoundingClientRect().top -
							document.body.getBoundingClientRect().top -
							115,
					});
				} else {
					target.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}
			}, 200);
		}
	});

	//Erstes Item bei Laden der Seite geöffnet
	$(".accordeon")
		.not(".accordeon--closed")
		.find(".accordeon__item")
		.first()
		.addClass("accordeon__item--opened");
	$(".accordeon")
		.not(".accordeon--closed")
		.find(".accordeon__item")
		.first()
		.find(".accordeon__content")
		.show();

	// Breadcrum - Letztes Element in view scrollen
	// document.querySelectorAll('.woocommerce-breadcrumb a:last-of-type')[-0].scrollIntoView()

	const termDescription = $(".term-description");
	if (termDescription) {
		termDescription.addClass("--hide-text");
		termDescription.append('<a class="show-more">Mehr lesen</a>');
		termDescription.find(".show-more").click(() => {
			termDescription.removeClass("--hide-text");
		});
	}

	// Cart
	if ($(".cart").length > 0 || $(".checkout").length > 0) {
		scrollOffset = 265;
	}
	//Warenkorb Neu laden bei Gutscheincode anpassungen
	jQuery(document.body).on(
		"applied_coupon_in_checkout removed_coupon_in_checkout",
		function () {
			location.reload();
		}
	);

	//Input Border Farbe bei Füllung färben
	$("input, textarea").each(function () {
		if ($(this).val() !== "") {
			$(this).addClass("input--filled");
			$(this).parents(".form-row").addClass("form-row--filled");
		}
	});
	$("input, textarea").on("keyup change", function () {
		if ($(this).val() !== "") {
			$(this).addClass("input--filled");
			$(this).parents(".form-row").addClass("form-row--filled");
		} else {
			$(this).removeClass("input--filled");
			$(this).parents(".form-row").removeClass("form-row--filled");
		}
	});

	// Formular anpassen
	$("<div class='checkmark'></div>").insertAfter(
		'.standard-formular input[type="checkbox"]'
	);
	$("input.half").each(function () {
		$(this).parent().addClass("half");
	});

	// Kontaktformular: Lebel rot bei falscher eingabe
	waitForElementToDisplay(
		".wpcf7-not-valid-tip",
		function () {
			$(".wpcf7-not-valid-tip")
				.parent()
				.parent()
				.find(".labeltext")
				.css("color", "rgb(218, 15, 15)");
		},
		10,
		9000
	);

	function waitForElementToDisplay(
		selector,
		callback,
		checkFrequencyInMs,
		timeoutInMs
	) {
		var startTimeInMs = Date.now();
		(function loopSearch() {
			if (document.querySelector(selector) != null) {
				callback();
				return;
			} else {
				setTimeout(function () {
					if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
						return;
					loopSearch();
				}, checkFrequencyInMs);
			}
		})();
	}

	if (document.querySelector(".kasse")) {
		const noticesWrapper = document.querySelector(
			".woocommerce-notices-wrapper"
		);

		// create a new instance of 'MutationObserver' named 'observer',
		// passing it a callback function
		observer = new MutationObserver(function (mutationsList, observer) {
			$(".left .container").prepend(noticesWrapper);
		});

		// call 'observe' on that MutationObserver instance,
		// passing it the element to observe, and the options object
		observer.observe(noticesWrapper, {
			characterData: false,
			childList: true,
			attributes: false,
		});
	}

	$("input, textarea, select").on("keyup change", function () {
		$(this).parent("p").removeClass("--error");
	});

	//Do the First state
	tabName = $(".tab__link.--active").attr("data-tabID");
	$(".tab__content").hide();
	$(".tab__content#" + tabName).show();

	//Tab Control Function
	$(".tab__link").click(function () {
		tabName = $(this).attr("data-tabID");
		//Hide the Actives
		$(".tab__content").hide();
		$(".tab__link").removeClass("--active");
		//Show the Selected
		$(this).addClass("--active");
		$(".tab__content#" + tabName).show();
	});

	selectedName = $(".swatch.selected")
		.parent()
		.find(".swatch__tooltip")
		.text();
	$(".variations .label label").append("<span></span>");
	updateVariationTooltip();

	function updateVariationTooltip() {
		setTimeout(function () {
			$(".variations .label span").html("");
			$(".swatch.selected").each(function () {
				selectedName = $(this).parent().find(".swatch__tooltip").text();
				$(".variations .label span").html(selectedName);
			});
		}, 50);
	}

	$(".reset_variations").on("click", updateVariationTooltip);
	$(".swatch").on("click", updateVariationTooltip);

	// Background Dark Image
	const darkBackgrounds = document.querySelectorAll(".background--dark");
	darkBackgrounds.forEach((element) => {
		const backgroundElement = document.createElement("img");
		backgroundElement.classList.add("background__image");
		backgroundElement.src =
			"https://atelier-delatron.de/wp-content/themes/atelier_theme/assets/img/website/background_dark_image.jpg";
		element.append(backgroundElement);
	});

	// Mobile Message swipe up
	let touchstartY = 0;
	let touchendY = 0;
	function handleGesture(item) {
		if (touchendY < touchstartY) {
			// Swipe Up
			item.classList.add("--swipe-up");
		}
		if (touchendY > touchstartY) {
			// Swipe Down
		}
	}
	document
		.querySelectorAll(".woocommerce-message, .woocommerce-error")
		.forEach((item) => {
			item.addEventListener("touchstart", (e) => {
				touchstartY = e.changedTouches[0].screenY;
			});

			item.addEventListener("touchend", (e) => {
				touchendY = e.changedTouches[0].screenY;
				handleGesture(item);
			});

			item.addEventListener("touchmove", (e) => {
				e.preventDefault();
			});
		});

	$(".related").append('<div class="slider__controls"></div>');

	//slider
	$(".slider, .related .products").each(function () {
		const controls = $(this).next(".slider__controls");
		controls.append('<div class="slider__arrows"></div>');
		$(this).slick({
			autoplay: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			swipeToSlide: true,
			variableWidth: true,
			infinite: false,
			// lazyLoad: 'progressive',
			lazyLoad: "ondemand",
			waitForAnimate: true,

			arrows: true,
			appendArrows: controls.find(".slider__arrows"),
			dots: true,
			appendDots: controls,

			draggable: true,
			touchMove: true,
			touchThreshold: 180,

			responsive: [
				{
					breakpoint: 850,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 520,
					settings: {
						touchThreshold: 250,
						slidesToShow: 1,
					},
					// settings: "unslick"
				},
			],
		});
	});

	$(".woocommerce-product-gallery").each(function () {
		// Add required DOM Structure
		// $(this).append('<div class="slider__controls"></div>')
		// $(this).find('.slider__controls').append('<div class="slider__arrows"></div>')

		// Init slider
		$(this)
			.find(".woocommerce-product-gallery__wrapper")
			.slick({
				autoplay: false,
				speed: 200,
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				mobileFirst: true,

				arrows: false,
				// arrows: true,
				// appendArrows: $(this).find('.slider__arrows'),
				dots: true,
				// appendDots: $(this).find('.slider__controls'),

				responsive: [
					{
						breakpoint: 768,
						settings: "unslick",
					},
				],
			});
	});

	if (document.querySelector("tr.subtotal")) {
		$("tr.subtotal").prev("tr").addClass("pre__subtotal");
	}

	if (document.querySelector(".checkout_coupon")) {
		setTimeout(function () {
			document.querySelector(".checkout_coupon").style.display = "block";
		}, 1000);
	}

	// Open popups
	const popupButtons = document.querySelectorAll("a.--open__popup");
	const popupButtonsSpan = document.querySelectorAll("a.--open__popup span");
	popupButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			disableScroll();
			e.preventDefault();
			const popup = e.target.dataset.popup;
			document
				.querySelector(".popup.--" + popup)
				.classList.remove("--hidden");
		});
	});
	popupButtonsSpan.forEach((button) => {
		button.addEventListener("click", (e) => {
			disableScroll();
			e.preventDefault();
			const popup = e.target.parentElement.dataset.popup;
			document
				.querySelector(".popup.--" + popup)
				.classList.remove("--hidden");
		});
	});

	// Close popups
	const popupCloseButtons = document.querySelectorAll(".popup .popup__close");
	const popupCloseButtonsImg = document.querySelectorAll(
		".popup .popup__close img"
	);
	popupCloseButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			enableScroll();
			e.target.parentElement.parentElement.classList.add("--hidden");
		});
	});
	popupCloseButtonsImg.forEach((button) => {
		button.addEventListener("click", (e) => {
			enableScroll();
			e.target.parentElement.parentElement.parentElement.classList.add(
				"--hidden"
			);
		});
	});

	// Erweitere die Click-Box input zum li Container
	document
		.querySelectorAll(".woocommerce-shipping-methods li")
		.forEach((element) => {
			element.addEventListener("click", (e) => {
				e.currentTarget.querySelector("input").checked = true;
				jQuery("body").trigger("update_checkout");

				const label =
					e.currentTarget.querySelector("label").childNodes[0]
						.nodeValue;
				$(".shipping__total .label").text(label);

				let amount = undefined;
				if (e.currentTarget.querySelector(".amount")) {
					amount =
						e.currentTarget.querySelector(".amount bdi")
							.childNodes[0].nodeValue +
						'<span class="woocommerce-Price-currencySymbol">€</span>';
				}
				if (amount === undefined) {
					amount = "Kostenlos!";
				}
				document.querySelector(".shipping__total .totals").innerHTML =
					amount;

				// Gesamtsumme ausrechen und anzeigen
				let subtotalEl = document.querySelector(".subtotal bdi");
				if (!subtotalEl)
					subtotalEl = document.querySelector(".cart-subtotal bdi");
				const subtotal = parseFloat(
					subtotalEl.childNodes[0].nodeValue.replace(",", ".")
				);
				const shipping = parseFloat(amount.replace(",", "."));
				let total;
				if (isNaN(shipping)) {
					total = subtotal;
				} else {
					total = subtotal + shipping;
				}
				total = `${total}`.substring(0, 5).replace(".", ",");
				document.querySelector(
					".order-total bdi"
				).innerHTML = `${total}<span class="woocommerce-Price-currencySymbol">€</span>`;

				newElement = null;
				newElement = document.createElement("div");
				newElement.classList.add("shop_table__icon");
				newElement.classList.add("shop_table__icon--shipping");
				document
					.querySelector(".shipping__total th")
					.prepend(newElement);
			});
		});

	let newElement;

	document.querySelectorAll(".cart-discount").forEach((element) => {
		newElement = document.createElement("div");
		newElement.classList.add("shop_table__icon");
		newElement.classList.add("shop_table__icon--discount");
		element.querySelector("th").prepend(newElement);
	});

	document
		.querySelectorAll(".woocommerce-remove-coupon")
		.forEach((element) => {
			element.innerHTML =
				'<div class="icon--remove-coupon" title="Gutschein entfernen"></div>';
		});

	newElement = null;
	newElement = document.createElement("div");
	newElement.classList.add("shop_table__icon");
	newElement.classList.add("shop_table__icon--shipping");
	if (document.querySelector(".shipping__total th")) {
		document.querySelector(".shipping__total th").prepend(newElement);
	}
});

// @prepros-append "blocks/booking-reminder.js";
// @prepros-append "blocks/productfilter.js";
// @prepros-append "blocks/newsletter.js";
// @prepros-append "blocks/kontakt-hero-banner.js";
// @prepros-append "pages/archive.js";
// @prepros-append "lib/sendinblue.js";
// @prepros-append "lib/lightbox.js";
// @prepros-append "scripts/contactform7.js";
