import { useRef, useEffect, useState } from 'react';
import { Button, Form, Input, Upload, Image, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import { Editor } from '@toast-ui/react-editor';
import { typeOptionCreator } from '@/utils/tool';
import { useSelector, useDispatch } from "umi";

function BookForm({ type, bookInfo, setBookInfo, submitHandle }) {

    const formRef = useRef(); // 关联表单
    const editorRef = useRef(); // 关联 markdown 编辑器

    const [ firstIn, setFirstIn ] = useState(true); // 记录是否是第一次进入

    const dispatch = useDispatch();

    // 这里需要注意的就是关于有 markdown 编辑器时数据的回填
    useEffect(()=>{
        if(formRef.current && firstIn && bookInfo){
            formRef.current.setFieldsValue(bookInfo);
            // 关键就是关于编辑器的回填
            editorRef.current.getInstance().setHTML(bookInfo?.bookIntro);
            // 将 firstIn 设置为 false
            setFirstIn(false);
        }
        if(formRef.current){
            formRef.current.setFieldsValue(bookInfo);
        }
    },[bookInfo])

    let bookPicPreview = null;
    if (type === "edit") {
        bookPicPreview = (
            <Form.Item label="当前封面" name="bookPicPreview">
                <Image src={bookInfo?.bookPic} width={100} />
            </Form.Item>
        );
    }

    // 从仓库获取所有的分类
    const { typeList } = useSelector((state) => state.type);

    useEffect(() => {
        if (!typeList.length) {
            dispatch({
                type: "type/_initTypeList"
            })
        }
    }, [])


    function addHandle() {
        // 因为我们需要获取 markdown editor 的值
        const content = editorRef.current.getInstance().getHTML();
        submitHandle(content);
    }

    /**
     * 用户在填写表单信息的时候，实时的修改 bookInfo 状态
     * @param {*} newContent 
     * @param {*} key 
     */
    function updateInfo(newContent, key) {
        const newBookInfo = { ...bookInfo };
        newBookInfo[key] = newContent;
        setBookInfo(newBookInfo);
    }

    /**
     * 积分下拉列表改变时对应的回调
     */
    function handlePointChange(value) {
        updateInfo(value, 'requirePoints');
    }

    /**
     * 分类下拉列表改变时对应的回调
     */
    function handleTypeChange(value) {
        updateInfo(value, 'typeId');
    }

    return (
        <Form
            name="basic"
            initialValues={bookInfo}
            autoComplete="off"
            ref={formRef}
            onFinish={addHandle}
        >
            {/* 书籍标题 */}
            <Form.Item
                label="书籍标题"
                name="bookTitle"
                rules={[{ required: true, message: '请输入书名' }]}
            >
                <Input
                    value={bookInfo?.bookTitle}
                    onChange={(e) => updateInfo(e.target.value, 'bookTitle')}
                />
            </Form.Item>

            {/* 书籍介绍，需要使用到 markdown editor */}
            <Form.Item
                label="书籍介绍"
                name="bookIntro"
                rules={[{ required: true, message: '请输入书本相关的介绍' }]}
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

            <Form.Item
                label="下载链接"
                name="downloadLink"
                rules={[{ required: true, message: '请输入书籍链接' }]}
            >
                <Input
                    value={bookInfo?.downloadLink}
                    onChange={(e) => updateInfo(e.target.value, 'downloadLink')}
                />
            </Form.Item>

            <Form.Item
                label="所需积分"
                name="requirePoints"
                rules={[{ required: true, message: '请选择下载所需积分' }]}
            >
                <Select style={{ width: 200 }} onChange={handlePointChange}>
                    <Select.Option value={20} key={20}>20</Select.Option>
                    <Select.Option value={30} key={30}>30</Select.Option>
                    <Select.Option value={40} key={40}>40</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="书籍分类"
                name="typeId"
                rules={[{ required: true, message: '请选择书籍分类' }]}
            >
                <Select style={{ width: 200 }} onChange={handleTypeChange}>
                    {typeOptionCreator(Select, typeList)}
                </Select>
            </Form.Item>

            {/* 书籍图片的预览，这个是在修改书籍的时候会显示之前书籍的图片 */}
            {bookPicPreview}

            <Form.Item label="书籍封面" valuePropName="fileList">
                <Upload
                    action="/api/upload"
                    listType="picture-card"
                    maxCount={1}
                    onChange={(e) => {
                        if (e.file.status === 'done') {
                            // 说明上传已经完成
                            const url = e.file.response.data;
                            updateInfo(url, 'bookPic');
                        }
                    }}
                >
                    <PlusOutlined />
                </Upload>
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

export default BookForm;