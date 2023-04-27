jQuery(document).ready(function ($) {
	const bookingReminder = $('.booking-reminder')
	const urlParams = new URLSearchParams(window.location.search)
	const bookUncompleted = urlParams.get('book_uncompleted') || Cookies.get('book_uncompleted')
	const bookTitle = urlParams.get('book_title') || Cookies.get('book_title')
	const bookColor = urlParams.get('book_color') || Cookies.get('book_color')

	console.log('bookTitle', bookTitle)

	if (bookUncompleted === 'true') {
		document.documentElement.style.setProperty('--book-color', bookColor)
		bookingReminder.find('.booking-reminder__text p').text(bookTitle)
		bookingReminder.removeClass('--hidden')

		Cookies.set('book_uncompleted', 'true', { expires: 1 })
		Cookies.set('book_title', bookTitle, { expires: 1 })
		Cookies.set('book_color', bookColor, { expires: 1 })
	}

	bookingReminder.hover(
		function () {
			$(this).removeClass('--closed')
			$(this).find('.booking-reminder__text').animate(
				{
					width: 'toggle',
					opacity: 1,
					'padding-left': '14px',
				},
				200,
				'swing'
			)
		},
		function () {
			$(this).addClass('--closed')
			$(this).find('.booking-reminder__text').animate(
				{
					width: 'toggle',
					opacity: 0,
					'padding-left': '0px',
				},
				200,
				'swing'
			)
		}
	)
})
