document.getElementById("logoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    alert("logging out....")
    window.location.href = "login.html";
});