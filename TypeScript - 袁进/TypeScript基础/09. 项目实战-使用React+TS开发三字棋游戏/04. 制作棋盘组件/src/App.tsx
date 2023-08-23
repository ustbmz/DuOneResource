import React from 'react';
import { BoardComp } from './components/BoardComp';
import { ChessType } from './types/enums';

const chesses: ChessType[] = [
    ChessType.black,
    ChessType.red,
    ChessType.none,
    ChessType.none,
    ChessType.black,
    ChessType.red,
    ChessType.black,
    ChessType.red,
    ChessType.black,
]

export class App extends React.Component {

    render() {
        return (
            <div>
                <BoardComp
                    chesses={chesses}
                    onClick={i => {
                        console.log(i);
                    }}
                />
            </div>
        )
    }
}