/**
 * 评论对应二级路由
 */

const { validate } = require("validate.js");

const {
  findCommentByPageAndTypeDao,
  addCommentDao,
  deleteCommentDao,
  findIssueCommentByIdDao,
  findBookCommentByIdDao,
} = require("../dao/commentDao");

const { commentRule } = require("./rules");
const { ValidationError } = require("../utils/errors");

/**
 * 根据分页查找对应模块评论
 */
module.exports.findCommentByPageAndTypeService = async function (
  commentType,
  pager
) {
  return await findCommentByPageAndTypeDao(commentType, pager);
};

/**
 * 按照分页获取问答模块某一问题对应的评论
 */
module.exports.findIssueCommentByIdService = async function (id, pager) {
  return await findIssueCommentByIdDao(id, pager);
};

/**
 * 按照分页获取书籍模块某一本书对应的评论
 */
module.exports.findBookCommentByIdService = async function (id, pager) {
  return await findBookCommentByIdDao(id, pager);
};

/**
 * 新增评论
 * @param {*} newCommentInfo
 * @returns
 */
module.exports.addCommentService = async function (newCommentInfo) {
  // 首先对数据进行一个处理，补全另一个 id 值为 null
  if (!newCommentInfo.issueId) {
    newCommentInfo.issueId = "";
  } else {
    newCommentInfo.bookId = "";
  }
  
  return validate.async(newCommentInfo, commentRule).then(
    async function () {
      // 增加评论日期字段
      newCommentInfo.commentDate = new Date().getTime().toString();
      return await addCommentDao(newCommentInfo);
    },
    function (e) {
      console.log(e);
      return new ValidationError("数据验证失败");
    }
  );
};

/**
 * 根据 id 删除评论
 * @param {*} id
 * @returns
 */
module.exports.deleteCommentService = async function (id) {
  return await deleteCommentDao(id);
};
