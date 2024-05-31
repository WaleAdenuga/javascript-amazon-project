import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// import from external url (esm version of external library)
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import { deliveryOptions } from "../data/deliveryOptions.js";
/* 
default export
used when we only want to export one thing
each file can only have one default export

Named export is the one with curly brackets {}
not every library has an esm version so you might have to use script tags
*/
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

hello();
// external libraries - code outside of our project
// lets us share code and avoid duplication
// when doing something complicated, find external library first
// minification - compress code, single letter variables, no spaces so website can be loaded faster
// search documentation for info on how to use
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate);

console.log(deliveryDate.format('dddd, MMMM D'));
// to calculate delivery date
// - get today's date
// - do calculations
// - display in easy to read format

// have order summary page in single function
// call re-render when making some particular changes

// event listeners are also in because regenerating the html deletes the previous one
// a function can run/recall itself - recursion
function renderOrderSummary() {
  let cartSumaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // de-duplicating or normalizing data
    let matchingProduct;
    products.forEach((product) => {
      if(product.id === productId) {
        matchingProduct = product;
      }
    });

    /* <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
        radio selector - if a set of radio selectors have the same name, you can only select one of them
        
    */

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    )
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSumaryHTML +=
      `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary
                js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input class="quantity-input js-quantity-input-${matchingProduct.id} js-quantity-keydown-${matchingProduct.id}">
              <span class="save-quantity-link js-save-link link-primary" data-product-id="${matchingProduct.id}">
                Save
              </span>
              
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            
          </div>
        </div>
    </div>
      `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSumaryHTML;

  updateCheckoutCount();


  // loop through delivery options created in .js
  // for each generate html
  // combine all together
  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = (deliveryOption.priceCents === 0) ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += 
      `<div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        
        <input type="radio"
          ${isChecked ? 'checked' : '' }
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelectorAll('.js-delivery-option').forEach((element)=> {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      // regenerate all html - render page again basically 
      /*
      - Update the data
      - Regenerate all the HTML
      this is called MVC (Model - View - Controller) - design pattern
      code split into three parts
      Model - saves and manages the data (in our /data)
      View - takes and displays on the page (checkout.js)
      Controller - runs some code when we interact with the page(event listeners)

      MVC makes sure the page always matches the data
      */
      renderOrderSummary();
    });
  });




  // when we click delete, remove the product from the cart and update the html to remove the product from the page

  /*
  To remove the html, use DOM to get element to remove and then use .remove(); 
  */
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      removeFromCart(productId);
      console.log(cart);

      let container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.remove();
      updateCheckoutCount();
    });
    
  });

  // click update and update quantity, enable some css styles
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      
      // get container for product
      let container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.add('is-editing-quantity');    

      // listen for enter key on input and perform same function as save
      let inputListener = document.querySelector(`.js-quantity-keydown-${productId}`);
      inputListener.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          updateContainers(productId);
        }
      });
    });
  });

  // click save - reverse update stylings
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;    
      updateContainers(productId);
    });
  });

  // gets value from input, updates the cart and the quantity and checkout displays
  function updateContainers(productId) {

    let inputElement = document.querySelector(`.js-quantity-input-${productId}`);
      let newQuantity = Number (inputElement.value);

      if (newQuantity < 0 || newQuantity >= 100) {
        alert('Quantity must be between 0 and 100');
        return;
      }

    updateQuantity(productId, newQuantity);

    // get container for product
    let container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.classList.remove('is-editing-quantity');

    // update quantity displayed
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

    // update checkout up top
    updateCheckoutCount();
  }

  function updateCheckoutCount() {
    let cartQuantity = calculateCartQuantity();
    document.querySelector('.js-checkout-count').innerHTML = `${cartQuantity} items`;
  }

}

renderOrderSummary();