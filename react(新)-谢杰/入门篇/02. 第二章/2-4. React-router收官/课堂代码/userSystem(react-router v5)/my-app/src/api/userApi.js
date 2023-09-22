import request from "./request";

// 获取用户列表
export function getUserListApi() {
  return request({
    url: "/users", //请求路由
    method: "get", //请求方式
  });
}

// 添加用户
export function addUserApi(data) {
  return request({
    url: "/users", //请求路由
    method: "post", //请求方式
    data,
  });
}

// 获取用户详细信息
export function getUserByIdApi(id) {
  return request({
    url: `/users/${id}`, //请求路由
    method: "get", //请求方式
  });
}

// 删除用户
export function deleteUserApi(id) {
  return request({
    url: `/users/${id}`, //请求路由
    method: "delete", //请求方式
  });
}

// 编辑用户
export function editUserApi(id, data) {
  return request({
    url: `/users/${id}`, //请求路由
    method: "patch", //请求方式
    data,
  });
}
