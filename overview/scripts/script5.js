/* 
import "core-js/stable"; // core-js
import "regenerator-runtime/runtime"; // Polyfilling async functions
*/

//////////////////////////////////////////////
////////// Importing Scripts in ES6 //////////
//////////////////////////////////////////////

// Imported scripts are always executed before the main script
// ↓ 'import' statements are always hoisted to the top of the file
console.log("Importing modules");

// ↓ Do NOT use the export default with named imports
// import add, { addToCart, totalPrice as tp, tq } from "./shoppingCart.js";

// First
/* 
import { addToCart, totalPrice as tp, tq } from "./shoppingCart.js";
console.log(addToCart);
console.log(tp, tq);
*/

/* 
import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.tq);
*/

// Second
import add from "./shoppingCart.js";
add("pizza", 2);

// Module does NOT simply import the code from another file, but they also import the STATE of the module.
// So, mutations to the imported module will affect the original module.
// This is called "Live Connection"

console.log("////////// Top-level await //////////");
// ↓ In the ES6 modules, with the top-level await, we can use the await keyword outside of an async function. (Use it only in necessary situations)
const res = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await res.json();
console.log(data);

console.log("////////// IIFE with Closures //////////");
// IIFE is executed immediately, and the closures are preserved.
// IIFE is a good way to create data privacy.
// IIFE is a good way to avoid polluting the global scope.
// IIFE is a good way to avoid naming conflicts.
// IIFE is a good way to avoid overwriting variables.

console.log("////////// Common JS Modules & EMD Modules //////////");
// Common JS modules are the modules used in Node.js.

console.log("////////// Parcel //////////");
// parcel is another CLI tool for bundling
// npx parcel index.html <- This command will start a development server and watch the files for changes.
// or create a command in the package.json file

// ↓ This is a special syntax that only parcel can understand.
/* 
if (module.hot) {
  module.hot.accept();
}
*/
