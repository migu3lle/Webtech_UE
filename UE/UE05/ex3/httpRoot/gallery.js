/*
Webtech Übung 4.4 - Michael Gundacker
*/

function showImg(e) {
    document.querySelector("#displayDIV .bigIMG").src=e.target.dataset.large;
    document.querySelector("#displayDIV .desc").innerHTML=e.target.alt;
    document.getElementById("displayDIV").style.display="block";
 }
 
 function hideImg(e) {
    document.getElementById("displayDIV").style.display="none";
 }
 
 function getCurrentImageIdx() {
     let bigImgSrc = document.querySelector("#displayDIV > img").getAttributeNode("src").value;
 
     let smallImgs = document.querySelectorAll(".gallery > img");
     for(let i=0; i<smallImgs.length;i++) {
         if (smallImgs[i].dataset.large === bigImgSrc) return i+1; // nth-child starts at 1
     }
 
 }
 
 function prev() {
     let images = document.querySelectorAll('.gallery img');
     let pos = getCurrentImageIdx();
     pos = (pos+1)%images.length;
     document.querySelector("#displayDIV .bigIMG").src=images[pos].dataset.large;
     document.querySelector("#displayDIV .desc").innerHTML=images[pos].alt;
 }
 
 function next() {
     let images = document.querySelectorAll('.gallery img');
     let pos = getCurrentImageIdx();
     pos = (pos)%images.length;
     document.querySelector("#displayDIV .bigIMG").src=images[pos].dataset.large;
     document.querySelector("#displayDIV .desc").innerHTML=images[pos].alt;
 }
 
 function playPause() {
     if (intervalID) {
         clearInterval(intervalID);
         intervalID = null;
     }
     else
         intervalID = setInterval(next,2000);
 }
 
 
 function initGallery()
 {
     document.querySelector(".bigIMG").addEventListener("click", hideImg);
 
     let prevb = document.createElement("button");
     prevb.innerText="prev";
     prevb.addEventListener("click", prev);
 
     let nextb = document.createElement("button");
     nextb.innerText="next";
     nextb.addEventListener("click", next);
 
     let playPauseb = document.createElement("button");
     playPauseb.innerText="play/pause";
     playPauseb.addEventListener("click", playPause);
 
     let exitb = document.createElement("button");
     exitb.innerText="exit";
     exitb.addEventListener("click", hideImg);
 
     let controls = document.createElement("DIV");
     controls.appendChild(prevb);
     controls.appendChild(nextb);
     controls.appendChild(playPauseb);
     controls.appendChild(exitb);
     document.getElementById("displayDIV").appendChild(controls);
 
     let images = document.querySelectorAll('.gallery img');
     for (let i=0; i< images.length; i++) {
        images[i].addEventListener("click", showImg);
     }
 }
 
 let intervalID;
 
 function ImageLoader() {
     this.method = "GET";
     this.url = location.href.replace("gallery.html","");
     this.file = "gallery.json";
 }

 /*
 Laut Übung:
 Implementierung ist korrekt. 
 Man könnte noch httpRequest.timeout() setzen, hier nicht notwendig
 */
 
 ImageLoader.prototype = {
     constructor: ImageLoader,
 
     load: function(){
        console.log(location.href.replace("gallery.html",""))

         // Add your code here and call 'initGallery' after loading all images.
         let httpRequest = new XMLHttpRequest();
         //Start asynchronous ("true") HTTP Request
         httpRequest.open(this.method, this.url + this.file, true)
     
         //Define what to do on change of ReadyState
         httpRequest.onreadystatechange = function(){
             console.log("onReadyStateChanged invoked")
             
             //Check if request finished and response is ready
             if(httpRequest.readyState == 4){
                 //Check for return Status OK
                 if(httpRequest.status >= 200 && httpRequest.status < 300){
                     //Parse JSON file to receive elements as array
                     let myArray = JSON.parse(this.responseText)
                     console.log(myArray)

                     //Get DIV[class=gallery] from DOM
                     let gallery = document.querySelector('.gallery')
                     //Now create new Children of Gallery and append to DOM
                     for (let i in myArray) {
                         let image = document.createElement('img')
                         image.src = myArray[i].dataSmall
                         image.dataset.large = myArray[i].dataBig
                         image.alt = myArray[i].description
                         gallery.appendChild(image)
                        }
                    }
                    initGallery()
            }
        }
        //Now send XMLHttpRequest
        httpRequest.send(null)
    }
}
 
 imgLoader = new ImageLoader();
 imgLoader.load();
 