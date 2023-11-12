// FUTURE: Show button at the end of the list to show dates of next month when available

// @ts-ignore
const $ = window.jQuery; // Use jquery from wordpress

import { Navigation } from 'swiper/modules';
import Swiper from 'swiper';
import scrollView from '../functions/scrollView';

Swiper.use([Navigation]);

const categoryTranslation = {
	'course-child': 'Kurs für Kinder',
	'course-adult': 'Kurs für Erwachsene',
	workshop: 'Workshop',
	'holiday-workshop': 'Ferienworkshop',
};

class DateOverview {
	fetchedOnce: boolean = false;
	allDates: {
		year: number;
		month: number;
		dates: DateResponse[];
	}[] = [];
	dates: DateResponse[];
	calendar: DateOverviewCalendar;
	list: DateOverviewList;
	filter: DateOverviewFilter;
	selector: DateOverviewSelector;
	currentYear: number;
	currentMonth: number;

	constructor(
		calendarElement: HTMLElement,
		listElement: HTMLElement,
		filterElement: HTMLElement,
		selectorElement: HTMLElement
	) {
		this.calendar = new DateOverviewCalendar(calendarElement);
		this.list = new DateOverviewList(listElement);
		this.filter = new DateOverviewFilter(filterElement);
		this.selector = new DateOverviewSelector(selectorElement);

		this.initEventListeners();

		// Set current month
		this.showMonth(new Date().getFullYear(), new Date().getMonth() + 1);
	}

	showMonth(year: number, month: number) {
		// return if month is already set
		if (this.currentYear === year && this.currentMonth === month)
			throw new Error('Month is already set');

		// Set current month
		this.currentYear = year;
		this.currentMonth = month;

		// Check if dates of this month are already fetched
		if (this.fetchedOnce) {
			this.calendar.showMonth(year, month);
			this.list.showMonth(year, month);
		} else {
			this.fetchDates(year, month);
		}
	}

	initEventListeners() {
		this.calendar.onSelect((date) => {
			this.list.scrollToItem(date);
		});

		this.calendar.onNext(() => {
			// fetch data via ajax
			let year = this.currentYear;
			let month = this.currentMonth + 1;

			// Reset month and increase year
			if (month > 12) {
				year++;
				month = 1;
			}

			this.showMonth(year, month);
		});

		this.calendar.onPrev(() => {
			let year = this.currentYear;
			let month = this.currentMonth - 1;

			// Reset month and decrease year
			if (month < 1) {
				year--;
				month = 12;
			}

			this.showMonth(year, month);
		});

		this.filter.onFilterCategory((category) => {
			if (category === null) {
				this.calendar.setFilter(null);
				this.list.setFilter(null);
			} else {
				this.calendar.setFilter({
					type: 'category',
					year: this.currentYear,
					month: this.currentMonth,
					category,
				});
				this.list.setFilter({
					type: 'category',
					year: this.currentYear,
					month: this.currentMonth,
					category,
				});
			}

			this.selector.showProduct('');
			console.log(category);
			this.setUrlParams(null, category, null);
		});

		this.list.onFilterProduct((productId, productCategory, courseTimeId) => {
			this.calendar.setFilter({ type: 'product', productId, courseTimeId: courseTimeId });
			this.filter.setFilter(productCategory);
			this.selector.showProduct(productId, courseTimeId);
			this.setUrlParams(productId, productCategory, courseTimeId);
		});

		this.selector.onSelect((productId, productCategory, courseTimeId) => {
			this.list.setFilter({ type: 'product', productId, courseTimeId });
			this.calendar.setFilter({ type: 'product', productId });
			this.filter.setFilter(productCategory);
			this.selector.showProduct(productId, courseTimeId);
			this.setUrlParams(productId, productCategory, courseTimeId);
		});

		this.selector.onSelectCourseTime((productId, courseTimeId) => {
			this.calendar.setFilter({ type: 'product', productId, courseTimeId });
			this.list.setFilter({ type: 'product', productId, courseTimeId });
			this.setUrlParams(productId, null, courseTimeId);
		});
	}

	async fetchDates(year: number, month: number) {
		const thisClone = this;

		await $.ajax({
			// @ts-ignore
			url: ajaxurl,
			type: 'POST',
			data: {
				action: 'date_overview_get_product_dates', // Dies sollte mit dem in add_action definierten Haken übereinstimmen
				year: year,
				month: month,
			},
			success: function (response) {
				thisClone.dates = response;

				const dates: DateResponse[] = response.data;

				// Fill calendar and list with data
				thisClone.calendar.fillGridData(dates);
				thisClone.list.fillListData(dates);
				thisClone.selector.fillSelectorData(dates);

				// Display month
				thisClone.calendar.showMonth(year, month);
				thisClone.list.showMonth(year, month);

				thisClone.fetchedOnce = true;

				// Set filter by url params
				thisClone.setFilterByUrlParams();
			},
		});
	}

