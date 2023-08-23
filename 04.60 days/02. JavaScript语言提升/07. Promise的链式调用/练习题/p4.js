// 下面代码的输出结果是什么

new Promise((resolve, reject) => {
  throw new Error(1);
})
  .then((res) => {
    console.log(res);
    return new Error('2');
  })
  .catch((err) => {
    throw err;
    return 3;
  })
  .then((res) => {
    console.log(res);
  });
