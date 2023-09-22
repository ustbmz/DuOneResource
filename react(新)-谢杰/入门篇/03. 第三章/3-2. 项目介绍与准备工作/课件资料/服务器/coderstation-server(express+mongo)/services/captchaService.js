const svgCaptcha = require("svg-captcha");

// 生成验证码方法
module.exports.getCaptchaService = async function(){
    return svgCaptcha.create({
        size : 4,
        ignoreChars : "iIl10Oo",
        noise : 6,
        color : true
    });
}