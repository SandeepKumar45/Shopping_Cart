Shopping Cart Application


Overview

This application allows users to view products, add them to a cart, and manage the cart with various functionalities like filtering, sorting, and adjusting item quantities.

Features

. Product List: View a list of products with images, names, and prices.
. Add to Cart: Add products to the cart with quantity control.
. Quantity Adjustment: Increase or decrease the quantity of items in the cart.
. Filter by Price: Filter cart items based on a maximum price.
. Sort by Price: Sort cart items by price in ascending or descending order.
. Cart Summary: View total and average prices of items in the cart.
. Clear Cart: Empty the cart with a single click.


How to Use

1. View Products: Navigate to the product page to see the available items.
2. Add Products to Cart: Click "Add to Cart" to add items to your cart. You can adjust quantities directly on the product page.
3. View Cart: Click the cart icon to go to the cart page.
4. Adjust Quantities: Use the "+" and "-" buttons to adjust the quantity of items in the cart.
5. Filter and Sort: Use the filter and sort controls on the cart page to organize your cart items.
6. Clear Cart: Click "Clear Cart" to remove all items from the cart.
7. Back to Products: Return to the product page by clicking "Back to Products."

Pseudo Code
1. Render Products

   function renderProducts():
    clear the product list
    for each product in products:
        create product element
        set product element content with product data
        append product element to product list

2. Add to Cart

   function addToCart(productId):
    if total quantity in cart >= 100:
        show alert "Cart cannot contain more than 100 products."
        return

    find product by productId
    if product exists:
        increment product quantity
        if product is in cart:
            increment cart quantity
        else:
            add product to cart
        update product list display
        update cart display

3. Increase Quantity

   function increaseQuantity(productId):
    find product by productId
    if product exists and total quantity in cart < 100:
        increment cart quantity
        increment product quantity
        update product list display
        update cart display
    else if total quantity in cart >= 100:
        show alert "Cart cannot contain more than 100 products."

4. Decrease Quantity

   function decreaseQuantity(productId):
    find product by productId
    if product exists and quantity > 0:
        decrement product quantity
        if product is in cart:
            decrement cart quantity
            if cart quantity is 0:
                remove product from cart
        update product list display
        update cart display

5. Show Cart Page

   function showCartPage():
    hide product page
    show cart page

6. Show Product Page

   function showProductPage():
    show product page
    hide cart page

7. Update Cart

   function updateCart():
    clear cart items display
    get filter max price
    get sort order
    sort and filter cart items
    for each item in filtered and sorted cart:
        create cart item element
        set cart item content with item data
        append cart item element to cart items display
    update total price
    update average price

8. Remove From Cart

   function removeFromCart(productId):
    find product by productId
    if product exists:
        set product quantity to 0
        remove product from cart
        update product list display
        update cart display

9. Calculate Total Price

   function calculateTotalPrice():
    return sum of (item.price * item.quantity) for each item in cart

10. Calculate Average Price

    function calculateAveragePrice():
    if cart is empty:
        return 0
    return total price / total quantity

11. Filter Cart

    function filterCart():
    update cart display

12. Sort Cart

    function sortCart(order):
    if order is "asc":
        sort cart by price ascending
    else if order is "desc":
        sort cart by price descending
    return sorted cart

13. Clear Cart

    function clearCart():
    set all products quantity to 0
    clear cart
    update cart display
    update product list display
    show alert "Your cart is empty"


JSON Format


Product Object: 

{
  "id": "number",
  "name": "string",
  "image": "string",
  "price": "number",
  "quantity": "number"
}


Cart Object: 

[
  {
    "id": "number",
    "name": "string",
    "image": "string",
    "price": "number",
    "quantity": "number"
  }
]



Dummy JSON


Products JSON

[
  {
    "id": 1,
    "name": "Laptop",
    "image": "https://m.media-amazon.com/images/I/411NQZh2-WL._SY300_SX300_QL70_FMwebp_.jpg",
    "price": 62000.0,
    "quantity": 0
  },
  {
    "id": 2,
    "name": "Mouse",
    "image": "https://m.media-amazon.com/images/I/31InxZzowcL._SX300_SY300_QL70_FMwebp_.jpg",
    "price": 250.0,
    "quantity": 0
  }
]


Cart JSON

[
  {
    "id": 1,
    "name": "Laptop",
    "image": "https://m.media-amazon.com/images/I/411NQZh2-WL._SY300_SX300_QL70_FMwebp_.jpg",
    "price": 62000.0,
    "quantity": 1
  },
  {
    "id": 2,
    "name": "Mouse",
    "image": "https://m.media-amazon.com/images/I/31InxZzowcL._SX300_SY300_QL70_FMwebp_.jpg",
    "price": 250.0,
    "quantity": 2
  }
]



