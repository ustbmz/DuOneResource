import InterviewForm from './components/interviewForm';
import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

// 请求方法
import InterviewController from '@/services/interview';

function AddInterview() {
  const navigate = useNavigate();

  const [newInterviewInfo, setNewInterviewInfo] = useState({
    interviewTitle: '',
    interviewContent: '',
    typeId: '',
  });

  /**
   * 新增面试题
   */
  function submitHandle(interviewContent) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    InterviewController.addInterview({
      interviewTitle: newInterviewInfo.interviewTitle,
      interviewContent,
      typeId: newInterviewInfo.typeId,
    });
    // 跳转回首页
    navigate('/interview/interviewList');
    message.success('新增题目成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 1000 }}>
        <InterviewForm
          type="add"
          submitHandle={submitHandle}
          interviewInfo={newInterviewInfo}
          setInterviewInfo={setNewInterviewInfo}
        />
      </div>
    </PageContainer>
  );
}

export default AddInterview;
