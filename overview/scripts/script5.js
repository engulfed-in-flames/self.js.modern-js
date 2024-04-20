"use strict";

///////////////////////////////
////////// Functions //////////
///////////////////////////////

console.log("////////// Enhanced Object Literals //////////");
(() => {
  const weekdays = ["Mon", "Tue", "Wed", "Thr", "Fri"];
  const menu = ["pizza", "chiken", "hamburger", "sandwich", "coke"];
  const restaurant = {
    name: "Rodie's Restaurant",
    [weekdays[2]]: "On Sale",
    menu,
    categories: ["vegan", "hallal", "italian", "instant"],
    order(food) {
      return this.menu.includes(food) ? "$15" : "$0";
    },
  };

  console.log(restaurant);
  console.log(restaurant.order("pizza"));
  console.log(restaurant.order("baked feta pasta"));
})();

console.log("////////// How passing arguments in JS //////////");
(() => {
  // First-class functions : Functions treated like any other variable.
  // Functions are just another "type" of object.

  // Higher-order Functions : Functions that receive another functions as arguments or, that return a new function or, both.
  // Pass functions as arguments (so-called callbacks) to indicate what exactly they should do.

  // ❗ Warning: When you pass an objects as an argument, that argument point the original address of the object.
  const passenger = {
    name: "John Doe",
    age: 24,
  };
  const seatNumber = "F4";

  const checkIn = (passenger, seatNumber) => {
    seatNumber = "G1";
    passenger.name = "Mr." + passenger.name;
    passenger["seatNumber"] = seatNumber;
  };

  checkIn(passenger, seatNumber);

  console.log(passenger);
  console.log(seatNumber);
})();

console.log("////////// Call, Apply, Bind //////////");
(() => {
  // `call` method allows us to call a function with a certain `this` value and arguments.
  // `bind` method allows us to create a new function with a certain `this` value and arguments.
  // Instead of using `apply`, use `call` method. You can acheive the same effect only with `call` method.
})();

console.log("////////// Immediately Invoked Function Expressions (IIFE) //////////");
(() => {
  // Useful for data privacy and avoid polluting the global scope
  // Useful with async/await
  (function () {
    // Data defined in this scope exists only  in this function scope
    // You can protect data or escape from the scope chain
    console.log("This will never run again");
  })();

  (() => console.log("This will ALSO never run again"))();
})();

console.log("////////// Closure //////////");
(() => {
  function booking() {
    let passengerCount = 0;

    return () => {
      passengerCount++;
      console.log(`${passengerCount} passengers booked`);
    };
  }

  // ↓ 1.
  [1, 2, 3, 4, 5].forEach(() => booking()());

  // ↓ 2.
  const counter = booking();
  [1, 2, 3, 4, 5].forEach(() => counter());

  // How is this possible?
  // As long as the `counter` variable is created and lives in, `passengerCount` has the same lifecycle with `counter`.
  // This is called `closure`.

  // Some ways of defining `closure`
  // 1. The closed-over variable environment of the execution context in which a function was created, even after that execution context is gone.
  // 2. A closure gives a function access to all the variables of its parent function, even after that parent function has returned.
  // The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
  // 3. A closure makes sure that a function doesn't lose connection to variables the existed at the function's birth palce.
  // ❗ Be aware that you cannot access the internal variables but can just see what happens.
  // ❗ Be aware that closure has a priority over the scope chain.

  ////////// Simple Examples //////////

  let f;
  const g = function () {
    const a = 15;
    // Create closure
    f = function () {
      console.log(a * 2);
    };
  };

  const h = function () {
    const b = 999;
    // Create closure
    f = function () {
      console.log(b * 2);
    };
  };

  g();
  f(); // At this point, `g` function has already finished its execution
  h();
  f(); // At this point, `h` function has already finished its execution
})();

console.log("////////// Budgets //////////");
(() => {
  const budget = Object.freeze([
    { value: 250, description: "Sold old TV 📺", user: "jonas" },
    { value: -45, description: "Groceries 🥑", user: "jonas" },
    { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
    { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
    { value: -1100, description: "New iPhone 📱", user: "jonas" },
    { value: -20, description: "Candy 🍭", user: "matilda" },
    { value: -125, description: "Toys 🚂", user: "matilda" },
    { value: -1800, description: "New Laptop 💻", user: "jonas" },
  ]);

  const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
  });

  const getLimit = (limits, user) => limits?.[user] ?? 0;

  const addExpense = function (budget, limits, value, description, user = "jonas") {
    const cleanUser = user.toLowerCase();

    // This creates a new object and does not mutate the original object.
    // However, it also creates so many new objects, which is not good for performance.
    return value <= getLimit(limits, user)
      ? [...budget, { value: -value, description: description, user: cleanUser }]
      : budget;
  };

  // In the real world, we use compoisition instead of chaining function like this.
  // Composition is a way to combine simple functions to build more complicated ones.
  const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
  const newBudget2 = addExpense(newBudget1, spendingLimits, 100, "Going to movies 🍿", "Matilda");
  const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");
  console.log(newBudget1);
  console.log(newBudget2);
  console.log(newBudget3);

  const checkExpenses = (budget, limits) =>
    budget.map((entry) =>
      entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: "limit" } : entry
    );

  const finalBudget = checkExpenses(newBudget3, spendingLimits);
  console.log(finalBudget);

  const logBigExpenses = (budget, limit) => {
    const bigExpenses = budget
      .filter((entry) => entry.value <= -limit)
      .map((entry) => entry.description.slice(0, 2))
      .join(" / ");
    // .reduce((str, cur) => `${str}${cur.description.slice(-2)} / `, " ", "");
    console.log(bigExpenses);
  };

  logBigExpenses(finalBudget, 1000);
})();
