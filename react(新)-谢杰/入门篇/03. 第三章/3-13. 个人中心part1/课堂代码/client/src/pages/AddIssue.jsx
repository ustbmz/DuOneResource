import { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { getTypeList } from "../redux/typeSlice";
import {addIssue} from "../api/issue";
import { useNavigate } from 'react-router-dom';
import { typeOptionCreator } from "../utils/tools"

import styles from "../css/AddIssue.module.css";

function AddIssue(props) {

    const formRef = useRef();
    const editorRef = useRef();

    const { typeList } = useSelector(state => state.type);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [issueInfo, setIssueInfo] = useState({
        issueTitle: "",
        issueContent: "",
        userId: "",
        typeId: "",
    });

    useEffect(()=>{
        if(!typeList.length){
            // 派发 action 来发送请求，获取到数据填充到状态仓库
            dispatch(getTypeList());
        }
    },[])

    /**
     * 提交问答的回调函数
     */
    function addHandle() {
        const content = editorRef.current.getInstance().getHTML();
        // 重新构建要提交给服务器的 issueInfo
        addIssue({
            issueTitle: issueInfo.issueTitle,
            issueContent: content,
            userId: userInfo._id,
            typeId: issueInfo.typeId,
        });
        navigate("/");
        message.success("你的问题已经提交，审核通过后将会进行展示");
    }

    function updateInfo(newContent, key) {
        const newIssueInfo = { ...issueInfo };
        newIssueInfo[key] = newContent;
        setIssueInfo(newIssueInfo);
    }

    /**
     * 下拉列表选项改变的时候会触发的回调
     */
    function handleChange(value) {
        updateInfo(value, 'typeId')
    }

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


                {/* 确认按钮 */}
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