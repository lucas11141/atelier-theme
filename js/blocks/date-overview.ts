// @ts-ignore
const $ = window.jQuery; // Use jquery from wordpress

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
		console.log("constructor");
		this.showMonth(new Date().getFullYear(), new Date().getMonth() + 1);
	}

	showMonth(year: number, month: number) {
		// return if month is already set
		if (this.currentYear === year && this.currentMonth === month)
			throw new Error("Month is already set");

		// Set current month
		this.currentYear = year;
		this.currentMonth = month;

		console.log("this.fetchedOnce", this.fetchedOnce);

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
			// TODO: Scroll to item in list
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
			this.calendar.setFilter("category", category);
			this.list.setFilter("category", category);
		});

		// Filtering by product id
		this.list.onFilterProduct((productId, productCategory) => {
			console.log("onFilterProduct", productId, productCategory);
			this.calendar.setFilter("product", productId);
			this.filter.setFilter(productCategory);
		});

		// this.selector.onSelect((productId) => {
		// 	this.calendar.setFilter("product", productId);
		// 	this.list.renderProductDates(productId);
		// });

		// this.calendar.onRender(() => {
		// 	this.calendar.setFilter("category", this.filter.getFilter());
		// });
	}

	async fetchDates(year: number, month: number) {
		const thisClone = this;

		await $.ajax({
			// @ts-ignore
			url: ajaxurl,
			type: "POST",
			data: {
				action: "date_overview_get_product_dates", // Dies sollte mit dem in add_action definierten Haken übereinstimmen
				year: year,
				month: month,
			},
			success: function (response) {
				console.log("date_overview_get_product_dates", response);
				thisClone.dates = response;

				const dates: DateResponse[] = response.data;

				// Fill calendar and list with data
				thisClone.calendar.fillGridData(dates);
				thisClone.list.fillListData(dates);

				// Display month
				thisClone.calendar.showMonth(year, month);
				thisClone.list.showMonth(year, month);

				thisClone.fetchedOnce = true;

				// TODO: apply filter to new dates when filter is set
			},
		});
	}
}

/*------------------------------------*/
/* 	Calendar view
	/*------------------------------------*/
class DateOverviewCalendar {
	currentYear: number = new Date().getFullYear();
	currentMonth: number = new Date().getMonth() + 1;
	monthGrids: MonthGrid[] = [];

	container: HTMLElement;
	dates: DateResponse[];

	// old
	daysContainer: HTMLElement;
	monthLabel: HTMLElement;
	nextButton: HTMLElement;
	prevButton: HTMLElement;
	dateButtons: NodeListOf<HTMLElement>;
	monthDays: NodeListOf<HTMLElement>;

	// Event listeners
	private onSelectCallback: (date: string) => void;
	private onNextCallback: () => void;
	private onPrevCallback: () => void;

	constructor(container) {
		this.container = container;

		this.daysContainer = this.container.querySelector(
			"#date-overview__calendar__days"
		) as HTMLElement;
		this.monthLabel = this.container.querySelector("#calendar__month") as HTMLElement;
		this.nextButton = this.container.querySelector("#calendar__next") as HTMLElement;
		this.prevButton = this.container.querySelector("#calendar__prev") as HTMLElement;
		this.dateButtons = this.container.querySelectorAll("#date-overview__calendar__day");
		this.monthDays = this.container.querySelectorAll("#date-overview__calendar__days");

		this.createMonthGrids(this.currentYear, this.currentMonth);
		this.initEventListeners();
	}

