function sibSendEmail(event, customer, content) {

    if( customer["name"] ) {
        const fullname = customer["name"]
        const splitName = fullname.split(" ")
        customer["firstname"] = splitName[0]
        customer["lastname"] = ""
        splitName.forEach((part, index) => {
            if( index >= 1) {
                customer["lastname"] = customer["lastname"] + " " + part
            }
        })
    }

    sendinblue.identify( customer["email"],
        {
            'VORNAME' : customer["firstname"],
            'NACHNAME' : customer["lastname"],
            'TELEFON' : customer["phone"],
        }
    )

    content["email"] = customer["email"]
    setTimeout(function() {
        sendinblue.track( event,
            {
                "email_id" : customer["email"]
            },
            content
        )
    }, 20)

    return true
}



jQuery( document ).ready(function($) {

    const sibConfigs = document.querySelectorAll(".sib-config")
    let sibForms = []
    sibConfigs.forEach(config => {
        sibForms.push(config.parentElement)
    })
    sibForms.forEach(form => {
        const sibConfig = form.querySelector(".sib-config")
        const formFields = form.querySelectorAll("input, select, textarea")
        const sibFields = []
        formFields.forEach(field => {
            if( field.id.includes("sib-") ) {
                sibFields.push(field)
            }
        })

        const submitButton = form.querySelector(".wpcf7-submit")
        let sibEvent = null
        let sibCustomer = {}
        let sibValues = {
            "data" : {}
        }
        submitButton.addEventListener("click", (e) => {
            sibEvent = sibConfig.dataset.sibEvent   

            formFields.forEach(field => {
                let fieldID = field.id
                if( fieldID.includes("sib-c-") ) {
                    fieldID = fieldID.replace('sib-c-', '');
                    const fieldValue = field.value
                    sibCustomer[fieldID] = fieldValue;
                }
            })

            formFields.forEach(field => {
                let fieldID = field.id
                if( fieldID.includes("sib-v-") ) {
                    fieldID = fieldID.replace('sib-v-', '');
                    const fieldValue = field.value
                    sibValues["data"][fieldID] = fieldValue;
                }
            })
        })

        const formSubmitObserver = new MutationObserver(entries => {
            console.log(sibEvent)
            console.log(sibCustomer)
            console.log(sibValues)
            if( entries[0].target.innerText === "Vielen Dank für deine Nachricht. Sie wurde gesendet." ) {
                console.log("Formular abgesendet.")
                sibSendEmail(sibEvent, sibCustomer, sibValues)
            }
        })
        formSubmitObserver.observe(form.querySelector(".wpcf7-response-output"), { childList: true })
    
    })

})