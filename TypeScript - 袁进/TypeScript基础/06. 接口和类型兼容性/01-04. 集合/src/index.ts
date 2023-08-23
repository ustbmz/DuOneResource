// interface User {
//     name: string
//     age: number
//     sayHello(): void
// }

// type User = {
//     name: string
//     age: number
//     sayHello: () => void
// }

// let u: User = {
//     name: "sdfds",
//     age: 33,
//     sayHello() {
//         console.log("asfadasfaf");
//     }
// }

// type Condition = (n: number) => boolean

// interface Condition {
//     (n: number): boolean
// }

// function sum(numbers: number[], callBack: Condition) {
//     let s = 0;
//     numbers.forEach(n => {
//         if (callBack(n)) {
//             s += n;
//         }
//     })
//     return s;
// }

// const result = sum([3, 4, 5, 7, 11], n => n % 2 !== 0);
// console.log(result);


// interface A {
//     T1: string
// }

// interface B {
//     T2: number
// }

// interface C extends A, B {
//     T3: boolean
// }

// type A = {
//     T1: string
// }

// type B = {
//     T2: number
// }

// type C = {
//     T1: number
//     T3: boolean
// } & A & B

// let u: C = {
//     T2: 33,
//     T1:"43",
//     T3: true
// }

// type User = {
//     readonly id: string
//     name: string
//     age: number,
//     readonly arr: readonly string[]
// }

// let u: User = {
//     id: "123",
//     name: "Asdf",
//     age: 33,
//     arr:["Sdf", "dfgdfg"]
// }

// const arr: readonly number[] = [3, 4, 6];

// const arr: ReadonlyArray<number> = [3, 4, 6];

// interface Duck {
//     sound: "嘎嘎嘎"
//     swin(): void
// }

// let person = {
//     name: "伪装成鸭子的人",
//     age: 11,
//     sound: "嘎嘎嘎" as "嘎嘎嘎",
//     swin() {
//         console.log(this.name + "正在游泳，并发出了" + this.sound + "的声音");
//     }
// }

// let duck: Duck = {
//     sound: "嘎嘎嘎" as "嘎嘎嘎",
//     swin() {
//         console.log(this.name + "正在游泳，并发出了" + this.sound + "的声音");
//     }
// };

// interface User {
//     name?: string
//     age: number
// }

// interface Condition {
//     (n: number, i: number): boolean
// }

// function sum(numbers: number[], callBack: Condition) {
//     let s = 0;
//     for (let i = 0; i < numbers.length; i++) {
//         const n = numbers[i];
//         if (callBack(n, i)) {
//             s += n;
//         }
//     }
//     return s;
// }

// const result = sum([3, 4, 5, 7, 11], n => n % 2 !== 0);
// console.log(result);

//(value: number, index: number, array: number[]) => void

[34, 4].forEach(it => console.log(it));