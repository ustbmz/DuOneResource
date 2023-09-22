/**
 * 该文件负责初始化数据
 */

// 首先连接数据库
require("./connect");

// 引入数据模型
const adminModel = require("../models/adminModel");

// 密码要进行 md5 加密
const md5 = require("md5");

// 接下来开始做数据初始化操作
(async function () {
  // admin 管理员表初始化
  const adminCount = await adminModel.countDocuments();
  if (!adminCount) {
    // 进入此 if，说明该表没有数据，我们进行一个初始化
    await adminModel.create({
      loginId: "admin",
      nickname: "超级管理员",
      loginPwd: md5("123456"),
      avatar: "/static/imgs/yinshi.jpg",
      permission: 1,
      enabled: true,
    });
    console.log("初始化管理员数据完毕...");
  }
})();
