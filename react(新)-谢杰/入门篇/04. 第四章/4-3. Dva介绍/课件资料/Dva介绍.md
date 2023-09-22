# *Dva* 介绍

*Dva* 是一个基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，可以理解为一个轻量级的应用框架。

官网：*https://dvajs.com/*

*Dva* 的本意，是将基于 *React* 技术栈中常用到的库集成到一起。当时，*React* 社区中最流行的应用架构方案如下：

- 路由： [React-Router](https://github.com/ReactTraining/react-router/tree/v2.8.1)
- 状态管理： [Redux](https://github.com/reactjs/redux)
- 异步操作： [Redux-saga](https://github.com/yelouafi/redux-saga)



上面的架构中，除了 *Redux-saga* 我们没有介绍，前面两个我们都是有所接触的。

而 *Dva* 则是将上面三个 *React* 工具库包装在一起，简化了 *API*，让开发 *React* 应用更加方便和快捷。因此：

> ***Dva = React-Router + Redux + Redux-saga***



*Redux-saga* 主要是为了处理数据流中异步操作的问题，虽然我们没有前面没有介绍，但是并不影响我们学习 *Dva*。

*Dva* 中提供的数据流方案如下图：

数据流图1:

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-05-082108.png" alt="image-20221105162108061" style="zoom:50%;" />

数据流图2:

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-05-082152.png" alt="image-20221105162152274" style="zoom:50%;" />

*Dva* 中的核心概念如下：

- *app.model*
  - *namespace*: 当前 *Model* 的名称。整个应用的 *State*，由多个小的 *Model* 的 *State* 以 *namespace* 为 *key* 合成
  - *state*: 该 *Model* 当前的状态。数据保存在这里，直接决定了视图层的输出
  - *reducers*: *Action* 处理器，处理同步动作，用来算出最新的 *State*
  - *effects*：*Action* 处理器，处理异步动作，*Effect* 是一个 *Generator* 函数，内部使用 *yield* 关键字，标识每一步的操作（不管是异步或同步）
    - *dva* 提供多个 *effect* 函数内部的处理函数，比较常用的是 `call` 和 `put`
    - *call*：执行异步函数
    - *put*：发出一个 *Action*，类似于 *dispatch*



*Dva* 练习：学生管理系统

目前，*Dva* 已经被融入到了 *Umi* 当中，之后我们在 *Umi* 中可以以插件的形式开启 *Dva* 来管理应用的数据流。





