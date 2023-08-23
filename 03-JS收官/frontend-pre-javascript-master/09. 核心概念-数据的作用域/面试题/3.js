// 下面的代码输出什么？(百度)

var a = 1;

function m1() {
  a++;
}

function m2() {
  var a = 2;
  m1();
  console.log(a);
}

m2();
console.log(a);
