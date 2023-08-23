// 根据下面的调用和注释，完成函数 createOptions

createOptions(); // { time: 1000, speed: 50, text: '' }
createOptions({
  time: 500,
}); // { time: 500, speed: 50, text: '' }

createOptions({
  time: 500,
  text: 'hello world',
}); // { time: 500, speed: 50, text: 'hello world' }
