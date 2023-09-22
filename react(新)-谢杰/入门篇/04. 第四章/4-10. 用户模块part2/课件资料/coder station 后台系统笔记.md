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



5. 设置全局的 *CSS* 样式

在 *src* 目录下面创建一个 *global.css* 的文件，该 *CSS* 文件就是一个全局的样式：

*https://umijs.org/docs/guides/directory-structure#globalcsslesssassscss*



6. 如何回填表单的值

我们在修改的时候，经常会涉及到回填表单的值，在 *ant design* 里面，使用 *setFieldsValue*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-22-074057.png" alt="image-20221122154057171" style="zoom:50%;" />



7. 关于发送请求获取数据

有两种处理方式：

- 通过 *dispatch* 一个 *action* 到状态仓库，然后状态仓库来发请求，请求回来的数据放入到数据仓库中（管理员模块）
  - 适用于数据量不多
  - 多个组件要共享某一块数据
- 直接在组件里面请求数据
  - 数据量很大，在向服务器发送请求的时候，只能分页请求
  - 不需要和其他组件共享



8. 关于在 *ProTable* 组件中使用 *request* 发送请求

*ProTable* 有一个重要的属性叫做 *request*，该属性对应的值一般是一个异步函数，该异步函数自动接受一个 *params*，*params* 中会有默认的当前页码（*current*）和每一页的条数（*pageSize*），这两个值会有默认值，*current* 默认为 *1*，*pageSize* 默认为 *20*，可以通过配置 *pagination* 属性来修改 *current* 和 *pageSize* 的值

```js
<ProTable
  headerTitle="用户列表"
  pagination={{
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 15, 20],
    ...pagination,
    onChange: handlePageChange
  }}
  request={async (params) => {
    console.log(params);
  }}
/>
```



9. 刷新表格

获取到表格的实例（通过 *ref*），注意这里是 *actionRef*，然后调用 *reload* 方法

```react
<ProTable
  actionRef={tableRef}
 	...
/>
```

```js
tableRef.current.reload();
```

请参阅：*https://procomponents.ant.design/components/table/#actionref-%E6%89%8B%E5%8A%A8%E8%A7%A6%E5%8F%91*



10. 如何新增不再导航栏显示的页面

只需要一个配置项即可

```js
hideInMenu : true
```

更多的配置项，请参阅：*https://pro.ant.design/zh-CN/docs/new-page*
