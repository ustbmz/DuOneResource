import AdminController from './services/admin';
import { message } from 'antd';

export async function getInitialState() {
  if (location.pathname === '/login') {
    // 说明是要强行跳登录页
    // 判断是否有有效的 token
    const token = localStorage.getItem('adminToken'); // 获取本地 token
    if (token) {
      // 说明本地有 token，接下来还需要验证 token 的有效性
      const result = await AdminController.getInfo();
      if (result.data) {
        // 说明不仅有 token，而且该 token 还是有效的
        // 那么就不允许跳转
        message.warning('请先退出后再登录');
        history.go(-1);
      }
    }
  } else {
    // 说明是要强行跳内部页面
    // 需要进行 token 的有效性验证
    const result = await AdminController.getInfo();
    if (result.data) {
      const { data } = await AdminController.getAdminById(result.data._id);
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      // token 验证失效，跳转至登录
      // 失效可能是 token 过期，也有可能是本地就没有 token，不管有没有，删除掉
      localStorage.removeItem('adminToken');
      location.href = '/login';
      message.warning('登录过期，请重新登录');
    }
  }
}

export const layout = () => {
  return {
    logo: 'https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-10-18-074620.png',
    menu: {
      locale: false,
    },
    logout: (initialState) => {
      localStorage.removeItem('adminToken');
      location.href = '/login';
      message.success('退出登录成功');
    },
  };
};

export const request = {
  timeout: 3000,
  // 请求拦截器
  requestInterceptors: [
    function (url, options) {
      // 从本地存储中获取 token
      const token = localStorage.getItem('adminToken');
      if (token) {
        // 说明本地有 token 信息，在请求头的 Authorization 字段统一添加 token
        options.headers['Authorization'] = 'Bearer ' + token;
      }
      return { url, options };
    },
  ],
};