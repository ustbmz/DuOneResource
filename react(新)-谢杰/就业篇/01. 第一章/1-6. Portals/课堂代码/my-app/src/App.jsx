import { useState } from 'react';
import Modal from "./components/Modal"

function App() {

  const [isShow, setIsShow] = useState(false);

  return (
      <div style={{
        position: 'relative'
      }} onClick={()=>console.log("App 组件被点击了")}>
        <h1>App 组件</h1>
        <button onClick={() => setIsShow(!isShow)}>显示/隐藏</button>
        {isShow ? <Modal /> : null}
      </div>
  );
}

export default App;