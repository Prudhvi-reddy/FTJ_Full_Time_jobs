document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    try {
        let response = await fetch("http://localhost:5500/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        let data = await response.json();
        if (response.ok) {
            alert(data.message);

            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Login failed");
    }
});
