document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} VND</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">➖</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">➕</button>
                </td>
                <td>${(item.price * item.quantity).toLocaleString()} VND</td>
                <td><button class="delete-btn" onclick="removeItem(${index})">Delete</button></td>
            `;

            cartItemsContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.innerText = total.toLocaleString();
    }

    window.updateQuantity = function (index, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    };

    window.removeItem = function (index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    checkoutButton.addEventListener("click", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Checkout successful! Thank you for your purchase.");
            localStorage.removeItem("cart");
            loadCart();
        }
    });

    loadCart();
});
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseInt(this.getAttribute("data-price"));
            let image = this.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        });
    });
});
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Sản phẩm đã được thêm vào giỏ hàng!");

    // Chuyển hướng sang cart.html
    window.location.href = "cart.html";
}
document.querySelectorAll('.product').forEach((product) => {
    product.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        product.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    product.addEventListener('mouseleave', () => {
        product.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});

