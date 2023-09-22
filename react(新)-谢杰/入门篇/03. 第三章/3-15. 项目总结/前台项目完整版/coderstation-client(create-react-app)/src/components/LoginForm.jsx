import { Modal, Radio, Form, Input, Button, Checkbox, message, Row, Col } from "antd";
import { useState, useEffect, useRef } from "react"
import { userIsExist, addUser, userLogin, getUserById, getCaptcha } from "../api/user"
import { useDispatch } from "react-redux"
import { changeLoginStatus, initUserInfo } from "../redux/userSlice"

import styles from "../css/LoginForm.module.css"

function LoginForm(props) {
    const [value, setValue] = useState(1);
    const dispatch = useDispatch();
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    })
    const [registerInfo, setRegisterInfo] = useState({
        loginId: "",
        nickname: "",
        captcha: "",
    });
    const [captcha, setCaptcha] = useState(null);

    const loginFormRef = useRef();
    const registerFormRef = useRef();

    useEffect(() => {
        // 一进来首先需要加载验证码
        captchaClickHandle();
    }, [props.isShow]);

    useEffect(() => {
        if (loginFormRef.current) {
            loginFormRef.current.setFieldsValue(loginInfo);
        }

        if (registerFormRef.current) {
            registerFormRef.current.setFieldsValue(registerInfo);
        }
    }, [loginInfo, registerInfo])



    const onChange = (e) => {
        setValue(e.target.value);
        // 切换登录和注册时，重新获取验证码
        captchaClickHandle();
    };

    /**
     * 打开登录模态框
     */
    const handleOk = () => {
        props.closeModal();
    };

    /**
     * 关闭登录模态框
     */
    const handleCancel = () => {
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: true
        })
        setRegisterInfo({
            loginId: "",
            nickname: "",
            captcha: "",
        })
        props.closeModal();
    };

    let container = "";

    // 用户填写内容时更新表单控件内容
    function updateInfo(oldInfo, newInfo, key, setInfo) {
        const obj = { ...oldInfo };
        if (typeof newInfo === 'string') {
            obj[key] = newInfo.trim();
        } else {
            obj[key] = newInfo;
        }
        setInfo(obj);
    }

    /**
   * 获取新的验证码
   */
    async function captchaClickHandle() {
        const result = await getCaptcha();
        setCaptcha(result);
    }

    if (value === 1) {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    ref={loginFormRef}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
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
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
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

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    } else {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic2"
                    autoComplete="off"
                    ref={registerFormRef}
                    onFinish={registerHandle}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号，仅此项为必填项",
                            },
                            // 验证用户是否已经存在
                            { validator: checkLoginIdIsExist },
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input
                            placeholder="请输入账号"
                            value={registerInfo.loginId}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="请输入昵称，不填写默认为新用户xxx"
                            value={registerInfo.nickname}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="registercaptcha"
                        label="验证码"
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
                                    placeholder="请输入验证码"
                                    value={registerInfo.captcha}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
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

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            注册
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    /**
     * 验证用户是否存在
     * @returns 
     */
    async function checkLoginIdIsExist() {
        if (registerInfo.loginId) {
            const { data } = await userIsExist(registerInfo.loginId);
            if (data) {
                return Promise.reject("该用户已经存在");
            }
        }

    }

    /**
     * 注册对应处理逻辑
     */
    async function registerHandle() {
        const result = await addUser({
            loginId: registerInfo.loginId,
            nickname: registerInfo.nickname,
            captcha: registerInfo.captcha
        });
        if (result.data) {
            message.success("用户注册成功，新用户默认密码123456");
            setValue(1);
            // 将用户信息存储到数据仓库
            dispatch(changeLoginStatus(true));
            dispatch(initUserInfo(result.data));
            // 注册新用户后实现自动登录
            handleCancel();
        } else {
            message.warning(result.msg);
            captchaClickHandle();
        }
    }

    /**
     * 登录对应处理逻辑
     */
    async function loginHandle() {
        const result = await userLogin(loginInfo);
        if (result.data) {
            const data = result.data;
            if (!data.data) {
                // 账号密码不正确
                message.error("账号或密码不正确");
                captchaClickHandle();
            } else if (!data.data.enabled) {
                // 账号已经被禁用
                message.warning("该账号已经被冻结，请联系管理员");
                captchaClickHandle();
            } else {
                // 说明账号密码正确，服务器端返回了 token
                // 存储该 token
                localStorage.userToken = data.token;
                // 根据 id 获取用户信息存储到数据仓库
                const result = await getUserById(data.data._id);
                dispatch(initUserInfo(result.data));
                dispatch(changeLoginStatus(true));
                handleCancel();
            }
        } else {
            message.warning(result.msg);
            captchaClickHandle();
        }
    }

    return (
        <Modal
            title="注册/登录"
            open={props.isShow}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Radio.Group
                onChange={onChange}
                value={value}
                buttonStyle="solid"
                className={styles.radioGroup}
            >
                <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
            </Radio.Group>
            {container}
        </Modal>
    );
}

export default LoginForm;