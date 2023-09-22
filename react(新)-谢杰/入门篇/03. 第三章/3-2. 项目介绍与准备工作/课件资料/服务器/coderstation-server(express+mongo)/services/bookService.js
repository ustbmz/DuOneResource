const {
  findBookByPageDao,
  findBookByIdDao,
  addBookDao,
  deleteBookDao,
  updateBookDao,
} = require("../dao/bookDao");
const {
  findBookCommentByIdDao,
  deleteCommentDao,
} = require("../dao/commentDao");
const { validate } = require("validate.js");
const { bookRule } = require("./rules");
const { ValidationError } = require("../utils/errors");

/**
 * 按分页查询书籍
 */
module.exports.findBookByPageService = async function (queryObj) {
  return await findBookByPageDao(queryObj);
};

/**
 * 根据 id 获取其中一本书籍信息
 */
module.exports.findBookByIdService = async function (id) {
  return await findBookByIdDao(id);
};

/**
 * 新增书籍
 */
module.exports.addBookService = async function (newBookInfo) {
  console.log(newBookInfo,'newBookInfo');
  // 首先进行同步的数据验证
  const validateResult = validate.validate(newBookInfo, bookRule);
  if (!validateResult) {
    // 验证通过

    // 添加其他的信息
    newBookInfo.scanNumber = 0; // 浏览数，默认为 0
    newBookInfo.commentNumber = 0; // 评论数，默认为 0
    // 上架日期
    newBookInfo.onShelfDate = new Date().getTime().toString();

    // 如果没有上传图片，则默认给一张图片
    if(!newBookInfo.bookPic){
      newBookInfo.bookPic = '/static/imgs/noPic.jpg';
    }
    return await addBookDao(newBookInfo);
  } else {
    // 数据验证失败
    return new ValidationError("数据验证失败");
  }
};

/**
 * 删除书籍
 */
module.exports.deleteBookService = async function (id) {
  // 首先需要删除该书籍对应的评论

  // 获取该 bookId 对应的所有评论
  const commentResult = await findBookCommentByIdDao(id);
  console.log(commentResult,'commentResult');
  for (let i = 0; i < commentResult.length; i++) {
    await deleteCommentDao(commentResult[i]._id);
  }

  // 接下来再删除该书籍
  return await deleteBookDao(id);
};

/**
 * 修改书籍
 */
module.exports.updateBookService = async function (id, newInfo) {
  return await updateBookDao(id, newInfo);
};
