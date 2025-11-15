function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    // Simple fixed login (you can change this)
    const correctUser = "investigator";
    const correctPass = "admin123";

    if (user === correctUser && pass === correctPass) {
        // Redirect to main investigator dashboard
        window.location.href = "investigator.html";
    } else {
        error.innerText = "Invalid username or password!";
    }
}
