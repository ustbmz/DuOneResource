import axios from "axios";

const service = axios.create({
  timeout: 5000, // 超时时间
});

// 请求拦截器
service.interceptors.request.use(
  // 正常请求被拦截下来的回调函数
  (config) => {
    // 从本地存储中获取 token
    const token = localStorage.getItem('userToken');
    if(token){
      // 说明本地有 token 信息，在请求头的 Authorization 字段统一添加 token
      config.headers['Authorization'] = "Bearer " + token
    }
    // console.log(config,'config');
    // 放行请求
    return config;
  },
  // 发生错误时的回调函数
  (error) => {
    console.log("请求拦截出错：", error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  // 正常响应被拦截下来时的回调函数
  (response) => {
    const res = response.data;
    // console.log(res,'res');
    if (res.code) {
        switch(res.code){
          case 406:{
            return res;
          }
        }
    } else {
      // 放行响应
      return res;
    }
  },
  // 发生错误时的回调函数
  (error) => {
    console.log("响应拦截出错：", error);
  }
);

export default service;
