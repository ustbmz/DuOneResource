// 引入模型
const userModel = require("../models/userModel");

/**
 * 根据分页信息查找用户
 * @param {*} param0
 */
module.exports.findUserByPageDao = async function (queryObj) {
  const pageObj = {
    currentPage: Number(queryObj.current),
    eachPage: Number(queryObj.pageSize),
  };

  const queryCondition = {};
  if (queryObj.loginId) {
    // 用户要按照书籍标题进行搜索
    queryCondition.loginId = new RegExp(queryObj.loginId, "i");
  }
  if (queryObj.nickname) {
    // 用户要按照分类进行搜索
    queryCondition.nickname = new RegExp(queryObj.nickname, "i");
  }

  pageObj.count = await userModel.countDocuments(queryCondition); // 数据总条数
  pageObj.totalPage = Math.ceil(pageObj.count / pageObj.eachPage); // 总页数
  pageObj.data = await userModel
    .find(queryCondition)
    .skip((pageObj.currentPage - 1) * pageObj.eachPage) // 设置跳过的数据条数
    .sort({ registerDate: -1 })
    .limit(pageObj.eachPage); // 查询条数
  return pageObj;
};

/**
 * 查询积分前 10 名的用户
 * @returns 
 */
module.exports.findUserByPointsRankDao = async function () {
  return await userModel.find().sort({ points: -1, registerDate: -1 }).limit(10);
};

/**
 * 登录
 * @param {*} 用户输入的账号密码
 * @returns 返回查询到的数据
 */
module.exports.loginDao = async function ({ loginId, loginPwd }) {
  return await userModel.findOne({ loginId, loginPwd });
};

/**
 * 添加新的用户
 * @param {*} newUserInfo 新管理员信息
 * @returns
 */
module.exports.addUserDao = async function (newUserInfo) {
  return await userModel.create(newUserInfo);
};

/**
 * 根据 id 删除用户
 * @param {*} id
 */
module.exports.deleteUserDao = async function (id) {
  return userModel.deleteOne({
    _id: id,
  });
};

/**
 * 根据 id 查找用户
 * @param {*} id 要查找的用户 id
 * @returns
 */
module.exports.findUserByIdDao = async function (id) {
  return userModel.findOne({
    _id: id,
  });
};

/**
 * 根据 id 修改某一位用户的某一项信息
 * @param {*} id 要修改的用户 id
 * @param {*} newInfo 要修改的信息
 */
module.exports.updateUserDao = async function (id, newInfo) {
  return userModel.updateOne({ _id: id }, newInfo);
};

/**
 * 根据 loginId 查找用户
 * @param {*} loginId
 * @returns
 */
module.exports.findUserByLoginId = async function (loginId) {
  return await userModel.find({ loginId });
};
