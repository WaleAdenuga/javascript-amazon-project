// keep code organised
// cart can be used outside cart.js
export const cart = [

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
}