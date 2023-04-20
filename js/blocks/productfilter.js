jQuery(document).ready(function ($) {
	console.log('test')

	// Product Filter
	const productsFilter = document.querySelector('.products__filter')
	if (productsFilter) {
		let filterIndex = 0

		//
		const buttonOne = productsFilter.querySelector('.--child')
		const buttonTwo = productsFilter.querySelector('.--adult')
		buttonOne.addEventListener('click', () => {
			if (filterIndex === 1) {
				filterProduct(0)
			} else {
				filterProduct(1)
			}
		})
		buttonTwo.addEventListener('click', () => {
			if (filterIndex === 2) {
				filterProduct(0)
			} else {
				filterProduct(2)
			}
		})

		// Reset Button
		const resetFilter = document.querySelector('.filter__reset')
		resetFilter.addEventListener('click', () => filterProduct(0))

		//
		const productsOne = document.querySelectorAll('.product__item.--child')
		const productsTwo = document.querySelectorAll('.product__item.--adult')

		//
		function filterProduct(filter) {
			if (filter === 0) {
				filterIndex = 0
				console.log('Filter: 0')
				productsOne.forEach((product) => {
					product.style.display = 'flex'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'flex'
				})
				buttonOne.classList.remove('--active')
				buttonTwo.classList.remove('--active')
				resetFilter.classList.add('--hidden')
			}
			if (filter === 1) {
				filterIndex = 1
				console.log('Filter: 1')
				productsOne.forEach((product) => {
					product.style.display = 'flex'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'none'
				})
				buttonOne.classList.add('--active')
				buttonTwo.classList.remove('--active')
				resetFilter.classList.remove('--hidden')
			}
			if (filter === 2) {
				filterIndex = 2
				console.log('Filter: 2')
				productsOne.forEach((product) => {
					product.style.display = 'none'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'flex'
				})
				buttonOne.classList.remove('--active')
				buttonTwo.classList.add('--active')
				resetFilter.classList.remove('--hidden')
			}
		}
	}

	const filterOneBtn = document.querySelector('.filter--1')
	if (filterOneBtn) {
		filterOneBtn.addEventListener('click', () => {
			filterProduct(1)
		})
	}
	const filterTwoBtn = document.querySelector('.filter--2')
	if (filterTwoBtn) {
		filterTwoBtn.addEventListener('click', () => {
			filterProduct(2)
		})
	}
})
