import { useReducer, useRef } from "react";

// 定义一个初始化的状态
const initialState = { count: 1 };

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

// 惰性初始化函数
function init(initialState){
  // 有些时候我们需要基于之前的初始化状态做一些操作，返回新的处理后的初始化值
  // 重新返回新的初始化状态
  return {
    count : initialState.count * 10
  }
}

function App() {
  // const [num, setNum] = useState(0);
  // 后期要修改值的时候，都是通过 dispatch 来进行修改
  const [state, dispatch] = useReducer(counter, initialState, init);
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
