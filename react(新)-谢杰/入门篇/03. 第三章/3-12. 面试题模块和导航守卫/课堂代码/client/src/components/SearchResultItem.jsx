import React from 'react';
import IssueItem from "../components/IssueItem";

/**
 * 存储搜索结果的项目
 * 该组件是根据搜索的类型返回不同类型的搜索项目组件（IssueItem or BookItem）
 * 像这一类组件，没有自己的 JSX 视图，而是充当一个容器一般的存在
 * 这一类组件，我们称之为容器组件
 */
function SearchResultItem(props) {
    return (
        <div>
            {
                props.info.issueTitle ?
                    <IssueItem issueInfo={props.info} />
                    :
                    null
            }
        </div>
    );
}

export default SearchResultItem;