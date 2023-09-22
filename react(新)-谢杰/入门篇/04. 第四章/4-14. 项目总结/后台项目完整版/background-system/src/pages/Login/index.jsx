import { LockOutlined, UserOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, message } from 'antd';
import { useState, useEffect } from 'react';
import ReactCanvasNest from 'react-canvas-nest';

// 请求方法
import AdminController from '@/services/admin';

import styles from './index.module.css';

function Login() {
  const [captcha, setCaptcha] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: true,
  });

  useEffect(() => {
    // 一进来首先需要加载验证码
    captchaClickHandle();
  }, []);

  /**
   * 提交表单，进行登录操作
   */
  async function onFinish() {
    const result = await AdminController.login(loginInfo);
    if (result.data) {
      const adminInfo = result.data;
      if (!adminInfo.data) {
        // 账号密码不正确
        message.error("账号或密码不正确");
        captchaClickHandle();
      } else if (!adminInfo.data.enabled) {
        // 账号已经被禁用
        message.warning("该账号已经被冻结，请联系管理员");
        captchaClickHandle();
      } else {
        // 说明账号密码正确
        // 存储 token
        localStorage.setItem('adminToken', adminInfo.token);
        // 跳转到后台管理系统首页
        location.href = '/';
      }
    } else {
      // 显示服务器返回的错误信息
      message.warning(result.msg);
      captchaClickHandle();
    }
  }

  /**
   * 获取新的验证码
   */
  async function captchaClickHandle() {
    const result = await AdminController.getCaptcha();
    setCaptcha(result);
  }

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newLoginInfo = { ...loginInfo };
    if (typeof newInfo === 'string') {
      newLoginInfo[key] = newInfo.trim();
    } else {
      newLoginInfo[key] = newInfo;
    }
    setLoginInfo(newLoginInfo);
  }

  return (
    <div>
      <ReactCanvasNest
        config={{
          pointColor: '255, 0, 0',
          count: 66,
          follow: false,
        }}
        style={{ zIndex: 1 }}
      />
      <div className={styles.container}>
        <h1>coder station 后台管理系统</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {/* 输入账号 */}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
              value={loginInfo.loginId}
              onChange={(e) => updateInfo(e.target.value, 'loginId')}
            />
          </Form.Item>

          {/* 输入密码 */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              value={loginInfo.loginPwd}
              onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  prefix={<BarcodeOutlined className="site-form-item-icon" />}
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, 'captcha')}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="remember" className={styles.remember}>
            <Checkbox
              checked={loginInfo.remember}
              onChange={(e) => updateInfo(e.target.checked, 'remember')}
            >
              7天免登录
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginBtn}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Login;
