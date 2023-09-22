# completeWork 工作流程

> 面试题：completeWork 中主要做一些什么工作？整体的流程是怎样的？

前面所介绍的 beginWork，是属于“递”的阶段，该阶段的工作处理完成后，就会进入到 completeWork，这个是属于“归”的阶段。

与 beginWork 类似，completeWork 也会根据 wip.tag 区分对待，流程上面主要包括两个步骤：

- 创建元素或者标记元素的更新
- flags 冒泡

整体流程图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-03-01-060445.png" alt="image-20230301140444822" style="zoom:50%;" />



## mount 阶段

在 mount 流程中，首先会通过 createInstance 创建 FiberNode 所对应的 DOM 元素：

```js
function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle){
  //...
  if(typeof props.children === 'string' || typeof props.chidlren === 'number'){
    // children 为 string 或者 number 时做一些特殊处理
  }
  
  // 创建 DOM 元素
  const domElement = createElement(type, props, rootContainerInstance, parentNamespace);
  
  //...
  return domElement;
}
```

接下来会执行 appendAllChildren，该方法的作用是将下一层 DOM 元素插入到通过 createInstance 方法所创建的 DOM 元素中，具体的逻辑如下：

- 从当前的 FiberNode 向下遍历，将遍历到的第一层 DOM 元素类型（HostComponent、HostText）通过 appendChild 方法插入到 parent 末尾
- 对兄弟 FiberNode 执行步骤 1
- 如果没有兄弟 FiberNode，则对父 FiberNode 的兄弟执行步骤 1
- 当遍历流程回到最初执行步骤 1 所在层或者 parent 所在层时终止

相关的代码如下：

```js
appendAllChildren = function(parent, workInProgress, ...){
  let node = workInProgress.child;
  
  while(node !== null){
    // 步骤 1，向下遍历，对第一层 DOM 元素执行 appendChild
    if(node.tag === HostComponent || node.tag === HostText){
      // 对 HostComponent、HostText 执行 appendChild
      appendInitialChild(parent, node.stateNode);
    } else if(node.child !== null) {
      // 继续向下遍历，直到找到第一层 DOM 元素类型
      node.child.return = node;
      node = node.child;
      continue;
    }
    // 终止情况 1: 遍历到 parent 对应的 FiberNode
    if(node === workInProgress) {
      return;
    }
    // 如果没有兄弟 FiberNode，则向父 FiberNode 遍历
    while(node.sibling === null){
      // 终止情况 2: 回到最初执行步骤 1 所在层
      if(node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return
    }
    // 对兄弟 FiberNode 执行步骤 1
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
```

appendAllChildren 方法实际上就是在处理下一级的 DOM 元素，而且在 appendAllChildren 里面的遍历过程会更复杂一些，会多一些判断，因为 FiberNode 最终形成的 FiberTree 的层次和最终 DOMTree 的层次可能是有区别：

```jsx
function World(){
  return <span>World</span>
}

<div>
	Hello
  <World/>
</div>
```

在上面的代码中，如果从 FiberNode 的角度来看，Hello 和 World 是同级的，但是如果从 DOM 元素的角度来看，Hello 就和 span 是同级别的。因此从 FiberNode 中查找同级的 DOM 元素的时候，经常会涉及到跨 FiberNode 层级进行查找。



接下来 completeWork 会执行 finalizeInitialChildren 方法完成属性的初始化，主要包含以下几类属性：

- styles，对应的方法为 setValueForStyles 方法
- innerHTML，对应 setInnerHTML 方法
- 文本类型 children，对应 setTextContent 方法
- 不会再在 DOM 中冒泡的事件，包括 cancel、close、invalid、load、scroll、toggle，对应的是 listenToNonDelegatedEvent 方法
- 其他属性，对应 setValueForProperty 方法



该方法执行完毕后，最后进行 flags 的冒泡。



总结一下，completeWork 在 mount 阶段执行的工作流程如下：

- 根据 wip.tag 进入不同的处理分支
- 根据 current !== null 区分是 mount 还是 update
- 对应 HostComponent，首先执行 createInstance 方法来创建对应的 DOM 元素
- 执行 appendChildren 将下一级 DOM 元素挂载在上一步所创建的 DOM 元素下
- 执行 finalizeInitialChildren 完成属性初始化
- 执行 bubbleProperties 完成 flags 冒泡



## update 阶段

上面的 mount 流程，完成的是属性的初始化，那么这个 update 流程，完成的就是属性更新的标记

updateHostComponent 的主要逻辑是在 diffProperties 方法里面，这个方法会包含两次遍历：

- 第一次遍历，主要是标记更新前有，更新没有的属性，实际上也就是标记删除了的属性
- 第二次遍历，主要是标记更新前后有变化的属性，实际上也就是标记更新了的属性

相关代码如下：

