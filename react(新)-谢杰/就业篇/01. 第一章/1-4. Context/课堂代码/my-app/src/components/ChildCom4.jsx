import { useContext } from 'react';
import { MyContext1 } from "../context"

function ChildCom4() {

    const { a, b, c } = useContext(MyContext1);
    return (
        <div
            style={{
                border: '1px solid',
                width: "200px",
                userSelect: 'none'
            }}
        >
            ChildCom4
            <div>a:{a}</div>
            <div>b:{b}</div>
            <div>c:{c}</div>
        </div>
    );
}

export default ChildCom4;