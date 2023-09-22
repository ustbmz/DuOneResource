const express = require('express');
const router = express.Router();
const { getCaptchaService } = require("../services/captchaService");
const { formatResponse } = require("../utils/tools");

// 返回验证码
router.get('/', async function(req, res, next) {
    // 生成一个验证码
    const captcha = await getCaptchaService();
    // 将生成的验证码保存至 session
    req.session.captcha = captcha.text;
    console.log(req.session.captcha,'req.session.captcha>>>');
    // 设置响应头
    res.setHeader("Content-Type","image/svg+xml");
    // 将验证码返回给客户端
    res.send(captcha.data);
});

module.exports = router;