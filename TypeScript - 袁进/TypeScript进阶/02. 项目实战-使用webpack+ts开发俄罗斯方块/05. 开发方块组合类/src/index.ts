import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup";

const group = new SquareGroup([
    { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }
], { x: 3, y: 2 }, "red");
group.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $("#root"));
})

$("#btnDown").click(function () {
    //更改中心点坐标
    group.centerPoint = {
        x: group.centerPoint.x,
        y: group.centerPoint.y + 1
    }
})

$("#btnUp").click(function () {
    //更改中心点坐标
    group.centerPoint = {
        x: group.centerPoint.x,
        y: group.centerPoint.y - 1
    }
})

$("#btnLeft").click(function () {
    //更改中心点坐标
    group.centerPoint = {
        x: group.centerPoint.x - 1,
        y: group.centerPoint.y
    }
})

$("#btnRight").click(function () {
    //更改中心点坐标
    group.centerPoint = {
        x: group.centerPoint.x + 1,
        y: group.centerPoint.y
    }
})