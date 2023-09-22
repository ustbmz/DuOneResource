import { useState } from 'react';
import LoginAvatar from "./LoginAvatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;
function NavHeader(props) {

    const navigate = useNavigate();

    const [searchOptions, setSearchOption] = useState("issue");

    function onChange(value) {
        setSearchOption(value);
    }

    function onSearch(value) {
        if (value) {
            // 跳转到搜索页，将搜索内容传递过去
            navigate("/searchPage", {
                state: {
                    value,
                    searchOptions
                }
            })
        } else {
            navigate("/issues")
        }

    }



    return (
        <div className="headerContainer">
            {/* 头部 logo */}
            <div className="logoContainer" onClick={() => navigate("/")}>
                <div className="logo"></div>
            </div>
            {/* 头部导航 */}
            <nav className="navContainer">
                <NavLink to="/" className="navgation">
                    问答
                </NavLink>
                <NavLink to="/books" className="navgation">
                    书籍
                </NavLink>
                {/* <NavLink to="/jobs" className="navgation">
            招聘
          </NavLink> */}
                <NavLink to="/interviews" className="navgation">
                    面试题
                </NavLink>
                <a
                    href="https://duyi.ke.qq.com/"
                    target="_blank"
                    className="navgation"
                >
                    视频教程
                </a>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Input.Group compact>
                    <Select
                        defaultValue="issue"
                        size="large"
                        style={{
                            width: "20%",
                        }}
                        onChange={onChange}
                    >
                        <Option value="issue">问答</Option>
                        <Option value="book">书籍</Option>
                        {/* <Option value="jobs">招聘</Option> */}
                    </Select>
                    <Search
                        placeholder="请输入要搜索的内容"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={onSearch}
                        style={{
                            width: "80%",
                        }}
                    />
                </Input.Group>
            </div>
            {/* 登录按钮 */}
            <div className="loginBtnContainer">
                <LoginAvatar loginHandle={props.loginHandle} />
            </div>
        </div>
    );
}

export default NavHeader;