"use strict";

/* 
  Project 2-5: Gift Card Purchase System 
  Author: Pattamaporn Jamjumrus
*/

let storeName, amountInput, amountValue, zipInput;

// Event Listeners
document.getElementById("submit").addEventListener("click", processFormValues);
document.getElementById("reset").addEventListener("click", function () {
  clearOutput();
  document.getElementById("submit").toggleAttribute("hidden");
  document.getElementById("reset").toggleAttribute("hidden");
});

/* IC: Process your form values here */
/*Reads user input and triggers validation. */
function processFormValues() {
  storeName = document.getElementById("storeSelect").value;
  amountInput = document.getElementById("cardAmount").value.trim();
  zipInput = document.getElementById("zipCode").value.trim();
  amountValue = Number(amountInput);

  clearOutput();

  let valid = validateData();
  if (valid) {
    let passed = evaluateAnswers();
    if (passed) {
      document.getElementById("submit").toggleAttribute("hidden");
      document.getElementById("reset").toggleAttribute("hidden");
    }
  }
}


/* IC: Use this function to check that all form values (that are not limited by HTML) 
are within accepable ranges. Output an error and return false if not.
If you want to divide your validate function into smaller functions, then call the additional functions from this one. */ 

/* validateData:
   Checks general format, ranges, and numeric rules. */
function validateData() {
  let errors = [];

  // Check amount format
  if (isNaN(amountValue) || amountValue <= 0) {
    errors.push("Please enter a positive dollar amount.");
  } else {
    let parts = amountInput.split(".");
    if (parts.length > 1 && parts[1].length !== 2) {
      errors.push("Amount must include exactly two decimal digits (e.g. 10.00).");
    }
  }

  // Check ZIP code
  if (zipInput.length !== 5 || isNaN(Number(zipInput))) {
    errors.push("Please enter a valid 5-digit ZIP code.");
  }

  // Show all errors at once
  if (errors.length > 0) {
    showErrors(errors);
    return false;
  }

  return true;
}

/* IC: Use this function to check that all combinations of submitted data 
meet your project requirements.  Output an error and return false if not. 
If you want to divide your evaluate function into smaller functions, then call the additional functions from this one. */ 

/* evaluateAnswers:
   Applies store-specific rules and processing fee. */
function evaluateAnswers() {
  let zipNum = Number(zipInput);
  let firstThree = Number(zipInput.substring(0, 3));
  let processingFee = 0;
  let errors = [];

  // Sepharoah rules
  if (storeName === "sepharoah") {
    if (!(zipNum < 34000) || (firstThree >= 90 && firstThree <= 99)) {
      errors.push("Sepharoah gift cards can only be ordered on the East Coast.");
    }
    if (amountValue < 50 || amountValue > 1000) {
      errors.push("Sepharoah gift cards must be between $50 and $1,000.");
    }
  }

  // Wallgrinds & Taco Hut rules
  if (storeName === "wallgrinds" || storeName === "tacohut") {
    if (amountValue < 5 || amountValue > 500) {
      errors.push("Gift cards for these stores must be between $5 and $500.");
    }
  }

  // Wallgrinds increments of 5
  if (storeName === "wallgrinds") {
    if (amountValue % 5 !== 0) {
      errors.push("Wallgrinds cards can only be purchased in $5 increments.");
    }
  }

  // Display all store-specific errors
  if (errors.length > 0) {
    showErrors(errors);
    return false;
  }

  // Add processing fee if < $100 and not California ZIP
  if (amountValue < 100 && !(zipNum >= 96701 && zipNum <= 96898)) {
    processingFee = amountValue * 0.05;
  }

  // Final success message
  let msg = "Your gift card for " + capitalize(storeName) +
    " in the amount of $" + amountValue.toFixed(2) +
    " will be shipped to ZIP " + zipInput + ".";
  if (processingFee > 0) {
    msg += " A processing fee of $" + processingFee.toFixed(2) + " has been added.";
  }

  output(msg);
  return true;
}

/* Helper Functions */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function showErrors(list) {
  let html = "<ul>";
  for (let i = 0; i < list.length; i++) {
    html += "<li>" + list[i] + "</li>";
  }
  html += "</ul>";
  document.getElementById("output").innerHTML = html;
}

function output(text) {
  document.getElementById("output").innerHTML = text;
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}