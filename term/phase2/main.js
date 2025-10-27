"use strict";

let dailyData = [
  {
    date: "23 SEP 2025",
    timeOutside: "11:40 - 20:40", 
    hoursOutside: 9, /// total hours outside
    moneySpent: 30, // CAD
    mealsPurchased: 2, // number of purchased meals
    locationsVisited: 2, // number of distinct locations
    dailyReflection: 1, // satisfaction level (1–5)
    moodOutside: 2 // mood score (1–5)
  }, // description of daily record
  {
    date: "24 SEP 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 42.76,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 1,
    moodOutside: 2
  },
  {
    date: "25 SEP 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    mmoneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 1,
    dailyReflection: 4,
    moodOutside: 3
  },
  {
    date: "26 SEP 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 8.81,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 2,
    moodOutside: 4
  },
  {
    date: "27 SEP 2025",
    timeOutside: "12:00 - 19:30",
    hoursOutside: 6.3,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 2,
    dailyReflection: 5,
    moodOutside: 5
  },
  {
    date: "28 SEP 2025",
    timeOutside: "Stay home",
    hoursOutside: 0,
    moneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 0,
    dailyReflection: 0,
    moodOutside: 0,
  },
  {
    date: "29 SEP 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 45,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 3,
    moodOutside: 2
  },
  {
    date: "30 SEP 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 5,
    moodOutside: 0,
  },
  {
    date: "01 OCT 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 59.94,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 3,
    moodOutside: 2
  },
  {
    date: "02 OCT 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 70.87,
    mealsPurchased: 1,
    locationsVisited: 2,
    dailyReflection: 2,
    moodOutside: 1
  },
  {
    date: "03 OCT 2025",
    timeOutside: "12:30 - 19:30",
    hoursOutside: 7,
    moneySpent: 36.53,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 4,
    moodOutside: 3
  },
  {
    date: "04 OCT 2025",
    timeOutside: "Stay home",
    hoursOutside: 0,
    moneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 0,
    dailyReflection: 0,
    moodOutside: 0,
  },
  {
    date: "05 OCT 2025",
    timeOutside: "Stay home",
    hoursOutside: 0,
    moneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 0,
    dailyReflection: 0,
    moodOutside: 0,
  },
  {
    date: "06 OCT 2025",
    timeOutside: "10:30 - 18:30",
    hoursOutside: 8,
    moneySpent: 121,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 1,
    moodOutside: 1
  },
  {
    date: "07 OCT 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 8,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 3,
    moodOutside: 4
  },
  {
    date: "08 OCT 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 4,
    moodOutside: 4
  },
  {
    date: "09 OCT 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 5,
    moodOutside: 4
  },
  {
    date: "10 OCT 2025",
    timeOutside: "12:00 - 19:30",
    hoursOutside: 7.3,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 4,
    moodOutside: 4
  },
  {
    date: "11 OCT 2025",
    timeOutside: "18:00 - 21:00",
    hoursOutside: 3,
    moneySpent: 104,
    mealsPurchased: 2,
    locationsVisited: 2,
    dailyReflection: 1,
    moodOutside: 3
  },
  {
    date: "12 OCT 2025",
    timeOutside: "Stay home",
    hoursOutside: 0,
    moneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 0,
    dailyReflection: 0,
    moodOutside: 0,
  },
  {
    date: "13 OCT 2025",
    timeOutside: "Stay home",
    hoursOutside: 0,
    moneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 0,
    dailyReflection: 0,
    moodOutside: 0,
  },
  {
    date: "14 OCT 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 200.67,
    mealsPurchased: 2,
    locationsVisited: 2,
    dailyReflection: 0,
    moodOutside: 1
  },
  {
    date: "15 OCT 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 5,
    moodOutside: 4
  },
  {
    date: "16 OCT 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 5,
    moodOutside: 4
  },
  {
    date: "17 OCT 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 15.75,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 3,
    moodOutside: 3
  },
  {
    date: "18 OCT 2025",
    timeOutside: "11:30 - 19:30",
    hoursOutside: 8,
    moneySpent: 0,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 3,
    moodOutside: 5
  },
  {
    date: "19 OCT 2025",
    timeOutside: "Stay home",
    hoursOutside: 0,
    moneySpent: 0,
    mealsPurchased: 0,
    locationsVisited: 0,
    dailyReflection: 0,
    moodOutside: 0,
  },
  {
    date: "20 OCT 2025",
    timeOutside: "10:30 - 18:30",
    hoursOutside: 8,
    moneySpent: 24.08,
    mealsPurchased: 1,
    locationsVisited: 1,
    dailyReflection: 4,
    moodOutside: 4
  },
  {
    date: "21 OCT 2025",
    timeOutside: "14:30 - 20:30",
    hoursOutside: 6,
    moneySpent: 119.81,
    mealsPurchased: 2,
    locationsVisited: 2,
    dailyReflection: 1,
    moodOutside: 1
  }
]; // list of daily observations

/* 
----------------------------------------------------------
Notes:
- hoursOutside: // total hours outside
- moneySpent: // CAD
- mealsPurchased: // number of purchased meals
- locationsVisited: // number of distinct locations
- dailyReflection: // satisfaction level (1–5)
- moodOutside: // mood score (1–5)
----------------------------------------------------------
*/


//console.log(JSON.stringify(dailyData)); // for validation in JSON Viewer
showData(dailyData); // final output on web page
