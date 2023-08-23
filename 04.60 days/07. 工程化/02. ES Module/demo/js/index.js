// import math from './math.js';

// const result = math.sum(1, 2);
// console.log(result);

setTimeout(async () => {
  const m = await import('./math.js');
  const math = m.default;
  const result = math.isOdd(1, 2);
  console.log(result);
}, 1000);
