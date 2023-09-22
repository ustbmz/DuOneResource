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

export default App;
