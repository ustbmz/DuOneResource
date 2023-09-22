import { Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getTypeList } from "../redux/typeSlice"
import { useState, useEffect } from "react"
import { updateStoreIssueTypeId,updateStoreBookTypeId } from "../redux/typeSlice"

function TypeSelect(props) {

    const dispatch = useDispatch();
    const { typeList } = useSelector(state => state.type);
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    const [tagContainer, setTagContainer] = useState([]);

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }
        if (typeList.length) {
            const arr = [];
            arr.push(
                <Tag
                    color="magenta"
                    value="all"
                    key="all"
                    style={{ cursor: "pointer" }}
                    onClick={() => changeType("all")}
                >全部</Tag>);
            for (let i = 0; i < typeList.length; i++) {
                arr.push(
                    <Tag
                        color={colorArr[i % colorArr.length]}
                        value={typeList[i]._id}
                        key={typeList[i]._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => changeType(typeList[i]._id)}
                    >
                        {typeList[i].typeName}
                    </Tag>
                )
            }
            setTagContainer(arr);
        }
    }, [typeList])

    function changeType(typeId) {
        if(location.pathname === "/issues"){
            dispatch(updateStoreIssueTypeId(typeId));
        } else if(location.pathname === "/books"){
            dispatch(updateStoreBookTypeId(typeId));
        }
    }

    return (
        <div>
            {tagContainer}
        </div>
    );
}

export default TypeSelect;