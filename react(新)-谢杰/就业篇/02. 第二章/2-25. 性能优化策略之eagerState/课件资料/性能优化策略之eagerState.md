# 性能优化策略之eagerState

> 面试题：谈一谈 React 中的 eagerState 策略是什么？

在 React 中，有很多和性能优化相关的 API：

- shouldComponentUpdate
- PureComponent
- React.memo
- useMemo
- useCallback

实际上，开发者调用上面的 API，内部是在命中 React 的性能优化策略：

- eagerState
- bailout

```jsx
import { useState } from "react";

// 子组件
function Child() {
  console.log("child render");
  return <span>child</span>;
}

// 父组件
function App() {
  const [num, updateNum] = useState(0);
  console.log("App render", num);

  return (
    <div onClick={() => updateNum(1)}>
      <Child />
    </div>
  );
}
```

在上面的代码中，渲染结果如下：

首次渲染：

```js
App render 0
child render
```

第一次点击

```js
App render 1
child render
```

第二次点击

```js
App render 1
```

第三次以及之后的点击

不会有打印



上面的这个例子实际上就涉及到了我们所提到的 React 内部的两种性能优化策略：

- 在第二次打印的时候，并没有打印 child render，此时实际上是命中了 bailout 策略。命中该策略的组件的子组件会跳过 reconcile 过程，也就是说子组件不会进入 render 阶段。
- 后面的第三次以及之后的点击，没有任何输入，说明 App、Child 都没有进入 render 阶段，此时命中的就是 eagerState 策略，这是一种发生于触发状态更新时的优化策略，如果命中了该策略，此次更新不会进入 schedule 阶段，更不会进入 render 阶段。



## eagerState 策略

该策略的逻辑其实是很简单：如果某个状态更新前后没有变化，那么就可以跳过后续的更新流程。

state 是基于 update 计算出来的，计算过程发生在 render 的 beginWork，而 eagerState 则是将计算过程提前到了 shcedule 之前执行。

该策略有一个前提条件，那就是当前的 FiberNode 不存在待执行的更新，因为如果不存在待执行的更新，那么当前的更新就是第一个更新，那么计算出来的 state 即便有变化也可以作为后续更新的基础 state 来使用。

例如，在使用 useState 触发更新的时候，对应的 dispatchSetState 逻辑如下：

```js
if (
  fiber.lanes === NoLanes &&
  (alternate === null || alternate.lanes === NoLanes)
) {
  // 队列当前为空，这意味着我们可以在进入渲染阶段之前急切地计算下一个状态。 如果新状态与当前状态相同，我们或许可以完全摆脱困境。
  const lastRenderedReducer = queue.lastRenderedReducer;
  if (lastRenderedReducer !== null) {
    let prevDispatcher;
    try {
      const currentState = queue.lastRenderedState; // 也就是 memoizedState
      const eagerState = lastRenderedReducer(currentState, action); // 基于 action 提前计算 state
      // 将急切计算的状态和用于计算它的缩减器存储在更新对象上。 
      // 如果在我们进入渲染阶段时 reducer 没有改变，那么可以使用 eager 状态而无需再次调用 reducer。
      update.hasEagerState = true; // 标记该 update 存在 eagerState
      update.eagerState = eagerState; // 存储 eagerState 的值
      if (is(eagerState, currentState)) {
        // ...
        return;
      }
    } catch (error) {
      // ...
    } finally {
      // ...
    }
  }
}
```

在上面的代码中，首先通过 lastRenderedReducer 来提前计算 state，计算完成后在当前的 update 上面进行标记，之后使用 is(eagerState, currentState) 判断更新后的状态是否有变化，如果进入 if，说明更新前后的状态没有变化，此时就会命中 eagerState 策略，不会进入 schedule 阶段。

即便不为 true，由于当前的更新是该 FiberNode 的第一个更新，因此可以作为后续更新的基础 state，因此这就是为什么在 FC 组件类型的 update 里面有 hasEagerState 以及 eagerState 字段的原因：

```js
const update = {
  hasEagerState: false,
  eagerState: null,
  // ...
}
```



在上面的示例中，比较奇怪的是第二次点击，在第二次点击之前，num 已经为 1 了，但是父组件仍然重新渲染了一次，为什么这种情况没有命中 eagerState 策略？

FiberNode 分为 current 和 wip 两种。

在上面的判断中，实际上会对 current 和 wip 都进行判断，判断的条件为两个 Fiber.lanes 必须要为 NoLanes

```js
if (
  fiber.lanes === NoLanes &&
  (alternate === null || alternate.lanes === NoLanes)
){
  // ....
}
```

对于第一次更新，当 beginWork 开始前，current.lanes 和 wip.lanes 都不是 NoLanes。当 beginWork 执行后， wip.lanes 会被重置为 NoLanes，但是 current.lanes 并不会，current 和 wip 会在 commit 阶段之后才进行互换，这就是为什么第二次没有命中 eagerState 的原因。



那么为什么后面的点击又命中了呢？

虽然上一次点击没有命中 eagerState 策略，但是命中了 bailout 策略，对于命中了 bailout 策略的 FC，会执行 bailoutHooks 方法：

```js
function bailoutHooks(
  current: Fiber,
  workInProgress: Fiber,
  lanes: Lanes,
) {
  workInProgress.updateQueue = current.updateQueue;
  // ...
  current.lanes = removeLanes(current.lanes, lanes);
}
```

在执行 bailoutHooks 方法的时候，最后一句会将当前 FiberNode 的 lanes 移除，因此当这一轮更新完成后，current.lanes 和 wip.lanes 就均为 NoLanes，所以在后续的点击中就会命中 eagerState 策略。



## 真题解答

> 题目：谈一谈 React 中的 eagerState 策略是什么？
>
> 参考答案：
>
> 在 React 内部，性能优化策略可以分为：
>
> - eagerState 策略
> - bailout 策略
>
> eagerState 的核心逻辑是如果某个状态更新前后没有变化，则可以跳过后续的更新流程。该策略将状态的计算提前到了 schedule 阶段之前。当有 FiberNode 命中 eagerState 策略后，就不会再进入 schedule 阶段，直接使用上一次的状态。
>
> 该策略有一个前提条件，那就是当前的 FiberNode 不存在待执行的更新，因为如果不存在待执行的更新，当前的更新就是第一个更新，计算出来的 state 即便不能命中 eagerState，也能够在后面作为基础 state 来使用，这就是为什么 FC 所使用的 Update 数据中有 hasEagerState 以及 eagerState 字段的原因。