import request from '@/utils/request'

// 分页获取评论
export function getComment(page = 1, limit = 10) {
    return request({
        url: '/api/comment',
        method: 'GET',
        params: {
            page,
            limit
        }
    })
}

// 删除评论
export function delComment(id) {
    return request.delete(`/api/comment/${id}`);
}