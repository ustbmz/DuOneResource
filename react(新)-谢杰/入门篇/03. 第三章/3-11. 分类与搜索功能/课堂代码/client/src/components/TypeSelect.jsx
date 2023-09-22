import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getTypeList,updateIssueTypeId } from "../redux/typeSlice";
import { Tag } from "antd";

/**
 * 分类组件
 */
function TypeSelect(props) {

    // 拿到分类的信息
    const { typeList } = useSelector(state => state.type);
    const dispatch = useDispatch();
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    const [tagContainer, setTagContainer] = useState([]);

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }
        if (typeList.length) {
            // 说明当前仓库已经存储了分类信息
            const arr = [];
            arr.push(
                <Tag
                    color="magenta"
                    value="all"
                    key="all"
                    style={{ cursor: "pointer" }}
                    onClick={()=>changeType('all')}
                >全部</Tag>
            )
            for (let i = 0; i < typeList.length; i++) {
                arr.push(
                    <Tag
                        color={colorArr[i % colorArr.length]}
                        value={typeList[i]._id}
                        key={typeList[i]._id}
                        style={{ cursor: "pointer" }}
                        onClick={()=>changeType(typeList[i]._id)}
                    >{typeList[i].typeName}</Tag>
                )
            }
            setTagContainer(arr);
        }
    }, [typeList]);

    function changeType(typeId){
        // 更新状态仓库对应的 issueTypeId 或者 bookTypeId
        if(location.pathname === "/issues"){
            // 处于问答页面
            dispatch(updateIssueTypeId(typeId));
        } else if(location.pathname === "/books"){
            // 处于书籍页面
        }
    }

    return (
        <div>
            {tagContainer}
        </div>
    );
}

export default TypeSelect;