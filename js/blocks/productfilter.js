jQuery( document ).ready(function($) {

    // Disable Booking Button when no Dates are available
    const isNoDates = document.querySelector(".no__dates__available")
    if( isNoDates ) {
        const buttonBook = document.querySelector(".button__book")
        buttonBook.classList.add("--disabled")
    }


    // Product Filter
    const productsFilter = document.querySelector(".products__filter")
    if( productsFilter ) {
        let filterIndex = 0

        //
        const buttonOne = productsFilter.querySelector(".button--one")
        const buttonTwo = productsFilter.querySelector(".button--two")
        buttonOne.addEventListener("click", () => { 
            if( filterIndex === 1 ) {
                filterProduct(0) 
            } else {
                filterProduct(1) 
            }
        })
        buttonTwo.addEventListener("click", () => {
            if( filterIndex === 2 ) {
                filterProduct(0) 
            } else {
                filterProduct(2) 
            }
        })

        // Reset Button 
        const resetFilter = document.querySelector(".filter__reset")
        resetFilter.addEventListener("click", () => filterProduct(0))

        //
        const productsOne = document.querySelectorAll(".product__item.--one")
        const productsTwo = document.querySelectorAll(".product__item.--two")

        //
        function filterProduct(filter) {
            if( filter === 0 ) {
                filterIndex = 0
                console.log("Filter: 0")
                productsOne.forEach((product) => {
                    product.style.display = "flex"
                })
                productsTwo.forEach((product) => {
                    product.style.display = "flex"
                })
                buttonOne.classList.remove("--disabled")
                buttonTwo.classList.remove("--disabled")
                resetFilter.classList.add("--hidden")
            }
            if( filter === 1 ) {
                filterIndex = 1
                console.log("Filter: 1")
                productsOne.forEach((product) => {
                    product.style.display = "flex"
                })
                productsTwo.forEach((product) => {
                    product.style.display = "none"
                })
                buttonOne.classList.remove("--disabled")
                buttonTwo.classList.add("--disabled")
                resetFilter.classList.remove("--hidden")
            }
            if( filter === 2 ) {
                filterIndex = 2
                console.log("Filter: 2")
                productsOne.forEach((product) => {
                    product.style.display = "none"
                })
                productsTwo.forEach((product) => {
                    product.style.display = "flex"
                })
                buttonOne.classList.add("--disabled")
                buttonTwo.classList.remove("--disabled")
                resetFilter.classList.remove("--hidden")
            }
        }
    }

    const filterOneBtn = document.querySelector(".filter--1")
    if( filterOneBtn ) {
        filterOneBtn.addEventListener("click", () => {
            filterProduct(1)
        })
    }
    const filterTwoBtn = document.querySelector(".filter--2")
    if( filterTwoBtn ) {
        filterTwoBtn.addEventListener("click", () => {
            filterProduct(2)
        })
    }

})