const config = require('./config');

/**
 * 该函数会做以下两件事：
 * 1. console.clear() 清空控制台
 * 2. 读取config.js中的text配置，打印开始位置到index位置的字符
 * @param {number} index
 */
function print(index) {
  console.clear();
  const txt = config.text.substring(0, index + 1);
  console.log(txt);
}

module.exports = print;
