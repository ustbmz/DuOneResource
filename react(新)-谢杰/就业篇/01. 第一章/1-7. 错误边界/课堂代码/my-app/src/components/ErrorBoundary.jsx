import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        // 这边需要你维护一个状态，该状态用来标记是否有错误
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        console.log("error:::",error);
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log("error>>>", error);
        console.log("errorInfo>>>", errorInfo);
    }


    render() {
        if (this.state.hasError) {
            // 说明有错误，渲染自定义的降级 UI
            return (<div>出错了！！</div>);
        }
        // 没有进入上面的 if，说明没有错误，那直接渲染子组件树
        return this.props.children;
    }
}
