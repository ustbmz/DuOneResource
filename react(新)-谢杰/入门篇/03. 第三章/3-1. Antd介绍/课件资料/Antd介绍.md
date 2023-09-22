# *Antd* 介绍

*Antd* 是一个由蚂蚁集团推出的组件库，全称为 *Ant design*，官网地址：*https://ant.design/index-cn*

早期 *Antd* 主要是基于 *React* 的组件库，对应的基于 *Vue* 的组件库，大家大多使用 *ElementUI*。而现在即使你是使用 *Vue* 技术栈，也能够使用 *Antd Vue* 来做为自己项目的组件库，官方地址：*https://antdv.com/components/overview*

关于组件库的概念，这里不再做过多的介绍，只要你会用 *ElementUI*，那么使用 *Antd* 也没有太多的问题。

下面我们主要看两个点：

- 安装 *Antd*
- 使用 *Antd*



## 安装 *Antd*

首先第一步就是安装 *Antd*，可以通过命令：

```js
npm i antd
```

在使用的时候，需要引入对应的样式，因此我们在 *index.js* 中通过 *import* 来进行样式的引入：

```js
// index.js
import "antd/dist/antd.min.css";
```

另外，组件里面的文本默认都是英文的，如果要配置成中文，需要引入中文语言包以及 *ConfigProvider* 组件，之后包裹项目根组件：

```react
// index.js
import zhCN from "antd/es/locale/zh_CN"; // 中文语言包
import { ConfigProvider } from "antd"; 

// ...

root.render(
  <ConfigProvider locale={zhCN}>
  	<App />
  </ConfigProvider>
);
```



## 使用 *Antd*

安装好 *Antd* 之后，就可以愉快的使用组件库为我们所提供的组件了。

使用的步骤和 *ElementUI* 一样，首先通过 *import* 引入组件，例如：

```js
import { Button } from 'antd';
```

之后就可以在 *JSX* 中使用该组件：

```react
const App = () => (
  <>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <br />
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </>
);
```

至于该组件有一些什么样的属性和方法，需要我们参阅对应组件的文档说明。

下面是开发中常用的一些组件，大家可以提前去熟悉一下：

- 通用

  - *Button*
  - *Icon*

- 布局

  - *Grid*

- 导航

  - *Pagination*

- 数据录入

  - *Form*
    - *Input、Radio、Select...*

- 数据展示

  - *Table*
  - *Card*

- 反馈

  - *Alert*
  - *Message*
  - *Model*

  



