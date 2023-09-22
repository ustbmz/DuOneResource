import { request } from '@umijs/max';

/**
 * 获取所有的管理员
 */
function getAdmin(){
    return request('/api/admin',{
        method: 'GET',
    });
}

export default {
    getAdmin
}