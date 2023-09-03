"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateOverview;
function dateOverview() {
  class DateOverview {
    calendar;
    list;
    filter;
    constructor(calendarElement, listElement, filterElement) {
      this.calendar = new DateOverviewCalendar(calendarElement);
      this.list = new DateOverviewList(listElement);
      this.filter = new DateOverviewFilter(filterElement);
      this.initEventListeners();
    }
    initEventListeners() {
      this.calendar.onSelect(() => {
        console.log("onSelect");
      });
      this.filter.onFilterCategory(category => {
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
    container;
    monthLabel;
    nextButton;
    prevButton;
    dateButtons;

    // Event listeners
    onSelectCallback;
    constructor(container) {
      this.container = container;
      this.monthLabel = this.container.querySelector(".calendar__month");
      this.nextButton = this.container.querySelector(".calendar__next");
      this.prevButton = this.container.querySelector(".calendar__prev");
      this.dateButtons = this.container.querySelectorAll(".calendar__day");
      this.initEventListeners();
    }
    initEventListeners() {
      this.dateButtons.forEach(day => {
        day.addEventListener("click", e => {
          if (this.onSelectCallback) this.onSelectCallback();
        });
      });
    }
    setFilter(type, identifier) {
      // TODO: Make active buttons monochrome

      this.dateButtons.forEach(button => {
        if (type === "category") {
          if (identifier === null) {
            button.dataset.active = "true";
            return;
          }
          const productCategories = button.dataset.productCategories?.split(",");

          // check if array contains identifier
          if (productCategories.includes(identifier)) {
            button.dataset.active = "true";
          } else {
            button.dataset.active = "false";
          }
        } else if (type === "product") {
          const productIds = button.dataset.productIds?.split(",").map(Number);

          // check if array contains identifier
          if (productIds.includes(identifier)) {
            button.dataset.active = "true";
          } else {
            button.dataset.active = "false";
          }
        } else {
          throw new Error("Invalid filter type");
        }
      });
    }
    onSelect(callback) {
      this.onSelectCallback = callback;
    }
  }

  /*------------------------------------*/
  /* 	List view
  /*------------------------------------*/
  class DateOverviewList {
    container;
    dateItems;

    // Event listeners
    onFilterProductCallback;
    constructor(container) {
      this.container = container;
      this.dateItems = this.container.querySelectorAll(".date-overview__list__item");
      this.initEventListeners();
    }
    initEventListeners() {
      this.dateItems.forEach(date => {
        const filterButton = date.querySelector(".filter-button");
        filterButton.addEventListener("click", e => {
          this.setFilter("product", Number(date.dataset.productId));

          // Trigger onFilterProduct event
          if (this.onFilterProductCallback) this.onFilterProductCallback(Number(date.dataset.productId), date.dataset.productCategory);
        });
      });
    }
    setFilter(type, identifier) {
      console.log("setFilter", type, identifier);
      this.dateItems.forEach(item => {
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
          console.log(item, productId, identifier, productId === identifier);

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
    onFilterProduct(callback) {
      this.onFilterProductCallback = callback;
    }
  }

  /*------------------------------------*/
  /* 	Filter component
  /*------------------------------------*/
  class DateOverviewFilter {
    container;
    category;
    buttons;
    onFilterCategoryCallback;
    constructor(container) {
      this.container = container;
      this.buttons = this.container.querySelectorAll("#date-overview__filter__button");

      // Error handling
      if (!this.buttons) throw new Error("No buttons found");
      this.initEventListeners();
    }
    initEventListeners() {
      this.buttons.forEach(button => {
        button.addEventListener("click", () => {
          // Set category
          const category = button.dataset.category;
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
    setButtonState(element, state) {
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
    setFilterCategory(category) {
      this.setFilter(category);

      // Trigger onFilterCategory event when used inside the class
      if (this.onFilterCategoryCallback) this.onFilterCategoryCallback(this.category);
    }
    setFilter(category) {
      // Set button states
      this.buttons.forEach(button => {
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
    getFilter() {
      return this.category;
    }
    onFilterCategory(callback) {
      this.onFilterCategoryCallback = callback;
    }
  }
  const calendarElement = document.querySelector(".date-overview__calendar");
  const listElement = document.querySelector(".date-overview__list");
  const filterElement = document.querySelector("#date-overview__filter");
  if (!calendarElement || !listElement || !filterElement) throw new Error("No calendar, list or filter element found");
  const overview = new DateOverview(calendarElement, listElement, filterElement);
}