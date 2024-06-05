// keep code organised
// cart can be used outside cart.js
// we'll update cart with deliveryoptionid. that object exists on its own
export let cart;
loadFromStorage();

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
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
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

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [
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

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(func) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
  
      // run necessary functions after parsing and assurance http response is received - func is a callback, a function to run in the future, func can also be anonymous, checkout checkout.js
      func();
  
      console.log('load cart');
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  
}



export async function loadCartFetch() {
    try {
        console.log('khaladore');
        const response = await fetch('https://supersimplebackend.dev/cart');
        const cart = await response.text();
        console.log(cart);
    } catch (error) {
        console.log('Unexpected error. Try again later');
    }
}

loadCartFetch();