import { useState } from 'react';

// 该组件负责公共的逻辑
function MouseMove(props) {

    const [points, setPoints] = useState({
        x: 0,
        y: 0
    })

    function mouseMoveHandle(e) {
        setPoints({
            x: e.clientX,
            y: e.clientY
        })
    }

    return (
        props.children ? props.children({points, mouseMoveHandle}) : null
    );
}

export default MouseMove;