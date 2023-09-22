import { request } from 'umi';

/**
 * 获取所有的管理员
 * @returns 管理员数据
 */
function getAdmin() {
  return request('/api/admin', {
    method: 'GET',
  });
}

/**
 * 新增管理员
 */
function addAdmin(newAdminInfo) {
  return request('/api/admin', {
    method: 'POST',
    data: newAdminInfo,
  });
}

/**
 * 删除管理员
 */
function deleteAdmin(adminId) {
  return request(`/api/admin/${adminId}`, {
    method: 'DELETE',
  });
}

/**
 * 修改管理员信息
 */
function editAdmin(adminId, newAdminInfo) {
  return request(`/api/admin/${adminId}`, {
    method: 'PATCH',
    data: newAdminInfo,
  });
}

/**
 * 根据 id 获取管理员
 */
function getAdminById(adminId) {
  return request(`/api/admin/${adminId}`, {
    method: 'GET',
  });
}

/**
 * 获取验证码
 */

function getCaptcha() {
  return request('/res/captcha', {
    method: 'GET',
  });
}

/**
 * 管理员登录
 */
function login(loginInfo) {
  return request('/api/admin/login', {
    method: 'POST',
    data: loginInfo,
  });
}

/**
 * 恢复登录状态
 */

function getInfo() {
  return request('/api/admin/whoami', {
    method: 'GET',
  });
}

/**
 * 根据 loginId 查找用户
 */
function adminIsExist(loginId){
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}

export default {
  getAdmin,
  addAdmin,
  deleteAdmin,
  editAdmin,
  getAdminById,
  getCaptcha,
  login,
  getInfo,
  adminIsExist
};
