import React from 'react';
import { MyContext1, MyContext2 } from "../context";

function ChildCom3() {
    return (
        <MyContext1.Consumer>
            {(context) => {
                return (
                    <MyContext2.Consumer>
                        {(context) => (
                            <div
                                style={{
                                    border: '1px solid',
                                    width: "200px",
                                    userSelect: 'none'
                                }}
                            >
                                ChildCom3
                                <div>a:{context.a}</div>
                                <div>b:{context.b}</div>
                                <div>c:{context.c}</div>
                                <div>a:{context.a}</div>
                                <div>b:{context.b}</div>
                                <div>c:{context.c}</div>
                            </div>
                        )}
                    </MyContext2.Consumer>
                )
            }}
        </MyContext1.Consumer>
    );
}

export default ChildCom3;