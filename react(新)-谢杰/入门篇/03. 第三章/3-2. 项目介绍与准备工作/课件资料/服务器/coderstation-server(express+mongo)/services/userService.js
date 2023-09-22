const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { validate } = require("validate.js");

const {
  findUserByPageDao,
  loginDao,
  addUserDao,
  deleteUserDao,
  findUserByIdDao,
  updateUserDao,
  findUserByLoginId,
  findUserByPointsRankDao,
} = require("../dao/userDao");
const { userRule } = require("./rules");
const { ValidationError } = require("../utils/errors");
const { randomAvatar } = require("../utils/tools");

/**
 * 根据分页信息来查询用户
 * @returns 返回查询结果
 */
module.exports.findUserByPageService = async function (pager) {
  return await findUserByPageDao(pager);
};

/**
 * 查询积分前 10 名的用户
 */
module.exports.findUserByPointsRankService = async function () {
  return await findUserByPointsRankDao();
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

    // 接下来需要判断用户的状态
    if (!data.enabled) {
      // 用户已经被禁用
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
 * 用户注册
 * @param {*} newUserInfo
 * @returns
 */
module.exports.addUserService = async function (newUserInfo) {
  console.log("newUserInfo", newUserInfo);

  // 首先需要进行验证，验证通过后才能添加至数据库
  return validate.async(newUserInfo, userRule).then(
    async function () {
      // 说明验证成功

      // 密码如果传递了就使用传递的密码，否则使用默认值
      if (!newUserInfo.loginPwd) {
        // 用户没有填写密码，则使用默认值
        newUserInfo.loginPwd = md5(process.env.NEW_USER_PASSWORD);
      } else {
        // 密码加密
        newUserInfo.loginPwd = md5(newUserInfo.loginPwd);
      }

      // 创建时间
      newUserInfo.registerDate = new Date().getTime().toString();
      // 上次登录时间
      newUserInfo.lastLoginDate = newUserInfo.registerDate;
      // 初始积分
      newUserInfo.points = 100;

      // 默认是可用状态
      newUserInfo.enabled = true;

      if (!newUserInfo.avatar) {
        // 如果用户没有上传头像，则使用随机头像
        newUserInfo.avatar = await randomAvatar();
      }

      if (!newUserInfo.nickname) {
        // 如果用户没有书写昵称，则使用默认的昵称（默认值 + 时间戳的后 6 位 + 1000 以内随机数）
        newUserInfo.nickname =
          process.env.NEW_USER_NICKNAME +
          newUserInfo.registerDate.split("").reverse().join("").slice(0, 6) +
          Math.floor(Math.random() * 1000 + 1);
      }

      if (!newUserInfo.intro) {
        // 个人介绍
        newUserInfo.intro = "";
      }

      if (!newUserInfo.mail) {
        // qq
        newUserInfo.mail = "";
      }

      if (!newUserInfo.qq) {
        // 邮箱
        newUserInfo.qq = "";
      }

      if (!newUserInfo.wechat) {
        // 微信
        newUserInfo.wechat = "";
      }

      return await addUserDao(newUserInfo);
    },
    function () {
      return new ValidationError("数据验证失败");
    }
  );
};

/**
 * 根据 id 删除用户
 * @param {*} id
 * @returns
 */
module.exports.deleteUserService = async function (id) {
  return await deleteUserDao(id);
};

/**
 * 根据 id 来查找用户
 * @param {*} id
 * @returns
 */
module.exports.findUserByIdService = async function (id) {
  return await findUserByIdDao(id);
};

/**
 * 根据 id 来更新用户信息
 * @param {*} id
 * @param {*} newInfo
 * @returns
 */
module.exports.updateUserService = async function (id, newInfo) {
  // 根据 id 获取该用户原来的信息
  const userInfo = await findUserByIdDao(id);
  if (newInfo.loginPwd && newInfo.loginPwd !== userInfo.loginPwd) {
    // 如果传递了密码
    // 并且传递过来的的密码和原来的密码不相等，则说明密码变了，需要重新加密
    newInfo.loginPwd = md5(newInfo.loginPwd);
  }

  return await updateUserDao(id, newInfo);
};

/**
 *
 * @param {*} loginId 用户的登录账号
 */
module.exports.userIsExistService = async function (loginId) {
  const data = await findUserByLoginId(loginId);
  if (data.length) {
    return true;
  } else {
    return false;
  }
};

/**
 * 确认用户输入的密码是否正确
 * @param {*} param0
 * @returns
 */
module.exports.passwordcheckService = async function ({ userId, loginPwd }) {
  const userInfo = await findUserByIdDao(userId);
  if (userInfo.loginPwd === md5(loginPwd)) {
    return true;
  } else {
    return false;
  }
};
