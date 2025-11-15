let cart = [];

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    
    cartItemsContainer.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
            </div>
        `;
    });

    cartTotal.innerText = `₹${total}`;
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
    document.getElementById("cart-overlay").style.display = "block"; // Show overlay
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
    document.getElementById("cart-overlay").style.display = "none"; // Hide overlay
}


function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function openCart() {
    document.getElementById("cart-modal").style.display = "block";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function placeOrder() {
    const name = document.getElementById("customer-name").value;
    const address = document.getElementById("customer-address").value;
    const phone = document.getElementById("customer-phone").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (!name || !address || !phone) {
        alert("Please fill in all customer details!");
        return;
    }

    alert(`Order placed successfully!\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nPayment: ${paymentMethod}\nTotal: ₹${document.getElementById("cart-total").innerText}`);
    
    cart = [];
    updateCart();
    closeCart();
}