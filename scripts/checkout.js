import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


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

  cartSumaryHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartSumaryHTML;

updateCheckoutCount();

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

