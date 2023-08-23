// 负责和用户相关的远程请求
// 具名导出一个登录方法
export async function login(loginId, loginPwd) {
  const resp = await fetch('https://study.duyiedu.com/api/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ loginId, loginPwd }),
  }).then((resp) => resp.json());
  return resp.data;
}
