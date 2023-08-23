var obj1 = { a: 1, b: 2 };
var obj2 = { a: 3, c: 4, d: 5 };
var obj3 = { b: 4, e: 7 };

var o = Object.assign({}, obj1, obj2, obj3);
console.log(o);
