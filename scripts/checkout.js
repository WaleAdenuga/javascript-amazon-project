import { cart, removeFromCart, calculateCartQuantity } from "../data/cart.js";
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
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link">
              Update
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

function updateCheckoutCount() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-count').innerHTML = `${cartQuantity} items`;
}

