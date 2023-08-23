import { Shape, Point, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

function isPoint(obj: any): obj is Point {
    if (typeof obj.x === "undefined") {
        return false;
    }
    return true;
}

/**
 * 该类中提供一系列的函数，根据游戏规则判断各种情况
 */
export class TerisRule {
    /**
     * 判断某个形状的方块，是否能够移动到目标位置
     */
    static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
        //假设，中心点已经移动到了目标位置，算出每个小方块的坐标
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        //边界判断
        let result = targetSquarePoints.some(p => {
            //是否超出了边界
            return p.x < 0 || p.x > GameConfig.panelSize.width - 1 ||
                p.y < 0 || p.y > GameConfig.panelSize.height - 1;
        })
        if (result) {
            return false;
        }

        //判断是否与已有的方块有重叠
        result = targetSquarePoints
            .some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y))
        if (result) {
            return false;
        }
        return true;
    }

    static move(teris: SquareGroup, targetPoint: Point, exists:Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection, exists:Square[]): boolean;
    static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exists:Square[]): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(teris.shape, targetPointOrDirection, exists)) {
                teris.centerPoint = targetPointOrDirection;
                return true;
            }
            return false;
        }
        else {
            const direction = targetPointOrDirection;
            let targetPoint: Point;
            if (direction === MoveDirection.down) {
                targetPoint = {
                    x: teris.centerPoint.x,
                    y: teris.centerPoint.y + 1
                }
            }
            else if (direction === MoveDirection.left) {
                targetPoint = {
                    x: teris.centerPoint.x - 1,
                    y: teris.centerPoint.y
                }
            }
            else {
                targetPoint = {
                    x: teris.centerPoint.x + 1,
                    y: teris.centerPoint.y
                }
            }
            return this.move(teris, targetPoint, exists);
        }

    }

    /**
     * 将当前的方块，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris: SquareGroup, direction: MoveDirection, exists:Square[]) {
        while (this.move(teris, direction, exists)) {
        }
    }

    static rotate(teris: SquareGroup, exists:Square[]): boolean {
        const newShape = teris.afterRotateShape(); //得到旋转之后新的形状
        if (this.canIMove(newShape, teris.centerPoint, exists)) {
            teris.rotate();
            return true;
        }
        else {
            return false;
        }
    }
}