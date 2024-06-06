import { fullOrders } from "../data/orders.js";
import { cart } from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct, loadFromBackend} from "../data/products.js";

console.log(fullOrders);

// make sure products are loaded from backend before proceeding
await loadFromBackend();

function renderOrdersPage() {

  /*
    order structure (within actual orders array)

    order:
      {
        id: ,
        orderTime,
        products: [],
        totalCostCents
      }

  */

  let ordersHTML = '';

  fullOrders.orders.forEach((order) => {
    // parse date to readable format
    const date = dayjs(order.orderTime).format('MMMM DD');
    const orderId = order.id;

    ordersHTML +=
      `
      <div class="order-container js-order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${date}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${renderProducts(order)}
        </div>
      </div>
      `;
  });

  document.querySelector('.js-order-summary').innerHTML = ordersHTML;

  document.querySelector('.js-order-cart-quantity').innerHTML = cart.calculateCartQuantity();

  document.querySelectorAll(".js-buy-product-again").forEach((element) => {
    element.addEventListener('click', () => {
      let elementProductId = element.dataset.productId;
      cart.addToCart(elementProductId, 1);
      renderOrdersPage();
    })
  });
}

function renderProducts(order) {
  /*
    product structure

    products: [
      {
        estimatedDeliveryTime: ,
        productId,
        quantity,
        variation
      }
    ]
  */

  let productsHTML = '';

  order.products.forEach((product) => {

    const productId = product.productId;
    const matchingProduct = getProduct(productId);
    const date = dayjs(product.estimatedDeliveryTime).format('MMMM DD');

    productsHTML +=
    `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${date}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-product-again" data-product-id=${matchingProduct.id}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <!--make sure to add url parameters to href eg tracking.html?orderId=123&productId=456-->
          <a href="tracking.html?orderId=${order.id}&productId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
    `;
  });

  return productsHTML;
}


renderOrdersPage();