// interface IUser {
//     name: string,
//     age: number,
//     sayHello(this: IUser): void
// }

// const u: IUser = {
//     name: "ssf",
//     age: 33,
//     sayHello() {
//         console.log(this.name, this.age)
//     }
// }
// const say = u.sayHello;

class User {
    constructor(
        public name: string,
        public age: number
    ) { }

    sayHello() {
        console.log(this, this.name, this.age)
    }
}
