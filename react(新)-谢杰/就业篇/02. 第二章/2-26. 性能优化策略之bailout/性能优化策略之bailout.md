# 性能优化策略之bailout

> 面试题：谈一谈 React 中的 bailout 策略

前面我们学习 beginWork 的时候，我们知道 beginWork 的作用主要是生成 wipFiberNode 的子 FiberNode，要达到这个目录存在两种方式：

- 通过 reconcile 流程生成子 FiberNode
- 通过命中 bailout 策略来复用子 FiberNode

在前面我们讲过，所有的变化都是由“自变量”的改变造成的，在 React 中自变量：

- state
- props
- context

因此是否命中 bailout 主要也是围绕这三个变量展开的，整体的工作流程如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-03-09-010841.png" alt="image-20230309090841270" style="zoom:50%;" />

从上图可以看出，bailout 是否命中发生在 update 阶段，在进入 beginWork 后，会有两次是否命中 bailout 策略的相关判断



## 第一次判断

第一次判断发生在确定了是 update 后，立马就会进行是否能够复用的判断：

- oldProps 全等于 newProps
- Legacy Context 没有变化
- FiberNode.type 没有变化
- 当前 FiberNode 没有更新发生



**oldProps 全等于 newProps**

注意这里是做的一个全等比较。组件在 render 之后，拿到的是一个 React 元素，会针对 React 元素的 props 进行一个全等比较。但是由于每一次组件 render 的时候，会生成一个全新的对象引用，因此 oldProps 和 newProps 并不会全等，此时是没有办法命中 bailout。

只有当父 FiberNode 命中 bailout 策略时，复用子 FiberNode，在子 FiberNode 的 beginWork 中，oldProps 才有可能和 newProps 全等。

> 备注：视频中这里讲解有误，不是针对 props 属性每一项进行比较，而是针对 props 对象进行全等比较。上面的笔记内容已修改。



**Legacy Context 没有变化**

Legacy Context指的是旧的 ContextAPI，ContextAPI重构过一次，之所以重构，就是和 bailout策略相关。



**FiberNode.type 没有变化**

这里所指的 FiberNode.type 没有变化，指的是不能有例如从 div 变为 p 这种变化。

```jsx
function App(){
  const Child = () => <div>child</div>
  return <Child/>
}
```

在上面的代码中，我们在 App 组件中定义了 Child 组件，那么 App 每次 render 之后都会创建新的 Child 的引用，因此对于 Child 来讲，FiberNode.type 始终是变化的，无法命中 bailout 策略。

因此不要在组件内部再定义组件，以免无法命中优化策略。



**当前 FiberNode 没有更新发生**

当前 FiberNode 没有发生更新，则意味着 state 没有发生变化。

例如在源码中经常会存在是否有更新的检查：

```js
function checkScheduledUpdateOrContext(current, renderLanes) {
  // 在执行 bailout 之前，我们必须检查是否有待处理的更新或 context。
  const updateLanes = current.lanes;
  if (includesSomeLane(updateLanes, renderLanes)) {
    // 存在更新
    return true;
  }
  
  //...
  
  // 不存在更新
  return false;
}
```



**当以上条件都满足的时候**，会命中 bailout 策略，命中该策略后，会执行 bailoutOnAlreadyFinishedWork 方法，在该方法中，会进一步的判断优化程序，根据优化程度来决定是整颗子树都命中 bailout 还是复用子树的 FiberNode

```js
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  
  // ...

  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    // ...
    // 整颗子树都命中 bailout 策略
		return null;
  }

  // 该 FiberNode 没有命中 bailout，但它的子树命中了。克隆子 FiberNode 并继续
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}
```

通过 wipFiberNode.childLanes 就可以快速的排查当前的 FiberNode 的整颗子树是否存在更新，如果不存在，直接跳过整颗子树的 beginWork。

这其实也解释了为什么每次 React 更新都会生成一颗完整的 FiberTree 但是性能上并不差的原因。



## 第二次判断

如果第一次没有命中 bailout 策略，则会根据 tag 的不同进入不同的处理逻辑，之后还会再进行第二次的判断。

第二次判断的时候会有两种命中的可能：

- 开发者使用了性能优化 API
- 虽然有更新，但是 state 没有变化



**开发者使用了性能优化 API**

在第一次判断的时候，默认是对 props 进行全等比较，要满足这个条件实际上是比较困难的，性能优化 API 的工作原理主要就是改写这个判断条件。

