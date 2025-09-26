"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)

/* Border */
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

/* Rabbit Body */

/* body main */
let rabbitBody = drawing.append("ellipse")
    .attr("cx",100) 
    .attr("cy",270)
    .attr("r",60)
    .attr("ry",60)
    .attr("fill" , "saddlebrown");

/* chest */
let rabbitChest = drawing.append("circle")
    .attr("cx",100) 
    .attr("cy",250)
    .attr("r",35)
    .attr("fill", "white")
    .attr("stroke", "white")
    .attr("stroke-width" ,1);

    /* Rabbit Head + Face */

/* head */
let rabbitHead = drawing.append("circle")
    .attr("cx",100) 
    .attr("cy",170)
    .attr("r",60)
    .attr("fill", "saddlebrown");

/* left ear */
let leftEar = drawing.append("polygon")
    .attr("points","150,30 130,120 170,95") 
    .attr("fill", "saddlebrown");

/* right ear */  
let rightEar = drawing.append("polygon")
    .attr("points","50,30 70,120 30,95") 
    .attr("fill", "saddlebrown");

/* left eye */
let leftEye = drawing.append("circle")
    .attr("cx",60) 
    .attr("cy",165)
    .attr("r",10)
    .attr("fill", "black");

/* right eye */  
let rightEye = drawing.append("circle")
    .attr("cx",140) 
    .attr("cy",165)
    .attr("r",10)
    .attr("fill", "black");

/* nose*/
let rabbitNose = drawing.append("circle")
    .attr("cx",100) 
    .attr("cy",190)
    .attr("r",12)
    .attr("fill", "pink");


/* Rabbit Legs */  

/* left leg */
let leftLeg = drawing.append("ellipse")
    .attr("cx",240) //change this position from original body
    .attr("cy",180) //change this position from original body
    .attr("rx",30)
    .attr("ry",30)
    .attr("fill" , "saddlebrown");

/* right leg */
let rightLeg = drawing.append("ellipse")
    .attr("cx",360) //change this position from original body
    .attr("cy",180) //change this position from original body
    .attr("rx",30)
    .attr("ry",30)
    .attr("fill" , "saddlebrown");

/* left small leg*/
let leftsmallLeg = drawing.append("ellipse")
    .attr("cx",270) //change this position from original body
    .attr("cy",200) //change this position from original body
    .attr("rx",13)
    .attr("ry",13)
    .attr("fill" , "saddlebrown");

/* right small leg*/
let rightsmallLeg = drawing.append("ellipse")
    .attr("cx",330) //change this position from original body
    .attr("cy",200) //change this position from original body
    .attr("rx",13)
    .attr("ry",13)
    .attr("fill" , "saddlebrown");



