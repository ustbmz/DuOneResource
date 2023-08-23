Object.prototype.abc = 1;

var obj = {
  a: 1,
  b: 2,
};

// console.log(obj.hasOwnProperty('abc'));

// 属性名 in 对象  ---> 判断 属性名 是否在对象自身及其隐式原型上
// console.log('abc' in obj);

// for (var key in obj) {
//   // 判断这个属性是不是属于对象本身，而不是在隐式原型上
//   if (obj.hasOwnProperty(key)) {
//     console.log(key);
//   }
// }
