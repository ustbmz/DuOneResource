import request from '@/utils/request'

export async function getSetting() {
  return await request.get("/api/setting");
}

export function setSetting(data) {
    return request({
        url: '/api/setting',
        method: 'put',
        data
    })
}
