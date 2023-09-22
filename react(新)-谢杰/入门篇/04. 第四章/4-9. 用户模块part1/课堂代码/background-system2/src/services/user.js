import { request } from 'umi';

/**
 * 分页获取用户信息
 */

function getUserByPage(params) {
  return request('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 根据用户 id 获取用户详情
 */

function getUserById(userId) {
  return request(`/api/user/${userId}`, {
    method: 'GET',
  });
}

/**
 * 新增用户
 */
function addUser(newUserInfo) {
  return request('/api/user', {
    method: 'POST',
    data: newUserInfo,
  });
}

/**
 * 根据 id 删除用户
 */
function deleteUser(userId) {
  return request(`/api/user/${userId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 修改用户
 */
function editUser(userId, newUserInfo) {
  return request(`/api/user/${userId}`, {
    method: 'PATCH',
    data: newUserInfo,
  });
}

export default {
  getUserByPage,
  getUserById,
  addUser,
  deleteUser,
  editUser,
};
