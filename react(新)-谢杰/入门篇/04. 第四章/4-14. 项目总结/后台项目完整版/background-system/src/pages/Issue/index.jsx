import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message, Tag, Switch, Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { useNavigate } from 'react-router-dom';
import { typeOptionCreator } from '@/utils/tool';

// 请求方法
import IssueController from '@/services/issue';

function Issue() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch(); // 获取 dispatch
  const navigate = useNavigate();
  const actionRef = useRef();
  const { typeList } = useSelector((state) => state.type);

  // 按类型进行搜索
  const [searchType, setSearchType] = useState({
    typeId: null,
  });

  useEffect(() => {
    // 如果类型列表为空，则初始化一次
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, []);

  // 表格列
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      render: (text, record, index) => {
        return [(pagination.current - 1) * pagination.pageSize + index + 1];
      },
      search: false,
    },
    {
      title: '问答标题',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      render: (_, row) => {
        // 将问答标题进行简化
        let brief = null;
        if (row.issueTitle.length > 22) {
          brief = row.issueTitle.slice(0, 22) + '...';
        } else {
          brief = row.issueTitle;
        }
        return [brief];
      },
    },
    {
      title: '问答描述',
      dataIndex: 'issueContent',
      key: 'issueContent',
      search: false,
      render: (_, row) => {
        // 将问答描述的文字进行简化
        // 在表格中显示书问答描述时，过滤掉 html 标签
        let reg = /<[^<>]+>/g;
        let brief = row.issueContent;
        brief = brief.replace(reg, '');

        if (brief.length > 30) {
          brief = brief.slice(0, 30) + '...';
        }
        return [brief];
      },
    },
    {
      title: '浏览数',
      dataIndex: 'scanNumber',
      key: 'scanNumber',
      align: 'center',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentNumber',
      key: 'commentNumber',
      align: 'center',
      search: false,
    },
    {
      title: '问题分类',
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
      title: '审核状态',
      dataIndex: 'issueStatus',
      key: 'issueStatus',
      align: 'center',
      render: (_, row, index, action) => {
        const defaultChecked = row.issueStatus ? true : false;
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
      width: 150,
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
              onClick={() => navigate(`/issue/${row._id}`)}
            >
              详情
            </Button>
            <Popconfirm
              title="是否要删除该问答以及该问答对应的评论？"
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

  function handleChange(value) {
    setSearchType({
      typeId: value,
    });
  }

  /**
   * 删除该条问答
   * @param {*} bookInfo
   */
  function deleteHandle(issueInfo) {
    IssueController.deleteIssue(issueInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除问答成功');
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
   * 修改管理员的可用状态
   * @param {*} row 当前这一条管理员信息
   * @param {*} value 新的可用状态
   */
  function switchChange(row, value) {
    // 不同于管理员，这里直接通过控制器来发请求
    IssueController.editIssue(row._id, {
      issueStatus: value,
    });

    if (value) {
      message.success('该问题审核已通过');
    } else {
      message.success('该问题待审核');
    }
  }

  return (
    <PageContainer>
      <ProTable
        headerTitle="问题列表"
        actionRef={actionRef}
        columns={columns}
        params={searchType}
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
          const result = await IssueController.getIssueByPage(params);
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
  );
}

export default Issue;
