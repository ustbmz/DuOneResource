import React from "react";

// 根组件

// 函数组件
function App() {
  function clickHandle(e) {
    console.log(e);
    console.log(e.nativeEvent);
  }

  function eventHandler(str,e){
    e.preventDefault();
    console.log(str);
  }

  return (
    <>
      <button onClick={clickHandle}>按钮</button>
      <a href="https://www.baidu.com/" onClick={(e)=>eventHandler("Hello333",e)}>
        this is a test
      </a>
    </>
  );
}

// 类组件
// this 的修正，只针对于类组件
// class App extends React.Component {
//   // constructor() {
//   //   super();
//   //   // 3. 使用 bind 方法来强制绑定 this 的指向
//   //   this.clickHandle = this.clickHandle.bind(this);
//   // }

//   // 1. 将事件处理函数修改为箭头函数
//   // clickHandle=()=>{
//   //   console.log(this);
//   // }

//   clickHandle(str){
//     console.log(str);
//   }

//   render(){
//     return (
//       // 2.将事件绑定修改为箭头函数
//       // <button onClick={(e)=>this.clickHandle("Hello")}>按钮</button>
//       // <button onClick={this.clickHandle}>按钮</button>
//       <button onClick={this.clickHandle.bind(this, "Hello222")}>按钮</button>
//     );
//   }
// }

export default App;
