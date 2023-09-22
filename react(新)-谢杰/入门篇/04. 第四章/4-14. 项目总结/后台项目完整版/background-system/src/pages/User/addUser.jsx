import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import UserForm from './components/userForm';
import { useState } from 'react';
import { message } from 'antd';

// 请求方法
import UserController from '@/services/user';

function AddUser() {
  const navigate = useNavigate();

  const [newUserInfo, setNewUserInfo] = useState({
    loginId: '',
    loginPwd: '',
    avatar: '',
    nickname: '',
    mail: '',
    qq: '',
    wechat: '',
    intro: '',
  });

  /**
   * 新增用户
   */
  function submitHandle() {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    UserController.addUser(newUserInfo);

    // 跳转回首页
    navigate('/user/userList');
    message.success('添加用户成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 800 }}>
        <UserForm
          type="add"
          submitHandle={submitHandle}
          userInfo={newUserInfo}
          setUserInfo={setNewUserInfo}
        />
      </div>
    </PageContainer>
  );
}

export default AddUser;
