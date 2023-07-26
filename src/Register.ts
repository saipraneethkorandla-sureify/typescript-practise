export interface User {
    fullname: string;
    email: string;
    password: string
}

export namespace details {
    export function updateDetailsView(userInfo:User):void {
        const fullNameTag: HTMLInputElement | null = document.getElementById('details_fullname') as HTMLInputElement;
        alert(userInfo.fullname);
        fullNameTag.innerHTML = userInfo.fullname;
    }
}