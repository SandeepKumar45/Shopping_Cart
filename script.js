const products = [
    { id: 1, name: 'Laptop', image: 'https://m.media-amazon.com/images/I/411NQZh2-WL._SY300_SX300_QL70_FMwebp_.jpg', price: 62000.0, quantity: 0 },
    { id: 2, name: 'Mouse', image: 'https://m.media-amazon.com/images/I/31InxZzowcL._SX300_SY300_QL70_FMwebp_.jpg', price: 250.0, quantity: 0 },
    { id: 3, name: 'iPhone 15 Pro', image: 'https://m.media-amazon.com/images/I/31MZVlSW1KL._SY445_SX342_QL70_FMwebp_.jpg', price: 150000.0, quantity: 0 },
    { id: 4, name: 'Oneplus Bullets Z2', image: 'https://m.media-amazon.com/images/I/51UhwaQXCpL._SX522_.jpg', price: 1999.0, quantity: 0 },
    { id: 5, name: 'Merlion Office Chair', image: 'https://m.media-amazon.com/images/I/41lFui9z+hL._SY300_SX300_.jpg', price: 6428.0, quantity: 0 },
    { id: 6, name: 'Sony PlayStation®5', image: 'https://m.media-amazon.com/images/I/41b-EDZt7dL._SX300_SY300_QL70_FMwebp_.jpg', price: 52990.0, quantity: 0 },
    { id: 7, name: 'OnePlus Buds 3', image: 'https://m.media-amazon.com/images/I/31Wen6gm2JL._SX300_SY300_QL70_FMwebp_.jpg', price: 5000.0, quantity: 0 },
    { id: 7, name: 'MI Smart TV', image: 'https://m.media-amazon.com/images/I/41Budj8LrFL._SX300_SY300_QL70_FMwebp_.jpg', price: 25000.0, quantity: 0 },
];

const cart = [];

function renderProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    ${product.quantity === 0 ? 
                    `<button onclick="addToCart(${product.id})">Add to Cart</button>` : 
                    `<button onclick="decreaseQuantity(${product.id})">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="increaseQuantity(${product.id})">+</button>`}
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    if (getTotalCartQuantity() >= 100) {
        alert("Cart cannot contain more than 100 products.");
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        product.quantity += 1;
        const cartProduct = cart.find(p => p.id === productId);
        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.push({ ...product });
        }
        renderProducts();
        updateCart();
    }
}

function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartProduct = cart.find(p => p.id === productId);
        if (cartProduct && getTotalCartQuantity() < 100) {
            cartProduct.quantity += 1;
            product.quantity += 1;
            renderProducts();
            updateCart();
        } else if (getTotalCartQuantity() >= 100) {
            alert("Cart cannot contain more than 100 products.");
        }
    }
}

function decreaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.quantity > 0) {
        product.quantity -= 1;
        const cartProduct = cart.find(p => p.id === productId);
        if (cartProduct && cartProduct.quantity > 0) {
            cartProduct.quantity -= 1;
        }
        if (cartProduct && cartProduct.quantity === 0) {
            const index = cart.findIndex(p => p.id === productId);
            cart.splice(index, 1);
        }
        renderProducts();
        updateCart();
    }
}

function showCartPage() {
    document.getElementById('productPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'flex';
}

function showProductPage() {
    document.getElementById('productPage').style.display = 'flex';
    document.getElementById('cartPage').style.display = 'none';
}

function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const sortOrder = document.getElementById('sortOrder').value;

    const sortedCart = sortCart(sortOrder);

    sortedCart
        .filter(item => item.price <= maxPrice)
        .forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <button class="decrease" onclick="decreaseQuantityInCart(${item.id})">-</button>
                <span>x${item.quantity}</span>
                <button class="increase" onclick="increaseQuantityInCart(${item.id})">+</button>
                <span>₹${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

    document.querySelector('.total-price').innerText = `Total Price: ₹${calculateTotalPrice().toFixed(2)}`;
    document.querySelector('.average-price').innerText = `Average Price: ₹${calculateAveragePrice().toFixed(2)}`;
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.quantity = 0;
        const index = cart.findIndex(p => p.id === productId);
        cart.splice(index, 1);
        renderProducts();
        updateCart();
    }
}

function calculateTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateAveragePrice() {
    if (cart.length === 0) return 0;
    const totalPrice = calculateTotalPrice();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    return totalPrice / totalItems;
}

function filterCart() {
    updateCart();
}

function sortCart(order) {
    if (order === "asc") {
        return cart.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
        return cart.sort((a, b) => b.price - a.price);
    }
    return cart; // Return unsorted cart if order is not defined
}

function clearCart() {
    products.forEach(product => product.quantity = 0);
    cart.length = 0;
    updateCart();
    renderProducts();
    alert("Your cart is empty");
}

// New functions to increase and decrease quantity in the cart
function increaseQuantityInCart(productId) {
    const cartProduct = cart.find(p => p.id === productId);
    if (cartProduct && getTotalCartQuantity() < 100) {
        cartProduct.quantity += 1;
        const product = products.find(p => p.id === productId);
        product.quantity += 1;
        updateCart();
    } else if (getTotalCartQuantity() >= 100) {
        alert("Cart cannot contain more than 100 products.");
    }
}

function decreaseQuantityInCart(productId) {
    const cartProduct = cart.find(p => p.id === productId);
    if (cartProduct && cartProduct.quantity > 0) {
        cartProduct.quantity -= 1;
        const product = products.find(p => p.id === productId);
        product.quantity -= 1;
        if (cartProduct.quantity === 0) {
            const index = cart.findIndex(p => p.id === productId);
            cart.splice(index, 1);
        }
        updateCart();
    }
}

function getTotalCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

document.addEventListener('DOMContentLoaded', renderProducts);

// Add event listeners for filter and sort functionality
document.getElementById('maxPrice').addEventListener('input', filterCart);
document.getElementById('sortOrder').addEventListener('change', () => {
    updateCart();
});
