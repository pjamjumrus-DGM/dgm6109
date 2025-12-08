"use strict";

/*
 * Main entry point for the page.
 */
document.addEventListener("DOMContentLoaded", function () {

  d3.json("dailyData.json")
    .then(function (dailyData) {

      /* ------------------------------------------------------------
         BASIC LAYOUT SETTINGS
         These values control the overall calendar layout.
      ------------------------------------------------------------- */

      let cellSize = 80;   // width and height of each day cell, in pixels
      let cols = 7;        // number of columns (Sunday through Saturday)
      let margin = { top: 60, right: 30, bottom: 20, left: 30 };

      // Function from D3 to read dates in the format "23 Sep 2025".
      let parseDate = d3.timeParse("%d %b %Y");   //convert strings  "23 Sep 2025" to Date()

      /*
        Convert the date string in each data row to a real Date object.
        To compute calendar positions (which week, which weekday).
      */
      dailyData.forEach(function (d) {
        d.dateObj = parseDate(d.date); // Store parsed Date object for positioning
      });

      // Find the earliest and latest dates in the dataset.
      let startDate = d3.min(dailyData, function (d) { return d.dateObj; }); // earliest dates in the dataset.
      let endDate = d3.max(dailyData, function (d) { return d.dateObj; }); //latest dates in the dataset.

      /*
        Count how many weeks need to display from 
        the first date through the last date.
      */
      let numWeeks = d3.timeWeek.count(startDate, endDate) + 1; //add 1 = gives the number of boundaries between them.

      let calendarWidth = cols * cellSize; // number of columns x width and height of each day cell
      let calendarHeight = numWeeks * cellSize;

      let legendWidth = 230; // fixed width area reserved for the legend
      let gap = 60;          //  // Space between calendar and legend

      let svgWidth = margin.left + calendarWidth + gap + legendWidth + margin.right;
      let svgHeight = margin.top + calendarHeight + margin.bottom;

      /*
        Create a single SVG that contains both:
        calendar grid on the left, and the legend on the right.
      */
      let svg = d3.select("#calendar-wrapper")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("style", "display:block; margin:0 auto;"); // Center SVG

      // Group that holds only the calendar portion (not the legend).
      let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      /**
       * X-position of a given day.
       * Column determined by weekday
       *
       * @param {Object} d One row from the dailyData array.
       * @returns {number} Horizontal offset of the cell in pixels.
       */
      function xPosition(d) {
        return d.dateObj.getDay() * cellSize;
      }

      /**
       * Y-position of a given day.
       *  Row determined by week offset.
       *
       * @param {Object} d - One row from the dailyData array.
       * @returns {number} Vertical offset of the cell in pixels.
       */
      function yPosition(d) {
        return d3.timeWeek.count(startDate, d.dateObj) * cellSize;
      }

      /**
       * Assign a background colour to each mood level.
       *  - mood levels are expected to be integers between 0 and 5.
       *  - any unexpected value falls back to a light grey.
       *
       * @param {number} level - MoodOutside value for that day (0–5).
       * @returns {string} A hex colour code used as the fill colour.
       */
      function moodColor(level) {
        let map = {
          5: "#123b7b", // Level 5 - deep blue (very good mood)
          4: "#2059a8", // Level 4 - medium blue
          3: "#3f7fc4", // Level 3 - light blue
          2: "#d6763c", // Level 2 - orange
          1: "#b13c2e", // Level 1 - red
          0: "#7e1f20"  // Level 0 - dark red (very bad mood)
        };
        return map[level] || "#e0e0e0"; // Fallback for unexpected values
      }

      /* ------------------------------------------------------------
         DAY LABELS (SUN, MON, TUE, ...)
         column is clearly associated with a day of the week.
      ------------------------------------------------------------- */

      let dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

      svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 10) + ")")
        .selectAll("text.day-label")
        .data(dayNames)
        .enter()
        .append("text")
        .attr("class", "day-label")
        .attr("x", function (_, i) { return i * cellSize + cellSize / 2; })
        .attr("y", -12)
        .attr("text-anchor", "middle")
        .text(function (d) { return d; });

      /* ------------------------------------------------------------
         MEAL PATTERNS (SVG <pattern> DEFINITIONS)
         used both inside the calendar cells and in the legend 
      ------------------------------------------------------------- */

      let defs = svg.append("defs"); // Pattern definitions container

      // Pattern for "1 meal": diagonal white stripes.
      let stripePattern = defs.append("pattern")
        .attr("id", "meal1Pattern")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 8)
        .attr("height", 8);

      stripePattern.append("path")
        .attr("d", "M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6")
        .attr("stroke", "white")
        .attr("stroke-width", 1.4);

      // Pattern for "2 meals": two white dots.
      let dotPattern = defs.append("pattern")
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

      /* ------------------------------------------------------------
         DRAW THE EMPTY GRID
         Two nested loops produce a full rectangular grid so that
         every possible calendar cell has a visible outline, even if
         no data point ends up in that square.
      ------------------------------------------------------------- */

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

      /* ------------------------------------------------------------
         GROUP PER DAY
         All visual elements for that date (background, hearts,
         patterns, text, tooltip) live inside this group.
      ------------------------------------------------------------- */
        // Position each day’s group
      let dayGroups = g.selectAll("g.day")
        .data(dailyData)
        .enter()
        .append("g")
        .attr("class", "day")
        .attr("transform", function (d) {
          return "translate(" + xPosition(d) + "," + yPosition(d) + ")";
        });

      // Background rectangle filled with the mood colour.
      dayGroups.append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", function (d) { return moodColor(d.moodOutside); }) // Apply mood color background
        .attr("stroke", "#ffffff");   // white border between cells

      /* ------------------------------------------------------------
         PURCHASED MEALS IN CALENDAR CELLS
         These overlays the bottom half of the cell.
         - 1 meal  = stripe pattern
         - 2 meals = dotted pattern
         If there are no purchased meals,it show just mood colour.
      ------------------------------------------------------------- */
      
      // Overlay stripe pattern for 1 purchased meal
      dayGroups.filter(function (d) { return d.mealsPurchased === 1; })
        .append("rect")
        .attr("x", 0)
        .attr("y", cellSize / 2)      // start at the middle
        .attr("width", cellSize)
        .attr("height", cellSize / 2) // bottom half only
        .attr("fill", "url(#meal1Pattern)");

      // Overlay dot pattern for 2 purchased meals  
      dayGroups.filter(function (d) { return d.mealsPurchased === 2; })
        .append("rect")
        .attr("x", 0)
        .attr("y", cellSize / 2)
        .attr("width", cellSize)
        .attr("height", cellSize / 2)
        .attr("fill", "url(#meal2Pattern)");

      // Draw a horizontal divider line whenever there is at least one meal.
      dayGroups
        .filter(function (d) { return d.mealsPurchased > 0; })
        .append("line")
        .attr("x1", 0)
        .attr("x2", cellSize)
        .attr("y1", cellSize / 2)
        .attr("y2", cellSize / 2)
        .attr("stroke", "white") // Divider between top and bottom half
        .attr("stroke-width", 1);

      /**
       * Build the SVG path for a heart shape.
       * The coordinates are designed for a roughly 50x50 box.
       * I apply scaling and translation later using SVG transforms
       * instead of changing this path directly.
       *
       * @param {number} size //Logical size parameter 
       * @returns {string} //A path description to use in an SVG <path>.
       */
      function heartPath(size) {
        return [
          "M 25 15",
          "C 25 7, 10 0, 5 15",
          "C 0 28, 12 40, 25 45",
          "C 38 40, 50 28, 45 15",
          "C 40 0, 25 7, 25 15",
          "Z"
        ].join(" ");
      }

      /* ------------------------------------------------------------
         LOCATIONS VISITED IN CALENDAR CELLS
         Locations are encoded using small heart icons.
      ------------------------------------------------------------- */

      // One location: a single white heart.
      dayGroups
        .filter(function (d) { return d.locationsVisited === 1; })
        .append("path")
        .attr("d", heartPath(20))
        .attr("transform", "translate(" + (cellSize - 36) + ",10) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "white");

      // Two locations: group containing two hearts.
      let twoLocGroups = dayGroups
        .filter(function (d) { return d.locationsVisited === 2; })
        .append("g")
        .attr("class", "two-locations")
        // Base position near the top-right corner.
        .attr("transform", "translate(" + (cellSize - 54) + ",10)");

      // First heart.
      twoLocGroups.append("path")
        .attr("d", heartPath(20))
        .attr("transform", "translate(0,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      // Second heart, slightly shifted to the right.
      twoLocGroups.append("path")
        .attr("d", heartPath(20))
        .attr("transform", "translate(26,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      /* ------------------------------------------------------------
         DATE LABEL INSIDE EACH CELL
         The date number sits in the top-left corner so that the
         calendar can still be read like a normal monthly calendar.
      ------------------------------------------------------------- */

      dayGroups.append("text")
        .attr("class", "date-number")
        .attr("x", 4)
        .attr("y", 18)
        .attr("fill", "white")
        .text(function (d) { return d.dateObj.getDate(); }); // Show day of month

      /* ------------------------------------------------------------
         SIMPLE TOOLTIP
         I use an SVG <title> element for a quick tooltip.
         When the user hovers browser shows a small popup.
      ------------------------------------------------------------- */

      dayGroups.append("title")
        .text(function (d) {
          let formatDate = d3.timeFormat("%d %b %Y");
          return formatDate(d.dateObj) +
            "\nLocations visited: " + d.locationsVisited +
            "\nPurchased meals: " + d.mealsPurchased +
            "\nMood outside: " + d.moodOutside;
        });

      /* ------------------------------------------------------------
         LEGEND
         The legend explains how to read:
         - the mood colours,
         - the heart icons for locations, and
         - the patterns for purchased meals.
      ------------------------------------------------------------- */

      let legendGroup = svg.append("g")
        .attr(
          "transform",
          "translate(" + (margin.left + calendarWidth + gap) + "," + margin.top + ")"
        );

      // Border around the entire legend area.
      let legendBoxWidth = legendWidth;
      let legendBoxHeight = calendarHeight;
      legendGroup.append("rect")
        .attr("x", 0.5)
        .attr("y", 0.5)
        .attr("width", legendBoxWidth - 1)
        .attr("height", legendBoxHeight - 1)
        .attr("fill", "none")
        .attr("stroke", "#000"); // Legend border

      let lg = legendGroup.append("g")
        .attr("transform", "translate(20,25)");

      // ---------- Mood outside ----------
      lg.append("text")
        .attr("class", "legend-title")
        .text("Mood outside")
        .attr("y", 0);

      let moodLevels = [5, 4, 3, 2, 1, 0];

      let moodG = lg.selectAll("g.mood-item")
        .data(moodLevels)
        .enter()
        .append("g")
        .attr("class", "mood-item")
        .attr("transform", function (d, i) {
          return "translate(0," + (20 + i * 24) + ")";
        });

      moodG.append("rect")
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", function (d) { return moodColor(d); })
        .attr("stroke", "#000");

      moodG.append("text")
        .attr("x", 30)
        .attr("y", 14)
        .text(function (d) { return "Level " + d; });

      // ---------- Locations visited (Legend) ----------
      let locY = 20 + moodLevels.length * 24 + 35;
      let locGroup = lg.append("g")
        .attr("transform", "translate(0," + locY + ")");

      locGroup.append("text")
        .attr("class", "legend-title")
        .text("Location visited")
        .attr("y", 0);

      // Row for "1" (one heart).
      let locRow1 = locGroup.append("g")
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

      // Row for "2" (two hearts).
      let locRow2 = locGroup.append("g")
        .attr("transform", "translate(0,48)");

      locRow2.append("path")
        .attr("d", heartPath(22))
        .attr("transform", "translate(5,0) scale(0.45)")
        .attr("fill", "white")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

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

      // ---------- Purchased meals (Legend) ----------
      let mealLegendY = locY + 90;
      let mealGroup = lg.append("g")
        .attr("transform", "translate(0," + mealLegendY + ")");

      mealGroup.append("text")
        .attr("class", "legend-title")
        .text("Purchased meals")
        .attr("y", 0);

      // 1 meal (stripes).
      mealGroup.append("rect")
        .attr("x", 0)
        .attr("y", 12)
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", "#c4c4c4")
        .attr("stroke", "#000"); // Base box

      mealGroup.append("rect")
        .attr("x", 0)
        .attr("y", 12)
        .attr("width", 22)
        .attr("height", 22)
        .attr("fill", "url(#meal1Pattern)") // Stripe overlay
        .attr("stroke", "none");

      mealGroup.append("text")
        .attr("x", 30)
        .attr("y", 29)
        .attr("font-size", 16)
        .text("1 meal");

      // 2 meals (dots).
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
        .attr("fill", "url(#meal2Pattern)") // Dot overlay
        .attr("stroke", "none");

      mealGroup.append("text")
        .attr("x", 30)
        .attr("y", 63)
        .attr("font-size", 16)
        .text("2 meals");

    })
    .catch(function (err) {
      // If something goes wrong loading the JSON file, we log the error here.
      console.error("Error loading JSON:", err);
    });
});

/* ------------------------------------------------------------
   References (for code ideas and API usage):

   - d3.timeParse() and d3.timeFormat()
     Used to parse and format the date values.
     https://github.com/d3/d3-time-format

   - d3.timeWeek.count()
     Used to compute the week index for each date.
     https://github.com/d3/d3-time#timeWeek

   - d3.min() and d3.max()
     Used to find the first and last dates in the dataset.
     https://github.com/d3/d3-array#min
     https://github.com/d3/d3-array#max

   - d3.select(), .append(), and data binding patterns
     Used throughout to build and update SVG elements.
     https://github.com/d3/d3-selection

   - d3.scaleOrdinal()
     I consulted this when planning the mood-to-colour mapping,
     even though I ended up using a simple lookup object instead.
     https://github.com/d3/d3-scale#scaleOrdinal

   - SVG <pattern> element
     Used for the stripe and dot patterns that mark meal counts.
     https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern

   - SVG path tutorial
     Helped when designing the heart shape for locations visited.
     https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

   - Tooltip using SVG <title>
     Idea of attaching a <title> to each element so the browser
     displays a native tooltip on hover.
     https://github.com/d3/d3-selection#handling-events
------------------------------------------------------------- */