```js
function diffProperties(domElement, tag, lastRawProps, nextRawProps, rootContainer){
  // 保存变化属性的 key、value
  let updatePayload = null;
  // 更新前的属性
  let lastProps;
  // 更新后的属性
  let nextProps;
  
  //...
  // 标记删除“更新前有，更新后没有”的属性
  for(propKey in lastProps){
    if(nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null){
      continue;
    }
    
    if(propKey === STYLE){
      // 处理 style
    } else {
      //其他属性
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  
  // 标记更新“update流程前后发生改变”的属性
  for(propKey in lastProps){
    let nextProp = nextProps[propKey];
    let lastProp = lastProps != null ? lastProps[propKey] : undefined;
    
    if(!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null){
      continue;
    }
    
    if(propKey === STYLE) {
      // 处理 stlye
    } else if(propKey === DANGEROUSLY_SET_INNER_HTML){
      // 处理 innerHTML
    } else if(propKey === CHILDREN){
      // 处理单一文本类型的 children
    } else if(registrationNameDependencies.hasOwnProperty(propKey)) {
      if(nextProp != null) {
        // 处理 onScroll 事件
      } else {
        // 处理其他属性
      }
    }
  }
  //...
  return updatePayload;
}
```

所有更新了的属性的 key 和 value 会保存在当前 FiberNode.updateQueue 里面，数据是以 key、value 作为数组相邻的两项的形式进行保存的

```jsx
export default ()=>{
  const [num, updateNum] = useState(0);
  return (
    <div
    	onClick = {()=>updateNum(num + 1)}
      style={{color : `#${num}${num}${num}`}}
      title={num + ''}
    ></div>
  );
}
```

点击 div 元素触发更新，那么这个时候 style、title 属性会发生变化，变化的数据会以下面的形式保存在 FiberNode.updateQueue 里面：

```js
["title", "1", "style", {"color": "#111"}]
```

并且，当前的 FiberNode 会标记 Update：

```js
workInProgress.flags |= Update;
```



## flags冒泡

我们知道，当整个 Reconciler 完成工作后，会得到一颗完整的 wipFiberTree，这颗 wipFiberTree 是由一颗一颗 FiberNode 组成的，这些 FiberNode 中有一些标记了 flags，有一些没有标记，现在就存在一个问题，我们如何高效的找到散落在这颗 wipFiberTree 中有 flag 标记的 FiberNode，那么此时就可以通过 flags 冒泡。

我们知道，completeWork 是属于归的阶段，整体流程是自下往上，就非常适合用来收集副作用，收集的相关的代码如下：

```js
let subtreeFlags = NoFlags;

// 收集子 FiberNode 的子孙 FiberNode 中标记的 flags
subtreeFlags |= child.subtreeFlags;
// 收集子 FiberNode 中标记的 flags
subtreeFlags ｜= child.flags;
// 将收集到的所有 flags 附加到当前 FiberNode 的 subtreeFlags 上面
completeWork.subtreeFlags |= subtreeFlags;
```

这样的收集方式，有一个好处，在渲染阶段，通过任意一级的 FiberNode.subtreeFlags 都可以快速确定该 FiberNode 以及子树是否存在副作用从而判断是否需要执行和副作用相关的操作。

早期的时候，React 中实际上并没有使用 subtreeFlags 来通过 flags 冒泡收集副作用，而是使用的 effect list（链表）来收集的副作用，使用 subtreeFlags 有一个好处，就是能确定某一个 FiberNode 它的子树的副作用。



## 真题解答

> 题目：completeWork 中主要做一些什么工作？整体的流程是怎样的？
>
> 参考答案：
>
> completeWork 会根据 wip.tag 区分对待，流程大体上包括如下的两个步骤：
>
> - 创建元素（mount）或者标记元素更新（update）
> - flags 冒泡
>
> completeWork 在 mount 时的流程如下：
>
> - 根据 wip.tag 进入不同的处理分支
> - 根据 current !== null 区分是 mount 还是 update
> - 对应 HostComponent，首先执行 createInstance 方法来创建对应的 DOM 元素
> - 执行 appendChildren 将下一级 DOM 元素挂载在上一步所创建的 DOM 元素下
> - 执行 finalizeInitialChildren 完成属性初始化
> - 执行 bubbleProperties 完成 flags 冒泡
>
> completeWork 在 update 时的主要是标记属性的更新。
>
> updateHostComponent 的主要逻辑是在 diffProperties 方法中，该方法包括两次遍历：
>
> - 第一次遍历，标记删除“更新前有，更新后没有”的属性
> - 第二次遍历，标记更新“update流程前后发生改变”的属性
>
> 无论是 mount 还是 update，最终都会进行 flags 的冒泡。
>
> flags 冒泡的目的是为了找到散落在 WorkInProgressFiberTree 各处的被标记了的 FiberNode，对“被标记的 FiberNode 所对应的 DOM 元素”执行 flags 对应的 DOM 操作。
>
> FiberNode.subtreeFlags 记录了该 FiberNode 的所有子孙 FiberNode 上被标记的 flags。而每个 FiberNode 经由如下操作，便可以将子孙 FiberNode 中标记的 flags 向上冒泡一层。
>
> Fiber 架构的早期版本并没有使用 subtreeFlags，而是使用一种被称之为 Effect list 的链表结构来保存“被标记副作用的 FiberNode”。
>
> 但在 React v18 版本中使用了 subtreeFlags 替换了 Effect list，原因是因为 v18 中的 Suspense 的行为恰恰需要遍历子树。