	setFilterByUrlParams() {
		const productId = Number(new URL(window.location.href).searchParams.get('productId'));
		const productCategory = new URL(window.location.href).searchParams.get(
			'productCategory'
		) as Category;
		const courseTimeId = Number(new URL(window.location.href).searchParams.get('courseTimeId'));

		if (productId) {
			this.list.setFilter({ type: 'product', productId, courseTimeId });
			this.calendar.setFilter({ type: 'product', productId, courseTimeId });
			this.selector.showProduct(productId, courseTimeId);
			this.filter.setFilter(productCategory);
		} else if (productCategory) {
			this.filter.setFilter(productCategory);
			this.calendar.setFilter({
				type: 'category',
				year: this.currentYear,
				month: this.currentMonth,
				category: productCategory,
			});
			this.list.setFilter({
				type: 'category',
				year: this.currentYear,
				month: this.currentMonth,
				category: productCategory,
			});
		}
	}

	setUrlParams(
		productId: number | null | undefined,
		productCategory: Category | null | undefined,
		courseTimeId: number | null | undefined
	) {
		// Save filter in URL when filter is not null (Examply: url?productCategory=workshop&productId=123) and delete parameters when values are null
		const url = new URL(window.location.href);

		if (!productId) {
			url.searchParams.delete('productId');
		} else {
			url.searchParams.set('productId', productId.toString());
		}

		if (!productCategory) {
			url.searchParams.delete('productCategory');
		} else {
			url.searchParams.set('productCategory', productCategory);
		}

		if (!courseTimeId) {
			url.searchParams.delete('courseTimeId');
		} else {
			url.searchParams.set('courseTimeId', courseTimeId.toString());
		}

		window.history.pushState({}, '', url.toString());
	}
}

/*------------------------------------*/
/* Calendar view */
/*------------------------------------*/
class DateOverviewCalendar {
	currentYear: number = new Date().getFullYear();
	currentMonth: number = new Date().getMonth() + 1;
	monthGrids: MonthGrid[] = [];
	filter: Filter = null;

	// Without default values
	container: HTMLElement;
	dates: DateResponse[];
	monthLabelSlider: Swiper;
	monthLabelSliderYear: Swiper;
	daysContainer: HTMLElement;

	// Event listeners
	private onSelectCallback: (date: string) => void;
	private onNextCallback: () => void;
	private onPrevCallback: () => void;

	constructor(container) {
		this.container = container;
		this.daysContainer = this.container.querySelector(
			'#date-overview__calendar__days'
		) as HTMLElement;

		this.generateEmptyMonthGrids(this.currentYear, this.currentMonth);
		this.initMonthLabelSlider();
	}

	/*------------------------------------*/
	/* Initialisation */
	/*------------------------------------*/
	generateEmptyMonthGrids(year: number, month: number) {
		// render empty object of type MonthGrid[] for the next 12 month
		for (let i = 0; i < 12; i++) {
			// start with current month and go on
			let forMonth = month + i;
			let forYear = year;

			// Reset month and increase year
			if (forMonth > 12) {
				forYear++;
				forMonth = forMonth - 12;
			}

			this.monthGrids.push(this.generateEmptyMonthGrid(forYear, forMonth));
		}
	}
	generateEmptyMonthGrid(year: number, month: number): MonthGrid {
		// Erster Tag des angegebenen Monats und Jahres
		const firstDayOfMonth = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
		firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1);

		// Erstelle den letzten Tag des angegebenen Monats und Jahres
		const lastDayOfMonth = new Date(year, month, 1);

		// Festlegen des Startdatums unter Berücksichtigung des ersten Wochentags
		const startDate = new Date(firstDayOfMonth);
		startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Anpassung an den ersten Wochentag

		const monthGrid: MonthGridItem[] = [];

		// Days from last month
		while (startDate <= firstDayOfMonth) {
			monthGrid.push({
				date: startDate.toISOString().split('T')[0],
				day: startDate.getDate(),
				month: startDate.getMonth() + 1,
				currentMonth: false,
			});
			startDate.setDate(startDate.getDate() + 1);
		}

		// Days from current month
		while (startDate <= lastDayOfMonth) {
			monthGrid.push({
				date: startDate.toISOString().split('T')[0],
				day: startDate.getDate(),
				month: startDate.getMonth() + 1,
				currentMonth: true,
			});
			startDate.setDate(startDate.getDate() + 1);
		}

		// define maxcount to be evently divisible by 7 depending on current length of calendarGrid
		const maxCount = Math.ceil(monthGrid.length / 7) * 7;

		// Days from next month
		while (monthGrid.length < maxCount) {
			monthGrid.push({
				date: startDate.toISOString().split('T')[0],
				day: startDate.getDate(),
				month: startDate.getMonth() + 1,
				currentMonth: false,
			});
			startDate.setDate(startDate.getDate() + 1);
		}

		const monthGridObject: MonthGrid = {
			year,
			month,
			items: monthGrid,
		};

