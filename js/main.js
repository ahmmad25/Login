var loginForm = document.getElementById("loginForm");
var passwordResetModal = document.getElementById("passwordResetModal");
var passwordResetForm = document.getElementById("passwordResetForm");
var resetUsername = document.getElementById("resetUsername");
var newPassword = document.getElementById("newPassword");

function isLoggedIn() {
    var user = localStorage.getItem("user");
    if (user) {
        var { username, password, lastLogin } = JSON.parse(user);
        var elapsedMinutes = (Date.now() - lastLogin) / (1000 * 60);
        if (elapsedMinutes < 10) {
            alert(`Welcome back, ${username}!`);
            return true;
        }
    }
    return false;
}

function login(username, password) {
    var user = localStorage.getItem("user");
    if (user) {
        var { username: storedUsername, password: storedPassword } = JSON.parse(user);
        if (username === storedUsername && password === storedPassword) {
            var lastLogin = Date.now();
            localStorage.setItem("user", JSON.stringify({ username, password, lastLogin }));
            alert(`Welcome, ${username}!`);
            return true;
        }
    }
    alert("Invalid username or password.");
    return false;
}

// Reset password
function resetPassword(username, newPassword) {
    var user = localStorage.getItem("user");
    if (user) {
        var { username: storedUsername } = JSON.parse(user);
        if (username === storedUsername) {
            localStorage.setItem("user", JSON.stringify({ username, password: newPassword, lastLogin: 0 }));
            alert("Password reset successful. Please log in again.");
            return true;
        }
    }
    alert("Invalid username.");
    return false;
}


document.addEventListener("DOMContentLoaded", function () {
    if (!isLoggedIn()) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            login(username, password);
        });

        var forgotPasswordLink = document.getElementById("forgotPassword");
        forgotPasswordLink.addEventListener("click", function (event) {
            event.preventDefault();
            passwordResetModal.style.display = "block";
        });

        var closeButton = document.getElementsByClassName("close")[0];
        closeButton.addEventListener("click", function () {
            passwordResetModal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target == passwordResetModal) {
                passwordResetModal.style.display = "none";
            }
        });

        passwordResetForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var username = resetUsername.value;
            var password = newPassword.value;
            resetPassword(username, password);
        });
    }
});