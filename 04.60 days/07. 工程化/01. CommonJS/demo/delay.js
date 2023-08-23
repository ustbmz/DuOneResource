/**
 * 该函数返回一个Promise，它会等待指定的毫秒数，时间到达后该函数完成
 * @param {number} ms 毫秒数
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = delay;