	// TODO: Rename. it isn't a grid
	createMonthGrids(year: number, month: number) {
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

			this.monthGrids.push(this.createMonthGrid(forYear, forMonth));
		}
	}
	createMonthGrid(year: number, month: number): MonthGrid {
		// Erster Tag des angegebenen Monats und Jahres
		const firstDayOfMonth = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);
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
				date: startDate.toISOString().split("T")[0],
				day: startDate.getDate(),
				month: startDate.getMonth() + 1,
				currentMonth: false,
			});
			startDate.setDate(startDate.getDate() + 1);
		}

		// Days from current month
		while (startDate <= lastDayOfMonth) {
			monthGrid.push({
				date: startDate.toISOString().split("T")[0],
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
				date: startDate.toISOString().split("T")[0],
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

	public fillGridData(dates: DateResponse[]) {
		// TODO: Minimoze forEach calls

		// fill newDates with dates
		dates.forEach((date) => {
			// get year and month of date
			const dateYear = new Date(date.date.date as string).getFullYear();
			const dateMonth = new Date(date.date.date as string).getMonth() + 1;

			// TODO: Fix Type date type in DateResponse

			// date.date.date as string
			const test = new Date(date.date.date as string).toISOString().split("T")[0];

			this.monthGrids.forEach((monthGrid) => {
				monthGrid.items.forEach((item) => {
					// add products to monthGrid if date and month and year match
					if (item.date === test) {
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

	renderGridItems(year: number, month: number) {
		this.currentYear = year;
		this.currentMonth = month;

		const monthGrid = this.monthGrids.find(
			(monthGrid) => monthGrid.year === year && monthGrid.month === month
		)?.items as MonthGridItem[];

		if (!monthGrid) throw new Error("No monthGrid found");

		this.daysContainer.innerHTML = "";
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

		let templateQuery = "";
		if (item.currentMonth) {
			if (item.products) {
				templateQuery = "#template--date-overview__calendar__day--filled";
			} else {
				templateQuery = "#template--date-overview__calendar__day--empty";
			}
		} else {
			templateQuery = "#template--date-overview__calendar__day--other-month";
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

		// select by template-month attribute
		const day = element.querySelector("[template-day]") as HTMLElement;
		if (!day) throw new Error("No day found");
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		day.innerHTML = new Intl.DateTimeFormat("de-DE", {
			day: "numeric",
		}).format(new Date(item.date));

		// Return of item is not in current month
		if (!item.currentMonth) return;

		// data-product-ids="<?= $productIds ?>" data-product-categories="<?= $productCategories ?>" data-date="<?= $date['date'] ?>" data-active="true"
		const productIds = item.products?.map((product) => product.ID).join(",");
		element.dataset.productIds = productIds;

		const productCategories = item.products?.map((product) => product.category).join(",");
		element.dataset.productCategories = productCategories;

		element.dataset.date = item.date;

		// Add event listener
		element.addEventListener("click", (e) => {
			const target = e.currentTarget as HTMLElement;
			const date = target.dataset.date;

			// Do nothing when button is inactive
			if (target.dataset.active === "false") return;

			// Error handling
			if (!date) throw new Error("No date found");

			// Trigger onSelect event
			if (this.onSelectCallback) this.onSelectCallback(date);
		});

		// Add product parts
		if (item.products) {
			// Add event listener
			item.element.addEventListener("click", () => {
				// Trigger onSelect event
				if (this.onSelectCallback) this.onSelectCallback(item.date);
			});

			item.products.forEach((product) => {
				const container = element.querySelector(
					"#date-overview__calendar__day__slide__color-container"
				);

				if (!container) throw new Error("No container found");

				// this.renderProductPart(item, product);
				const template = document.querySelector(
					"#template--date-overview__calendar__day__color-slice"
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

				slice.style.backgroundColor = `var(--color-${product.category})`;
			});
		}
	}

	initEventListeners() {
		this.nextButton.addEventListener("click", (e) => {
			// Trigger onNext event
			if (this.onNextCallback) {
				this.onNextCallback();
			}
		});

		this.prevButton.addEventListener("click", (e) => {
			const todayYear = new Date().getFullYear();
			const todayMonth = new Date().getMonth() + 1;

			// Only trigger event if the selected month is the current month or a future month
			if (
				this.currentYear < todayYear ||
				(this.currentYear === todayYear && this.currentMonth <= todayMonth)
			)
				return;

			// Trigger onPrev event
			if (this.onPrevCallback) this.onPrevCallback();
		});
	}

	public showMonth(year: number, month: number) {
		this.renderGridItems(year, month);
		this.setMonthName(year, month);
		this.setButtonState();
	}

	// Manage states
	setMonthName(year: number, month: number) {
		const months = [
			"Januar",
			"Februar",
			"März",
			"April",
			"Mai",
			"Juni",
			"Juli",
			"August",
			"September",
			"Oktober",
			"November",
			"Dezember",
		];
		this.monthLabel.innerHTML = `${months[month - 1]} ${year}`;
	}
	setButtonState() {
		// Activate buttons
		this.nextButton.dataset.active = "true";
		this.prevButton.dataset.active = "true";

		// Check if current month is the current month
		const isTodayMonth =
			this.currentYear === new Date().getFullYear() &&
			this.currentMonth === new Date().getMonth() + 1;

		if (isTodayMonth) {
			this.prevButton.dataset.active = "false";
		}

		const isNextYearMonth =
			this.currentYear === new Date().getFullYear() + 1 &&
			this.currentMonth === new Date().getMonth();

		if (isNextYearMonth) {
			this.nextButton.dataset.active = "false";
		}
	}

	public setFilter(type: FilterType, identifier: CategoryFilter | number) {
		this.monthGrids.forEach((monthGrid) => {
			monthGrid.items.forEach((item) => {
				const button = item.element;

				if (!button) throw new Error("No button found");

				if (type === "category") {
					// active all buttons when identifier is null
					if (identifier === null) {
						button.dataset.active = "true";
					} else {
						const productCategories = button.dataset.productCategories?.split(
							","
						) as string[];

						// check if array contains identifier
						if (productCategories && productCategories.includes(identifier as string)) {
							button.dataset.active = "true";
						} else {
							button.dataset.active = "false";
						}
					}
				} else if (type === "product") {
					const productIds = button.dataset.productIds
						?.split(",")
						.map(Number) as number[];

					// check if array contains identifier
					if (productIds && productIds.includes(identifier as number)) {
						button.dataset.active = "true";
					} else {
						button.dataset.active = "false";
					}
				} else {
					throw new Error("Invalid filter type");
				}

				const colorSlices = button.querySelectorAll(
					"#date-overview__calendar__day__color-slice"
				) as NodeListOf<HTMLElement>;

				colorSlices?.forEach((slice) => {
					if (type === "category") {
						// active all buttons when identifier is null
						if (identifier === null) {
							slice.dataset.active = "true";
							return;
						}

						if (slice.dataset.productCategory === identifier) {
							slice.dataset.active = "true";
						} else {
							slice.dataset.active = "false";
						}
					} else if (type === "product") {
						const productId = Number(slice.dataset.productId);

						// check if array contains identifier
						if (productId === identifier) {
							slice.dataset.active = "true";
						} else {
							slice.dataset.active = "false";
						}
					} else {
						throw new Error("Invalid filter type");
					}
				});
			});
		});

		this.dateButtons.forEach((button) => {
			if (type === "category") {
				// active all buttons when identifier is null
				if (identifier === null) {
					button.dataset.active = "true";
					return;
				}

				const productCategories = button.dataset.productCategories?.split(",") as string[];

				// check if array contains identifier
				if (productCategories && productCategories.includes(identifier as string)) {
					button.dataset.active = "true";
				} else {
					button.dataset.active = "false";
				}
			} else if (type === "product") {
				const productIds = button.dataset.productIds?.split(",").map(Number) as number[];

				// check if array contains identifier
				if (productIds && productIds.includes(identifier as number)) {
					button.dataset.active = "true";
				} else {
					button.dataset.active = "false";
				}
			} else {
				throw new Error("Invalid filter type");
			}
		});

		const buttonParts = this.container.querySelectorAll(
			"#date-overview__calendar__product-part"
		) as NodeListOf<HTMLElement>;
		buttonParts.forEach((part) => {
			if (type === "category") {
				// active all buttons when identifier is null
				if (identifier === null) {
					part.dataset.active = "true";
					return;
				}

				if (part.dataset.productCategory === identifier) {
					part.dataset.active = "true";
				} else {
					part.dataset.active = "false";
				}
			} else if (type === "product") {
				const productId = Number(part.dataset.productId);

				// check if array contains identifier
				if (productId === identifier) {
					part.dataset.active = "true";
				} else {
					part.dataset.active = "false";
				}
			} else {
				throw new Error("Invalid filter type");
			}
		});
	}

	// Event listeners
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
/* 	List view
	/*------------------------------------*/
class DateOverviewList {
	currentYear: number = new Date().getFullYear();
	currentMonth: number = new Date().getMonth() + 1;
	container: HTMLElement;
	dates: DateResponse[];
	monthLists: MonthList[] = [];

	// old
	dateItems: NodeListOf<HTMLElement>;
	monthDays: NodeListOf<HTMLElement>;

	// Event listeners
	private onFilterProductCallback: (productId: number, productCategory: Category) => void;

	constructor(container) {
		this.container = container;

		this.dateItems = this.container.querySelectorAll("#date-overview__list__item");
		this.monthDays = this.container.querySelectorAll("#date-overview__list__days");

		this.createMonthGrids(this.currentYear, this.currentMonth);
	}

	// TODO: Rename
	createMonthGrids(year: number, month: number) {
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
		// TODO: Minimoze forEach calls

		// fill newDates with dates
		dates.forEach((date) => {
			// get year and month of date
			const dateYear = new Date(date.date.date as string).getFullYear();
			const dateMonth = new Date(date.date.date as string).getMonth() + 1;
			const dateDay = new Date(date.date.date as string).getDate();

			// date.date.date as string
			const test = new Date(date.date.date as string).toISOString().split("T")[0];

			const monthList = this.monthLists.find(
				(monthList) => monthList.year === dateYear && monthList.month === dateMonth
			) as MonthList;

			if (!monthList.items) monthList.items = [];
			monthList.items.push({
				date: test,
				day: dateDay,
				month: dateMonth,
				product: date.product,
			});
		});

		this.monthLists.forEach((monthList) => {
			this.renderListItems(monthList.year, monthList.month);
		});
	}

	public setDates(dates: DateResponse[]) {
		this.dates = dates;

		this.renderListItems();
		this.initEventListeners();
	}

	public showMonth(year: number, month: number) {
		this.renderListItems(year, month);
	}

	renderListItems(year: number, month: number) {
		this.currentYear = year;
		this.currentMonth = month;

		const monthList = this.monthLists.find(
			(monthList) => monthList.year === year && monthList.month === month
		)?.items as MonthListItem[];

		if (!monthList) throw new Error("No monthList found");

		this.container.innerHTML = "";
		monthList.forEach((item) => {
			this.renderListItem(item);
		});
	}
	renderListItem(item: MonthListItem) {
		// Append existing element
		if (item.element) {
			this.container.appendChild(item.element);
			return;
		}

		if (!item.product) throw new Error("No product found");

		const template = document.querySelector(
			"#template--date-overview__list__item"
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
		const month = element.querySelector("[template-month]") as HTMLElement;
		if (!month) throw new Error("No month found");
		// add formatted month from this.currentMonth using Intl.DateTimeFormat
		month.innerHTML = new Intl.DateTimeFormat("de-DE", {
			month: "short",
		}).format(new Date(item.date));

		const day = element.querySelector("[template-day]") as HTMLElement;
		if (!day) throw new Error("No day found");
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		day.innerHTML = new Intl.DateTimeFormat("de-DE", {
			day: "numeric",
		}).format(new Date(item.date));

		const title = element.querySelector("[template-title]") as HTMLElement;
		if (!title) throw new Error("No title found");
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		title.innerHTML = item.product.title;

		const category = element.querySelector("[template-category]") as HTMLElement;
		if (!category) throw new Error("No category found");
		// add formatted day from this.currentMonth using Intl.DateTimeFormat
		category.innerHTML = item.product.category;

		// TODO: Add booking URL
		// const bookingButton = item.querySelector(
		// 	"[template-booking-button]"
		// ) as HTMLLinkElement;
		// if (!bookingButton) throw new Error("No booking button found");
		// // add formatted day from this.currentMonth using Intl.DateTimeFormat
		// bookingButton.href = date.product.;

		// Add event listener
		element.addEventListener("click", () => {
			this.fetchProductDates(item.product.ID);
			this.setFilter("product", item.product.ID);

			// Trigger onFilterProduct event
			this.onFilterProductCallback(item.product.ID, item.product.category);
		});
	}

	fetchProductDates(productId: number) {
		// TODO: Implement
	}

	initEventListeners() {
		this.dates.forEach((date) => {
			const listElement = date.listElement;

			if (!listElement) throw new Error("No list item found");

			const filterButton = listElement.querySelector(".filter-button") as HTMLElement;

			filterButton.addEventListener("click", () => {
				this.setFilter("product", date.product.ID);

				// Trigger onFilterProduct event
				if (this.onFilterProductCallback)
					this.onFilterProductCallback(date.product.ID, date.product.category);
			});
		});
	}

	public setFilter(type: FilterType, identifier: CategoryFilter | number) {
		this.monthLists.forEach((monthList) => {
			monthList.items.forEach((item) => {
				const element = item.element;

				if (!element) return;

				if (type === "category") {
					if (identifier === null) {
						element.dataset.active = "true";
						return;
					}

					// check if array contains identifier
					if (item.product?.category === identifier) {
						element.dataset.active = "true";
					} else {
						element.dataset.active = "false";
					}
				} else if (type === "product") {
					// check if array contains identifier
					if (item.product?.ID === identifier) {
						element.dataset.active = "true";
					} else {
						element.dataset.active = "false";
					}
				} else {
					throw new Error("Invalid filter type");
				}
			});
		});
	}

	public scrollToItem(date: string) {
		// TODO: Add short animation to catch attention

		const item = this.container.querySelector(
			`#date-overview__list__item[data-date="${date}"]`
		) as HTMLElement;

		if (!item) throw new Error("No item found");

		item.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	}

	public onFilterProduct(callback: (productId: number, productCategory: Category) => void) {
		this.onFilterProductCallback = callback;
	}
}

/*------------------------------------*/
/* 	Filter component
	/*------------------------------------*/
class DateOverviewFilter {
	container: HTMLElement;
	category: CategoryFilter;
	buttons: NodeListOf<HTMLElement>;
	private onFilterCategoryCallback: (category: CategoryFilter) => void;

	constructor(container) {
		this.container = container;
		this.buttons = this.container.querySelectorAll("#date-overview__filter__button");

		// Error handling
		if (!this.buttons) throw new Error("No buttons found");

		this.initEventListeners();
	}

	initEventListeners() {
		this.buttons.forEach((button) => {
			button.addEventListener("click", () => {
				// Set category
				const category = button.dataset.category as Category;
				if (category !== this.category) {
					this.setFilterCategory(category);
				} else {
					this.setFilterCategory(null);
				}

				// Trigger onFilterCategory event
				if (this.onFilterCategoryCallback) this.onFilterCategoryCallback(this.category);
			});
		});
	}

	setButtonState(element: HTMLElement, state: FilterButtonState) {
		if (state == "unselected") {
			element.dataset.selected = "false";
			element.dataset.active = "true";
		} else if (state == "selected") {
			element.dataset.selected = "true";
			element.dataset.active = "true";
		} else if (state == "inactive") {
			element.dataset.selected = "false";
			element.dataset.active = "false";
		} else {
			throw new Error("Invalid button state");
		}
	}

	setFilterCategory(category: CategoryFilter) {
		this.setFilter(category);

		// Trigger onFilterCategory event when used inside the class
		if (this.onFilterCategoryCallback) this.onFilterCategoryCallback(this.category);
	}

	public setFilter(category: CategoryFilter) {
		// Set button states
		this.buttons.forEach((button) => {
			if (category === null) {
				this.setButtonState(button, "unselected");
			} else {
				if (button.dataset.category === category) {
					this.setButtonState(button, "selected");
				} else {
					this.setButtonState(button, "inactive");
				}
			}
		});

		// Set category
		this.category = category;
	}

	public getFilter() {
		return this.category;
	}

	public onFilterCategory(callback: (category: CategoryFilter) => void) {
		this.onFilterCategoryCallback = callback;
	}
}

/*------------------------------------*/
/* 	Product selector
	/*------------------------------------*/
class DateOverviewSelector {
	// TODO: Implement

	container: HTMLElement;
	select: HTMLSelectElement;
	selected: number;
	private onSelectCallback: (productId: number) => void;

	constructor(container) {
		this.container = container;
		this.select = this.container.querySelector("select") as HTMLSelectElement;

		if (!this.select) throw new Error("No select element found");

		this.initEventListeners();
	}

	initEventListeners() {
		this.select.addEventListener("change", (e) => {
			const target = e.currentTarget as HTMLSelectElement;
			const productId = Number(target.value);

			// Trigger onSelect event
			if (this.onSelectCallback) this.onSelectCallback(productId);

			this.selected = productId;
		});
	}

	public onSelect(callback: (productId: number) => void) {
		this.onSelectCallback = callback;
	}
}

/*------------------------------------*/
/* 	Init component
	/*------------------------------------*/
const calendarElement = document.querySelector("#date-overview__calendar") as HTMLElement;
const listElement = document.querySelector("#date-overview__list") as HTMLElement;
const filterElement = document.querySelector("#date-overview__filter") as HTMLElement;
const selectorElement = document.querySelector("#date-overview__selector") as HTMLElement;

if (!calendarElement || !listElement || !filterElement || !selectorElement)
	throw new Error("No calendar, list or filter element found");

new DateOverview(calendarElement, listElement, filterElement, selectorElement);

/*------------------------------------*/
/* 	 Type definitions
/*------------------------------------*/

// Enums
type Category = "course-child" | "course-adult" | "workshop" | "holiday_workshop";
type FilterButtonState = "unselected" | "selected" | "inactive";
type FilterType = "category" | "product";

// Month grid
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

// API response
type DateType = {
	date: string;
	timezone_type: number;
	timezone: string;
};
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
};
type DateResponse = {
	date: DateType | string;
	product: ProductType;
	listElement?: HTMLElement;
};

type CategoryFilter = Category | null;
