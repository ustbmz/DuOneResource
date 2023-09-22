import request from "../utils/request";

const baseURL = "http://localhost:3000";

/**
 * 获取学生列表
 * @returns
 */
export function getStuListApi() {
  return request(baseURL + "/students");
}

/**
 * 根据 id 获取学生详细信息
 */
export function getStuByIdApi(id) {
  return request(baseURL + `/students/${id}`);
}

/**
 * 根据 id 删除一名学生
 */
export function deleteStuApi(id) {
  return request(baseURL + `/students/${id}`, {
    method: "DELETE",
  });
}

/**
 * 添加学生
 */
export function addStuApi(data) {
  console.log(data);
  return request(baseURL + "/students", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data) ,
  });
}

/**
 * 根据 id 修改学生
 */
export function editStuByIdApi(data) {
  return request(baseURL + `/students/${data.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data.newInfo) ,
  });
}
