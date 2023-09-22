import React from 'react';
import IssueItem from "../components/IssueItem";
import BookItem from "../components/BookItem";

/**
 * 该组件只是一个容器组件，如果搜索的是问答，则返回 IssueItem
 * 如果搜索的是书籍，则返回 BookItem
 * @param {*} props 
 * @returns 
 */
function SearchResultItem(props) {

    return (
        <>
            {
                props.info.issueTitle ? <IssueItem issueInfo={props.info}/> : <BookItem bookInfo={props.info}/>
            }
        </>
    );
}

export default SearchResultItem;