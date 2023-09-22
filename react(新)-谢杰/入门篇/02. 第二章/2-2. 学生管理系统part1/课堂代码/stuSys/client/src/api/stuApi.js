// 封装我们的请求函数

import request from "./request";

export function getStuListApi(){
    return request({
        url : "/students",
        method : "GET",
    })
}