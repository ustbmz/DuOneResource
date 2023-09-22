import React from 'react';
import { PageContainer } from "@ant-design/pro-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "umi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import AdminForm from "./components/adminForm"

function AddAdmin(props) {

    const [newAdminInfo, setNewAdminInfo] = useState({
        loginId: "",
        loginPwd: "",
        nickname: "",
        avatar: "",
        permission: 2 // 默认是普通管理员
    })

    const { adminList } = useSelector(state => state.admin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminList.length) {
            dispatch({
                type: "admin/_initAdminList"
            })
        }
    }, [adminList])

    function submitHandle() {
        // 用户点击表单的确认时，要做的事儿
        // 接下来我们就需要进行新增操作
        dispatch({
            type: "admin/_addAdmin",
            payload: newAdminInfo
        });
        message.success("添加管理员成功");
        navigate("/admin/adminList");
    }


    return (
        <PageContainer>
            <div className="container" style={{ width: "500px" }}>
                <AdminForm
                    type="add"
                    adminInfo={newAdminInfo}
                    setAdminInfo={setNewAdminInfo}
                    submitHandle={submitHandle}
                />
            </div>
        </PageContainer>
    );
}

export default AddAdmin;