/*
Webtech Übung 4.5 - Michael Gundacker
*/

/*
Laut Übung:
Problem ist, dass der Eventhandler nicht mehr auf das aktuelle Objekt bezogen ist
Verwende let t = this um das Objekt zu speichern
Wäre dann sowas wie addEventListener('click', this.t.hideImg)
*/

class JsonGallery
{
    //Wrapper Element, ein DIV in welches man sich reinschreiben soll
    constructor(wrapperElement)
    {
        console.log('run constructor....')
        this.url = location.href.replace("gallery.html","");
        this.files = ["gallery_pg1.json","gallery_pg2.json"];	
        this.wrapperElement = wrapperElement;
        
        //TODO: initialize gallery 
        this.currPage = 0;  //Remember current page within Gallery

        //Create DisplayDIV element and append to HTML body
        let displayDIV = document.createElement('div')
        displayDIV.setAttribute('id', 'displayDIV')
        document.querySelector('body').appendChild(displayDIV)

        let bigImg = document.createElement('img')
        bigImg.setAttribute('class', 'bigIMG')
        displayDIV.appendChild(bigImg)

        let paragraphDisplayDIV = document.createElement('p')
        paragraphDisplayDIV.setAttribute('class', 'desc')
        displayDIV.appendChild(paragraphDisplayDIV)


        let intervalID = undefined


        this.getJSON(this.currPage) 
        

        
    }

    //Method to check if response status was ok
    checkResponseStatus(response){
        if(response.ok){
            return Promise.resolve(response)
        }
        else{
            return Promise.reject(new Error(response.statusText))
        }
    }

    //Method to format response to JSON format
    //Called after response status was checked
    json(response){
        return response.json()
    }

    //Method to fetch JSON file, then check status and process response consecutively
    //Fetch gibt ein Promise zurück. Das promise enthält accept und recject
    //Methoden müssen nacheinander abgearbeitet werden
    getJSON(pageNo){
        console.log(this.url + this.files[pageNo])
        fetch(this.url + this.files[pageNo])
            .then(this.status)
            .then(this.json)
            .then(this.loadImages)
            .then(this.initGallery)
            /*
            Still ERROR here
            Could not fix it after hours :-(
            */
    }

    loadImages(xhrResponse){
        
        console.log('run loadImages()....')
        //Now create new Children of Gallery and append to DOM
        for (let i in xhrResponse) {
            let image = document.createElement('img')
            image.src = xhrResponse[i].dataSmall
            image.dataset.large = xhrResponse[i].dataBig
            image.alt = xhrResponse[i].description
            document.querySelector('div[id=jsonGallery]').appendChild(image)
        }
        console.log('Images loaded !')
    }

    calcNextPage(){
        if(this.currPage == 0){
            this.currPage = 1
            return 1
        }
        this.currPage = 0
        return 0
    }

    //Previous gallery functions + new buttons
    
    showImg(e) {
        console.log('showImage()')
        document.querySelector("#displayDIV .bigIMG").src=e.target.dataset.large;
        document.querySelector("#displayDIV .desc").innerHTML=e.target.alt;
        document.getElementById("displayDIV").style.display="block";
     }
     
     hideImg(e) {
        document.getElementById("displayDIV").style.display="none";
     }
     
     getCurrentImageIdx() {
         let bigImgSrc = document.querySelector("#displayDIV > img").getAttributeNode("src").value;
     
         let smallImgs = document.querySelectorAll("div[id=jsonGallery] > img");
         for(let i=0; i<smallImgs.length;i++) {
             if (smallImgs[i].dataset.large === bigImgSrc) return i+1; // nth-child starts at 1
         }
     }
     
     prev() {
         let images = document.querySelectorAll('div[id=jsonGallery] img');
         let pos = getCurrentImageIdx();
         pos = (pos+1)%images.length;
         document.querySelector("#displayDIV .bigIMG").src=images[pos].dataset.large;
         document.querySelector("#displayDIV .desc").innerHTML=images[pos].alt;
     }
     
     next() {
         let images = document.querySelectorAll('div[id=jsonGallery] img');
         let pos = this.getCurrentImageIdx();
         pos = (pos)%images.length;
         document.querySelector("#displayDIV .bigIMG").src=images[pos].dataset.large;
         document.querySelector("#displayDIV .desc").innerHTML=images[pos].alt;
     }
     
     playPause() {
         if (this.intervalID) {
             clearInterval(this.intervalID);
             this.intervalID = null;
         }
         else
             this.intervalID = setInterval(this.next,2000);
     }

     prevPage(){
        console.log("prev Page")
    }

    nextPage(){
        console.log("next Page")
    }
     
     initGallery()
     {
         console.log('Init Gallery !')
         document.querySelector(".bigIMG").addEventListener("click", this.hideImg);
     
         let prevb = document.createElement("button");
         prevb.innerText="prev";
         prevb.addEventListener("click", this.prev);
     
         let nextb = document.createElement("button");
         nextb.innerText="next";
         nextb.addEventListener("click", this.next);
     
         let playPauseb = document.createElement("button");
         playPauseb.innerText="play/pause";
         playPauseb.addEventListener("click", this.playPause);
     
         let exitb = document.createElement("button");
         exitb.innerText="exit";
         exitb.addEventListener("click", this.hideImg);

         let prevPageb = document.createElement("button")
         prevPageb.innerText = "next page"
         //prevPageb.addEventListener("click", prevPage)
     
         let nextPageb = document.createElement("button")
         nextPageb.innerText = "next page"
         //nextPageb.addEventListener("click", nextPage)
     
         let controls = document.createElement("DIV");
         controls.appendChild(prevb);
         controls.appendChild(nextb);
         controls.appendChild(playPauseb);
         controls.appendChild(exitb);
         controls.appendChild(prevPageb);
         controls.appendChild(nextPageb);
         document.getElementById("displayDIV").appendChild(controls);
     
         let images = document.querySelectorAll('div[id=jsonGallery] img');
         console.log(images)
         for (let i=0; i< images.length; i++) {
            images[i].addEventListener("click", showImg);
            console.log("add image listener")
         }
     }

}
