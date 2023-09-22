import React from 'react'
import ErrorBound from "./components/common/ErrorBound"

function Comp1() {
    return <div style={{
        width: "90%",
        height: 500,
        border: "2px solid"
    }}>
        <h1>Comp1</h1>
        <Comp2 />
    </div>
}


function Comp2() {
    return <div style={{
        width: "70%",
        height: "70%",
        border: "2px solid"
    }}>
        <h1 onClick={()=>{
            throw new Error("点击时发生的错误")
        }}>Comp2</h1>
    </div>
}

function Comp3() {
    return <div style={{
        width: "90%",
        height: 500,
        border: "2px solid"
    }}>
        <h1>Comp3</h1>
    </div>
}

export default function App() {
    return <div>
        <ErrorBound>
            <Comp1 />
        </ErrorBound>
        <Comp3 />
    </div>
}
