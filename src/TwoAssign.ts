//import { details, User } from "./Register";
interface User {
    fullname: string;
    email: string;
    password: string;
    user_status: string
}

enum USER_STATUS {
    ALIVE = 'alive',
    BLOCKED = 'blocked'
}

class Login {

    public userInfo: User[];

    constructor() {
        this.userInfo = JSON.parse(localStorage.getItem('users') ?? '[]');
    }

    validate(username:string, password:string):boolean | User {
        const user = this.userInfo.find((u) => u.email === username);
        if (user && user.password === password) {
            return user;
        }

        return false;
    }
}

class Registration {
    insertUser(user:[string, string, string]):boolean {
        let login = new Login();
        if(login.validate(user[1],user[2])) {
            return false;
        }
        else {
            let user_details = login.userInfo;
            user_details.push({ fullname: user[0], email: user[1], password: user[2], user_status: USER_STATUS.ALIVE});
            localStorage.setItem('users', JSON.stringify(user_details));
            return true;
        }

    }

}

function validateUserLogin():void {
    const username: HTMLInputElement | null = document.getElementById('username') as HTMLInputElement;
    const password: HTMLInputElement | null = document.getElementById('password') as HTMLInputElement;

    if (username.value != '' && password.value != '') {
        let login = new Login()
        let validateResult = login.validate(username.value, password.value);
        if(typeof validateResult !== 'boolean') {
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
            alert("one of the email / password is incorrect")
        }
    }
    else {
        alert("Email and password are required")
    }
}

function updateDetailsView(userInfo:User):void {
    const fullNameTag: HTMLInputElement | null = document.getElementById('details_fullname') as HTMLInputElement;
    fullNameTag.innerHTML = userInfo.fullname;
}

function changePage(page: string):void {
    let loginDiv: HTMLDivElement | null = document.getElementById('login') as HTMLDivElement;
    let registerDiv: HTMLDivElement | null = document.getElementById('register') as HTMLDivElement;
    let detailsDiv: HTMLDivElement | null = document.getElementById('details') as HTMLDivElement;

    switch(page) {
        case 'login':
            loginDiv.style.display = 'block';
            registerDiv.style.display = 'none';
            detailsDiv.style.display = 'none'
            break;
        case 'register':
            loginDiv.style.display = 'none';
            registerDiv.style.display = 'block';
            detailsDiv.style.display = 'none'
            break;
        case 'details':
            loginDiv.style.display = 'none';
            registerDiv.style.display = 'none';
            detailsDiv.style.display = 'block';
            break;
    }
}

function saveUser():void {

    const fullname: HTMLInputElement | null = document.getElementById('fullname') as HTMLInputElement;
    const emailId: HTMLInputElement | null = document.getElementById('emailid') as HTMLInputElement;
    const password: HTMLInputElement | null = document.getElementById('register_password') as HTMLInputElement;

    let register = new Registration();
    if(register.insertUser([fullname.value, emailId.value, password.value])) {
        alert("User registration successful. Please Login");
    }
    else {
        alert("User is already registered. Please Login");
    }
    changePage('login');

}



