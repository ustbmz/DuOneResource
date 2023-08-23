# WebAPI

和标准库不同，WebAPI 是**浏览器**提供的一套 API，用于操作浏览器窗口和界面

WebAPI 中包含两个部分：

- BOM：Browser Object Model，浏览器模型，提供和浏览器相关的操作
- DOM：Document Object Model，文档模型，提供和页面相关的操作

<img src="http://mdrs.yuanjin.tech/img/20211215154644.png" alt="image-20211215154639275" style="zoom:50%;" />

## BOM

BOM 提供了一系列的对象和函数，提供和浏览器本身相关的操作

### window

全局对象

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/window

| API                                                                                          | 含义                                             | 备注                                                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [`open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)                     | 打开一个新的浏览器窗口                           | 返回新窗口的 window 对象                                                            |
| [`close()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/close)                   | 关闭浏览器窗口                                   | 只能关闭使用 open 打开的浏览器窗口                                                  |
| [==setTimeout()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)       | 设置一个计时器<br />在一段时间后自动执行某个函数 | 参数 1：函数，无参，this 指向 window<br />参数 2：时间，毫秒<br />返回：计时器的 ID |
| [==clearTimeout()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearTimeout)   | 清除指定 ID 的计时器                             | 传入计时器的 ID                                                                     |
| [==setInterval()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)     | 设置一个计时器<br />每隔一段时间自动执行某个函数 | 参数 1：函数，无参，this 指向 window<br />参数 2：时间，毫秒<br />返回：计时器的 ID |
| [==clearInterval()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearInterval) | 清除指定 ID 的计时器                             | 传入计时器的 ID                                                                     |
| [`alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert)                   | 弹出提示框                                       | 不同的操作系统外观有差异                                                            |
| [`confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm)               | 弹出确认框                                       | 不同的操作系统外观有差异                                                            |

### window.location

https://developer.mozilla.org/zh-CN/docs/Web/API/Location

提供地址栏的相关操作

