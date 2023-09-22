import { useState, useEffect, useRef } from 'react';
import { Comment, Avatar, Form, Button, List, Tooltip, message, Pagination } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { getIssueCommentById } from "../api/comment";
import { getUserById } from "../api/user";
import { formatDate } from "../utils/tools";
import { addComment } from "../api/comment";
import { updateIssue } from "../api/issue";
import { updateUserInfoAsync } from "../redux/userSlice";
import { useDispatch } from "react-redux";

import styles from "../css/Discuss.module.css"
/**
 * 评论组件
 */
function Discuss(props) {

    const { userInfo, isLogin } = useSelector(state => state.user);
    const [commentList, setCommentList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        current: 1, // 当前是第一页
        pageSize: 10, // 每一页显示 10 条数据
        total: 0, // 数据的总条数
    });
    const dispatch = useDispatch();

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
                // .....
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
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count,
            })
        }
        if (props.targetId) {
            fetchCommentList();
        }
    }, [props.targetId, refresh]);

    // 根据登录状态进行头像处理
    let avatar = null;
    if (isLogin) {
        avatar = (<Avatar src={userInfo.avatar} />);
    } else {
        avatar = (<Avatar icon={<UserOutlined />} />);
    }

    /**
     * 添加评论的回调函数
     */
    function onSubmit() {
        let newComment = null;
        if (props.commentType === 1) {
            // 说明是新增问答的评论
            newComment = editorRef.current.getInstance().getHTML();
            if (newComment === "<p><br></p>") {
                newComment = "";
            }
           
        } else if (props.commentType === 2) {
            // 说明是新增书籍的评论
        }
        console.log(newComment, 'newComment');
        if (!newComment) {
            message.warning("请输入评论内容");
            return;
        }
        // 提交评论
        addComment({
            userId: userInfo._id,
            typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
            commentContent: newComment,
            commentType: props.commentType,
            bookId: null,
            issueId: props.targetId
        });
        message.success("评论成功");
        setRefresh(!refresh);
        editorRef.current.getInstance().setHTML("");

         // 更新该问答评论数
         updateIssue(props.targetId, {
            commentNumber: props.issueInfo? ++props.issueInfo.commentNumber : ++props.bookInfo.commentNumber
        });

        // 更新积分的变化
        dispatch(updateUserInfoAsync({
            userId : userInfo._id,
            newInfo : {
                points : userInfo.points + 4
            }
        }));

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
                                onClick={onSubmit}
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
            {
                commentList.length > 0 ? (
                    <div className={styles.paginationContainer}>
                        <Pagination 
                            showQuickJumper
                            defaultCurrent={1}
                            total={pageInfo.total}
                        />
                    </div>
                ) : (
                    <div style={{
                        fontWeight:"200",
                        textAlign:"center",
                        margin:"50px"
                    }}
                    >暂无评论</div>
                )
            }
        </div>
    );
}

export default Discuss;