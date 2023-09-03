import $ from "jquery";

export default function dateOverview() {
	class DateOverview {
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
			this.currentYear = new Date().getFullYear();
			this.currentMonth = new Date().getMonth() + 1;

			this.initEventListeners();
		}

		initEventListeners() {
			this.calendar.onSelect((date) => {
				this.list.scrollToItem(date);
				// TODO: Scroll to item in list
			});

			this.calendar.onNext(() => {
				this.currentMonth++;

				// Reset month and increase year
				if (this.currentMonth > 12) {
					this.currentMonth = 1;
					this.currentYear++;
				}

				this.calendar.renderDates(this.currentYear, this.currentMonth);
			});

			this.calendar.onPrev(() => {
				this.currentMonth--;

				// Reset month and decrease year
				if (this.currentMonth < 1) {
					this.currentMonth = 12;
					this.currentYear--;
				}

				this.calendar.renderDates(this.currentYear, this.currentMonth);
			});

			// this.calendar.onRender(() => {
			// 	this.calendar.setFilter("category", this.filter.getFilter());
			// });

			this.filter.onFilterCategory((category) => {
				this.calendar.setFilter("category", category);
				this.list.setFilter("category", category);
			});

			// Filtering by product id
			this.list.onFilterProduct((productId, productCategory) => {
				this.calendar.setFilter("product", productId);
				this.filter.setFilter(productCategory);
			});
			this.selector.onSelect((productId) => {
				this.calendar.setFilter("product", productId);
				this.list.renderProductDates(productId);
			});
		}
	}

	/*------------------------------------*/
	/* 	Calendar view
	/*------------------------------------*/
	class DateOverviewCalendar {
		container: HTMLElement;
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
			this.daysContainer = this.container.querySelector(
				"#date-overview__calendar__days"
			) as HTMLElement;
			this.monthLabel = this.container.querySelector(
				"#calendar__month"
			) as HTMLElement;
			this.nextButton = this.container.querySelector(
				"#calendar__next"
			) as HTMLElement;
			this.prevButton = this.container.querySelector(
				"#calendar__prev"
			) as HTMLElement;
			this.dateButtons = this.container.querySelectorAll(
				"#date-overview__calendar__day"
			);
			this.monthDays = this.container.querySelectorAll(
				"#date-overview__calendar__days"
			);

			this.initEventListeners();
		}

		initEventListeners() {
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
				// Trigger onNext event
				if (this.onNextCallback) this.onNextCallback();
			});

			this.prevButton.addEventListener("click", (e) => {
				// Trigger onPrev event
				if (this.onPrevCallback) this.onPrevCallback();
			});
		}

		public renderDates(year: number, month: number) {
			const thisClone = this;

			this.setMonthName(year, month);

			// Skip ajax if month is already rendered
			if (
				this.renderedMonths.find(
					(renderedMonth) =>
						renderedMonth.year === year &&
						renderedMonth.month === month
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
					thisClone.container.insertAdjacentHTML(
						"beforeend",
						response
					);

					// push new month to this.monthDays#
					thisClone.monthDays = thisClone.container.querySelectorAll(
						"#date-overview__calendar__days"
					);

					thisClone.dateButtons =
						thisClone.container.querySelectorAll(
							"#date-overview__calendar__day"
						);

					thisClone.renderedMonths.push({
						year,
						month,
					});

					// Trigger onRender event
					if (thisClone.onRenderCallback)
						thisClone.onRenderCallback();
				},
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

		public setFilter(type: FilterType, identifier: Category | number) {
			this.dateButtons.forEach((button) => {
				if (type === "category") {
					// active all buttons when identifier is null
					if (identifier === null) {
						button.dataset.active = "true";
						return;
					}

					const productCategories =
						button.dataset.productCategories?.split(
							","
						) as string[];

					// check if array contains identifier
					if (
						productCategories &&
						productCategories.includes(identifier as string)
					) {
						button.dataset.active = "true";
					} else {
						button.dataset.active = "false";
					}
				} else if (type === "product") {
					const productIds = button.dataset.productIds
						?.split(",")
						.map(Number) as number[];

					// check if array contains identifier
					if (
						productIds &&
						productIds.includes(identifier as number)
					) {
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
		dateItems: NodeListOf<HTMLElement>;

		// Event listeners
		private onFilterProductCallback: (
			productId: number,
			productCategory: Category
		) => void;

		constructor(container) {
			this.container = container;
			this.dateItems = this.container.querySelectorAll(
				"#date-overview__list__item"
			);

			this.initEventListeners();
		}

		initEventListeners() {
			this.dateItems.forEach((date) => {
				const filterButton = date.querySelector(
					".filter-button"
				) as HTMLElement;

				filterButton.addEventListener("click", (e) => {
					this.setFilter("product", Number(date.dataset.productId));

					// Trigger onFilterProduct event
					if (this.onFilterProductCallback)
						this.onFilterProductCallback(
							Number(date.dataset.productId),
							date.dataset.productCategory as Category
						);
				});
			});
		}

		public setFilter(type: FilterType, identifier: Category | number) {
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

		public onFilterProduct(
			callback: (productId: number, productCategory: Category) => void
		) {
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
			this.buttons = this.container.querySelectorAll(
				"#date-overview__filter__button"
			);

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
					if (this.onFilterCategoryCallback)
						this.onFilterCategoryCallback(this.category);
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
			if (this.onFilterCategoryCallback)
				this.onFilterCategoryCallback(this.category);
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
			this.select = this.container.querySelector(
				"select"
			) as HTMLSelectElement;

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

	const calendarElement = document.querySelector(
		"#date-overview__calendar"
	) as HTMLElement;
	const listElement = document.querySelector(
		"#date-overview__list"
	) as HTMLElement;
	const filterElement = document.querySelector(
		"#date-overview__filter"
	) as HTMLElement;
	const selectorElement = document.querySelector(
		"#date-overview__selector"
	) as HTMLElement;

	if (!calendarElement || !listElement || !filterElement || !selectorElement)
		throw new Error("No calendar, list or filter element found");

	const overview = new DateOverview(
		calendarElement,
		listElement,
		filterElement,
		selectorElement
	);
}

type Category =
	| "course-child"
	| "course-adult"
	| "workshop"
	| "holiday_workshop"
	| null;

type FilterButtonState = "unselected" | "selected" | "inactive";

type FilterType = "category" | "product";