		// Add new monthGrid to this.monthGrids
		return monthGridObject;
	}
	initMonthLabelSlider() {
		const slider = this.container.querySelector('#calendar__month-slider .swiper-wrapper');
		const nextButton = this.container.querySelector('#calendar__next') as HTMLElement;
		const prevButton = this.container.querySelector('#calendar__prev') as HTMLElement;

		// Append a slide for each month with the month name and year
		this.monthGrids.forEach((monthGrid) => {
			const monthSlide = document.createElement('div');
			const monthLabel = Intl.DateTimeFormat('de-DE', {
				month: 'long',
				year: 'numeric',
			}).format(new Date(monthGrid.year, monthGrid.month - 1, 1));

			monthSlide.classList.add('swiper-slide');
			monthSlide.innerHTML = monthLabel;

			slider?.appendChild(monthSlide);
		});

		this.monthLabelSlider = new Swiper('#calendar__month-slider', {
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 24,
			speed: 300,
			allowTouchMove: false,

			navigation: {
				nextEl: nextButton,
				prevEl: prevButton,
			},

			on: {
				navigationNext: () => {
					// Trigger onNext event
					if (this.onNextCallback) {
						this.onNextCallback();
					}
				},
				navigationPrev: () => {
					// Trigger onPrev event
					if (this.onPrevCallback) this.onPrevCallback();
				},
			},
		});

		if (!this.monthLabelSlider) throw new Error('No monthLabelSlider found');
	}
	public fillGridData(dates: DateResponse[]) {
		// FUTURE: Minimize forEach calls

		// fill newDates with dates
		dates.forEach((date) => {
			const dateString = new Date(date.date).toISOString().split('T')[0];

			this.monthGrids.forEach((monthGrid) => {
				monthGrid.items.forEach((item) => {
					// add products to monthGrid if date and month and year match
					if (item.date === dateString) {
						if (!item.products) item.products = [];
						item.products.push(date.product);
					}
				});
			});
		});

		this.monthGrids.forEach((monthGrid) => {
			this.renderGridItems(monthGrid.year, monthGrid.month);
		});
	}

	/*------------------------------------*/
	/* Render functions */
	/*------------------------------------*/
	renderGridItems(year: number, month: number) {
		this.currentYear = year;
		this.currentMonth = month;

		const monthGrid = this.monthGrids.find(
			(monthGrid) => monthGrid.year === year && monthGrid.month === month
		)?.items as MonthGridItem[];

		if (!monthGrid) throw new Error('No monthGrid found');

		this.daysContainer.innerHTML = '';
		monthGrid.forEach((item) => {
			this.renderGridItem(item);
		});
	}
	renderGridItem(item: MonthGridItem) {
		// Append existing element
		if (item.element) {
			this.daysContainer.appendChild(item.element);
			return;
		}

		let templateQuery = '';
		if (item.currentMonth) {
			if (item.products) {
				templateQuery = '#template--date-overview__calendar__day--filled';
			} else {
				templateQuery = '#template--date-overview__calendar__day--empty';
			}
		} else {
			templateQuery = '#template--date-overview__calendar__day--other-month';
		}

		// Select template
		const template = document.querySelector(templateQuery) as HTMLTemplateElement;
		if (!template) throw new Error(`No template "${templateQuery}" found`);

		// Clone template
		const clone = template.content.cloneNode(true) as HTMLElement;

		// Add item to list
		this.daysContainer.appendChild(clone);

		// select currently added item
		const element = this.daysContainer.lastElementChild as HTMLElement;
		item.element = element;

		// Add class .--past when date is in the past
		const today = new Date();
		const itemDate = new Date(item.date);
		if (itemDate < today) {
			item.element.classList.add('--past');
		}

		// select by template-month attribute
		const day = element.querySelector('[template-day]') as HTMLElement;
		if (!day) throw new Error('No day found');
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		day.innerHTML = new Intl.DateTimeFormat('de-DE', {
			day: 'numeric',
		}).format(new Date(item.date));

		// Return of item is not in current month
		if (!item.currentMonth) return;

		// data-product-ids="<?= $productIds ?>" data-product-categories="<?= $productCategories ?>" data-date="<?= $date['date'] ?>" data-active="true"
		const productIds = item.products?.map((product) => product.ID).join(',');
		element.dataset.productIds = productIds;

		const productCategories = item.products?.map((product) => product.category).join(',');
		element.dataset.productCategories = productCategories;

		element.dataset.date = item.date;

		// Add event listener
		element.addEventListener('click', (e) => {
			const target = e.currentTarget as HTMLElement;
			const date = target.dataset.date;

			// Do nothing when button is inactive
			if (target.dataset.active === 'false') return;

			// Error handling
			if (!date) throw new Error('No date found');

			// Trigger onSelect event
			if (this.onSelectCallback) this.onSelectCallback(date);
		});

		// Add product parts
		if (item.products) {
			// Add event listener
			item.element.addEventListener('click', () => {
				// Trigger onSelect event
				if (this.onSelectCallback) this.onSelectCallback(item.date);
			});

			item.products.forEach((product) => {
				const container = element.querySelector(
					'#date-overview__calendar__day__slide__color-container'
				);

				if (!container) throw new Error('No container found');

				// this.renderProductPart(item, product);
				const template = document.querySelector(
					'#template--date-overview__calendar__day__color-slice'
				) as HTMLTemplateElement;

				if (!template)
					throw new Error(
						'No template "#template--date-overview__calendar__day__color-slice" found'
					);

				// Clone template
				const clone = template.content.cloneNode(true) as HTMLElement;

				// Add item to list
				container.appendChild(clone);

				// select currently added item
				const slice = container.lastElementChild as HTMLElement;

				// data-product-id="<?= $product['ID'] ?>" data-product-category="<?= $product['category'] ?>" data-active="true"
				slice.dataset.productId = product.ID.toString();
				slice.dataset.productCategory = product.category;

				if (product.courseTimeId)
					slice.dataset.courseTimeId = product.courseTimeId.toString();

				slice.style.backgroundColor = `var(--color-${product.category})`;
			});
		}
	}

	/*------------------------------------*/
	/* Public functions */
	/*------------------------------------*/
	public showMonth(year: number, month: number) {
		this.renderGridItems(year, month);

		const monthIndex = this.monthGrids.findIndex(
			(monthGrid) => monthGrid.year === year && monthGrid.month === month
		);
		this.monthLabelSlider.slideTo(monthIndex);
	}
	public setFilter(filter: Filter) {
		// Reset filter when filter is null
		if (filter?.type === 'product' && filter.productId === 0) filter = null;

		this.filter = filter;

		// Set active state of all buttons
		this.monthGrids.forEach((monthGrid) => {
			monthGrid.items.forEach((item) => {
				if (!item.element) throw new Error('No button found');

				// Activate all buttons when identifier is null
				if (filter === null) {
					item.element.dataset.active = 'true';
				}

				// Filter by category
				if (filter?.type === 'category') {
					const categories: Category[] = [];
					item.products?.forEach((product) => {
						categories.push(product.category);
					});
					item.element.dataset.active = categories.includes(filter.category).toString(); // Activate slice if productCategory matches
				}

				// Filter by product
				if (filter?.type === 'product') {
					const productIds: number[] = [];
					item.products?.forEach((product) => {
						productIds.push(product.ID);
					});
					item.element.dataset.active = productIds.includes(filter.productId).toString(); // Activate slice if productId matches
				}

				// Set color slices active state
				const colorSlices = item.element.querySelectorAll(
					'#date-overview__calendar__day__color-slice'
				) as NodeListOf<HTMLElement>;

				colorSlices.forEach((slice) => {
					// active all buttons when identifier is null
					if (filter === null) {
						slice.dataset.active = 'true';
					}

					// Filter by category
					if (filter?.type === 'category') {
						const category = slice.dataset.productCategory as Category;
						slice.dataset.active = (category === filter.category).toString(); // Activate slice if productCategory matches
					}

					// Filter by product
					if (filter?.type === 'product') {
						let isActive = false;

						// Check if productId matches
						const productId = Number(slice.dataset.productId);
						isActive = productId === filter.productId;

						// Check if courseTimeId matches
						if (isActive) {
							const courseTimeId = Number(slice.dataset.courseTimeId);
							isActive = courseTimeId === filter.courseTimeId;
						}

						// Activate slice if productId matches
						slice.dataset.active = isActive.toString();
					}
				});
			});
		});

		// Show the first month with the filtered product
		if (filter?.type === 'product') {
			if (filter.productId !== 0) {
				// Get month of the first monthGrid with the given productId
				const firstMonth = this.monthGrids.find((monthGrid) => {
					const monthGridItem = monthGrid.items.find((item) => {
						if (!item.products) return false;
						return item.products.find((product) => product.ID === filter.productId);
					});

					return monthGridItem !== undefined;
				});
				this.showMonth(firstMonth?.year as number, firstMonth?.month as number);
			} else {
				const firstMonth = this.monthGrids[0];
				this.showMonth(firstMonth?.year as number, firstMonth?.month as number);
			}
		}
	}

	/*------------------------------------*/
	/* Event listeners */
	/*------------------------------------*/
	public onSelect(callback: (date: string) => void) {
		this.onSelectCallback = callback;
	}
	public onNext(callback: () => void) {
		this.onNextCallback = callback;
	}
	public onPrev(callback: () => void) {
		this.onPrevCallback = callback;
	}
}

