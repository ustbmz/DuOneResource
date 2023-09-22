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



11. *Warning: Cannot update a component (`InternalFormItem`) while rendering a different component (`UserForm`).*

该警告出现的原因，是因为在初次渲染组件的时候，我们设置了数据的回填，导致组件初次还没有渲染完毕，又在更新

如何解决，也非常简单，我们等待第一次渲染完毕后再进行数据的回填，所以我们将回填的代码放入 *useEffect*

```js
useEffect(() => {
  if (formRef.current) {
    formRef.current.setFieldsValue(userInfo);
  }
}, [userInfo]);
```



12. 关于使用 *markdown* 编辑器做修改操作时光标跳转的问题

该问题的出现是因为对应的组件在重新渲染时，*markdown* 编辑器回填了数据多次

要解决这个问题也很简单，我们只需要设置一个状态值，第一次 *markdown* 回填了数据后，之后就不再让编辑器回填数据

```js
useEffect(()=>{
  if(formRef.current && firstIn && bookInfo){
    formRef.current.setFieldsValue(bookInfo);
    // 关键就是关于编辑器的回填
    editorRef.current.getInstance().setHTML(bookInfo?.bookIntro);
    // 将 firstIn 设置为 false
    setFirstIn(false);
  }
  if(formRef.current){
    formRef.current.setFieldsValue(bookInfo);
  }
},[bookInfo])
```



13. 关于登录页面的 Canvas 动画，使用到的是一个第三方库，叫做 *react-canvas-nest*

*https://www.npmjs.com/package/react-canvas-nest*

```react
<ReactCanvasNest
   config={{
   pointColor: '255, 0, 0',
   count: 66,
   follow: false,
   }}
   style={{ zIndex: 1 }}
/>
```



14. 配置初始化数据

在 umi 的运行时配置（*app.js/ts*）中，有一个叫做 *getInitialState* 方法，该方法可以配置一些初始化的数据，回头在其他组件中通过 *useModel* 来获取你返回的初始化数据

*https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81*

后台管理系统导航守卫逻辑如下：

```js
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  if (location.pathname === '/login') {
    // 强行跳登录页
    // 判断是否有有效的 token
    const token = localStorage.getItem('adminToken');
    if (token) {
      const result = await AdminController.getInfo();
      console.log(result, 'result');
      if (result.data) {
        // 不仅有 token，而且 token 是有效的
        // 不允许你去 login
        message.warning('请先退出后在登录');
        history.go(-1);
      }
    }
  } else {
    // 强行要跳内部页面
    const result = await AdminController.getInfo();
    if (result.data) {
      // 说明有 token，并且 token 有效
      // 获取该 id 对应的管理员信息
      const { data } = await AdminController.getAdminById(result.data._id);
      // 这里返回的就是一个全局的初始化数据
      // 之后各个组件都可以通过 useModel 获取到该初始数据
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      // token 验证失败，跳转至登录
      // 失效可能是因为 token 过期，也有可能是因为压根儿就没有 token，不管有没有，删除掉原有的
      localStorage.removeItem("adminToken");
      location.href = "/login";
      message.warning('请重新登录');
    }
  }
}
```



15. 配置请求和响应拦截器也是在 *app.js/ts* 运行时配置中进行配置

*https://umijs.org/docs/api/runtime-config#request*

```js
export const request = {
  timeout : 3000,
  // 请求拦截器
  requestInterceptors: [function(url, options){
    // 从本地获取 token
    const token = localStorage.getItem("adminToken");
    if(token){
      options.headers['Authorization'] = "Bearer " + token;
    }
    return {url, options};
  }]
}
```



16. 退出登录

退出登录只需要在运行时配置文件 *app.js/ts* 的 *layout* 里面书写 *logout* 对应的回调函数逻辑即可：

```js
logout : ()=>{
  // 删除本地 token
  localStorage.removeItem("adminToken");
  // 跳转到登录页面
  location.href = "/login";
  message.success('退出登录成功');
}
```



17. 关于权限

*https://umijs.org/docs/max/access*

首先需要在构建时配置文件 *umirn.js/ts* 中启动 *access*，之后在 *src* 目录下面创建一个 *access.js/ts* 文件

接下来在路由配置中，为每一个路由配置对应权限，例如：

```js
{
  name: '首页',
  path: '/home',
  component: './Home',
  icon : "HomeOutlined",
  access : "NormalAdmin"  // 普通管理员能够访问
},
{
  name : "管理员",
  path : "/admin",
  icon: 'UserOutlined',
  access : "SuperAdmin",  // 超级管理员能够访问
  ...
},
```

最后在 *access.js* 文件中，根据登录的账户的 *permission* 来确定返回的对象

```js
// 在该函数中，我们需要返回一个对象，对象里面对应一个一个权限项目，每个权限项目对应的值是一个布尔值
// true 代表有权限 false 代表没有权限

// 假设现在是超管登录 adminInfo.permission ---> 1
// { SuperAdmin : true, NormalAdmin : true}
// 假设现在登录的是普通管理员 adminInfo.permission ---> 2
// { SuperAdmin : false, NormalAdmin : true}

if (initialState) {
  return {
    SuperAdmin: initialState.adminInfo.permission === 1,
    NormalAdmin:
    initialState.adminInfo.permission === 1 ||
    initialState.adminInfo.permission === 2,
  };
} else {
  return {
    SuperAdmin : false, 
    NormalAdmin : false
  }
}
```

针对页面中某一块区域如果要设置权限，那么可以通过 *useAccess* *hook* 函数获取到当前的权限对象（*access.js* 中我们返回的对象）

之后通过 *Access* 组件包裹有权限的区域，设置 *accessible* 属性即可

```react
<Access accessible={access.SuperAdmin}>
 	//...
</Access>
```



18. 在页面中获取全局初始化数据

可以通过 *useModel* 来进行获取，示例如下：

```js
const { initialState } = useModel("@@ininitialState");
```



19. 关于首页的 Echarts

*https://umijs.org/docs/max/charts*

首先安装 *Echart* 相关的依赖：

```js
npm install @ant-design/charts
```

之后引入对应的图表，做好数据配置，直接使用即可。

具体可以使用的图表类型可以参阅：*https://charts.ant.design/*
