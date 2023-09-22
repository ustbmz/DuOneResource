// const pro = new Promise((resolve, reject) => {
//   reject(1);
// });
// console.log(pro);

const pro = Promise.race([
  Promise.reject(1),
  Promise.reject(2),
  Promise.resolve(3),
]);
setTimeout(() => {
  console.log(pro);
}, 1000);
// pro.catch((result) => {
//   console.log('失败', result.errors);
// });
