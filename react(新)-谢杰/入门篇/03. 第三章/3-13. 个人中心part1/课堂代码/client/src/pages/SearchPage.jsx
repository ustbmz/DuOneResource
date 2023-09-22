import {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader"
import AddIssueBtn from "../components/AddIssueBtn"
import Recommend from "../components/Recommend"
import ScoreRank from "../components/ScoreRank";
import {getIssueByPage} from "../api/issue";
import SearchResultItem from "../components/SearchResultItem"

import styles from "../css/SearchPage.module.css"
/**
 * 搜索结果页
 */
function SearchPage(props) {

    const location = useLocation();
    // 存储搜索结果
    const [searchResult, setSearchResult] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15,
        total: 0
    });

    useEffect(() => {
        async function fetchData(state){
            // state ====> {value: '123', searchOption: 'issue'}
            const {value, searchOption} = state;
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true,
            }
            switch(searchOption){
                case "issue":{
                    searchParams.issueTitle = value;
                    const {data} = await getIssueByPage(searchParams);
                    // 更新搜索结果
                    setSearchResult(data.data);
                    // 更新分页信息
                    setPageInfo({
                        current: data.currentPage,
                        pageSize: data.eachPage,
                        total: data.count,
                    });
                    break;
                }
                case "book":{
                    // 搜索书籍
                    break;
                }
            }
        }
        if(location.state){
            fetchData(location.state);
        }
    },[location.state]);


    return (
        <div className="container">
            <PageHeader title="搜索结果"/>
            <div className={styles.searchPageContainer}>
                {/* 左边部分 */}
                <div className={styles.leftSide}>
                    {
                        searchResult.map(item=>{
                            return <SearchResultItem info={item} key={item._id}/>
                        })
                    }
                </div>
                {/* 右边部分 */}
                <div className={styles.rightSide}>
                    <AddIssueBtn />
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

export default SearchPage;