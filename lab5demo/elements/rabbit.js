"use strict";

/*
Pattamaporn Jamjumrus Drawing #12 - Rabbit
This function draws a single rabbit with ears on an SVG canvas.

Parameters:
- svg: the D3 SVG drawing surface
- x: horizontal position of the rabbit’s center
- y: vertical position of the rabbit’s center
- showOrigin: true/false to show a small pink origin dot
Returns:
- The same SVG canvas with the rabbit added.
*/

function rabbit(svg, x, y, showOrigin) {

    // Group all rabbit parts together
    let rabbitGroup = svg.append("g")
        .attr("transform", "translate(0,-40)");

    // Rabbit Legs
    let legs = rabbitGroup.append("g");
    legs.append("ellipse").attr("cx", x - 60).attr("cy", y + 50).attr("rx", 30).attr("ry", 30).attr("fill", "#93734A");
    legs.append("ellipse").attr("cx", x + 60).attr("cy", y + 50).attr("rx", 30).attr("ry", 30).attr("fill", "#93734A");
    legs.append("ellipse").attr("cx", x - 30).attr("cy", y + 60).attr("rx", 13).attr("ry", 13).attr("fill", "#93734A");
    legs.append("ellipse").attr("cx", x + 20).attr("cy", y + 60).attr("rx", 13).attr("ry", 13).attr("fill", "#93734A");

    // Rabbit Body
    let body = rabbitGroup.append("g");
    body.append("ellipse").attr("cx", x).attr("cy", y).attr("rx", 60).attr("ry", 60).attr("fill", "#B5885C");
    body.append("circle").attr("cx", x).attr("cy", y - 20).attr("r", 35).attr("fill", "white");

    // Rabbit Head
    let head = rabbitGroup.append("g");
    head.append("circle").attr("cx", x).attr("cy", y - 100).attr("r", 60).attr("fill", "#B5885C");

    // Rabbit Ears (fixed, normal)
    let ears = rabbitGroup.append("g");
    ears.append("polygon")
        .attr("points", `${x + 50},${y - 240} ${x + 30},${y - 150} ${x + 70},${y - 175}`)
        .attr("fill", "#B5885C");
    ears.append("polygon")
        .attr("points", `${x - 50},${y - 240} ${x - 30},${y - 150} ${x - 70},${y - 175}`)
        .attr("fill", "#B5885C");

    // Rabbit Eyes
    let eyes = rabbitGroup.append("g");
    eyes.append("circle").attr("cx", x - 40).attr("cy", y - 105).attr("r", 10).attr("fill", "black");
    eyes.append("circle").attr("cx", x + 40).attr("cy", y - 105).attr("r", 10).attr("fill", "black");

    // Rabbit Nose
    let nose = rabbitGroup.append("g");
    nose.append("circle").attr("cx", x).attr("cy", y - 80).attr("r", 12).attr("fill", "pink");

    // Optional origin point
    if (showOrigin) {
        svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return svg;
}