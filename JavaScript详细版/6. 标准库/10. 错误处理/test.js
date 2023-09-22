// function isPrime(n) {
//     if(isNaN(n)){
//         throw new Error("n必须是一个正常的数字");
//     }
//     if (n < 2) {
//         return false;
//     }
//     for (var i = 2; i < n; i++) {
//         if (n % i === 0) {
//             return false;
//         }
//     }
//     return true;
// }

function A() {
    console.log(B());
    console.log("a1");
}

function B() {
    try {
        C();
        console.log("b1");
    }
    catch (err) {
        console.log("运行C的时候发生了问题", err)
        return 3;
    }
    finally{
        console.log("处理完成");
    }
}

function C() {
    throw new TypeError("asdfasfasfasfd");
    console.log("c1");
}

// console.log(isPrime("abcd"));

A();

console.log("g1");

