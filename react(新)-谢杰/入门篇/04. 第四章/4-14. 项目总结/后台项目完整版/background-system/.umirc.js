import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'coderstation',
    pure: true,
    loading: true,
  },
  dva: {},
  routes: [
    {
      path: '/',
      access: 'NormalAdmin',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      access: 'NormalAdmin',
      icon: 'HomeOutlined',
    },
    {
      name: ' 管理员',
      path: '/admin',
      icon: 'UserOutlined',
      access: 'SuperAdmin',
      routes: [
        {
          path: 'adminList',
          name: '管理员列表',
          access: 'SuperAdmin',
          component: './Admin',
        },
        {
          path: 'addAdmin',
          name: '添加管理员',
          access: 'SuperAdmin',
          component: '@/pages/Admin/addAdmin',
        },
      ],
    },
    {
      name: ' 用户',
      path: '/user',
      access: 'NormalAdmin',
      icon: 'TeamOutlined',
      routes: [
        {
          path: 'userList',
          name: '用户列表',
          access: 'NormalAdmin',
          component: './User',
        },
        {
          path: 'addUser',
          name: '添加用户',
          access: 'NormalAdmin',
          component: './User/addUser',
        },
        {
          path: 'editUser/:id',
          name: '编辑用户',
          access: 'NormalAdmin',
          component: './User/editUser',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      access: 'NormalAdmin',
      icon: 'ReadOutlined',
      routes: [
        {
          path: 'bookList',
          name: '书籍列表',
          access: 'NormalAdmin',
          component: './Book',
        },
        {
          path: 'addBook',
          name: '添加书籍',
          access: 'NormalAdmin',
          component: './Book/addBook',
        },
        {
          path: 'editBook/:id',
          name: '编辑书籍信息',
          access: 'NormalAdmin',
          component: './Book/editBook',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      access: 'NormalAdmin',
      icon: 'EditOutlined',
      routes: [
        {
          path: 'interviewList',
          name: '题目列表',
          access: 'NormalAdmin',
          component: './Interview',
        },
        {
          path: 'addInterview',
          name: '添加题目',
          access: 'NormalAdmin',
          component: './Interview/addInterview',
        },
        {
          path: 'interviewList/:id',
          name: '题目详情',
          access: 'NormalAdmin',
          component: './Interview/interviewDetail',
          hideInMenu: true,
        },
        {
          path: 'editInterview/:id',
          name: '编辑题目',
          access: 'NormalAdmin',
          component: './Interview/editInterview',
          hideInMenu: true,
        },
      ],
    },
    {
      name: ' 问答',
      path: '/issue',
      icon: 'ProfileOutlined',
      access: 'NormalAdmin',
      component: './Issue',
    },
    {
      name: ' 问答详情',
      path: '/issue/:id',
      component: './Issue/issueDetail',
      access: 'NormalAdmin',
      hideInMenu: true,
    },
    {
      name: '评论',
      path: '/commentList',
      component: './Comment',
      access: 'NormalAdmin',
      icon: 'CalendarOutlined',
    },
    {
      name: '类型',
      path: '/typeList',
      component: './Type',
      access: 'NormalAdmin',
      icon: 'AppstoreOutlined',
    },
    {
      path: '/login',
      component: './Login',
      menuRender: false,
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/res': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  npmClient: 'npm',
});
