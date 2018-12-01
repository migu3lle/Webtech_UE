/*
WEBTECH 
Exercise 3.2 - Calculating Glass Price
Michael Gundacker 1646765
*/

let widthNode = document.getElementById('width');
widthNode.addEventListener("input", update);
let heightNode = document.getElementById('height');
heightNode.addEventListener("input", update);
let thicknessNode = document.getElementsByName('thickness')
for(let i = 0; i < thicknessNode.length; i++){
	thicknessNode[i].addEventListener("change", update);
}

function calculate(width, height, thickness){
	let w = width / 100;
	let h = height / 100;
	let t = thickness / 1000;
	return w * h * t / 100;
}

function update(){
	let priceNode = document.getElementById('price');
	let thicknessNodeChecked = document.querySelector('input[name=thickness]:checked');
	
	if(widthNode.checkValidity() && heightNode.checkValidity() && thicknessNodeChecked !== null){
		priceNode.value = calculate(widthNode.value, heightNode.value, thicknessNodeChecked.value);
	}
	else{
		priceNode.value = ' -';
	}
}