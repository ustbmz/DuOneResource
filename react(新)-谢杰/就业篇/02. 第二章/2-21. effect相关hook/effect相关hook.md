# effect相关hook

> 面试题：说一说 useEffect 和 useLayoutEffect 的区别？



在 React 中，用于定义有副作用的因变量的 hook 有三个：

- useEffect：回调函数会在 commit 阶段完成后异步执行，所以它不会阻塞视图渲染
- useLayoutEffect：回调函数会在 commit 阶段的 Layout 子阶段同步执行，一般用于执行 DOM 相关的操作
- useInsertionEffect：回调函数会在 commit 阶段的 Mutation 子阶段同步执行，与 useLayoutEffect 的区别在于执行的时候无法访问对 DOM 的引用。这个 Hook 是专门为 CSS-in-JS 库插入全局的 style 元素而设计。



## 数据结构

对于这三个 effect 相关的 hook，hook.memoizedState 共同使用同一套数据结构：

```js
const effect = {
  //  用于区分 effect 类型 Passive |  Layout | Insertion
  tag,
  // effect 回调函数
  create,
  // effect 销毁函数
  destory,
  // 依赖项
  deps,
  // 与当前 FC 的其他 effect 形成环状链表
  next: null
}
```

tag 用来区分 effect 的类型：

- Passive： useEffect
- Layout：useLayoutEffect
- Insertion：useInsertionEffect



create 和 destory 分别指代 effect 的回调函数以及 effect 销毁函数：

```js
useEffect(()=>{
  // create
  return ()=>{
    // destory
  }
})
```



next 字段会与当前的函数组件的其他 effect 形成环状链表，连接的方式是一个单向环状链表。

```jsx
function App(){
  useEffect(()=>{
    console.log(1);
  });
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  useEffect(()=>{
    console.log(2);
  });
  useEffect(()=>{
    console.log(3);
  });
  
  return <div>Hello</div>
}
```

结构如下图所示：

![image-20230307105834596](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-03-07-025835.png)



## 工作流程

整个工作流程可以分为三个阶段：

- 声明阶段
- 调度阶段（useEffect 独有的）
- 执行阶段



### 声明阶段

声明阶段又可以分为 mount 和 update。

mount 的时候执行的是 mountEffectImpl，相关代码如下：

```js
function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  // 生成 hook 对象
  const hook = mountWorkInProgressHook();
  // 保存依赖的数组
  const nextDeps = deps === undefined ? null : deps;
  // 修改当前 fiber 的 flag
  currentlyRenderingFiber.flags |= fiberFlags;
  // 将 pushEffect 返回的环形链表存储到 hook 对象的 memoizedState 中
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps
  );
}
```

在上面的代码中，首先生成 hook 对象，拿到依赖，修改 fiber 的 flag，之后将当前的 effect 推入到环状列表，hook.memoizedState 指向该环状列表。



update 的时候执行的是 updateEffectImpl，相关代码如下：

```js
function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  // 先拿到之前的 hook 对象
  const hook = updateWorkInProgressHook();
  // 拿到依赖项
  const nextDeps = deps === undefined ? null : deps;

  // 初始化清除 effect 函数
  let destroy = undefined;

  if (currentHook !== null) {
    // 从 hook 对象上面的 memoizedState 上面拿到副作用的环形链表
    const prevEffect = currentHook.memoizedState;
    // 拿到销毁函数，也就是说副作用函数执行后返回的函数
    destroy = prevEffect.destroy; 
    // 如果新的依赖项不为空
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      // 两个依赖项进行比较
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 如果依赖的值相同，即依赖没有变化，那么只会给这个 effect 打上一个 HookPassive 一个 tag
        // 然后在组件渲染完以后会跳过这个 effect 的执行
        hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }
  // 如果deps依赖项发生改变，赋予 effectTag ，在commit节点，就会再次执行我们的effect 
  currentlyRenderingFiber.flags |= fiberFlags;

  // pushEffect 的作用是将当前 effect 添加到 FiberNode 的 updateQueue 中，然后返回这个当前 effcet
  // 然后是把返回的当前 effect 保存到 Hook 节点的 memoizedState 属性中
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  );
}
```

在上面的代码中，首先从 updateWorkInProgressHook 方法中拿到 hook 对象，之后会从 hook.memoizedState 拿到所存储的 effect 对象，之后会利用 areHookInputsEqual 方法进行前后依赖项的比较，如果依赖相同，那就会在 effect 上面打一个 tag，在组件渲染完以后会跳过这个 effect 的执行。

如果依赖发生了变化，那么当前的 fiberNode 就会有一个 flags，回头在 commit 阶段统一执行该 effect，之后会推入新的 effect 到环状链表上面。



