import React from 'react';
import PageHeader from "../components/PageHeader"
import Discuss from "../components/Discuss"
import { Image, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateStoreUserInfo } from "../redux/userSlice"

import { getBookById, updateBook } from "../api/book"
import { editUser } from "../api/user"

import styles from "../css/BookDetail.module.css"


function BookDetail(props) {

    const { id } = useParams(); // 获取可能传递过来的 id
    const [bookInfo, setBookInfo] = useState(null);
    // 获取用户信息
    const { userInfo, isLogin } = useSelector(state => state.user);

    const dispatch = useDispatch();

    // 根据传递过来的 id 获取面试题详情
    useEffect(() => {
        async function fetchData() {
            // 根据问答 id 获取该问答具体的信息
            const { data } = await getBookById(id);
            setBookInfo(data);

            // 该书籍的浏览数 +1
            updateBook(data._id, {
                scanNumber: ++data.scanNumber
            })
        }
        fetchData();
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // 确定下载
        // 需要判断积分是否足够
        if (userInfo.points - bookInfo.requirePoints < 0) {
            message.warning("积分不足");
        } else {
            // 积分是够的 
            // 服务器扣积分
            editUser(userInfo._id, {
                points: userInfo.points - bookInfo.requirePoints
            });
            // 本地仓库也需要更新
            dispatch(updateStoreUserInfo({
                points: userInfo.points - bookInfo.requirePoints
            }))
            window.open(`${bookInfo.downloadLink}`);
            message.success("积分已扣除");
        }
        setIsModalOpen(false);
    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <div>
            <PageHeader title="书籍详情" />
            <div className={styles.bookInfoContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.img}>
                        <Image
                            height={350}
                            src={bookInfo?.bookPic}
                        />
                    </div>
                    <div className={styles.link}>
                        <span>下载所需积分: <span className={styles.requirePoints}>{bookInfo?.requirePoints}</span> 分</span>
                        {
                            isLogin ? (
                                <div className={styles.downloadLink} onClick={showModal}>
                                    百度云下载地址
                                </div>
                            ) : null
                        }

                    </div>
                </div>
                <div className={styles.rightSide}>
                    <h1 className={styles.title}>{bookInfo?.bookTitle}</h1>
                    <div dangerouslySetInnerHTML={{ __html: bookInfo?.bookIntro }}></div>
                </div>
            </div>
            <div className={styles.comment}>
                <Discuss
                    bookInfo={bookInfo}
                    commentType={2}
                    targetId={bookInfo?._id}
                />
            </div>
            <Modal title="重要提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>是否使用 <span className={styles.requirePoints}>{bookInfo?.requirePoints}</span> 积分下载此书籍？</p>
            </Modal>
        </div>
    );
}

export default BookDetail;