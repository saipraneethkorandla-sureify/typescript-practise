"use strict";
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ALIVE"] = "alive";
    USER_STATUS["BLOCKED"] = "blocked";
})(USER_STATUS || (USER_STATUS = {}));
class Login {
    constructor() {
        var _a;
        this.userInfo = JSON.parse((_a = localStorage.getItem('users')) !== null && _a !== void 0 ? _a : '[]');
    }
    validate(username, password) {
        const user = this.userInfo.find((u) => u.email === username);
        if (user && user.password === password) {
            return user;
        }
        return false;
    }
}
class Registration {
    insertUser(user) {
        let login = new Login();
        if (login.validate(user[1], user[2])) {
            return false;
        }
        else {
            let user_details = login.userInfo;
            user_details.push({ fullname: user[0], email: user[1], password: user[2], user_status: USER_STATUS.ALIVE });
            localStorage.setItem('users', JSON.stringify(user_details));
            return true;
        }
    }
}
function validateUserLogin() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if (username.value != '' && password.value != '') {
        let login = new Login();
        let validateResult = login.validate(username.value, password.value);
        if (typeof validateResult !== 'boolean') {
            if (validateResult.user_status == USER_STATUS.ALIVE) {
                changePage('details');
                //details.updateDetailsView(validateResult);
                updateDetailsView(validateResult);
            }
            else {
                alert("user is blocked");
            }
        }
        else {
            alert("one of the email / password is incorrect");
        }
    }
    else {
        alert("Email and password are required");
    }
}
function updateDetailsView(userInfo) {
    const fullNameTag = document.getElementById('details_fullname');
    fullNameTag.innerHTML = userInfo.fullname;
}
function changePage(page) {
    let loginDiv = document.getElementById('login');
    let registerDiv = document.getElementById('register');
    let detailsDiv = document.getElementById('details');
    switch (page) {
        case 'login':
            loginDiv.style.display = 'block';
            registerDiv.style.display = 'none';
            detailsDiv.style.display = 'none';
            break;
        case 'register':
            loginDiv.style.display = 'none';
            registerDiv.style.display = 'block';
            detailsDiv.style.display = 'none';
            break;
        case 'details':
            loginDiv.style.display = 'none';
            registerDiv.style.display = 'none';
            detailsDiv.style.display = 'block';
            break;
    }
}
function saveUser() {
    const fullname = document.getElementById('fullname');
    const emailId = document.getElementById('emailid');
    const password = document.getElementById('register_password');
    let register = new Registration();
    if (register.insertUser([fullname.value, emailId.value, password.value])) {
        alert("User registration successful. Please Login");
    }
    else {
        alert("User is already registered. Please Login");
    }
    changePage('login');
}
