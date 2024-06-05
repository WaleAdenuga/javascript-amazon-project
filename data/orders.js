export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    // add order to the front of the array
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));

}