function redirectToSignup() {
    window.location.href = window.location.pathname.replace(/\/$/, '') + '/frontend/signup.html';
}

function redirectToLogin() {
    window.location.href = window.location.pathname.replace(/\/$/, '') + '/frontend/login.html';
}