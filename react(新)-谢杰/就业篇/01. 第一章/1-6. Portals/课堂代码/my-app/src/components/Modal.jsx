// 弹出框

import React from 'react';
import { createPortal } from 'react-dom';

function Modal() {
    // 之前是直接返回的一段 JSX
    // 那么现在我们就通过 Portals 来指定这段 JSX 渲染到哪里
    return createPortal((
        <div
            style={{
                width: "450px",
                height: "250px",
                border: "1px solid",
                position: "absolute",
                left: "calc(50% - 225px)",
                top: "calc(50% - 125px)",
                textAlign: "center",
                lineHeight: "250px"
            }}
        >
            模态框
        </div>
    ), document.getElementById("modal"));
}

export default Modal;