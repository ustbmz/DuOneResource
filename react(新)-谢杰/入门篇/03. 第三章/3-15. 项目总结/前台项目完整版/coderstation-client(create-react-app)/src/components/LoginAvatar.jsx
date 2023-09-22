import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Avatar, Popover, List, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { clearUserInfo, changeLoginStatus } from "../redux/userSlice"

import styles from "../css/LoginAvatar.module.css"

/**
 * 未登录展示登录/注册按钮，登录后展示用户头像
 * @param {*} props 
 * @returns 
 */
function LoginAvatar(props) {

    const navigate = useNavigate();
    const { isLogin, userInfo } = useSelector(state => state.user);
    // console.log(isLogin,'isLogin');
    const dispatch = useDispatch();

    let loginStatus = null;
    if (isLogin) {
        const content = (
            <List
                size="large"
                dataSource={["个人中心", "退出登录"]}
                renderItem={(item) => (
                    <List.Item style={{ cursor: "pointer" }} onClick={() => listClickHandle(item)}>{item}</List.Item>
                )}
            />
        );
        loginStatus = (
            <Popover placement="bottom" content={content} trigger="hover">
                <div className={styles.avatarContainer}>
                    <Avatar src={<Image src={userInfo?.avatar} preview={false} />} size="large" icon={<UserOutlined />} />
                </div>
            </Popover>
        );
    } else {
        loginStatus = (
            <Button type="primary" size="large" onClick={props.loginHandle}>
                注册/登录
            </Button>
        );
    }

    function listClickHandle(item) {
        if (item === "个人中心") {
            navigate("/personal")
        } else if (item === "退出登录") {
            // 清除本地 token
            localStorage.removeItem("userToken");
            // 清除本地仓库存储的用户信息
            dispatch(clearUserInfo());
            dispatch(changeLoginStatus(false));
            navigate("/")
        }
    }

    return (
        <div>
            {loginStatus}
        </div>

    );
}

export default LoginAvatar;