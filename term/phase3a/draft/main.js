/* 
----------------------------------------------------------
Scatterplot Reference / Notes
----------------------------------------------------------
Data fields:
- hoursOutside: total hours spent outside
- moneySpent: amount spent in CAD
- mealsPurchased: number of meals purchased
- dailyReflection: daily satisfaction level (0–5)

Code / Methodology:
- Uses D3.js v7 for SVG manipulation, selection, and data binding
  (https://d3js.org/)
- Original main.js inspired by personal daily records plotting
- Manual scaling functions replace d3.scaleLinear() and d3.scaleSqrt()
  to map data values to pixel coordinates without using D3 scales
- Axes are drawn manually with ticks and labels
- Legends for color and size replicate the original main.js design

References:
1. Mike Bostock, D3.js Official Documentation: https://d3js.org/
2. D3 Margin Convention Example: https://bl.ocks.org/mbostock/3019563
3. D3 Legend Examples: https://d3-legend.susielu.com/
4. Original main.js daily records scatterplot (custom dataset)
----------------------------------------------------------
*/

"use strict";

/* Configuration variables: drawing */
let svgWidth = 700;
let svgHeight = 500;
let margin = 40;

/* Data (my daily records) */
let dailyData = [
  { date: "23 SEP 2025", timeOutside: "11:40 - 20:40", hoursOutside: 9, moneySpent: 30, mealsPurchased: 2, locationsVisited: 2, dailyReflection: 1, moodOutside: 2 },
  { date: "24 SEP 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 42.76, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 1, moodOutside: 2 },
  { date: "25 SEP 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 0, mealsPurchased: 0, locationsVisited: 1, dailyReflection: 4, moodOutside: 3 },
  { date: "26 SEP 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 8.81, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 2, moodOutside: 4 },
  { date: "27 SEP 2025", timeOutside: "12:00 - 19:30", hoursOutside: 6.3, moneySpent: 0, mealsPurchased: 1, locationsVisited: 2, dailyReflection: 5, moodOutside: 5 },
  { date: "28 SEP 2025", timeOutside: "Stay home", hoursOutside: 0, moneySpent: 0, mealsPurchased: 0, locationsVisited: 0, dailyReflection: 0, moodOutside: 0 },
  { date: "29 SEP 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 45, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 3, moodOutside: 2 },
  { date: "30 SEP 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 5, moodOutside: 0 },
  { date: "01 OCT 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 59.94, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 3, moodOutside: 2 },
  { date: "02 OCT 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 70.87, mealsPurchased: 1, locationsVisited: 2, dailyReflection: 2, moodOutside: 1 },
  { date: "03 OCT 2025", timeOutside: "12:30 - 19:30", hoursOutside: 7, moneySpent: 36.53, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 4, moodOutside: 3 },
  { date: "04 OCT 2025", timeOutside: "Stay home", hoursOutside: 0, moneySpent: 0, mealsPurchased: 0, locationsVisited: 0, dailyReflection: 0, moodOutside: 0 },
  { date: "05 OCT 2025", timeOutside: "Stay home", hoursOutside: 0, moneySpent: 0, mealsPurchased: 0, locationsVisited: 0, dailyReflection: 0, moodOutside: 0 },
  { date: "06 OCT 2025", timeOutside: "10:30 - 18:30", hoursOutside: 8, moneySpent: 121, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 1, moodOutside: 1 },
  { date: "07 OCT 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 8, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 3, moodOutside: 4 },
  { date: "08 OCT 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 4, moodOutside: 4 },
  { date: "09 OCT 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 5, moodOutside: 4 },
  { date: "10 OCT 2025", timeOutside: "12:00 - 19:30", hoursOutside: 7.3, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 4, moodOutside: 4 },
  { date: "11 OCT 2025", timeOutside: "18:00 - 21:00", hoursOutside: 3, moneySpent: 104, mealsPurchased: 2, locationsVisited: 2, dailyReflection: 1, moodOutside: 3 },
  { date: "12 OCT 2025", timeOutside: "Stay home", hoursOutside: 0, moneySpent: 0, mealsPurchased: 0, locationsVisited: 0, dailyReflection: 0, moodOutside: 0 },
  { date: "13 OCT 2025", timeOutside: "Stay home", hoursOutside: 0, moneySpent: 0, mealsPurchased: 0, locationsVisited: 0, dailyReflection: 0, moodOutside: 0 },
  { date: "14 OCT 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 200.67, mealsPurchased: 2, locationsVisited: 2, dailyReflection: 0, moodOutside: 1 },
  { date: "15 OCT 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 5, moodOutside: 4 },
  { date: "16 OCT 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 5, moodOutside: 4 },
  { date: "17 OCT 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 15.75, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 3, moodOutside: 3 },
  { date: "18 OCT 2025", timeOutside: "11:30 - 19:30", hoursOutside: 8, moneySpent: 0, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 3, moodOutside: 5 },
  { date: "19 OCT 2025", timeOutside: "Stay home", hoursOutside: 0, moneySpent: 0, mealsPurchased: 0, locationsVisited: 0, dailyReflection: 0, moodOutside: 0 },
  { date: "20 OCT 2025", timeOutside: "10:30 - 18:30", hoursOutside: 8, moneySpent: 24.08, mealsPurchased: 1, locationsVisited: 1, dailyReflection: 4, moodOutside: 4 },
  { date: "21 OCT 2025", timeOutside: "14:30 - 20:30", hoursOutside: 6, moneySpent: 119.81, mealsPurchased: 2, locationsVisited: 2, dailyReflection: 1, moodOutside: 1 }
]; // list of daily observations

/* build a scatterplot on #canvas:
   - x: hoursOutside
   - y: moneySpent
   - color: dailyReflection (0–5)
   - radius: mealsPurchased
*/

// remove any previous svg (for repeated runs)
d3.select("#canvas").selectAll("*").remove();

// create svg
const svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// inner drawing area
const innerWidth = svgWidth - margin * 2;
const innerHeight = svgHeight - margin * 2;

// group for chart area
const g = svg.append("g")
  .attr("transform", `translate(${margin},${margin})`);

// filter out entries with no hours/money if you prefer to ignore stay-home days
const plotData = dailyData.filter(d => d.hoursOutside !== undefined && d.moneySpent !== undefined);

// scales
const xMax = d3.max(plotData, d => d.hoursOutside) || 10;
const yMax = d3.max(plotData, d => d.moneySpent) || 100;
const mealsMax = d3.max(plotData, d => d.mealsPurchased) || 1;

const xScale = d3.scaleLinear()
  .domain([0, xMax + 1])
  .range([0, innerWidth]);

const yScale = d3.scaleLinear()
  .domain([0, yMax + Math.max(10, yMax * 0.1)])
  .range([innerHeight, 0]);

const rScale = d3.scaleSqrt()
  .domain([0, mealsMax])
  .range([4, 20]);


// color mapping for dailyReflection 0–5 (0 = gray for 'stay home' or no rating)
const colorMap = {
  0: "#cccccc",
  1: "#e41a1c",
  2: "#377eb8",
  3: "#4daf4a",
  4: "#984ea3",
  5: "#ff7f00"
};
function colorFor(val) {
  return colorMap.hasOwnProperty(val) ? colorMap[val] : "#999999";
}

// axes
const xAxis = d3.axisBottom(xScale).ticks(6);
const yAxis = d3.axisLeft(yScale).ticks(6);

// draw axes
g.append("g")
  .attr("transform", `translate(0, ${innerHeight})`)
  .call(xAxis);

g.append("g")
  .call(yAxis);

// labels
svg.append("text")
  .attr("x", margin + innerWidth / 2)
  .attr("y", svgHeight - 6)
  .attr("text-anchor", "middle")
  .text("Hours Spent Outside (per day)");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", - (margin + innerHeight / 2))
  .attr("y", 14)
  .attr("text-anchor", "middle")
  .text("Money Spent (CAD)");

// title
svg.append("text")
  .attr("x", margin + innerWidth / 2.5)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .attr("font-size", "16px")
  .text("Hours Outside vs Money Spent (Color = Reflection, Size = Meals)");

// draw points
g.selectAll("circle.data-point")
  .data(plotData)
  .enter()
  .append("circle")
  .classed("data-point", true)
  .attr("cx", d => xScale(d.hoursOutside))
  .attr("cy", d => yScale(d.moneySpent))
  .attr("r", d => rScale(d.mealsPurchased))
  .attr("fill", d => colorFor(d.dailyReflection))
  .attr("opacity", 0.65)
  .append("title")
  .text(d => `${d.date}\nHours: ${d.hoursOutside}\nMoney: $${d.moneySpent}\nMeals: ${d.mealsPurchased}\nReflection: ${d.dailyReflection}`);

// Legend (placed using margin variable for flexibility)
// --- Set legend position ---//
/* --- Color Legend (dailyReflection) --- */
const colorLegendX = margin + 50;
const colorLegendY = 60 ; // distance from top

const colorLegend = svg.append("g")
  .attr("transform", `translate(${colorLegendX}, ${colorLegendY})`);

// Header
colorLegend.append("text")
  .text("Daily Reflection")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("y", -20); // move above circles

const colorValues = [0, 1, 2, 3, 4, 5]; // include 0 for gray

colorValues.forEach((val, i) => {
  colorLegend.append("circle")
    .attr("r", 8)
    .attr("cy", i * 25)
    .attr("fill", colorFor(val))
    .attr("stroke", "none"); // no border

  colorLegend.append("text")
    .text(val)
    .attr("x", 15)
    .attr("y", i * 25 + 4) // center vertically with circle
    .attr("font-size", "12px")
    .attr("alignment-baseline", "middle");
});

/* --- Size Legend (mealsPurchased) --- */
const sizeLegendX = margin + 50;
const sizeLegendY = colorLegendY + colorValues.length * 25+10 ; // leave space below color legend

const sizeLegend = svg.append("g")
  .attr("transform", `translate(${sizeLegendX}, ${sizeLegendY})`);

// Header
sizeLegend.append("text")
  .text("Meals purchased")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("y", 0); // header at y=0

const circleOffset = 20; // space between header and first circle

// Circles for size legend
const mealSizes = [1, 2]; // example max 2 meals
mealSizes.forEach((val, i) => {
  sizeLegend.append("circle")
    .attr("r", rScale(val))
    .attr("cy", circleOffset + i * 40) // add offset from header
    .attr("fill", "none")
    .attr("stroke", "#999999");

  sizeLegend.append("text")
    .text(val)
    .attr("x", 25)
    .attr("y", circleOffset + i * 40) // match circle position
    .attr("font-size", "12px")
    .attr("alignment-baseline", "middle");

});