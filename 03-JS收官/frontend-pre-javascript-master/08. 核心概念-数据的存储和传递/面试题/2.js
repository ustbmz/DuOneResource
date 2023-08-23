// 下面的代码输出什么（京东）？
var foo = {
  n: 1,
};

var arr = [foo];

function method1(arr) {
  var bar = arr[0];
  arr.push(bar);
  bar.n++;
  arr = [bar];
  arr.push(bar);
  arr[1].n++;
}
function method2(foo) {
  foo.n++;
}
function method3(n) {
  n++;
}
method1(arr);
method2(foo);
method3(foo.n);

console.log(foo.n, arr.length);