/*------------------------------------*/
/* List view */
/*------------------------------------*/
class DateOverviewList {
	currentYear: number = new Date().getFullYear();
	currentMonth: number = new Date().getMonth() + 1;
	monthLists: MonthList[] = [];
	filter: Filter = null;

	// Without default values
	container: HTMLElement;
	dates: DateResponse[];

	// Event listeners
	private onFilterProductCallback: (
		productId: number,
		productCategory: Category,
		courseTimeId?: number
	) => void;

	constructor(container) {
		this.container = container;

		this.generareEmptyMonthLists(this.currentYear, this.currentMonth);
	}

	/*------------------------------------*/
	/* Initialisation */
	/*------------------------------------*/
	generareEmptyMonthLists(year: number, month: number) {
		// render empty object of type MonthGrid[] for the next 12 month
		for (let i = 0; i < 12; i++) {
			// start with current month and go on
			let forMonth = month + i;
			let forYear = year;

			// Reset month and increase year
			if (forMonth > 12) {
				forYear++;
				forMonth = forMonth - 12;
			}

			this.monthLists.push({
				year: forYear,
				month: forMonth,
				items: [],
			});
		}
	}
	public fillListData(dates: DateResponse[]) {
		// FUTURE: Minimize forEach calls

		// fill newDates with dates
		dates.forEach((date) => {
			// get year and month of date
			const dateYear = new Date(date.date).getFullYear();
			const dateMonth = new Date(date.date).getMonth() + 1;
			const dateDay = new Date(date.date).getDate();

			// date.date.date as string
			const dateString = new Date(date.date).toISOString().split('T')[0];

			const monthList = this.monthLists.find(
				(monthList) => monthList.year === dateYear && monthList.month === dateMonth
			) as MonthList;

			if (!monthList.items) monthList.items = [];
			monthList.items.push({
				date: dateString,
				day: dateDay,
				month: dateMonth,
				product: date.product,
			});
		});

		this.monthLists.forEach((monthList) => {
			this.showMonth(monthList.year, monthList.month);
		});
	}

