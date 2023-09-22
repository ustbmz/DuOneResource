import React from "react";
import Hello from "./component/Hello"
import World from "./component/World"
import Button from "./component/Button"

// 类组件
class App extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   num: 1
    // }
    this.state = {
      name : "张三",
      age : 20
    }
    // this.timer = setInterval(() => {
    //   this.setState({
    //     num : this.state.num + 1
    //   })
    //   console.log(this.state.num,'num');
    //   if(this.state.num === 10){
    //     clearInterval(this.timer);
    //   }
    // },1000)
  }

  // state = {
  //   num : 1
  // }

  clickHandle = () => {
    // 每一次调用 setState 都需要使用到最新的 state 值
    this.setState((cur) => ({
      num: cur.num + 1
    }),()=>{
      console.log(this.state.num,'num');
    })
    this.setState((cur) => ({
      num: cur.num + 1
    }))
    this.setState((cur) => ({
      num: cur.num + 1
    }))
  }

  // 该方法会通过 props 的形式传递给子组件
  changeStateHandle(number){
    console.log("我是子组件传递过来的数据:",number);
  }

  render() {
    console.log("render");
    return (
      <>
        <div>{this.state.num}</div>
        <button onClick={this.clickHandle}>+1</button>
        <Hello stuInfo={this.state} num={true} changeStateHandle={this.changeStateHandle}/>
        <World content="world"/>
        <Button>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Button>
      </>
    );
  }
}

export default App;
