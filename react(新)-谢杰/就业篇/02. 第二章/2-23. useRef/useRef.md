# useRef

> 面试题：useRef 是干什么的？ref 的工作流程是怎样的？什么叫做 ref 的失控？



## useRef 各个阶段

ref 是英语 reference（引用）的缩写，在 React 中，开发者可以通过 ref 保存一个对 DOM 的引用。事实上，任何需要被引用的数据，都可以保存在 ref 上。在 React 中，出现过 3 种 ref 引用模式：

- String 类型（已不推荐使用）
- 函数类型
- { current : T }



目前关于创建 ref，类组件推荐使用 createRef 方法，函数组件推荐使用 useRef

用法如下：

```js
const refContainer = useRef(initialValue);
```



**mount 阶段**

mount 阶段调用的是 mountRef，对应的代码如下：

```js
function mountRef(initialValue) {
  // 创建 hook 对象
  const hook = mountWorkInProgressHook();
  const ref = { current: initialValue };
  // hook 对象的 memoizedState 值为 { current: initialValue }
  hook.memoizedState = ref;
  return ref;
}
```

在 mount 阶段，首先调用 mountWorkInProgressHook 方法得到一个 hook 对象，该 hook 对象的 memoizedState 上面会缓存一个键为 current 的对象 { current: initialValue }，之后向外部返回该对象。



**update 阶段**

update 阶段调用的是 updateRef，相关代码如下：

```js
function updateRef(initialValue) {
  // 拿到当前的 hook 对象
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
```



除了 useRef 以外，createRef 也会创建相同数据结构的 ref：

```js
function createRef(){
  const refObject = {
    current: null
  }
  return refObject;
}
```



## ref 的工作流程

ref 创建之后，会挂在 HostComponent 或者 ClassComponent 上面，形成 ref props，例如：

```js
// HostComponent
<div ref={domRef}></div>
// ClassComponent
<App ref={comRef}/>
```

整个 ref 的工作流程分为两个阶段：

- render 阶段：标记 ref flag
- commit 阶段：根据所标记的 ref flag，执行 ref 相关的操作

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-03-03-091957.png" alt="image-20230303171956632" style="zoom:50%;" />

上图中，markRef 表示的就是标记 ref，相关代码如下：

```js
function markRef(current, workInProgress){
  const ref = workInProgress.ref;
  if((current === null && ref !== null) || (current !== null && current.ref !== ref)){
    // 标记 Reg tag
    workInProgress.flags != Ref;
  }
}
```

有两种情况会标记 ref：

- mount 阶段并且 ref props 不为空
- update 阶段并且 ref props 发生了变化



标记完 ref 之后，来到了 commit 阶段，会在 mutation 子阶段执行 ref 的删除操作，删除旧的 ref：

```js
function commitMutationOnEffectOnFiber(finishedWork, root){
  // ...
  if(flags & Ref){
    const current = finishedWork.alternate;
    if(current !== null){
      // 移除旧的 ref
      commitDetachRef(current);
    }
  }
  // ...
}
```

上面的代码中，commitDetachRef 方法要做的事情就是移除旧的 ref，相关代码如下：

```js
function commitDetachRef(current){
  const currentRef = current.ref;
  
  if(currentRef !== null){
    if(typeof currentRef === 'function'){
      // 函数类型 ref，执行并传入 null 作为参数
      currentRef(null);
    } else {
      // { current: T } 类型的 ref，重置 current 指向
      currentRef.current = null;
    }
  }
}
```

删除完成后，会在 Layout 子阶段重新赋值新的 ref，相关代码如下：

```js
function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork, committedLanes){
  // 省略代码
  if(finishedWork.flags & Ref){
    commitAttachRef(finishedWork);
  }
}
```

对应的方法 commitAttachRef 就是用来重新赋值新 ref 的，相关代码如下：

```js
function commitAttachRef(finishedWork){
  const ref = finishedWork.ref;
  if(ref !== null){
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch(finishedWork.tag){
      case HostComponent:
        // HostComponent 需要获取对应的 DOM 元素
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        // ClassComponent 使用 FiberNode.stateNode 保存实例
        instanceToUse = instance;
    }
    
    if(typeof ref === 'function'){
      // 函数类型，执行函数并将实例传入
      let retVal;
      retVal = ref(instanceToUse);
    } else {
      // { current: T } 类型则更新 current 指向
      ref.current = instanceToUse;
    }
  }
}
```



## ref 的失控

当我们使用 ref 保存对 DOM 的引用时，那么就有可能会造成 ref 的失控。

