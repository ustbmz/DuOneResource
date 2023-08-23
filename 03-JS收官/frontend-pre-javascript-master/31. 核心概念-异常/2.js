// try {
//   console.log('try start');
//   var a = getUser();
//   console.log(a.name);
//   console.log('try end');
// } catch (err) {
//   console.log('catch start');
//   console.log(err.message);
//   console.log('catch end');
// } finally {
//   console.log('finally');
// }

// console.log('start');

// throw new TypeError('hahahaah');
// console.log('end');

/**
 * 得到两个数字之和
 * 若传递的不是数字，则会抛出TypeError
 * @param {number} a 数字1
 * @param {number} b 数字2
 * @return {number} 两数之和
 */
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('必须传入两个数字才能求和');
  }
  return a + b;
}
