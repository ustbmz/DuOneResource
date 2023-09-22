import React from 'react';
import ChildCom1 from "./components/ChildCom1";
import ChildCom2 from "./components/ChildCom2";

function App() {
  return (
    <div style={{
      padding: "10px",
      border: "1px solid"
    }}>
      App组件
      <ChildCom1 />
      <ChildCom2 />
    </div>
  );
}

export default App;