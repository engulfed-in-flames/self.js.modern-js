"use strict";

//////////////////////////////////////////////
//////////  Array, Math, Date, Time //////////
//////////////////////////////////////////////

console.log("////////// Various Methods of Array //////////");
(() => {
  const alphabets = ["a", "b", "c", "d", "e"];

  // Common convention to remove the last element of the array.
  // `splice` and `reverse` mutate the original array
  alphabets.splice(-1);
  console.log(alphabets);

  // Get the last element
  console.log(alphabets[alphabets.length - 1]);
  console.log(alphabets.splice(-1)[0]);
  console.log(alphabets.at(-1));

  // map, filter, reduce, flat, flatMap some, every, find, findIndex, includes, indexOf, lastIndexOf, join, split, reverse, sort, slice, concat, push, unshift, pop, shift, splice, fill, copyWithin, entries, keys, values, from, isArray, of
  const arr1 = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
  const arr2 = [[[1, 2], 3], [[4, 5], 6], 7, 8, 9];
  console.log(arr1.flat());
  console.log(arr1.flat(1));
  console.log(arr2.flat(1));
  console.log(arr2.flat(2));

  // sort
  // return > 0 ? Switch order : Keep order
  //
  const movements = [
    400, 250, -120, 600, -1280, 4500, -320, -200, -100, -450, 960, 360, -500, 3400,
  ];
  movements.sort((a, b) => a - b);

  console.log(movements);
})();

console.log("////////// More ways of creating and filling arrays //////////");
(() => {
  // fill(value, start, end);
  const arr1 = new Array(10);
  arr1.fill(15, 3, 5);
  console.log(arr1);

  // Array.from
  const arr2 = Array.from({ length: 10 }, () => 1);
  console.log(arr2);

  const arr3 = Array.from({ length: 10 }, (_, i) => i + 1);
  console.log(arr3);
})();

console.log("////////// Array Methods Practice //////////");
(() => {
  const capitalizeTitle = (title) => {
    const exceptions = ["a", "an", "the", "but", "and", "or", "on", "in", "with"];
    const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
    return title
      .toLowerCase()
      .split(" ")
      .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
      .join(" ");
  };

  console.log(capitalizeTitle("this is a title."));
  console.log(capitalizeTitle("this is a SUBTITLE."));
  console.log(capitalizeTitle("THIS IS a header WITH description."));
})();

console.log("////////// Convert and Check Numbers //////////");
(() => {
  // Binary
  console.log(23 === 23.0); // Output: true
  console.log(0.1 + 0.2 === 0.3); // Output: false

  // Conversion
  console.log(Number("23"));
  console.log(+"23");
  console.log(23 + "");

  // Parsing
  console.log(Number.parseInt("30px", 10));
  console.log(Number.parseInt("e23", 10)); // Output: NaN
  console.log(Number.parseInt("30px", 2)); // Output: NaN
  console.log(Number.parseFloat("   2.5rem   "));

  // Check if value is NaN
  Number.isNaN;

  // Check if value is number
  Number.isFinite;
  Number.isInteger;

  // Math and Rounding
  // Math: max, min, PI, random, round, ceil, floor, trunc
  console.log(Math.PI);
  console.log(Math.random()); // cf) randomInt
  console.log(8 ** (1 / 3));

  // Round decimal
  console.log((2.7).toFixed(0));
  console.log((2.7).toFixed(3));
  console.log((2.34567).toFixed(3));

  // Numeric Seperator
  const diameter = 287_460_000_000;
  console.log(diameter);

  // Max and Min Integer
  const theBiggestNumber = 2 ** 53 - 1;
  console.log(theBiggestNumber);
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(Number.MIN_SAFE_INTEGER);

  // Big Integer
  console.log(12343458354090329524n);
  console.log(BigInt(12343458354090329524));
  console.log(324864783659689n * 100000n);
  // console.log(324864783659689n * 100000); ❌ Operation is allowed only between BigInt
  // console.log(Math.sqrt(16n)) // ❌ This operation also doesn't work
  console.log(typeof 20n);
  console.log(20n > 15); // Except for comparison, BigInt can be used as same as Number
  console.log(20n === 20); // But not for strict equality
  console.log(10n / 3n); // Outout: 3n
  console.log(10 / 3); // Output: 3.3333333333333335
})();

console.log("////////// Date and Time //////////");
(() => {
  // Date
  const now = new Date();
  console.log(now);
  console.log(Date.now());

  console.log(new Date("Aug 02 2020 18:05:41"));
  console.log(new Date("December 24, 2015"));
  console.log(new Date(2037, 10, 19, 15, 23, 5));

  console.log(new Date(0));
  console.log(new Date(3 * 24 * 60 * 60 * 1000));

  // Work with Date
  const future = new Date(2037, 10, 19, 15, 23);
  console.log(future);
  console.log(future.getFullYear()); // ❌ getYear()
  console.log(future.getMonth());
  console.log(future.getDate());
  console.log(future.getDay());
  console.log(future.getHours());
  console.log(future.getMinutes());
  console.log(future.getSeconds());
  console.log(future.toISOString());
  console.log(future.getTime()); // cf) Date.now()

  future.setFullYear(2040);
  console.log(future);
  console.log(+future);

  // Operate with Dates
  const date1 = new Date(2037, 10, 19, 16, 7);
  const date2 = new Date(2037, 11, 2, 15, 23);

  const calcDaysPassed = (date1, date2) =>
    Math.trunc(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  console.log(calcDaysPassed(date1, date2));
})();
