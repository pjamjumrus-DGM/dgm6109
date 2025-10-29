"use strict";

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 400;
let margin = 25;

/* Configuration variables: data scaling */
let maxHoursOutside = 10; // approximate daily max
let maxSatisfaction = 5;  // scale 1–5

/* Set up canvas and draw borders */
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

svg.append("rect") // Outer boundary of the entire SVG canvas
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

svg.append("rect") // Inner dashed boundary (margin area where data will be drawn)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-dasharray", "5")
  .attr("x", margin)
  .attr("y", margin)
  .attr("width", svgWidth - margin * 2)
  .attr("height", svgHeight - margin * 2);

/* Data source: personal daily outdoor and reflection logs*/
/*Dataset: daily outdoor hours and satisfaction levels
  (Self-recorded from September–October 2025)*/

let dailyData = [
  { date: "23 SEP 2025", hoursOutside: 9, dailyReflection: 1 },
  { date: "24 SEP 2025", hoursOutside: 8, dailyReflection: 1 },
  { date: "25 SEP 2025", hoursOutside: 6, dailyReflection: 4 },
  { date: "26 SEP 2025", hoursOutside: 8, dailyReflection: 2 },
  { date: "27 SEP 2025", hoursOutside: 6.3, dailyReflection: 5 },
  { date: "28 SEP 2025", hoursOutside: 0, dailyReflection: 0 },
  { date: "29 SEP 2025", hoursOutside: 8, dailyReflection: 3 },
  { date: "30 SEP 2025", hoursOutside: 6, dailyReflection: 5 },
  { date: "01 OCT 2025", hoursOutside: 8, dailyReflection: 3 },
  { date: "02 OCT 2025", hoursOutside: 6, dailyReflection: 2 },
  { date: "03 OCT 2025", hoursOutside: 7, dailyReflection: 4 },
  { date: "04 OCT 2025", hoursOutside: 0, dailyReflection: 0 },
  { date: "05 OCT 2025", hoursOutside: 0, dailyReflection: 0 },
  { date: "06 OCT 2025", hoursOutside: 8, dailyReflection: 1 },
  { date: "07 OCT 2025", hoursOutside: 6, dailyReflection: 3 },
  { date: "08 OCT 2025", hoursOutside: 8, dailyReflection: 4 },
  { date: "09 OCT 2025", hoursOutside: 6, dailyReflection: 5 },
  { date: "10 OCT 2025", hoursOutside: 7.3, dailyReflection: 4 },
  { date: "11 OCT 2025", hoursOutside: 3, dailyReflection: 1 },
  { date: "12 OCT 2025", hoursOutside: 0, dailyReflection: 0 },
  { date: "13 OCT 2025", hoursOutside: 0, dailyReflection: 0 },
  { date: "14 OCT 2025", hoursOutside: 6, dailyReflection: 0 },
  { date: "15 OCT 2025", hoursOutside: 8, dailyReflection: 5 },
  { date: "16 OCT 2025", hoursOutside: 6, dailyReflection: 5 },
  { date: "17 OCT 2025", hoursOutside: 8, dailyReflection: 3 },
  { date: "18 OCT 2025", hoursOutside: 8, dailyReflection: 3 },
  { date: "19 OCT 2025", hoursOutside: 0, dailyReflection: 0 },
  { date: "20 OCT 2025", hoursOutside: 8, dailyReflection: 4 },
  { date: "21 OCT 2025", hoursOutside: 6, dailyReflection: 1 }
];

/* Scales for the scatterplot */
let xScale = d3.scaleLinear()
  .domain([0, maxHoursOutside])
  .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
  .domain([0, maxSatisfaction])
  .range([svgHeight - margin, margin]);

/* Plot the data points*/
let circles = svg.selectAll("circle")
  .data(dailyData)
  .join("circle");

circles
  .attr("r", 12) // circle radius (larger for visibility)
  .attr("cx", d => xScale(d.hoursOutside))
  .attr("cy", d => yScale(d.dailyReflection))
  .attr("opacity", 0.5) // allows overlapping points to show
  .attr("fill", "black");  // neutral color for data points

/* Axis labels */
let xAxisLabel = svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - (margin / 4))
  .attr("text-anchor", "middle")
  .text("Hours Spent Outside (per day)");

let yAxisLabel = svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", margin / 2)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("transform", "rotate(-90)")
  .text("Satisfaction Level (0–5)");

/* Axis end labels */
// X-axis max label
svg.append("text")
  .attr("x", xScale(maxHoursOutside))
  .attr("y", svgHeight - (margin / 2))
  .attr("text-anchor", "middle")
  .text(String(maxHoursOutside));

// X-axis min label
svg.append("text")
  .attr("x", xScale(0))
  .attr("y", svgHeight - (margin / 2))
  .attr("text-anchor", "middle")
  .text("0");

// Y-axis max label
svg.append("text")
  .attr("x", margin - 5)
  .attr("y", yScale(maxSatisfaction))
  .attr("text-anchor", "end")
  .attr("alignment-baseline", "middle")
  .text(String(maxSatisfaction));

// Y-axis min label
svg.append("text")
  .attr("x", margin - 5)
  .attr("y", yScale(0))
  .attr("text-anchor", "end")
  .attr("alignment-baseline", "middle")
  .text("0");

/* ----------------------------------------------------------
   Notes:
   - X axis shows numeric hours spent outside
   - Y axis shows satisfaction level (0–5)
   - The opacity highlights data overlap
   - No decorative elements; only meaningful guides
---------------------------------------------------------- */

/*References / Learning Sources:
  - Lab 7 examples and materials from class 
  - D3.js Official Documentation: https://d3js.org/
  - Mike Bostock. (2025). D3.js — Data Driven Documents. Retrieved from https://d3js.org
  - W3Schools. (n.d.). SVG Tutorial. Retrieved from https://www.w3schools.com/graphics/svg_intro.asp
  - Mozilla Developer Network (MDN). (n.d.). stroke-dasharray attribute. Retrieved from https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
  - Self-collected personal dataset (September–October 2025)*/