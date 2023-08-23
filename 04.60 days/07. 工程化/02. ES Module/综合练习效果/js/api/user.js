export function login(username, password) {
  return fetch('https://study.duyiedu.com/api/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ loginId: username, loginPwd: password }),
  })
    .then((resp) => resp.json())
    .then((resp) => resp.data);
}
