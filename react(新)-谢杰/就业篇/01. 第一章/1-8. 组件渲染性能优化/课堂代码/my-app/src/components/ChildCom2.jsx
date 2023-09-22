import React from "react"
function ChildCom2(props) {
    console.log("ChildCom2 渲染了")
    return (
        <div style={{
            width: "200px",
            height: "100px",
            border: "1px solid"
        }}>
            ChildCom2
            <div>{props.counter}</div>
            <button onClick={() => props.setCounter(props.counter + 1)}>+1</button>
            <button onClick={()=>props.test()}>test</button>
        </div>
    );
}

export default React.memo(ChildCom2);