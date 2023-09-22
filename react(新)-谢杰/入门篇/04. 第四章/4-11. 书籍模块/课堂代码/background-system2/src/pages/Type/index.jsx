import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Popconfirm, Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { useEffect, useState } from 'react';

function Type() {
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch(); // 获取 dispatch
  const [newTypeInfo, setNewTypeInfo] = useState('');

  useEffect(() => {
    if (!typeList.length) {
      dispatch({
          type: 'type/_initTypeList',
      });
  }
  }, [typeList]);

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'center',
      editable: true,
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
   * 添加分类
   */
  function addHandle() {
    // 这里需要做一个判断，判断该类型是否已存在
    if (typeList.find((item) => item.typeName === newTypeInfo)) {
      message.warning('该类型已存在，请不要重复添加');
    } else {
      dispatch({
        type: 'type/_addType',
        payload: {
          typeName: newTypeInfo,
        },
      });
      message.success('新增类型成功');
    }
  }

  /**
   * 删除分类
   * @param {*} adminInfo 一条管理员信息
   */
  function deleteHandle(typeInfo) {
    // 删除类型之前，还需要判断该类型下是否有书籍或者问答、评论
    // 这一块暂时放一放，回头来做

    dispatch({
      type: 'type/_deleteType',
      payload: typeInfo,
    });
    message.success('删除类型成功');
  }

  return (
    <PageContainer>
      <>
        {/* 新增分类 */}
        <div style={{ width: 500, margin: 10, marginBottom: 30 }}>
          <Form layout="inline">
            <Form.Item name="newTypeName">
              <Input
                placeholder="填写新增类型"
                name="typeName"
                value={newTypeInfo}
                onChange={(e) => setNewTypeInfo(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" shape="round" onClick={addHandle}>
                新增
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* 分类列表 */}
        <ProTable
          headerTitle="分类信息"
          columns={columns}
          dataSource={typeList}
          rowKey={(row) => row._id}
          search={false}
          pagination={{
            pageSize: 5,
          }}
        />
      </>
    </PageContainer>
  );
}

export default Type;
