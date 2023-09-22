# React 和 Vue 描述页面的区别

> 面试题：React 和 Vue 是如何描述 UI 界面的？有一些什么样的区别？

**标准且浅显的回答：**

>React 中使用的是 JSX，Vue 中使用的是模板来描述界面



前端领域经过长期的发展，目前有两种主流的描述 UI 的方案：

- JSX
- 模板



## JSX 历史来源

JSX 最早起源于 React 团队在 React 中所提供的一种类似于 XML 的 ES 语法糖：

```jsx
const element = <h1>Hello</h1>
```

经过 Babel 编译之后，就会变成：

```js
// React v17 之前
var element = React.createElement("h1", null, "Hello");

// React v17 之后
var jsxRuntime = require("react/jsx-runtime");
var element = jsxRuntime.jsx("h1", {children: "Hello"});
```

无论是 17 之前还是 17 之后，执行了代码后会得到一个对象：

```js
{
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {
    "children": "Hello"
  },
  "_owner": null,
  "_store": {}
}
```

这个其实就是大名鼎鼎的虚拟 DOM。

React 团队认为，UI 本质上和逻辑是有耦合部分的：

- 在 UI 上面绑定事件
- 数据变化后通过 JS 去改变 UI 的样式或者结构

作为一个前端工程师，JS 是用得最多，所以 React 团队思考屏蔽 HTML，整个都用 JS 来描述 UI，因为这样做的话，可以让 UI 和逻辑配合得更加紧密，所以最终设计出来了类 XML 形式的 JS 语法糖

由于 JSX 是 JS 的语法糖（本质上就是 JS），因此可以非常灵活的和 JS 语法组合使用，例如：

- 可以在 if 或者 for 当中使用 jsx
- 可以将 jsx 赋值给变量
- 可以将 jsx 当作参数来传递，当然也可以在一个函数中返回一段 jsx

```jsx
function App({isLoading}){
  if(isLoading){
    return <h1>loading...</h1>
  }
  return <h1>Hello World</h1>;
}
```

这种灵活性就使得 jsx 可以轻松的描述复杂的 UI，如果和逻辑配合，还可以描述出复杂 UI 的变化。

使得 React 社区的早期用户可以快速实现各种复杂的基础库，丰富社区生态。又由于生态的丰富，慢慢吸引了更多的人来参与社区的建设，从而源源不断的形成了一个正反馈。



## 模板的历史来源

模板的历史就要从后端说起。

在早期前后端未分离的时候，最流行的方案就是使用模板引擎，模板引擎可以看作是在正常的 HTML 上面进行挖坑（不同的模板引擎语法不一样），挖了坑之后，服务器端会将数据填充到挖了坑的模板里面，生成对应的 html 页面返回给客户端。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-03-060632.png" alt="image-20211103140631869" style="zoom:50%;" />

所以在那个时期前端人员的工作，主要是 html、css 和一些简单的 js 特效（轮播图、百叶窗...），写好的 html 是不能直接用的，需要和后端确定用的是哪一个模板引擎，接下来将自己写好的 html 按照对应模板引擎的语法进行挖坑

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-03-063319.png" alt="image-20211103143319523" style="zoom:50%;" />

不同的后端技术对应的有不同的模板引擎，甚至同一种后端技术，也会对应很多种模板引擎，例如：

- *Java*（*JSP、Thymeleaf、Velocity、Freemarker*）
- *PHP*（*Smarty、Twig、HAML、Liquid、Mustache、Plates*）
- *Python*（*pyTenjin、Tornado.template、PyJade、Mako、Jinja2*）
- *node.js*（*Jade、Ejs、art-template、handlebars、mustache、swig、doT*）

下面列举几个模板引擎代码片段

twig 模板引擎

```php
基本语法
{% for user in users %}
    * {{ user.name }}
{% else %}
    No users have been found.
{% endfor %}

指定布局文件
{% extends "layout.html" %}
定义展示块
{% block content %}
    Content of the page...
{% endblock %}
```

blade 模板引擎

```php
<html>
    <head>
        <title>应用程序名称 - @yield('title')</title>
    </head>
    <body>
       @section('sidebar')
            这是 master 的侧边栏。
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

EJS 模板引擎

```html
<h1>
    <%=title %>
</h1>
<ul>
    <% for (var i=0; i<supplies.length; i++) { %>
    <li>
        <a href='supplies/<%=supplies[i] %>'>
            <%= supplies[i] %>
        </a>
    </li>
    <% } %>
</ul>
```

这些模板引擎对应的模板语法就和 Vue 里面的模板非常的相似。

现在随着前后端分离开发的流行，已经没有再用模板引擎的模式了，后端开发人员只需要书写数据接口即可。但是如果让一个后端人员来开前端的代码，那么 Vue 的模板语法很明显对于后端开发人员来讲要更加亲切一些。



最后我们做一个总结，虽然现在前端存在两种方式：JSX 和模板的形式都可以描述 UI，但是出发点是不同

模板语法的出发点是，既然前端框架使用 HTML 来描述 UI，那么我们就扩展 HTML，让 HTML 种能够描述一定程度的逻辑，也就是“从 UI 出发，扩展 UI，在 UI 中能够描述逻辑”。

JSX 的出发点，既然前端使用 JS 来描述逻辑，那么就扩展 JS，让 JS 也能描述 UI，也就是“从逻辑出发，扩展逻辑，描述 UI”。

这两者虽然都可以描述 UI，但是思路或者说方向是完全不同的，从而造成了整体框架架构上面也是不一样的。



## 真题解答

> 题目：React 和 Vue 是如何描述 UI 界面的？有一些什么样的区别？
>
> 参考答案
>
> 在 React 中，使用 JSX 来描述 UI。因为 React 团队认为UI 本质上与逻辑存在耦合的部分，作为前端工程师，JS 是用的最多的，如果同样使用 JS 来描述 UI，就可以让 UI 和逻辑配合的更密切。
>
> 使用 JS 来描述页面，可以更加灵活，主要体现在：
>
> - 可以在 if 语句和 for 循环中使用 JSX
> - 可以将 JSX 赋值给变量
> - 可以把 JSX 当作参数传入，以及在函数中返回 JSX
>
> 而模板语言的历史则需要从后端说起。早期在前后端未分离时代，后端有各种各样的模板引擎，其本质是扩展了 HTML，在 HTML 中加入逻辑相关的语法，之后在动态的填充数据进去。如果单看 Vue 中的模板语法，实际上和后端语言中的各种模板引擎是非常相似的。
>
> 总结起来就是：
>
> 模板语法的出发点是，既然前端框架使用 HTML 来描述 UI，那么就扩展 HTML 语法，使它能够描述逻辑，也就是“从 UI 出发，扩展 UI，在 UI 中能够描述逻辑”。
>
> 而 JSX 的出发点是，既然前端使用 JS 来描述逻辑，那么就扩展 JS 语法，让它能够描述 UI，也就是“从逻辑出发，扩展逻辑，描述 UI”。
>
> 虽然这两者都达到了同样的目的，但是对框架的实现产生了不同的影响。