所谓 ref 的失控，开发者通过 ref 操作了 DOM，但是这一行为本来应该是由 React 接管的，两者产生了冲突，这种冲突我们就称之为 ref 的失控。

考虑下面这一段代码：

```js
function App(){
  const inputRef = useRef(null);
  
  useEffect(()=>{
    // 操作1
    inputRef.current.focus();
    
    // 操作2
    inputRef.current.getBoundingClientRect();
    
    // 操作3
    inputRef.current.style.width = '500px';
  }, []);
  
  return <input ref={inputRef}/>;
}
```

在上面的三个操作中，第三个操作是不推荐的。

React 作为一个视图层框架，接管了大部分和视图相关的操作，这样开发者可以专注于业务上面的开发逻辑。

上面的三个操作中，前面两个并没有被 React 接管，所以当产生这样的操作时，可以百分百确定是来自于开发者的操作。但是在操作三中，并不能确定该操作究竟是 React 的行为还是开发者的行为，甚至两者会产生冲突。

例如我们再聚一个例子：

```js
function App(){
  const [isShow, setShow] = useState(true);
  const ref = useRef(null);
  
  return (
    <div>
    	<button onClick={() => setShow(!isShow)}>React操作DOM</button>
      <button onClick={() => ref.current.remove()}>开发者DOM</button>
      {isShow && <p ref={ref}>Hello</p>}
    </div>
  );
}
```

上面的代码就是一个典型的 ref 失控的案例。第一个按钮通过 isShow 来控制 p 是否显示，这是 React 的行为，第二个按钮通过 ref 直接拿到了 p 的 DOM 对象，然后进行显隐操作，两者会产生冲突，上面的两个按钮，先点击任意一个，然后再点击另外一个就会报错。



## ref 失控的防治

ref 失控的本质：由于开发者通过 ref 操作了 DOM，而这一行为本来应该是由 React 来进行接管的，两者之间发生了冲突而导致的。

因此我们可以从下面两个方面来进行防治：

- 防：控制 ref 失控的影响范围，使 ref 的失控更加容易被定位
- 治：从 ref 引用的数据结构入手，尽力避免可能引起的失控操作



**防**

在上一章我们介绍过高阶组件，在高阶组件内部是无法将 ref 直接指向 DOM 的，我们需要进行 ref 的转发。可以通过 forwardRef API 进行一个 ref 的转发，将 ref 转发的这个操作，实际上就将 ref 失控的范围控制在了单个组件内，不会出现跨越组件的 ref 失控。

因为是手动的进行 ref 的转发，所以发生 ref 失控的时候，能够更加容易的进行错误的定位



**治**

之前我们介绍过 useImperativeHandle 这个 Hook，它可以在使用 ref 时向父组件传递自定义的引用值：

```js
const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus(){
      realInputRef.current.focus();
    }
  }));
  return <input {...props} ref={realInputRef} />
});
```

在上面的代码中，我们通过 useImperativeHandle 来定制 ref 所引用的内容，那么在外部开发者通过 ref 只能拿到：

```js
{
  focus(){
      realInputRef.current.focus();
  }
}
```





## 真题解答

> 题目：useRef 是干什么的？ref 的工作流程是怎样的？什么叫做 ref 的失控？
>
> 参考答案：
>
> useRef 的主要作用就是用来创建 ref 保存对 DOM 元素的引用。在 React 发展过程中，出现过三种 ref 相关的引用模式：
>
> - String 类型（已不推荐使用）
> - 函数类型
> - { current : T }
>
> 目前最为推荐的是在类组件中使用 createRef，函数组件中使用 useRef 来创建 Ref。
>
> 当开发者调用 useRef 来创建 ref 时，在 mount 阶段，会创建一个 hook 对象，该 hook 对象的 memoizedState 存储的是 { current: initialValue } 对象，之后向外部返回了这个对象。在 update 阶段就是从 hook 对象的 memoizedState 拿到 { current: initialValue } 对象。
>
> ref 内部的工作流程整体上可以分为两个阶段：
>
> - render 阶段：标记 Ref flag，对应的内部函数为 markRef
> - commit 阶段：根据 Ref flag，执行 ref 相关的操作，对应的相关函数有 commitDetachRef、commitAttachRef
>
> 所谓 ref 的失控，本质是由于开发者通过 ref 操作了 DOM，而这一行为本身是应该由 React 来进行接管的，所以两者之间发生了冲突导致的。
>
> ref 失控的防治主要体现在两个方面：
>
> - 防：控制 ref 失控影像的范围，使 ref 失控造成的影响更容易被定位，例如使用 forwardRef
> - 治：从 ref 引用的数据结构入手，尽力避免可能引起失控的操作，例如使用 useImperativeHandle