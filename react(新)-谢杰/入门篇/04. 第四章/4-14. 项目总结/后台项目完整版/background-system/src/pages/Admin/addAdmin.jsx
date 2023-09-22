import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import AdminForm from './components/adminForm';

function AddAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminList } = useSelector((state) => state.admin);

  const [newAdminInfo, setNewAdminInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    permission: 2,
  });

  useEffect(()=>{
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  },[adminList])

  // 用户点击新建按钮
  function submitHandle() {
    if (newAdminInfo.loginId) {
      dispatch({ type: 'admin/_addAdmin', payload: newAdminInfo });
      message.success('添加管理员成功');
      // 跳转回首页
      navigate('/admin/adminList');
    }
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 500 }}>
        <AdminForm
          type="add"
          submitHandle={submitHandle}
          adminInfo={newAdminInfo}
          setAdminInfo={setNewAdminInfo}
        />
      </div>
    </PageContainer>
  );
}

export default AddAdmin;