	/*------------------------------------*/
	/* Render functions */
	/*------------------------------------*/
	// Display all dates by month
	renderMonthDatesList(year: number, month: number) {
		const monthList = this.monthLists.find(
			(monthList) => monthList.year === year && monthList.month === month
		)?.items as MonthListItem[];

		if (!monthList) throw new Error('No monthList found');

		this.container.innerHTML = '';

		this.renderListMonth(year, month);
		monthList.forEach((item) => {
			this.renderListItem(item);
		});
	}
	renderMonthCategoryDatesList(year: number, month: number, cateogry: Category) {
		// get all dates of the month with the given category
		const monthList = this.monthLists.find(
			(monthList) => monthList.year === year && monthList.month === month
		)?.items as MonthListItem[];

		if (!monthList) throw new Error('No monthList found');

		const categoryDates = monthList.filter((item) => item.product?.category === cateogry);

		// Remove old content
		this.container.innerHTML = '';

		// Append a new section element for each month
		this.renderListMonth(year, month);
		categoryDates.forEach((item) => {
			this.renderListItem(item);
		});
	}
	// Display all dates of a product in month sections
	renderProductDatesList(productId: number, courseTimeId?: number) {
		// Create MonthList object for all dates of the product
		const productDates: MonthList[] = [];
		this.monthLists.forEach((monthList) => {
			let monthDates: MonthListItem[] = [];

			// Filter by productId. When courseTimeId is given, filter by courseTimeId too
			if (!courseTimeId) {
				monthDates = monthList.items.filter((item) => item.product?.ID === productId);
			} else {
				monthDates = monthList.items.filter(
					(item) =>
						item.product?.ID === productId &&
						item.product?.courseTimeId === courseTimeId
				);
			}

			// Add monthList to productDates
			productDates.push({
				year: monthList.year,
				month: monthList.month,
				items: monthDates,
			});
		});

		if (!productDates) throw new Error('No productDates found');

		// Remove old content
		this.container.innerHTML = '';

		// Append a new section element for each month
		productDates.forEach((monthList) => {
			// Return of month has no dates
			if (monthList.items.length === 0) return;

			this.renderListMonth(monthList.year, monthList.month);

			monthList.items.forEach((item) => {
				this.renderListItem(item);
			});
		});
	}
	// Render a single date item
	renderListItem(item: MonthListItem) {
		// Do not render Item if date is in the past
		const today = new Date();
		const itemDate = new Date(item.date);
		if (itemDate < today) return;

		if (!item.product) throw new Error('No product found');

		const template = document.querySelector(
			'#template--date-overview__list__item'
		) as HTMLTemplateElement;

		if (!template) throw new Error('No template "#template--date-overview__list__item" found');

		// Clone template
		const clone = template.content.cloneNode(true) as HTMLElement;

		// Add item to list
		this.container.appendChild(clone);

		// select currently added item
		const element = this.container.lastElementChild as HTMLElement;
		item.element = element;

		element.style.color = `var(--color-${item.product?.category})`;

		// select by template-month attribute
		const month = element.querySelector('[template-month]') as HTMLElement;
		if (!month) throw new Error('No month found');
		// add formatted month from this.currentMonth using Intl.DateTimeFormat
		month.innerHTML = new Intl.DateTimeFormat('de-DE', {
			month: 'short',
		}).format(new Date(item.date));

		const day = element.querySelector('[template-day]') as HTMLElement;
		if (!day) throw new Error('No day found');
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		day.innerHTML = new Intl.DateTimeFormat('de-DE', {
			day: 'numeric',
		}).format(new Date(item.date));

		const title = element.querySelector('[template-title]') as HTMLElement;
		if (!title) throw new Error('No title found');
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		title.innerHTML = item.product.title;

		const category = element.querySelector('[template-category]') as HTMLElement;
		if (!category) throw new Error('No category found');

		// Set category
		if (item.product.category === 'course-child' || item.product.category === 'course-adult') {
			category.innerHTML = item.product.group.label;
		} else {
			category.innerHTML = categoryTranslation[item.product.category];
		}

		// Show weekday if is filtered by course or specific course time
		if (
			(this.filter?.type === 'product' &&
				this.filter.courseTimeId === item.product.courseTimeId) ||
			(this.filter?.type === 'category' &&
				this.filter.category === item.product.category &&
				item.product.weekday !== undefined)
		) {
			category.innerHTML = `${item.product.weekday?.label}`;
		}

		// Set bookung url
		const bookingButton = element.querySelector('[template-booking-button]') as HTMLLinkElement;
		if (!bookingButton) throw new Error('No booking button found');
		bookingButton.href = item.product.bookingUrl;

		const filterButton = element.querySelector('[template-filter-button]') as HTMLElement;
		if (!filterButton) throw new Error('No filter button found');

		// Remove filter button when is filtered by product
		if (this.filter?.type === 'product') {
			const filterButton = element.querySelector('[template-filter-button]') as HTMLElement;
			if (!filterButton) throw new Error('No filter button found');
			filterButton.remove();
		} else {
			// else: Add event listener
			filterButton.addEventListener('click', () => {
				if (!item.product) throw new Error('No product ID found');

				this.setFilter({
					type: 'product',
					productId: item.product.ID,
					courseTimeId: item.product.courseTimeId,
				});

				// Trigger onFilterProduct event
				this.onFilterProductCallback(
					item.product.ID,
					item.product.category,
					item.product.courseTimeId
				);
			});
		}
	}
	// Render a month label
	renderListMonth(year: number, month: number) {
		const template = document.querySelector(
			'#template--date-overview__list__month'
		) as HTMLTemplateElement;
		if (!template) throw new Error('No template "#template--date-overview__list__month" found');

		// Clone template
		const clone = template.content.cloneNode(true) as HTMLElement;

		// Add item to list
		this.container.appendChild(clone);

		const monthElement = this.container.lastElementChild as HTMLElement;

		const label = monthElement.querySelector('[template-label]') as HTMLElement;
		if (!label) throw new Error('No label found');

		label.innerHTML = new Intl.DateTimeFormat('de-DE', {
			month: 'long',
			// year: "numeric",
		}).format(new Date(year, month - 1));
	}

