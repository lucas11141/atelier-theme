jQuery(document).ready(function ($) {
	// Product Filter
	const productsFilter = document.querySelector('.products__filter')
	if (productsFilter) {
		const buttonOne = productsFilter.querySelector('.--child')
		const buttonTwo = productsFilter.querySelector('.--adult')
		const resetButton = document.querySelector('.filter__reset')
		const productsOne = document.querySelectorAll('.product__item.--child')
		const productsTwo = document.querySelectorAll('.product__item.--adult')
		let currentFilter

		// Erhält den aktuellen Filter aus der URL
		function getFilterParams() {
			const urlParams = new URLSearchParams(window.location.search)
			let filter = urlParams.get('filter')

			if (filter === '') filter = undefined

			return filter
		}

		// Setzt den Filter
		function setFilter(filter) {
			if (filter === undefined) {
				currentFilter = undefined

				productsOne.forEach((product) => {
					product.style.display = 'flex'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'flex'
				})

				buttonOne.classList.remove('--active')
				buttonTwo.classList.remove('--active')
				resetButton.classList.add('--hidden')
			}
			if (filter === 'child') {
				currentFilter = 'child'

				productsOne.forEach((product) => {
					product.style.display = 'flex'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'none'
				})

				buttonOne.classList.add('--active')
				buttonTwo.classList.remove('--active')
				resetButton.classList.remove('--hidden')
			}
			if (filter === 'adult') {
				currentFilter = 'adult'

				productsOne.forEach((product) => {
					product.style.display = 'none'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'flex'
				})

				buttonOne.classList.remove('--active')
				buttonTwo.classList.add('--active')
				resetButton.classList.remove('--hidden')
			}
		}

		// Setzte den Filter beim Laden der Seite
		setFilter(getFilterParams())

		// Button Event Listener
		buttonOne.addEventListener('click', () => {
			if (currentFilter === 'child') {
				setFilter(undefined)
			} else {
				setFilter('child')
			}
		})
		buttonTwo.addEventListener('click', () => {
			if (currentFilter === 'adult') {
				setFilter(undefined)
			} else {
				setFilter('adult')
			}
		})
		resetButton.addEventListener('click', () => setFilter(undefined))
	}
})
