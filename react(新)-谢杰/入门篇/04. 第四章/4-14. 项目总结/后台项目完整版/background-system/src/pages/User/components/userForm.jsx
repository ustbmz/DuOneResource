import { Button, Form, Input, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';

const { TextArea } = Input;

function UserForm({ type, submitHandle, userInfo, setUserInfo }) {
  let formRef = useRef();
  if (formRef.current) {
    formRef.current.setFieldsValue(userInfo);
  }

  // 头像容器
  let avatarPreview = null;
  if (type === 'edit') {
    avatarPreview = (
      <Form.Item label="当前头像" name="avatarPreview">
        <Image src={userInfo?.avatar} width={100} />
      </Form.Item>
    );
  }

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newUserInfo = { ...userInfo };
    if (typeof newInfo === 'string') {
      newUserInfo[key] = newInfo.trim();
    } else {
      newUserInfo[key] = newInfo;
    }
    setUserInfo(newUserInfo);
  }

  return (
    <Form
      name="basic"
      initialValues={userInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={submitHandle}
    >
      {/* 登录账号 */}
      <Form.Item
        label="登录账号"
        name="loginId"
        rules={[{ required: true, message: '请输入登录账号' }]}
      >
        <Input
          value={userInfo?.loginId}
          placeholder="账号为必填项"
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
        />
      </Form.Item>

      {/* 登录密码 */}
      <Form.Item label="登录密码" name="loginPwd">
        <Input.Password
          rows={6}
          placeholder="密码可选，默认密码为123456"
          value={userInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        />
      </Form.Item>

      {/* 用户昵称 */}
      <Form.Item label="用户昵称" name="nickname">
        <Input
          placeholder="昵称可选，默认为新用户"
          value={userInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        />
      </Form.Item>

      {avatarPreview}
      {/* 用户头像 */}
      <Form.Item label="用户头像" valuePropName="fileList">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成
              const url = e.file.response.data;
              updateInfo(url, 'avatar');
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              头像可选
            </div>
          </div>
        </Upload>
      </Form.Item>

      {/* 用户邮箱 */}
      <Form.Item label="用户邮箱" name="mail">
        <Input
          value={userInfo?.mail}
          placeholder="选填"
          onChange={(e) => updateInfo(e.target.value, 'mail')}
        />
      </Form.Item>

      {/* 用户qq */}
      <Form.Item label="QQ号码" name="qq">
        <Input
          value={userInfo?.qq}
          placeholder="选填"
          onChange={(e) => updateInfo(e.target.value, 'qq')}
        />
      </Form.Item>

      {/* 用户微信 */}
      <Form.Item label="微信号" name="wechat">
        <Input
          value={userInfo?.wechat}
          placeholder="选填"
          onChange={(e) => updateInfo(e.target.value, 'wechat')}
        />
      </Form.Item>

      {/* 自我介绍 */}
      <Form.Item label="自我介绍" name="intro">
        <TextArea
          rows={6}
          value={userInfo?.intro}
          placeholder="选填"
          onChange={(e) => updateInfo(e.target.value, 'intro')}
        />
      </Form.Item>

      {/* 确认修改按钮 */}
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
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

export default UserForm;
