// import { Animal, Lion, Tiger, Monkey, Dog } from "./animals";
// import { IFireShow, IWisdomShow, hasFireShow, hasWisdomShow } from "./interfaces";

// const animals: Animal[] = [
//     new Lion("王富贵", 12),
//     new Tiger("坤坤", 21),
//     new Monkey("小六", 1),
//     new Dog("旺财", 3),
//     new Dog("狗剩", 5)
// ];

// //1. 所有的动物打招呼

// // animals.forEach(a => a.sayHello());

// //2. 所有会进行火圈表演的动物，完成火圈表演
// animals.forEach(a => {
//     if (hasFireShow(a)) {
//         a.singleFire();
//         a.doubleFire();
//     }
// })

// //3. 所有会智慧表演的动物，完成智慧表演
// animals.forEach(a => {
//     if (hasWisdomShow(a)) {
//         a.suanshuti();
//         a.dance();
//     }
// })

class A {
    a1: string = ""
    a2: string = ""
    a3: string = ""
}

class B {
    b1: number = 0;
    b2: number = 0;
    b3: number = 0;
}

interface C extends A, B { }

const c: C = {
    a1: "",
    a2: "",
    a3: "",
    b1: 0,
    b2: 3,
    b3: 4
}