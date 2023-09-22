// 下面代码的输出结果是什么

new Promise((resolve, reject) => {
  resolve();
})
  .then((res) => {
    console.log(res.toString());
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .then((res) => {
    console.log(res);
  });
