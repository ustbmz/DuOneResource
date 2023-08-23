// 得到一个随机数组成的数组，数组长度为10，随机数的范围在0-1之间
// 结果类似于：[0.262, 0.167, 0.841, ...]
// const arr = Array(10)
//   .fill(0)
//   .map(function () {
//     return Math.random();
//   });
// console.log(arr);

// 得到一个随机数组成的数组，数组长度为10，随机数的范围在10-100之间
// 结果类似于：[35, 66, 45, ...]
// const arr = Array(10)
//   .fill(0)
//   .map(function () {
//     return Math.floor(Math.random() * 90 + 10);
//   });
// console.log(arr);

// 判断某个字符串s是否为 .jpg、.png、.bmp、.gif 中的一个
const s = '.png';
const arr = ['.jpg', '.png', '.bmp', '.gif'];
const result = arr.includes(s);
console.log(result);
