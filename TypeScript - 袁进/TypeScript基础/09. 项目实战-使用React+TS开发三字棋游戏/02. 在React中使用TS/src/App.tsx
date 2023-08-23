import React from 'react';
import { CountComp } from './components/CountComp';

interface IState {
    num:number
}

export class App extends React.Component<{}, IState> {
    state: IState = {
        num: 0
    }
    render() {
        return (
            <CountComp num={this.state.num} onChange={n => {
                this.setState({
                    num: n
                })
            }} />
        )
    }
}