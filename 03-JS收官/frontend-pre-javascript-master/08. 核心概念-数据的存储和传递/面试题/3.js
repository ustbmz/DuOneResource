// 下面的代码输出什么（字节）？
var foo = { bar: 1 };
var arr1 = [1, 2, foo];
var arr2 = arr1.slice(1);
arr2[0]++;
arr2[1].bar++;
foo.bar++;
arr1[2].bar++;
console.log(arr1[1] === arr2[0]);
console.log(arr1[2] === arr2[1]);
console.log(foo.bar);
