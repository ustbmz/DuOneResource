import React from "react"
class Child extends React.Component {

    constructor(){
        super();
        console.log("创建子组件");
    }


    componentWillUnmount() {
        // 在组件销毁的时候，会调用该生命周期钩子函数
        console.log("子组件销毁");
    }

    render() {
        return (
            <div>这是子组件</div>
        );
    }
}

export default Child;