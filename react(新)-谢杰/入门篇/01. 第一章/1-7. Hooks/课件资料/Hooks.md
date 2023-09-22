# *Hooks*



本章主要包含以下内容：

- *Hooks* 基本介绍
- *useState* 和 *useEffect*
- 自定义 *Hook*



## *Hooks* 基本介绍

> *Hook* 是 *React 16.8* 的新增特性。它可以让你在不编写 *class* 的情况下使用 *state* 以及其他的 *React* 特性。



*Hooks* 的出现，首先能解决如下的一些问题：

- 告别令人疑惑的生命周期
  - 例如下面的例子，相同的代码在不同的生命周期中存在了两份


```react
import React from "react";

// 类组件
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      count : 0
    }
  }

  componentDidMount(){
    document.title = `你点击了${this.state.count}次`;
  }

  componentDidUpdate(){
    document.title = `你点击了${this.state.count}次`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}

export default App;

```

- 告别类组件中烦人的 *this*
  - 在类组件中，会存在 *this* 的指向问题，例如在事件处理函数中，不能直接通过 *this* 获取组件实例，需要修改 *this* 指向
- 告别繁重的类组件，回归前端程序员更加熟悉的函数



另外，*Hooks* 的出现，还有更加重要的一个信号，那就是整个 *React* 思想上面的转变，从“面向对象”的思想开始转为“函数式编程”的思想。这是编程范式上面的转变。

编程范式：

- 命令式编程：告诉计算机怎么做（*How*），我们需要给计算机指明每一个步骤
  - 面向过程
  - 面向对象
- **声明**式编程：告诉计算机我要什么（*What*）
  - 函数式编程
  - *DSL*（领域专用语言，*HTML、CSS、SQL*）

声明式编程并不是新的产物，它是和命令式编程同期出现的。但是，早期更加流行命令式编程。不过随着近几年整个项目工程越来越复杂，以前的命令式编程就有点力不从心，所以现在慢慢开始流行声明式编程。



因此当你学习 *Hooks* 的时候，会发现突然多了一些以前不熟悉的概念，例如：纯函数、副作用、柯里化、高阶函数等概念。

当然，你可能好奇“面向对象”和“函数式编程”有什么区别，这里推荐一篇文章：

*https://www.imaginarycloud.com/blog/functional-programming-vs-oop/*



*Hook* 就是 *JavaScript* 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 *Hook*。不要在循环、条件判断或者子函数中调用。
- 只能在 ***React* 的函数组件**中调用 *Hook*。不要在其他 *JavaScript* 函数中调用。



## *useState* 和 *useEffect*

*React* 内置了一些实用的 *Hook*，并且随着 *React* 版本的更新，*Hook* 的数量还在持续增加当中。

入门阶段，我们掌握两个最常用的 *Hook*，一个是为函数组件添加状态的 *useState*，另一个是处理函数副作用的 *useEffect*。



*useState* 包含以下的知识点：

- 基本使用

```react
import { useState } from 'react';

function App(props) {

  let [count, setCount] = useState(0);

  function clickhandle(){
    setCount(++count);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;

```

- 声明多个 *state* 状态

```react
import { useState } from 'react';

function App(props) {

  let [age, setAge] = useState(18);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: '学习 Hook' }]);

  function clickhandle(){
    setAge(++age);
  }


  return (
    <div>
      <div>年龄：{age}</div>
      <div>水果：{fruit}</div>
      <div>待办事项：{todos[0].text}</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;
```



*useEffect* 包含以下知识点：

- 副作用的概念

  - 纯函数：一个确切的参数在你的函数中运行后，一定能得到一个确切的值，例如下面的例子：

  ```js
  function test(x){
    return x * 2;
  }
  
  x => 2 ===> 4
  x => 3 ===> 6
  ```

  - 如果一个函数中，存在副作用，那么我们就称该函数不是一个纯函数，所谓副作用，就是指函数的结果是不可控，不可预期。
  - 常见的副作用有发送网络请求、添加一些监听的注册和取消注册，手动修改 *DOM*，以前我们是将这些副作用写在生命周期钩子函数里面，现在就可以书写在 *useEffect* 这个 *Hook* 里面

- 基本使用

```react
import { useState, useEffect } from 'react';

function App() {

  let [count, setCount] = useState(0);

  useEffect(()=>{
    // 书写你要执行的副作用，会在组件渲染完成后执行
    document.title = `你点击了${count}次`;
  });


  function clickhandle() {
    setCount(++count);
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;
```

- 执行清理工作

```react
import { useState, useEffect } from 'react';

function App() {

  let [count, setCount] = useState(0);

  useEffect(()=>{
    // 书写你要执行的副作用，会在组件渲染完成后执行
    const stopTimer = setInterval(()=>{
      console.log("Hello");
    },1000)   

    // console.log("副作用函数执行了");
    // 在 useEffect 中，可以返回一个函数，该函数我们称之为清理函数（一般就是做一些清理操作）
    // 该函数会在下一次渲染之后，但是在执行副作用操作之前执行
    return ()=>{
      // console.log("清理函数执行了");
      clearInterval(stopTimer);
    }
  });


  function clickhandle() {
    setCount(++count);
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;
```

- 副作用的依赖

  - 目前，我们的副作用函数，每次重新渲染后，都会重新执行，有些时候我们是需要设置依赖项，传递第二个参数，第二个参数为一个依赖数组

  ```react
  import { useState, useEffect } from 'react';
  
  function App() {
  
    let [count1, setCount1] = useState(0);
    let [count2, setCount2] = useState(0);
    let [count3, setCount3] = useState(0);
  
    useEffect(()=>{
      console.log("执行副作用函数");
    },[count1]);
  
    return (
      <div>
        <div>count1:{count1}</div>
        <div>count2:{count2}</div>
        <div>count3:{count3}</div>
        <button onClick={()=>setCount1(++count1)}>+1</button>
        <button onClick={()=>setCount2(++count2)}>+1</button>
        <button onClick={()=>setCount3(++count3)}>+1</button>
      </div>
    );
  }
  
  export default App;
  ```

  - 如果想要副作用只执行一次，传递第二个参数为一个空数组

  ```js
  useEffect(()=>{
    console.log("执行副作用函数");
  },[]);
  ```

  

## 自定义 *Hook*

除了使用官方内置的 *Hook*，我们还可以自定义 *Hook*，自定义 *Hook* 的本质其实就是函数，但是和普通函数还是有一些区别，主要体现在以下两个点：

- 自定义 *Hook* 能够调用诸如 *useState*、*useRef* 等，普通函数则不能。由此可以通过内置的 *Hooks* 获得 *Fiber* 的访问方式，可以实现在组件级别存储数据的方案等。
- 自定义 *Hooks* 需要以 *use* 开头，普通函数则没有这个限制。使用 *use* 开头并不是一个语法或者一个强制性的方案，更像是一个约定。

*App.jsx*

```react
import { useState } from 'react';
import useMyBook from "./useMyBook"

function App() {

  const {bookName, setBookName} = useMyBook();
  const [value, setValue] = useState("");


  function changeHandle(e){
    setValue(e.target.value);
  }

  function clickHandle(){
    setBookName(value);
  }

  return (
    <div>
      <div>{bookName}</div>
      <input type="text" value={value} onChange={changeHandle}/>
      <button onClick={clickHandle}>确定</button>
    </div>
  )
  
}

export default App;
```

*useMyBook*

```react
import { useState } from "react";

function useMyBook(){
    const [bookName, setBookName] = useState("React 学习");
    return {
        bookName, setBookName
    }
}

export default useMyBook;
```

