import { cart , addToCart, loadFromStorage } from '../../data/cart.js';


// test coverage - how much of the code is being tested, eg test each condition of the if statement

// flaky test - sometimes passes and sometimes fails - eg trying to get cart from local storage when it might not exist

// solve flaky?  jasmine has mocks which lets us replace a method with a fake version

// unit tests - tests one piece, integration test combines multipe units 
describe('test suite: addToCart', () => {
    it('adds an existing product to cart', () => {
        // mock only runs for one test
        spyOn(localStorage, 'setItem');
        
        // replace localStorage.getItem with a fake version
        // anonymous func in callFake replaces that one
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: 1
                }
            ]);
        }); 

        // after mocking, reload the cart
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(3);
    });

    it('adds a new product to cart', () => {
        // replace localStorage.setItem with a fake version
     
        spyOn(localStorage, 'setItem');

        // replace localStorage.getItem with a fake version
        // anonymous func in callFake replaces that one
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); 

        // after mocking, reload the cart
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });
});