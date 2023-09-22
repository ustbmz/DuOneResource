import React from 'react';
import { NavLink } from "react-router-dom";
import { Input, Select } from "antd";
import LoginAvatar from "../components/LoginAvatar"

function PageHeader(props) {
    return (
        <div className="headerContainer">
            {/* 头部 logo */}
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            {/* 头部导航 */}
            <nav className="navContainer">
                <NavLink to="/" className="navgation">问答</NavLink>
                <NavLink to="/books" className="navgation">书籍</NavLink>
                <NavLink to="/interviews" className="navgation">面试题</NavLink>
                <a
                    href="https://duyi.ke.qq.com/"
                    className="navgation"
                    target="_blank"
                    rel="noreferrer"
                >视频教程</a>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Input.Group compact>
                    <Select defaultValue="issue" size="large" style={{ width: "20%" }}>
                        <Select.Option value="issue">问答</Select.Option>
                        <Select.Option value="book">书籍</Select.Option>
                    </Select>
                    <Input.Search
                        placeholder="请输入要搜索的内容"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        style={{
                            width: "80%"
                        }}
                    />
                </Input.Group>
            </div>
            {/* 登录按钮 */}
            <div className="loginBtnContainer">
                {/* 自定义头像组件 */}
                <LoginAvatar loginHandle={props.loginHandle}/>
            </div>
        </div>
    );
}

export default PageHeader;