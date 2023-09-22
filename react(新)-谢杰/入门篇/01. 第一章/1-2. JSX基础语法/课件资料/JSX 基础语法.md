# *JSX* 基础语法

本章主要包括以下内容：

- *JSX* 基础语法
- *createElement* 方法



## *JSX* 基础语法

在 *React* 中，使用 *JSX* 来描述页面。

```js
function App() {
  return (
    <div>Hello React~</div>
  );
}
```

你可以把类似于 *HTML* 的代码单独提取出来，例如：

```js
function App() {
  const ele = <div>Hello React~</div>
  return (
    ele
  );
}
```

注意这种类似于 *HTML* 的语法在 *React* 中称之为 *JSX*， 这是一种 *JavaScript* 的语法扩展。在 *React* 中推荐使用 *JSX* 来描述用户界面。*JSX* 乍看起来可能比较像是模版语言，但事实上它完全是在 *JavaScript* 内部实现的。



使用 *JSX* 来描述页面时，有如下的一些语法规则：

- 根元素只能有一个
- *JSX* 中使用 *JavaScript* 表达式。表达式写在花括号 *{}* 中
- 属性值指定为字符串字面量，或者在属性值中插入一个 *JavaScript* 表达式
- *style* 对应样式对象，*class* 要写作 *className*
- 注释需要写在花括号
- *JSX* 允许在模板中插入数组，数组会自动展开所有成员



## *createElement* 方法

*JSX* 是一种 *JavaScript* 的语法扩展，*Babel* 会把 *JSX* 转译成一个名为 *React.createElement* 函数调用。

```js
React.createElement(type, [props], [...children]);
```

参数说明：

- *type*：创建的 *React* 元素类型（可选的值有：标签名字符串、*React* 组件）。
- *props*（可选）：*React* 元素的属性。
- *children*（可选）：*React* 元素的子元素。

例如，下面两种代码的作用完全是相同的：

```js
const element1 = (
    <h1 className="greeting">
    	Hello, world!
    </h1>
);
const element2 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```

这些对象被称为 “*React* 元素”。它们描述了你希望在屏幕上看到的内容。

可以看出，*JSX* 的本质其实就是 *React.createElement* 方法的一种语法糖。

---

-*EOF*-