比如 React.memo，通过该 API 创建的 FC 对应的 FiberNode.tag 为 MemoComponent，在 beginWork 中对应的处理逻辑如下：

```js
const hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(
  current,
  renderLanes,
);
if (!hasScheduledUpdateOrContext) {
  const prevProps = currentChild.memoizedProps;
  // 比较函数，默认进行浅比较
  let compare = Component.compare;
  compare = compare !== null ? compare : shallowEqual;
  if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
    // 如果 props 经比较未变化，且 ref 不变，则命中 bailout 策略
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
}
```

因此是否命中 bailout 策略的条件就变成了如下三个：

- 不存在更新
- 经过比较（浅比较）后 props 没有变化
- ref 没有发生改变

如果同时满足上面这三个条件，就会命中 bailout 策略，执行 bailoutOnAlreadyFinishedWork 方法。相较于第一次判断，第二次判断 props 采用的是浅比较进行判断，因此能够更加容易命中 bailout



例如再来看一个例子，比如 ClassComponent 的优化手段经常会涉及到 PureComponent 或者 shouldComponentUpdate，这两个 API 实际上背后也是在优化命中bailout 策略的方式

在 ClassComponnet 的 beginWork 方法中，有如下的代码：

```js
if(!shouldUpdate && !didCaptureError){
  // 省略代码
  return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
}
```

shouldUpdate 变量受 checkShouldComponentUpdate 方法的影响：

```js
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext,
) {
  // ClassComponent 实例
  const instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === 'function') {
    let shouldUpdate = instance.shouldComponentUpdate(
      newProps,
      newState,
      nextContext,
    );
    
		// shouldComponentUpdate 执行后的返回值作为 shouldUpdate
    return shouldUpdate;
  }

  // 如果是 PureComponent
  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    // 进行浅比较
    return (
      !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    );
  }

  return true;
}
```

通过上面的代码中我们可以看出，PureComponent 通过浅比较来决定shouldUpdate的值，而shouldUpdate的值又决定了是否能够命中 bailout 策略。



**虽然有更新，但是 state 没有变化**

在第一次进行判断的时候，其中有一个条件是当前的 FiberNode 没有更新发生，没有更新就意味着 state 没有改变。但是还有一种情况，那就是有更新，但是更新前后计算出来的 state 仍然没有变化，此时就也会命中 bailout 策略。

例如在 FC 的 beginWork 中，有如下一段逻辑：

```js
function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps: any,
  renderLanes,
) {
  //...

  if (current !== null && !didReceiveUpdate) {
    // 命中 bailout 策略
    bailoutHooks(current, workInProgress, renderLanes);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  // ...

  // 进入 reconcile 流程
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
```

在上面的代码中，是否能够命中 bailout 策略取决于 didReceiveUpdate，接下来我们来看一下这个值是如何确定的：

```js
// updateReducer 内部在计算新的状态时
if (!is(newState, hook.memoizedState)) {
  markWorkInProgressReceivedUpdate();
}

function markWorkInProgressReceivedUpdate() {
  didReceiveUpdate = true;
}
```



## 真题解答

> 题目：谈一谈 React 中的 bailout 策略
>
> 参考答案：
>
> 在 beginWork 中，会根据 wip FiberNode 生成对应的子 FiberNode，此时会有两次“是否命中 bailout策略”的相关判断。
>
> - 第一次判断
>
>   - oldProps 全等于 newProps
>   - Legacy Context 没有变化
>   - FiberNode.type 没有变化
>   - 当前 FiberNode 没有更新发生
>
>   **当以上条件都满足时**会命中 bailout 策略，之后会执行 bailoutOnAlreadyFinishedWork 方法，该方法会进一步判断能够优化到何种程度。
>
>   通过 wip.childLanes 可以快速排查“当前 FiberNode 的整颗子树中是否存在更新”，如果不存在，则可以跳过整个子树的 beginWork。这其实也是为什么 React 每次更新都要生成一棵完整的 Fiebr Tree 但是性能并不差的原因。
>
> - 第二次判断
>
>   - 开发者使用了性能优化 API，此时要求当前的 FiberNode 要同时满足：
>     - 不存在更新
>     - 经过比较（默认浅比较）后 props 未变化
>     - ref 不变
>   - 虽然有更新，但是 state 没有变化