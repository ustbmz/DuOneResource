import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";
import React from "react"
import "./BoardComp.css"
interface IProps {
    chesses: ChessType[]
    isGameOver?: boolean
    onClick?: (index: number) => void
}

const BoardComp: React.FC<IProps> = function (props) {
    const isGameOver = props.isGameOver!;

    const list = props.chesses.map((type, i) => <ChessComp
        key={i}
        type={type}
        onClick={() => {
            if (props.onClick && !isGameOver) {
                props.onClick(i);
            }
        }}
    />)
    return (
        <div className="board">
            {list}
        </div>
    );
}

BoardComp.defaultProps = {
    isGameOver: false
}

export { BoardComp }