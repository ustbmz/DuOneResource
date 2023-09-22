import { useState, useEffect } from 'react';
import UserForm from "./components/userForm";
import { PageContainer } from "@ant-design/pro-components";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import UserController from "@/services/user"

function EditUser(props) {

    const { id } = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);

    // 根据传递过来的 id 获取该用户的详细信息
    useEffect(() => {
        async function fetchData() {
            const { data } = await UserController.getUserById(id);
            setUserInfo(data);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    function submitHandle() {
        UserController.editUser(userInfo._id, userInfo);
        message.success("修改信息成功");
        navigate("/user/userList");
    }


    return (
        <PageContainer>
            <UserForm
                type="edit"
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                submitHandle={submitHandle}
            />
        </PageContainer>
    );
}

export default EditUser;