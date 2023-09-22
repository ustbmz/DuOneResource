import { useEffect } from 'react';
import { useDispatch, useSelector } from "@umijs/max";
import { Tag, Switch, Button, Popconfirm, message } from "antd";
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';

function Admin(props) {

    const dispatch = useDispatch();

    // 从仓库获取管理员数据
    const { adminList } = useSelector(state => state.admin);
    useEffect(() => {
        if (!adminList.length) {
            dispatch({
                type: 'admin/_initAdminList'
            })
        }
    }, [adminList])

    // 对应表格每一列的配置
    const columns = [{
        title: "登录账号",
        dataIndex: "loginId",
        key: "loginId",
        align: "center"
    }, {
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
    }, {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        valueType: "avatar"
    }, {
        title: '权限',
        dataIndex: 'permission',
        key: 'permission',
        align: 'center',
        render: (_, row) => {
            let tag = row.permission === 1 ? <Tag color="orange" key={row._id}>超级管理员</Tag> : <Tag color="blue" key={row._id}>普通管理员</Tag>
            return tag;
        }
    }, {
        title: '账号状态',
        dataIndex: 'enabled',
        key: 'enabled',
        align: 'center',
        render: (_, row) => {
            return (
                <Switch
                    key={row._id}
                    size="small"
                    defaultChecked={row.enabled ? true : false}
                    onChange={(value) => switchChange(row, value)}
                />
            )

        }
    }, {
        title: "操作",
        width: 150,
        key: "option",
        align: 'center',
        render: (_, row) => {
            return (
                <div key={row._id}>
                    <Button type="link" size="small">编辑</Button>
                    <Popconfirm
                         title="是否确定删除此管理员"
                         onConfirm={()=>deleteHandle(row)}
                         okText="确定"
                         cancelText="取消"
                    >
                        <Button type="link" size="small">删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    }];

    /**
     * 删除管理员
     * @param {*} adminInfo 
     */
    function deleteHandle(adminInfo){
        // 需要判断是否是当前登录的账户


        // 派发删除对应的 action
        dispatch({
            type: 'admin/_deleteAdmin',
            payload : adminInfo
        });
        message.success("删除管理员成功");
    }

    /**
     * 修改管理员可用状态
     */
    function switchChange(row, value){
        // 派发一个 action
        dispatch({
            type : "admin/_editAdmin",
            payload : {
                adminInfo : row,
                newAdminInfo : {
                    enabled : value
                }
            }
        });
        value ? message.success("管理员状态已激活") : message.success("管理员已禁用");
    }

    return (
        <div>
            <PageContainer>
                <ProTable
                    headerTitle="管理员列表"
                    dataSource={adminList}
                    rowKey={(row) => row._id}
                    columns={columns}
                    search={false}
                    pagination={{
                        pageSize: 5
                    }}
                />
            </PageContainer>
        </div>
    );
}

export default Admin;