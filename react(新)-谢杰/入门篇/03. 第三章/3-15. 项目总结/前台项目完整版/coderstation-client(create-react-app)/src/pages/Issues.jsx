import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import { Pagination } from "antd"
import { getIssueByPage } from '../api/issue'

import PageHeader from "../components/PageHeader"
import IssueItem from "../components/IssueItem"
import ScoreRank from "../components/ScoreRank"
import Recommend from "../components/Recommend"
import TypeSelect from '../components/TypeSelect';
import AddIssue from "../components/AddIssueBtn"

import styles from "../css/Issue.module.css"

function Issue(props) {

    const [issueInfo, setIssueInfo] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15,
        total:0
    });

    const { issueTypeId } = useSelector(state => state.type);

    useEffect(() => {
        async function fetchData() {
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true,
            };
            if (issueTypeId !== "all") {
                searchParams.typeId = issueTypeId;
                // 如果按照分类进行查找，需要将当前页重新设置为第一页
                searchParams.current = 1;
            }
            const { data } = await getIssueByPage(searchParams);
            setIssueInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count,
            });
        }
        fetchData();
    }, [issueTypeId, pageInfo.current, pageInfo.pageSize])




    let questionData = [];
    for (var i = 0; i < issueInfo.length; i++) {
        questionData.push(
            <IssueItem key={i} issueInfo={issueInfo[i]} />
        )
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
        <div className="container">
            <PageHeader title="问答列表">
                <TypeSelect />
            </PageHeader>
            <div className={styles.issueContainer}>
                {/* 左边部分 */}
                <div className={styles.leftSide}>
                    {questionData}
                    {
                        issueInfo.length > 0 ? (
                            <div className="paginationContainer">
                                <Pagination showQuickJumper defaultCurrent={1} {...pageInfo} onChange={handlePageChange}/>
                            </div>
                        ) : (<div className={styles.noIssue}>有问题，就来 coder station！</div>)
                    }

                </div>
                {/* 右边部分 */}
                <div className={styles.rightSide}>
                    {/* 添加问答按钮 */}
                    <AddIssue />
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <ScoreRank />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Issue;