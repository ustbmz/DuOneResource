import { useEffect } from 'react';
import { useDispatch, useSelector } from "@umijs/max";
import { Tag, Switch, Button } from "antd";
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';

function Admin(props) {

    const dispatch = useDispatch();

    // 从仓库获取管理员数据
    const { adminList } = useSelector(state => state.admin);
    useEffect(() => {
        dispatch({
            type: 'admin/_initAdminList'
        })
    }, [])

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
                    onChange={() => { }}
                />
            )

        }
    },{
        title : "操作",
        width : 150,
        key : "option",
        align: 'center',
        render : (_,row)=>{
            return (
                <div key={row._id}>
                    <Button type="link" size="small">编辑</Button>
                    <Button type="link" size="small">删除</Button>
                </div>
            )
        }
    }];


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
                        pageSize : 5
                    }}
                />
            </PageContainer>
        </div>
    );
}

export default Admin;