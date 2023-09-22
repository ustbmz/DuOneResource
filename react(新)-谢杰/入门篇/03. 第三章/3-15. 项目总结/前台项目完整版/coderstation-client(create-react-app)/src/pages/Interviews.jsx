import React from 'react';
import { Tree, BackTop } from "antd"

import { useSelector, useDispatch } from 'react-redux'
import { getInterviewTitleList } from "../redux/interviewSlice"
import { getTypeList } from "../redux/typeSlice"
import { useState, useEffect } from "react"
import { getInterviewById } from "../api/interview"

import PageHeader from "../components/PageHeader"

import styles from "../css/Interview.module.css"

function Interviews(props) {

    const dispatch = useDispatch();
    const { typeList } = useSelector(state => state.type);
    const { interviewTitleList } = useSelector(state => state.interview);
    const [treeData, setTreeData] = useState([]);
    const [interviewInfo, setInterviewInfo] = useState(null);

    useEffect(() => {
        if (!interviewTitleList.length) {
            dispatch(getInterviewTitleList());
        }
        if (!typeList.length) {
            dispatch(getTypeList())
        }
        if (typeList.length && interviewTitleList.length) {
            // 开始组装 treeData
            const arr = [];
            for (let i = 0; i < typeList.length; i++) {
                arr.push({
                    title: (<h3 style={{
                        fontWeight:"200"
                    }}>{typeList[i].typeName}</h3>),
                    key: i
                })
            }
            for (let i = 0; i < interviewTitleList.length; i++) {
                const childrenArr = [];
                for (let j = 0; j < interviewTitleList[i].length; j++) {
                    childrenArr.push({
                        title: (<h4 
                            onClick={() => clickHandle(interviewTitleList[i][j]._id)}
                            style={{
                                fontWeight:"200"
                            }}
                            >{interviewTitleList[i][j].interviewTitle}</h4>),
                        key: `${i}-${j}`,
                    })
                }
                arr[i].children = childrenArr;
            }
            setTreeData(arr);
        }
    }, [typeList, interviewTitleList])

    async function clickHandle(interviewId) {
        const { data } = await getInterviewById(interviewId);
        setInterviewInfo(data);
    }

    let interviewRightSide = null;
    if (interviewInfo) {
        interviewRightSide = (
            <div className={styles.content}>
                <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
                <div className={styles.contentContainer}>
                    <div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}></div>
                </div>
            </div>
        );
    } else {
        interviewRightSide = (
            <div style={{
                textAlign: "center",
                fontSize: "40px",
                fontWeight: "100",
                marginTop: "150px"
            }}>
                请在左侧选择面试题
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <PageHeader title="面试题大全" />
            <div className={styles.interviewContainer}>
                <div className={styles.leftSide}>
                    <Tree
                        treeData={treeData}
                    />
                </div>
                <div className={styles.rightSide}>
                    {interviewRightSide}
                </div>
            </div>
            <BackTop/>
        </div>
    );
}

export default Interviews;