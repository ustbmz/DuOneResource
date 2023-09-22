import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Modal, message, Tag, Switch, Image } from 'antd';
import { useState, useRef } from 'react';
import { formatDate } from '@/utils/tool';
import { useNavigate } from 'react-router-dom';
import { useAccess, Access } from 'umi';

// 请求方法
import UserController from '@/services/user';

function User() {
  const actionRef = useRef();
  const navigate = useNavigate();
  const access = useAccess();

  const [userInfo, setUserInfo] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      search: false,
      render: (text, record, index) => {
        return [(pagination.current - 1) * pagination.pageSize + index + 1];
      },
    },
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
      search: false,
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
      search: false,
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      search: false,
      render: (_, row, index, action) => {
        const defaultChecked = row.enabled ? true : false;
        return [
          <Switch
            key={row._id}
            defaultChecked={defaultChecked}
            size="small"
            onChange={(value) => switchChange(row, value)}
          />,
        ];
      },
    },
    {
      title: '操作',
      width: 200,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row, index, action) => {
        return [
          <div key={row._id}>
            <Button type="link" size="small" onClick={() => showModal(row)}>
              详情
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(`/user/editUser/${row._id}`)}
            >
              编辑
            </Button>
            <Access accessible={access.SuperAdmin}>
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
            </Access>
          </div>,
        ];
      },
    },
  ];

  /**
   * 删除用户
   * @param {*} userInfo 一条用户信息
   */
  function deleteHandle(userInfo) {
    UserController.deleteUser(userInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除用户成功');
  }

  /**
   *
   * @param {*} page 当前页
   * @param {*} pageSize 每页条数
   */
  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize,
    });
  }

  /**
   * 修改用户的可用状态
   * @param {*} row 当前这一条管理员信息
   * @param {*} value 新的可用状态
   */
  function switchChange(row, value) {
    // 不同于管理员，这里直接通过控制器来发请求
    UserController.editUser(row._id, {
      enabled: value,
    });

    if (value) {
      message.success('用户状态已激活');
    } else {
      message.success('该用户已被禁用');
    }
  }

  /**
   * 打开修改对话框
   */
  function showModal(row) {
    setUserInfo(row);
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="用户列表"
          actionRef={actionRef}
          columns={columns}
          rowKey={(row) => row._id}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            ...pagination,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            console.log(params,'params');
            const result = await UserController.getUserByPage(params);
            return {
              data: result.data.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: !result.code,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: result.data.count,
            };
          }}
        />
      </PageContainer>
      {/* 用户详情信息 */}
      <Modal
        title={userInfo?.nickname}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={false}
      >
        <h3>登录账号</h3>
        <p>
          <Tag color="red">{userInfo?.loginId}</Tag>
        </p>
        <h3>登录密码</h3>
        <p>
          <Tag color="magenta">{userInfo?.loginPwd}</Tag>
        </p>
        <h3>当前头像</h3>
        <Image src={userInfo?.avatar} width={60} />

        <h3>联系方式</h3>
        <div
          style={{
            display: 'flex',
            width: '350px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4>QQ</h4>
            <p>{userInfo?.qq ? userInfo.qq : '未填写'}</p>
          </div>
          <div>
            <h4>微信</h4>
            <p>{userInfo?.wechat ? userInfo.weichat : '未填写'}</p>
          </div>
          <div>
            <h4>邮箱</h4>
            <p>{userInfo?.mail ? userInfo.mail : '未填写'}</p>
          </div>
        </div>
        <h3>个人简介</h3>
        <p>{userInfo?.intro ? userInfo.intro : '未填写'}</p>
        <h3>时间信息</h3>
        <div
          style={{
            display: 'flex',
            width: '450px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4>注册时间</h4>
            <p>{formatDate(userInfo?.registerDate)}</p>
          </div>
          <div>
            <h4>上次登录</h4>
            <p>{formatDate(userInfo?.lastLoginDate)}</p>
          </div>
        </div>
        <h3>当前积分</h3>
        <p>{userInfo?.points} 分</p>
      </Modal>
    </>
  );
}

export default User;
