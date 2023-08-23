// 导出两个函数 sum，isOdd

// export function sum(a, b) {
//   return a + b;
// }

// export const isOdd = (n) => n % 2 !== 0;

export default {
  sum(a, b) {
    return a + b;
  },
  isOdd(n) {
    return n % 2 !== 0;
  },
};

/**
 * {
      default: {
        sum: fn,
        isOdd: fn
      }
 * }
 *  */
