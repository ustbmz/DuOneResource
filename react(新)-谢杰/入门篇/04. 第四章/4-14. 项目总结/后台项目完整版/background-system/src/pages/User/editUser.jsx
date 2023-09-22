import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserForm from './components/userForm';
import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

// 请求方法
import UserController from '@/services/user';

function EditUser() {
  const { id } = useParams(); // 获取可能传递过来的 id
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // 根据传递过来的 id 获取面试题详情
  useEffect(() => {
    async function fetchData() {
      // 根据问答 id 获取该问答具体的信息
      const { data } = await UserController.getUserById(id);
      setUserInfo(data);
    }
    fetchData();
  }, []);

  /**
   * 修改用户
   */
  function submitHandle() {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    UserController.editUser(userInfo._id, userInfo);
    message.success('信息修改成功');
    navigate('/user/userList');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 800 }}>
        <UserForm
          type="edit"
          submitHandle={submitHandle}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </div>
    </PageContainer>
  );
}

export default EditUser;
