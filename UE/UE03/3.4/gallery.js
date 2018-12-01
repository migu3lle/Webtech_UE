/*
WEBTECH 
Exercise 3.4 - Image Gallery
Michael Gundacker 1646765
*/

function showImg(e) {
	currImgIndex = getImageIndex(e.target.dataset.large);
   	document.querySelector("#displayDIV .bigIMG").src = e.target.dataset.large;
   	document.querySelector("#displayDIV .desc").innerHTML = e.target.alt;
   	document.getElementById("displayDIV").style.display = "block";
}

function hideImg(e) {
	console.log(e.target);
	if(e.target === document.querySelector('button[name=nextButton]')){
		nextImg();
	}
	else if(e.target === document.querySelector('button[name=prevButton]')){
		prevImg();
	}
	else if(e.target === document.querySelector('button[name=playButton]')){
		console.log('Interval ID = ' + intervalID);
		if(intervalID === undefined){
			intervalID = window.setInterval(nextImg, 5000);
		}
		else{
			window.clearInterval(intervalID);
			intervalID = undefined;
		}
		console.log('Interval ID = ' + intervalID);
	}
	else if(e.target === document.querySelector('button[name=exitButton]')){
		clearInterval(intervalID);
		intervalID = undefined;
		e.currentTarget.style.display="none";
	}
	else{
	   	e.currentTarget.style.display="none";
		window.clearInterval(intervalID);
		intervalID = undefined;
	}
}

function nextImg(){
	console.log("Next image....");
	if(currImgIndex === images.length -1){
		currImgIndex = 0;
	}
	else{
		currImgIndex = currImgIndex + 1;
	}
	document.querySelector("#displayDIV .bigIMG").src = images[currImgIndex].dataset.large;
}

function prevImg(){
	console.log("Prev image....");
	if(currImgIndex === 0){
		currImgIndex = images.length - 1;
	}
	else{
		currImgIndex = currImgIndex - 1;
	}
	document.querySelector("#displayDIV .bigIMG").src = images[currImgIndex].dataset.large;
}

//Helper method
//to write image index to global variable currImgIndex when opening full screen
function getImageIndex(target){
	console.log('Current Target: ' + target);
	for(let i = 0; i < images.length; i++){
		if(images[i].dataset.large === target){
			return i;
		}
	}
}

function play(){
	
}

let currImgIndex;
let intervalID;
let images = document.querySelectorAll('.gallery img');
for (let i=0; i< images.length; i++) {
   	images[i].addEventListener("click", showImg);
}
let displayDIV = document.getElementById("displayDIV")
displayDIV.addEventListener("click", hideImg);


//Create Buttons
let nextButton = document.createElement('button');
nextButton.type = "button";
nextButton.innerHTML = "Next";
nextButton.name = "nextButton";

let prevButton = document.createElement('button');
prevButton.type = "button";
prevButton.innerHTML = "Previous";
prevButton.name = "prevButton";

let playButton = document.createElement('button');
playButton.type = "button";
playButton.innerHTML = "Play/Pause";
playButton.name = "playButton";

let exitButton = document.createElement('button');
exitButton.type = "button";
exitButton.innerHTML = "Exit";
exitButton.name = "exitButton";

displayDIV.appendChild(prevButton);
displayDIV.appendChild(playButton);
displayDIV.appendChild(exitButton);
displayDIV.appendChild(nextButton);





