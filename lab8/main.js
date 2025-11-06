"use strict";

/* ------------------------------------------------------------
   LAB 8: Bubble Plot - Exploring Relationship Between 
   Hours Outside and Daily Reflection
   ------------------------------------------------------------
   Hypothesis:
   The longer I spend outside, the higher my daily reflection score will be. 
   Circle size = money spent (possible lifestyle effect)
   Color = moodOutside (emotional effect)
------------------------------------------------------------- */

let svgWidth = 800;
let svgHeight = 600;
let margin = { top: 50, right: 200, bottom: 60, left: 70 };

/* === Dataset (Full) === */
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

/* === Filter Data === */
let plotData = dailyData.filter(d => d.hoursOutside > 0);

/* === Sort Data === */
// sort so that larger circles (more meals) are drawn first and appear behind smaller ones
plotData.sort((a, b) => b.mealsPurchased - a.mealsPurchased);

/* === Scales === */
let xScale = d3.scaleLinear()
  .domain([0, d3.max(plotData, d => d.hoursOutside) + 1])
  .range([margin.left, svgWidth - margin.right]);

let yScale = d3.scaleLinear()
  .domain([0, 5])  // fixed range 0–5 
  .range([svgHeight - margin.bottom, margin.top]);

// Changed from scaleLinear() to scalePow().exponent(0.5)
let rScale = d3.scalePow()
  .exponent(0.5)
  .domain([0, d3.max(plotData, d => d.mealsPurchased)])
  .range([6, 30]);

/* === Earth-tone Mood Colors === */
let moodColors = d3.scaleOrdinal()
  .domain([0, 1, 2, 3, 4, 5])
  .range([
    "#8B0000", // 0 - Frustrated 
    "#C0504D", // 1 - Anxious 
    "#D9923B", // 2 - Neutral 
    "#C6721F", // 3 - Pleasant
    "#4C9A2A", // 4 - Optimistic 
    "#2E7D32"  // 5 - Enjoyable 
  ]);

/* === SVG === */
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* === Axes === */
svg.append("g")
  .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
  .call(d3.axisBottom(xScale));

svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(yScale).ticks(6).tickFormat(d3.format("d")));

/* === Circles === */
svg.selectAll("circle.data-point")
  .data(plotData)
  .enter()
  .append("circle")
  .classed("data-point", true)
  .attr("cx", d => xScale(d.hoursOutside))
  .attr("cy", d => yScale(d.dailyReflection))
  .attr("r", d => rScale(d.mealsPurchased))
  .attr("fill", d => moodColors(d.moodOutside))
  .attr("opacity", 0.8)
  .append("title")
  .text(d =>
    `${d.date}\nHours Outside: ${d.hoursOutside}\nReflection: ${d.dailyReflection}\nMeals: ${d.mealsPurchased}\nMood Level: ${d.moodOutside}`
  );

/* === Labels === */
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 10)
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .text("Hours Spent Outside (per day)");

svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("font-size", "14px")
  .text("Daily Reflection (0–5)");

svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("font-weight", "bold")
  .text("Hours Outside vs Daily Reflection (Bubble = Meals, Color = Mood)");

/* === Color Legend === */
let moods = [
  { level: 5, label: "Enjoyable" },
  { level: 4, label: "Optimistic" },
  { level: 3, label: "Pleasant" },
  { level: 2, label: "Neutral" },
  { level: 1, label: "Anxious" },
  { level: 0, label: "Frustrated" }
];

let colorLegend = svg.append("g")
  .attr("transform", `translate(${svgWidth - 150}, ${margin.top + 10})`);

colorLegend.append("text")
  .text("Mood Level (0–5)")
  .attr("font-weight", "bold")
  .attr("font-size", "12px")
  .attr("y", -10);

moods.forEach((m, i) => {
  colorLegend.append("rect")
    .attr("x", 0)
    .attr("y", i * 25)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", moodColors(m.level));

  colorLegend.append("text")
    .text(`${m.level} – ${m.label}`)
    .attr("x", 30)
    .attr("y", i * 25 + 15)
    .attr("font-size", "12px");
});

/* === Size Legend (Meals Purchased) === */
let sizeLegend = svg.append("g")
  .attr("transform", `translate(${svgWidth - 130}, ${margin.top + 260})`); // moved right (+20) and down (+30)

sizeLegend.append("text")
  .text("Meals Purchased")
  .attr("font-weight", "bold")
  .attr("font-size", "12px")
  .attr("x", -20)   
  .attr("y",-25); 

  [1, 2, 3].forEach((val, i) => {
  let circleY = i * 25; // align with mood legend spacing
  let textY = circleY + 15; // same as mood legend text

  sizeLegend.append("circle")
    .attr("r", rScale(val) / 1.8)  // smaller circle size
    .attr("cy", i * 55)            // more spacing between circles
    .attr("fill", "none")
    .attr("stroke", "#666");

  sizeLegend.append("text")
    .text(`${val} meal${val > 1 ? "s" : ""}`)
    .attr("x",30)                 // move text a bit right
    .attr("y", i * 55 + 5)
    .attr("font-size", "12px");
});

/* ------------------------------------------------------------
   References:

   - Reference: d3.scalePow()
     https://github.com/d3/d3-scale#scalePow

   - Reference: d3.extent()
     https://github.com/d3/d3-array#extent

   - Reference: d3.scaleLinear()
     https://github.com/d3/d3-scale#scaleLinear

   - Reference: d3.scaleOrdinal()
     https://github.com/d3/d3-scale#scaleOrdinal

   - Reference: d3.axisBottom(), d3.axisLeft()
     https://github.com/d3/d3-axis

   - JavaScript Array Methods: filter(), sort()
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
------------------------------------------------------------- */
