"use strict"

/* *** START Do not modify this section of code ***** */
document.getElementById("action").addEventListener("click", processForm);

/* ************ function processForm () *****
PURPOSE:
Read the user input, clear the drawing area, and pass execution to makeDrawing()

REQUIREMENTS:
* d3.js v3 or higher
* Form fields to provide required data
* SVG canvas wrapped by d3

PARAMETERS:
none

RETURNS:
Nothing
****************************************************************** */

function processForm() {

    // Choice 1
    let choice1 = document.getElementById("choice1").value;
    let x1 = Number(document.getElementById("x1").value);
    let y1 = Number(document.getElementById("y1").value);

    // Choice 2
    let choice2 = document.getElementById("choice2").value;
    let x2 = Number(document.getElementById("x2").value);
    let y2 = Number(document.getElementById("y2").value);

    // Choice 3
    let choice3 = document.getElementById("choice3").value;
    let x3 = Number(document.getElementById("x3").value);
    let y3 = Number(document.getElementById("y3").value);

    // Choice 4
    let choice4 = document.getElementById("choice4").value;
    let x4 = Number(document.getElementById("x4").value);
    let y4 = Number(document.getElementById("y4").value);

    // Show origin
    let showOrigin = document.getElementById("origins").value == "yes";

    // Clear previous drawing
    drawing.selectAll("g").remove();
    
    // Draw all 4 elements
    makeDrawing(drawing, choice1, x1, y1, choice2, x2, y2, choice3, x3, y3, choice4, x4, y4, showOrigin);
}
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 650)    // เChanged from 500 → 700
    .attr("height", 650);  // เChanged from 500 → 700

let border = drawing.append("rect")
    .attr("width", 650)    // เChanged from 500 → 700
    .attr("height", 650)   /// เChanged from 500 → 700
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 3);

/* *** END Do not modify this section of code ***** */

/* ************ function makeDrawing (canvas, choice1, x1, y1, choice2, x2, y2, showOrigin) *****
PURPOSE:
Draws to the canvas based on user preferences

REQUIREMENTS:
d3.js v3 or higher

PARAMETERS:
canvas:     an SVG group or canvas wrapped by d3
choice1:    selected option from first select menu
x1:         horizontal position for drawing choice1 (type: Number, range: 0-500)
y1:         vertical position for drawing choice1 (type: Number, range: 0-500)
choice2:    selected option from second select menu
x1:         horizontal position for drawing choice2 (type: Number, range: 0-500)
y1:         vertical position for drawing choice2 (type: Number, range: 0-500)

RETURNS:
Nothing
****************************************************************** */
function makeDrawing(canvas, choice1, x1, y1, choice2, x2, y2, choice3, x3, y3, choice4, x4, y4, showOrigin) {

    // Element 1
    drawElement(choice1, canvas.append("g"), x1, y1, showOrigin);

    // Element 2
    drawElement(choice2, canvas.append("g"), x2, y2, showOrigin);

    // Element 3
    drawElement(choice3, canvas.append("g"), x3, y3, showOrigin);

    // Element 4
    drawElement(choice4, canvas.append("g"), x4, y4, showOrigin);
}


/* --- Draw Element Based on Choice --- */
const positions = {
    
    butterfly: [175,125],
    fish: [325, 125],
    rabbit: [175, 575],
    rooster: [425, 475]
};

function drawElement(choice, canvas, x, y, showOrigin) {
    
    if (positions[choice]) {
        [x, y] = positions[choice];
    }

    if (choice === "rabbit") {
        rabbit(canvas, x, y, showOrigin);
    } else if (choice === "fish") {
        fish(canvas, x, y, showOrigin);
    } else if (choice === "butterfly") {
        butterfly(canvas, x, y, showOrigin);
    } else if (choice === "rooster") {
        rooster(canvas, x, y, showOrigin);
    }
}


/* ************ function switcheroo (i1, x1, y1, i2, x2, y2) *****
PURPOSE:
Swaps the positions of the two drawings after a half-second delay.

REQUIREMENTS:
d3.js v3 or higher

PARAMETERS:
i1: first drawing object (type: d3-wrapped SVG group)
x1: horizontal position for i1 (type: Number, range: 0-500)
y1: vertical position for i1 (type: Number, range: 0-500)
i2: first drawing object (type: d3-wrapped SVG group)
x2: horizontal position for i2 (type: Number, range: 0-500)
y2: vertical position for i2 (type: Number, range: 0-500)

RETURNS:
Nothing

USAGE NOTES:
* delay() determines how long to delay, in milliseconds
* duration() determines how long the animation should take, in milliseonds

You can also comment out the two lines in this function's body if you want to see
your results withuot them animating on you. Please return values to the defaults
before submitting your project.

****************************************************************** */

