import request from "./request";

/**
 * 根据问答的 id 获取对应的评论
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export function getIssueCommentById(id, params) {
  return request({
    url: `/api/comment/issuecomment/${id}`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
