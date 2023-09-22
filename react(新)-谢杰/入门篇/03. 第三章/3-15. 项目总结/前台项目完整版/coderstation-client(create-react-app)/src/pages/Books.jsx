import { useEffect, useState } from 'react';
import { Card, Pagination } from "antd"
import PageHeader from "../components/PageHeader"
import TypeSelect from "../components/TypeSelect"
import { getBookByPage } from '../api/book'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

import styles from "../css/Books.module.css"

const { Meta } = Card;

function Books(props) {

    const [bookInfo, setBookInfo] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15,
        total: 0
    });

    const navigate = useNavigate();
    const { bookTypeId } = useSelector(state => state.type);

    useEffect(() => {
        async function fetchData() {
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
            };
            if (bookTypeId !== "all") {
                searchParams.typeId = bookTypeId;
                // 如果按照分类进行查找，需要将当前页重新设置为第一页
                searchParams.current = 1;
            }
            console.log(searchParams,'searchParams');
            const { data } = await getBookByPage(searchParams)
            setBookInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count,
            });
        }
        fetchData();
    }, [bookTypeId, pageInfo.current, pageInfo.pageSize])

    const bookData = [];
    if (bookInfo.length) {
        for (let i = 0; i < bookInfo.length; i++) {
            bookData.push(<Card
                hoverable
                style={{
                    width: 200,
                    marginBottom: 30
                }}
                cover={<img alt="example" style={{
                    width: 160,
                    height: 200,
                    margin: 'auto',
                    marginTop: 10
                }} src={bookInfo[i]?.bookPic} />}
                key={i}
                onClick={() => navigate(`/books/${bookInfo[i]._id}`)}
            >
                <Meta title={bookInfo[i]?.bookTitle} />
                <div className={styles.numberContainer}>
                    <div>浏览数：{bookInfo[i]?.scanNumber}</div>
                    <div>评论数：{bookInfo[i]?.commentNumber}</div>
                </div>
            </Card>);
        }
        if (bookInfo.length % 5 !== 0) {
            var blank = 5 - bookInfo.length % 5;
            for (let i = 1; i <= blank; i++) {
                bookData.push(<div style={{ width: 220, marginBottom: 20 }} key={i * Math.random()}></div>)
            }
        }
    }

    /**
     *
     * @param {*} page 当前页
     * @param {*} pageSize 每页条数
     */
    function handlePageChange(current, pageSize) {
        setPageInfo({
            current,
            pageSize,
        });
    }

    return (
        <div>
            <PageHeader title="最新资源">
                <TypeSelect />
            </PageHeader>
            <div className={styles.bookContainer}>
                {bookData}
            </div>
            <div className="paginationContainer">
                {
                    bookData.length > 0 ? (
                        <Pagination showQuickJumper defaultCurrent={1}  {...pageInfo} onChange={handlePageChange} />
                    ) : (
                        <div style={{
                            fontSize: "26px",
                            fontWeight:"200"
                        }}>该分类下暂无书籍</div>
                    )
                }

            </div>
        </div>
    );
}

export default Books;