	/*------------------------------------*/
	/* Misc */
	/*------------------------------------*/
	getCurrentMonthList() {
		const monthList = this.monthLists.find(
			(monthList) =>
				monthList.year === this.currentYear && monthList.month === this.currentMonth
		)?.items as MonthListItem[];

		if (!monthList) throw new Error('No monthList found');

		return monthList;
	}

	/*------------------------------------*/
	/* Public functions */
	/*------------------------------------*/
	public showMonth(year: number, month: number) {
		this.currentYear = year;
		this.currentMonth = month;

		if (!this.filter) {
			this.renderMonthDatesList(this.currentYear, this.currentMonth);
			return;
		}

		if (this.filter.type === 'category') {
			this.renderMonthCategoryDatesList(
				this.currentYear,
				this.currentMonth,
				this.filter.category
			);
			return;
		}

		if (this.filter.type === 'product') {
			this.renderProductDatesList(this.filter.productId, this.filter.courseTimeId);
			return;
		}
	}
	public setFilter(filter: Filter) {
		// Reset filter when filter is null
		if (filter?.type === 'product' && filter.productId === 0) filter = null;

		this.filter = filter;
		this.showMonth(this.currentYear, this.currentMonth);
	}
	public scrollToItem(date: string) {
		const monthList = this.getCurrentMonthList();
		monthList.forEach((item) => {
			if (item.date === date) {
				// Actually scroll to item
				scrollView(item.element, 'center');

				// Add highlight class
				item.element?.classList.add('--highlight');
				setTimeout(() => {
					item.element?.classList.remove('--highlight');
				}, 5000);

				return;
			}
		});
	}

	/*------------------------------------*/
	/* Event listeners */
	/*------------------------------------*/
	public onFilterProduct(
		callback: (productId: number, productCategory: Category, courseTimeId?: number) => void
	) {
		this.onFilterProductCallback = callback;
	}
}

/*------------------------------------*/
/* Filter component */
/*------------------------------------*/
class DateOverviewFilter {
	// Without default values
	container: HTMLElement;
	category: CategoryFilter;
	buttons: NodeListOf<HTMLElement>;

	// Event listeners
	private onFilterCategoryCallback: (category: CategoryFilter) => void;

	constructor(container) {
		this.container = container;
		this.buttons = this.container.querySelectorAll('#date-overview__filter__button');

		// Error handling
		if (!this.buttons) throw new Error('No buttons found');

		this.initEventListeners();
	}

	/*------------------------------------*/
	/* Initialisaton */
	/*------------------------------------*/
	initEventListeners() {
		this.buttons.forEach((button) => {
			button.addEventListener('click', () => {
				// Set category
				const category = button.dataset.category as Category;
				if (category !== this.category) {
					this.setFilter(category);
				} else {
					this.setFilter(null);
				}

				// Trigger onFilterCategory event
				if (this.onFilterCategoryCallback) this.onFilterCategoryCallback(this.category);
			});
		});
	}

