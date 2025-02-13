document.getElementById("changePasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = localStorage.getItem("resetEmail");
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        let response = await fetch("http://localhost:5500/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword })
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
        alert("Password update failed");
    }
});
