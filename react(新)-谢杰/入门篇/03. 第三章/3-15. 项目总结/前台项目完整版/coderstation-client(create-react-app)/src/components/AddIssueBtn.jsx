import React from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { Button, message } from "antd"

function AddIssueBtn() {

    const { isLogin } = useSelector(state => state.user);
    const navigate = useNavigate();

    function clickHandle() {
        // 需要判断登录状态
        if (isLogin) {
            navigate("/addIssue")
        } else {
            message.warning("请先登录");
        }
    }

    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: "100%",
                marginBottom: "30px"
            }}
            onClick={clickHandle}
        >我要发问</Button>
    );
}

export default AddIssueBtn;