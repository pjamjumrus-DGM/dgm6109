"use strict";

    // Wait for the user to click the button
    document.getElementById("submit").addEventListener("click", function() {
    // Get Fahrenheit from input
    let fahrenheit = document.getElementById("inputF").value;
    fahrenheit = parseFloat(fahrenheit);  // convert to number

    // Get user’s choice of conversion
    let conversionType = document.getElementById("conversionChoice").value; 
    // "c" means convert to Celsius, "k" means convert to Kelvin

    // Calculate Celsius and Kelvin
    let celsius = (fahrenheit - 32) * 5 / 9;
    let kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;  // fixed Kelvin bug


    // Always show original temperature
    output("Original Temperature (Fahrenheit): " + fahrenheit);

    /* ---------------------------
       Version 1: Two separate ifs
       (COMMENTED OUT)
    --------------------------- */
    /*
    if (conversionType === "c") {
        output("Converted Temperature (Celsius): " + celsius.toFixed(2));
    }
    if (conversionType === "k") {
        output("Converted Temperature (Kelvin): " + kelvin.toFixed(2));
    }
    */

    /* ---------------------------
       Version 2: if/else
       (ACTIVE VERSION)
    --------------------------- */
    if (conversionType === "c") {
        output("Converted Temperature (Celsius): " + celsius.toFixed(2));
    } else {
        output("Converted Temperature (Kelvin): " + kelvin.toFixed(2));
    }

    /* Explanation for my decision: I prefer the if/else version because that 
    in order checks one condition and makes the code easier to read. This is slightly 
    more efficient and somewhat more efficient and eliminates needless evaluations.*/

});

