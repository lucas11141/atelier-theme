jQuery( document ).ready(function($) {

    console.log('script: booking.js')

    let vh = window.innerHeight * 1;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 1;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });


    let datePicker = document.getElementById("date__picker")
    if( datePicker ) {
        datePicker = MCDatepicker.create({ 
            el: '#date__picker',
            bodyType: "inline",
            closeOnBlur: true,
            minDate: new Date(),
            customOkBTN: 'OK',
            customClearBTN: 'Löschen',
            customCancelBTN: 'Abbruch',
            dateFormat: 'DD.MM.YYYY',
            customWeekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            customMonths: [
                'Januar',
                'Februar',
                'März',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember'
            ],
            firstWeekday: 1
        })
        datePicker.onOpen(() => {
            document.querySelector("#date__picker").parentElement.classList.add("--active")
        })
        datePicker.onClose(() => {
            if( datePicker.getFullDate() == null ) {
                document.querySelector("#date__picker").parentElement.classList.remove("--active")
            } 
        })
    } else {
        datePicker = false
    }

    //URL Parameter Funktionen
    function updateURLParameter(url, param, paramVal){
        if(!url.includes('?')){
            return url += '?' + param + '=' + paramVal;
        }else if(!url.includes(param)){
            return url += '&' + param + '=' + paramVal;
        }else {
            let paramStartIndex = url.search(param);
            let paramEndIndex = url.indexOf('&', paramStartIndex);
            if (paramEndIndex == -1){
                paramEndIndex = url.length;
            }
            let brands = url.substring(paramStartIndex, paramEndIndex);

            return url.replace(brands, param + '=' + paramVal);
        }
    }
    function replaceURLParam(param, paramVal){
        window.location.href = updateURLParameter(window.location.href, param, paramVal);
    }
    function getURLParamValue(param) {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const value = urlParams.get(param)
        return value
    }

    // Helpers
    function setInnerText(element, content) {
        if( element ) {
            element.innerText = content
        } else {
            throw new Error("setInnerText(): Es wurde kein Element " + element +  " definiert!")
        }
    }
    function getInnerText(element) {
        if(element) {
            return element.innerText
        }
        return null
    }
    function convertToReadableDate(date) {
        if(date == undefined) { return false }
        const convertDate = new Date(date)
        let d = convertDate.getDate()
        if( d.toString().length === 1) {
            d = "0" + d
        }
        let m = convertDate.getMonth()
        switch( m ) {
            case 0:
                m = "Januar"
                break
            case 1:
                m = "Februar"
                break
            case 2:
                m = "März"
                break
            case 3:
                m = "April"
                break
            case 4:
                m = "Mai"
                break
            case 5:
                m = "Juni"
                break
            case 6:
                m = "Juli"
                break
            case 7:
                m = "August"
                break
            case 8:
                m = "September"
                break
            case 9:
                m = "Oktober"
                break
            case 10:
                m = "November"
                break
            case 11:
                m = "Dezember"
                break
        }
        let y = convertDate.getFullYear()
        return d + ". " + m + " " + y
    }


    class Booking {

        constructor() {

            this.productIdPHP = parseInt(document.getElementById('js-productId').innerText)
            this.productTitlePHP = document.getElementById('js-productTitle').innerText
            this.productCategoryPHP = document.getElementById('js-productCategory').innerText
            this.productGroupPHP = document.getElementById('js-productGroup').innerText
            this.productPricePHP = parseInt(document.getElementById('js-productPrice').innerText)
            this.productPrice = this.productPricePHP
            this.productName = document.getElementById("product__name").innerText

            console.log(this.productIdPHP, this.productTitlePHP, this.productCategoryPHP, this.productPrice)

            this.validations = {
                KursKINDER: [
                    { // Name des Kindes
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 40 , "Max. 40 Zeichen erlaubt." ]
                    },
                    { // Alter des Kindes
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                    { // Nachricht
                        isRequired: [ false , "" ],
                        minLength: [ 10 , "Deine Nachricht muss mindesten 10 Zeichen lang sein." ],
                        maxLength: [ 500 , "Deine Nachricht darf maximal 500 Zeichen lang sein."]
                    },
                    { // Vorname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Nachname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Email
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                        isEmail: [ true , "Bitte gib ein gültiges Format an." ]
                    },
                    { // Telefonnummer
                        isRequired: [ false , "" ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                ],
                KursERWACHSENE: [
                    { // Nachricht
                        isRequired: [ false , "" ],
                        minLength: [ 10 , "Deine Nachricht muss mindesten 10 Zeichen lang sein." ],
                        maxLength: [ 500 , "Deine Nachricht darf maximal 500 Zeichen lang sein."]
                    },
                    { // Vorname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Nachname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Email
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                        isEmail: [ true , "Bitte gib ein gültiges Format an." ]
                    },
                    { // Telefonnummer
                        isRequired: [ false , "" ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                ],
                Workshop: [
                    { // Nachricht
                        isRequired: [ false , "" ],
                        minLength: [ 10 , "Deine Nachricht muss mindesten 10 Zeichen lang sein." ],
                        maxLength: [ 500 , "Deine Nachricht darf maximal 500 Zeichen lang sein."]
                    },
                    { // Vorname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Nachname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Email
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                        isEmail: [ true , "Bitte gib ein gültiges Format an." ]
                    },
                    { // Telefonnummer
                        isRequired: [ false , "" ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                ],
                Geburtstag: [
                    { // Teilnehmerzahl
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                    },
                    { // Name des Kindes
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 40 , "Max. 40 Zeichen erlaubt." ]
                    },
                    { // Alter des Kindes
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                    { // Nachricht
                        isRequired: [ false , "" ],
                        minLength: [ 10 , "Deine Nachricht muss mindesten 10 Zeichen lang sein." ],
                        maxLength: [ 500 , "Deine Nachricht darf maximal 500 Zeichen lang sein."]
                    },
                    { // Vorname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Nachname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Email
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        isEmail: [ true , "Bitte gib ein gültiges Format an." ],
                    },
                    { // Telefonnummer
                        isRequired: [ false , "" ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                ],
                Kunstevent: [
                    { // Teilnehmerzahl
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                    },
                    { // Eventdauer
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                    },
                    { // Teilnehmerzahl
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                    },
                    { // Anmerkung
                        isRequired: [ false , "" ],
                        minLength: [ 10 , "Deine Nachricht muss mindesten 10 Zeichen lang sein." ],
                        maxLength: [ 500 , "Deine Nachricht darf maximal 500 Zeichen lang sein."]
                    },
                    { // Vorname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Nachname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // E-Mail-Adresse
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        isEmail: [ true , "Bitte gib ein gültiges Format an." ],
                    },
                    { // Telefonnummer
                        isRequired: [ false , "" ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                ],
                Ferienprogramm: [
                    { // Name des Kindes
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 40 , "Max. 40 Zeichen erlaubt." ]
                    },
                    { // Alter des Kindes
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                    { // Nachricht
                        isRequired: [ false , "" ],
                        minLength: [ 10 , "Deine Nachricht muss mindesten 10 Zeichen lang sein." ],
                        maxLength: [ 500 , "Deine Nachricht darf maximal 500 Zeichen lang sein."]
                    },
                    { // Vorname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Nachname
                        isRequired: [ true , "Feld muss ausgefüllt sein." ],
                        minLength: [ 2 , "Mind. 2 Zeichen benötigt." ],
                        maxLength: [ 20 , "Max. 20 Zeichen erlaubt." ]
                    },
                    { // Email
                        isRequired: [ true , "Dieses Feld muss ausgefüllt sein." ],
                        isEmail: [ true , "Bitte gib ein gültiges Format an." ]
                    },
                    { // Telefonnummer
                        isRequired: [ false , "" ],
                        isNumber: [ true , "Es sind nur Ziffern zulässig." ]
                    },
                ]
            }
            this.bookingInfos = JSON.parse(localStorage.getItem("booking_infos"))
            this.currentBookingStep = parseInt(getURLParamValue("step"))
            this.furthestBookingStep = localStorage.getItem("furthestBookingStep")
            this.productGroup = document.getElementById("product__group")
            this.productCat = getURLParamValue("product_cat")
            this.bookingExtras = null
            this.formElement = document.getElementById("info__form")
            this.colorName = ''

            this.navLinks = document.querySelectorAll(".process__nav span")
            this.prevButton = document.querySelector(".step__prev")
            this.nextButton = document.querySelector(".step__next")
            this.dateRadios = document.querySelectorAll("input[type='radio']")
            this.peopleInput =  document.querySelector("select[name='peoplecount']")
            // this.productPriceEl = document.getElementById('product__price')
            this.bookingDuration = localStorage.getItem("booking_duration")

            this.declareBookingSteps()
            this.declareEventListener()
            this.declareColorName()

            if(this.currentBookingStep === 0) {
                this.runBookingStep0()
            }
            if(this.currentBookingStep === 1) {
                this.runBookingStep1()
            }
            if(this.currentBookingStep === 2) {
                this.runBookingStep2()
            }
            if(this.currentBookingStep === 3) {
                this.runBookingStep3()
            }
            if(this.currentBookingStep === 4) {
                this.runBookingStep4()
            }
            if(this.currentBookingStep === 5) {
                // Avoid double bookings on history.back after booking
                if(localStorage.getItem("is_booked") === "true") {
                    window.location.href = "https://www.atelier-delatron.de"
                }
                this.runBookingStep5()
            }

            this.setAllOnLoad()
        }




        declareBookingSteps() {
            //current booking step
            this.setCurrentBookingStep(this.currentBookingStep)
            //furthest checkout step
            if(this.currentBookingStep > this.furthestBookingStep) {
                this.setFurthestBookingStep(this.currentBookingStep)
            }
            // Get product group variable
            if( this.productGroup ) { this.productGroup = this.productGroup.innerText.toUpperCase() }
        }

        declareEventListener() {
            // Mobile 'Übersicht' Toggle
            $('.info__mobile-header').click(e => {
                $(e.currentTarget).parent().toggleClass('--opened')
                $(e.currentTarget).parent().find('.info__content').slideToggle(300)
            })


            //Button Controls
            if(this.currentBookingStep !== 1) {
                this.prevButton.addEventListener("click", () => {
                    this.safeAll()
                    if(this.productCat === "Geburtstag") {
                        replaceURLParam("step", this.currentBookingStep - 1)
                    } else {
                        if(this.currentBookingStep === 4) {
                            replaceURLParam("step", this.currentBookingStep - 2)
                        } else {
                            replaceURLParam("step", this.currentBookingStep - 1)
                        }
                    }
                })
            }
            this.nextButton.addEventListener("click", () => {
                if( this.safeAll() ) {
                    if(this.currentBookingStep !== 5) {
                        // Skip Extras when not Birthday
                        if(this.productCat === "Geburtstag") {
                            replaceURLParam("step", this.currentBookingStep + 1)
                        } else {
                            if(this.currentBookingStep === 2) {
                                replaceURLParam("step", this.currentBookingStep + 2)
                            } else {
                                replaceURLParam("step", this.currentBookingStep + 1)
                            }
                        }
                    } else {
                        this.submitBooking()
                    }
                }
            })


            this.dateRadios.forEach(radio => {
                radio.addEventListener("click", () => {
                    this.updateInfoDate()
                    document.getElementById("date__error").classList.add("--hidden")
                })
            })

            if(this.productCat === 'Kunstevent') {
                if( this.peopleInput ) {
                    this.peopleInput.addEventListener("change", (e) => {
                        this.setKunsteventTooltips()
                    })
                }
            }



            // Quit Button
            const quitButton = document.querySelectorAll('.quit__button')
            if( quitButton ) {
                quitButton.forEach(button => {
                    button.addEventListener("click", e => {
                        let buttonURL
                        if(e.target.tagName === "A") {
                            buttonURL = e.target.dataset.productLink
                        } else {
                            buttonURL = e.target.parentElement.dataset.productLink
                        }
                        if (confirm('Willst du die Buchung wirklich verlassen? Deine Angegebene Daten werden dadurch gelöscht.')) {
                            // Save it!
                            window.location = buttonURL
                        } else {
                            // Do nothing!
                        }
                    })
                })
            }
        }

        declareColorName() {
            if( this.productCat === "Kurs" ) {
                if( this.productGroup === "KINDER" ) {
                    this.colorName = "blue"
                } else if ( this.productGroup === "ERWACHSENE" ) {
                    this.colorName = "purple"
                }
            } else if ( this.productCat === "Workshop" ) {
                this.colorName = "red"
            } else if ( this.productCat === "Geburtstag" ) {
                this.colorName = "green"
            } else if ( this.productCat === "Kunstevent" ) {
                this.colorName = "pink"
            } else if ( this.productCat === "Ferienprogramm" ) {
                this.colorName = "yellow"
            }
        }

        declareExtras() {
            if( this.productCat === "Geburtstag" ) {
                this.bookingExtras = [
                    {
                        id: 1,
                        title: "Nur Workshop",
                        description: "30 Minuten Feierlichkeiten abwählen",
                        price: -25,
                        duration: -0.5,
                        selected: false
                    }
                ]
            } else {
                console.log("no extras declared")
            }
            if( this.bookingExtras !== null ) {
                localStorage.setItem("booking_extras", JSON.stringify(this.bookingExtras))
            }
        }





        setAllOnLoad() {
            this.setDateOnLoad()
            this.setSummaryOnLoad()
            this.setNavOnLoad()
            this.updateDuration()
            if( this.productCat === "Geburtstag" || this.productCat === "Kunstevent" ) {
                this.setPricingOnLoad()
                if( this.furthestBookingStep >= 3 ) {
                    this.setInfoTable()
                }
            }
            if(this.currentBookingStep === 2) {
                this.setInfoOnLoad()
            }
            // if(this.currentBookingStep === 3) {
            //     this.setExtrasOnLoad()
            // }
            if(this.currentBookingStep === 5) {
                this.setProofOnLoad()
            }
        }
        setDateOnLoad() {
            let selectedDate = getURLParamValue("date_selected") || JSON.parse(localStorage.getItem("booking_dates"))
            if( selectedDate != null && typeof selectedDate === "object" ) {
                selectedDate = selectedDate[0]
            }
            
            // Input Date - Datum selber wählen
            if( datePicker && selectedDate != null ) {
                const date = new Date(selectedDate)
                datePicker.setFullDate(date);
            // Select Date - Datum aus Auswahl nehmen
            } else {    
                this.dateRadios.forEach(radio => {
                    if(radio.value === selectedDate) {
                        radio.checked = true
                        if( localStorage.getItem("booking_dates") === null ) {
                            let selectedDates = [ radio.value ]
                            let selectedTimes = [ radio.dataset.time ]
                            if( radio.dataset.dateTwo !== undefined ) {
                                selectedDates.push(radio.dataset.dateTwo)
                                selectedTimes.push(radio.dataset.timeTwo)
                            }
                            localStorage.setItem("booking_dates", JSON.stringify(selectedDates))
                            localStorage.setItem("booking_times", JSON.stringify(selectedTimes))
                        }
                    }
                })
            }

        }
        setInfoOnLoad() {
            this.bookingForm.setValues(this.bookingInfos)
            if( this.productCat === "Kunstevent" ) {
                this.setPeoplecount(this.bookingInfos["duration"], this.bookingInfos["peoplecount"])
            }
        }
        setSummaryOnLoad() {

            const dates = JSON.parse(localStorage.getItem("booking_dates"))
            const times = JSON.parse(localStorage.getItem("booking_times"))
            
            if( dates ) {

                // First Date
                const element1 = document.getElementById("summary__date")
                const date1 = dates[0]
                let time1
                times != null ? time1 = times[0] : ""
                setSummaryDate(element1, date1, time1)

                // Second Date
                if( dates.length > 1 ) {
                    const element2 = document.getElementById("summary__date2")
                    const date2 = dates[1]
                    let time2
                    times != null ? time2 = times[1] : ""
                    setSummaryDate(element2, date2, time2)
                }

            }

            // Set content of date field
            function setSummaryDate(element, date, time=false) {
                let content = convertToReadableDate(date)
                if( time ) {
                    content += " || " + time
                }
                setInnerText(element, content)
            }
            
        }
        setProofOnLoad() {
            // Proof Fields
            function setProofInfo(field, value, step) {
                const valueField = document.getElementById(field)
                if( valueField ) {
                    if( value !== "" ) {
                        valueField.querySelector(".item__value").innerText = value
                    } else {
                        valueField.querySelector(".item__value").innerText = "–"
                    }
                    valueField.querySelector(".edit__button").addEventListener("click", () => {
                        replaceURLParam("step", step)
                    })
                } else {
                    throw new Error(`Das Angegeben Element existiert nicht: ${field}`)
                }
            }



            const proofFields = document.querySelectorAll(".proof__item")
            const customerInfo = JSON.parse(localStorage.getItem("booking_infos"))
            setProofInfo("proof--date", convertToReadableDate(JSON.parse(localStorage.getItem("booking_dates"))[0]), 1)
            setProofInfo("proof--fullname", customerInfo["firstname"] + " " + customerInfo["lastname"], 2)
            setProofInfo("proof--email", customerInfo["email"], 2)
            setProofInfo("proof--phone", customerInfo["phone"], 2)
            setProofInfo("proof--message", customerInfo["message"], 2)
            if( this.productGroup === "KINDER" ) {
                setProofInfo("proof--childname", customerInfo["childname"], 2)
                setProofInfo("proof--childage", customerInfo["childage"] + " Jahre", 2)
            }
            if( this.productCat === "Geburtstag" || this.productCat === "Kunstevent" ) {
                setProofInfo("proof--peoplecount", customerInfo["peoplecount"] + " Personen", 2)
            }
            // if( this.productCat === "Geburtstag" ) {
            //     if( this.extrasIsSelected() ) {
            //         setProofInfo("proof--extra", getExtrasAsString(), 3)
            //     } else {
            //         setProofInfo("proof--extra", "–", 3)
            //     }
            // }
            if( this.productCat === "Kunstevent" ) {
                setProofInfo("proof--eventtype", customerInfo["eventtype"], 2)
                setProofInfo("proof--duration", customerInfo["duration"] + " Stunden", 2)
            }
            if( this.productCat === "Ferienprogramm" ) {
                setProofInfo("proof--childname", customerInfo["childname"], 2)
                setProofInfo("proof--childage", customerInfo["childage"] + " Jahre", 2)
            }




            // Submit Form
            const submitForm = document.querySelector(".wpcf7")
            const formInputs = submitForm.querySelectorAll("input[type='hidden'].wpcf7-form-control")
            function cf7SetValue(inputName, value) {
                const inputElement = document.querySelector('input[name="' + inputName + '"]')
                if(inputElement) {
                    console.log(inputElement)
                    inputElement.value = value
                } else {
                    console.log('cf7SetValue() - The input element "' + inputName + '" doesn`t exist.')
                }
            }
            function setFormExtras() {
                if( this.extrasIsSelected() ) {
                    cf7SetValue("product-extras", getExtrasAsString())
                } else {
                    cf7SetValue("product-extras", "Keine Extras")

                }
            }


            // Allgemein
            cf7SetValue("product-id", this.productIdPHP)
            cf7SetValue("product-title", this.productTitlePHP)
            cf7SetValue("product-category", this.productCategoryPHP)
            if(this.productGroupPHP) cf7SetValue("product-group",  ' für ' + this.productGroupPHP)
            cf7SetValue("product-price", this.productPricePHP + '€')

            // Kunde
            cf7SetValue("customer-firstname", customerInfo["firstname"])
            cf7SetValue("customer-lastname", customerInfo["lastname"])
            cf7SetValue("customer-email", customerInfo["email"])
            cf7SetValue("customer-phone", customerInfo["phone"])
            cf7SetValue("customer-message", customerInfo["message"])

            // Kinder
            if( this.productGroup === "KINDER" ) {
                cf7SetValue("customer-childname", customerInfo["childname"])
                cf7SetValue("customer-childage", ' | ' + customerInfo["childage"] + ' Jahre')
            }

            // Kurse
            if( this.productCat === "Kurs" ) {
                cf7SetValue("course-startdate", 'ab ' + convertToReadableDate(JSON.parse(localStorage.getItem("booking_dates"))[0]))
                cf7SetValue("course-time", getInnerText(document.getElementById("course__time")))
                cf7SetValue("course-day", getInnerText(document.getElementById("course__day")) + 's')
            }

            // Workshops
            if( this.productCat === "Workshop" || this.productCat === "Ferienprogramm" ) {
                cf7SetValue("workshop-date", getInnerText(document.getElementById("summary__date")))
                cf7SetValue("workshop-date-2", getInnerText(document.getElementById("summary__date2")))
            }

            // Geburtstage
            if( this.productCat === "Geburtstag" ) {
                cf7SetValue("customer-peoplecount", customerInfo["peoplecount"] + ' Teilnehmer')
                cf7SetValue("birthday-date", getInnerText(document.getElementById("summary__date")))
            }

            // Events
            if( this.productCat === "Kunstevent" ) {
                cf7SetValue("customer-peoplecount", customerInfo["peoplecount"] + ' Teilnehmer')
                cf7SetValue("event-date", getInnerText(document.getElementById("summary__date")))
                cf7SetValue("event-duration", customerInfo["duration"] + ' Stunden')
                cf7SetValue("event-type", customerInfo["eventtype"])
            }

            // // für Kinder
            // if( this.productGroup === "KINDER" ) {
            //     cf7SetValue("customer-childname", customerInfo["childname"])
            // }
            // // Kurse
            // if( this.productCat === "Kurs" ) {
            //     cf7SetValue("course-startdate", convertToReadableDate(JSON.parse(localStorage.getItem("booking_dates"))[0]))
            //     cf7SetValue("course-time", document.getElementById("course__time").innerText)
            //     cf7SetValue("course-day", document.getElementById("course__day").innerText)
            // }
            // // Workshops
            // if( this.productCat === "Workshop" || this.productCat === "Ferienprogramm" ) {
            //     cf7SetValue("workshop-date", document.getElementById("summary__date").innerText)
            //     if( document.getElementById("summary__date2") ) {
            //         cf7SetValue("workshop-date-2", document.getElementById("summary__date2").innerText)
            //     }
            // }
            // // Birthdays
            // if( this.productCat === "Geburtstag" ) {
            //     cf7SetValue("customer-peoplecount", customerInfo["peoplecount"])
            //     cf7SetValue("birthday-date", document.getElementById("summary__date").innerText)
            //     // setFormExtras()
            // }
            // // Kunstevents
            // if( this.productCat === "Kunstevent" ) {
            //     cf7SetValue("customer-peoplecount", customerInfo["peoplecount"])
            //     cf7SetValue("event-date", document.getElementById("summary__date").innerText)
            //     cf7SetValue("event-duration", customerInfo["duration"])
            // }

        }
        // setExtrasOnLoad() {
        //     this.bookingExtras.forEach(extra => {
        //         if( extra["selected"] === true ) {
        //             document.querySelector(".extras__list input[id='checkbox" + extra["id"] + "']").checked = true
        //         } 
        //     })
        // }
        setPricingOnLoad() {
            if( this.bookingExtras ) {
                const bookingExtrasSummaryItems = document.querySelectorAll(".price__extra")
                this.bookingExtras.forEach(extra => {
                    if( extra["selected"] === true ) {
                        bookingExtrasSummaryItems[(extra["id"]-1)].classList.add("--active")
                    } 
                })
            }
        }
        setNavOnLoad() {
            for(let i=0; i<this.furthestBookingStep; i++) {
                this.navLinks[i].classList.add("--visited")
            }
            if(this.currentBookingStep > 0) {
                this.navLinks[this.currentBookingStep-1].classList.add("--active")
            }

            // Add Event Listener to navigation between steps
            this.navLinks.forEach((link, index) => {
                if(link.classList.contains("--visited") && !link.classList.contains("--active")) {
                    link.addEventListener("click", () => {
                        this.safeAll()
                        replaceURLParam("step", index+1)
                    })
                }
            })
        }
        setPeoplecount(duration, value=false) {
            let options = "disabled"
            if( duration === "3.5" ) {
                options = [3,4,5,6,7,8,9,10]
            } else if( duration === "4.5" ) {
                options = [5,6,7,8,9,10]
            }
            const select = this.peopleInput
            const selectedPeoplecount = select.value
            select.innerHTML = ""
            let optionSelect = document.createElement("option")
            optionSelect.value = ""
            if( options === "disabled" ) {
                this.peopleInput.disabled = true
                optionSelect.innerText = "Dauer wählen..."
                select.append(optionSelect)
            } else {
                select.disabled = false
                optionSelect.innerText = "Auswählen..."
                select.append(optionSelect)
                options.forEach(option => {
                    let optionEl = document.createElement("option")
                    optionEl.value = option
                    optionEl.innerText = option + " Teilnehmer "
                    optionEl.dataset.pricePerson = this.calcKunsteventPrice(duration, option)[1]
                    select.append(optionEl)
                    if( option == selectedPeoplecount ) {
                        select.value = selectedPeoplecount
                    }
                })
                if( selectedPeoplecount == 3 || selectedPeoplecount == 4 ) {
                    this.bookingInfos["peoplecount"] = "undefined"
                    localStorage.setItem("booking_infos", JSON.stringify(this.bookingInfos))
                }
            }
            if( selectedPeoplecount >= 5) {
                this.setKunsteventTooltips()
            }
            if( value !== false ) {
                select.value = value
            }
        }
        setKunsteventTooltips() {
            const pricePersonCurrent = parseInt(this.peopleInput[this.peopleInput.selectedIndex].dataset.pricePerson)
            this.peopleInput.querySelectorAll("option").forEach((option, index) => {
                if( option.value != "" ) {
                    const pricePersonOption = parseInt(this.peopleInput[index].dataset.pricePerson)
                    const pricePersonDelta =  pricePersonOption - pricePersonCurrent
                    if( option.value != this.peopleInput[this.peopleInput.selectedIndex].value ) {
                        if( pricePersonDelta > 0) {
                            option.innerText = option.value + " Teilnehmer ( +" + pricePersonDelta + "€ p.P. )"
                        } else {
                            option.innerText = option.value + " Teilnehmer ( " + pricePersonDelta + "€ p.P. )"
                        }
                    } else {
                        option.innerText = option.value + " Teilnehmer"
                    }
                }
            })
        } 
        setInfoTable() {

            const tableRows = document.querySelectorAll('.info__table__row')

            tableRows.forEach(tableRow => {

                const tableRowValue = tableRow.querySelector(".value")
                const peoplecount = this.bookingInfos["peoplecount"];

                if( tableRow.classList.contains('info__table__row--geburtstag-price-person') ) {
                    const geburtstagInfos = JSON.parse(localStorage.getItem("geburtstag_infos"))
                    const pricePerson = geburtstagInfos["price_person"]
                    const priceTotal = pricePerson * peoplecount
                    this.productPrice = priceTotal

                    if( peoplecount !== undefined && peoplecount != 'undefined' && peoplecount != '' ) {
                        showInfoButton(tableRowValue, peoplecount + " Teilnehmer x " + pricePerson + "€")
                        setInnerText(tableRowValue, priceTotal + "€")
                    } else {
                        showInfoButton(tableRowValue, false)
                        setInnerText(tableRowValue, "Teilnehmerzahl wählen...")
                    }
                }

                if( tableRow.classList.contains('info__table__row--geburtstag-total') ) {
                    const geburtstagInfos = JSON.parse(localStorage.getItem("geburtstag_infos"))
                    const priceBase = geburtstagInfos['price_base']
                    const priceMaterial = geburtstagInfos['price_person'] * peoplecount
                    const priceTotal = priceBase + priceMaterial
                    this.productPrice = priceTotal
                    
                    // Bedigung für Anzeige der Infobox
                    if( peoplecount != undefined && peoplecount != "undefined" && peoplecount != "" ) {
                        setInnerText(tableRowValue, priceTotal + "€")
                    } else {
                        setInnerText(tableRowValue, "Konfiguration wählen...")
                    }
                }

                if( tableRow.classList.contains('info__table__row--kunstevent-person-count') ) {
                    console.log(peoplecount)
                    if(peoplecount !== 'undefined') {
                        setInnerText(tableRowValue, `${peoplecount} Teilnehmer`)
                    } else {
                        setInnerText(tableRowValue, 'Teilnehmerzahl wählen...')
                    }
                }

                if( tableRow.classList.contains('info__table__row--kunstevent-person-price') ) {
                    if(peoplecount !== 'undefined') {
                        const [priceTotal] = this.calcKunsteventPrice(this.bookingDuration, peoplecount)
                        const pricePerPerson = priceTotal / peoplecount
                        setInnerText(tableRowValue, `${pricePerPerson}€`)
                    } else {
                        setInnerText(tableRowValue, 'Teilnehmerzahl wählen...')
                    }
                }
                
                if( tableRow.classList.contains('info__table__row--kunstevent-total') ) {
                    let [priceTotal, pricePerson] = this.calcKunsteventPrice(this.bookingDuration, peoplecount)
                    this.productPrice = priceTotal
                    
                    // Bedigung für Anzeige der Infobox
                    if( peoplecount != undefined && peoplecount != "undefined" && peoplecount != "" ) {
                        showInfoButton(tableRowValue, peoplecount + " Teilnehmer x " + pricePerson + "€")
                        setInnerText(tableRowValue, priceTotal + "€")
                        // setInnerText(this.productPriceEl, priceTotal + "€")
                    } else {
                        showInfoButton(tableRowValue, false)
                        setInnerText(tableRowValue, "Konfiguration wählen...")
                        // setInnerText(this.productPriceEl, "--  €")
                    }
                }

                function showInfoButton(element, content) {
                    if( content !== false ) {
                        element.parentElement.querySelector(".tooltip").classList.add("--visible")
                        element.parentElement.querySelector(".tooltip span").innerText = content
                    } else {
                        element.parentElement.querySelector(".tooltip").classList.remove("--visible")
                    }
                }

            })
        }
        updateDuration() {
            if( this.productCat === "Kunstevent" ) {
                let calcDuration = this.bookingDuration
                if( this.extrasIsSelected() ) {
                    this.bookingExtras.forEach(extra => {
                        if( extra["selected"] ) {
                            calcDuration = calcDuration + extra["duration"]
                        }
                    })
                }
                if( calcDuration > 0 ) {
                    document.querySelector(".summary__duration .value").innerHTML = calcDuration + " Stunden"
                } else {
                    document.querySelector(".summary__duration .value").innerHTML = "Dauer wählen..."
                }
            }
        }







        //Safe All Infos before page change
        safeAll() {
            if(this.currentBookingStep === 1) {
                return this.safeDate()
            } else if(this.currentBookingStep === 2) {
                return this.safeInfo()
            } else if(this.currentBookingStep === 3) {
                return this.safeExtras()
            } else {
                return true
            }
            return false;
        }
        safeExtras() {
            const checkboxes = document.querySelectorAll(".extras__list input")
            localStorage.setItem("booking_extras", JSON.stringify(this.bookingExtras))
            return true
        }
        safeDate() {
            if( datePicker ) {
                const minDate = new Date()
                minDate.setDate(minDate.getDate() + 7);
                const date = new Date(datePicker.getYear(), datePicker.getMonth(), datePicker.getDate())
                if( isNaN(date) ) {
                    document.getElementById("date__error").innerText = "Bitte wähle einen Termin aus..."
                    document.getElementById("date__error").classList.remove("--hidden")
                    return false
                } else if( date < minDate ) {
                    document.getElementById("date__error").innerText = "Der Termin muss mind. 1 Woche in der Zukunft liegen."
                    document.getElementById("date__error").classList.remove("--hidden")
                    return false
                } else {
                    document.getElementById("date__error").classList.add("--hidden")
                    localStorage.setItem("booking_dates", JSON.stringify([datePicker.getFullDate()]))
                    return true
                }
            // Select Date - Datum aus Auswahl nehmen
            } else {
                if(this.getSelectedDate() !== false ) {
                    let selectedDates = [ this.getSelectedDate() ]
                    if( this.productCat === "Workshop" && this.getSelectedDate(2) ) {
                        selectedDates.push(this.getSelectedDate(2))
                    }
                    localStorage.setItem("booking_dates", JSON.stringify(selectedDates))
                    return true;
                } else {
                    document.getElementById("date__error").classList.remove("--hidden")
                }
            }
            return false;
        }
        safeInfo() {
            if( this.bookingForm.validateForm() ) {
                localStorage.setItem("booking_infos", JSON.stringify(this.bookingForm.getValues()))
                return true;
            }
            return false
        }









        setCurrentBookingStep(step = this.currentBookingStep) {
            localStorage.setItem("currentBookingStep", step)
            this.currentBookingStep = step
        }
        setFurthestBookingStep(step = this.furthestBookingStep) {
            localStorage.setItem("furthestBookingStep", step)
            this.furthestBookingStep = step
        }



        updateInfoDate() {
            const summaryDateElement = document.getElementById("summary__date")
            const newSummaryDate = convertToReadableDate(this.getSelectedDate())
            const newSummaryTime = this.getSelectedTime()
            if( this.productCat !== "Workshop" ) {
                summaryDateElement.innerText = newSummaryDate
            } else {
                summaryDateElement.innerText = newSummaryDate + " || " + newSummaryTime
            }

            const summaryDateElement2 = document.getElementById("summary__date2")
            const newSummaryDate2 = convertToReadableDate(this.getSelectedDate(2))
            const newSummaryTime2 = this.getSelectedTime(2)
            if( summaryDateElement2 ) {
                if( this.productCat !== "Workshop" ) {
                    summaryDateElement2.innerText = newSummaryDate2
                } else {
                    summaryDateElement2.innerText = newSummaryDate2 + " || " + newSummaryTime2
                }
            }
        }





        calcKunsteventPrice(duration, peoplecount) {
            const kunsteventInfos = JSON.parse(localStorage.getItem("kunstevent_infos"))
            const priceHour = kunsteventInfos["prices_hour"][peoplecount-3]
            const priceFood = kunsteventInfos["price_food"]
            const priceMaterial = kunsteventInfos["price_material"]
            let pricePerson = ( ( priceHour * duration ) + ( ( priceFood + priceMaterial ) * peoplecount ) ) / peoplecount
            pricePerson = Math.round(pricePerson)
            let priceTotal = pricePerson * peoplecount
            return [priceTotal, pricePerson]
        }

        getSelectedDate(dateNumber = 1) {
            let returnDate
            this.dateRadios.forEach(radio => {
                if(radio.checked == true) {
                    if(dateNumber === 1) {
                        returnDate = radio.value
                    } else {
                        returnDate = radio.dataset.dateTwo
                    }
                }
            })
            if(returnDate === undefined) {
                return false
            }
            return returnDate
        }

        getSelectedTime(timeNumber = 1) {
            const selectedTimeRadios = document.querySelectorAll("input[type='radio']")
            let returnTime;
            selectedTimeRadios.forEach(radio => {
                if(radio.checked == true) {
                    if(timeNumber === 1) {
                        returnTime = radio.dataset.time
                    } else {
                        returnTime = radio.dataset.timeTwo
                    }
                }
            })
            if(returnTime === undefined) {
                return false;
            }
            return returnTime;
        }

        extrasIsSelected() {
            if( this.bookingExtras ) {
                this.bookingExtras = JSON.parse(this.bookingExtras)
                let isSelected = false
                this.bookingExtras.forEach(extra => {
                    if( extra["selected"] === true ) {
                        isSelected = true
                    }
                })
                return isSelected
            }
            return false
        }






        // Booking - Step 0: Start
        runBookingStep0() {
            this.resetLocalstorage()
            this.safePrices()
            this.declareExtras()
            this.safeBookingData()
            replaceURLParam("step", "1")
        }

        // Booking - Step 1: Date
        runBookingStep1() {
            if(!this.bookingDuration) {
                const durationEl = document.getElementById("duration")
                localStorage.setItem("booking_duration", durationEl.innerText)
                this.bookingDuration = durationEl.innerText
            }
        }

        // Booking - Step 2: Infos
        runBookingStep2() {
            const validationCat = this.productCat === "Kurs" ? this.productCat + this.productGroup : this.productCat

            // create form Object
            this.bookingForm = new Form(this.formElement, this.validations[validationCat])


            const bookingInfoFields = {}
            this.formElement.querySelectorAll("input, select, textarea").forEach(input => {
                bookingInfoFields[input.name] = ""
            })
            if( localStorage.getItem("booking_infos") === "{}" ) {
                localStorage.setItem("booking_infos", JSON.stringify(bookingInfoFields))
            }




            // Update material price on people change
            if( this.peopleInput ) {
                this.peopleInput.addEventListener("change", (e) => {
                    if( this.bookingInfos ) {
                        if( e.target.value == "") {
                            this.bookingInfos["peoplecount"] = "undefined"
                        } else {
                            this.bookingInfos["peoplecount"] = e.target.value
                        }
                        localStorage.setItem("booking_infos", JSON.stringify(this.bookingInfos))
                        this.setInfoTable()
                    }
                })
            }
            const durationInput = document.querySelector("select[name='duration']")
            if( durationInput ) {
                durationInput.addEventListener("change", (e) => {
                    localStorage.setItem("booking_duration", e.target.value)
                    this.bookingDuration = e.target.value
                    if( this.productCat === "Kunstevent" ) {
                        this.setPeoplecount(e.target.value)
                    }
                    if( this.productCat === "Kunstevent" && e.target.value === "" ) {
                        this.bookingInfos["peoplecount"] = "undefined"
                        localStorage.setItem("booking_infos", JSON.stringify(this.bookingInfos))
                    }
                    this.setInfoTable()
                })
            }
        }

        // Booking - Step 3: Payment
        runBookingStep3() {
            // renderExtrasCheckboxes()
            // if( this.bookingExtras ) {
            //     renderExtrasSummary()
            // }

            // function renderExtrasCheckboxes() {
            //     const extrasListDOM = document.querySelector(".extras__list")
            //     this.bookingExtras = JSON.parse(localStorage.getItem("booking_extras"))
            //     this.bookingExtras.forEach(extra => {
            //         const extraCheckboxTemplate = document.getElementById("extras__item").content.cloneNode(true)
    
            //         // General
            //         const extrasItem = extraCheckboxTemplate.querySelector(".extras__item")
            //         extrasItem.id = extra["id"]
            //         extrasItem.htmlFor = "checkbox" + extra["id"]
            //         extrasItem.dataset.extra = extra["id"]
    
            //         // Price
            //         const extrasPrice = extraCheckboxTemplate.querySelector("p.extra__price")
            //         extrasPrice.innerText = extra["price"] + "€"
    
            //         // Description
            //         const extrasLabel = extraCheckboxTemplate.querySelector("label.new__checkbox")
            //         extrasLabel.innerText = extra["description"]
            //         extrasLabel.htmlFor = "checkbox" + extra["id"]
    
            //         // Input
            //         const extrasInput = extraCheckboxTemplate.querySelector("input")
            //         extrasInput.value = extra["id"]
            //         extrasInput.id = "checkbox" + extra["id"]
    
    
            //         extrasListDOM.appendChild(extraCheckboxTemplate)
            //     })
            // }
            // function renderExtrasSummary() {
            //     const extrasListDOM = document.querySelector(".info__payment .summary__facts")
            //     if( extrasListDOM ) {
            //         this.bookingExtras = JSON.parse(localStorage.getItem("booking_extras"))
            //         this.bookingExtras.forEach(extra => {
            //             const extraSummaryTemplate = document.getElementById("price__extra").content.cloneNode(true)
        
            //             // General
            //             const extrasItem = extraSummaryTemplate.querySelector(".price__extra")
            //             extrasItem.dataset.extra = extra["id"]
            //             if( extra["price"] < 0) {
            //                 extrasItem.classList.add("--price-negative")
            //             }
        
            //             // Title
            //             const extrasTitle = extraSummaryTemplate.querySelector(".title")
            //             extrasTitle.innerText = "Extra: " + extra["title"]
        
            //             // Price
            //             const extrasPrice = extraSummaryTemplate.querySelector(".value")
            //             extrasPrice.innerText = extra["price"] + "€"
        
            //             extrasListDOM.appendChild(extraSummaryTemplate)
            //         })
            //     }
            //     this.setInfoTable()
            // }


            // Booking - Step 3: Extras
            // Price Summary

            // function showSummaryExtra(id, show=true) {
            //     const extrasSummaryFields = document.querySelectorAll(".summary__facts .price__extra")
            //     if( show ) {
            //         extrasSummaryFields[(id-1)].classList.add("--active")
            //     } else {
            //         extrasSummaryFields[(id-1)].classList.remove("--active")
            //     }
            // }
            // const bookingExtrasCheckboxes = document.querySelectorAll(".extras__list input")
            // bookingExtrasCheckboxes.forEach(checkbox => {
            //     checkbox.addEventListener("change", e => {
            //         showSummaryExtra(e.target.value, e.target.checked)
            //         updateExtra(e.target)
            //         this.updateDuration()
            //     })
            // })
            // const bookingDurationSelect = document.querySelector("select[name='duration']")
            // if( bookingDurationSelect ) {
            //     bookingDurationSelect.addEventListener("change", e => {
            //         this.updateDuration()
            //     })
            // }
            // function updateExtra(checkbox) {
            //     this.bookingExtras = JSON.parse(localStorage.getItem("booking_extras"))
            //     this.bookingExtras[checkbox.value-1]["selected"] = checkbox.checked
            //     localStorage.setItem("booking_extras", JSON.stringify(this.bookingExtras))
            //     this.setInfoTable()
            // }
            
            // function getExtrasAsString() {
            //     let extrasString = ""
            //     this.bookingExtras.forEach(extra => {
            //         if( extra["selected"] === true ) {
            //             if( extrasString !== "" ) {
            //                 extrasString += ", "
            //             }
            //             if( extra["selected"] === true ) {
            //                 extrasString += extra["title"]
            //             }
            //         }
            //     })
            //     return extrasString
            // }
            
            
        }

        // Booking - Step 4: Proof
        runBookingStep4() {
            this.waitForElm('.wpcf7-response-output').then((elm) => {
                window.location.href = `https://www.atelier-delatron.shop/buchung-bestaetigt?color=${this.colorName}&booking_product=${encodeURIComponent(this.productName).replace('%20','+')}&booking_category=${this.productCat}&booking_value=${this.productPrice}`
            });
        }

        // Booking - Step 5: Bestätigung
        runBookingStep5() {
            this.waitForElm('.wpcf7-response-output').then((elm) => {
                window.location.href = "https://www.atelier-delatron.shop/buchung-bestaetigt?color=" + this.colorName
            });
        }

        waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector).innerText === "Vielen Dank für Buchung, Du wirst nun weitergeleitet.") {
                    return resolve(document.querySelector(selector));
                }
        
                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector).innerText === "Vielen Dank für Buchung, Du wirst nun weitergeleitet.") {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });
        
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }
        






        

        safeBookingData() {
            // Safe Kunstevent Prices in sessionStorage
            localStorage.setItem("booking_infos", JSON.stringify({}))

            // Safe Kunstevent Prices in sessionStorage
            let kunsteventPrices = []
            document.querySelectorAll(".kunstevent_price_hour").forEach(price => {
                kunsteventPrices.push(parseInt(price.innerText))
            })
            const kunsteventInfos = {}
            kunsteventInfos["prices_hour"] = kunsteventPrices
            kunsteventInfos["price_food"] = parseInt(document.getElementById("kunstevent_price_food").innerText)
            kunsteventInfos["price_material"] = parseInt(document.getElementById("kunstevent_price_material").innerText)

            localStorage.setItem("kunstevent_infos", JSON.stringify(kunsteventInfos))
            return true
        }

        safePrices() {
            const geburtstagInfos = {
                "price_base": parseInt(document.getElementById("price__base").innerText),
                "price_hour": parseInt(document.getElementById("price__hour").innerText),
                "price_person": parseInt(document.getElementById("price__person").innerText)
            }
            localStorage.setItem("geburtstag_infos", JSON.stringify(geburtstagInfos))
            return true
        }







        setCheckboxError(checkbox, errorMessage) {
            if(errorMessage === false) {
                checkbox.parentElement.classList.remove("--error")
                checkbox.parentElement.querySelector(".checkbox__error").innerText = ""
            } else {
                checkbox.parentElement.classList.add("--error")
                checkbox.parentElement.querySelector(".checkbox__error").innerText = errorMessage
            }
        }

        submitBooking() {
            let isValid = true
            const inputCheckboxes = document.querySelectorAll("input#checkbox1[type='checkbox']")
            inputCheckboxes.forEach(checkbox => {
                if(checkbox.required && !checkbox.checked) {
                    isValid = false
                    this.setCheckboxError(checkbox, "Du musst die Bedingung akzeptieren.")
                } else {
                    this.setCheckboxError(checkbox, false)
                }
            })
            if( isValid ) {
                if( this.sendEmail() ) {
                    this.runBookingStep4()
                    localStorage.setItem("is_booked", true)
                    document.getElementById("submit__button").click()
                }
            }
        }

        sendEmail() {
            const childName = this.bookingInfos['childname']
            const childAge = this.bookingInfos['childage']
            const customerMessage = this.bookingInfos['message'] !== "" ? this.bookingInfos['message'] : 'k. A.'
            const bookingCustomer = {
                "firstname" : this.bookingInfos["firstname"],
                "lastname" : this.bookingInfos["lastname"],
                "phone" : this.bookingInfos["phone"],
                "email" : this.bookingInfos["email"] 
            }
            let bookingData = {}
            if( this.productCat === "Kurs" ) {
                bookingData = {
                    "data" : {
                        "course" : {
                            "price" : this.productPrice,
                            "name" : this.productName,
                            "startdate" : document.getElementById("summary__date").innerText,
                            "time" : document.getElementById("course__time").innerText,
                            "day" : document.getElementById("course__day").innerText, 
                            "session_count" : document.getElementById("course__session__count").innerText,
                            "session_duration" : document.getElementById("course__session__duration").innerText
                        },
                        "customer" : {
                            "childname" : childName,
                            "childage" : childAge,
                            "message" : customerMessage
                        }
                    }
                }
                if( this.productGroup === "KINDER" ) {
                    sibSendEmail("booking_course_kinder", bookingCustomer, bookingData)
                } else {
                    sibSendEmail("booking_course_erwachsene", bookingCustomer, bookingData)
                }
            }
            if( this.productCat === "Workshop" ) {
                const workshopTermin = document.getElementById("summary__date").innerText
                let workshopTermin2 = document.getElementById("summary__date2")
                if( workshopTermin2 ) {
                    workshopTermin2 = workshopTermin2.innerText
                } else {
                    workshopTermin2 = "";
                }
                bookingData = {
                    "data" : {
                        "workshop" : {
                            "price" : this.productPrice,
                            "name" : this.productName,
                            "termin" : workshopTermin,
                            "termin2" : workshopTermin2,
                        },
                        "customer" : {
                            "childname" : childName,
                            "message" : customerMessage
                        }
                    }
                }
                sibSendEmail("booking_workshop", bookingCustomer, bookingData)
            }
            if( this.productCat === "Geburtstag" ) {
                const birthdayTermin = document.getElementById("summary__date").innerText
                let birthdayExtras
                if( this.extrasIsSelected() ) {
                    birthdayExtras = getExtrasAsString()
                } else {
                    birthdayExtras = "k. A."
                }
                bookingData = {
                    "data" : {
                        "birthday" : {
                            "price" : this.productPrice,
                            "name" : this.productName,
                            "termin" : birthdayTermin,
                            "people_count" : this.bookingInfos["peoplecount"],
                            "extras" : birthdayExtras
                        },
                        "customer" : {
                            "childname" : childName,
                            "message" : customerMessage
                        }
                    }
                }
                sibSendEmail("request_birthday", bookingCustomer, bookingData)
            }
            if( this.productCat === "Kunstevent" ) {
                const eventTermin = document.getElementById("summary__date").innerText
                bookingData = {
                    "data" : {
                        "event" : {
                            "price" : this.productPrice,
                            "name" : this.productName,
                            "termin" : eventTermin,
                            "people_count" : this.bookingInfos["peoplecount"],
                            "occasion" : this.bookingInfos["eventtype"],
                            "duration" : this.bookingInfos["duration"],
                        },
                        "customer" : {
                            "message" : customerMessage
                        }
                    }
                }
                sibSendEmail("request_event", bookingCustomer, bookingData)
            }
            if( this.productCat === "Ferienprogramm" ) {
                const workshopTermin = document.getElementById("summary__date").innerText
                let workshopTermin2 = document.getElementById("summary__date2")
                if( workshopTermin2 ) {
                    workshopTermin2 = workshopTermin2.innerText
                } else {
                    workshopTermin2 = "";
                }
                bookingData = {
                    "data" : {
                        "workshop" : {
                            "price" : this.productPrice,
                            "name" : this.productName,
                            "termin" : workshopTermin,
                            "termin2" : workshopTermin2,
                        },
                        "customer" : {
                            "childname" : childName,
                            "childage" : childAge,
                            "message" : customerMessage
                        }
                    }
                }
                sibSendEmail("booking_ferienprogramm", bookingCustomer, bookingData)
            }
            return true
        }






        resetLocalstorage() {
            localStorage.removeItem("booking_infos")
            localStorage.removeItem("booking_extras")
            localStorage.removeItem("booking_dates")
            localStorage.removeItem("booking_times")
            localStorage.removeItem("booking_duration")
            localStorage.removeItem("is_booked")
        }

    }



    const bookPage = document.querySelector(".book")
    if( bookPage ) {
        const booking = new Booking()
    }

})