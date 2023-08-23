var abc = (function () {
  var a = 1; // 不希望污染全局
  var b = 2; // 不希望污染全局

  function c() {
    console.log(a + b);
  }

  var d = 123;
  return {
    c: c,
    d: d,
  };
})();
