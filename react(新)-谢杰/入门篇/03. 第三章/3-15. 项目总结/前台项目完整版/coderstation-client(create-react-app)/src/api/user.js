import request from "./request";

/**
 * 根据 id 获取用户信息
 */

export function getUserById(userId) {
  return request(`/api/user/${userId}`, {
    method: "GET",
  });
}

/**
 * 根据 loginId 判断用户是否存在
 * @param {*} loginId
 * @returns
 */
export function userIsExist(loginId) {
  return request(`/api/user/userIsExist/${loginId}`, {
    method: "GET",
  });
}

/**
 * 用户注册
 */
export function addUser(newUserInfo) {
  return request("/api/user", {
    method: "POST",
    data: newUserInfo,
  });
}

/**
 * 根据 id 修改用户
 */

export function editUser(userId, newUserInfo) {
  return request(`/api/user/${userId}`, {
    method: "PATCH",
    data: newUserInfo,
  });
}

/**
 * 根据用户 id 确认密码是否正确
 */

export function checkPasswordIsRight(userId, loginPwd) {
  return request("/api/user/passwordcheck", {
    method: "POST",
    data: {
      userId,
      loginPwd,
    },
  });
}

/**
 * 用户登录
 */

export function userLogin(loginInfo) {
  return request("/api/user/login", {
    method: "POST",
    data: loginInfo
  });
}

/**
 * 恢复登录状态
 */

export function getInfo() {
  return request({
    url: "/api/user/whoami",
    method: "get",
  });
}

/**
 * 获取验证码
 */
export function getCaptcha() {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
}

/**
 * 获取积分前十的用户
 */
export function getUserByPointsRank(){
  return request({
    url: "/api/user/pointsrank",
    method: "GET"
  })
}
