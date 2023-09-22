import React from 'react';

function getData() {
    // return ["HTML", "CSS", "JS"]
}

function ChildCom3() {

    const arr = getData();

    const lis = arr.map((it, index) => (<li key={index}>{it}</li>))

    return (
        <ul
            style={{
                border: '1px solid'
            }}
        >
            {lis}
        </ul>

    );
}

export default ChildCom3;