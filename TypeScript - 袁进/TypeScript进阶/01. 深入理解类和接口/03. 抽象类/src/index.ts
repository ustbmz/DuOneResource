abstract class Chess {
    x: number = 0
    y: number = 0

    abstract readonly name: string;

    move(targetX: number, targetY: number): boolean {
        console.log("1. 边界判断");
        console.log("2. 目标位置是否有己方棋子");
        //3. 规则判断
        if (this.rule(targetX, targetY)) {
            this.x = targetX;
            this.y = targetY;
            console.log(`${this.name}移动成功`)
            return true;
        }
        return false;
    }

    protected abstract rule(targetX: number, targetY: number): boolean;
}

class Horse extends Chess {
    protected rule(targetX: number, targetY: number): boolean {
        return true;
    }

    readonly name: string = "马";
}

class Pao extends Chess {
    protected rule(targetX: number, targetY: number): boolean {
        return false
    }

    readonly name: string;

    constructor() {
        super();
        this.name = "炮";
    }
}

class Soldier extends Chess {
    protected rule(targetX: number, targetY: number): boolean {
        return true;
    }

    get name() {
        return "兵";
    }
}


class King extends Chess {
    name: string = "将";
    
    protected rule(targetX: number, targetY: number): boolean {
        throw new Error("Method not implemented.");
    }
}