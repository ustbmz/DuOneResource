const {
  findInterviewByPageDao,
  findInterviewTitleByTypeDao,
  findInterviewByIdDao,
  addInterviewDao,
  deleteInterviewDao,
  updateInterviewDao,
} = require("../dao/interviewDao");

const { validate } = require("validate.js");
const { interviewRule } = require("./rules");
const { ValidationError } = require("../utils/errors");

/**
 * 按照分页查询面试题
 */
module.exports.findInterviewByPageService = async function (queryObj) {
  return await findInterviewByPageDao(queryObj);
};

/**
 * 获取所有分类的面试题标题
 */
module.exports.findInterviewTitleByTypeService = async function () {
  return await findInterviewTitleByTypeDao();
};

/**
 * 根据 id 查找某一道面试题
 */
module.exports.findInterviewByIdService = async function (id) {
  return await findInterviewByIdDao(id);
};

/**
 * 新增面试题
 */
module.exports.addInterviewService = async function (newInterviewInfo) {
  // 首先进行同步的数据验证
  const validateResult = validate.validate(newInterviewInfo, interviewRule);
  if (!validateResult) {
     // 上架日期
     newInterviewInfo.onShelfDate = new Date().getTime().toString();
    // 验证通过
    return await addInterviewDao(newInterviewInfo);
  } else {
    // 数据验证失败
    return new ValidationError("数据验证失败");
  }
};

/**
 * 删除面试题
 */
 module.exports.deleteInterviewService = async function (id) {
    // 接下来再删除该书籍
    return await deleteInterviewDao(id);
  };


/**
 * 修改面试题
 */
 module.exports.updateInterviewService = async function (id, newInfo) {
    return await updateInterviewDao(id, newInfo);
  };
