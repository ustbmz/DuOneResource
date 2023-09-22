const {
  findAllTypeDao,
  addTypeDao,
  deleteTypeDao,
  updateTypeDao,
} = require("../dao/typeDao");
const { validate } = require("validate.js");
const { typeRule } = require("./rules");
const { ValidationError } = require("../utils/errors");

/**
 * 查询所有类型
 */
module.exports.findAllTypeService = async function () {
  return await findAllTypeDao();
};

/**
 * 增加类型
 */
module.exports.addTypeService = async function (newTypeInfo) {
    // 首先要进行验证，查看该类型是否已经存在
    return validate.async(newTypeInfo, typeRule).then(async function(){
        return await addTypeDao(newTypeInfo);
    },function(){
        return new ValidationError("数据验证失败"); 
    })
};

/**
 * 根据 id 删除类型
 */
module.exports.deleteTypeService = async function (id) {
  return await deleteTypeDao(id);
};

/**
 * 根据 id 修改类型
 */
module.exports.updateTypeService = async function (id, newInfo) {
  return await updateTypeDao(id, newInfo);
};
