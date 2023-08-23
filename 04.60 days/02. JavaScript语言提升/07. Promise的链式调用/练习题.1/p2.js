// 下面代码的输出结果是什么

const pro = new Promise((resolve, reject) => {
  resolve(1);
})
  .then((res) => {
    console.log(res);
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .then((res) => {
    console.log(res);
  });

setTimeout(() => {
  console.log(pro);
}, 1000);
