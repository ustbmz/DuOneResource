# useCallback和useMemo

> 面试题：useCallback 和 useMemo 的区别是什么？



## useCallback

useCallback 用法如下：

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

使用 useCallback 最终会得到一个缓存的函数，该缓存函数会在 a 或者 b 依赖项发生变化时再更新。



**mount 阶段**

在 mount 阶段执行的就是 mountCallback，相关代码如下：

```js
function mountCallback(callback, deps) {
  // 首先还是创建一个 hook 对象
  const hook = mountWorkInProgressHook();
  // 依赖项
  const nextDeps = deps === undefined ? null : deps;
  // 把要缓存的函数和依赖数组存储到 hook 对象上
  hook.memoizedState = [callback, nextDeps];
  // 向外部返回缓存函数
  return callback;
}
```

在上面的代码中，首先会调用 mountWorkInProgressHook 得到一个 hook 对象，在 hook 对象的 memoizedState 上面保存 callback 以及依赖项目，最后向外部返回 callback



**update阶段**

update 调用的是 updateCallback，相关代码如下：

```js
function updateCallback(callback, deps) {
  // 拿到之前的 hook 对象
  const hook = updateWorkInProgressHook();
  // 新的依赖项
  const nextDeps = deps === undefined ? null : deps;
  // 之前的值，也就是 [callback, nextDeps]
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1]; // 拿到之前的依赖项
      // 对比依赖项是否相同
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 相同返回 callback
        return prevState[0];
      }
    }
  }
  // 否则重新缓存
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

在组件更新阶段，首先拿到之前的 hook 对象，从之前的 hook 对象的 memoizedState 上面拿到之前的依赖项，和新传入的依赖项做一个对比，如果相同，则返回之前缓存的 callback，否则就重新缓存，返回新的 callback



## useMemo

用法如下：

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

使用 useMemo 缓存的是一个值，这个值会在 a 或者 b 发生变化的时候重新进行计算并缓存。



**mount 阶段**

mount 阶段调用的是 mountMemo，代码如下：

```js
function mountMemo(nextCreate, deps) {
  // 创建 hook 对象
  const hook = mountWorkInProgressHook();
  // 存储依赖项
  const nextDeps = deps === undefined ? null : deps;

  // ... 
  
  // 执行传入的函数，拿到返回值
  const nextValue = nextCreate();
  // 将函数返回值和依赖存储到 memoizedState 上面
  hook.memoizedState = [nextValue, nextDeps];
  // 返回函数计算得到的值
  return nextValue;
}
```

在 mount 阶段首先会调用 mountWorkInProgressHook 方法得到一个 hook 对象，之后执行传入的函数（第一个参数）得到计算值，将计算值和依赖项目存储到 hook 对象的 memoizedState 上面，最后向外部返回计算得到的值。



**update 阶段**

update 阶段调用的是 updateMemo，相关代码如下：

```js
function updateMemo(nextCreate, deps) {
  // 获取之前的 hook 对象
  const hook = updateWorkInProgressHook();
  // 新的依赖项
  const nextDeps = deps === undefined ? null : deps;
  // 获取之前的 memoizedState，也就是 [nextValue, nextDeps]
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      // 拿到之前的依赖项
      const prevDeps = prevState[1];
      // 比较和现在的依赖项是否相同
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 如果相同，则返回之前的值
        return prevState[0];
      }
    }
  }
  // ...
  // 否则重新计算
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

首先，仍然是从 updateWorkInProgressHook 上面拿到之前的 hook 对象，从而获取到之前的依赖项目，然后和新传入的依赖项目就行一个对比，如果依赖项目没有变化，则返回之前的计算值，否则就执行传入的函数重新进行计算，最后向外部返回新的计算值。



## 真题解答

> 题目：useCallback 和 useMemo 的区别是什么？
>
> 参考答案：
>
> 在 useCallback 内部，会将函数和依赖项一起缓存到 hook 对象的 memoizedState 属性上，在组件更新阶段，首先会拿到之前的 hook 对象，从之前的 hook 对象的 memoizedState 属性上获取到之前的依赖项目，对比依赖项目是否相同，如果相同返回之前的 callback，否则就重新缓存，然后返回新的 callback。
>
> 在 useMemo 内部，会将传入的函数执行并得到计算值，将计算值和依赖项目存储到 hook 对象的 memoizedState 上面，最后向外部返回计算得到的值。更新的时候首先是从 updateWorkInProgressHook 上拿到之前的 hook 对象，从而获取到之前的依赖值，和新传入的依赖进行一个对比，如果相同，就返回上一次的计算值，否则就重新调用传入的函数得到新的计算值并缓存，最后向外部返回新的计算值。