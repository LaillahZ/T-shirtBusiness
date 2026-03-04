const sizeSelect = document.getElementById("size");
const colorSelect = document.getElementById("color");
const priceTag = document.getElementById("price");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const addCartBtn = document.getElementById("addCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

// Initialize price to first selectable size (optional)
function updatePrice() {
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    if(price) priceTag.textContent = "$" + price;
    else priceTag.textContent = "";
}

// Update price whenever size changes
sizeSelect.addEventListener("change", updatePrice);

// Add to cart button
addCartBtn.addEventListener("click", function() {
    const size = sizeSelect.value;
    const color = colorSelect.value;

    if(size === "") {
        alert("Please select a size before adding to cart.");
        return;
    }

    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    const price = parseFloat(selectedOption.getAttribute("data-price"));

    const item = { name: "L-Classy Signature Tee", size, color, price };
    cart.push(item);
    renderCart();
});

// Render cart items and total
function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.color} - ${item.size} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = "Total: $" + total.toFixed(2);
}

// Checkout
checkoutBtn.addEventListener("click", function() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Proceeding to checkout with " + cart.length + " items, total: $" + cart.reduce((sum,i)=>sum+i.price,0).toFixed(2));

    window.location.href = "https://your-checkout-link.com";
});