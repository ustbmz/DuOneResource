import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message, Tag, Select } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { useState, useRef } from 'react';
import { formatDate, typeOptionCreator } from '@/utils/tool';
import { useNavigate } from 'react-router-dom';

// 请求方法
import BookController from '@/services/book';

function Book() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch(); // 获取 dispatch
  const actionRef = useRef();
  const navigate = useNavigate();

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
      title: '书籍名称',
      dataIndex: 'bookTitle',
      width: 150,
      key: 'bookTitle',
    },
    {
      title: '书籍分类',
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
      title: '书籍简介',
      dataIndex: 'bookIntro',
      key: 'age',
      align: 'center',
      width: 200,
      search: false,
      render: (_, row) => {
        // 将书籍简介的文字进行简化
        // 在表格中显示书籍简介时，过滤掉 html 标签
        let reg = /<[^<>]+>/g;
        let brief = row.bookIntro;
        brief = brief.replace(reg, '');

        if (brief.length > 15) {
          brief = brief.slice(0, 15) + '...';
        }
        return [brief];
      },
    },
    {
      title: '书籍封面',
      dataIndex: 'bookPic',
      key: 'bookPic',
      valueType: 'image',
      align: 'center',
      search: false,
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
              onClick={() => navigate(`/book/editBook/${row._id}`)}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否要删除该书籍以及该书籍对应的评论？"
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

  function deleteHandle(bookInfo) {
    BookController.deleteBook(bookInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除书籍成功');
  }

  return (
    <>
      {/* 书籍列表 */}
      <PageContainer>
        <ProTable
          headerTitle="书籍列表"
          actionRef={actionRef}
          columns={columns}
          rowKey={(row) => row._id}
          params={searchType}
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
            const result = await BookController.getBookByPage(params);
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

export default Book;
