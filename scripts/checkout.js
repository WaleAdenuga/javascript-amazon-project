import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
// runs all code without importing anything
import "../data/cart-oop.js";

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();