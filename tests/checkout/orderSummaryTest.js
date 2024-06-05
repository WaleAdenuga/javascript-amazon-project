import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {cart} from '../../data/cart-class.js';

// Test how the page looks
// Test how the page behaves
describe('test suite: renderOrderSummary', () => {

    // global variables for product
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    // run setup code before each test
    beforeEach(() => {
        // mock only runs for one test
        spyOn(localStorage, 'setItem');

        //  need to be created to match the original platform because the functions populate these classes
        document.querySelector('.js-test-container').innerHTML = 
        `
            <div class='js-order-summary'></div>
            <div class='js-payment-summary'></div>
            <div class='js-checkout-header'></div>
        `;

        // replace localStorage.getItem with a fake version
        // anonymous func in callFake replaces that one
/*         
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(
                [
                    {
                        // we use productId to load other things like image, price etc
                        // that's called normalizing the data
                        productId: productId1,
                        quantity: 2,
                        deliveryOptionId: '1'
                    },
                    {
                        productId: productId2,
                        quantity: 1,
                        deliveryOptionId: '2'
                    }
                ]
            );
        }); */ 
        // replace spy function with normal get

        cart.cartItems = [
            {
                // we use productId to load other things like image, price etc
                // that's called normalizing the data
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }
        ];

        // after mocking, reload the cart
        //loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })

    it('displays the cart', () => {
        // when we load the cart, we should create two elements with class js-cart-item-container, verify

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        // verify that the quantity displayed is correct, we added another class to html div for test
        // so long as quantity:2 is in the text, the element has extra text we don't need to test
        // innerText has the text inside the element, innerHTML has the full html code
        expect(
            document.querySelector(`.js-product-quantity-test-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-test-${productId2}`).innerText
        ).toContain('Quantity: 1');

        expect (
            document.querySelector(`.js-product-name-test-${productId1}`).innerText
        ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect (
            document.querySelector(`.js-product-name-test-${productId2}`).innerText
        ).toEqual('Intermediate Size Basketball');

        expect (
            document.querySelector(`.js-product-price-test-${productId1}`).innerText
        ).toEqual('$10.90');

        expect (
            document.querySelector(`.js-product-price-test-${productId2}`).innerText
        ).toEqual('$20.95');
        
    });


    it('remove a product', () => {
    // get delete link element (added new class for test), simulate a deletion
        document.querySelector(`.js-delete-link-test-${productId1}`).click();

        // delete element, should only be 1 element left
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);        

        expect (
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect (
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect (
            document.querySelector(`.js-product-name-test-${productId2}`).innerText
        ).toEqual('Intermediate Size Basketball');

        expect (
            document.querySelector(`.js-product-price-test-${productId2}`).innerText
        ).toEqual('$20.95');

        // after deleting, is the cart updated
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId2);
    });
});

// hook lets us run some code for each test - share code between tests using a  hook

