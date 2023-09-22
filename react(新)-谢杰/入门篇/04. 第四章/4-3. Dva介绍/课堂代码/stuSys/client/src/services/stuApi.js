import request from '../utils/request';

const baseURL = " http://localhost:3000";

/**
 * 获取学生列表
 */
export function getStuListApi(){
    return request(baseURL + "/students");
}