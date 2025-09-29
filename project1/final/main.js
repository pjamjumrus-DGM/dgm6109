"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
/* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    choice = document.getElementById("choice").value; //read value from select menu

    drawImage();
}

/* set up the drawing canvas */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* The function below is called when the user presses 
the "Draw!" button */

/* Origin point: rabbitX, rabbitY is the center of 
the rabbit's body */
function drawImage() {
let rabbitX = xInput; // X coordinate of rabbit body center
let rabbitY = yInput; // Y coordinate of rabbit body center

// Clear old rabbit but keep border
    drawing.selectAll("g").remove();

/*Group all rabbit parts together*/
// ----- Main Rabbit Group -----
let rabbitGroup = drawing.append("g")
    .attr("transform", "translate(0,-40)"); // shift upward slightly

// ----- Rabbit Legs Group -----
let rabbitLegsGroup = rabbitGroup.append("g"); // group for legs

    rabbitLegsGroup.append("ellipse")
    .attr("cx", rabbitX - 60) 
    .attr("cy", rabbitY + 50)
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("fill" , "#93734A");

    rabbitLegsGroup.append("ellipse")
    .attr("cx", rabbitX + 60) 
    .attr("cy", rabbitY + 50)
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("fill" , "#93734A");

    rabbitLegsGroup.append("ellipse")
    .attr("cx", rabbitX - 30) 
    .attr("cy", rabbitY + 60)
    .attr("rx", 13)
    .attr("ry", 13)
    .attr("fill" , "#93734A");

    rabbitLegsGroup.append("ellipse")
    .attr("cx", rabbitX + 20) 
    .attr("cy", rabbitY + 60)
    .attr("rx", 13)
    .attr("ry", 13)
    .attr("fill" , "#93734A");

// ----- Rabbit Body Group -----
let rabbitBodyGroup = rabbitGroup.append("g"); // group for body

    rabbitBodyGroup.append("ellipse")
    .attr("cx", rabbitX) 
    .attr("cy", rabbitY)
    .attr("rx", 60)
    .attr("ry", 60)
    .attr("fill" , "#B5885C");

    rabbitBodyGroup.append("circle")
    .attr("cx", rabbitX) 
    .attr("cy", rabbitY - 20)
    .attr("r", 35)
    .attr("fill", "white");

// ----- Rabbit Head Group -----
let rabbitHeadGroup = rabbitGroup.append("g"); // group for head

    rabbitHeadGroup.append("circle")
    .attr("cx", rabbitX) 
    .attr("cy", rabbitY - 100)
    .attr("r", 60)
    .attr("fill", "#B5885C");

// ----- Ears / Carrot Group -----
let rabbitEarsGroup = rabbitGroup.append("g"); // group for ears or carrot

if (choice === "earsUp") {
// Rabbit ears up
    rabbitEarsGroup.append("polygon")
    .attr("points", 
        (rabbitX+50)+","+(rabbitY-240)+" "+
        (rabbitX+30)+","+(rabbitY-150)+" "+
        (rabbitX+70)+","+(rabbitY-175)
        )
    .attr("fill", "#B5885C");

    rabbitEarsGroup.append("polygon")
    .attr("points", 
        (rabbitX-50)+","+(rabbitY-240)+" "+
        (rabbitX-30)+","+(rabbitY-150)+" "+
        (rabbitX-70)+","+(rabbitY-175)
        )
    .attr("fill", "#B5885C");

} else if (choice === "noEarsCarrot") {

// Rabbit no ears with carrot  
// Green leaves 
    rabbitEarsGroup.append("polygon")
    .attr("points", 
        (rabbitX-20)+","+(rabbitY-20)+" "+
        (rabbitX+20)+","+(rabbitY-20)+" "+
        (rabbitX)+","+(rabbitY+20)
        )
    .attr("fill", "green");

// Orange carrot 
    rabbitEarsGroup.append("polygon")
    .attr("points", 
        (rabbitX-25)+","+(rabbitY)+" "+
        (rabbitX+25)+","+(rabbitY)+" "+
        (rabbitX)+","+(rabbitY+80)
        )
    .attr("fill", "orange");
    }

// ----- Rabbit Eyes Group -----
let rabbitEyesGroup = rabbitGroup.append("g"); // group for eyes

    rabbitEyesGroup.append("circle")
    .attr("cx", rabbitX - 40) 
    .attr("cy", rabbitY - 105)
    .attr("r", 10)
    .attr("fill", "black");

    rabbitEyesGroup.append("circle")
    .attr("cx", rabbitX + 40) 
    .attr("cy", rabbitY - 105)
    .attr("r", 10)
    .attr("fill", "black");

// ----- Rabbit Nose Group -----
let rabbitNoseGroup = rabbitGroup.append("g"); // group for nose

    rabbitNoseGroup.append("circle")
    .attr("cx", rabbitX) 
    .attr("cy", rabbitY - 80)
    .attr("r", 12)
    .attr("fill", "pink");

/***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}