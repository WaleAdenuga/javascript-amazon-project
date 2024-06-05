class Order {
    orders;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage()
    }

    addOrder(order) {
        // add order to the front of the array
        this.orders.unshift(order);
        saveToStorage();
    }
    
    saveToStorage() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    #loadFromStorage() {
        this.orders = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }
}

export const fullOrders = new Order('orders');