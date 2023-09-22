# *Antd pro* 介绍

前面介绍过 *Antd*，这是蚂蚁旗下的一个组件库，提供了 *React* 和 *Vue* 双版本，这就类似于 *Vue* 的 *ElementUI*。

而这里要介绍的 *Antd pro*，则是蚂蚁推出的集成了 *Antd* 组件库的**后台集成解决方案**，类似于之前我们所学的 *vue-element-admin*

>补充一下：
>
>*vue-element-admin* 使用的是 *vue 2.x*，如果想要基于 *vue 3.x* 的后台管理集成方案，可以使用 *vue-element-plus-admin*，官网地址：*https://kailong110120130.gitee.io/vue-element-plus-admin-doc/*
>
>另外，蚂蚁同样也推出了基于 *vue* 技术栈的 *antd pro vue*，不过 *antd pro vue* 使用的 *vue 2.x*，官网地址：*https://pro.antdv.com/* 



*Antd pro* 的官网地址：*https://pro.ant.design/zh-CN/*

由于后期我们所使用的 *Umi Max* 集成了 *Antd pro* 在里面，所以我们需要提前了解 *Antd pro*，要了解的主要有以下几个点：

- 新增布局
- 将文件加入菜单和路由
- *UI* 配置（*layout* 配置对象）

>*https://pro.ant.design/zh-CN/docs/new-page*



***ProComponents***

*ProComponents* 是基于 *Ant Design* 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 *CRUD* 页面的效率，更加专注于页面。

*ProComponents* 官网：*https://procomponents.ant.design/*

*ProComponents* 针对中后台系统中常用的组件进行了二次封装，主要包含：

- 布局
  - [ProLayout](https://procomponents.ant.design/components/layout) 解决布局的问题，提供开箱即用的菜单和面包屑功能
  - [ProCard](https://procomponents.ant.design/components/card) 提供卡片切分以及栅格布局能力
- 数据录入
  - [ProForm](https://procomponents.ant.design/components/form) 表单模板组件，预设常见布局和行为
- 数据展示
  - [ProTable](https://procomponents.ant.design/components/table) 表格模板组件，抽象网络请求和表格格式化
  - [ProDescriptions](https://procomponents.ant.design/components/descriptions) 定义列表模板组件，ProTable 的配套组件
- 通用
  - [ProSkeleton](https://procomponents.ant.design/components/skeleton) 页面级别的骨架屏



