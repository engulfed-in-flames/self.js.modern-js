"use strict";

/////////////////////////////////////////////////////////
////////// Destructuring and Logical Operators //////////
/////////////////////////////////////////////////////////

console.log("////////// Destructuring //////////");
(() => {
  // Destructuring also can be applyed to the nested data structure.
  // Mutating variables
  const obj = { a: 20, b: 40, c: 60, d: { e: 80, f: 100 } };
  let a = 15;
  let b = 30;

  // {a, b} = obj; ❌ JS understands parathesis as a code block
  ({ a, b } = obj);
  console.log(a, b);

  // Little bit complicated
  const job = {
    name: "Raw-code Engineer",
    location: "Osaka-si Chuo-ku Minamisenba",
    categories: ["PHP", "JS", "Spiral"],
    salary: "$50000",
  };

  const [firstCategory, secondCategory] = job.categories;
  console.log(firstCategory, secondCategory);

  // Only get the third value
  const [, , tertiaryCategory] = job.categories;
  console.log(tertiaryCategory);

  // Default values
  const [
    category1 = "Category doesn't exist",
    category2 = "Category doesn't exist",
    category3 = "Category doesn't exist",
    category4 = "Category doesn't exist",
  ] = job.categories;

  console.log(category1, category2, category3, category4);

  job.showWorkHour = ({ start = "09:00", end = "18:00", reason = "" } = {}) => {
    const message =
      (reason ? `Becasue of ${reason}, the work hour ` : "The work hour ") +
      `is from ${start} to ${end}`;
    console.log(message);
  };

  const workhour = {
    start: "08:00",
    end: "17:00",
    reason: "summertime",
  };

  job.showWorkHour(workhour);
  job.showWorkHour();
})();

console.log("////////// Spread Operators //////////");
(() => {
  // Iterables: Array, String, Map, Set, ❌ Object
  const emotions = ["happy", "enthusiastic", "delighted", "satisfied"];
  const newEmotions1 = ["terrified", ...emotions];
  const newEmotions2 = [...emotions, "terrified"];

  console.log(newEmotions1);
  console.log(newEmotions2);

  const food = {
    name: "Fettuccine Alfredo",
    ingredients: [
      "extra-virgin olive oil",
      "pasta water",
      "pasta",
      "Cauliflower",
      "Dijon mustard",
      "lemon juice",
      "garlic",
      "Parmesan cheese",
      "butter",
    ],
    time: "45 minutes",
  };

  const supplementIngredients = [
    prompt("What other ingredients do you need?\n Ingredient 1: "),
    prompt("Ingredient 2: "),
    prompt("Ingredient 3: "),
  ];

  food.ingredients = [...food.ingredients, ...supplementIngredients];
  console.log(food);
})();

console.log("////////// Rest Operator //////////");
(() => {
  let [num1, num2, ...otherNums] = [1, 2, 3, 4, 5];
  console.log(num1, num2, otherNums);

  // Only the one REST operator is allowed
  // let [num1, num2, ...otherNums1, ...otherNum2] = [1,2,3,4,5]; ❌
  const getSum = (...nums) => nums.reduce((acc, currentValue) => acc + currentValue, 0);

  console.log(getSum(1, 2, 3, 4, 5));
  console.log(getSum(2, 4, 6, 8, 10));
  console.log(getSum(3, 6, 9, 12, 15));

  const nums = [10, 20, 30, 40, 50];
  console.log(getSum(...nums));
})();

console.log("////////// Short Circuiting Operators (&& and ||) //////////");
console.log("////////// Logical Assignment Operators //////////");
(() => {
  let [num1, num2] = [0, 1];
  let [str1, str2] = ["", "Hello World!"];

  num1 ||= 100;
  num2 ||= 100;
  str1 ||= "Goodbye World!";
  str2 ||= "Goodbye World!";

  console.log(num1, num2, str1, str2);
  console.log("---- ---- ---- ----");

  [num1, num2] = [0, 1];
  [str1, str2] = ["", "Hello World!"];

  num1 &&= 100;
  num2 &&= 100;
  str1 &&= "Goodbye World!";
  str2 &&= "Goodbye World!";

  console.log(num1, num2, str1, str2);
  console.log("---- ---- ---- ----");

  [num1, num2] = [0, 1];
  [str1, str2] = ["", "Hello World!"];

  num1 ??= 100;
  num2 ??= 100;
  str1 ??= "Goodbye World!";
  str2 ??= "Goodbye World!";

  console.log(num1, num2, str1, str2);
  console.log("---- ---- ---- ----");
})();

console.log("////////// Optional Chaining //////////");
(() => {
  const restaurant = {
    name: "Rodie's Restaurant",
    categories: ["vegan", "hallal", "italian", "instant"],
  };

  console.log(restaurant.categories[1]);
  console.log(restaurant.categories[1].price);
  console.log(restaurant.categories[1]?.price);
  console.log(restaurant.categories[1]?.price || "Price property doesn't exists");
  console.log("---- ---- ---- ----");

  // Method
  console.log(restaurant.order?.(0, 1));
})();
