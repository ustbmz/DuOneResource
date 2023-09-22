# *React-router v6*



- 前端路由概念
- *React-router*



## 前端路由概念

早期的时候并不存在前端路由，那个时候只有后端路由，类似于下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-01-120014.png" alt="image-20221101200014494" style="zoom:50%;" />

后来，随着单页应用的流行，整个 *Web* 应用之存在一个页面，通过 *JS* 调整模块来显示不同的内容，类似于下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-01-120408.png" alt="image-20221101200407424" style="zoom:50%;" />

可以看到，所谓前端路由实际上就是协调当前页面显示什么模块。那么单页应用时代，还存在后端路由么？

实际上也是存在的，后端路由负责返回对应的数据，如下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-01-120622.png" alt="image-20221101200622242" style="zoom:50%;" />



## *React-router*

*React-router* 是 *React* 官方所推出的前端路由库，官网地址：*https://reactrouter.com/en/main*

目前最新的版本为 *v6* 版本。相比之前的版本，该版本变化略大，加入了许多新的 *Hook*，比如 *useRoutes* 这个 *Hook* 就提供了类似于 *Vue-router* 相似的特性，从而使得使用起来更加的方便。

整个官网可以分为几大块：

- *Components* 组件
- *Hooks* 函数
- *API* 函数

整个 *React-router*，我们将写一个学生管理系统，用到什么讲什么。

