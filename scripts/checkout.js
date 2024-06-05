import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js"
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
// why promises? multiple callbacks cause a lot of nesting
// Promise.all([
//     /* new Promise((resolve) => {
//         loadProducts(() => {
//             resolve('value'); //goes to the next step
//             // promise creates a different thread - next step is separate and its running on its own
//         });
//         // whatever is given to resolve() is passed to then - this lets us share a value between two steps of a promise
//     }) */

//     // load products fetch  returns a promise
//     loadProductsFetch(),

//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();// goes to next step in then
//         });
//     })

// ]).then(
//     (values) => { // values contain 'values' given to resolve in the promises
//         console.log(values);
//         renderCheckoutHeader();
//         renderOrderSummary();
//         renderPaymentSummary();
//     }
// );

//async await is a shortcut for promises
// async makes a function return a promise, basically wrapping this code in a promise

async function loadPage() {

    // why we use async - so we can use await. await lets us wait for a promise to finsh before going to the next line - lets is write asynchronous code like normal code
    // we can only use await when inside an async function
    // we can't use await in a normal function, the closest function has to be async
    try { //try/catch for unexpected errors

        //throw 'error1'; // manually trigger an error

        //await loadProductsFetch();

        // asyunc await can only be used with promises, it doesn't do anything with a callback
/*         const value = await new Promise((resolve, reject) => {
            
            // 2 ways to manually trigger an error in promises
            // throw 'error 3'; --> throw does not run in the future
            // reject is a function and it lets us throw an error in the future///

            loadCart(() => {
                //reject('error3');
                resolve('value3');// goes to next step in then, whatever is resolved can be saved in a variable when using await
            });
        }); */

        //await loadCartFetch();

        await Promise.all([
           loadProductsFetch(),
           loadCartFetch() 
        ]);

        // will log 'value3' - what's in resolve
        //console.log(value);
        
    } catch (error) {// error contains info about the error
        console.log('Unexpected error. Please try again later');
    }
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    

    //return 'value2'; // this gets converted to resolve(value2)
}

loadPage();

/* loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
    
})  */

