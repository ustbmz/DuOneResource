// 引入模型
const bookModel = require("../models/bookModel");

const {findTypeByTypeName} = require("./typeDao");

/**
 * 分页查找书籍
 */
module.exports.findBookByPageDao = async function (queryObj) {
  const pageObj = {
    currentPage: Number(queryObj.current),
    eachPage: Number(queryObj.pageSize),
  };

  const queryCondition = {};
  if(queryObj.bookTitle){
    // 用户要按照书籍标题进行搜索
    queryCondition.bookTitle = new RegExp(queryObj.bookTitle,"i");
  }
  if(queryObj.typeId){
    // 用户要按照分类进行搜索
    queryCondition.typeId = queryObj.typeId;
  }
  pageObj.count = await bookModel.countDocuments(queryCondition); // 数据总条数
  pageObj.totalPage = Math.ceil(pageObj.count / pageObj.eachPage); // 总页数
  pageObj.data = await bookModel
    .find(queryCondition)
    .skip((pageObj.currentPage - 1) * pageObj.eachPage) // 设置跳过的数据条数
    .sort({ onShelfDate: -1 })
    .limit(pageObj.eachPage); // 查询条数
  return pageObj;
};

/**
 * 根据 id 获取其中一本书籍信息
 */
module.exports.findBookByIdDao = async function (id) {
  return bookModel.findOne({
    _id: id,
  });
};

/**
 * 新增书籍
 */
module.exports.addBookDao = async function (newBookInfo) {
  console.log(newBookInfo,'baga');
  return await bookModel.create(newBookInfo);
};

/**
 * 根据 id 删除书籍
 */
module.exports.deleteBookDao = async function (id) {
  return bookModel.deleteOne({
    _id: id,
  });
};

/**
 * 根据 id 修改书籍
 */

module.exports.updateBookDao = async function (id, newInfo) {
  return bookModel.updateOne({ _id: id }, newInfo);
};

