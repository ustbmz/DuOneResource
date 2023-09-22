import { useState, useMemo } from 'react';

function App() {

  // 维护两个状态
  const [counter, setCounter] = useState(1);
  const [val, setVal] = useState("");

  /**
   * 在之前的状态的基础上做一个二次计算
   * @returns 返回一个缓存值
   */
  const countNum = useMemo(function getCount() {
    console.log("getCount函数调用了")
    return counter + 100;
  },[counter])


  return (
    <div>
      <h1>总数:{countNum}</h1>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <input value={val} type="text" onChange={e=>setVal(e.target.value)} />
    </div>
  );
}

export default App;