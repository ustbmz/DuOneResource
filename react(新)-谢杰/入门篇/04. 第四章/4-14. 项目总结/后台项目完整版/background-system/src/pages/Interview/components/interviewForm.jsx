import { Button, Form, Input, Select } from 'antd';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import { Editor } from '@toast-ui/react-editor';
import { typeOptionCreator } from '@/utils/tool';
import { useDispatch, useSelector } from 'umi';
import { useRef, useState } from 'react';

function InterviewForm({
  type,
  submitHandle,
  interviewInfo,
  setInterviewInfo,
}) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const editorRef = useRef();
  const [firstIn, setFirstIn] = useState(true);

  if (type === 'edit') {
    if (formRef.current && firstIn) {
      setFirstIn(false);
      editorRef.current.getInstance().setHTML(interviewInfo?.interviewContent);
    }
    if (formRef.current) {
      formRef.current.setFieldsValue(interviewInfo);
    }
  }

  // 从仓库获取类型列表
  const { typeList } = useSelector((state) => state.type);

  // 如果类型列表为空，则初始化一次
  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList',
    });
  }

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newInterviewInfo = { ...interviewInfo };
    if (typeof newInfo === 'string') {
      newInterviewInfo[key] = newInfo.trim();
    } else {
      newInterviewInfo[key] = newInfo;
    }
    setInterviewInfo(newInterviewInfo);
  }

  const handleChange = (value) => {
    updateInfo(value, 'typeId');
  };

  /**
   * 首先获取 md 编辑器中的内容，然后再手动触发 submitHandle
   */
  function addHandle() {
    const content = editorRef.current.getInstance().getHTML();
    submitHandle(content);
  }

  return (
    <Form
      name="basic"
      initialValues={interviewInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={addHandle}
    >
      {/* 面试题标题 */}
      <Form.Item
        label="题目标题"
        name="interviewTitle"
        rules={[{ required: true, message: '请输入题目标题' }]}
      >
        <Input
          placeholder="填写题目标题"
          value={interviewInfo?.interviewTitle}
          onChange={(e) => updateInfo(e.target.value, 'interviewTitle')}
        />
      </Form.Item>

      {/* 面试题所属分类 */}
      <Form.Item
        label="题目分类"
        name="typeId"
        rules={[{ required: true, message: '请选择题目所属分类' }]}
      >
        <Select style={{ width: 200 }} onChange={handleChange}>
          {typeOptionCreator(Select, typeList)}
        </Select>
      </Form.Item>

      {/* 面试题解答 */}
      <Form.Item
        label="题目内容"
        name="interviewContent"
        rules={[{ required: true, message: '请输入题目解答' }]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>

      {/* 确认修改按钮 */}
      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'add' ? '确认新增' : '修改'}
        </Button>

        <Button type="link" htmlType="submit" className="resetBtn">
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InterviewForm;
