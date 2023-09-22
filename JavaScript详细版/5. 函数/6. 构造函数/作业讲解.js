/**
 * 游戏角色的构造函数
 * @param {*} name 角色名
 * @param {*} attack 攻击力
 * @param {*} defence 防御力
 * @param {*} hp 声明值
 * @param {*} critRate 暴击率（0~100）
 */
function Charactor(name, attack, defence, hp, critRate) {
    this.name = name;
    this.attack = attack;
    this.defence = defence;
    this.hp = hp;
    this.critRate = critRate;

    //函数

    /**
     * 打印信息
     */
    this.print = function () {
        console.log(`${this.name}\t生命：${this.hp}\t攻击：${this.attack}\t防御：${this.defence}\t暴击率：${this.critRate}%`);
    }

    /**
     * 攻击，返回对方是否死亡
     * @param {*} ctor 攻击对象
     */
    this.hit = function (ctor) {
        var damage = this.attack - ctor.defence;
        //判断是否有暴击
        var rate = this.critRate / 100;
        var rad = Math.random();
        var isCrit = false; //是否暴击
        if (rad <= rate) {
            isCrit = true;
            //有暴击
            damage *= 2; //伤害翻倍
        }
        //伤害至少为1
        if (damage < 1) {
            damage = 1;
        }
        ctor.hp -= damage;
        if (ctor.hp < 0) {
            ctor.hp = 0;// 血量至少为0
        }
        console.log(`${isCrit ? "暴击！" : ""}【${this.name}】攻击【${ctor.name}】，造成【${damage}】点伤害，对方当前血量为【${ctor.hp}】`);
        //对方是否死亡
        return ctor.hp === 0;
    }
}
var hero = new Charactor("成哥", 100, 20, 500, 30);
hero.print();
console.log("VS");
var monster = new Charactor("邓哥", 120, 40, 400, 5);
monster.print();

while (true) {
    if (hero.hit(monster)) {
        break;
    }
    if (monster.hit(hero)) {
        break;
    }
}
console.log("=========================");
hero.print();
monster.print();
console.log("游戏结束");