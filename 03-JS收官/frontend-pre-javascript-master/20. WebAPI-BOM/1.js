var timerId;

// 开始（继续）
function start() {
  if (timerId) {
    // 当前已经有计时器了
    return;
  }
  timerId = setInterval(function () {
    console.clear();
    console.log(new Date().toLocaleString());
  }, 1000);
}

// 停止
function stop() {
  clearInterval(timerId);
  timerId = null;
}
