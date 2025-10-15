"use strict";

/* 
    Liliana Mata Drawing #9 Fish

    svg - The SVG drawing area where the fish will be drawn.
    fishX - The horizontal position of the fish relative to its origin.
    fishY - The vertical position of the fish relative to its origin.
    origin - A Boolean value. If true, shows a small circle marking the fish's origin point.
    choice - A string determining if bubbles should be drawn ("Bubbles" to show them).


*/

function fish(svg, fishX, fishY, origin, choice) {

    /* Fish Tail */
    let fishTail = svg.append("polyline")
        .attr("points", closedPolygon(
            75 + fishX, 125 + fishY,
            14 + fishX, 75 + fishY,
            15 + fishX, 175 + fishY
        ))
        .attr("fill", "rgb(176,162,215)");

    /* Fish Body (ellipse) */
    let fishBody = svg.append("ellipse")
        .attr("cx", (75 + 50) + fishX)
        .attr("cy", (75 + 50) + fishY)
        .attr("rx", 50)
        .attr("ry", 50)
        .attr("fill", "rgb(200,234,242)");

    /* Fish Body (square) */
    let fishRectangle = svg.append("rect")
        .attr("x", 120 + fishX)
        .attr("y", 75 + fishY)
        .attr("width", 55)
        .attr("height", 100)
        .attr("fill", "rgb(200,234,242)");

    /* Fish Upper Fin */
    let fishUpperFin = svg.append("polyline")
        .attr("points", closedPolygon(
            120 + fishX, 75 + fishY,
            85 + fishX, 30 + fishY,
            175 + fishX, 75 + fishY
        ))
        .attr("fill", "rgb(176,162,215)");

    /* Fish Lower Fin */
    let fishLowerFin = svg.append("polyline")
        .attr("points", closedPolygon(
            120 + fishX, 175 + fishY,
            115 + fishX, 200 + fishY,
            175 + fishX, 175 + fishY
        ))
        .attr("fill", "rgb(176,162,215)");

    /* Fish Head */
    let fishHead = svg.append("polyline")
        .attr("points", closedPolygon(
            175 + fishX, 75 + fishY,
            275 + fishX, 125 + fishY,
            175 + fishX, 175 + fishY
        ))
        .attr("fill", "rgb(200,234,242)");

    /* Fish Decor - Top Triangle */
    let fishTriangleTop = svg.append("polyline")
        .attr("points", closedPolygon(
            175 + fishX, 75 + fishY,
            125 + fishX, 100 + fishY,
            175 + fishX, 125 + fishY
        ))
        .attr("fill", "rgb(140,202,231)");

    /* Fish Decor - Bottom Triangle */
    let fishTriangleBottom = svg.append("polyline")
        .attr("points", closedPolygon(
            175 + fishX, 125 + fishY,
            125 + fishX, 150 + fishY,
            175 + fishX, 175 + fishY
        ))
        .attr("fill", "rgb(140,202,231)");

    /* Fish Decor - Head Triangle */
    let fishTriangleHead = svg.append("polyline")
        .attr("points", closedPolygon(
            225 + fishX, 100 + fishY,
            175 + fishX, 125 + fishY,
            225 + fishX, 150 + fishY
        ))
        .attr("fill", "rgb(111,157,211)");

    /* Fish Decor - Body Diamond */
    let fishDiamond = svg.append("polyline")
        .attr("points", closedPolygon(
            125 + fishX, 100 + fishY,
            175 + fishX, 125 + fishY,
            125 + fishX, 150 + fishY,
            75 + fishX, 125 + fishY
        ))
        .attr("fill", "rgb(111,157,211)");

    /* Fish Eye */
    let fishEye = svg.append("circle")
        .attr("cx", 245 + fishX)
        .attr("cy", 120 + fishY)
        .attr("r", 5)
        .attr("fill", "rgb(26,42,73)");

    /* Fish Mouth + Optional Bubbles */
    if (choice == "Bubbles") {
        let fishOpenMouth = svg.append("polyline")
            .attr("points", closedPolygon(
                255 + fishX, 125 + fishY,
                275 + fishX, 135 + fishY,
                240 + fishX, 135 + fishY
            ))
            .attr("fill", "rgb(200,234,242)");

        let fishSmallBubble = svg.append("ellipse")
            .attr("cx", (235 + 50) + fishX)
            .attr("cy", (65 + 50) + fishY)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("fill", "rgb(215,248,255)");

        let fishMiddleBubble = svg.append("ellipse")
            .attr("cx", (220 + 50) + fishX)
            .attr("cy", (45 + 50) + fishY)
            .attr("rx", 8)
            .attr("ry", 8)
            .attr("fill", "rgb(228,247,251)");

        let fishLargeBubble = svg.append("ellipse")
            .attr("cx", (235 + 50) + fishX)
            .attr("cy", (15 + 50) + fishY)
            .attr("rx", 12)
            .attr("ry", 12)
            .attr("fill", "rgb(235,249,251)");
    }

    /* Origin pink point (offset to center of body ellipse) */
    if (origin) {
    svg.append("circle")
        .attr("cx", (75 + 50) + fishX) // 125 pixels right
        .attr("cy", (75 + 50) + fishY) // 125 pixels down
        .attr("r", 3)
        .attr("fill", "deeppink");
}

    // Return the SVG area (with all fish elements added)
    return svg;
}