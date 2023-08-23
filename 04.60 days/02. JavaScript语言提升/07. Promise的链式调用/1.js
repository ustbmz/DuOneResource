new Promise((resolve, reject) => {
  reject(new Error('abc'));
}).catch((err) => {
  console.log('失败了！！', err);
});