	/*------------------------------------*/
	/* Renser functions */
	/*------------------------------------*/
	setButtonState(element: HTMLElement, state: FilterButtonState) {
		if (state == 'unselected') {
			element.classList.remove('--selected');
			element.classList.remove('--inactive');
		} else if (state == 'selected') {
			element.classList.add('--selected');
			element.classList.remove('--inactive');
		} else if (state == 'inactive') {
			element.classList.remove('--selected');
			element.classList.add('--inactive');
		} else {
			throw new Error('Invalid button state');
		}
	}

	/*------------------------------------*/
	/* Public functions */
	/*------------------------------------*/
	public setFilter(category: CategoryFilter) {
		// Set button states
		this.buttons.forEach((button) => {
			if (category === null) {
				this.setButtonState(button, 'unselected');
			} else {
				if (button.dataset.category === category) {
					this.setButtonState(button, 'selected');
				} else {
					this.setButtonState(button, 'inactive');
				}
			}
		});

		// Set category
		this.category = category;
	}

	/*------------------------------------*/
	/* Event listeners */
	/*------------------------------------*/
	public onFilterCategory(callback: (category: CategoryFilter) => void) {
		this.onFilterCategoryCallback = callback;
	}
}

/*------------------------------------*/
/* Product selector */
/*------------------------------------*/
class DateOverviewSelector {
	selectorOptions: SelectorOption[] = [];

	// Without default values
	dates: DateResponse[];
	container: HTMLElement;
	products: ProductType[];
	select: HTMLSelectElement;
	productTitle: HTMLElement;
	productCategory: HTMLElement;
	productImage: HTMLImageElement;
	label: HTMLElement;
	selected: number;

	// Event listeners
	private onSelectCallback: (
		productId: number,
		productCategory: Category,
		courseTimeId: number
	) => void;
	private onSelectCourseTimeCallback: (productId: number, courseTimeId: number) => void;

	constructor(container) {
		this.container = container;
		this.select = this.container.querySelector('select') as HTMLSelectElement;
		this.label = this.container.querySelector('label') as HTMLElement;
		this.productTitle = this.container.querySelector('[template-product-title]') as HTMLElement;
		this.productCategory = this.container.querySelector(
			'[template-product-category]'
		) as HTMLElement;
		this.productImage = this.container.querySelector(
			'[template-product-image]'
		) as HTMLImageElement;

		// Error handling
		if (!this.productTitle || !this.productCategory || !this.productImage)
			throw new Error('No product title, category or image found');
		if (!this.select || !this.label) throw new Error('No select or label element found');

		this.initEventListeners();
	}

	/*------------------------------------*/
	/* Initialisation */
	/*------------------------------------*/
	initEventListeners() {
		this.select.addEventListener('change', (e) => {
			const target = e.currentTarget as HTMLSelectElement;
			const productId = Number(target.value);
			const productCategory = target.selectedOptions[0].dataset.productCategory as Category;
			const courseTimeId =
				Number(target.selectedOptions[0].dataset.courseTimeId as string) ?? undefined;
			console.log('selected courseTimeid', courseTimeId);

			// Trigger onSelect event
			if (this.onSelectCallback)
				this.onSelectCallback(productId, productCategory, courseTimeId);

			this.selected = productId;
		});
	}
	fillSelectorData(dates: DateResponse[]) {
		this.dates = dates;

		// Create array of all products without duplicates
		const products = dates.map((date) => date.product);
		const uniqueProducts = products.filter(
			(product, index, self) => index === self.findIndex((p) => p.ID === product.ID)
		);

		// Sort products by title
		uniqueProducts.sort((a, b) => {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});

		this.products = uniqueProducts;
		this.renderOptions();
	}

	/*------------------------------------*/
	/* Render functions */
	/*------------------------------------*/
	renderOptions() {
		this.select.innerHTML = '';

		// Get all possible categories for the optgroups
		const categories: Category[] = [];
		this.products.forEach((product) => {
			if (!categories.includes(product.category)) {
				categories.push(product.category);
			}
		});

		// Create an optgroup for each category and fill it with the products
		categories.forEach((category) => {
			this.select.innerHTML += `<optgroup label="${categoryTranslation[category]}">`;

			this.products.forEach((product) => {
				if (product.category !== category) return; // Skip product if category does not match
				this.renderOption(product);
			});

			this.select.innerHTML += `</optgroup>`;
		});
	}
	renderOption(product: ProductType) {
		this.select.innerHTML += `<option value="${product.ID}">${product.title}</option>`;

		// Add event listener
		const option = this.select.querySelector(
			`option[value="${product.ID}"]`
		) as HTMLOptionElement;
		if (!option) throw new Error('No option found');

		option.dataset.productCategory = product.category;
		option.dataset.courseTimeId = product.courseTimeId?.toString() ?? '';
	}
	renderOptionLabel(productId: number | '') {
		if (productId === '' || productId === 0) {
			this.productTitle.innerHTML = 'Kein Produkt ausgewählt';
			this.productCategory.innerHTML = '';
			return;
		}

		const product = this.products.find((product) => product.ID === productId);
		if (!product) throw new Error('No product found');

		console.log(product);

		this.productImage.src = product.thumbnail;
		this.productTitle.innerHTML = product.title;
		this.productCategory.innerHTML = categoryTranslation[product.category];
		this.productCategory.style.backgroundColor = `var(--color-${product.category})`;
	}

