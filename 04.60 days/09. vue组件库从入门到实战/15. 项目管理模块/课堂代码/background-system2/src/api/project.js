// 项目与 demo
import request from '@/utils/request'

// 新增项目
export function addProject(data) {
    return request({
        url: '/api/project',
        method: 'post',
        data
    })
}

// 获取项目
export function getProject() {
    return request.get("/api/project");
}

// 修改项目
export function setProject(id, data) {
    return request({
        url: `/api/project/${id}`,
        method: 'put',
        data
    })
}

// 删除项目
export function delProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: 'DELETE',
    })
}