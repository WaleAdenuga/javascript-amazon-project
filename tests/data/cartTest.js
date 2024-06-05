import { cart } from '../../data/cart-class.js';


// test coverage - how much of the code is being tested, eg test each condition of the if statement

// flaky test - sometimes passes and sometimes fails - eg trying to get cart from local storage when it might not exist

// solve flaky?  jasmine has mocks which lets us replace a method with a fake version

// unit tests - tests one piece, integration test combines multipe units 
describe('test suite: addToCart', () => {

    beforeEach(() => {
        // mock only runs for one test
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to cart', () => {
        // replace localStorage.getItem with a fake version
        // anonymous func in callFake replaces that one
        /* spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });  */

        cart.cartItems = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ];

        // after mocking, reload the cart
        //loadFromStorage();

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 3,
            deliveryOptionId: '1'
          }]));
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(3);
    });

    it('adds a new product to cart', () => {

        // replace localStorage.getItem with a fake version
        // anonymous func in callFake replaces that one
        /* spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });  */

        cart.cartItems = [];

        // after mocking, reload the cart
        //loadFromStorage();

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          }]));
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
    });
});

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        // mock only runs for one test
        spyOn(localStorage, 'setItem');

        // replace localStorage.getItem with a fake version
        // anonymous func in callFake replaces that one
        /* spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        }); */

        cart.cartItems = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ];

        // after mocking, reload the cart
        //loadFromStorage();
    });

    it('removes an existing product from cart', () => {
        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
    });

    it('remves a non-existing product from cart', () => {
        cart.removeFromCart('non-existing-product');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }]));

    });
    
});