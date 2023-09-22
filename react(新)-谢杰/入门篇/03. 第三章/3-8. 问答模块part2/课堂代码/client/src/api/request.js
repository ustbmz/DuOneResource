import axios from "axios";

const service = axios.create({
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 拦截到请求后，这里就可以做各种事情
    // 一般是添加 token
    // 从本地拿到 userToken
    const token = localStorage.getItem("userToken");
    if(token){
      config.headers['Authorization'] = "Bearer " + token;
    }

    // 请求放行
    return config;
  },
  (err) => {
    // 发生错误时的回调
    console.log("请求拦截出错，错误信息：", err);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 拦截到响应后，可以做各种判断
    const res = response.data;
    return res;
  },
  (err) => {
    // 发生错误时的回调
    console.log("响应拦截出错，错误信息：", err);
  }
);

export default service;
