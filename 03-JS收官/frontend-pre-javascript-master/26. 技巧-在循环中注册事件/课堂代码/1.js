for (var i = 0; i < 3; i++) {
  // 产生一个新的作用域，作用域中有一个变量，值和这一次循环的i相同
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}
