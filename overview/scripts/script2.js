"use strict";

//////////////////////////
////////// Intl //////////
//////////////////////////

console.log("////////// Internationalizing Dates (Intl) //////////");
(() => {
  // Date
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric", // long
    year: "numeric",
    weekday: "numeric", // long
  };
  const locale = navigator.language;
  console.log(locale);

  console.log(new Intl.DateTimeFormat("en-US", options).format(now));
  console.log(new Intl.DateTimeFormat("ar-SY", options).format(now));
  console.log(new Intl.DateTimeFormat(locale, options).format(now));
})();

console.log("////////// Internationalizing Number (Intl) //////////");
(() => {
  const num = 3884764.23;
  const options = {
    style: "unit", // percent, currency
    unit: "mile-per-hour", // "celsius"
    currency: "EUR",
    // useGrouping: false,
  };

  console.log("US: ", new Intl.NumberFormat("en-US").format(num));
  console.log("Germany: ", new Intl.NumberFormat("de-DE").format(num));
  console.log("Syria: ", new Intl.NumberFormat("ar-SY").format(num));
  console.log("Browser: ", new Intl.NumberFormat(navigator.language).format(num));
})();
