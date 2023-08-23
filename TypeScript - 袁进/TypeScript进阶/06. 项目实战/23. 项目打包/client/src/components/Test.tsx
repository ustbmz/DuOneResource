// 属性的默认值
import React from "react"

interface MyProps {
    a: string //必选
    b: string //必选
}

class Test extends React.Component<MyProps> {
    static defaultProps: Pick<MyProps, "a"> = {
        a: "123"
    }
}

class User extends React.Component {
    render() {
        return (
            <Test b="34234" />
        );
    }
}

export default {}