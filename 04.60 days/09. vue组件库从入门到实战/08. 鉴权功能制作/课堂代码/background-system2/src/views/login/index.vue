<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">个人空间后台系统</h3>
      </div>

      <!-- 管理员账号 -->
      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入管理员密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 验证码 -->
      <div class="captchaContainer">
        <el-form-item prop="captcha" class="captchaInputer">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            name="captcha"
            type="text"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <div
          class="captchaImg"
          v-html="svg"
          @click="getCaptchaFunc"
        ></div>
      </div>

      <!-- 7 天内免登录 -->
      <div style="margin-bottom:15px">
        <el-checkbox v-model="loginForm.checked">7 天内免登录</el-checkbox>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import {getCaptcha} from '@/api/captcha.js'
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };

    // 密码的验证
    const checkPassword = (rule, value, callback) =>{
      const reg = /abcd/;
      if(reg.test(value)){
        callback(); // 验证通过
      } else {
        callback(new Error('密码不符合XXX要求'));
      }
    }

    return {
      svg : '',
      loginForm : {
        loginId : '',
        loginPwd : '',
        captcha : '',
        checked : true,
      },
      loginRules : {
        // 在这里书写各个字段的验证规则
        loginId : [{
          required : true, trigger : 'blur', message : '请输入管理员账号'
        }],
        loginPwd : [{
          required : true, trigger : 'blur', message : '请输入管理员密码'
        }],
        captcha : [{
          required : true, trigger : 'blur', message : '请输入验证码'
        }]
      },
      passwordType : 'password',
      loading : false
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // 一进来就先从服务器获取验证码
    this.getCaptchaFunc();
  },
  methods: {
    getCaptchaFunc(){
      getCaptcha().then(res=>{
        this.svg = res;
      })
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录相关的方法
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
           // 进入此 if，说明表单的正则验证都是通过了的
          this.loading = true;

          if(this.loginForm.checked){
            this.loginForm.remember = 7;
          }

          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((res) => {
              // this.loading = false;
              if(typeof res === 'string'){
                // 说明是验证码错误
                this.$message.error('验证码错误');
              } else {
                // 说明是账号密码错误
                this.$message.error('账号密码错误');
              }
              // 接下来需要重新请求二维码
              this.getCaptchaFunc();
              this.loading = false;
              this.loginForm.captcha = '';
            });
        } else {
          // 说明表单有某些字段的验证没有通过
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.captchaInputer{
  width: 70%;
}
.captchaContainer{
  display: flex;
}
.captchaImg{
  width: 150px;
  height: 50px;
  margin-left: 5px;
}

</style>
