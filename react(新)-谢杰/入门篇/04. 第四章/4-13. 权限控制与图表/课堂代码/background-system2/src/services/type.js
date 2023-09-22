import { request } from 'umi';

/**
 * 获取类型列表
 */
function getType() {
  return request('/api/type', {
    method: 'GET',
  });
}

/**
 * 新增类型
 */
function addType(newTypeInfo) {
  return request('/api/type', {
    method: 'POST',
    data: newTypeInfo,
  });
}

/**
 * 根据 id 删除类型
 */
function deleteType(typeId) {
  return request(`/api/type/${typeId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 修改类型
 */
function editType(typeId, newTypeInfo) {
  return request(`/api/type/${typeId}`, {
    method: 'PATCH',
    data: newTypeInfo,
  });
}

export default {
  getType,
  addType,
  deleteType,
  editType,
};
