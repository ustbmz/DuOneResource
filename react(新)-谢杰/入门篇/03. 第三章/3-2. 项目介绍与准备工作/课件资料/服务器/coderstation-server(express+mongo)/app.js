const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const { ServiceError, UnknownError } = require("./utils/errors");

// 默认读取项目根目录下的 .env 环境变量文件
require("dotenv").config();
// 进行数据库初始化
require("./db/init");

// 引入路由
const bookRouter = require("./routes/book");
const issueRouter = require("./routes/issue");
const adminRouter = require("./routes/admin");
const captchaRouter = require("./routes/captcha");
const userRouter = require("./routes/user");
const typeRouter = require("./routes/type");
const interviewRouter = require("./routes/interview");
const commentRouter = require("./routes/comment");
const uploadRouter = require("./routes/upload");

// 创建服务器实例
const app = express();

// 使用 session 中间件
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 使用路由中间件
app.use("/api/book", bookRouter);
app.use("/api/issue", issueRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/type", typeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/upload", uploadRouter);
app.use("/res/captcha", captchaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理，一旦发生了错误，就会到这里来
app.use(function (err, req, res, next) {
  if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnknownError().toResponseJSON());
    throw err;
  }
});

module.exports = app;
