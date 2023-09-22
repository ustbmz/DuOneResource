import { Form, Button, Input, message, Select } from "antd";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import "@toast-ui/editor/dist/i18n/zh-cn";

import styles from "../css/AddIssue.module.css"
import { useSelector,useDispatch } from "react-redux"

import { addIssue } from "../api/issue"
import { typeOptionCreator } from "../utils/tool"
import { getTypeList } from "../redux/typeSlice"

function AddIssue() {

    const formRef = useRef();
    const editorRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [issueInfo, setIssueInfo] = useState({
        issueTitle: "", // 问题标题
        issueContent: "", // 问题描述
        typeId: "", // 问题分类
    });

    // 从仓库获取类型列表
    const { typeList } = useSelector(state => state.type);
    // 从仓库获取用户信息
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }
    }, [])


    // 用户填写内容时更新表单控件内容
    function updateInfo(newInfo, key) {
        const newIssueInfo = { ...issueInfo };
        if (typeof newInfo === 'string') {
            newIssueInfo[key] = newInfo.trim();
        } else {
            newIssueInfo[key] = newInfo;
        }
        setIssueInfo(newIssueInfo);
    }

    /**
     * 首先获取 md 编辑器中的内容，然后再手动触发 submitHandle
     */
    function addHandle() {
        const content = editorRef.current.getInstance().getHTML();
        addIssue({
            issueTitle: issueInfo.issueTitle, // 问题标题
            issueContent: content, // 问题描述
            userId: userInfo._id, // 用户 id
            typeId : issueInfo.typeId,
        });
        // 跳转回首页
        navigate('/issues');
        message.success('你的问题已提交，审核通过后将会进行展示');
    }

    const handleChange = (value) => {
        updateInfo(value, 'typeId')
    };


    return (
        <div className={styles.container}>
            <Form
                name="basic"
                initialValues={issueInfo}
                autoComplete="off"
                ref={formRef}
                onFinish={addHandle}
            >
                {/* 问答标题 */}
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input
                        placeholder="请输入标题"
                        size="large"
                        value={issueInfo.issueTitle}
                        onChange={(e) => updateInfo(e.target.value, 'issueTitle')}
                    />
                </Form.Item>

                {/* 问题类型 */}
                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{ required: true, message: '请选择问题所属分类' }]}
                >
                    <Select
                        style={{ width: 200 }}
                        onChange={handleChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>


                {/* 问答内容 */}
                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{ required: true, message: '请输入问题描述' }]}
                >
                    <Editor
                        initialValue=""
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        language='zh-CN'
                        ref={editorRef}
                    />

                </Form.Item>


                {/* 确认修改按钮 */}
                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>

                    <Button type="link" htmlType="submit" className="resetBtn">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default AddIssue;