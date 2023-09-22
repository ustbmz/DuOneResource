# *React-redux* 介绍



- 什么是状态管理
- *Redux* 的核心思想
- *React-redux* 介绍



## 什么是状态管理

所谓状态管理，指的是**把组件之间需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态的变化可以预测**。

组件之间通常会有一些共享的状态，在 *Vue* 或者 *React* 中我们一般会将这部分状态提升至公共父组件的 *props* 中，由父组件来统一管理共享的状态，状态的改变也是由父组件执行并向下传递。这样会导致两个问题:

- 需要将共享的状态提升至公共的父组件，若无公共的父组件，往往需要自行构造
- 状态由父组件自上而下逐层传递，若组件层级过多，数据传递会变得很冗杂

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-04-023144.png" alt="image-20221104103143856" style="zoom:50%;" />

此时，我们就需要一个统一的仓库来对组件状态进行管理，如下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-04-023459.png" alt="image-20221104103459131" style="zoom:50%;" />



## *Redux* 的核心思想

早期的时候，*React* 官方提供了 *Flux*，*Flux* 的特点如下：

- 单向数据流。视图事件或者外部测试用例发出 *Action* ，经由 *Dispatcher* 派发给 *Store* ，*Store* 会触发相应的方法更新数据、更新视图
- **Store 可以有多个**
- **Store 不仅存放数据，还封装了处理数据的方法**



*2015* 年的时候，*Dan Abramov* 推出的 *Redux* 席卷了整个 *React* 社区，*Redux* 本质就是在 *Flux* 上做了一些更新：

- **单向数据流**。*View* 发出 *Action* (`store.dispatch(action)`)，*Store* 调用 *Reducer* 计算出新的 *state* ，若 *state* 产生变化，则调用监听函数重新渲染 View （`store.subscribe(render)`）

- **单一数据源**，只有一个 *Store*

- *state* 是只读的，每次状态更新之后只能返回一个新的 *state*

- 没有 *Dispatcher* ，而是在 *Store* 中集成了 *dispatch* 方法，**`store.dispatch()` 是 *View* 发出 *Action* 的唯一途径**

- 支持使用中间件（*Middleware*）管理异步数据流

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-04-025541.png" alt="image-20221104105541056" style="zoom:50%;" />

*Redux* 官网：*https://redux.js.org/*

*Redux* 数据流：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-04-030252.png" alt="image-20221104110251637" style="zoom:50%;" />

*Redux* 示例：*ToDoList*

在浏览器中使用 *redux* 扩展工具，首先需要打开谷歌浏览器的扩展应用商店，下载 *redux devtools*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-07-062826.png" alt="image-20221107142826791" style="zoom:50%;" />

接下来需要在创建 *store* 的地方，添加如下的代码：

```js
export const store = createStore(
    todoReducer,
  + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

详细可以参阅：*https://github.com/zalmoxisus/redux-devtools-extension#usage*



## *React-redux* 介绍

*Redux* 是一个独立的第三方库，之后 *React* 官方在 *Redux* 的基础上推出了 *React-redux*：*https://react-redux.js.org/*

最新版的 *React-redux*，已经全面拥抱了 *Hooks*，内置了诸如：

- *useSelector*
- *useDispatch*
- *useStore*

一类的 *Hook*，我们只要掌握这一类 *Hook*，就可以轻松上手。

另外，*Redux* 官方还推出了 *Redux Toolkit*，来简化整个 *Redux* 的使用。官方文档：*https://redux-toolkit.js.org/*

因此现在在 *React* 应用中，状态管理库的使用一般都是 *React-redux + Redux Toolkit*



*React-redux* 示例：*ToDoList*



**和后端进行交互**

一般来讲，当数据发生变化时，不仅仅是前端的状态库要更新数据，服务器端也要对应的对数据进行更新，此时的更新流程如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-04-051248.png" alt="image-20221104131247736" style="zoom:50%;" />

和后端交互示例：学生管理系统

