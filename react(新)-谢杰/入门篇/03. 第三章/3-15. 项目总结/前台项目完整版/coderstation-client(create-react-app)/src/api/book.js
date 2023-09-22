import request from "./request";

/**
 * 分页获取书籍
 */
export function getBookByPage(params) {
  return request("/api/book", {
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 根据 id 获取书籍详情
 */
export function getBookById(bookId) {
  return request(`/api/book/${bookId}`, {
    method: "GET",
  });
}

/**
 * 修改问答（主要是回答数和浏览数）
 */
 export function updateBook(bookId, newBookInfo) {
  return request(`/api/book/${bookId}`, {
    method: "PATCH",
    data: newBookInfo,
  });
}
