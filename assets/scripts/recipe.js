var portions = document.getElementById("portions");
var defaultQuantity = [];
var lastSelected;
var ingredients = document.getElementById("ingredients");
var ingredientQuantity = document.getElementsByClassName("ingredient-quantity");
var loadingImage = document.getElementById("loading-image");
var voteValue = 5;
var stars = document.getElementsByClassName("rating-star");
var responseText;
var ratingValue = document.getElementById("rating-value");
var ratingVotes = document.getElementById("rating-votes");

for (var i = 0; i < ingredientQuantity.length; i++) {
	defaultQuantity.push(ingredientQuantity[i].textContent);
	console.log(ingredientQuantity[i]);
	console.log(defaultQuantity[i]);
}

if (localStorage.getItem("select") != "null") {
	portions.value = localStorage.getItem("select");
	adjustPortions();
}

for(var i = 0; i<  stars.length; i++) {
	stars[i].addEventListener("click", vote); 
	stars[i].value = voteValue;
	voteValue--;
}

getRating();

function adjustPortions() {
"use strict";
	
	for (var i = 0; i < ingredientQuantity.length; i++) {
		console.log(ingredientQuantity[i].textContent);
		if (portions.value === "1") {
			ingredientQuantity[i].textContent = defaultQuantity[i] * 0.5;
		} else if (portions.value === "2") {
			ingredientQuantity[i].textContent = defaultQuantity[i] * 0.75;
		} else if (portions.value === "3") {
			ingredientQuantity[i].textContent = defaultQuantity[i];
		} else if (portions.value === "4") {
			ingredientQuantity[i].textContent = defaultQuantity[i] * 1.25;
		}  else if (portions.value === "5") {
			ingredientQuantity[i].textContent = defaultQuantity[i] * 1.5;
		} else if (portions.value === "6") {
			ingredientQuantity[i].textContent = defaultQuantity[i] * 2;
		}
	}
	lastSelected = portions.options[portions.selectedIndex].value;
	localStorage.setItem("select", lastSelected);
}

function vote() {
	"use strict";
	
	if(localStorage.getItem("hasVoted") != "true"){
		load();
		var userVote = parseInt(this.value);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var sendResponse = JSON.parse(this.responseText);
				localStorage.setItem("hasVoted", "true");
				alterStars(userVote);
				stop();
				getRating();
			}
		};  
		xhttp.open("GET", "http://edu.oscarb.se/sjk15/api/recipe/?api_key=61d1306705946313&recipe=snoddas&rating=" + userVote, true);
		xhttp.send();
	} 
}

function getRating() {
	"use strict";
	
	load();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			responseText = JSON.parse(this.responseText);
			updateRating();
			stop();    
		}
	};
	xhttp.open("GET", "http://edu.oscarb.se/sjk15/api/recipe/?api_key=61d1306705946313&recipe=snoddas", true);
	xhttp.send();
}
function load() {
	"use strict";
	
	loadingImage.style.visibility = "visible";
}
function stop() {
	"use strict";
	
	loadingImage.style.visibility = "hidden";
}
function updateRating() {
	"use strict";
	
	ratingValue.textContent = responseText.rating.toFixed(2);
	ratingVotes.textContent = responseText.votes;
	setNonRating();
}
function setNonRating() {
	"use strict";
	
	for(var i = 0; i < stars.length - responseText.rating.toFixed(0); i++) {
		stars[i].style.color = "black"; 
	}
}
function alterStars(inputValue) {
	"use strict";
	
	var index = 4;
	for (var i = 0; i < inputValue; i++) {
		stars[index].innerHTML = "&starf;";
		if (inputValue == "5") {
			stars[index].style.color = "red";
		} else {
			stars[index].style.color = "darkred";
		}
		starIndex--;
	}
}