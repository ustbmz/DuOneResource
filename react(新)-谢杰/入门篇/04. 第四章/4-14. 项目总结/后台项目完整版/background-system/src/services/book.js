import { request } from 'umi';

/**
 * 分页获取书籍
 */
function getBookByPage(params) {
  return request('/api/book', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 根据 id 获取书籍详情
 */
function getBookById(bookId) {
  return request(`/api/book/${bookId}`, {
    method: 'GET',
  });
}

/**
 * 新增书籍
 */
function addBook(newBookInfo) {
  return request('/api/book', {
    method: 'POST',
    data: newBookInfo,
  });
}

/**
 * 根据 id 删除书籍
 */

function deleteBook(bookId) {
  return request(`/api/book/${bookId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 编辑书籍
 */
function editBook(bookId, newBookInfo) {
  return request(`/api/book/${bookId}`, {
    method: 'PATCH',
    data: newBookInfo,
  });
}

export default {
  getBookByPage,
  getBookById,
  addBook,
  deleteBook,
  editBook,
};
