import React from 'react';
import ChildCom3 from "./ChildCom3";
import ErrorBoundary from './ErrorBoundary';

function ChildCom1() {
    return (
        <div style={{
            width: '300px',
            height: '300px',
            border: '1px solid'
        }}>
            ChildCom1
            <ErrorBoundary>
                <ChildCom3 />
            </ErrorBoundary>
        </div>
    );
}

export default ChildCom1;