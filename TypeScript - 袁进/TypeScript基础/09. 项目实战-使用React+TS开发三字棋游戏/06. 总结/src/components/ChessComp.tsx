import { ChessType } from "../types/enums";
import "./ChessComp.css"
import React from "react"
interface IProps {
    type: ChessType
    onClick?: () => void
}

export function ChessComp({ type, onClick }: IProps) {
    let chess = null;
    if (type === ChessType.red) {
        chess = <div className="red chess-item"></div>
    }
    else if (type === ChessType.black) {
        chess = <div className="black chess-item"></div>
    }

    return (
        <div className="chess" onClick={() => {
            if (type === ChessType.none && onClick) {
                //怎么处理
                onClick();
            }
        }}>
            {chess}
        </div>
    );
}