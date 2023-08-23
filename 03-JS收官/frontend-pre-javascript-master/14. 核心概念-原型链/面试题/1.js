// 下面的代码输出什么？
function User() {}
User.prototype.sayHello = function () {};

var u1 = new User();
var u2 = new User();

console.log(u1.sayHello === u2.sayHello);
console.log(User.prototype === Function.prototype);
console.log(User.__proto__ === Function.prototype);
console.log(User.__proto__ === Function.__proto__);
console.log(u1.__proto__ === u2.__proto__);
console.log(u1.__proto__ === User.__proto__);
console.log(Function.__proto__ === Object.__proto__);
console.log(Function.prototype.__proto__ === Object.prototype.__proto__);
console.log(Function.prototype.__proto__ === Object.prototype);
