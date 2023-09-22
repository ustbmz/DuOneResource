import React from 'react';
import { Button, List, Popover, Avatar, Image } from "antd";
import { useSelector } from "react-redux";
import { clearUserInfo,changeLoginStatus} from "../redux/userSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "../css/LoginAvatar.module.css";
import { UserOutlined } from "@ant-design/icons";

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginAvatar(props) {


    const { isLogin, userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function listClickHandle(item){
        if(item === "个人中心"){
            // 跳转到个人中心
        } else {
            // 退出登录
            // 清除 token
            localStorage.removeItem("userToken");
            // 清除状态仓库
            dispatch(clearUserInfo);
            dispatch(changeLoginStatus(false));
            navigate("/");
        }
    }


    let loginStatus = null;
    if (isLogin) {
        // 登录了的
        const content = (
            <List
                dataSource={["个人中心", "退出登录"]}
                size="large"
                renderItem={(item) => {
                    return (
                        <List.Item style={{ cursor: "pointer" }} onClick={()=>listClickHandle(item)}>{item}</List.Item>
                    )
                }}
            />
        );
        loginStatus = (
            <Popover content={content} trigger="hover" placement="bottom">
                <div className={styles.avatarContainer}>
                    <Avatar src={<Image src={userInfo?.avatar} preview={false}/>} size="large" icon={<UserOutlined />} />
                </div>
            </Popover>
        );
    } else {
        // 没有登录
        loginStatus = (
            <Button type="primary" size="large" onClick={props.loginHandle}>注册/登录</Button>
        );
    }

    return (
        <div>
            {loginStatus}
        </div>
    );
}

export default LoginAvatar;