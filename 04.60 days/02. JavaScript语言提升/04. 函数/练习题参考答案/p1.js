// 编写一个求和函数（箭头函数写法），可以像下面那样使用它
const sum = (...args) => args.reduce((a, b) => a + b, 0);

console.log(sum()); // 0
console.log(sum(1)); // 1
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6

const nums = [1, 2, 3, 4, 5, 6];
// 调用sum函数，将nums中的所有数字求和
console.log(sum(...nums));
