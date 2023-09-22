import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'coder station',
  },
  dva : {}, // 打开 dva 插件
  routes: [
    {
      path: '/',
      redirect: '/home',
      access : "NormalAdmin"
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon : "HomeOutlined",
      access : "NormalAdmin"
    },
    {
      name : "管理员",
      path : "/admin",
      icon: 'UserOutlined',
      access : "SuperAdmin",
      routes : [{
        path : "adminList",
        name : "管理员列表",
        component: './Admin',
        access : "SuperAdmin",
      },{
        path : "addAdmin",
        name : "添加管理员",
        component: './Admin/addAdmin',
        access : "SuperAdmin",
      }]
    },
    {
      name : "用户",
      path : "/user",
      icon: 'TeamOutlined',
      access : "NormalAdmin",
      routes : [{
        path : "userList",
        name : "用户列表",
        component: './User',
        access : "NormalAdmin"
      },{
        path : "addUser",
        name : "添加用户",
        component: './User/addUser',
        access : "NormalAdmin"
      },{
        path : "editUser/:id",
        name : "编辑用户",
        component: './User/editUser',
        hideInMenu : true,
        access : "NormalAdmin"
      }]
    },
    {
      name : "书籍",
      path : "/book",
      icon: 'ReadOutlined',
      access : "NormalAdmin",
      routes : [{
        path : "bookList",
        name : "书籍列表",
        component: './Book',
        access : "NormalAdmin"
      },{
        path : "addBook",
        name : "添加书籍",
        component: './Book/addBook',
        access : "NormalAdmin"
      },{
        path : "editBook/:id",
        name : "编辑书籍",
        component: './Book/editBook',
        hideInMenu : true,
        access : "NormalAdmin"
      }]
    },
    {
      name : "面试题",
      path : "/interview",
      icon: 'EditOutlined',
      component: './Interview',
      access : "NormalAdmin"
    },
    {
      name : "问答",
      path : "/issue",
      icon: 'ProfileOutlined',
      component: './Issue',
      access : "NormalAdmin"
    },
    {
      name : "评论",
      path : "/comment",
      icon: 'CalendarOutlined',
      component: './Comment',
      access : "NormalAdmin"
    },
    {
      name : "类型",
      path : "/type",
      component: './Type',
      icon: 'AppstoreOutlined',
      access : "NormalAdmin"
    },
    {
      path : "/login",
      component: './Login',
      menuRender: false,
    }
  ],
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
  npmClient: 'npm',
});

