// 下面代码输出什么？
var foo = {
  n: 0,
  k: {
    n: 0,
  },
};
var bar = foo.k;
bar.n++;
bar = {
  n: 10,
};
bar = foo;
bar.n++;
bar = foo.n;
bar++;
console.log(foo.n, foo.k.n);
