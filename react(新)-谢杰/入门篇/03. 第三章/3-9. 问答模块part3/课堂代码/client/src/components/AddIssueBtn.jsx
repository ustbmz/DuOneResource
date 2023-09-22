import React from 'react';
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * 添加问答
 */
function AddIssue(props) {

    const { isLogin } = useSelector(state => state.user);
    const navigate = useNavigate();

    function clickHandle(){
        // 要做的事情就是跳转到添加问答页面
        // 但是要做一个是否登录的判断
        if(isLogin){
            // 跳转
            navigate("/addIssue");
        } else {
            message.warning("请先登录");
        }
    }


    return (
        <Button
            type="primary"
            size="large"
            style={{
                width : "100%",
                marginBottom : "30px"
            }}
            onClick = {clickHandle}
        >我要发问</Button>
    );
}

export default AddIssue;