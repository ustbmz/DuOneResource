# *React* 基本介绍



本章主要包含以下内容：



- *React* 基本介绍
- *React* 特点
- 搭建开发环境



## *React* 基本介绍

*React* 起源于 *Facebook* 的内部项目，因为该公司对市场上所有 *JavaScript MVC* 框架都不满意，就决定自己写一套，用来架设 *Instagram* 的网站。

*React* 的实质其实是一个用于构建用户界面的 *JavaScript* 库。*React* 主要用于构建 *UI*。*React* 于 *2013* 年 *5* 月开源，由于拥有较高的性能，代码逻辑简单，越来越多的人已开始关注和使用它。

>*UI* = *fn(state)*

由于 *React* 的设计思想极其独特，属于革命性创新，性能出众，所以，越来越多的人开始关注和使用，认为它可能是将来 *Web* 开发的主流工具。

这个项目本身也越滚越大，从最早的 *UI* 引擎变成了一整套前后端通吃的 *Web App* 解决方案。



*React* 官网：*https://reactjs.org/*



*React* 从诞生到现在，一直在给我们带来各种各样的惊喜。甚至从 *2015* 年开始，每年都会举行 *React Conf* 大会，介绍 *React* 本年度所更新的新特性有哪些。

![image-20221027152326265](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-10-27-072327.png)

>*React Conf* 官网：*https://conf.reactjs.org/*
>
>*React Conf* 油管视频：*https://www.youtube.com/channel/UC1hOCRBN2mnXgN5reSoO3pQ*



下面介绍一下 *React* 几个重要版本的重大更新：

- *React 16* :出现了 *Fiber*，整个更新变的可中断、可分片、具有优先级
- *React 16.8*：推出了 *Hooks*，标志着从类组件正式转为函数组件
- *React 17*：过渡版本，没有添加任何面向开发人员的新功能。而主要侧重于**升级简化 *React* 本身**。
- *React 18*
  - *transition*
  - *Suspense*
  - 新的 *Hooks*
  - *Offscreen*
  - ......



## *React* 特点

在 *React* 官网中，罗列了 *3* 个特点：

- 声明式
- 组件化
- 一次学习，跨平台编写



除此之外，*React* 还具有如下的特点：

- 单向数据流
- 虚拟 *DOM*
- *Diff* 算法



## 搭建开发环境

虽然官方提供了通过 *CDN* 引入 *React* 的方式：*https://zh-hans.reactjs.org/docs/cdn-links.html*

但是实际开发中肯定是使用 *React* 的脚手架工具来搭建项目，*React* 官方提供了脚手架工具 *Create React App*：

*https://create-react-app.dev/*



快速开始：

```js
npx create-react-app my-app
cd my-app
npm start
```

