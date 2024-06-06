import { fullOrders } from "../data/orders.js";
import { getProduct, products, loadFromBackend } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from "../data/cart-class.js";

// make sure products are loaded from backend before proceeding
await loadFromBackend();

function renderTrackingPage() {
    const url = new URL(window.location.href);

    // get url parameters sent by order page
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    // matching product has info on product name, image, etc
    const matchingProduct = getProduct(productId);

    const orderDisplayed = fullOrders.getOrder(orderId);
    // order product has info on quantity ordered, delivery time
    let orderProduct;
    orderDisplayed.products.forEach((product) => {
        if(product.productId === productId) {
            orderProduct = product;
        }
    });

    const date = dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM DD');

    let progressBar = calculateProgress(orderDisplayed.orderTime, orderProduct.estimatedDeliveryTime);

    let trackingHTML = '';

    trackingHTML += 
    `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>

        <div class="delivery-date">
        Arriving on ${date}
        </div>

        <div class="product-info">
        ${matchingProduct.name}
        </div>

        <div class="product-info">
        Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label ${(progressBar < 49) ? "current-status" : "" }">
                Preparing
            </div>
            <div class="progress-label js-progress-label ${((progressBar > 49) && (progressBar < 100)) ? "current-status" : "" }">
                Shipped
            </div>
            <div class="progress-label js-progress-label ${(progressBar === 100) ? "current-status" : "" }">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width:${progressBar}%"></div>
        </div>
    </div>
    `;

    document.querySelector('.js-tracking-main').innerHTML = trackingHTML;

    document.querySelector('.js-tracking-cart-quantity').innerHTML = cart.calculateCartQuantity();
}

renderTrackingPage();

function calculateProgress(orderTime, deliveryTime) {
    return (
        dayjs().diff(dayjs(orderTime)) 
        / 
        dayjs(deliveryTime).diff(dayjs(orderTime))
        ) * 100;
}