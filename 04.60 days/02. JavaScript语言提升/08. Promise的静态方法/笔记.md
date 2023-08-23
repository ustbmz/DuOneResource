# 邓哥的新问题

邓嫂出门时，给邓哥交待了几个任务：

1. 做饭

   可交给电饭煲完成

2. 洗衣服

   可交给洗衣机完成

3. 打扫卫生

   可交给扫地机器人完成

邓哥需要在所有任务结束后给邓嫂汇报工作，哪些成功了，哪些失败了

为了最大程度的节约时间，邓哥希望这些任务同时进行，最终汇总结果统一处理

<img src="http://mdrs.yuanjin.tech/img/20210621142519.png" alt="image-20210621142519937" style="zoom:50%;" />

每个任务可以看做是一个返回Promise的函数

```js
// 做饭
function cook() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了电饭煲');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('饭已ok');
      } else {
        reject('做饭却忘了加水，米饭变成了爆米花');
      }
    }, 2000);
  });
}

// 洗衣服
function wash() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了洗衣机');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('衣服已经洗好');
      } else {
        reject('洗衣服时停水了，洗了个寂寞');
      }
    }, 2500);
  });
}

// 打扫卫生
function sweep() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了扫地机器人');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('地板扫的非常干净');
      } else {
        reject('扫地机器人被哈士奇一爪掀翻了');
      }
    }, 3000);
  });
}

```

如何利用这三个函数实现邓哥的要求呢？

# Promise的静态方法

| 方法名                       | 含义                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Promise.resolve(data)        | 直接返回一个完成状态的任务                                   |
| Promise.reject(reason)       | 直接返回一个拒绝状态的任务                                   |
| Promise.all(任务数组)        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| Promise.any(任务数组)        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败 |
| Promise.race(任务数组)       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致       |
|                              |                                                              |

# 邓哥的解决方案

```js
Promise.allSettled([cook(), wash(), sweep()]).then((result) => {
  // 处理汇总结果
  const report = result
    .map((r) => (r.status === 'fulfilled' ? r.value : r.reason))
    .join(';');
  console.log(report);
});
```

