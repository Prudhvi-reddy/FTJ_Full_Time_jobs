// function redirectToSignup() {
//         window.location.href = window.location.origin + '/frontend/signup.html';

// }

// function redirectToLogin() {
//     // window.location.href = '/FTJ_Full_Time_jobs/frontend/login.html';
//     window.location.href = window.location.origin + '/frontend/login.html';

// }


function getBasePath() {
    let path = window.location.pathname;
    
    // If running on GitHub Pages, the first segment is the repository name
    if (path.startsWith('/')) {
        let parts = path.split('/');
        if (parts.length > 2) {
            return '/' + parts[1] + '/';
        }
    }
    return '/';
}

function redirectToSignup() {
    window.location.href = getBasePath() + 'frontend/signup.html';
}

function redirectToLogin() {
    window.location.href = getBasePath() + 'frontend/login.html';
}
