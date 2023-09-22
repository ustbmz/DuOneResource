# Scheduler调度延时任务



## *unstable_scheduleCallback*

```js
function unstable_scheduleCallback(priorityLevel,callback,options){
  //...
  if (startTime > currentTime) {
    // 调度一个延时任务
    requestHostTimeout(handleTimeout, startTime - currentTime);
  } else {
    // 调度一个普通任务
    requestHostCallback(flushWork);
  }
}
```

- 可以看到，调度一个延时任务的时候，主要是执行 requestHostTimeout



## requestHostTimeout

```js
// 实际上在浏览器环境就是 setTimeout
const localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;

/**
 * 
 * @param {*} callback 就是传入的 handleTimeout
 * @param {*} ms 延时的时间
 */
function requestHostTimeout(callback, ms) {
  taskTimeoutID = localSetTimeout(() => {
    callback(getCurrentTime());
  }, ms);
  /**
   * 因此，上面的代码，就可以看作是
   * id = setTimeout(function(){
   *    handleTimeout(getCurrentTime())
   * }, ms)
   */
}

```

可以看到，requestHostTimeout 实际上就是调用 setTimoutout，然后在 setTimeout 中，调用传入的 handleTimeout



## handleTimeout

```js
/**
 *
 * @param {*} currentTime 当前时间
 */
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  // 遍历timerQueue，将时间已经到了的延时任务放入到 taskQueue
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      // 从普通任务队列中拿一个任务出来
      isHostCallbackScheduled = true;
      // 采用调度普通任务的方式进行调度
      requestHostCallback(flushWork);
    } else {
      // taskQueue任务队列里面是空的
      // 再从 timerQueue 队列取一个任务出来
      // peek 是小顶堆中提供的方法
      const firstTimer = peek(timerQueue);
      if (firstTimer !== null) {
        // 取出来了，接下来取出的延时任务仍然使用 requestHostTimeout 进行调度
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}
```

- handleTimeout 里面主要就是调用 advanceTimers 方法，该方法的作用是将时间已经到了的延时任务放入到 taskQueue，那么现在 taskQueue 里面就有要执行的任务，然后使用 requestHostCallback 进行调度。如果 taskQueue 里面没有任务了，再次从 timerQueue 里面去获取延时任务，然后通过 requestHostTimeout 进行调度。



## 流程图

Scheduler 这一块儿大致的流程图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-12-30-023505.png" alt="image-20221230103504711" style="zoom: 50%;" />