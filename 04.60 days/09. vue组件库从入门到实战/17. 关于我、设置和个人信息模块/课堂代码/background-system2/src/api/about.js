import request from '@/utils/request'

export function getAbout() {
    return request.get("/api/about");
}

export function editAbout(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data
    })
}