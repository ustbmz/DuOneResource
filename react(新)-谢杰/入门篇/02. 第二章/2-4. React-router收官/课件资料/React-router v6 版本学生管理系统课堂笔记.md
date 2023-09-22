# *React-router v6* 版本学生管理系统课堂笔记



## 快速搭建服务器



这里我们选择使用 *json-server* 来快速搭建一个服务器

*npm* 地址：*https://www.npmjs.com/package/json-server*

首先 *npm init* 初始化一个服务器的目录，然后安装 *json-server* 依赖，之后创建 *db.json*，该文件就是我们的数据文件

```json
{
    "students": [
        {
            "name": "xiejie",
            "age": "18",
            "phone": "333-444-555",
            "email": "xiejie@gmail.com",
            "education": "adsfasfd",
            "graduationschool": "asdfasfd",
            "profession": "asdfasdf",
            "profile": "asdfasfdasdf",
            "id": 1
        },
        {
            "name": "yajing",
            "age": "34",
            "phone": "123-345-678",
            "email": "yajing@hotmail.com",
            "education": "fasdfasfd",
            "graduationschool": "fasfasdf",
            "profession": "sdfasdfafd",
            "profile": "asdfasdf",
            "id": 3
        },
        {
            "name": "xizhi",
            "age": 47,
            "phone": "13112341234",
            "email": "1234567@qq.com",
            "education": "硕士",
            "graduationschool": "北京大学",
            "profession": "前端开发工程师",
            "profile": "大家好!",
            "id": 2
        }
    ],
    "classes" : [
        {
            "id" : 1,
            "name" : "前端01班",
            "description" : "这是一个积极向上的班级"
        },
        {
            "id" : 2,
            "name" : "前端02班",
            "description" : "这也是一个非常积极向上的班级"
        }
    ]
}
```

之后在 *package.json* 中添加一条命令：

```js
"json:server":"json-server --watch db.json"
```

最后就可以启动服务器了：

```js
npm run json:server
```



## 快速搭建整个管理系统

因为目前还没有学习组件库，我们选择使用 *Bootstrap*

这里我们使用的模板地址：*https://v3.bootcss.com/examples/starter-template/#*

因为我们用了 *bootstrap* 相关的样式类，所以我们需要引入 *Bootstrap*，我们这里选择使用 *CDN* 的方式来引入

*https://www.bootcdn.cn/twitter-bootstrap/*

可以在 *index.html* 中添加如下的代码

```html
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
  integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
  crossorigin="anonymous"
/>

<!-- 引入 jQuery -->
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
  integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
  crossorigin="anonymous"
></script>
```



## *React-router v6* 路由总结



### 组件

- BrowserRouter：整个前端路由以 history 模式开始，包裹根组件
- HashRouter：整个前端路由以 hash 模式开始，包裹根组件
- Routes：类似于 v5 版本的 Switch，主要是提供一个上下文环境
- Route：在 Route 组件中书写你对应的路由，以及路由所对应的组件
  - path：匹配的路由
  - element：匹配上该路由时，要渲染的组件
- Navigate：导航组件，类似于 useNavigate 的返回值函数，只不过这是一个组件
- NavLink：类似于 Link，最终和 Link 一样，会被渲染为 a 标签，注意它和 Link 的区别，实际上就是当前链接，会有一个名为 active 的激活样式，所以一般用于做顶部或者左侧导航栏的跳转



### *Hooks*

- useLocation：获取到 location 对象，获取到 location 对象后，我们可以获取 state 属性，这往往是其他路由跳转过来的时候，会在 state 里面传递额外的数据
- useNavigate：调用之后会返回一个函数，通过该函数可以做跳转。
- useParams：获取动态参数



## 补充内容



### *useRoutes*

使用示例如下：

```react
function Router(props) {
    return useRoutes([
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/add",
            element: <AddOrEdit />,
        },
        {
            path: "/detail/:id",
            element: <Detail />,
        },
        {
            path: "/edit/:id",
            element: <AddOrEdit />,
        },
        {
            path: "/",
            element: <Navigate replace to="/home" />
        }
    ]);
}

export default Router;
```



### 嵌套路由

直接在 useRoutes 进行 chilren 属性的配置即可，类似于 vue-router，children 对应的是一个数组，数组里面是一个一个路由对象

```react
 {
   path: "/about",
     element: <About />,
     children : [
         {
           path : "email",
           element : <Email/>
         },
         {
           path : "tel",
           element : <Tel/>
         },
         {
           path : "",
           element: <Navigate replace to="email" />
         }
       ]
 },
```

之后，使用 Outlet 组件，该组件表示匹配上的子路由组件渲染的位置。





