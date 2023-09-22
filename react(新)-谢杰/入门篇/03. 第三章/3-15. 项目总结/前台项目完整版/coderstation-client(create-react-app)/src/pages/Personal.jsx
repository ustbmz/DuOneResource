import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUserInfo, updateStoreUserInfo } from "../redux/userSlice"

import PageHeader from "../components/PageHeader"
import PersonalInfoItem from "../components/PersonalInfoItem"

import { Card, Button, Upload, Image, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { formatDate } from "../utils/tool"
import { checkPasswordIsRight } from "../api/user"
import styles from "../css/Personal.module.css"

function Personal(props) {
    const { userInfo } = useSelector(state => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [panelName, setPanelName] = useState("");
    const [editInfo, setEditInfo] = useState({});
    const [passwordInfo, setPasswordInfo] = useState({
        oldpassword: "", // 旧密码
        newpassword: "", // 新密码
        passwordConfirm: "", // 确认密码
    });
    const dispatch = useDispatch();

    const showModal = (name) => {
        setPanelName(name);
        console.log(userInfo);

        // 每次打开模态框的时候，清空上一次提交的新内容信息
        setEditInfo({});
        setIsModalOpen(true);
    };

    /**
     * 模态框点击确定时的回调
     */
    const handleOk = () => {
        console.log(editInfo);
        // 派发异步 action
        dispatch(updateUserInfo({
            userId: userInfo._id,
            newInfo: editInfo
        }));
        setIsModalOpen(false);
        message.success("信息修改成功！");
    };

    /**
     * 模态框点击取消时的回调
     */
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /**
     * 上传头像时单独处理
     * @param {*} newInfo 
     * @param {*} key 
     */
    function handleAvatar(newInfo, key) {
        const newAvatar = { [key]: newInfo };
        dispatch(updateStoreUserInfo(newAvatar));
        dispatch(updateUserInfo({
            userId: userInfo._id,
            newInfo: newAvatar
        }));
        message.success("头像修改成功");
    }

    function updateInfo(newInfo, key) {
        if (key === 'nickname' && !newInfo) {
            message.error("昵称不能为空");
            return;
        }
        const newUserInfo = { ...editInfo };
        if (typeof newInfo === 'string') {
            newUserInfo[key] = newInfo.trim();
        } else {
            newUserInfo[key] = newInfo;
        }
        setEditInfo(newUserInfo)
    }

    function updatePasswordInfo(newInfo, key) {
        const newPasswordInfo = { ...passwordInfo };
        newPasswordInfo[key] = newInfo.trim();
        setPasswordInfo(newPasswordInfo);
        // 如果是新密码框，更新 editInfo 的内容
        if (key === "newpassword") {
            updateInfo(newInfo, 'loginPwd');
        }
    }

    let modalContent = null;
    switch (panelName) {
        case "基本信息": {
            modalContent = (
                <>
                    <Form
                        name="basic1"
                        autoComplete="off"
                        initialValues={userInfo}
                        onFinish={handleOk}
                    >
                        {/* 登录密码 */}
                        <Form.Item
                            label="登录密码"
                            name="oldpassword"
                            rules={[
                                {
                                    validator: checkPassword
                                }
                            ]}
                            validateTrigger='onBlur'
                        >
                            <Input.Password
                                rows={6}
                                value={passwordInfo.oldpassword}
                                placeholder="如果要修改密码，请先输入旧密码"
                                onChange={(e) => updatePasswordInfo(e.target.value, 'oldpassword')}
                            />
                        </Form.Item>

                        {/* 新的登录密码 */}
                        <Form.Item
                            label="新密码"
                            name="newpassword"
                        >
                            <Input.Password
                                rows={6}
                                value={passwordInfo.newpassword}
                                placeholder="请输入新密码"
                                onChange={(e) => updatePasswordInfo(e.target.value, 'newpassword')}
                            />
                        </Form.Item>

                        {/* 确认密码 */}
                        <Form.Item
                            label="确认密码"
                            name="passwordConfirm"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不一致'));
                                    },
                                }),
                            ]}
                            validateTrigger='onBlur'
                        >
                            <Input.Password
                                rows={6}
                                placeholder="请确认密码"
                                value={passwordInfo.passwordConfirm}
                                onChange={(e) => updatePasswordInfo(e.target.value, 'passwordConfirm')}
                            />
                        </Form.Item>

                        {/* 用户昵称 */}
                        <Form.Item
                            label="用户昵称"
                            name="nickname"
                        >
                            <Input
                                placeholder="昵称可选，默认为新用户"
                                // value={userInfo.nickname}
                                value={123}
                                onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="submit" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>

            );
            break;
        }
        case "社交账号": {
            modalContent = (
                <>
                    <Form
                        name="basic2"
                        initialValues={userInfo}
                        autoComplete="off"
                        onFinish={handleOk}
                    >
                        <Form.Item
                            label="邮箱"
                            name="mail"
                        >
                            <Input
                                value={userInfo.mail}
                                placeholder="请填写邮箱"
                                onChange={(e) => updateInfo(e.target.value, 'mail')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="QQ号"
                            name="qq"
                        >
                            <Input
                                value={userInfo.qq}
                                placeholder="请填写 QQ 号"
                                onChange={(e) => updateInfo(e.target.value, 'qq')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="微信"
                            name="wechat"
                        >
                            <Input
                                value={userInfo.wechat}
                                placeholder="请填写微信号"
                                onChange={(e) => updateInfo(e.target.value, 'wechat')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="github"
                            name="github"
                        >
                            <Input
                                value={userInfo.github}
                                placeholder="请填写 github "
                                onChange={(e) => updateInfo(e.target.value, 'github')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="submit" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            );
            break;

        }
        case "个人简介": {
            modalContent = (
                <>
                    <Form
                        name="basic3"
                        initialValues={userInfo}
                        autoComplete="off"
                        onFinish={handleOk}
                    >
                        {/* 自我介绍 */}
                        <Form.Item
                            label="自我介绍"
                            name="intro"
                        >
                            <Input.TextArea
                                rows={6}
                                value={userInfo.intro}
                                placeholder="选填"
                                onChange={(e) => updateInfo(e.target.value, 'intro')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="submit" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            );
            break;
        }
    }

    /**
     * 验证密码是否正确
     */
    async function checkPassword() {
        if (passwordInfo.oldpassword) {
            const { data } = await checkPasswordIsRight(userInfo._id, passwordInfo.oldpassword);
            if (!data) {
                return Promise.reject("密码不正确");
            }
        }
    }

    return (
        <>
            <PageHeader title="个人中心" />
            {/* 信息展示 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <Card title="基本信息"
                        extra={<div className={styles.edit} onClick={() => showModal("基本信息")}>编辑</div>}
                    >
                        <PersonalInfoItem info={{
                            itemName: "登录账号",
                            itemValue: userInfo.loginId,
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "账号密码",
                            itemValue: "************",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "用户昵称",
                            itemValue: userInfo.nickname,
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "用户积分",
                            itemValue: userInfo.points,
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "注册时间",
                            itemValue: formatDate(userInfo.registerDate),
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "上次登录时间",
                            itemValue: formatDate(userInfo.lastLoginDate),
                        }} />
                        <div style={{ fontWeight: 100, height: 50 }}>当前头像：</div>
                        <Image src={userInfo.avatar} width={100} />
                        <div style={{ fontWeight: 100, height: 50 }}>上传新头像：</div>
                        <Upload
                            action="/api/upload"
                            listType="picture-card"
                            maxCount={1}
                            onChange={(e) => {
                                if (e.file.status === 'done') {
                                    // 说明上传已经完成
                                    const url = e.file.response.data;
                                    handleAvatar(url, 'avatar');
                                }
                            }}
                        >
                            <PlusOutlined />
                        </Upload>
                    </Card>
                </div>
                <div className={styles.row}>
                    <Card title="社交账号"
                        extra={<div className={styles.edit} onClick={() => showModal("社交账号")}>编辑</div>}
                    >
                        <PersonalInfoItem info={{
                            itemName: "邮箱",
                            itemValue: userInfo.mail ? userInfo.mail : "未填写",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "QQ号",
                            itemValue: userInfo.qq ? userInfo.qq : "未填写",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "微信号",
                            itemValue: userInfo.wechat ? userInfo.wechat : "未填写",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "github",
                            itemValue: userInfo.github ? userInfo.github : "未填写",
                        }} />

                    </Card>
                </div>
                <div className={styles.row}>
                    <Card title="个人简介"
                        extra={<div className={styles.edit} onClick={() => showModal("个人简介")}>编辑</div>}
                    >
                        <p className={styles.intro}>
                            {userInfo.intro ? userInfo.intro : "未填写"}
                        </p>
                    </Card>
                </div>
            </div>
            {/* 修改信息对话框 */}
            <Modal
                title={panelName}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                {modalContent}
            </Modal>
        </>
    );
}

export default Personal;