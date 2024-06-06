import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { fullOrders } from "../../data/orders.js";

export function renderPaymentSummary() {
  // save the data
  // generate the html
  // make it interactive
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTax * 0.1;

  const totalCents = totalBeforeTax + taxCents;

  const paymentSummaryHTML =
    `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.calculateCartQuantity()}):</div>
            <div class="payment-summary-money">
              $${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>

    `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  // use async await and promises to place an order
  // we'll make a request to the backend to create the order
  // we'll be sending data to the backemd
  /*
    GET - get something
    POST - create smthg (send something)
    PUT - update smthg
    DELETE -delete smthg
  */
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      // recall closest function must be async
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: { //gives backend more info about or request
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //actual data being sent, we need to send ab object with the property cart which contains the cart array.
          cart: cart

        })
      })

      // will return the order created by the backend, .json is also a promise so use await
      const order = await response.json();
      console.log(order);
      fullOrders.addOrder(order);

    } catch (error) {
      console.log('Unexpected error. Try again later' + error);
    }

    //window.location lets us control the url at the top of the browser
    // change href - orders.html is a file path since this is running from checkout.js which is running from checkut.html
    window.location.href = 'orders.html';

    // URL parameter - to know which order you're actually tracking, create parameter by changing url itself eg www.test.com/orders.html?orderId=123. You can save data in that url and use javascript to get that data

  });

}