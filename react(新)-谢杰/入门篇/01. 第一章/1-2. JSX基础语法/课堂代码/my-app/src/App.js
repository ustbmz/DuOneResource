import React from "react";

function App() {
  // 这里是三个变量
  const name = "xiejie111";
  const test = "three";
  const styles = {
    color: "red",
    fontSize: "24px",
  };
  const arr = [
    <p key={10}>hello</p>,
    <div key={11}>world</div>,
    <span key={12}>haha</span>,
  ];

  // 假设这是从服务器拿到的数据
  const stuInfo = [
    { id: 1, name: "谢杰", age: 18 },
    { id: 2, name: "张三", age: 19 },
    { id: 3, name: "李四", age: 20 },
  ];

  const arr2 = stuInfo.map((item) => {
    return (
      <div key={item.id}>
        姓名：{item.name} 年龄：{item.age}
      </div>
    );
  });
  // console.log(arr2, "arr2");

  const element1 = <h1 className="greeting">Hello, world!</h1>;
  // 上面 element1 所写的 JSX，最终会被编译成调用 React.createElement 来创建 JS 对象
  const element2 = React.createElement(
    "h1",
    { className: "greeting" },
    "Hello, world!"
  );

  const ele1 = (
    <div>
      <h1>欢迎学习 React</h1>
      <p>在 React 中推荐使用 JSX 来描述用户界面。</p>
      <ul>
        <li>JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。</li>
        <li>它是类型安全的，在编译过程中就能发现错误。</li>
        <li>使用 JSX 编写模板更加简单快速。</li>
      </ul>
    </div>
  );

  console.log(ele1);

  // 使用 React.createElement 方法来创建元素
  const h1 = React.createElement("h1", null, "欢迎学习 React");

  console.log(h1,'h1');

  const p = React.createElement(
    "p",
    null,
    "在 React 中推荐使用 JSX 来描述用户界面。"
  );
  const li1 = React.createElement(
    "li",
    null,
    "JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。"
  );
  const li2 = React.createElement(
    "li",
    null,
    "它是类型安全的，在编译过程中就能发现错误。"
  );
  const li3 = React.createElement(
    "li",
    null,
    "使用 JSX 编写模板更加简单快速。"
  );
  const ul = React.createElement("ul", null, li1, li2, li3);
  const ele2 = React.createElement("div", null, h1, p, ul);

  const ele = (
    <>
      <ul>
        <li id="one">1</li>
        <li id="two">2</li>
        <li id={test}>{name === "xiejie" ? "谢杰" : null}</li>
      </ul>
      {/* 这是一个注释 */}
      <ul style={styles} className="aa">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      {arr}
      {arr2}
      {element1}
      {element2}
      {ele1}
      {ele2}
    </>
  );

  return ele;
}

export default App;
