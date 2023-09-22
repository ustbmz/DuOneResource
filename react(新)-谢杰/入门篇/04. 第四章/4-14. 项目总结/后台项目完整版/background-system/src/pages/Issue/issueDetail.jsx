import { PageContainer } from '@ant-design/pro-components';
import { Card, Image, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { formatDate } from '@/utils/tool';

// 请求方法
import IssueController from '@/services/issue';
import UserController from '@/services/user';

function IssueDetail() {
  const { id } = useParams(); // 获取可能传递过来的 id
  const dispatch = useDispatch(); // 获取 dispatch
  const [issueInfo, setIssueInfo] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [userName, setUserName] = useState(null);

  // 从仓库获取类型列表
  const { typeList } = useSelector((state) => state.type);

  // 如果类型列表为空，则初始化一次
  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList',
    });
  }

  useEffect(() => {
    async function fetchData() {
      // 根据问答 id 获取该问答具体的信息
      const { data } = await IssueController.getIssueById(id);
      setIssueInfo(data);
      // 获取 typeId 对应的 typeName
      const type = typeList.find((item) => item._id === data.typeId);
      setTypeName(type?.typeName);
      // 获取 userId 对应的 nickName
      const result = await UserController.getUserById(data.userId);
      setUserName(result.data.nickname);
    }
    fetchData();
  }, []);

  return (
    <PageContainer>
      <div
        className="container"
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Card
          title={issueInfo?.issueTitle}
          bordered={false}
          style={{
            marginTop: 20,
          }}
          extra={
            <Tag color="purple" key={issueInfo?.typeId}>
              {typeName}
            </Tag>
          }
        >
          <h2>提问用户</h2>
          <p>
            <Tag color="volcano" key={issueInfo?.userId}>
              {userName}
            </Tag>
          </p>
          <h2>问题描述</h2>
          <p>
            <div
              dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}
            ></div>
          </p>
          <h2>提问时间</h2>
          <p>{formatDate(issueInfo?.issueDate)}</p>
          <h3>浏览数：{issueInfo?.scanNumber}</h3>
          <p></p>
          <h3>评论数：{issueInfo?.scanNumber}</h3>
          <Card
            size="small"
            title="Small size card"
            style={{
              marginBottom: 10,
            }}
          >
            <p>Card content</p>
          </Card>
          <Card
            size="small"
            title="Small size card"
            style={{
              marginBottom: 10,
            }}
          >
            <p>Card content</p>
          </Card>
          <Card
            size="small"
            title="Small size card"
            style={{
              marginBottom: 10,
            }}
          >
            <p>Card content</p>
          </Card>
        </Card>
      </div>
    </PageContainer>
  );
}

export default IssueDetail;
