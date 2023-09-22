import request from "./request";

/**
 * 新增评论
 */

export function addComment(newComment) {
  return request("/api/comment", {
    method: "POST",
    data: newComment,
  });
}

/**
 * 根据 issueId 获取该问答所对应的评论
 */

export function getIssueCommentById(id, params) {
  return request(`/api/comment/issuecomment/${id}`, {
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 根据 bookId 获取该书籍所对应的评论
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export function getBookCommentById(id, params) {
  return request(`/api/comment/bookcomment/${id}`, {
    method: "GET",
    params: {
      ...params,
    },
  });
}
