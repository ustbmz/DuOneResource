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



