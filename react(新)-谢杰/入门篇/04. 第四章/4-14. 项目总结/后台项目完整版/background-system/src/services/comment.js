import { request } from 'umi';

/**
 * 分页获取某一个板块的评论
 */
function getCommentByType(params, commentType) {
  return request(`/api/comment/${commentType}`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 根据 id 删除评论
 */
function deleteComment(commentId) {
  return request(`/api/comment/${commentId}`, {
    method: 'DELETE',
  });
}

export default {
  getCommentByType,
  deleteComment,
};