areHookInputsEqual 的作用是比较两个依赖项数组是否相同，采用的是浅比较，相关代码如下：

```js
function areHookInputsEqual(nextDeps, prevDeps){
  // 省略代码
  for(let i=0; i<prevDeps.length && i< nextDeps.length; i++){
    // 使用 Object.is 进行比较
      if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}
```

pushEffect 方法的作用是生成一个 effect 对象，然后推入到当前的单向环状链表里面，相关代码如下：

```js
function pushEffect(tag, create, destroy, deps) {
  // 创建副作用对象
  const effect = {
    tag,
    create, // callback
    destroy,
    deps, // 依赖
    // Circular
    next: null,
  };

  let componentUpdateQueue = currentlyRenderingFiber.updateQueue;
  
  // 创建单向环状链表
  if (componentUpdateQueue === null) {
    // 进入此 if，说明是第一个 effect
    // createFunctionComponentUpdateQueue 调用后会返回一个对象
    // { lastEffect, events, stores, memoCache}
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    // fiber 的 updateQueue 上面保存了该对象（componentUpdateQueue）
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    // 该对象（componentUpdateQueue）上面 lastEffect 存储了副作用对象
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    // 存在多个 effect
    // 拿到之前的副作用
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      // 如果没有，那就和上面的 if 处理一样
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      // 如果之前有副作用，先存储到 firstEffect
      const firstEffect = lastEffect.next;
      // lastEffect 指向新的副作用对象
      lastEffect.next = effect;
      // 新的副作用对象的 next 指向之前的副作用对象
      // 最终形成一个环形链表
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}
```



update  的时候，即使 effect deps 没有变化，也会创建对应的 effect。因为这样才能后保证 effect 数量以及顺序是稳定的：

```js
// update 时 deps 没有变化情况
hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
// update 时 deps 有变化的情况
hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  );
```



### 调度阶段（useEffect 独有的）

调度阶段是 useEffect 独有的，因为 useEffect 的回调函数会在 commit 阶段完成后异步执行，因此需要调度阶段。

在 commit 阶段的三个子阶段开始之前，会执行如下的代码：

```js
if (
  (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
  (finishedWork.flags & PassiveMask) !== NoFlags
) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true;
    pendingPassiveEffectsRemainingLanes = remainingLanes;
    // ...
    // scheduleCallback 来自于 Scheduler，用于以某一优先级调度回调函数
    scheduleCallback(NormalSchedulerPriority, () => {
      // 执行 effect 回调函数的具体方法
      flushPassiveEffects();
      return null;
    });
  }
}
```

flushPassiveEffects 会去执行对应的 effects：

```js
function flushPassiveEffects(){
  if (rootWithPendingPassiveEffects !== null) {
    // 执行 effects
  }
  return false;
}
```

另外，由于调度阶段的存在，为了保证下一次的 commit 阶段执行前，上一次 commit 所调度的 useEffect 都已经执行过了，因此会在 commit 阶段的入口处，也会执行 flushPassiveEffects，而且是一个循环执行：

```js
function commitRootImpl(root, renderPriorityLevel){
  do {
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);
}
```

之所以使用 do...while 循环，就是为了保证上一轮调度的 effect 都执行过了。



### 执行阶段

这三个 effect 相关的 hook 执行阶段，有两个相关的方法

- commitHookEffectListUnmount ：用于遍历 effect 链表依次执行 effect.destory 方法

```js
function commitHookEffectListUnmount(
  flags: HookFlags,
  finishedWork: Fiber,
  nearestMountedAncestor: Fiber | null,
) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      if ((effect.tag & flags) === flags) {
        // Unmount
        // 从 effect 对象上面拿到 destory 函数
        const destroy = effect.destroy;
        effect.destroy = undefined;
        // ...
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

- commitHookEffectListMount：遍历 effect 链表依次执行 create 方法，在声明阶段中，update 时会根据 deps 是否变化打上不同的 tag，之后在执行阶段就会根据是否有 tag 来决定是否要执行该 effect

```js
// 类型为 useInsertionEffect 并且存在 HasEffect tag 的 effect 会执行回调
commitHookEffectListMount(Insertion | HasEffect, fiber);
// 类型为 useEffect 并且存在 HasEffect tag 的 effect 会执行回调
commitHookEffectListMount(Passive | HasEffect, fiber);
// 类型为 useLayoutEffect 并且存在 HasEffect tag 的 effect 会执行回调
commitHookEffectListMount(Layout | HasEffect, fiber);
```



由于 commitHookEffectListUnmount 方法的执行时机会先于 commitHookEffectListMount 方法执行，因此每次都是先执行 effect.destory 后才会执行 effect.create。



## 真题解答

> 题目：说一说 useEffect 和 useLayoutEffect 的区别？
>
> 参考答案：
>
> 