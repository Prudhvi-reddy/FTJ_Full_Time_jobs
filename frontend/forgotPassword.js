document.getElementById("forgotPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = document.getElementById("forgotEmail").value;
    let securityQuestion = document.getElementById("forgotSecurityQuestion").value;
    let securityAnswer = document.getElementById("forgotSecurityAnswer").value;

    try {
        let response = await fetch("http://localhost:5500/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, securityQuestion, securityAnswer })
        });

        let data = await response.json();
        if (response.ok) {
            localStorage.setItem("resetEmail", email);
            alert(data.message);
            window.location.href = "change_password.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Verification failed");
    }
});