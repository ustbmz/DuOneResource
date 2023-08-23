import { Square } from "./core/Square";
import { IViewer } from "./core/types";

class SquareConsoleViewer implements IViewer {

    constructor(
        private square: Square
    ) {
    }

    show(): void {
        console.log(this.square.point, this.square.color);
    }

    remove(): void {

    }
}

const sq = new Square()
sq.viewer = new SquareConsoleViewer(sq);
sq.point = {
    x: 5,
    y: 6
}
sq.point = {
    x: 8,
    y: 7
}