import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message, Tag, Select } from 'antd';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'umi';
import { formatDate, typeOptionCreator } from '@/utils/tool';
import { useNavigate } from 'react-router-dom';

// 请求方法
import InterviewController from '@/services/interview';

function Interview() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch(); // 获取 dispatch
  const navigate = useNavigate();
  const { typeList } = useSelector((state) => state.type);
  const actionRef = useRef();

  // 按类型进行搜索
  const [searchType, setSearchType] = useState({
    typeId: null,
  });

  // 如果类型列表为空，则初始化一次
  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList',
    });
  }

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
      title: '题目名称',
      dataIndex: 'interviewTitle',
      key: 'interviewTitle',
      render: (_, row) => {
        // 将书籍简介的文字进行简化
        let brief = null;
        if (row.interviewTitle.length > 22) {
          brief = row.interviewTitle.slice(0, 22) + '...';
        } else {
          brief = row.interviewTitle;
        }
        return [brief];
      },
    },
    {
      title: '题目分类',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      renderFormItem: (
        item,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          <Select placeholder="请选择查询分类" onChange={handleChange}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        );
      },
      render: (_, row) => {
        // 寻找对应类型的类型名称
        const type = typeList.find((item) => item._id === row.typeId);
        return [
          <Tag color="purple" key={row.typeId}>
            {type.typeName}
          </Tag>,
        ];
      },
    },
    {
      title: '上架日期',
      dataIndex: 'onShelfDate',
      key: 'onShelfDate',
      align: 'center',
      search: false,
      render: (_, row) => {
        return [formatDate(row.onShelfDate)];
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
            <Button
              type="link"
              size="small"
              onClick={() => navigate(`/interview/interviewList/${row._id}`)}
            >
              详情
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(`/interview/editInterview/${row._id}`)}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否要删除该面试题？"
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

  function handleChange(value) {
    setSearchType({
      typeId: value,
    });
  }

  function deleteHandle(interviewInfo) {
    InterviewController.deleteInterview(interviewInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除题目成功');
  }

  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="题目列表"
          columns={columns}
          params={searchType}
          actionRef={actionRef}
          rowKey={(row) => row._id}
          onReset={() => {
            setSearchType({
              typeId: null,
            });
          }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            ...pagination,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            const result = await InterviewController.getInterviewByPage(params);
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
    </>
  );
}

export default Interview;
