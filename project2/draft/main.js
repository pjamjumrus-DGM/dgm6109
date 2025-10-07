"use strict";

let store, amountStr, amount, zip;

    document.getElementById("submit").addEventListener("click", processFormValues);
    document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

/* IC: Process your form values here */

function processFormValues() {
    // keep raw string for format checks
    store = document.getElementById("opt").value;           // "sepharoah" | "wallgrinds" | "tacohut"
    amountStr = document.getElementById("quant").value.trim();
    zip = document.getElementById("zip").value.trim();
    amount = Number(amountStr); // numeric version for calculations
    processData();
}

/* IC: You do not need to modify or flowchart this function. */
function processData() {
let evaluationCompleted = false;

if (validateData()) {
    evaluationCompleted = evaluateAnswers();
}

if (evaluationCompleted) {
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
} else {
        rule();
}
}

/* IC: Use this function to check that all form values (that are not limited by HTML) are within accepable ranges. 
Output an error and return false if not. If you want to divide your validate function into smaller functions, 
then call the additional functions from this one. */ 

/* validateData: check formats and basic numeric bounds that are general (not store-specific) */
function validateData() {
let valid = true;

if (!/^\d+(\.\d{2})?$/.test(amountStr)) {
    output("Please enter the amount as dollars or dollars and cents (examples: 10 or 10.00).");
    valid = false;
} else if (isNaN(amount) || amount <= 0) {
    output("Please enter a positive dollar amount.");
    valid = false;
}

if (!/^\d{5}$/.test(zip)) {
    output("Please enter a five-digit ZIP code.");
    valid = false;
}

if (valid) {
    output("All form data is valid");
}

    return valid;
} 
/* IC: Use this function to check that all combinations of submitted data meet your project requirements. 
Output an error and return false if not. If you want to divide your evaluate function into smaller functions, 
then call the additional functions from this one. */ 

/* evaluateAnswers: implement store-specific rules, exceptions, processing fee, and final output */
function evaluateAnswers() {
// small helpers
function formatMoney(n) { return "$" + Number(n).toFixed(2); }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

let zipNum = Number(zip);
let zipFirst3 = Number(zip.slice(0, 3));
let processingFee = 0;

// --- Sepharoah rules ---
if (store === "sepharoah") {

// East Coast test: ZIP numeric < 34000 and not 090..099 as first 3 digits
if (!(zipNum < 34000) || (zipFirst3 >= 90 && zipFirst3 <= 99)) {
    output("Sorry, the Sepharoah gift card can only be ordered on the East Coast.");
    return false;
    }

// min $50, max $1,000
if (amount < 50 || amount > 1000) {
    output("Sorry, the Sepharoah gift card has a minimum or maximum value of $50 or $1,000.");
    return false;
    }
}

// --- Wallgrinds & Taco Hut min/max rules ---
if (store === "wallgrinds" || store === "tacohut") {
if (amount < 5 || amount > 500) {
    output(`Sorry, ${capitalize(store)} gift cards must be between $5.00 and $500.00.`);
    return false;
    }
}

// --- Wallgrinds increment-of-5 rule (dollar values divisible by 5) ---
if (store === "wallgrinds") {
        
// require no cents (or .00) and divisible by 5
if (!/^\d+(\.00)?$/.test(amountStr) || (Number(amount) % 5 !== 0)) {
    output("The Wallgrinds card can only be purchased in increments of $5.");
    return false;
    }
}

// --- Processing fee: if amount < $100 and ZIP is NOT California (96701..96898) add 5% ---
if (amount < 100 && !(zipNum >= 96701 && zipNum <= 96898)) {
    processingFee = Number((amount * 0.05).toFixed(2));
}

// --- Final output ---
let msg = `Your gift card for ${capitalize(store)} in the amount of ${formatMoney(amount)} will be shipped to your address in ZIP code ${zip}.`;
if (processingFee > 0) {
    msg += ` Please note that a processing fee of ${formatMoney(processingFee)} has been added to your purchase.`;
}

    output(msg);
    return true;
}