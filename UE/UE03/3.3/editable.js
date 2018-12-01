/*
WEBTECH 
Exercise 3.3 - Making a HTML Page Editable
Michael Gundacker 1646765
*/

//Get all sections into an array
let sections = document.querySelectorAll('section');

//Horizontal line Element
let newHr = document.createElement("hr");

//Form Element
let newForm = document.createElement("form");

//Text Input element - for h1 text
let newTextInput = document.createElement("input");
newTextInput.style.display = "block";

//Text Area element - for paragraph within section 
let newTextArea = document.createElement("textarea");
newTextArea.style.display = "block";

//Selection Element
let newSelect = document.createElement("select");
newSelect.style.display = "block";
loadSelection();
newSelect.addEventListener("change", loadContent);

//Submit Input element - to submit changes to HTML
let newSubmit = document.createElement("input");
newSubmit.type = "submit";
newForm.addEventListener("submit", writeContent);

//Append all new nodes to their proper position
sections[0].parentNode.appendChild(newHr);
sections[0].parentNode.appendChild(newForm);
newForm.appendChild(newSelect);
newForm.appendChild(newTextInput);
newForm.appendChild(newTextArea);
newForm.appendChild(newSubmit);


function loadContent(){
	console.log("load Content...");
	let index = newSelect.selectedIndex;
	let options = newSelect.options;
	newTextInput.value = options[index].text;
	
	newTextArea.value = sections[index].innerHTML;
}

function loadSelection(){
	console.log("load selected Content...");
	//First, remove all option childs
	while (newSelect.firstChild) {
	    newSelect.removeChild(newSelect.firstChild);
	}
	//Get all h1 headings of all sections as option
	for(let i = 0; i < sections.length; i++){
		let h1 = sections[i].querySelector('h1');
		let option = document.createElement('option');
		option.setAttribute("value", h1.innerHTML);
		console.log('new option value: ' + h1.innerHTML);
		option.innerHTML = h1.innerHTML;
		console.log('new option innerHTML: ' + h1.innerHTML);
		newSelect.appendChild(option);
	}
	//Now clear input fields for next changes
	newTextInput.value = '';
	newTextArea.value = '';
	newSelect.selectedIndex = -1;	//To deselect on load and reload
}

function writeContent(event){
	console.log("write Content...");
	//preventDefault() is needed to prevent the page to be re-navigated to it's source.
	//See https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault();
	
	console.log("write content....");
	let index = newSelect.selectedIndex;
	console.log('newSelect selected index: ' + index);
	let options = newSelect.options;
	console.log('newSelect options: ' + options [0]);
	sections[index].innerHTML = newTextArea.value;
	checkHeader(index);
	loadSelection();	//Reload Selection after update
}

function checkHeader(index){
	console.log("check header....");
	if(sections[index].querySelector('h1') === null){
		console.log("Header removed!!!!!");
		let newHeader = document.createElement('h1');
		newHeader.innerHTML = newTextInput.value;
		sections[index].insertBefore(newHeader, sections[index].firstChild);
	}
	else{
		sections[index].querySelector('h1').innerHTML = newTextInput.value;
	}
}

