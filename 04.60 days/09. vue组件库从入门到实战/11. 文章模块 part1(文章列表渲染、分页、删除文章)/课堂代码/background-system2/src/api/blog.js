import request from '@/utils/request'

// 分页获取文章
// page 代表页码数，limit 代表每一页显示的数量
export function findBlog(page=1,limit=10){
    return request({
        url : '/api/blog',
        method : 'get',
        params : {
            page,
            limit
        }
    })
}


// 删除文章
export function delOneBlog(id){
    return request({
        url : `/api/blog/${id}`,
        method : 'delete'
    })
}