import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js"
// runs all code without importing anything
//import "../data/cart-class.js";
//import "../data/car.js"
//import "../data/backend-practice.js";

// Promises
// better way to handle asynchronous code, similar to jasmine's done() function - it lets us wait for some code to finish before going to the next step
// when we create a promise, it's going to runimmediately
// resolve lets us control when we get to the next step
/* new Promise((resolve) => {
    loadProducts(() => {
        resolve('value'); //goes to the next step
        // promise creates a different thread - next step is separate and its running on its own
    });
    // whatever is given to resolve() is passed to then - this lets us share a value between two steps of a promise
}).then((value) => { // this is the next step, we waited until loadProducts was finished, called resolve and then went to the next step
    console.log(value);
    // next step returns another promise which has another resolve
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();// goes to next step in then
        });
    });
    
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
 */
// we can run multiple promises at the same time. Promise.all lets us run multiple promises at the same time and wait for all of them to finish

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value'); //goes to the next step
            // promise creates a different thread - next step is separate and its running on its own
        });
        // whatever is given to resolve() is passed to then - this lets us share a value between two steps of a promise
    }),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();// goes to next step in then
        });
    })

]).then(
    (values) => { // values contain 'values' given to resolve in the promises
        console.log(values);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    }
);
 
// why promises? multiple callbacks cause a lot of nesting

/* loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
    
})  */

