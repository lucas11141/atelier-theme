import $ from "jquery";

export default function dateOverview() {
	class DateOverview {
		dates: EventType[];
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
			this.currentYear = new Date().getFullYear();
			this.currentMonth = new Date().getMonth() + 1;

			this.calendar = new DateOverviewCalendar(calendarElement);
			this.list = new DateOverviewList(listElement);

			this.createParts(calendarElement, listElement, filterElement, selectorElement);
		}

		async createParts(
			calendarElement: HTMLElement,
			listElement: HTMLElement,
			filterElement: HTMLElement,
			selectorElement: HTMLElement
		) {
			this.fetchDates();
		}

		async fetchDates() {
			console.log("fetchDates");
			const thisClone = this;

			await $.ajax({
				// @ts-ignore
				url: ajaxurl,
				type: "POST",
				data: {
					action: "date_overview_get_product_dates", // Dies sollte mit dem in add_action definierten Haken übereinstimmen
					year: this.currentYear,
					month: this.currentMonth,
				},
				success: function (response) {
					console.log("date_overview_get_product_dates", response);
					thisClone.dates = response;

					const dates: EventType[] = response.data;

					thisClone.calendar.setDates(dates);
					thisClone.list.setDates(dates);

					// thisClone.filter = new DateOverviewFilter(filterElement);
					// thisClone.selector = new DateOverviewSelector(selectorElement);
					thisClone.initEventListeners();
				},
			});
		}

		initEventListeners() {
			this.calendar.onSelect((date) => {
				this.list.scrollToItem(date);
				// TODO: Scroll to item in list
			});

			this.calendar.onNext(() => {
				console.log("onNext");

				// fetch data via ajax
				this.currentMonth++;

				// Reset month and increase year
				if (this.currentMonth > 12) {
					this.currentMonth = 1;
					this.currentYear++;
				}

				this.fetchDates();

				// this.calendar.renderDates(this.currentYear, this.currentMonth);
				// this.list.renderDates(this.currentYear, this.currentMonth);
			});

			this.calendar.onPrev(() => {
				this.currentMonth--;

				// Reset month and decrease year
				if (this.currentMonth < 1) {
					this.currentMonth = 12;
					this.currentYear--;
				}

				this.calendar.renderDates(this.currentYear, this.currentMonth);
				this.list.renderDates(this.currentYear, this.currentMonth);
			});

			// this.calendar.onRender(() => {
			// 	this.calendar.setFilter("category", this.filter.getFilter());
			// });

			// this.filter.onFilterCategory((category) => {
			// 	this.calendar.setFilter("category", category);
			// 	this.list.setFilter("category", category);
			// });

			// // Filtering by product id
			// this.list.onFilterProduct((productId, productCategory) => {
			// 	this.calendar.setFilter("product", productId);
			// 	this.filter.setFilter(productCategory);
			// });
			// this.selector.onSelect((productId) => {
			// 	this.calendar.setFilter("product", productId);
			// 	this.list.renderProductDates(productId);
			// });
		}
	}

	/*------------------------------------*/
	/* 	Calendar view
	/*------------------------------------*/
	class DateOverviewCalendar {
		// TODO: Add new setDates and setDay function in calendar to toggle between filled, empty and other-month

		container: HTMLElement;
		dates: EventType[];
		currentYear: number;
		currentMonth: number;
		// gridObject: MonthGridItem[];
		monthGrids: MonthGrid[];

		// old
		daysContainer: HTMLElement;
		monthLabel: HTMLElement;
		nextButton: HTMLElement;
		prevButton: HTMLElement;
		dateButtons: NodeListOf<HTMLElement>;
		renderedMonths: {
			year: number;
			month: number;
		}[] = [
			{
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
			},
		];
		monthDays: NodeListOf<HTMLElement>;

		// Event listeners
		private onSelectCallback: (date: string) => void;
		private onNextCallback: () => void;
		private onPrevCallback: () => void;
		private onRenderCallback: () => void;

		constructor(container) {
			this.container = container;
			this.currentYear = new Date().getFullYear();
			this.currentMonth = new Date().getMonth() + 1;
			this.monthGrids = [];

			this.daysContainer = this.container.querySelector(
				"#date-overview__calendar__days"
			) as HTMLElement;
			this.monthLabel = this.container.querySelector("#calendar__month") as HTMLElement;
			this.nextButton = this.container.querySelector("#calendar__next") as HTMLElement;
			this.prevButton = this.container.querySelector("#calendar__prev") as HTMLElement;
			this.dateButtons = this.container.querySelectorAll("#date-overview__calendar__day");
			this.monthDays = this.container.querySelectorAll("#date-overview__calendar__days");

			this.generateGridObject(this.currentYear, this.currentMonth);
		}

		public setDates(dates: EventType[]) {
			this.dates = dates;

			this.renderGridItems();
			this.initEventListeners();
		}

		generateGridObject(year, month) {
			// Erster Tag des angegebenen Monats und Jahres
			const firstDayOfMonth = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);

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

			// Add new monthGrid to this.monthGrids
			this.monthGrids.push({
				year,
				month,
				items: monthGrid,
			});

			console.log("this.monthGrids", this.monthGrids);

			// /*------------------------------------*/
			// /* 	Section Name
			// /*------------------------------------*/
			// // Map $dates to $calendarGrid
			// console.log("this.dates", this.dates);

			// // this.dates.forEach((date) => {
			// // 	this.gridObject.forEach((day) => {
			// // 		if (date.date.date === day.date) {
			// // 			if (!day.products) day.products = [];
			// // 			day.products.push(date.product);
			// // 		}
			// // 	});
			// // });

			// console.log("this.gridObject", this.gridObject);

			// // // Sort products by starttime
			// // // Go through $calendarGrid and when products are given, sort the items by starttime
			// // calendarGrid.forEach((day, key) => {
			// // 	if (day.products && day.products.length > 1) {
			// // 		day.products.sort((a, b) => {
			// // 			const timeA = new Date(a.starttime).getTime();
			// // 			const timeB = new Date(b.starttime).getTime();
			// // 			return timeB - timeA;
			// // 		});
			// // 	}
			// // });
		}

		renderGridItems() {
			const monthGrid = this.monthGrids.find(
				(monthGrid) =>
					monthGrid.year === this.currentYear && monthGrid.month === this.currentMonth
			)?.items as MonthGridItem[];

			if (!monthGrid) throw new Error("No monthGrid found");

			this.dates.forEach((date) => {
				if (typeof date.date !== "string") {
					date.date = new Date(date.date.date).toISOString().split("T")[0];
				}

				monthGrid.forEach((item) => {
					if (date.date === item.date) {
						if (!item.products) item.products = [];
						item.products.push(date.product);
					}
				});
			});

			console.log("mapped monthGrid", monthGrid);

			monthGrid.forEach((item) => {
				this.renderGridItem(item);
			});
		}

		renderGridItem(item: MonthGridItem) {
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

			// Add product parts
			if (item.products) {
				// Add event listener
				item.element.addEventListener("click", () => {
					console.log("click", item.date);
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

					slice.style.backgroundColor = `var(--color-${product.category})`;
				});
			}
		}

		initEventListeners() {
			// data-year="<?= $target_year ?>" data-month="<?= $target_month ?>
			this.dateButtons.forEach((day) => {
				day.addEventListener("click", (e) => {
					const target = e.currentTarget as HTMLElement;
					const date = target.dataset.date;

					// Do nothing when button is inactive
					if (target.dataset.active === "false") return;

					// Error handling
					if (!date) throw new Error("No date found");

					// Trigger onSelect event
					if (this.onSelectCallback) this.onSelectCallback(date);
				});
			});

			this.nextButton.addEventListener("click", (e) => {
				// BUG: Event is not triggering
				// Trigger onNext event
				if (this.onNextCallback) {
					this.onNextCallback();
				}
			});

			this.prevButton.addEventListener("click", (e) => {
				// Trigger onPrev event
				if (this.onPrevCallback) this.onPrevCallback();
			});
		}

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

		public renderDates(year: number, month: number) {
			const thisClone = this;

			this.setMonthName(year, month);

			// Skip ajax if month is already rendered
			if (
				this.renderedMonths.find(
					(renderedMonth) => renderedMonth.year === year && renderedMonth.month === month
				)
			) {
				this.monthDays.forEach((monthItem) => {
					if (
						monthItem.dataset.year === `${year}` &&
						monthItem.dataset.month === `${month}`
					) {
						monthItem.style.display = "grid";
					} else {
						monthItem.style.display = "none";
					}
				});
				return;
			}

			$.ajax({
				// @ts-ignore
				url: ajaxurl,
				type: "POST",
				data: {
					action: "render_date_overview_calender_items", // Dies sollte mit dem in add_action definierten Haken übereinstimmen
					year,
					month,
				},
				success: function (response) {
					thisClone.monthDays.forEach((month) => {
						month.style.display = "none";
					});

					// Den geladenen Inhalt in die Seite einfügen
					thisClone.container.insertAdjacentHTML("beforeend", response);

					// push new month to this.monthDays#
					thisClone.monthDays = thisClone.container.querySelectorAll(
						"#date-overview__calendar__days"
					);

					thisClone.dateButtons = thisClone.container.querySelectorAll(
						"#date-overview__calendar__day"
					);

					thisClone.renderedMonths.push({
						year,
						month,
					});

					// Trigger onRender event
					if (thisClone.onRenderCallback) thisClone.onRenderCallback();
				},
			});
		}

		public setFilter(type: FilterType, identifier: Category | number) {
			this.dateButtons.forEach((button) => {
				if (type === "category") {
					// active all buttons when identifier is null
					if (identifier === null) {
						button.dataset.active = "true";
						return;
					}

					const productCategories = button.dataset.productCategories?.split(
						","
					) as string[];

					// check if array contains identifier
					if (productCategories && productCategories.includes(identifier as string)) {
						button.dataset.active = "true";
					} else {
						button.dataset.active = "false";
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

		public onSelect(callback: (date: string) => void) {
			this.onSelectCallback = callback;
		}

		public onNext(callback: () => void) {
			this.onNextCallback = callback;
		}

		public onPrev(callback: () => void) {
			this.onPrevCallback = callback;
		}

		public onRender(callback: () => void) {
			this.onRenderCallback = callback;
		}
	}

	/*------------------------------------*/
	/* 	List view
	/*------------------------------------*/
	class DateOverviewList {
		container: HTMLElement;
		dates: EventType[];

		// old
		dateItems: NodeListOf<HTMLElement>;
		renderedMonths: {
			year: number;
			month: number;
		}[] = [
			{
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
			},
		];
		monthDays: NodeListOf<HTMLElement>;

		// Event listeners
		private onFilterProductCallback: (productId: number, productCategory: Category) => void;

		constructor(container) {
			this.container = container;

			this.dateItems = this.container.querySelectorAll("#date-overview__list__item");
			this.monthDays = this.container.querySelectorAll("#date-overview__list__days");
		}

		public setDates(dates: EventType[]) {
			this.dates = dates;

			this.renderListItems();
			this.initEventListeners();
		}

		renderListItems() {
			this.dates.forEach((date) => {
				this.renderListItem(date);
				console.log(this.container, date);
			});
		}

		renderListItem(date: EventType) {
			const template = document.querySelector(
				"#template--date-overview__list__item"
			) as HTMLTemplateElement;

			if (!template)
				throw new Error('No template "#template--date-overview__list__item" found');

			// Clone template
			const clone = template.content.cloneNode(true) as HTMLElement;

			// Add item to list
			this.container.appendChild(clone);

			// select currently added item
			const item = this.container.lastElementChild as HTMLElement;
			date.listElement = item;

			item.style.color = `var(--color-${date.product.category})`;

			// select by template-month attribute
			const month = item.querySelector("[template-month]") as HTMLElement;
			if (!month) throw new Error("No month found");
			// add formatted month from this.currentMonth using Intl.DateTimeFormat
			month.innerHTML = new Intl.DateTimeFormat("de-DE", {
				month: "short",
			}).format(new Date(date.date as string));

			const day = item.querySelector("[template-day]") as HTMLElement;
			if (!day) throw new Error("No day found");
			// add formatted day from this.currentMonth using Intl.DateTimeFormat
			day.innerHTML = new Intl.DateTimeFormat("de-DE", {
				day: "numeric",
			}).format(new Date(date.date as string));

			const title = item.querySelector("[template-title]") as HTMLElement;
			if (!title) throw new Error("No title found");
			// add formatted day from this.currentMonth using Intl.DateTimeFormat
			title.innerHTML = date.product.title;

			const category = item.querySelector("[template-category]") as HTMLElement;
			if (!category) throw new Error("No category found");
			// add formatted day from this.currentMonth using Intl.DateTimeFormat
			category.innerHTML = date.product.category;

			// const bookingButton = item.querySelector(
			// 	"[template-booking-button]"
			// ) as HTMLLinkElement;
			// if (!bookingButton) throw new Error("No booking button found");
			// // add formatted day from this.currentMonth using Intl.DateTimeFormat
			// bookingButton.href = date.product.;
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

		public setFilter(type: FilterType, identifier: Category | number) {
			console.trace("setFilter", type, identifier);
			this.dateItems.forEach((item) => {
				if (type === "category") {
					if (identifier === null) {
						item.dataset.active = "true";
						return;
					}
					const productCategory = item.dataset.productCategory;

					// check if array contains identifier
					if (productCategory === identifier) {
						item.dataset.active = "true";
					} else {
						item.dataset.active = "false";
					}
				} else if (type === "product") {
					// TODO: Load all dates of product with ajax

					const productId = Number(item.dataset.productId);

					// check if array contains identifier
					if (productId === identifier) {
						item.dataset.active = "true";
					} else {
						item.dataset.active = "false";
					}
				} else {
					throw new Error("Invalid filter type");
				}
			});
		}

		public renderDates(year: number, month: number) {
			const thisClone = this;

			// Skip ajax if month is already rendered
			if (
				this.renderedMonths.find(
					(renderedMonth) => renderedMonth.year === year && renderedMonth.month === month
				)
			) {
				this.monthDays.forEach((monthItem) => {
					if (
						monthItem.dataset.year === `${year}` &&
						monthItem.dataset.month === `${month}`
					) {
						monthItem.style.display = "flex";
					} else {
						monthItem.style.display = "none";
					}
				});
				return;
			}

			$.ajax({
				// @ts-ignore
				url: ajaxurl,
				type: "POST",
				data: {
					action: "render_date_overview_calender_items_2", // Dies sollte mit dem in add_action definierten Haken übereinstimmen
					year,
					month,
				},
				success: function (response) {
					console.log(response);

					thisClone.monthDays.forEach((month) => {
						month.style.display = "none";
					});

					// Den geladenen Inhalt in die Seite einfügen
					thisClone.container.insertAdjacentHTML("beforeend", response);

					// push new month to this.monthDays#
					thisClone.monthDays = thisClone.container.querySelectorAll(
						"#date-overview__list__days"
					);

					thisClone.renderedMonths.push({
						year,
						month,
					});

					// // Trigger onRender event
					// if (thisClone.onRenderCallback)
					// 	thisClone.onRenderCallback();
				},
			});
		}

		public scrollToItem(date: string) {
			console.log("scrollToItem", date);
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

		public renderProductDates(productId: number) {
			// AJAX-Anfrage, um die Komponente zu laden
			$.ajax({
				// @ts-ignore
				url: ajaxurl,
				type: "POST",
				data: {
					action: "get_date_overview_product_dates", // Dies sollte mit dem in add_action definierten Haken übereinstimmen
					productId,
				},
				success: function (response) {
					// Den geladenen Inhalt in die Seite einfügen
					// $('#my-component-container').html(response);

					console.log("get_date_overview_product_dates", response);
				},
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
		category: Category;
		buttons: NodeListOf<HTMLElement>;
		private onFilterCategoryCallback: (category: Category) => void;

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

		setFilterCategory(category: Category) {
			this.setFilter(category);

			// Trigger onFilterCategory event when used inside the class
			if (this.onFilterCategoryCallback) this.onFilterCategoryCallback(this.category);
		}

		public setFilter(category: Category) {
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

		public onFilterCategory(callback: (category: Category) => void) {
			this.onFilterCategoryCallback = callback;
		}
	}

	/*------------------------------------*/
	/* 	Product selector
	/*------------------------------------*/
	// TODO: Implement
	class DateOverviewSelector {
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

	const calendarElement = document.querySelector("#date-overview__calendar") as HTMLElement;
	const listElement = document.querySelector("#date-overview__list") as HTMLElement;
	const filterElement = document.querySelector("#date-overview__filter") as HTMLElement;
	const selectorElement = document.querySelector("#date-overview__selector") as HTMLElement;

	if (!calendarElement || !listElement || !filterElement || !selectorElement)
		throw new Error("No calendar, list or filter element found");

	const overview = new DateOverview(calendarElement, listElement, filterElement, selectorElement);
}

type Date = {
	productId: number;
	productCategory: Category;
	productTitle: string;
	bookingUrl: string;
	date: string;
	listItem?: HTMLElement;
	calendarItem?: HTMLElement;
};

type Category = "course-child" | "course-adult" | "workshop" | "holiday_workshop";

type FilterButtonState = "unselected" | "selected" | "inactive";

type FilterType = "category" | "product";

type DateOverviewType = {
	[key: string]: any;
};

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

/*------------------------------------*/
/* 	
/*------------------------------------*/
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

type EventType = {
	date: DateType | string;
	product: ProductType;
	listElement?: HTMLElement;
};

const events: EventType[] = [
	// Hier füge die JSON-Daten aus deiner Anfrage ein
];
