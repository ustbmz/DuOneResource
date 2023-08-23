![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

# catch方法

`.catch(onRejected)` = `.then(null, onRejected)`

# 链式调用

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

1. then方法必定会返回一个新的Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

由于链式任务的存在，异步代码拥有了更强的表达力

```js
// 常见任务处理代码

/*
 * 任务成功后，执行处理1，失败则执行处理2
 */
pro.then(处理1).catch(处理2)

/*
 * 任务成功后，依次执行处理1、处理2
 */
pro.then(处理1).then(处理2)

/*
 * 任务成功后，依次执行处理1、处理2，若任务失败或前面的处理有错，执行处理3
 */
pro.then(处理1).then(处理2).catch(处理3)
```

# 邓哥的解决方案

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

sendMessage('李建国')
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('王富贵');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('周聚财');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('刘人勇');
  })
  .then(
    (reply) => {
      // 成功，结束
      console.log(reply);
      console.log('邓哥终于找到了自己的伴侣');
    },
    (reply) => {
      // 最后一个也失败了
      console.log(reply);
      console.log('邓哥命犯天煞孤星，无伴终老，孤独一生');
    }
  );
```

