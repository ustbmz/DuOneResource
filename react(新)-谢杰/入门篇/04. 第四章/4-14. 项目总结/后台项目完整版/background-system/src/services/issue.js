import { request } from 'umi';

/**
 * 分页获取问答
 */
function getIssueByPage(params) {
  return request('/api/issue', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 根据 id 获取问答详情
 */
function getIssueById(issueId) {
  return request(`/api/issue/${issueId}`, {
    method: 'GET',
  });
}

/**
 * 根据 id 删除问答
 */
function deleteIssue(issueId) {
  return request(`/api/issue/${issueId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 编辑问答
 */
function editIssue(issueId, issueInfo) {
  return request(`/api/issue/${issueId}`, {
    method: 'PATCH',
    data: issueInfo,
  });
}

export default {
  getIssueByPage,
  getIssueById,
  deleteIssue,
  editIssue,
};
