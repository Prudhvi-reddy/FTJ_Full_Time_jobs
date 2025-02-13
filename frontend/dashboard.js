document.getElementById("logoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Removin g token from localStorage
    localStorage.removeItem('token');
    
    alert("Logging out...");

    // Redirect to login page
    window.location.href = "login.html";
});
