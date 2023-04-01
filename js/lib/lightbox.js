jQuery( document ).ready(function($) {


    class Gallery {

        constructor(galleryElement) {
            this.galleryElement = galleryElement

            this.lightboxImages = this.galleryElement.querySelectorAll(".lightbox__image")
            this.imageData = []
    
            this.galleryIndex = 0
            this.popupIsOpened = false
    
            this.popupElement = this.galleryElement.querySelector(".gallery__popup")
            this.popupBackground = this.popupElement.querySelector(".popup__background")
            this.popupImage = this.popupElement.querySelector(".popup__image .image__img")
            this.imageMetaTitle = this.popupElement.querySelector(".meta__text h5")
            this.imageMetaCaption = this.popupElement.querySelector(".meta__text h6")
    
            this.thumbnailImages
    
            this.prevButton = this.popupElement.querySelector(".button__prev")
            this.nextButton = this.popupElement.querySelector(".button__next")

            this.setLightboxData()
            this.createEventHandlers()
        }

        





        // Bilder in Array Speichern
        setLightboxData() {
            this.lightboxImages.forEach((image, index) => {
                const data = {}
                data["src"] = image.dataset.lightboxSrc
                data["title"] = image.dataset.title
                data["caption"] = image.dataset.caption
                this.imageData.push(data)
                image.dataset.index = index
            });
            console.log(this.imageData)
        }


        // Event Listener
        createEventHandlers() {
            this.prevButton.addEventListener("click", () => this.move(-1) )
            this.nextButton.addEventListener("click", () => this.move(1) )
            this.lightboxImages.forEach(image => {
                image.addEventListener("click", (e) => {
                    // console.log(e.target)
                    // if( e.target.parentElement.classList.contains("swiper-slide-active") ) {
                        this.showImage(e) 
                    // }
                })
            })
            this.popupBackground.addEventListener("click", () => this.closePopup())
        }


        //Popup öffnen
        showImage(event) {
            this.updateImage(parseInt(event.target.dataset.index))
            if(this.popupIsOpened === false) {
                this.popupElement.classList.add("--opened")
                this.popupIsOpened = true
            }
        }


        //Popup schließen
        closePopup() {
            this.popupElement.classList.remove("--opened")
            this.popupIsOpened = false
        }


        // Bild vor/zurück
        move(moveIndex) {
            this.galleryIndex = this.galleryIndex + moveIndex
            if(this.galleryIndex > (this.imageData.length - 1)) {
                this.galleryIndex = 0;
            } else if(this.galleryIndex < 0) {
                this.galleryIndex = this.imageData.length - 1
            }
            this.updateImage(this.galleryIndex)
        }


        // Hauptbild aktualisieren
        updateImage(index) {
            this.popupImage.src = this.imageData[index]["src"]
            this.imageMetaTitle.innerText = this.imageData[index]["title"]
            this.imageMetaCaption.innerText = this.imageData[index]["caption"]
            this.galleryIndex = index
            // imageIndicator.innerHTML = `${(parseInt(index) + 1)} / ${images.length}`
            //toggleActive(index)
        }

    }


    // const lightboxElement = document.querySelector(".lightbox")
    // const gallery1 = new Gallery(lightboxElement)


    const galleryAusstellungBlocks = document.querySelectorAll(".galerie__ausstellung")
    if( galleryAusstellungBlocks.length > 0 ) {
        galleryAusstellungBlocks.forEach(block => {
            const gallery = new Gallery(block)
        })
    }








    function initGallery(element) {

    //     const lightboxImages = element.querySelectorAll(".lightbox__image")
    //     // const currentLighboxImage = element.querySelector(".swiper-slide-active .lightbox__image")
    //     let imageData = []

    //     let galleryIndex = 0
    //     let popupIsOpened = false

    //     // const thumbnailContainer = document.querySelector(".gallery__thumbnails")
    //     const popupElement = document.querySelector(".gallery__popup")
    //     const popupBackground = document.querySelector(".popup__background")
    //     const popupImage = document.querySelector(".popup__image .image__img")
    //     const imageMetaTitle = popupElement.querySelector(".meta__text h5")
    //     const imageMetaCaption = popupElement.querySelector(".meta__text h6")

    //     let thumbnailImages

    //     const prevButton = popupElement.querySelector(".button__prev")
    //     const nextButton = popupElement.querySelector(".button__next")
    //     // const imageIndicator = document.querySelector(".gallery__indicator")

    //     // createImages()
    //     setLightboxData()
    //     createEventHandlers()





    //     // Bilder in Array Speichern
    //     function setLightboxData() {
    //         lightboxImages.forEach((image, index) => {
    //             const data = {}
    //             data["src"] = image.dataset.src
    //             data["title"] = image.dataset.title
    //             data["caption"] = image.dataset.caption
    //             imageData.push(data)
    //             image.dataset.index = index
    //         });
    //         console.log(imageData)
    //     }


    //     // Event Listener
    //     function createEventHandlers() {
    //         prevButton.addEventListener("click", () => move(-1) )
    //         nextButton.addEventListener("click", () => move(1) )
    //         lightboxImages.forEach(image => {
    //             image.addEventListener("click", (e) => showImage(e) )
    //         })
    //         // currentLighboxImage.addEventListener("click", (e) => {
    //         //     e.target.dataset.index
    //         // })
    //         popupBackground.addEventListener("click", () => closePopup())
    //     }


    //     //Popup öffnen
    //     function showImage(event) {
    //         updateImage(parseInt(event.target.dataset.index))
    //         if(popupIsOpened === false) {
    //             popupElement.classList.add("--opened")
    //             popupIsOpened = true
    //         }
    //     }


    //     //Popup schließen
    //     function closePopup() {
    //         popupElement.classList.remove("--opened")
    //         popupIsOpened = false
    //     }


    //     // Bild vor/zurück
    //     function move(moveIndex) {
    //         galleryIndex = galleryIndex + moveIndex
    //         if(galleryIndex > (imageData.length - 1)) {
    //             galleryIndex = 0;
    //         } else if(galleryIndex < 0) {
    //             galleryIndex = imageData.length - 1
    //         }
    //         updateImage(galleryIndex)
    //     }


    //     // Hauptbild aktualisieren
    //     function updateImage(index) {
    //         popupImage.src = imageData[index]["src"]
    //         imageMetaTitle.innerText = imageData[index]["title"]
    //         imageMetaCaption.innerText = imageData[index]["caption"]
    //         galleryIndex = index
    //         // imageIndicator.innerHTML = `${(parseInt(index) + 1)} / ${images.length}`
    //         //toggleActive(index)
    //     }

    // }

    }


})