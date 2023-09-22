import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InterviewForm from './components/interviewForm';
import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

// 请求方法
import InterviewController from '@/services/interview';

function EditInterview() {
  const { id } = useParams(); // 获取可能传递过来的 id
  const [interviewInfo, setInterviewInfo] = useState(null);
  const navigate = useNavigate();

  // 根据传递过来的 id 获取面试题详情
  useEffect(() => {
    async function fetchData() {
      // 根据问答 id 获取该问答具体的信息
      const { data } = await InterviewController.getInterviewById(id);
      setInterviewInfo(data);
    }
    fetchData();
  }, []);

  /**
   * 修改面试题
   */
  function submitHandle(interviewContent) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    InterviewController.editInterview(id, {
      interviewTitle: interviewInfo.interviewTitle,
      interviewContent,
      typeId: interviewInfo.typeId,
    });
    // 跳转回首页
    navigate('/interview/interviewList');
    message.success('修改题目成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 1000 }}>
        <InterviewForm
          type="edit"
          submitHandle={submitHandle}
          interviewInfo={interviewInfo}
          setInterviewInfo={setInterviewInfo}
        />
      </div>
    </PageContainer>
  );
}

export default EditInterview;
