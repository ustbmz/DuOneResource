import { request } from '@umijs/max';

/**
 * 获取所有的管理员
 */
function getAdmin() {
  return request('/api/admin', {
    method: 'GET',
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
 * 新增管理员
 */
function addAdmin(newAdminInfo) {
  return request('/api/admin', {
    method: 'POST',
    data: newAdminInfo,
  });
}

/**
 * 根据 loginId 查找管理员
 */
function adminIsExist(loginId) {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}

export default {
  getAdmin,
  deleteAdmin,
  editAdmin,
  addAdmin,
  adminIsExist
};
