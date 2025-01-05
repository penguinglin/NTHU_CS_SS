// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    // SIGN UP
    btnSignUp.addEventListener('click', function() {
        // TODO 2: Add email signup button event
        //     Steps:
        //     1. Get user input email and password to signup
        //     2. Show success message using custom alert by calling "create_alert()" and clear input field
        //     3. Show error message using custom alert by calling "create_alert()" and clear input field
    });

    // SIGN IN
    btnLogin.addEventListener('click', function() {
        // TODO 3: Add email login button event
        //     Steps:
        //     1. Get user input email and password to login
        //     2. Show success message using custom alert by calling "create_alert()" and clear input field
        //     3. Redirect to index.html when login success
        //     4. Show error message using custom alert by calling "create_alert()" and clear input field


    });

    // GOOGLE SIGN IN
    btnGoogle.addEventListener('click', function() {
        // TODO 4: Add google login button event
        //     Steps:
        //     1. Use pop-up function to login with google account
        //     2. Redirect to index.html when login success
        //     3. Show error message by "create_alert()"
        

    });


}

window.onload = function() {
    initApp();
};