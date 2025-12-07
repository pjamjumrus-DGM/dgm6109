/* */



"use strict";

document.addEventListener("DOMContentLoaded", function () {
  d3.json("dailyData.json")
    .then(function (dailyData) {

      // -------------------- DRAWING ----------------------

      const cellSize = 80;
      const cols = 7;
      const margin = { top: 60, right: 30, bottom: 20, left: 30 };

      const parseDate = d3.timeParse("%d %b %Y");
      dailyData.forEach(d => { d.dateObj = parseDate(d.date); });

      const startDate = d3.min(dailyData, d => d.dateObj);
      const endDate   = d3.max(dailyData, d => d.dateObj);
      const numWeeks  = d3.timeWeek.count(startDate, endDate) + 1;

      const calendarWidth  = cols * cellSize;
      const calendarHeight = numWeeks * cellSize;

      const legendWidth = 230;
      const gap = 60;

      const svgWidth  = margin.left + calendarWidth + gap + legendWidth + margin.right;
      const svgHeight = margin.top  + calendarHeight + margin.bottom;

      // Main SVG (calendar + legend in one SVG)
      const svg = d3.select("#calendar-wrapper")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("style", "display:block; margin:0 auto;");

      // Group for calendar
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d => d.dateObj.getDay() * cellSize;
      const y = d => d3.timeWeek.count(startDate, d.dateObj) * cellSize;

      // -------------------- NEW MOOD COLORS --------------------
      // This map controls BOTH calendar cells and legend colors.
      // Change hex codes here if you want to tweak tones.
      const moodColor = function(level) {
        const map = {
          5: "#123b7b", // Level 5 - deep blue
          4: "#2059a8", // Level 4 - medium blue
          3: "#3f7fc4", // Level 3 - light blue
          2: "#d6763c", // Level 2 - orange
          1: "#b13c2e", // Level 1 - red
          0: "#7e1f20"  // Level 0 - dark red
        };
        return map[level] || "#e0e0e0";
      };

      // -------------------- DAY LABELS --------------------
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

      // -------------------- MEAL PATTERNS --------------------
      const defs = svg.append("defs");

      // 1 meal – diagonal stripes
      const stripePattern = defs.append("pattern")
        .attr("id", "meal1Pattern")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 8)
        .attr("height", 8);

      stripePattern.append("path")
        .attr("d", "M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6")
        .attr("stroke", "white")
        .attr("stroke-width", 1.4);

      // 2 meals – dots
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

      // Draw empty grid
      //Two nested loops produce a full background grid.
      for (let w = 0; w < numWeeks; w++) {
        for (let d = 0; d < cols; d++) {
          g.append("rect")
          .attr("x", d * cellSize)
          .attr("y", w * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("fill", "white")
          .attr("stroke", "#b3b3b3");   // light grey grid line
        }
      }

      // -------------------- DAY GROUPS --------------------
      const dayGroups = g.selectAll("g.day")
        .data(dailyData)
        .enter()
        .append("g")
        .attr("class", "day")
        .attr("transform", d => `translate(${x(d)},${y(d)})`);

      // Background = mood color
      dayGroups.append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", d => moodColor(d.moodOutside))
        .attr("stroke", "#ffffff");   // white border between cells

      // pattern meals (only bottom half of the cell)
      dayGroups.filter(d => d.mealsPurchased === 1)
        .append("rect")
        .attr("x", 0)
        .attr("y", cellSize / 2)        // start at middle
        .attr("width", cellSize)
        .attr("height", cellSize / 2)   // bottom half
        .attr("fill", "url(#meal1Pattern)");

      dayGroups.filter(d => d.mealsPurchased === 2)
        .append("rect")
        .attr("x", 0)
        .attr("y", cellSize / 2)
        .attr("width", cellSize)
        .attr("height", cellSize / 2)
        .attr("fill", "url(#meal2Pattern)");
        // horizontal divider line only when there is at least 1 meal
      dayGroups
        .filter(d => d.mealsPurchased > 0)   // ← key change
        .append("line")
        .attr("x1", 0)
        .attr("x2", cellSize)
        .attr("y1", cellSize / 2)
        .attr("y2", cellSize / 2)
        .attr("stroke", "white")
        .attr("stroke-width", 1);

      // -------------------- HEART SHAPE --------------------
      // Re-usable heart path. Size is controlled by 'scale' in transforms.
      function heartPath(size) { // 'size' kept just in case you want to use it later
        return `
          M 25 15
          C 25 7, 10 0, 5 15
          C 0 28, 12 40, 25 45
          C 38 40, 50 28, 45 15
          C 40 0, 25 7, 25 15
          Z
        `;
      }

      // -------- Location visited in CALENDAR --------
      // 1 location = 1 heart
      dayGroups
        .filter(d => d.locationsVisited === 1)
        .append("path")
        .attr("d", heartPath(20))
        // position near top-right of each cell
        .attr("transform", `translate(${cellSize - 36}, 10) scale(0.45)`)
        .attr("fill", "white")
        .attr("stroke", "white")

      // 2 locations = 2 hearts side by side
      const twoLocGroups = dayGroups
        .filter(d => d.locationsVisited === 2)
        .append("g")
        .attr("class", "two-locations")
        // base position near top-right
        .attr("transform", `translate(${cellSize - 54}, 10)`);

      // first heart
      twoLocGroups.append("path")
        .attr("d", heartPath(20))
        .attr("transform", "translate(0,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      // second heart (shifted right)
      twoLocGroups.append("path")
        .attr("d", heartPath(20))
        .attr("transform", "translate(26,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      // Date number
      dayGroups.append("text")
        .attr("class", "date-number")
        .attr("x", 4)
        .attr("y", 18)
        .attr("fill", "white")       // white date text
        .text(d => d.dateObj.getDate());

    // Tooltip
    // I use an SVG <title> element to show a simple tooltip on hover.
    // tooltip displays the day's data in a readable text format.
    dayGroups.append("title")
     .text(function(d) {
     return d3.timeFormat("%d %b %Y")(d.dateObj) +
     "\nLocations visited: " + d.locationsVisited +
     "\nPurchased meals: " + d.mealsPurchased +
     "\nMood outside: " + d.moodOutside;
  });

      // -------------------- LEGEND --------------------
      const legendGroup = svg.append("g")
        .attr(
          "transform",
          `translate(${margin.left + calendarWidth + gap},${margin.top})`
        );

      // Legend frame
      const legendBoxWidth = legendWidth;
      const legendBoxHeight = calendarHeight;
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

      // --- Location visited (Legend) ---
      const locY = 20 + moodLevels.length * 24 + 35;
      const locGroup = lg.append("g")
        .attr("transform", `translate(0,${locY})`);

      locGroup.append("text")
        .attr("class", "legend-title")
        .text("Location visited")
        .attr("y", 0);

      // Row for "1" (one heart)
      const locRow1 = locGroup.append("g")
        .attr("transform", "translate(0,20)");

      locRow1.append("path")
        .attr("d", heartPath(22))
        .attr("transform", "translate(5,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

      locRow1.append("text")
        .attr("x", 40)
        .attr("y", 12)
        .text("1");

      // Row for "2" (two hearts)
      const locRow2 = locGroup.append("g")
        .attr("transform", "translate(0,48)");

      // first heart
      locRow2.append("path")
        .attr("d", heartPath(22))
        .attr("transform", "translate(5,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

      // second heart (shifted right)
      locRow2.append("path")
        .attr("d", heartPath(22))
        .attr("transform", "translate(33,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

      locRow2.append("text")
        .attr("x", 70)
        .attr("y", 15)
        .text("2");

      // --- Purchased meals (Legend) ---
      const mealLegendY = locY + 90;
      const mealGroup = lg.append("g")
        .attr("transform", `translate(0,${mealLegendY})`);

      mealGroup.append("text")
        .attr("class", "legend-title")
        .text("Purchased meals")
        .attr("y", 0);

      // 1 meal (stripes)
      mealGroup.append("rect")
        .attr("x", 0)
        .attr("y", 12)
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", "#c4c4c4")
        .attr("stroke", "#000");

      mealGroup.append("rect")
        .attr("x", 0)
        .attr("y", 12)
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", "url(#meal1Pattern)")
        .attr("stroke", "none");

      mealGroup.append("text")
        .attr("x", 30)
        .attr("y", 29)
        .attr("font-size", 16)
        .text("1 meal");

      // 2 meals (dots)
      mealGroup.append("rect")
        .attr("x", 0)
        .attr("y", 46)
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", "#c4c4c4")
        .attr("stroke", "#000");

      mealGroup.append("rect")
        .attr("x", 0)
        .attr("y", 46)
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", "url(#meal2Pattern)")
        .attr("stroke", "none");

      mealGroup.append("text")
        .attr("x", 30)
        .attr("y", 63)
        .attr("font-size", 16)
        .text("2 meals");

    })
    .catch(function (err) {
      console.error("Error loading JSON:", err);
    });
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

   - Reference: SVG <pattern> element
     https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern

   - Reference: SVG <path> and curve commands (used for heart shape)
     https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

   - Reference: d3.select().append("title") for tooltip
     https://github.com/d3/d3-selection#handling-events

------------------------------------------------------------- */
