export class Tank {
    protected name: string = "坦克"
    sayHello() {
        console.log(`我是一个${this.name}`)
    }
}
export class PlayerTank extends Tank {
    name: string = "玩家坦克"
    life: number = 5;

    sayHello() {
        console.log("啦啦啦啦");
    }

    test() {
        super.sayHello();
        this.sayHello();
    }
}
export class EnemyTank extends Tank {
    name: string = "敌方坦克"
    health: number = 1;
}
export class BossTank extends EnemyTank{
   
}

const t = new BossTank();