function validatePN(e) {
	"use strict";

	e.preventDefault();
	var value = document.getElementById('idNumber').value;
	
	if (value.length === 10 || value.length === 10 + 1 || value.length === 12 || value.length === 12 + 1) {
		
		if (value.length === 10 || value.length === 10 + 1) {
			var stringValue = value.replace(/\D/g, "").split("").slice(0, 10);
		} else {
			var stringValue = value.replace(/\D/g, "").split("").slice(2, 12);
		}

		var sum = 0;
		var isValid;

		for (var i = 0; i < stringValue.length; i++) {
			console.log("For " + i);
			if (i % 2 == 0) {
				console.log("IF " + i);
				if (stringValue[i] * 2 > 9) {
					console.log("IF-IF " + i);
					sum += ((stringValue[i] * 2) - 9);
					console.log("Value: " + ((stringValue[i] * 2) - 9));
				} else {
					console.log("IF-Else " + i);
					sum += stringValue[i] * 2;
					console.log("Value: " + stringValue[i]);
				}
			} else {
				console.log("Else " + i);
				if (stringValue[i] * 1 > 9) {
					console.log("Else-IF " + i);
					sum += ((stringValue[i] * 1) - 9);
					console.log("Value: " + ((stringValue[i] * 1) - 9));
				} else {
					console.log("Else-Else " + i);
					sum += stringValue[i] * 1;
					console.log("Value: " + stringValue[i]);
				}
			}
		}
		if (sum % 10 == 0) {
			isValid = "Giltig";
		} else {
			isValid = "Ogiltig";
		}
		console.log("Summa: " + sum + " stringValue: " + stringValue);
		return document.getElementById("idNumberResult").innerHTML = isValid;
	} else {
		alert ("Inte ett accepterat personnummer! Exempel: (xx[xxxxxx-xxxx]) (12 siffror) eller [10 siffor]");
		return false;
	}
}

function validateLeap(e) {
	"use strict";

	e.preventDefault();
	var value = document.getElementById("leapYear").value;

	if ((value % 400 == 0) || ((value % 4 == 0) && (value % 100 != 0))) {
		document.getElementById("leapYearResult").innerHTML = "Det är skottår";
	} else {
		document.getElementById("leapYearResult").innerHTML = "Det är INTE skottår";
	}
}

function validateNum(e) {
	"use strict";

	e.preventDefault();
	var value = document.getElementById("numberSum").value,
			sum = 0;
	while (value) {
		sum += value % 10;
		value = Math.floor(value / 10);
	}
	return document.getElementById("numberSumResult").innerHTML = sum;
}

document.getElementById("persBtn").addEventListener("click", validatePN);
document.getElementById("leapBtn").addEventListener("click", validateLeap);
document.getElementById("numBtn").addEventListener("click", validateNum);
