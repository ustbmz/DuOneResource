import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Switch, Tag, Button, Popconfirm, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useModel } from 'umi';
import AdminForm from './components/adminForm';

function Admin() {
  const { adminList } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);

  const dispatch = useDispatch(); // 获取 dispatch

  const { initialState } = useModel('@@initialState');
  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  const columns = [
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      align: 'center',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (_, row, index, action) => {
        let tag = null;
        if (row.permission === 1) {
          tag = <Tag color="orange">超级管理员</Tag>;
        } else {
          tag = <Tag color="blue">普通管理员</Tag>;
        }
        return [tag];
      },
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      render: (_, row, index, action) => {
        const defaultChecked = row.enabled ? true : false;
        if (row._id === initialState.adminInfo._id) {
          return [
            <Tag color="red" key={row._id}>
              -
            </Tag>,
          ];
        } else {
          return [
            <Switch
              key={row._id}
              defaultChecked={defaultChecked}
              size="small"
              onChange={(value) => switchChange(row, value)}
            />,
          ];
        }
      },
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row, index, action) => {
        return [
          <div key={row._id}>
            <Button type="link" size="small" onClick={() => showModal(row)}>
              编辑
            </Button>
            <Popconfirm
              title="你确定要删除？"
              onConfirm={() => deleteHandle(row)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>,
        ];
      },
    },
  ];

  /**
   * 打开修改对话框
   */
  function showModal(row) {
    setAdminInfo(row);
    setIsModalOpen(true);
  }

  const handleOk = () => {
    dispatch({
      type: 'admin/_editAdmin',
      payload: {
        adminInfo,
        newAdminInfo: adminInfo,
      },
    });
    message.success('信息修改成功');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * 删除管理员
   * @param {*} adminInfo 一条管理员信息
   */
  function deleteHandle(adminInfo) {
    if (initialState.adminInfo._id === adminInfo._id) {
      // 说明当前登录的就是此管理员无法进行删除操作
      message.error('无法进行此操作');
      return;
    }
    dispatch({
      type: 'admin/_deleteAdmin',
      payload: adminInfo,
    });
    message.success('该管理员已删除');
  }

  /**
   * 修改管理员的可用状态
   * @param {*} row 当前这一条管理员信息
   * @param {*} value 新的可用状态
   */
  function switchChange(row, value) {
    dispatch({
      type: 'admin/_editAdmin',
      payload: {
        adminInfo: row,
        newAdminInfo: {
          enabled: value,
        },
      },
    });
    if (value) {
      message.success('管理员状态已激活');
    } else {
      message.success('该管理员已被禁用');
    }
  }

  return (
    <div>
      <PageContainer>
        {/* 管理员信息分页采用的是客户端分页 */}
        {/* 因为管理员信息不会太多，因此后端未提供分页查询接口 */}
        {/* 前端在显示层面进行客户端分页 */}
        <ProTable
          headerTitle="管理员信息"
          dataSource={adminList}
          rowKey={(row) => row._id}
          columns={columns}
          search={false}
          pagination={{
            pageSize: 5,
          }}
        />
      </PageContainer>
      {/* 修改管理员信息 */}
      <Modal
        title="修改管理员信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 70 }}
        footer={false}
      >
        <AdminForm
          type="edit"
          submitHandle={handleOk}
          adminInfo={adminInfo}
          setAdminInfo={setAdminInfo}
        />
      </Modal>
    </div>
  );
}

export default Admin;
