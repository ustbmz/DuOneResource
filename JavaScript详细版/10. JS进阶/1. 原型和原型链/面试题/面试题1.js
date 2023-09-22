var F = function () {}
Object.prototype.a = function () {}
Function.prototype.b = function () {}

var f = new F();

console.log(f.a, f.b, F.a, F.b);
// fn    undefined    fn    fn