export default function dateOverview() {
	class DateOverview {
		calendar: DateOverviewCalendar;
		list: DateOverviewList;
		filter: DateOverviewFilter;

		constructor(
			calendarElement: HTMLElement,
			listElement: HTMLElement,
			filterElement: HTMLElement
		) {
			this.calendar = new DateOverviewCalendar(calendarElement);
			this.list = new DateOverviewList(listElement);
			this.filter = new DateOverviewFilter(filterElement);

			this.initEventListeners();
		}

		initEventListeners() {
			this.calendar.onSelect(() => {
				console.log("onSelect");
				// TODO: Scroll to item in list
			});

			this.filter.onFilterCategory((category) => {
				this.calendar.setFilter("category", category);
				this.list.setFilter("category", category);
			});

			this.list.onFilterProduct((productId, productCategory) => {
				this.calendar.setFilter("product", productId);
				this.filter.setFilter(productCategory);
			});
		}
	}

	/*------------------------------------*/
	/* 	Calendar view
	/*------------------------------------*/
	class DateOverviewCalendar {
		container: HTMLElement;
		monthLabel: HTMLElement;
		nextButton: HTMLElement;
		prevButton: HTMLElement;
		dateButtons: NodeListOf<HTMLElement>;

		// Event listeners
		private onSelectCallback: () => void;

		constructor(container) {
			this.container = container;
			this.monthLabel = this.container.querySelector(
				".calendar__month"
			) as HTMLElement;
			this.nextButton = this.container.querySelector(
				".calendar__next"
			) as HTMLElement;
			this.prevButton = this.container.querySelector(
				".calendar__prev"
			) as HTMLElement;
			this.dateButtons =
				this.container.querySelectorAll(".calendar__day");

			this.initEventListeners();
		}

		initEventListeners() {
			this.dateButtons.forEach((day) => {
				day.addEventListener("click", (e) => {
					// TODO: Only trigger when day is active
					if (this.onSelectCallback) this.onSelectCallback();
				});
			});
		}

		public setFilter(type: FilterType, identifier: Category | number) {
			// TODO: Make active buttons monochrome

			this.dateButtons.forEach((button) => {
				if (type === "category") {
					if (identifier === null) {
						button.dataset.active = "true";
						return;
					}
					const productCategories =
						button.dataset.productCategories?.split(
							","
						) as string[];

					// check if array contains identifier
					if (productCategories.includes(identifier as string)) {
						button.dataset.active = "true";
					} else {
						button.dataset.active = "false";
					}
				} else if (type === "product") {
					const productIds = button.dataset.productIds
						?.split(",")
						.map(Number) as number[];

					// check if array contains identifier
					if (productIds.includes(identifier as number)) {
						button.dataset.active = "true";
					} else {
						button.dataset.active = "false";
					}
				} else {
					throw new Error("Invalid filter type");
				}
			});
		}

		public onSelect(callback: () => void) {
			this.onSelectCallback = callback;
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
				".date-overview__list__item"
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
			console.log("setFilter", type, identifier);
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
					const productId = Number(item.dataset.productId);
					console.log(
						item,
						productId,
						identifier,
						productId === identifier
					);

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
	class DateOverviewProductSelector {
		container: HTMLElement;
		products: NodeListOf<HTMLElement>;

		constructor(container) {
			this.container = container;
			this.products = this.container.querySelectorAll(
				".product-selector__product"
			);
		}
	}

	const calendarElement = document.querySelector(
		".date-overview__calendar"
	) as HTMLElement;
	const listElement = document.querySelector(
		".date-overview__list"
	) as HTMLElement;
	const filterElement = document.querySelector(
		"#date-overview__filter"
	) as HTMLElement;

	if (!calendarElement || !listElement || !filterElement)
		throw new Error("No calendar, list or filter element found");

	const overview = new DateOverview(
		calendarElement,
		listElement,
		filterElement
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
