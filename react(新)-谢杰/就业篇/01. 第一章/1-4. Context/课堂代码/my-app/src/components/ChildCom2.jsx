import React from 'react';
import { MyContext1, MyContext2 } from "../context";

function ChildCom2() {
    return (
        <MyContext1.Consumer>
            {(context1) => {
                return (
                    <MyContext2.Consumer>
                        {(context2) => (
                            <div
                                style={{
                                    border: '1px solid',
                                    width: "200px",
                                    userSelect: 'none'
                                }}
                            >
                                ChildCom2
                                <div>a:{context1.a}</div>
                                <div>b:{context1.b}</div>
                                <div>c:{context1.c}</div>
                                <div>a:{context2.a}</div>
                                <div>b:{context2.b}</div>
                                <div>c:{context2.c}</div>
                            </div>
                        )}
                    </MyContext2.Consumer>
                )
            }}
        </MyContext1.Consumer>
    );
}

export default ChildCom2;