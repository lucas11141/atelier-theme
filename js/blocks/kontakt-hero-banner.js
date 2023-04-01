jQuery( document ).ready(function($) {


    
    const contactBanner = document.querySelector(".kontakt__banner")
    if( contactBanner ) {
		
        let currentActive
		var hasScrolled = false;
        const tabButtons = contactBanner.querySelectorAll(".methods__item")
        const tabContents = document.querySelectorAll(".methods__content")

        tabButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                openTab(e.target.dataset.index)
            })
        })
        
        function openTab(index) {

            // Hide Elements for no Selection
            tabButtons.forEach(button => {
                button.classList.remove("--arrows")
            })
            document.querySelector(".form__dummy").style.display = "none"

            // Highlight current Tab
            const activeTab = tabButtons[index]
            if( activeTab.dataset.index != currentActive ) {
                tabButtons.forEach(button => {
                    button.classList.remove("--active")
                })
                activeTab.classList.add("--active")
            }
            currentActive = index

            // Show current Tab Content
            tabContents.forEach(content => {
                content.classList.add("--hidden")
                if( content.dataset.index == currentActive ) {
                    content.classList.remove("--hidden")
                }
            })

			if(!hasScrolled) {
				document.querySelector('.kontakt__forms').scrollIntoView({behavior: 'smooth', block: 'center'})
				hasScrolled = true
			}
        }


        if( window.location.hash ) {
            var hash = window.location.hash; // = "#login"
            hash = hash.substring(1)
            tabButtons.forEach(button => {
                if( button.dataset.hash === hash ) {
                    button.classList.add("--active")
                    openTab(button.dataset.index)
                }
            })
        }

    }







	// Schnuppertermin Formular
	
	const variableFormConditionFieldClass = ".condition__field"
	const variableFormToggleFieldClass = ".toggle__field"
	
	function variableForm(form, condition) {

		let toggleFieldsIsVisible = false
		const toggleFields = form.querySelectorAll(variableFormToggleFieldClass)
		if( toggleFields.length > 0 ) {
			
			toggleFields.forEach(field => {
				field.style.display = "none"
			})
			
			const textarea = document.querySelector("label[for='nachricht']")
			
			const conditionField = form.querySelector(variableFormConditionFieldClass)
			if( conditionField !== null) {

				const SplitLeftFieldsCount = form.querySelectorAll(".form__split:first-child label").length
				const SplitLeftConstantFieldsCount = SplitLeftFieldsCount - form.querySelectorAll(".form__split:first-child " + variableFormToggleFieldClass).length

				conditionField.querySelector("select").addEventListener("change", (e) => {
					
					const conditionFieldValue = e.target.options[e.target.selectedIndex].value
					if( conditionFieldValue.includes(condition) ) {
						if( toggleFieldsIsVisible === false ) {
							toggleFields.forEach(field => {
								field.querySelector("input").value = ""
								field.style.display = "block"
							})
							textarea.classList.remove("height--" + SplitLeftConstantFieldsCount)
							textarea.classList.add("height--" + SplitLeftFieldsCount)
						}
						toggleFieldsIsVisible = true
					} else {
						if( toggleFieldsIsVisible === true ) {
							toggleFields.forEach(field => {
								field.style.display = "none"
								field.querySelector("input").value = "-"
							})
							textarea.classList.add("height--" + SplitLeftConstantFieldsCount)
							textarea.classList.remove("height--" + SplitLeftFieldsCount)
						}
						toggleFieldsIsVisible = false
					}

				})
			} else {
				throw new Error('Es wurde keine Select-Feld mit der Klasse "' + variableFormConditionFieldClass + '" definiert. Bei diesem Feld wird die Bedingung "' + condition + '" abgefragt.')
			}

		} else {
			throw new Error('Es wurde keine Input-Feld mit der Klasse "' + variableFormToggleFieldClass + '" definiert. Diese Felder werden angezeigt/versteckt, wenn die Bedingung "' + condition + '" passt/nicht passt.')
		}

	}

	const schnupperForm = document.querySelector(".schnuppertermin")
	if( schnupperForm ) {
		variableForm(schnupperForm, "Kinder")
	}

})