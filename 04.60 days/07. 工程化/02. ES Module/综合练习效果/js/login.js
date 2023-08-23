import { login as loginApi } from './api/user.js';
import { btnSubmit, txtUserName, txtUserPassword } from './doms.js';

let isLoginning = false;
export async function login() {
  if (isLoginning) {
    return;
  }
  isLoginning = true;
  btnSubmit.value = '登录中...';
  const userName = txtUserName.value.trim(),
    password = txtUserPassword.value;
  if (!userName) {
    alert('请填写账号');
    return;
  }
  if (!password) {
    alert('请填写密码');
    return;
  }
  const user = await loginApi(userName, password);
  if (user) {
    alert('登录成功，' + user.nickname);
  } else {
    alert('登录失败，账号密码错误');
    txtUserName.value = '';
    txtUserPassword.value = '';
    txtUserName.focus();
  }
  isLoginning = false;
  btnSubmit.value = '登录';
}
