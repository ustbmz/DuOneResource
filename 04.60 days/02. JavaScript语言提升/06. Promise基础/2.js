const pro = new Promise((resolve, reject) => {
  console.log('开始百米短跑');
  const duration = Math.floor(Math.random() * 5000);

  setTimeout(() => {
    if (Math.random() < 0.5) {
      // 成功
      resolve(duration); // 将任务从挂起->完成
    } else {
      // 失败，脚扭伤了
      reject('脚扭伤了！');
    }
  }, duration);
});

pro.then(
  (data) => {
    console.log('on yeah! 我跑了', data, '秒');
  },
  (reason) => {
    console.log('不好意思，', reason);
  }
);
