
class JsonGallery{
    constructor(wrapperElement) {
        this.url = location.href.replace("gallery.html", "");
        this.files = ["gallery_pg1.json", "gallery_pg2.json"];
        this.actualPage = 0;
        this.intervalID = null;


        wrapperElement.innerHTML =
            `<div id="gallery">
             </div>
             <div id="galleryControls">
                 <input type="button" value="previuos Page" onclick="jsonGallery.prevPage()"></input>
                 <input type="button" value="next Page" onclick="jsonGallery.nextPage()"></input>
             </div>            
             <div id="displayDIV">
                 <img class="bigIMG" onclick="jsonGallery.hideImg()" src=""> 
                 <p class="desc">My Caption</p>
                 <div id="controls">
                    <input type="button" value="prev" onclick="jsonGallery.prev()"></input>
                    <input type="button" value="next" onclick="jsonGallery.next()"></input>
                    <input type="button" value="play/pause" onclick="jsonGallery.playPause()"></input>
                    <input type="button" value="exit" onclick="jsonGallery.hideImg()"></input>
                </div>
             </div>
           `;



       this.loadPage();

       //Caveman Mode

       this.hideImg = this.hideImg.bind(this);
       this.next = this.next.bind(this);
       this.prev = this.prev.bind(this);
       this.playPause = this.playPause.bind(this);
       this.getCurrentImageIdx = this.getCurrentImageIdx.bind(this);
       this.prevPage = this.prevPage.bind(this);
       this.nextPage = this.nextPage.bind(this);
       this.loadPage = this.loadPage.bind(this);

    }

    static showImg(e) {
        document.querySelector("#displayDIV .bigIMG").src=e.target.dataset.large;
        document.querySelector("#displayDIV .desc").innerHTML=e.target.alt;
        document.getElementById("displayDIV").style.display="block";
    }


    hideImg() {
    if (this.intervalID) {
        clearInterval(this.intervalID);
        this.intervalID = null;
    }
    document.getElementById("displayDIV").style.display="none";
}

    getCurrentImageIdx() {
    let bigImgSrc = document.querySelector("#displayDIV > img").getAttributeNode("src").value;

    let smallImgs = document.querySelectorAll("#gallery > img");
    for(let i=0; i<smallImgs.length;i++) {
        if (smallImgs[i].dataset.large === bigImgSrc) return i+1; // nth-child starts at 1
    }

}

    prev() {
    let images = document.querySelectorAll('#gallery img');
    let pos = this.getCurrentImageIdx();
    pos = (pos+1)%images.length;
    document.querySelector("#displayDIV .bigIMG").src=images[pos].dataset.large;
    document.querySelector("#displayDIV .desc").innerHTML=images[pos].alt;
}

    next() {
    let images = document.querySelectorAll('#gallery img');
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

    nextPage() {
        this.actualPage = (this.actualPage +1) %this.files.length;
        this.loadPage();
    }

    prevPage() {
        this.actualPage = (this.actualPage + this.files.length - 1) % this.files.length;
        this.loadPage();
    }

    loadPage() {

        let myNode = document.getElementById("gallery");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        fetch(this.files[this.actualPage])
            .then(function(response) {
                return response.json();
            }).then(gallery => {
            // Work with JSON data here
                var cGallery = document.getElementById("gallery");
                for (let picture in gallery) {
                    cGallery.innerHTML = cGallery.innerHTML + '<img src="' + gallery[picture].dataSmall + '" data-large="' + gallery[picture].dataBig + '" alt="' + gallery[picture].description + '">'
                }
                let images = document.querySelectorAll('#gallery img');
                for (let i=0; i< images.length; i++) {
                    images[i].addEventListener("click", JsonGallery.showImg);
                }
        }).catch(err => {
            // Do something for an error here
        });

    }


}
