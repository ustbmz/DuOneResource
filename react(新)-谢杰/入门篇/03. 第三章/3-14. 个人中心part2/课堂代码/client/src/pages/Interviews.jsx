import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getInterviewTitleAsync } from "../redux/interviewSlice";
import { getTypeList } from "../redux/typeSlice";
import PageHeader from "../components/PageHeader";
import { Tree, BackTop } from "antd";
import { getInterviewById } from "../api/interview"

import styles from "../css/Interview.module.css"

function Interviews(props) {
    const { interviewTitleList } = useSelector(state => state.interview);
    const { typeList } = useSelector(state => state.type);
    const dispatch = useDispatch();
    const [treeData, setTreeData] = useState([]);
    // 该状态用于存储 id 对应的面试题内容
    const [interviewInfo, setInterviewInfo] = useState(null);

    useEffect(() => {
        // 每个分类下面的面试题标题
        if (!interviewTitleList.length) {
            // 初始化仓库里面的面试题标题
            dispatch(getInterviewTitleAsync());
        }
        // 分类名
        if (!typeList.length) {
            dispatch(getTypeList());
        }
        // 上面两个面试题准备好之后，就可以开始组装 tree 组件所需的 data 数组了
        if (typeList.length && interviewTitleList.length) {
            const arr = []; // 最终组装的数据会放入到该数组中
            // 添加分类标题
            for (let i = 0; i < typeList.length; i++) {
                arr.push({
                    title: (<h3 style={{ fontWeight: '200' }}>
                        {typeList[i].typeName}
                    </h3>),
                    key: i
                })
            }
            // 每一个分类下面的面试题标题
            for (let i = 0; i < interviewTitleList.length; i++) {
                const childArr = [];
                for (let j = 0; j < interviewTitleList[i].length; j++) {
                    childArr.push({
                        title: (<h4 style={{ fontWeight: '200' }} onClick={() => clickHandle(interviewTitleList[i][j]._id)}>
                            {interviewTitleList[i][j].interviewTitle}
                        </h4>),
                        key: `${i}-${j}`
                    })
                }
                arr[i].children = childArr;
            }
            setTreeData(arr);
        }
    }, [typeList, interviewTitleList])

    async function clickHandle(id) {
        const { data } = await getInterviewById(id);
        setInterviewInfo(data);
    }


    let interviewRightSide = null;
    if (interviewInfo) {
        // 赋值为面试题的内容
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
            <BackTop />
        </div>
    );
}

export default Interviews;