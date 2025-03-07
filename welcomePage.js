// function redirectToSignup() {
//     window.location.href = '/frontend/signup.html';
// }

// function redirectToLogin() {
//     // window.location.href = '/FTJ_Full_Time_jobs/frontend/login.html';
//     window.location.href = '../frontend/login.html';
// }



function redirectToSignup() {
    window.location.href = window.location.pathname.replace(/\/$/, '') + '/frontend/signup.html';
}

function redirectToLogin() {
    window.location.href = window.location.pathname.replace(/\/$/, '') + '/frontend/login.html';
}
