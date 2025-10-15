"use strict";

/* *** START Do not modify this section of code ***** */
document.getElementById("action").addEventListener("click", processForm);

function processForm() {

    let choice1 = document.getElementById("choice1").value;
    let x1 = Number(document.getElementById("x1").value);
    let y1 = Number(document.getElementById("y1").value);

    let choice2 = document.getElementById("choice2").value;
    let x2 = Number(document.getElementById("x2").value);
    let y2 = Number(document.getElementById("y2").value);

    let showOrigin = document.getElementById("origins").value == "yes";

    drawing.selectAll('svg>*').remove(); 

    makeDrawing(drawing, choice1, x1, y1, choice2, x2, y2, showOrigin);
}

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");
/* *** END Do not modify this section of code ***** */

/* ************ function makeDrawing (canvas, choice1, x1, y1, choice2, x2, y2, showOrigin) ***** */

function makeDrawing(canvas, choice1, x1, y1, choice2, x2, y2, showOrigin) {

    // === First item ===
    let item1 = canvas.append("g");
    if (choice1 == "square") {
        square(item1, x1, y1, showOrigin);
    } else if (choice1 == "circle") {
        circle(item1, x1, y1, showOrigin);
    } else if (choice1 == "rabbit") {
        rabbit(item1, x1, y1, showOrigin, "earsUp");
    }

    // === Second item ===
    let item2 = canvas.append("g");
    if (choice2 == "square") {
        square(item2, x2, y2, showOrigin);
    } else if (choice2 == "circle") {
        circle(item2, x2, y2, showOrigin);
    } else if (choice2 == "rabbit") {
        rabbit(item2, x2, y2, showOrigin, "noEarsCarrot");
    }

    // Animate swap
    switcheroo(item1, x1, y1, item2, x2, y2);
}

