import * as doms from './doms.js';
import { login } from './api/user.js';
// 导出一个函数，调用该函数，会自动获取文本框的值完成登录
let isLoginning = false; // 当前是否正在登录中

export default async function () {
  if (isLoginning) {
    return; //正在登录中
  }
  isLoginning = true;
  doms.btnSubmit.value = '登录中...';
  // 1.获取当前的账号密码
  const loginId = doms.userName.value;
  const loginPwd = doms.userPassword.value;

  // 2. 做一些简单的验证
  if (!loginId) {
    alert('请填写账号');
    return;
  }
  if (!loginPwd) {
    alert('请填写密码');
    return;
  }
  // 3. 远程请求
  const resp = await login(loginId, loginPwd);
  if (resp) {
    alert(`登录成功，欢迎你，${resp.nickname}`);
  } else {
    alert('登录失败');
  }
  isLoginning = false;
  doms.btnSubmit.value = '登录';
}
