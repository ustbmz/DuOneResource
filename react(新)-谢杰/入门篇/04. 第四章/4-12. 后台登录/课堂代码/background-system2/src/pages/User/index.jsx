import { useState, useRef } from 'react';
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Switch, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";

import UserController from "@/services/user";



function User(props) {

    const tableRef = useRef();

    const navigate = useNavigate();

    // 首先需要维护一组分页相关的数据
    // 这个分页数据回头是会被作为参数一起发送到服务器的
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5
    })

    const columns = [
        {
            title: "序号",
            align: "center",
            width: 50,
            search: false,
            render: (text, record, index) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1
            }
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
            render: (_, row) => {
                return (
                    <div>
                        <Button type="link" size="small">详情</Button>
                        <Button type="link" size="small" onClick={()=>navigate(`/user/editUser/${row._id}`)}>编辑</Button>
                        <Popconfirm
                            title="你确定要删除么？"
                            onConfirm={()=>deleteHandle(row)}
                            okText="删除"
                            cancelText="取消"
                        >
                            <Button type="link" size="small">删除</Button>
                        </Popconfirm>
                        
                    </div>
                )
            }
        }
    ];

    /**
     * 删除对应的回调
     */
    function deleteHandle(userInfo){
        // 直接在这里发送请求，不需要通过状态仓库
        UserController.deleteUser(userInfo._id);
        // 删除之后需要强制刷新一个表格
        tableRef.current.reload();
        message.success("删除用户成功");
    }

    /**
     * 分页组件发生修改时会调用此回调函数
     */
    function handlePageChange(current, pageSize) {
        setPagination({
            current, pageSize
        })
    }

    /**
     * 切换用户的可用状态
     */
    function switchChange() {

    }


    return (
        <div>
            <PageContainer>
                <ProTable
                    headerTitle="用户列表"
                    actionRef={tableRef}
                    columns={columns}
                    rowKey={(row) => row._id}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 15, 20],
                        ...pagination,
                        onChange: handlePageChange
                    }}
                    request={async (params) => {
                        const result = await UserController.getUserByPage(params);
                        return {
                            data: result.data.data,
                            success: !result.code,
                            total: result.data.count
                        }
                    }}
                />
            </PageContainer>
        </div>
    );
}

export default User;