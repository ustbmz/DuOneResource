import React from 'react';
import { ChessComp } from './components/ChessComp';
import { ChessType } from './types/enums';

export class App extends React.Component {

    render() {
        return (
            <div>
                <ChessComp type={ChessType.none} onClick={() => {
                    console.log("被点击了")
                }} />
                <ChessComp type={ChessType.black} onClick={() => {
                    console.log("被点击了")
                }} />
                <ChessComp type={ChessType.red} onClick={() => {
                    console.log("被点击了")
                }} />
            </div>
        )
    }
}