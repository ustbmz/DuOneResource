import { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Upload, Modal, Form, Input, Button } from "antd";
import PersonalInfoItem from "../components/PersonalInfoItem";
import { formatDate } from "../utils/tools";
import { PlusOutlined } from '@ant-design/icons';
import { updateUserInfoAsync } from "../redux/userSlice";
import { checkPassword } from "../api/user";


import styles from "../css/Personal.module.css"
/**
 * 个人中心
 */
function Personal(props) {

    const { userInfo } = useSelector(state => state.user);
    console.log(userInfo,'userInfo');
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [panelName, setPanelName] = useState("");
    const [passwordInfo, setPasswordInfo] = useState({
        oldpassword : "", // 旧密码
        newpassword : "", // 新密码
        passwordConfirm : "", // 确认密码
    })

    const showModal = (name) => {
        setPanelName(name);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // setIsModalOpen(false);
        // 用户点击了确定按钮，表明要确定修改信息
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function handleAvatar(newURL, key) {
        // 将仓库和服务器端的数据一起更新
        dispatch(updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: {
                [key]: newURL
            }
        }))
    }

    /**
     * 用户输入密码时，更新对应的状态
     */
    function updatePasswordInfo(newInfo, key){
        const newPasswordInfo = {...passwordInfo};
        newPasswordInfo[key] = newInfo.trim();
        setPasswordInfo(newPasswordInfo);
    }

    /**
     * 验证用户输入的旧密码是否正确
     */
    async function checkPasswordIsRight(){
        if(passwordInfo.oldpassword){
            const {data}= await checkPassword(userInfo._id, passwordInfo.oldpassword);
            if(!data){
                // 说明密码不正确
                return Promise.reject("密码不正确");
            }
        }
    }

    /**
     * 用户输入新密码或者确认密码时，修改对应的状态
     */
    function updatePasswordInfo(newInfo, key){
        const newPasswordInfo = {...passwordInfo};
        newPasswordInfo[key] = newInfo.trim();
        setPasswordInfo(newPasswordInfo);
    }

    // 模态框中间显示的内容
    let modalContent = null;
    switch (panelName) {
        case "基本信息": {
            modalContent = (
                <>
                    <Form
                        name="basic1"
                        autoComplete="off"
                        onFinish={handleOk}
                    >
                        {/* 登录密码 */}
                        <Form.Item
                            label="登录密码"
                            name="oldpassword"
                            rules={[
                                {
                                    validator: checkPasswordIsRight
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
                                value={userInfo.nickname}
                                // onBlur={(e) => updateInfo(e.target.value, 'nickname')}
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
            break;
        }
        case "个人简介": {
            break;
        }
    }

    return (
        <div>
            <PageHeader title="个人中心" />
            {/* 信息展示 */}
            <div className={styles.container}>
                {/* 基本信息 */}
                <div className={styles.row}>
                    <Card title="基本信息" extra={(<div className={styles.edit} onClick={() => showModal("基本信息")}>编辑</div>)}>
                        <PersonalInfoItem info={{ itemName: "登录账号", itemValue: userInfo.loginId }} />
                        <PersonalInfoItem info={{ itemName: "账号密码", itemValue: "**** **** ***" }} />
                        <PersonalInfoItem info={{ itemName: "用户昵称", itemValue: userInfo.nickname }} />
                        <PersonalInfoItem info={{ itemName: "用户积分", itemValue: userInfo.points }} />
                        <PersonalInfoItem info={{ itemName: "注册时间", itemValue: formatDate(userInfo.registerDate) }} />
                        <PersonalInfoItem info={{ itemName: "上次登录时间", itemValue: formatDate(userInfo.lastLoginDate) }} />
                        <div style={{ fontWeight: '100', height: '50px' }}>当前头像</div>
                        <Image src={userInfo.avatar} width={100} />
                        <div style={{ fontWeight: '100', height: '50px' }}>上传新头像</div>
                        <Upload
                            action="/api/upload"
                            listType="picture-card"
                            maxCount={1}
                            onChange={(e) => {
                                if (e.file.status === "done") {
                                    // 说明上传完毕
                                    const url = e.file.response.data;
                                    // 处理用户头像的更新
                                    handleAvatar(url, 'avatar');
                                }
                            }}
                        >
                            <PlusOutlined />
                        </Upload>
                    </Card>
                </div>
                {/* 社交账号 */}
                <div className={styles.row}>
                    <Card title="社交账号" extra={(<div className={styles.edit} onClick={() => showModal("社交账号")}>编辑</div>)}>

                    </Card>
                </div>
                {/* 个人简介 */}
                <div className={styles.row}>
                    <Card title="个人简介" extra={(<div className={styles.edit} onClick={() => showModal("个人简介")}>编辑</div>)}>

                    </Card>
                </div>
            </div>
            {/* 修改信息的对话框 */}
            <Modal title={panelName} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default Personal;