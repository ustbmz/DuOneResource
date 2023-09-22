import React, { Component } from 'react'


class CompA extends Component {

    state = {
        n: 1
    }

    componentDidMount() {
        console.log("CompA 新建")
    }

    componentWillUnmount() {
        console.log("CompA 卸载")
    }


    render() {
        return <div>
            数字：{this.state.n} <button onClick={() => {
                this.setState({
                    n: this.state.n + 1
                })
            }}>+</button>
        </div>
    }
}

export default class App extends Component {
    state = {
        isVisible: false
    }
    render() {
        if (this.state.isVisible) {
            return <div>
                <h1>标题</h1>
                <CompA key="compa" />
                <button onClick={() => {
                    this.setState({
                        isVisible: !this.state.isVisible
                    })
                }}>显示/隐藏</button>
            </div>
        }
        return (
            <div>
                <CompA key="compa" />
                <button onClick={() => {
                    this.setState({
                        isVisible: !this.state.isVisible
                    })
                }}>显示/隐藏</button>
            </div>
        )
    }
}
