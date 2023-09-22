const jwt = require("jsonwebtoken");
const md5 = require("md5");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { UnknownError } = require("./errors");

// 格式化要响应的数据
module.exports.formatResponse = function (code, msg, data) {
  return {
    code,
    msg,
    data,
  };
};

// 解析客户端传递过来的 token
module.exports.analysisToken = function (token) {
  return jwt.verify(
    token.split(" ")[1],
    md5(process.env.JWT_SECRET),
    function (err, decode) {
      return decode;
    }
  );
};

/**
 * 读取一个目录下有多少个文件
 * @param {*} dir 目录地址
 */
async function readDirLength(dir) {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      if (err) throw new UnknownError();
      resolve(files);
    });
  });
}

/**
 * 生成一个随机头像的路径
 */
module.exports.randomAvatar = async function () {
  const files = await readDirLength("./public/static/avatar");
  const randomIndex = Math.floor(Math.random() * files.length);
  return "/static/avatar/" + files[randomIndex];
};

// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/static/uploads");
  },
  // 上传到服务器的文件，文件名要做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    const basename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    // 获取后缀名
    const extname = path.extname(file.originalname);
    // 构建新的名字
    const newName =
      basename +
      new Date().getTime() +
      Math.floor(Math.random() * 9000 + 1000) +
      extname;
    cb(null, newName);
  },
});

// 文件上传
module.exports.uploading = multer({
  storage: storage,
  limits: {
    fileSize: 2000000,
    files: 1,
  },
});
