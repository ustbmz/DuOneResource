import request from "./request";

/**
 * 分页获取问答
 */
export function getIssueByPage(params) {
  return request({
    url: "/api/issue",
    method: "GET",
    params: {
      ...params,
    },
  });
}
