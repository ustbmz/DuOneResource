import React from 'react';

import unImg from "../img/not_found.png"

function NotFound(props) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '75vh',
                justifyContent: 'center',
            }}
        >
            <img src={unImg} alt="" />
        </div>
    );
}

export default NotFound;