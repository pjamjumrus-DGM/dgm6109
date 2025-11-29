"use strict";

// ---------------------- DATA ----------------------
const dailyData = [
  { date: "23 SEP 2025", hoursOutside: 9,   mealsPurchased: 2, locationsVisited: 2, moodOutside: 3 },
  { date: "24 SEP 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 3 },
  { date: "25 SEP 2025", hoursOutside: 6,   mealsPurchased: 0, locationsVisited: 1, moodOutside: 4 },
  { date: "26 SEP 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "27 SEP 2025", hoursOutside: 6.3, mealsPurchased: 1, locationsVisited: 2, moodOutside: 5 },
  { date: "28 SEP 2025", hoursOutside: 0,   mealsPurchased: 0, locationsVisited: 0, moodOutside: 0 },

  { date: "29 SEP 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 3 },
  { date: "30 SEP 2025", hoursOutside: 6,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 0 },
  { date: "01 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 3 },
  { date: "02 OCT 2025", hoursOutside: 6,   mealsPurchased: 1, locationsVisited: 2, moodOutside: 2 },
  { date: "03 OCT 2025", hoursOutside: 7,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 3 },
  { date: "04 OCT 2025", hoursOutside: 0,   mealsPurchased: 0, locationsVisited: 0, moodOutside: 0 },
  { date: "05 OCT 2025", hoursOutside: 0,   mealsPurchased: 0, locationsVisited: 0, moodOutside: 0 },

  { date: "06 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 1 },
  { date: "07 OCT 2025", hoursOutside: 6,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "08 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "09 OCT 2025", hoursOutside: 6,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "10 OCT 2025", hoursOutside: 7.3, mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "11 OCT 2025", hoursOutside: 3,   mealsPurchased: 2, locationsVisited: 2, moodOutside: 3 },
  { date: "12 OCT 2025", hoursOutside: 0,   mealsPurchased: 0, locationsVisited: 0, moodOutside: 0 },

  { date: "13 OCT 2025", hoursOutside: 0,   mealsPurchased: 0, locationsVisited: 0, moodOutside: 0 },
  { date: "14 OCT 2025", hoursOutside: 6,   mealsPurchased: 2, locationsVisited: 2, moodOutside: 1 },
  { date: "15 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "16 OCT 2025", hoursOutside: 6,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "17 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 4 },
  { date: "18 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 5 },
  { date: "19 OCT 2025", hoursOutside: 0,   mealsPurchased: 0, locationsVisited: 0, moodOutside: 0 },

  { date: "20 OCT 2025", hoursOutside: 8,   mealsPurchased: 1, locationsVisited: 1, moodOutside: 5 },
  { date: "21 OCT 2025", hoursOutside: 6,   mealsPurchased: 2, locationsVisited: 2, moodOutside: 1 }
];

// -------------------- DRAWING ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const cellSize = 80;
  const cols = 7;
  const margin = { top: 60, right: 30, bottom: 20, left: 30 };

  const parseDate = d3.timeParse("%d %b %Y");
  dailyData.forEach(d => { d.dateObj = parseDate(d.date); });

  const startDate = d3.min(dailyData, d => d.dateObj);
  const endDate   = d3.max(dailyData, d => d.dateObj);
  const numWeeks  = d3.timeWeek.count(startDate, endDate) + 1;

  const calendarWidth  = cols * cellSize;  // weight table content
  const calendarHeight = numWeeks * cellSize;

  const legendWidth = 230;   // weight legend
  const gap = 60;            // gap between legend

  const svgWidth  = margin.left + calendarWidth + gap + legendWidth + margin.right;
  const svgHeight = margin.top  + calendarHeight + margin.bottom;

  // SVG for all table + legend
  const svg = d3.select("#calendar-wrapper")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

  // SVG to middle position
    .attr("style", "display:block; margin:0 auto;");

  // group of calendar
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d => d.dateObj.getDay() * cellSize;
  const y = d => d3.timeWeek.count(startDate, d.dateObj) * cellSize;

  // mood outside color
  const moodColor = level => {
    const map = {
      0: "#8ac36e",  // Level 0 green
      1: "#abd8df",  // Level 1 light teal
      2: "#86a9ea",  // Level 2 light blue
      3: "#6b82d7",  // Level 3 blue
      4: "#aa8bd7",  // Level 4 purple
      5: "#d488b7"   // Level 5 pink
    };
    return map[level] || "#e0e0e0";
  };

  // topic for SUN–SAT
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top - 10})`)
    .selectAll("text.day-label")
    .data(dayNames)
    .enter()
    .append("text")
    .attr("class", "day-label")
    .attr("x", (_, i) => i * cellSize + cellSize / 2)
    .attr("y", -12)
    .attr("text-anchor", "middle")
    .text(d => d);

  // -------- patterns meals --------
  const defs = svg.append("defs");

  // 1 meal – pattern
  const stripePattern = defs.append("pattern")
    .attr("id", "meal1Pattern")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 8)
    .attr("height", 8);

  stripePattern.append("path")
    .attr("d", "M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6")
    .attr("stroke", "white")
    .attr("stroke-width", 1.4);

  // 2 meals – dot
  const dotPattern = defs.append("pattern")
    .attr("id", "meal2Pattern")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 8)
    .attr("height", 8);

  dotPattern.append("circle")
    .attr("cx", 2)
    .attr("cy", 2)
    .attr("r", 1.4)
    .attr("fill", "white");

  dotPattern.append("circle")
    .attr("cx", 6)
    .attr("cy", 6)
    .attr("r", 1.4)
    .attr("fill", "white");

  // space each box
  for (let w = 0; w < numWeeks; w++) {
    for (let d = 0; d < cols; d++) {
      g.append("rect")
        .attr("x", d * cellSize)
        .attr("y", w * cellSize)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", "white")
        .attr("stroke", "#000");
    }
  }

  // draw data in each day
  const dayGroups = g.selectAll("g.day")
    .data(dailyData)
    .enter()
    .append("g")
    .attr("class", "day")
    .attr("transform", d => `translate(${x(d)},${y(d)})`);

  // background = mood
  dayGroups.append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("fill", d => moodColor(d.moodOutside))
    .attr("stroke", "#000");

  // pattern meals
  dayGroups.filter(d => d.mealsPurchased === 1)
    .append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("fill", "url(#meal1Pattern)");

  dayGroups.filter(d => d.mealsPurchased === 2)
    .append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("fill", "url(#meal2Pattern)");

  // function drawing using scale
function heartPath(size) {
  const s = size / 50; 
  return `
    M 25 15
    C 25 7, 10 0, 5 15
    C 0 28, 12 40, 25 45
    C 38 40, 50 28, 45 15
    C 40 0, 25 7, 25 15
    Z
  `;
}

  // 1 location
  dayGroups.filter(d => d.locationsVisited === 1)
  .append("path")
  .attr("d", heartPath(22))
  .attr("transform", `translate(${cellSize - 30}, 10) scale(0.45)`)
  .attr("fill", "white")
  .attr("stroke", "white")
  .attr("stroke-width", 2);

  // 2 locations = white heart
  dayGroups.filter(d => d.locationsVisited === 2)
  .append("path")
  .attr("d", heartPath(36))
  .attr("transform", `translate(${cellSize - 36}, 6) scale(0.60)`)
  .attr("fill", "white")
  .attr("stroke", "white")
  .attr("stroke-width", 2);

  // number date
  dayGroups.append("text")
    .attr("class", "date-number")
    .attr("x", 4)
    .attr("y", 14)
    .text(d => d.dateObj.getDate());

  // tooltip
  dayGroups.append("title")
    .text(d =>
      `${d3.timeFormat("%d %b %Y")(d.dateObj)}
    Locations visited: ${d.locationsVisited}
    Purchased meals: ${d.mealsPurchased}
    Mood outside: ${d.moodOutside}`
    );

  // -------------- LEGEND right side --------------
  const legendGroup = svg.append("g")
    .attr(
      "transform",
      `translate(${margin.left + calendarWidth + gap},${margin.top})`
    );

  // frame legend
  const legendBoxWidth = legendWidth;
  const legendBoxHeight = calendarHeight; // put in high position
  legendGroup.append("rect")
    .attr("x", 0.5)
    .attr("y", 0.5)
    .attr("width", legendBoxWidth - 1)
    .attr("height", legendBoxHeight - 1)
    .attr("fill", "none")
    .attr("stroke", "#000");

  const lg = legendGroup.append("g")
    .attr("transform", "translate(20,25)");

  // --- Mood outside ---
  lg.append("text")
    .attr("class", "legend-title")
    .text("Mood outside")
    .attr("y", 0);

  const moodLevels = [5, 4, 3, 2, 1, 0];

  const moodG = lg.selectAll("g.mood-item")
    .data(moodLevels)
    .enter()
    .append("g")
    .attr("class", "mood-item")
    .attr("transform", (d, i) => `translate(0,${20 + i * 24})`);

  moodG.append("rect")
    .attr("width", 22)
    .attr("height", 22)
    .attr("fill", d => moodColor(d))
    .attr("stroke", "#000");

  moodG.append("text")
    .attr("x", 30)
    .attr("y", 14)
    .text(d => `Level ${d}`);

  // --- Location visited ---
  const locY = 20 + moodLevels.length * 24 + 35;
  const locGroup = lg.append("g")
    .attr("transform", `translate(0,${locY})`);

  locGroup.append("text")
    .attr("class", "legend-title")
    .text("Location visited")
    .attr("y", 0);

  const locItem = locGroup.append("g")
    .attr("transform", "translate(0,20)");

  /// 1 location = small heart
   locItem.append("path")
  .attr("d", heartPath(22))
  .attr("transform", "translate(5,-4) scale(0.45)")
  .attr("fill", "white")
  .attr("stroke", "#000")
  .attr("stroke-width", 1.5);

  // 2 locations = large heart
locItem.append("path")
  .attr("d", heartPath(36))
  .attr("transform", "translate(5,26) scale(0.60)")
  .attr("fill", "white")
  .attr("stroke", "#000")
  .attr("stroke-width", 1.5);

locItem.append("text").attr("x",40).attr("y",15).text("1");
locItem.append("text").attr("x",40).attr("y",45).text("2");

  // --- Purchased meals ---
  const mealLegendY = locY + 90;
  const mealGroup = lg.append("g")
    .attr("transform", `translate(0,${mealLegendY})`);

  mealGroup.append("text")
    .attr("class", "legend-title")
    .text("Purchased meals")
    .attr("y", 0);

  // 1 meal (stripes)
mealGroup.append("rect")              // soft grey
  .attr("x", 0)
  .attr("y", 12)
  .attr("width", 22)
  .attr("height", 22)
  .attr("fill", "#c4c4c4")
  .attr("stroke", "#000");

mealGroup.append("rect")              // pattern
  .attr("x", 0)
  .attr("y", 12)
  .attr("width", 22)
  .attr("height", 22)
  .attr("fill", "url(#meal1Pattern)")
  .attr("stroke", "none");

  // text “1 meal”
mealGroup.append("text")
  .attr("x", 30)
  .attr("y", 36)      // center
  .attr("font-size", 16)
  .text("1 meal");

// 2 meals (dots)
mealGroup.append("rect")              // background
  .attr("x", 0)
  .attr("y", 46)
  .attr("width", 22)
  .attr("height", 22)
  .attr("fill", "#c4c4c4")
  .attr("stroke", "#000");

mealGroup.append("rect")              // background
  .attr("x", 0)
  .attr("y", 46)
  .attr("width", 22)
  .attr("height", 22)
  .attr("fill", "url(#meal2Pattern)")
  .attr("stroke", "none");

  // text “2 meals”
mealGroup.append("text")
  .attr("x", 30)
  .attr("y", 70)      // center
  .attr("font-size", 16)
  .text("2 meals");

});

/* ------------------------------------------------------------
   References:

   - Reference: d3.timeParse(), d3.timeFormat()
     https://github.com/d3/d3-time-format

   - Reference: d3.timeWeek.count()
     https://github.com/d3/d3-time#timeWeek

   - Reference: d3.min(), d3.max()
     https://github.com/d3/d3-array#min
     https://github.com/d3/d3-array#max

   - Reference: d3.select(), d3.append()
     https://github.com/d3/d3-selection

   - Reference: d3.scaleOrdinal()  (used for mood colors)
     https://github.com/d3/d3-scale#scaleOrdinal

   - Reference: d3.symbol(), d3.symbolTriangle 
     https://github.com/d3/d3-shape#symbols

   - Reference: SVG <pattern> element
     https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern

   - Reference: SVG <path> and curve commands (used for heart shape)
     https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

   - Reference: d3.select().append("title") for tooltip
     https://github.com/d3/d3-selection#handling-events

   - JavaScript String Template Literals (used in heartPath)
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

   - JavaScript Array Methods: forEach(), filter(), map()
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
------------------------------------------------------------- */
