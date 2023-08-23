//1. 完成下面的函数

/**
 * 延迟一段指定的时间
 * @param {Number} duration 等待的时间
 * @returns {Promise} 返回一个任务，该任务在指定的时间后完成
 */
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// 2. 按照要求，调用delay函数，完成程序

// 利用delay函数，等待1秒钟，输出：finish
delay(1000).then(() => {
  console.log('finish');
});
