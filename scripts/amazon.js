
// Main idea of javascript
// save the data (info about products)
// generate the html
// make it interactive

// use an object to represent each product since you can group multiple values together

let productsHTML = '';

// recall foreach takes each object in array, saves in product and then runs the function
// we want to create some html for each object
// benefit of generating html is you can just add another object to the array without duplicating html code
products.forEach((product) => {
    // accumulator pattern
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
            <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>
    `;
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// data attribute of html
// it allows us to attach any information to an element
// data attributes have same syntax (name - value)
// but data attribute has to start with "data-"
// it has to be separated by dash though (eg data-ryan-sucks)
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', ()=> {
        const productId = button.dataset.productId; // productId from product-id

        // check if product already in cart and increment
        let matchingItem;
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity++;
        } else { // new cart entry
            cart.push({
                productId: productId,
                quantity: 1
            });
        }

        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    });
});

