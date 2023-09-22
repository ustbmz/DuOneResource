function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, duration);
  });
}

// delay(1000).then(() => {
//   console.log('执行某个东西');
// });

(async () => {
  try {
    await delay(1000);
    console.log('成功');
  } catch (err) {
    console.log('失败');
  }
})();

// delay(1000).then(
//   (data) => {
//     console.log('成功');
//   },
//   (err) => {
//     console.log('失败');
//   }
// );