	/*------------------------------------*/
	/* Weekday selector functions */
	/*------------------------------------*/
	renderWeekdayOptions(courseTimes: ProductType[] = [], courseTimeId?: number) {
		// Adjust structure to other classes (list and calendar)
		const weekdaysContainer = document.querySelector('.weekdays') as HTMLElement;
		weekdaysContainer.innerHTML = '';

		if (courseTimes.length <= 1) return;

		courseTimes.forEach((courseTime) => {
			const button = document.createElement('button');
			const span = document.createElement('span');
			span.textContent = courseTime.weekday.label;
			button.appendChild(span);
			button.setAttribute('role', 'button');
			button.style.color = `var(--color-${courseTime.category})`;
			weekdaysContainer.appendChild(button);

			// Add active class if courseTimeId matches
			console.log(courseTimeId, courseTime.courseTimeId);
			if (courseTimeId === courseTime.courseTimeId) {
				console.log('active');
				button.classList.add('--active');
			}

			button.addEventListener('click', () => {
				const productId = courseTime.ID;

				// Set active class to clicked button
				weekdaysContainer.querySelectorAll('button').forEach((button) => {
					button.classList.remove('--active');
				});
				button.classList.add('--active');

				// Trigger onSelectCourseTime event
				this.onSelectCourseTimeCallback(productId, courseTime.courseTimeId as number);
			});
		});
	}

	/*------------------------------------*/
	/* Public functions */
	/*------------------------------------*/
	public showProduct(productId: number | '', courseTimeId: number | undefined = undefined) {
		this.select.value = productId.toString();
		this.renderOptionLabel(productId);

		const courseTimeIds: number[] = [];
		const courseTimes: ProductType[] = [];

		// Get productCategory of the product with productId
		const productCategory = this.dates.find((date) => date.product.ID === productId)?.product
			.category as Category;

		if (productCategory === 'course-child' || productCategory === 'course-adult') {
			// Get all dates that match the product ID
			const productDates = this.dates.filter((date) => date.product.ID === productId);

			// get all used values of courseTimeId
			productDates.forEach((date) => {
				if (!date.product.courseTimeId) throw new Error('No courseTimeId found');
				if (!courseTimeIds.includes(date.product.courseTimeId)) {
					courseTimeIds.push(date.product.courseTimeId);
					courseTimes.push(date.product);
				}
			});
		}

		this.renderWeekdayOptions(courseTimes, courseTimeId);
	}

	/*------------------------------------*/
	/* Event listeners */
	/*------------------------------------*/
	public onSelect(
		callback: (productId: number, productCategory: Category, courseTimeId: number) => void
	) {
		this.onSelectCallback = callback;
	}

	public onSelectCourseTime(callback: (productId: number, courseTimeId: number) => void) {
		this.onSelectCourseTimeCallback = callback;
	}
}

/*------------------------------------*/
/* Init component */
/*------------------------------------*/
const calendarElement = document.querySelector('#date-overview__calendar') as HTMLElement;
const listElement = document.querySelector('#date-overview__list') as HTMLElement;
const filterElement = document.querySelector('#date-overview__filter') as HTMLElement;
const selectorElement = document.querySelector('#date-overview__selector') as HTMLElement;

if (!calendarElement || !listElement || !filterElement || !selectorElement)
	throw new Error('No calendar, list or filter element found');

new DateOverview(calendarElement, listElement, filterElement, selectorElement);

/*------------------------------------*/
/* Type definitions */
/*------------------------------------*/

// Enums
type Category = 'course-child' | 'course-adult' | 'workshop' | 'holiday_workshop';
type FilterButtonState = 'unselected' | 'selected' | 'inactive';

// Month grid
type Filter =
	| {
			type: 'product';
			productId: number;
			courseTimeId?: number;
	  }
	| {
			type: 'category';
			year: number;
			month: number;
			category: Category;
	  }
	| null;

type MonthGrid = {
	month: number;
	year: number;
	items: MonthGridItem[];
};
type MonthGridItem = {
	date: string;
	day: number;
	month: number;
	currentMonth: boolean;
	element?: HTMLElement;
	products?: ProductType[];
};

// Month list
type MonthList = {
	month: number;
	year: number;
	items: MonthListItem[];
};
type MonthListItem = {
	date: string;
	day: number;
	month: number;
	element?: HTMLElement;
	product?: ProductType;
};

// Selector
type SelectorOption = {
	month: number;
	year: number;
	items: MonthListItem[];
};

// API response
type ProductType = {
	ID: number;
	starttime: string;
	endtime: string;
	title: string;
	category: Category;
	group: {
		value: string;
		label: string;
	};
	bookingUrl: string;
	courseTimeId?: number;
	weekday?: number;
};

type DateResponse = {
	date: string;
	product: ProductType;
	listElement?: HTMLElement;
};

type CategoryFilter = Category | null;

// type CourseTimes = {
// 	product: ProductType
// }[]

// type Weekdays = {
// 	[weekday: number]: {
// 		[courseTimeId: number]: {
// 			[productId: number]: {
// 				title: string;
// 				category: Category;
// 			};
// 		};
// 	};
// };
