jQuery( document ).ready(function($) {

    // Set a Cookie
    function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }

    function getCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded .split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }


    const newsletterIsOnPage = document.querySelectorAll(".newsletter__field").length > 0
    if( newsletterIsOnPage ) {

        document.querySelector('.newsletter__image').addEventListener("click", () => {
            document.querySelector('.popup--newsletter').showModal()
        })

        const popupNewsletter = document.querySelector(".popup--newsletter")
        if(popupNewsletter) {
            setTimeout(function() {
                if(getCookie("newsletter_opened") != "true") {
                    popupNewsletter.showModal()
                }
            }, 1000*5)
            popupNewsletter.addEventListener('close', () => {
                console.log('close')
                setCookie('newsletter_opened', true, 14);
            })
        }
        




        
        const newsletterEmailButton = document.querySelector(".newsletter-form .button")
        if( newsletterEmailButton ) {
            newsletterEmailButton.addEventListener("click", () => {
                const emailValue = document.getElementById("sib-email").value
                newsletterEmailButton.href = newsletterEmailButton.href + "?email=" + emailValue
                // sessionStorage.setItem("newsletter_email", emailValue)
            })
        }
    
        // document.querySelector("input.sib-email-area").value = sessionStorage.getItem("newsletter_email")
        // transfereEmail = document.getElementById("transfered__email").innerText
        // document.querySelector("input.sib-email-area").value = transfereEmail
    
    
    
        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector) !== null) {
                    return resolve(document.querySelector(selector));
                }
        
                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector) !== null) {
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
    
        waitForElm('.sib-alert-message-success').then((elm) => {
            document.querySelector(".newsletter__content").style.display = "none"
            document.querySelector(".newsletter__success").style.display = "flex"
        });
    
    
    
    

    



        // function setWithExpiry(key, value, ttl) {
        //     const now = new Date()
    
        //     // `item` is an object which contains the original value
        //     // as well as the time when it's supposed to expire
        //     const item = {
        //         value: value,
        //         expiry: now.getTime() + ttl,
        //     }
        //     localStorage.setItem(key, JSON.stringify(item))
        // }

        // function getWithExpiry(key) {
        //     const itemStr = localStorage.getItem(key)
        //     // if the item doesn't exist, return null
        //     if (!itemStr) {
        //         return null
        //     }
        //     const item = JSON.parse(itemStr)
        //     const now = new Date()
        //     // compare the expiry time of the item with the current time
        //     if (now.getTime() > item.expiry) {
        //         // If the item is expired, delete the item from storage
        //         // and return null
        //         localStorage.removeItem(key)
        //         return null
        //     }
        //     return item.value
        // }

        // function closeNewsletterPopup() {
        //     document.querySelector(".newsletter__popup").close()
        //     setWithExpiry("newsletter_opened", "true", 1000*60*60*24)
        // }
        // $(".newsletter__content input[type='submit']").click(function() {
        //     closeNewsletterPopup();
        // })
        // $(".newsletter__popup input[type='submit']").click(function() {
        //     closeNewsletterPopup();
        // })

    }

})