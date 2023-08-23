// 根据下面的调用和注释，完成函数 createOptions
function createOptions(options) {
  options = options || {};
  const defaultOptions = {
    time: 1000,
    speed: 50,
    text: '',
  };
  return {
    ...defaultOptions,
    ...options,
  };
}
let result;
result = createOptions(); // { time: 1000, speed: 50, text: '' }

result = createOptions({
  time: 500,
}); // { time: 500, speed: 50, text: '' }

result = createOptions({
  time: 500,
  text: 'hello world',
}); // { time: 500, speed: 50, text: 'hello world' }
console.log(result);
