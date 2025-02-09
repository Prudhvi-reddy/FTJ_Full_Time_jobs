document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let retypePassword = document.getElementById("retypePassword").value;

    if (password !== retypePassword) {
        alert("Passwords do not match!");
        return;
    }

    let userData = { firstName, lastName, email, password };

    try {
        let response = await fetch("http://localhost:5500/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        let data = await response.json();
        if (response.ok) {
            alert(data.message);
            window.location.href = "login.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Signup failed");
    }
});

