let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item, price) {
    let existingItem = cart.find(product => product.item === item);
    
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
    } else {
        cart.push({ item, price, quantity: 1 }); // Add new item with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item + " added to cart!");
}


function buyNow(item, price) {
    cart = [{ item, price }];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}

function displayCart() {
    let cartTable = document.getElementById("cart-table");
    let totalPrice = 0;
    
    cartTable.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Action</th>
        </tr>
    `; // Reset table and include headers

    cart.forEach((product, index) => {
        let row = cartTable.insertRow();
        row.insertCell(0).textContent = product.item;
        row.insertCell(1).textContent = "₹" + product.price;
        row.insertCell(2).textContent = product.quantity; // Show quantity

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function () { removeItem(index); };
        row.insertCell(3).appendChild(removeBtn);

        totalPrice += product.price * product.quantity; // Update total price
    });

    document.getElementById("total-price").textContent = totalPrice;
}


function removeItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Reduce quantity by 1
    } else {
        cart.splice(index, 1); // Remove item if quantity is 1
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}


function checkout() {
    window.location.href = "checkout.html";
}

if (window.location.pathname.includes("cart.html")) {
    displayCart();
}