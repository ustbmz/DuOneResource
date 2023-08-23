function m() {
  var a;
  function b() {}
  var c;
  console.log(a, b, c);
  a = 1;

  c = function () {};
}

m();
