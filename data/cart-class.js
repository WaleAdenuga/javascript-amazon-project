// use PascalCase for things that generate objects
// class - object generator, cleaner than using a function
class Cart {

    // add property to class, every generated object has this property
    cartItems;
    #localStorageKey; // private property, can only be used inside the class

    // constructor is for setup code
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage(); // private method only used by the class
    }

    // every object has this method
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
            {
                // we use productId to load other things like image, price etc
                // that's called normalizing the data
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
        ];
    }

    // whenever we update cart, save to localStorage
    // recall local storage only saves strings so need to use json.stringify
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    // group cart functions together
    addToCart(productId, quantity) {
        // check if product already in cart and increment
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else { // new cart entry
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    // create a new array, loop through it, add each except this product id
    removeFromCart(productId) {
        let newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity;

                this.saveToStorage();
            }
        });
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }
}

console.log('cart-class');

// each gennerated object is an instance of the class
export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


//console.log(cart);
//console.log(businessCart);

// check if object is instance of class
//console.log(businessCart instanceof Cart);
