# React 中的事件

> 面试题：简述一下 React 中的事件是如何处理的？

在 React 中，有一套自己的事件系统，如果说 React 中的 FiberTree 这个数据结构是用来描述 UI 的，那么 React 里面的事件系统就是用来描述 FiberTree 和 UI 之间的的交互的。

对于 ReactDOM 宿主环境，这套事件系统由两个部分：

- 合成事件对象

SyntheticEvent （合成事件对象）这个是对浏览器原生事件对象的一层封装，兼容了主流的浏览器，同时拥有和浏览器原生事件相同的 API，例如 stopPropagation 和 preventDefault。SyntheticEvent 存在的目的就是为了消除不同浏览器在事件对象上面的一个差异。



- 模拟实现事件传播机制

利用事件委托的原理，React 会基于 FiberTree 来实现了事件的捕获、目标以及冒泡的过程（就类似于原生 DOM 的事件传递过程），并且在自己实现的这一套事件传播机制中还加入了许多新的特性，比如：

- 不同的事件对应了不同的优先级
- 定制事件名
  - 比如在 React 中统一采用 onXXX 的驼峰写法来绑定事件
- 定制事件的行为
  - 例如 onChange 的默认行为与原生的 oninput 是相同



React 事件系统需要考虑到很多边界情况，因此代码量是非常大的，我们这里通过书写一个简易版的事件系统来学习 React 事件系统的原理。

假设，现在我们有如下这一段 JSX 代码：

```jsx
const jsx = (
  <div onClick={(e) => console.log("click div")}>
    <h3>你好</h3>
    <button
      onClick={(e) => {
        // e.stopPropagation();
        console.log("click button");
      }}
    >
      点击
    </button>
  </div>
);
```

在上面的代码中，我们为外层的 div 以及内部的 button 都绑定了点击事件，默认情况下，点击 button 会打印出 click button、click div，如果打开 e.stopPropagation( )，那么就会阻止事件冒泡，只打印出 click button。

可以看出，React 内部的事件系统实现了“模拟实现事件传播机制”。

接下来我们自己来写一套简易版事件系统，绑定事件的方式改为 bindXXXX



## 实现 SyntheticEvent

SyntheticEvent 指的是合成事件对象，在 React 中的 SyntheticEvent 会包含很多的属性和方法，这里我们出于演示的目的，我们只实现一个阻止冒泡

```js
/**
 * 合成事件对象类
 */
class SyntheticEvent {
  constructor(e) {
    // 保存原生的事件对象
    this.nativeEvent = e;
  }
  // 合成事件对象需要提供一个和原生 DOM 同名的阻止冒泡的方法
  stopPropagation() {
    // 当开发者调用 stopPropagation 方法，将该合成事件对象的 _stopPropagation 设置为 true
    this._stopPropagation = true;
    if (this.nativeEvent.stopPropagation) {
      // 调用原生事件对象的 stopPropagation 方法来阻止冒泡
      this.nativeEvent.stopPropagation();
    }
  }
}
```

在上面的代码中，我们创建了一个 SyntheticEvent 类，这个类可以用来创建合成事件对象。内部保存了原生的事件对象，还提供了一个和原生 DOM 的事件对象同名的阻止冒泡的方法。



## 实现事件的传播机制

对于可以冒泡的事件，整个事件的传播机制实现步骤如下：

- 在根元素绑定“事件类型对应的事件回调”，所有子孙元素触发该类事件时最终会委托给根元素的事件回调函数来进行处理
- 寻找触发事件的 DOM 元素，找到对应的 FiberNode
- 收集从当前的 FiberNode 到 HostRootFiber 之间所有注册了该事件的回调函数
- 反向遍历并执行一遍收集的所有的回调函数（模拟捕获阶段的实现）
- 正向遍历并执行一遍收集的所有的回调函数（模拟冒泡阶段的实现）

首先我们通过 addEvent 来给根元素绑定事件，目前是为了使用事件委托

```js
/**
 * 该方法用于给根元素绑定事件
 * @param {*} container 根元素
 * @param {*} type 事件类型
 */
export const addEvent = (container, type) => {
  container.addEventListener(type, (e) => {
    // 进行事件的派发
    dispatchEvent(e, type.toUpperCase());
  });
};
```

接下来在入口中通过调用 addEvent 来绑定事件，如下：

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsx);
// 进行根元素的事件绑定，换句话说，就是使用我们自己的事件系统
addEvent(document.getElementById("root"), "click");
```

在 addEvent 里面，调用 dispatchEvent 做事件的派发：

```js
/**
 *
 * @param {*} e 原生的事件对象
 * @param {*} type 事件类型，已经全部转为了大写，比如这里传递过来的是 CLICK
 */
