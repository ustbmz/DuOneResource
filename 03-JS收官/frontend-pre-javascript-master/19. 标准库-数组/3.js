// var arr = [5, 2, 7, 11, 1, 6];

// var newArr = arr.slice(0); // 数组克隆
// console.log(newArr, arr);
// console.log(newArr === arr);

var obj = {
  0: 'a',
  1: 'b',
  length: 2,
};

var arr = Array.prototype.slice.call(obj);
// var arr = [].slice.call(obj);

console.log(arr instanceof Array);
