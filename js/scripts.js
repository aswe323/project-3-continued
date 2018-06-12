/*
 * TO-ADD:
 *
 *	completed: on page load make the first text field focus
 *	completed:when the 'outer' option is selected in the 'job role' drop down menu, make a text field apper
 *		*set field placeholder to 'you job here'
 *		*set field id to 'outer-title
 *	completed:If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate" Grey," and "Gold."
 *
 *	conpleted:If the user selects "Theme - I <3 JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
 *
 *	complete:for the activities, disable activities that overlap with the users choices.
 *		*make sure they undisabled when the user regrets his decision :P
 *		*make a total cost field in the buttom
 *--->	TODO:make sure to update the lists when  all the current todo's are done :3
 *
 * 	TODO:hide the color menu when the desgin isnt selected yet.
 * 	TODO:hide payment options that arent selected, and disable he 'select payment option' pre selection text.
 *	KNOWN BUGS:
 *		
 *	TO REFACTOR:
 *		TODO:refactor the disableOther function to be more concise. (high order function?)
 * */
//accessing neccesery elements
const firstInput = document.querySelector('input');//first input element
const titleSelect = document.getElementById('title');//job rule menu
const textArea = document.querySelector("#other-title");//text area below job rule menu
//design menu acceses
const designMenu = document.querySelector("#design");// design style menu
const colorMenu = document.querySelector("#color"); // color menu 
// checkboxes in the activities form
const checkBoxes = document.querySelectorAll('.activities input');
//activities form
const checkBoxForm =document.querySelector('.activities');
//labels of check boxes
const checkBoxLabels = document.querySelectorAll(".activities label");
//acces to the payment options menu
const paymentOptions = document.querySelector("#payment");
const paymentOptionsSelectables = paymentOptions.querySelectorAll('option');
//acess to payment divs
const creditCardDiv = document.querySelector('.credit-card');//credit card div
const paymentDivs= paymentOptions.parentNode.querySelectorAll('fieldset>div');//all divs in the payment fieldset
/*-------------------------------------------------|
 *              event listeneers                   |
 *-------------------------------------------------|
 */

titleSelect.addEventListener('change', event => {  //if other is selected then display a textarea if its not selected then  hide it
		if (event.target.value === "other"){
			textArea.style.display="";
		}else{
			textAreaHide();
		}
	}
)

var main = false;
checkBoxForm.addEventListener('change', event =>{  //event listener for specific button groups
	const tNineToTwelve = [checkBoxes[1] , checkBoxes[3]];//arrey of checkbox elements, Tusday nine am to 12pm
	const tOneToFour = [checkBoxes[2] , checkBoxes[4]];//arrey of checkboxes elements, tusday one pm to four pm
	disableOther(event.target, tNineToTwelve);	
	disableOther(event.target, tOneToFour);
	//use a reduce function to check if the element is checked if true and pos 0 then add 200, else if true add 100, else, nothing;
	let totalCost = Array.from(checkBoxes).reduce((costSum, box)=>{
		if (box.checked && box == checkBoxes[0]){
			costSum  = costSum + 200;
		}else if (box.checked && box !== checkBoxes[0]){
			costSum  = costSum + 100;
		}		
		return costSum;
	}, 0)
	//adding total cost to the inner html of the p element under the checkboxes
	checkBoxForm.querySelector('p').innerHTML = totalCost;	
	//WARNING: check specific wanted behavior in the site (disable checkboxes or change with out disableing)
	//
}
)

//event listener for the select menu in the payment option
paymentOptions.addEventListener('change', event =>{
	let indexValue=0;
	let selected = paymentOptionsSelectables.forEach((x,index)=>{
		if(x.value == event.target.value){indexValue = index};
	});
	if (indexValue === 0){return}else{};
	paymentDivs.forEach(x=>hideElement(x));
	paymentDivs.item(indexValue-1).style.display = '';
	//show the selected div
})

designMenu.addEventListener('change', event =>{  //desgin event listener, updates the color menu on change,
	hideColors();
	colorMenu.value = "";
	if (event.target.value === 'js puns'){
		colorMenu.children[0].style.display="";
		colorMenu.children[1].style.display="";
		colorMenu.children[2].style.display="";
	}else if (event.target.value === 'heart js'){
		colorMenu.children[3].style.display="";
		colorMenu.children[4].style.display="";
		colorMenu.children[5].style.display="";
	}

})

/*-------------------------------------------------|
 *              function that are used             |
 *-------------------------------------------------|
 */

//cost of activities
function totalCostElement(){
//create a p element and add it to the end of the activities field
	const sumElement = document.createElement('p');
	checkBoxForm.appendChild(sumElement);
}



//toggle function for disabled and enabled groups of two elements
function disableOther (checkbox, arrey){
	//if the check box is disabled then enable it
	if(arrey.includes(checkbox)){}else{return};
	if (arrey[1].hasAttribute('disabled', 'true')|| arrey[0].hasAttribute('disabled', 'true')){
		arrey.splice(arrey.indexOf(checkbox),1);
		arrey[0].removeAttribute('disabled');
		arrey[0].parentNode.style.background = '';
		return;
	//otherwise if the arrey has the target element, disable the outer element in the arrey
	}else if (arrey.includes(checkbox)){
		arrey.splice(arrey.indexOf(checkbox),1);
		arrey[0].checked = false;
		arrey[0].setAttribute('disabled', 'true');
		arrey[0].parentNode.style.background = 'grey';
		return;
	}	
}

//on start settings for pamet options
function paymentSettings (){
	paymentOptions.value ="credit card";
	//hide all divs then show creditcard div
	paymentDivs.forEach((x)=>hideElement(x));
	showElement(creditCardDiv);
}


//hiding a given element.
function hideElement(element){
	return element.style.display ="none";
}

//showing the given element 
function showElement(element){
	return element.style.display="";
}

//undisplaying the options in the color menu
function hideColors(){
	colorMenu.querySelectorAll('option').forEach((color)=>hideElement(color)); 
}

//on page load (when the js is loaded i gues?) make the first textfield focus
function setFocus (){
	firstInput.setAttribute('autofocus', 'true');
}

//hide the textfield
function textAreaHide(){
	textArea.style.display="none";
}

//wha will happen when the js is loaded
function onLoad(){
	setFocus();
	textAreaHide();
	hideColors();
	paymentSettings();
	colorMenu.value = "";//on load make the color menu selected option to empty,
	totalCostElement();
}
onLoad();


