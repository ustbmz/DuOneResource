const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { validate } = require("validate.js");
const {
  findAllAdminDao,
  loginDao,
  addAdminDao,
  deleteAdminDao,
  findAdminByIdDao,
  updateAdminDao,
  findAdminByLoginId
} = require("../dao/adminDao");
const { adminRule } = require("./rules");
const { ValidationError } = require("../utils/errors");
const { randomAvatar } = require("../utils/tools");

/**
 * 查询所有的管理员的业务逻辑
 * @returns 返回查询结果
 */
module.exports.findAllAdminService = async function () {
  return await findAllAdminDao();
};

/**
 * 登录的业务逻辑
 * @param {*} loginInfo
 */
module.exports.loginService = async function (loginInfo) {
  // 1. 首先对用户输入的密码进行加密
  loginInfo.loginPwd = md5(loginInfo.loginPwd);

  // 2. 接下来调用持久层的方法进行查询
  let data = await loginDao(loginInfo);

  // 3. 根据查询结果，来决定是否添加 token
  if (data) {
    // 说明用户填写的账号密码正确

    // 接下来需要判断该管理员的状态
    if (!data.enabled) {
      return {
        data: {
          _id: data._id,
          loginId: data.loginId,
          enabled: data.enabled,
        },
      };
    }
    // 添加 token
    data = {
      _id: data._id,
      loginId: data.loginId,
      enabled: data.enabled,
    };
    var loginPeriod = 1; // token 的有效时间默认是 1 天
    if (loginInfo.remember) {
      // 进入此 if，说明用户勾选了 7 天有效，token 的有效时长就为 7 天
      loginPeriod = process.env.LOGIN_PERIOD;
    }
    // 生成 token
    const token = jwt.sign(data, md5(process.env.JWT_SECRET), {
      expiresIn: 60 * 60 * 24 * loginPeriod,
    });
    return {
      data,
      token,
    };
  }
  // 没有进入上面的 if，说明账号密码不正确
  return {
    data,
  };
};

/**
 * 添加一个新的管理员
 * @param {*} newAdminInfo
 * @returns
 */
module.exports.addAdminService = async function (newAdminInfo) {
  // 首先需要进行验证，验证通过后才能添加至数据库
  return validate.async(newAdminInfo, adminRule).then(
    async function () {
      // success
      // 说明验证成功

      // 密码如果传递了就使用传递的密码，否则使用默认值
      if (!newAdminInfo.loginPwd) {
        // 用户没有填写密码，则使用默认值
        newAdminInfo.loginPwd = md5(process.env.NEW_ADMIN_PASSWORD);
      } else {
        newAdminInfo.loginPwd = md5(newAdminInfo.loginPwd);
      }

      if (!newAdminInfo.avatar) {
        // 如果用户没有上传头像，则使用随机头像
        newAdminInfo.avatar = await randomAvatar();
      }
      if (!newAdminInfo.nickname) {
        // 如果用户没有书写昵称，则使用默认的管理员昵称
        newAdminInfo.nickname = process.env.NEW_ADMIN_NICKNAME;
      }
      // 默认是可用状态
      newAdminInfo.enabled = true;

      return await addAdminDao(newAdminInfo);
    },
    function () {
      return new ValidationError("数据验证失败");
    }
  );
};

/**
 * 根据 id 删除管理员
 * @param {*} id
 * @returns
 */
module.exports.deleteAdminService = async function (id) {
  return await deleteAdminDao(id);
};

/**
 * 根据 id 来查找管理员
 * @param {*} id
 * @returns
 */
module.exports.findAdminByIdService = async function (id) {
  return await findAdminByIdDao(id);
};

/**
 * 根据 id 来更新管理员信息
 * @param {*} id
 * @param {*} newInfo
 * @returns
 */
module.exports.updateAdminService = async function (id, newInfo) {
  // 根据 id 获取该管理员原来的信息（主要是为了处理密码）
  const adminInfo = await findAdminByIdDao(id);
  if (newInfo.loginPwd && newInfo.loginPwd !== adminInfo.loginPwd) {
    // 如果传递了密码
    // 并且传递过来的的密码和原来的密码不相等，则说明密码变了，需要重新加密
    newInfo.loginPwd = md5(newInfo.loginPwd);
  }
  return await updateAdminDao(id, newInfo);
};

/**
 *
 * @param {*} loginId 管理员的登录账号
 */
 module.exports.adminIsExistService = async function (loginId) {
  const data = await findAdminByLoginId(loginId);
  if (data.length) {
    return true;
  } else {
    return false;
  }
};