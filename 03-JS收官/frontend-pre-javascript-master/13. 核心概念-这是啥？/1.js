function m(a, b) {
  console.log(this, a, b);
}

var arr = {};
// m.call(arr, 1, 2); // 调用m函数，让它里面的this指向arr
m.apply(arr, [1, 2]);
