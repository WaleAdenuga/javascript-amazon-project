// keep code organised
// cart can be used outside cart.js
export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        // we use productId to load other things like image, price etc
        // that's called normalizing the data
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }
];

// group cart functions together
export function addToCart(productId, quantity) {
    // check if product already in cart and increment
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else { // new cart entry
        cart.push({
            productId,
            quantity
        });
    }
    saveToStorage();
}

// create a new array, loop through it, add each except this product id
export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

// whenever we update cart, save to localStorage
// recall local storage only saves strings so need to use json.stringify
export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            cartItem.quantity = newQuantity;

            saveToStorage();
        }
    });
}