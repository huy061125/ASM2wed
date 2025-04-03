document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            window.location.href = "index.html"; // Redirect to home page
        } else {
            alert("Incorrect email or password!");
        }
    });
});
