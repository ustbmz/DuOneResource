# useState和useReducer

> 面试题：useState 和 useReducer 有什么样的区别？



## 基本用法

useState 我们已经非常熟悉了，如下：

```jsx
function App(){
  const [num, setNum] = useState(0);
  
  return <div onClick={()=>setNum(num + 1)}>{num}</div>;
}
```

接下来我们来看一下 useReducer。如果你会 redux，那么 useReducer 对你来讲是非常熟悉的。

```js
const [state, dispatch] = useReducer(
  reducer,	
  initialArg,	
  init	
);
```

接下来我们来看一个计数器的例子：

```js
import { useReducer, useRef } from "react";

// 定义一个初始化的状态
const initialState = { count: 0 };

/**
 * reducer
 * @param {*} state 状态
 * @param {*} action 数据变化的描述对象
 */
function counter(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };
    case "DECREMENT":
      return { count: state.count - action.payload };
    default:
      return state;
  }
}

function App() {
  // const [num, setNum] = useState(0);
  // 后期要修改值的时候，都是通过 dispatch 来进行修改
  const [state, dispatch] = useReducer(counter, initialState);
  const selRef = useRef();

  const increment = () => {
    // 做自增操作
    // 1. 你要增加多少？
    const num = selRef.current.value * 1;
    // setNum(num);
    dispatch({
      type: "INCREMENT",
      payload: num,
    });
  };

  const decrement = () => {
    const num = selRef.current.value * 1;
    dispatch({ type: "INCREMENT", payload: num });
  };

  const incrementIfOdd = () => {
    const num = selRef.current.value * 1;
    if (state.count % 2 !== 0) {
      dispatch({ type: "INCREMENT", payload: num });
    }
  };

  const incrementAsync = () => {
    const num = selRef.current.value * 1;
    setTimeout(() => {
      dispatch({ type: "INCREMENT", payload: num });
    }, 1000);
  };

  return (
    <div>
      <p>click {state.count} times</p>
      <select ref={selRef}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementIfOdd}>increment if odd</button>
      <button onClick={incrementAsync}>increment async</button>
    </div>
  );
}

export default App;
```

useReducer 还接收第三个参数，第三个参数，是一个惰性初始化函数，简单理解就是可以做额外的初始化工作

```js
// 惰性初始化函数
function init(initialState){
  // 有些时候我们需要基于之前的初始化状态做一些操作，返回新的处理后的初始化值
  // 重新返回新的初始化状态
  return {
    count : initialState.count * 10
  }
}

// 接下来在使用 useReducer 的时候，这个函数就可以作为第三个参数传入
const [state, dispatch] = useReducer(counter, initialState, init);
```



## mount 阶段

**useState 的 mount 阶段**

```js
function mountState(initialState) {
  // 拿到 hook 对象
  const hook = mountWorkInProgressHook();
  // 如果传入的值是函数，则执行函数获取到初始值
  if (typeof initialState === "function") {
    initialState = initialState();
  }
  // 将初始化保存到 hook 对象的 memoizedState 和 baseState 上面
  hook.memoizedState = hook.baseState = initialState;
  const queue = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  };
  hook.queue = queue;
  // dispatch 就是用来修改状态的方法
  const dispatch = (queue.dispatch = dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));
  return [hook.memoizedState, dispatch];
}
```

**useReducer 的mount阶段**

```js
function mountReducer(reducer, initialArg, init) {
  // 创建 hook 对象
  const hook = mountWorkInProgressHook();
  let initialState;
  // 如果有 init 初始化函数，就执行该函数
  // 将执行的结果给 initialState
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }
  // 将 initialState 初始值存储 hook 对象的 memoizedState 以及 baseState 上面
  hook.memoizedState = hook.baseState = initialState;
  // 创建 queue 对象
  const queue = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState,
  };
  hook.queue = queue;
  const dispatch = (queue.dispatch = dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));
  // 向外部返回初始值和 dispatch 修改方法
  return [hook.memoizedState, dispatch];
}
```

总结一下，mountState 和 mountReducer 的大体流程是一样的，但是有一个区别，mountState 的 queue 里面的 lastRenderedReducer 对应的是 basicStateReducer，而 mountReducer 的 queue 里面的 lastRenderedReducer 对应的是开发者自己传入的 reducer，这里说明了一个问题，useState 的本质就是 useReducer 的一个简化版，只不过在 useState 内部，会有一个内置的 reducer

basicStateReducer 对应的代码如下：

```js
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```



## update 阶段

**useState 的 update 阶段**

```js
function updateState(initialState) {
  return updateReducer(basicStateReducer, initialState);
}
```



**useReducer 的 update 阶段**

```js
function updateReducer(reducer, initialArg, init){
	// 获取对应的 hook
  const hook = updateWorkInProgressHook();
  // 拿到对应的更新队列
  const queue = hook.queue;
  
  queue.lastRenderedReducer = reducer;
  
  // 省略根据 update 链表计算新的 state 的逻辑
  // 这里有一套完整的关于 update 的计算流程
  
  const dispatch = queue.dispatch;
  
  return [hook.memoizedState, dispatch];
}
```



## 真题解答

>题目：useState 和 useReducer 有什么样的区别？
>
>参考答案：
>
>useState 本质上就是一个简易版的 useReducer。
>
>在 mount 阶段，两者之间的区别在于：
>
>- useState 的 lastRenderedReducer 为 basicStateReducer
>- useReducer 的 lastRenderedReducer 为传入的 reducer 参数
>
>所以，useState 可以视为 reducer 参数为 basicStateReducer 的 useReducer
>
>在 update 阶段，updateState 内部直接调用的就是 updateReducer，传入的 reducer 仍然是 basicStateReducer。