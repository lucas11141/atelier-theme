class Form {

    constructor(formElement, validation) {
        console.log(validation)
        this.validation = validation
        this.formInputs = formElement.querySelectorAll("input:not([type='radio']), select, textarea")
    }

    validateForm() {
        let isValidArray = []
        this.formInputs.forEach((input, index) => {
			const inputIsValid = this.validateInput(input, this.validation[index])
            isValidArray.push(inputIsValid)
        })

        let formIsValid = true
        for(const value of isValidArray) {
            if(value === false) {
                formIsValid = false
            }
        }
        if(formIsValid === true ) {
            return true
        }
        return false
    }

    validationSchema(inputValue, configKey, configValue) {
        if(configKey === "isRequired" && configValue === false) {
            return "notRequired"
        }
        switch(configKey) {
            case "isRequired":
                return inputValue.trim().length !== 0
            case "minLength":
                return inputValue.trim().length >= configValue
            case "maxLength":
                return inputValue.trim().length <= configValue
            case "isEmail":
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(inputValue);
            case "isNumber":
                return /[0-9]/.test(inputValue);
            case "minNumber":
                return inputValue >= configValue
            case "maxNumber":
                return inputValue <= configValue
            default:
                throw new Error( `Validation Schema not known, please add key ${configKey} to validationSchema`);
        }
    }

    validateInput(input, validationConfig) {
        let isRequired = true
        let isValid = true
        let errorMessage
        for(let item in validationConfig) {
            let configKey = item
            let configValue = validationConfig[item][0]
            errorMessage = validationConfig[item][1]
            isValid = this.validationSchema(input.value, configKey, configValue)
            if(isValid === "notRequired") {
                isValid = true
                isRequired = false
                continue
            }
            if(!isValid) {
                break
            }
        }
        if(isRequired) {
            if(isValid) {
                this.setError(input, false)
                return true
            } else {
                this.setError(input, errorMessage)
                return false
            }
        } else {
            if(input.value !== "") {
                if(isValid) {
                    this.setError(input, false)
                    return true
                } else {
                    this.setError(input, errorMessage)
                    return false
                }
            }
            if(!isValid) {
                this.setError(input, false)
            }
            return true
        }
    }

    setError(input, errorMessage) { 
        if(errorMessage === false) {
            input.parentElement.classList.remove("--error")
            input.parentElement.querySelector(".input__error").innerText = ""
        } else {
            input.parentElement.classList.add("--error")
            input.parentElement.querySelector(".input__error").innerText = errorMessage
            //input.parentElement.querySelector(".input__error").innerText = errorMessage
        }
    }

    getValues() {
        let returnObj = {}
        this.formInputs.forEach((input) => {
            const key = input.name
            Object.assign(returnObj, {
                [key]: input.value,
            })
        })
        return returnObj
    }

    setValues(valuesObj) {
        if(valuesObj !== null) {
            this.formInputs.forEach((input) => {
                if( valuesObj[input.name] != "" && valuesObj[input.name] != undefined) {
                    input.value = valuesObj[input.name]
                }
            })
        }
    }

}