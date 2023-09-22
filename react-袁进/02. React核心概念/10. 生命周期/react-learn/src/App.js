import React, { Component } from 'react'
import NewLifeCycle from "./NewLifeCycle"

export default class App extends Component {
    state = {
        number: 1
    }

    render() {

        return (
            <div>
                <NewLifeCycle n={this.state.number} />
                <p>
                    <button onClick={() => {
                        this.setState({
                            number: this.state.number + 1
                        })
                    }}>父组件按钮+1</button>
                </p>
            </div>
        )
    }
}
