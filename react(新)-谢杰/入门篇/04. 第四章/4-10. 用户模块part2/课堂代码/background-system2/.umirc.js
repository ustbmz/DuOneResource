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
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon : "HomeOutlined"
    },
    {
      name : "管理员",
      path : "/admin",
      icon: 'UserOutlined',
      routes : [{
        path : "adminList",
        name : "管理员列表",
        component: './Admin',
      },{
        path : "addAdmin",
        name : "添加管理员",
        component: './Admin/addAdmin',
      }]
    },
    {
      name : "用户",
      path : "/user",
      icon: 'TeamOutlined',
      routes : [{
        path : "userList",
        name : "用户列表",
        component: './User',
      },{
        path : "addUser",
        name : "添加用户",
        component: './User/addUser',
      },{
        path : "editUser/:id",
        name : "编辑用户",
        component: './User/editUser',
        hideInMenu : true
      }]
    },
    {
      name : "书籍",
      path : "/book",
      icon: 'ReadOutlined',
      routes : [{
        path : "bookList",
        name : "书籍列表",
        component: './Book',
      },{
        path : "addBook",
        name : "添加书籍",
        component: './Book/addBook',
      }]
    },
    {
      name : "面试题",
      path : "/interview",
      icon: 'EditOutlined',
      component: './Interview'
    },
    {
      name : "问答",
      path : "/issue",
      icon: 'ProfileOutlined',
      component: './Issue'
    },
    {
      name : "评论",
      path : "/comment",
      icon: 'CalendarOutlined',
      component: './Comment'
    },
    {
      name : "类型",
      path : "/type",
      component: './Type',
      icon: 'AppstoreOutlined',
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

