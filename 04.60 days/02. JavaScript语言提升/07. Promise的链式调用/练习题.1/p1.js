// 下面代码的输出结果是什么

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
})
  .then((data) => {
    throw 3;
    return data + 1;
  })
  .then((data) => {
    console.log(data);
  });
