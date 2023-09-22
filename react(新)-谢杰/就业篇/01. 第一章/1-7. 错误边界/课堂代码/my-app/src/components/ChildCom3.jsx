import React from 'react';
import ChildCom4 from "./ChildCom4";

function getData() {
    return ["苹果", "香蕉", "西瓜"]
}

function ChildCom3() {

    const arr = getData();

    const lis = arr.map((it, index) => (<li key={index}>{it}</li>))

    return (
        <div style={{
            border: '1px solid'
        }}>
            <ul>
                {lis}
            </ul>
            <ChildCom4/>
        </div>

    );
}

export default ChildCom3;