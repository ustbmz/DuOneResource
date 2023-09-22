// 引入模型
const typeModel = require("../models/typeModel");

/**
 * 查询所有类型
 */
module.exports.findAllTypeDao = async function () {
  return await typeModel.find();
};

/**
 * 新增类型
 */
module.exports.addTypeDao = async function (newTypeInfo) {
  return await typeModel.create(newTypeInfo);
};

/**
 * 根据 id 删除类型
 */
module.exports.deleteTypeDao = async function (id) {
  return typeModel.deleteOne({
    _id: id,
  });
};

/**
 * 根据 id 修改类型
 */
module.exports.updateTypeDao = async function (id, newInfo) {
  return typeModel.updateOne({ _id: id }, newInfo);
};

/**
 * 根据类型名称查找某一个类型
 */

module.exports.findTypeByTypeName = async function (typeName) {
  return await typeModel.find({ typeName });
};
