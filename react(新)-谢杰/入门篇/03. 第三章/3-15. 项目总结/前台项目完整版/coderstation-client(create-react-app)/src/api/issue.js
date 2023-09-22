import request from "./request";

/**
 * 分页获取问答
 */
export function getIssueByPage(params) {
  return request("/api/issue", {
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 新增问答
 */
export function addIssue(newIssue) {
  return request("/api/issue", {
    method: "POST",
    data: newIssue,
  });
}

/**
 * 根据 id 获取问答详情
 */

export function getIssueById(issueId) {
  return request(`/api/issue/${issueId}`, {
    method: "GET",
  });
}

/**
 * 修改问答（主要是回答数和浏览数）
 */
export function updateIssue(issueId, newIssueInfo) {
  return request(`/api/issue/${issueId}`, {
    method: "PATCH",
    data: newIssueInfo,
  });
}
