import { useState, useEffect, useRef } from 'react';
import { Comment, Avatar, Form, Button, List, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { getIssueCommentById } from "../api/comment";
import { getUserById } from "../api/user";
import { formatDate } from "../utils/tools"

/**
 * 评论组件
 */
function Discuss(props) {

    const { userInfo, isLogin } = useSelector(state => state.user);
    const [commentList, setCommentList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current: 1, // 当前是第一页
        pageSize: 10, // 每一页显示 10 条数据
        total: 0, // 数据的总条数
    });

    const editorRef = useRef();
    useEffect(() => {
        async function fetchCommentList() {
            let data = null;
            if (props.commentType === 1) {
                // 传递过来的是问答的 id，所以需要获取该问答 id 所对应的评论
                const result = await getIssueCommentById(props.targetId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize
                });
                data = result.data;
            } else if (props.commentType === 2) {
                // 传递过来的是书籍的 id，所以需要获取该书籍 id 所对应的评论
            }
            for (let i = 0; i < data.data.length; i++) {
                const result = await getUserById(data.data[i].userId);
                // 将用户的信息添加到评论对象上面
                data.data[i].userInfo = result.data;
            }
            // 更新评论数据
            setCommentList(data.data);
            // 更新分页数据
            setPageInfo({
                currentPage: data.currentPage,
                eachPage: data.eachPage,
                count: data.count,
                totalPage: data.totalPage
            })
        }
        if (props.targetId) {
            fetchCommentList();
        }
    }, [props.targetId]);

    // 根据登录状态进行头像处理
    let avatar = null;
    if (isLogin) {
        avatar = (<Avatar src={userInfo.avatar} />);
    } else {
        avatar = (<Avatar icon={<UserOutlined />} />);
    }

    return (
        <div>
            {/* 评论框 */}
            <Comment
                avatar={avatar}
                content={
                    <>
                        <Form.Item>
                            <Editor
                                initialValue=""
                                previewStyle="vertical"
                                height="270px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                language='zh-CN'
                                ref={editorRef}
                                className="editor"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                disabled={isLogin ? false : true}
                            >添加评论</Button>
                        </Form.Item>
                    </>
                }
            />

            {/* 评论列表 */}
            {
                commentList?.length > 0
                &&
                <List
                    header="当前评论"
                    dataSource={commentList}
                    renderItem={(item) => (
                        <Comment
                            avatar={<Avatar src={item.userInfo.avatar} />}
                            content={
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.commentContent }}
                                ></div>
                            }
                            datetime={
                                <Tooltip title={formatDate(item.commentDate, 'year')}>
                                  <span>{formatDate(item.commentDate, 'year')}</span>
                                </Tooltip>
                              }
                        />
                    )}
                />
            }

            {/* 分页 */}
        </div>
    );
}

export default Discuss;