| API                                                                                        | 含义                             | 备注                   |
| ------------------------------------------------------------------------------------------ | -------------------------------- | ---------------------- |
| [==Location.href==](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/href)        | 获取或设置页面当前地址           | 设置地址回导致页面跳转 |
| [`Location.protocol`](https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol)  | 获取或设置地址中的协议部分       |                        |
| [`Location.host`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/host)          | 获取或设置地址中的主机名和端口号 |                        |
| [`Location.hostname`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hostname)  | 获取或设置地址中的主机名         |                        |
| [`Location.port` ](https://developer.mozilla.org/en-US/docs/Web/API/Location/port)         | 获取或设置地址中的端口号         |                        |
| [`Location.pathname` ](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) | 获取或设置地址中的路径部分       |                        |
| [`Location.search`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/search)      | 获取或设置地址中的参数部分       |                        |
| [`Location.hash`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hash)          | 获取或设置地址中的 hash 部分     |                        |
| [`Location.reload()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload)    | 刷新页面                         |                        |

### window.history

https://developer.mozilla.org/zh-CN/docs/Web/API/History

提供当前窗口历史记录的操作

| API                                                                                               | 含义                                             | 备注       |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- |
| [`History.back()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back)                 | 后退                                             |            |
| [`History.forward()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward)           | 前进                                             |            |
| [`History.go()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go)                     | 根据相对当前页面的偏移量，<br />进入指定的记录页 |            |
| [`History.pushState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)       | 在历史记录中添加一条记录                         | 页面不刷新 |
| [`History.replaceState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState) | 替换当前记录                                     | 页面不刷新 |

## DOM

DOM 是一个对象，它对应到 HTML 中的节点

<img src="http://mdrs.yuanjin.tech/img/20211215164209.png" alt="image-20211215164209559" style="zoom:50%;" />

### 获取 dom

| API                                                                 | 含义                    | 备注                                                                                                   |
| ------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| document.getElementById()                                           | 根据元素 id 获取 dom    | 得到单个 dom                                                                                           |
| document.getElementsByTagName()<br />dom.getElementsByTagName()     | 根据元素名称获取 dom    | 得到 dom 的伪数组                                                                                      |
| document.getElementsByClassName()<br />dom.getElementsByClassName() | 根据元素类样式获取 dom  | 得到 dom 的伪数组                                                                                      |
| ==document.querySelector()==<br />==dom.querySelector()==           | 根据 CSS 选择器获取 dom | 得到第一个匹配的 dom                                                                                   |
| ==document.querySelectorAll()==<br />==dom.querySelectorAll()==     | 根据 CSS 选择器获取 dom | 得到所有匹配的 dom<br />伪数组                                                                         |
| ==document.documentElement==                                        | 获取 html 元素          |                                                                                                        |
| document.body                                                       | 获取 body               |                                                                                                        |
| document.head                                                       | 获取 head               |                                                                                                        |
| ==dom.children==                                                    | 获取 dom 的子元素       | 得到 dom 的伪数组                                                                                      |
| dom.childNodes                                                      | 获取 dom 的子节点       | 得到 dom 节点的伪数组<br />关于节点对象点[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) |
| dom.previousElementSibling                                          | 得到 dom 前一个兄弟元素 |                                                                                                        |
| dom.nextElementSibling                                              | 得到 dom 后一个兄弟元素 |                                                                                                        |
| ==dom.parentElement==                                               | 得到 dom 的父元素       |                                                                                                        |

### 创建 dom

| API                          | 含义                | 备注         |
| ---------------------------- | ------------------- | ------------ |
| ==document.createElement()== | 创建一个 dom 并返回 | 传入元素名称 |

### 更改 dom 结构

这里是指更改文档树（DOM 树）

| API                                                                                        | 含义                                              | 备注          |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------- |
| ==dom.remove()==                                                                           | 从文档树中删除 dom                                | 不是删除对象  |
| dom.removeChild()                                                                          | 删除 dom 的某个子节点                             | 传入 dom 对象 |
| [`dom.insertBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore) | 在 dom 的子节点中，添加一个新节点到另一个节点之前 |               |
| ==dom.appendChild()==                                                                      | 添加一个新节点到 dom 的子节点末尾                 | 传入 dom 对象 |

### dom 属性

本节的「属性」，是指 HTML 元素的「属性」

属性有两种：

- 标准属性：HTML 元素本身拥有的属性，例如：
  - a 元素的 href、title
  - input 的 value
  - img 的 src
  - ......
- 自定义属性：HTML 元素标准中未定义的属性

**所有标准属性均可通过 `dom.属性名` 得到，其中：**

- 布尔属性会被自动转换为 boolean

- 路径类的属性会被转换为绝对路径

- 标准属性始终都是存在的，不管你是否有在元素中属性该属性

- class 由于和关键字重名，因此需要使用 className

**所有的自定义属性均可通过下面的方式操作：**

- `dom.setAttribute(name, value)`，设置属性键值对
- `dom.getAttribute(name)`，获取属性值

自定义属性和元素源码书写是对应的，可以尝试获取 a 元素的 href 属性对比标准属性，看看有什么不同。

### dom 内容

| API               | 含义                       | 备注                           |
| ----------------- | -------------------------- | ------------------------------ |
| ==dom.innerText== | 获取或设置元素文本内容     | 设置时会自动进行 HTML 实体编码 |
| ==dom.innerHTML== | 获取或设置元素的 HTML 内容 |                                |

### dom 样式

在 JS 中，有两种样式：

- 内联样式：元素的 style 属性中书写的样式
- 计算样式（最终样式）：元素最终计算出来的样式

**JS 可以获取内联样式和计算样式，但只能设置内联样式**

下面罗列了样式的常见操作：

- `dom.style`：获取元素的内联样式，得到样式对象
  - 对象中的所有样式属性均可以被赋值，赋值后即可应用样式到元素的 style 中
- `getComputedStyle(dom)`：获取元素的计算样式，得到一个样式对象
  - 该样式对象中的属性是只读的，无法被重新赋值

关于**样式对象**，注意：

- 当给样式赋值为空字符串时，相当于删除内联样式
- 当给样式的赋值不合法时，赋值语句无效，不会报错
- CSS 的短横线命名法，在属性名中表现为驼峰命名法

### 监听 dom 事件

监听事件可以描述为一句话：

**某个 DOM**发生了**某件事**之后，我需要做**某些处理**

- 某个 DOM：监听谁？
- 某件事（事件类型）：它发生了什么？
- 某些处理（处理函数）：我要做什么？

下面是一段事件监听代码：

```js
// 为dom注册点击事件，当被点击时，自动运行事件处理函数
dom.onclick = function () {
  console.log('dom 被点击了');
};
```

#### 事件类型

https://developer.mozilla.org/zh-CN/docs/Web/Events

##### 表单类事件

| 事件名称   | 触发时机                                                                 | 备注                              |
| ---------- | ------------------------------------------------------------------------ | --------------------------------- |
| ==submit== | 表单被提交时触发                                                         | 注册到 form 元素上                |
| ==input==  | 文本框改变后立即出发                                                     | 注册到 input、textarea 上         |
| ==change== | 文本框改变后、失去焦点时触发<br />下拉列表、多选框、单选框改变后立即触发 | 注册到 input、select、textarea 上 |
| reset      | 表单被重置时触发                                                         | 注册到 form 元素上                |
| focus      | 元素聚焦时触发                                                           |                                   |
| blur       | 元素失去焦点时触发                                                       |                                   |

##### 鼠标类事件

| 事件名称       | 触发时机                     | 备注 |
| -------------- | ---------------------------- | ---- |
| ==click==      | 鼠标按下抬起后触发           |      |
| contextmenu    | 右键菜单显示前触发           |      |
| ==mousedown==  | 鼠标按下时触发               |      |
| ==mouseup==    | 鼠标抬起时触发               |      |
| ==mousemove==  | 鼠标在元素上移动时触发       |      |
| ==mouseenter== | 鼠标进入元素时触发（不冒泡） |      |
| ==mouseleave== | 鼠标离开元素时触发（不冒泡） |      |
| mouseover      | 鼠标进入元素时触发（冒泡）   |      |
| mouseout       | 鼠标离开元素时触发（冒泡）   |      |
| wheel          | 鼠标滚轮滚动时触发           |      |

##### 键盘事件

| 事件名称 | 触发时机           | 备注 |
| -------- | ------------------ | ---- |
| keydown  | 某个键被按下时触发 |      |
| keyup    | 某个键被抬起时触发 |      |

#### 注册事件

JS 提供了三种方式注册事件

方式 1：将事件注册写到元素上，这种方式基本被弃用

```html
<button onclick="js代码">按钮</button>
```

==方式 2：使用 dom 属性注册事件==

属性名为`on+事件类型`

```js
// 监听事件
dom.onclick = function () {
  // 处理函数
};
// 移除监听事件
dom.onclick = null;
```

这种方式的特点是：

- 优点：易于监听、覆盖、移除
- 缺点：只能注册一个处理函数
- 缺点：某些事件不支持用这种方式注册

==方式 3：使用 addEventListener 方法注册事件==

```js
dom.addEventListener('click', function () {
  // 处理函数1
});
dom.addEventListener('click', function () {
  // 处理函数2
});
```

这是最完美的事件注册方式，如果要移除用这种方式注册的事件，需要改写代码

```js
function handler1() {
  // 处理函数1
}
function handler2() {
  // 处理函数2
}

dom.addEventListener('click', handler1);
dom.addEventListener('click', handler2);

dom.removeEventListener('click', handler1); // 移除监听函数1
```

#### 事件处理函数

当事件发生时，会自动调用事件处理函数，并向函数传递一个参数，该参数称之为事件对象，里面包含了事件发生的相关信息，比如鼠标位置、键盘按键等等

```js
dom.addEventListener('click', function (e) {
  console.log(e.clientX); //打印鼠标的横坐标
});
```

常见的事件对象有：[鼠标事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)、[键盘事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent)

另外，在事件处理函数中，`this`始终指向注册事件的 dom

### dom 进阶

#### 事件默认行为

某些元素的某些事件，浏览器会有自己的默认行为

比如：

- a 元素的 click 事件，浏览器会跳转页面
- form 元素的 submit 事件，浏览器会提交表单，最终导致页面刷新
- 文本框的 keydown 事件，浏览器会将按键文本显示到文本框中
- ......

如果我们要阻止浏览器的默认行为，就需要在对应时间中加入以下代码：

```js
// e为事件对象
e.preventDefault();
```

#### dom 尺寸和位置

<img src="http://mdrs.yuanjin.tech/img/20211216104505.png" alt="尺寸1" style="zoom:50%;" />

![尺寸2](http://mdrs.yuanjin.tech/img/20220406223123.png)

![尺寸3](http://mdrs.yuanjin.tech/img/20220213212313.png)

<img src="http://mdrs.yuanjin.tech/img/20211216104405.jpg" alt="尺寸4" style="zoom:50%;" />

> 调用`dom.scrollTo(x, y)`可以设置元素的滚动位置，x 和 y 分别表示 scrollLeft 和 scrollTop
>
> 该方法通用元素回到元素顶部`dom.scrollTo(0, 0)`
>
> 如果要监听元素的滚动，可以监听事件类型：==scroll==

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

![element-box-diagram](http://mdrs.yuanjin.tech/img/202210151248555.png)

> 上图中的 top、left、right、bottom 均相对于视口

#### 事件传播机制

<img src="http://mdrs.yuanjin.tech/img/20211216105521.jpg" alt="事件流" style="zoom: 50%;" />

```js
// 在冒泡阶段触发
div.onclick = function () {};

// 在捕获阶段触发事件
div.addEventListener('click', function () {}, true);

// 在冒泡阶段触发事件（默认）
div.addEventListener('click', function () {}, false);
```

```js
// 事件处理函数
function handler(e) {
  e.target; // 获取事件源（目标阶段的dom）
  e.stopPropagation(); // 阻止事件继续冒泡
}
```