const dispatchEvent = (e, type) => {
  // 实例化一个合成事件对象
  const se = new SyntheticEvent(e);
  // 拿到触发事件的元素
  const ele = e.target;
  let fiber;
  // 通过 DOM 元素找到对应的 FiberNode
  for (let prop in ele) {
    if (prop.toLocaleLowerCase().includes("fiber")) {
      fiber = ele[prop];
    }
  }
  // 找到对应的 fiberNode 之后，接下来我们需要收集路径中该事件类型所对应的所有的回调函数
  const paths = collectPaths(type, fiber);
  // 模拟捕获的实现
  triggerEventFlow(paths, type + "CAPTURE", se);
  // 模拟冒泡的实现
  // 首先需要判断是否阻止了冒泡，如果没有，那么我们只需要将 paths 进行反向再遍历执行一次即可
  if(!se._stopPropagation){
    triggerEventFlow(paths.reverse(), type, se);
  }
};
```

dispatchEvent 方法对应有如下的步骤：

- 实例化一个合成事件对象
- 找到对应的 FiberNode
- 收集从当前的 FiberNode 一直往上所有的该事件类型的回调函数
- 模拟捕获的实现
- 模拟冒泡的实现



## 收集路径中对应的事件处理函数

```js
/**
 * 该方法用于收集路径中所有 type 类型的事件回调函数
 * @param {*} type 事件类型
 * @param {*} begin FiberNode
 * @returns
 * [{
 *  CLICK : function(){...}
 * },{
 *  CLICK : function(){...}
 * }]
 */
const collectPaths = (type, begin) => {
  const paths = []; // 存放收集到所有的事件回调函数
  // 如果不是 HostRootFiber，就一直往上遍历
  while (begin.tag !== 3) {
    const { memoizedProps, tag } = begin;
    // 如果 tag 对应的值为 5，说明是 DOM 元素对应的 FiberNode
    if (tag === 5) {
      const eventName = "bind" + type; // bindCLICK
      // 接下来我们来看当前的节点是否有绑定事件
      if (memoizedProps && Object.keys(memoizedProps).includes(eventName)) {
        // 如果进入该 if，说明当前这个节点绑定了对应类型的事件
        // 需要进行收集，收集到 paths 数组里面
        const pathNode = {};
        pathNode[type] = memoizedProps[eventName];
        paths.push(pathNode);
      }
      begin = begin.return;
    }
  }
  return paths;
};
```

实现的思路就是从当前的 FiberNode 一直向上遍历，直到 HostRootFiber，收集遍历过程中 FiberNode.memoizedProps 属性所保存的对应的事件处理函数。

最终返回的 paths 数组保存的结构大致如下：

```js
[{
   CLICK : function(){...}
  },{
   CLICK : function(){...}
}]
```



## 捕获和冒泡的实现

由于我们是从目标元素的 FiberNode 向上遍历的，因此收集到的顺序：

 [  目标元素的事件回调，某个祖先元素的事件回调，某个更上层的祖先元素的事件回调 ]

因此要模拟捕获阶段的实现，我们就需要从后往前进行遍历并执行：

```js
/**
 *
 * @param {*} paths 收集到的事件回调函数的数组
 * @param {*} type 事件类型
 * @param {*} se 合成事件对象
 */
const triggerEventFlow = (paths, type, se) => {
  // 挨着挨着遍历这个数组，执行回调函数即可
  // 模拟捕获阶段的实现，所以需要从后往前遍历数组并执行回调
  for (let i = paths.length; i--; ) {
    const pathNode = paths[i];
    const callback = pathNode[type];
    if (callback) {
      // 存在回调函数，执行该回调
      callback.call(null, se);
    }
    if (se._stopPropagation) {
      // 说明在当前的事件回调函数中，开发者阻止继续往上冒泡
      break;
    }
  }
};
```

在执行事件的回调的时候，每一次执行需要检验 _stopPropagation 属性是否为 true，如果为true，说明当前的事件回调函数中阻止了事件冒泡，因此我们应当停止后续的遍历。

如果是模拟冒泡阶段，只需要将 paths 进行反向再遍历一次并执行即可：

```js
// 模拟冒泡的实现
// 首先需要判断是否阻止了冒泡，如果没有，那么我们只需要将 paths 进行反向再遍历执行一次即可
if(!se._stopPropagation){
  triggerEventFlow(paths.reverse(), type, se);
}
```



至此，我们就实现了一个简易版的 React 事件系统。



## 真题解答

> 题目：简述一下 React 中的事件是如何处理的？
>
> 参考答案：
>
> 在 React 中，有一套自己的事件系统，如果说 React 用 FiberTree 这一数据结构是用来描述 UI 的话，那么事件系统则是基于 FiberTree 来描述和 UI 之间的交互。
>
> 对于 ReactDOM 宿主环境，这套事件系统由两个部分组成：
>
> （1）SyntheticEvent（合成事件对象）
>
> SyntheticEvent 是对浏览器原生事件对象的一层封装，兼容主流浏览器，同时拥有与浏览器原生事件相同的 API，例如 stopPropagation 和 preventDefault。SyntheticEvent 存在的目的是为了消除不同浏览器在 “事件对象” 间的差异。
>
> （2）模拟实现事件传播机制
>
> 利用事件委托的原理，React 基于 FiberTree 实现了事件的捕获、目标、冒泡的流程（类似于原生事件在 DOM 元素中传递的流程），并且在这套事件传播机制中加入了许多新的特性，例如：
>
> - 不同事件对应了不同的优先级
> - 定制事件名
>  - 例如事件统一采用如 “onXXX” 的驼峰写法
> - 定制事件行为
>  - 例如 onChange 的默认行为与原生 oninput 相同