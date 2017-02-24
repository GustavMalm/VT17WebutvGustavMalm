"use strict";

var numInputs = document.getElementsByClassName("calc__number");
var opInputs = document.getElementsByClassName("calc__sign");
var display = document.getElementById("result");
var textField = document.getElementById("results");
var currentOperator = "";
var preValue = "";
var postValue = "";
var newValue;
var toText = "";
var isResetable = false;

for (var i = 0; i < numInputs.length; i++) {
	numInputs[i].addEventListener("click", numericalInput);
}

for (var i = 0; i < opInputs.length; i++) {
	opInputs[i].addEventListener("click", operatorInput);
}

for (var i = 0; i < (numInputs.length + opInputs.length); i++) {

}

function numericalInput() {
	if (isResetable) {
		reset();
	}
	if (validInput(this.textContent)) {
		if (display.textContent[0] == 0) {
			display.textContent = this.textContent;
		} else {
			display.textContent += this.textContent;
		}
	}
}

function operatorInput() {
	if (isResetable) {
		reset();
	}
	if (this.textContent == "+") {
		currentOperator = "+";
		preValue = display.textContent;
		display.textContent += this.textContent;
		failsafe();
	} else if (this.textContent == "-") {
		currentOperator = "-";
		preValue = display.textContent;
		display.textContent += this.textContent;
		failsafe();
	} else if (this.textContent == "=") {
		postValue = display.textContent.slice(preValue.length + 1);
		if (postValue == "") {
			alert("Du måste ha en komplett uträkning! Exempel 1+1, 50-5 osv...");
			reset();
			return false;
		}
		sum();
		failsafe();
	}
}

function reset() {
	display.textContent = "0";
	isResetable = false;
	currentOperator = "";
	preValue = "";
	postValue = "";
}

function isOperator() {
	var check = display.innerText[display.innerText.length-1];
	if(check == "+" || check == "-") {
		return true;
	} else {
		return false;
	}
}

function failsafe() {
	var input = display.textContent;
	var string = "";
	string += input;
	string = string.replace("++", "+");
	string = string.replace("--", "-");
	string = string.replace("+-", "+");
	string = string.replace("-+", "-");

	if (display.textContent[0] == 0) {
		string = string.replace("+", "");
		string = string.replace("-", "");
	}
	document.getElementById("result").innerHTML = string;
}

function validInput(userInput) {
	if(isOperator() && userInput == "0") { 
		return false;
	} else {
		return true;
	}
}

function add(preValue, postValue) {
	newValue = parseInt(preValue) + parseInt(postValue);
}

function subtract(preValue, postValue) {
	newValue = parseInt(preValue) - parseInt(postValue);
}

function sum() {
	var value = display.textContent;
	if (currentOperator === "+") {
		add(preValue, postValue);
		console.log("preValue: " + preValue + " postValue: " + postValue + " newValue: " + newValue);
	} else if (currentOperator === "-") {
		subtract(preValue, postValue);
		console.log("preValue: " + preValue + " postValue: " + postValue + " newValue: " + newValue);
	}
	display.textContent += '=' + newValue;
	toListItem();
}

function toListItem() {
	toText += "<li>" + display.textContent + "</li>";
	document.getElementById("results").innerHTML = toText;
	display.textContent;
	isResetable = true;
}