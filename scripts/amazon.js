// to create a module, 
// -> create a file
// -> don't load the file with <script>

// any variables we create inside the file will be contained inside the file and won't cause naming conflicts

/* get a variable out of a file
add type="module" attribute
export
import
// all imports have to be at the top of the file
and we need to use liverserver for modules to work (because you can't just open a single file)
*/
// also do import * as cartModule from ../data/cart.js
// cartModule.cart - cartModule.addToCart
import { cart } from "../data/cart-class.js";
import { products, loadFromBackend } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

/* 
modules help prevent naming conflicts
can also do this import {cart as myCart} from ......

modules help to not worry about order of files loaded in script
*/

// Main idea of javascript
// save the data (info about products)
// generate the html
// make it interactive

// use an object to represent each product since you can group multiple values together

// we need to wait for the response to finish before loading other code. recall that functions are values in javascript and you can use it as a parameter
await loadFromBackend();
checkIfSearch();

function renderProductsGrid(productsArray) {
    console.log(productsArray);

    let productsHTML = '';

    // recall foreach takes each object in array, saves in product and then runs the function
    // we want to create some html for each object
    // benefit of generating html is you can just add another object to the array without duplicating html code
    productsArray.forEach((product) => {
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
            src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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
        <!--polymorphism - using a method without knowing its class -->
        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${product.id}">
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

    updateCartIconQuantity();
    function updateCartIconQuantity() {
        document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();

    }

    // each product would have its own timeout id
    let timeoutIdList = {};
    function addedTimeout(productId) {
        const addedMsg = document.querySelector(`.js-added-${productId}`);
        addedMsg.classList.add('js-added-to-cart-visible');

        // clear the time id if already active
        let existTimeId = timeoutIdList[productId];
        if (existTimeId) {
            clearTimeout(existTimeId);
        }

        let timeoutId = setTimeout(() => {
            addedMsg.classList.remove('js-added-to-cart-visible');
        }, 2000);

        // add timeout id to object using the product id as property
        timeoutIdList[productId] = timeoutId;
    }


    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {

            const { productId } = button.dataset; // productId from product-id
            const cartSelect = document.querySelector(`.js-quantity-selector-${productId}`);

            const quantity = Number(cartSelect.value);
            console.log(quantity);

            cart.addToCart(productId, quantity);
            updateCartIconQuantity();
            addedTimeout(productId);

        });
    });

    const inputElement = document.querySelector('.js-input-search-bar');

    document.querySelector('.js-search-button').addEventListener('click', () => {
        openSearch();
    });

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            openSearch();
        }
    });

    function openSearch() {
        let value = inputElement.value;
        window.location.href = `amazon.html?search=${value}`;
    }

}

function checkIfSearch() {
    const url = new URL(window.location.href);

    // get url parameters sent by search
    let searchValue;
    if(url.searchParams.has('search')) {
        searchValue = url.searchParams.get('search');
    };
    let searchResults = [];
    if(searchValue) {
        searchResults = products.filter((value) => {
            //.includes is annoyingly case-sensitive
            const checkSearch = value.name.toLowerCase().includes(
                searchValue.toLowerCase());
            
            const arraySearch = value.keywords.includes(searchValue.toLowerCase());
            
            return (checkSearch || arraySearch);
        });
        renderProductsGrid(searchResults); 
    } else {
        renderProductsGrid(products);
    }
    
}