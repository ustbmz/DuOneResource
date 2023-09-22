import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useModel } from "@umijs/max";
import { Tag, Switch, Button, Popconfirm, message, Modal } from "antd";
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';

import AdminForm from "./components/adminForm"

function Admin(props) {

    const dispatch = useDispatch();

    const { initialState } = useModel("@@initialState");

    // 控制修改面包开启的状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 从仓库获取管理员数据
    const { adminList } = useSelector(state => state.admin);

    // 存储当前要修改的管理员信息
    const [adminInfo, setAdminInfo] = useState(null);

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
            if (row._id === initialState.adminInfo._id) {
                // 说明是当前登录的账号
                return <Tag color="red">-</Tag>
            } else {
                return (
                    <Switch
                        key={row._id}
                        size="small"
                        defaultChecked={row.enabled ? true : false}
                        onChange={(value) => switchChange(row, value)}
                    />
                )
            }
        }
    }, {
        title: "操作",
        width: 150,
        key: "option",
        align: 'center',
        render: (_, row) => {
            return (
                <div key={row._id}>
                    <Button type="link" size="small" onClick={() => showModal(row)}>编辑</Button>
                    <Popconfirm
                        title="是否确定删除此管理员"
                        onConfirm={() => deleteHandle(row)}
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
     * 打开修改面板
     */
    function showModal(row) {
        setIsModalOpen(true);
        setAdminInfo(row);
    }

    /**
     * 点击修改面包确定按钮时的回调
     */
    const handleOk = () => {
        dispatch({
            type: "admin/_editAdmin",
            payload: {
                adminInfo,
                newAdminInfo: adminInfo
            }
        })
        message.success("修改管理员信息成功");
        setIsModalOpen(false);
    };

    /**
     * 点击修改面板取消按钮时关闭该面板
     */
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /**
     * 删除管理员
     * @param {*} adminInfo 
     */
    function deleteHandle(adminInfo) {
        // 需要判断是否是当前登录的账户


        // 派发删除对应的 action
        dispatch({
            type: 'admin/_deleteAdmin',
            payload: adminInfo
        });
        message.success("删除管理员成功");
    }

    /**
     * 修改管理员可用状态
     */
    function switchChange(row, value) {
        // 派发一个 action
        dispatch({
            type: "admin/_editAdmin",
            payload: {
                adminInfo: row,
                newAdminInfo: {
                    enabled: value
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
            {/* 修改面板 */}
            <Modal
                title="修改管理员信息"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ top: "50px" }}
            >
                <AdminForm
                    type="edit"
                    adminInfo={adminInfo}
                    setAdminInfo={setAdminInfo}
                    submitHandle={handleOk}
                />
            </Modal>
        </div>
    );
}

export default Admin;