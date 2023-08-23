// JS所有的对象，都是通过构造函数产生的

// 语法糖
// var obj = {
//   a: 1,
//   b: 2,
// };

// var obj = new Object(); // 创建一个空对象
// obj.a = 1;
// obj.b = 2;

// console.log(obj);

// var arr = [1, 2, 3];

// var arr = new Array(1, 2, 3); // 创建一个数组

// console.log(arr);

function sum(a, b) {
  return a + b;
}

// var sum = new Function('a', 'b', 'return a+b');

console.log(sum(1, 2));
