var arr = [5, 2, 7, 11, 1, 6];

// a、b是数组的其中两项

arr.sort(function (a, b) {
  // 升序排序，a>b就返回正数，反之返回负数，相等返回0
  return a - b;
});

// 随机排序
arr.sort(function () {
  return Math.random() - 0.5;
});

console.log(arr);
