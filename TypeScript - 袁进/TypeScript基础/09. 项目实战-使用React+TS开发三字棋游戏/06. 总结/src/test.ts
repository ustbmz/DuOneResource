export interface User {
    _id: string
    loginid: string
    loginpwd: string
}

function getUsers() {
    fetch("/api/user").then(resp => resp.json()).then(json => {
        const u = json as User;

    })
}