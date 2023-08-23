// // 死循环指定的时间
// function delay(duration) {
//   var start = Date.now();
//   while (Date.now() - start < duration) {}
// }

setTimeout(function () {
  console.log(1);
}, 0);

Promise.resolve().then(function () {
  console.log(2);
});

console.log(3);
