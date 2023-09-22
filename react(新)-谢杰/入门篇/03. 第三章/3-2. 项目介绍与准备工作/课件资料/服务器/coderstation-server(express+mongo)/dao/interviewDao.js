// 引入模型
const interviewModel = require("../models/interviewModel");
const { findAllTypeDao } = require("./typeDao");

/**
 * 分页查找面试题
 */
module.exports.findInterviewByPageDao = async function (queryObj) {
  const pageObj = {
    currentPage: Number(queryObj.current),
    eachPage: Number(queryObj.pageSize),
  };

  const queryCondition = {};
  if (queryObj.interviewTitle) {
    // 用户要按照书籍标题进行搜索
    queryCondition.interviewTitle = new RegExp(queryObj.interviewTitle, "i");
  }
  if (queryObj.typeId) {
    // 用户要按照分类进行搜索
    queryCondition.typeId = queryObj.typeId;
  }

  pageObj.count = await interviewModel.countDocuments(queryCondition); // 数据总条数
  pageObj.totalPage = Math.ceil(pageObj.count / pageObj.eachPage); // 总页数
  pageObj.data = await interviewModel
    .find(queryCondition)
    .skip((pageObj.currentPage - 1) * pageObj.eachPage) // 设置跳过的数据条数
    .sort({ onShelfDate: -1 })
    .limit(pageObj.eachPage); // 查询条数

  return pageObj;
};

/**
 * 获取所有分类的面试题标题
 */
module.exports.findInterviewTitleByTypeDao = async function () {
  // 1. 获取所有分类
  const typeData = await findAllTypeDao();

  const interviewTitleData = [];
  for (let i = 0; i < typeData.length; i++) {
    // 查询对应 typeId 的面试题，只需要题目即可
    // 因此后面添加了 { interviewTitle: 1 }
    const data = await interviewModel.find(
      {
        typeId: typeData[i]._id,
      },
      { interviewTitle: 1 }
    );
    interviewTitleData.push(data);
  }
  return interviewTitleData;
};

/**
 * 根据 id 返回面试题
 */
module.exports.findInterviewByIdDao = async function (id) {
  return interviewModel.findOne({
    _id: id,
  });
};

/**
 * 新增面试题
 */
module.exports.addInterviewDao = async function (newInterviewInfo) {
  return await interviewModel.create(newInterviewInfo);
};

/**
 * 根据 id 删除面试题
 */
module.exports.deleteInterviewDao = async function (id) {
  return interviewModel.deleteOne({
    _id: id,
  });
};

/**
 * 根据 id 修改面试题
 */
module.exports.updateInterviewDao = async function (id, newInfo) {
  return interviewModel.updateOne({ _id: id }, newInfo);
};
