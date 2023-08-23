// 提供一些数学相关的函数
console.log('math run');
function isOdd(n) {
  return n % 2 !== 0;
}

function sum(a, b) {
  return a + b;
}

module.exports = {
  isOdd,
  sum,
};
