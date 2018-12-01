/*
WEBTECH 
Exercise 3.5 - Puzzle Game
Michael Gundacker 1646765
*/

function checkWon(){
	console.log("Check won...");
	let fitCount = 0;
	for(let frame of frames){
		if(frame.firstChild.getAttribute('src') === frame.dataset.result){
			fitCount++;
		}
		console.log(frame.firstChild);
	}
	if(fitCount === 4){
		window.alert("!!! GRATULATION !!!\nSie haben gewonnen!");
	}
}

function moving(e){
	dragObject.style.position = 'fixed';
	dragObject.style.top = e.clientY + 5;
	dragObject.style.left = e.clientX + 5;
}

function frameHandler(e){
	console.log("clicked Frame...");
	
	//If empty frame, append Picture to Frame
	if(e.currentTarget.innerHTML === '' && dragging){
		console.log("Frame empty, place picture....");
		
		e.currentTarget.appendChild(dragObject);
		dragObject.dataset.placed = 'true';
		stopMoving();
		checkWon();
	}
	else{
		console.log("Currently no picture dragging....");
	}
}

function pieceHandler(e){
	console.log("clicked Piece...");
	
	//Click picture within a frame while dragging another picture
	if(dragging && e.currentTarget.dataset.placed === 'true'){
		for(let frame of frames){
			if(frame.firstChild === e.currentTarget){
				e.currentTarget.dataset.placed = 'false';
				frame.removeChild(e.currentTarget);
				document.querySelector('div[id=puzzleSource]').appendChild(e.currentTarget);
			}
		}
		//ignore since frame is full
	}
	//Click picture of picture source while dragging currently
	else if(dragging){
		stopMoving();
	}
	//Click picture within a frame without dragging currently
	else if(e.currentTarget.dataset.placed === 'true'){
		for(let frame of frames){
			if(frame.firstChild === e.currentTarget){
				e.currentTarget.dataset.placed = 'false';
				frame.removeChild(e.currentTarget);
				document.querySelector('div[id=puzzleSource]').appendChild(e.currentTarget);
			}
		}
	}
	////Click picture of picture source without dragging currently
	else{
		console.log(e.currentTarget);
		dragObject = e.currentTarget;
		dragging = true;
		window.addEventListener('mousemove', moving);
	}
}

//Stop dragging the picture and move back to picture source
function stopMoving(){
	console.log("stop moving....");
	window.removeEventListener('mousemove', moving);
	dragObject.removeAttribute("style");
	dragObject = undefined;
	dragging = false;
}

let pieces = document.querySelectorAll('div[id=puzzleSource] img');
let frames = document.querySelectorAll('.puzzlePic');

let dragging = false;
let dragObject;

for(let pic of pieces){
	pic.addEventListener('click', pieceHandler);
}

for(let frame of frames){
	frame.addEventListener('click', frameHandler);
}
