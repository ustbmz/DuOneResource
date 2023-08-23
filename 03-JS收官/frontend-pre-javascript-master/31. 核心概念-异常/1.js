function A() {
  console.log('A start');
  B();
  console.log('A end');
}

function B() {
  console.log('B start');
  C();
  console.log('B end');
}

function C() {
  console.log('C start');
  var a;
  console.log(a.name);
  console.log('C end');
}

A();
console.log('global end');
