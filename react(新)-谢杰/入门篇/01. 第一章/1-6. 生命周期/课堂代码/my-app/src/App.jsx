import React from "react";
import Child from "./component/Child"

// 类组件
class App extends React.Component {

  constructor() {
    super();
    // 主要做一些初始化操作，例如该组件的状态
    this.state = {
      value : 1
    }
    console.log("constructor");
  }


  clickHandle=()=>{
    this.setState({
      value : this.state.value + 1
    })
  }

  componentDidUpdate(){
    // 更新后调用
    console.log("componentDidUpdate");
  }

  componentDidMount(){
    console.log("componentDidMount");
    // 接下来就可以在这里发送 ajax 请求，获取绑定计时器之类的操作
  }

  

  render() {
    console.log("render");
    return (
      <div>
        <div>{this.state.value}</div>
        <button onClick={this.clickHandle}>+1</button>
        {
          this.state.value % 2 === 0 ? null : <Child/>
        }
      </div>
    )
  }

}

export default App;
