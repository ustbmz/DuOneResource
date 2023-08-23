/**
 * 参考接口文档：http://mock.duyiedu.com/project/72/interface/api
 * 完成下面的api函数
 * 并对每个函数进行调用测试
 * 需要统一处理的地方：
 * 1. 对baseurl进行统一处理
 * 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息msg
 * 3. 如果服务器响应头中出现Authorization:token，需要对把响应头中的token保存到localstorage
 * 4. 请求时，如果发现本地localstorage中包含token，需要将其带入到请求头中 Authorization: Bearer token
 */

const ins = axios.create({
  baseURL: 'https://study.duyiedu.com',
});

// 统一处理：拦截器
// 添加响应拦截器
ins.interceptors.response.use(
  function (resp) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 服务器给了授权码，我需要保存它
    const token = resp.headers.authorization;
    if (token) {
      localStorage.setItem('token', token);
    }
    if (resp.data.code !== 0) {
      alert(resp.data.msg);
    }
    return resp.data.data; // 仅得到响应体中的data属性
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    alert(error.message); // 弹出错误消息
  }
);
// 添加请求拦截器
ins.interceptors.request.use(function (config) {
  // config 为当前的请求配置
  // 在发送请求之前做些什么
  // 这里，我们添加一个请求头
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config; // 返回处理后的配置
});

/**
 * 登录
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @return 返回登录成功的用户
 */
async function login(loginId, loginPwd) {
  return await ins.post('/api/user/login', {
    loginId,
    loginPwd,
  });
}

// // test
// (async function () {
//   const resp = await login('admin', '123123');
//   console.log(resp);
// })();

/**
 * 注册
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @param {*} nickname 昵称
 */
async function reg(loginId, loginPwd, nickname) {
  return await ins.post('/api/user/reg', { loginId, loginPwd, nickname });
}

// // test
// (async function () {
//   const resp = await reg('admin', '123123', '管理员');
//   console.log(resp);
// })();

/**
 * 验证账号是否存在
 * @param {*} loginId 账号
 */
async function exists(loginId) {
  return await ins.get('/api/user/exists', {
    params: {
      loginId,
    },
  });
}

// // test
// (async function () {
//   const resp = await exists('admin5');
//   console.log(resp);
// })();

/**
 * 恢复登录，获取当前登录的用户信息
 */
async function profile() {
  return await ins.get('/api/user/profile');
}

// // test
(async function () {
  const resp = await profile();
  console.log(resp);
})();
