# *coder station* 后台管理系统笔记



## 项目准备

这一次项目会有一些前置知识需要学习：

- *Antd pro*
- *Dva*
- *UmiJS 4.0*



## 项目笔记



1. 如何修改项目的端口号

在项目根目录下面创建一个 *.env* 文件，之后就可以配置端口号之类的内容

参阅文档：*https://umijs.org/docs/guides/directory-structure#env*



2. 关于路由的配置，需要参阅 *Antd pro* 这个文档的“新增页面”部分的内容

文档：*https://pro.ant.design/zh-CN/docs/new-page*

如果想要某个页面不出现在左侧的导航栏中，可以配置 *hideInMenu:true*



3. 配置代理服务器直接在 *umirc.js* 中进行配置

文档：*https://umijs.org/docs/api/config#proxy*

例如：

```js
proxy : {
    "/api" : {
      target : "http://127.0.0.1:7001",
      changeOrigin : true,
    },
    "/static" : {
      target : "http://127.0.0.1:7001",
      changeOrigin : true,
    },
    "/res" : {
      target : "http://127.0.0.1:7001",
      changeOrigin : true,
    }
  },
```



4. 当我们使用 *antd* 里面的表格的时候，和 *Element-ui* 不同的是，在 *antd* 中的表格需要配置每一列

例如：

```js
// 对应表格每一列的配置
const columns = [{
  title : "登录账号",
  dataIndex : "loginId",
  key : "loginId",
  align : "center"
}];
```

具体请参阅文档：*https://ant.design/components/table-cn/#Column*

注意，在配置列的时候，有一些列选项是输属于 *procomponents* 新增的，所以有些属性我们需要参阅 *procomponents* 的文档

文档：

- *columns* 列定义：*https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89*

- *valueType* 对应的值：*https://procomponents.ant.design/components/schema#valuetype-%E5%88%97%E8%A1%A8*

如果是单纯的渲染某一个值，那么直接配置 *dataIndex* 即可，但是很多时候，我们是根据数据对应的值渲染成其他的东西，例如：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-18-064046.png" alt="image-20221118144046443" style="zoom:50%;" />

那么这个时候，咱们就需要使用到 *render*。

如果不要搜索，可以将搜索选项关闭：*search：false*









