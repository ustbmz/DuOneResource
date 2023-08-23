class User {
    readonly id: number //不能改变
    gender: "男" | "女" = "男"
    pid?: string
    private _publishNumber: number = 3; //每天一共可以发布多少篇文章
    private _curNumber: number = 0; //当前可以发布的文章数量

    constructor(public name: string, private _age: number) {
        this.id = Math.random();
    }

    set age(value: number) {
        if (value < 0) {
            this._age = 0;
        }
        else if (value > 200) {
            this._age = 200;
        }
        else {
            this._age = value;
        }
    }

    get age() {
        return Math.floor(this._age);
    }

    publish(title: string) {
        if (this._curNumber < this._publishNumber) {
            console.log("发布一篇文章：" + title);
            this._curNumber++;
        }
        else {
            console.log("你今日发布的文章数量已达到上限");
        }
    }
}

const u = new User("aa", 22);
//c#
u.age = 1.5;
console.log(u.age);


u.publish("文章1")
u.publish("文章2")
u.publish("文章3")
u.publish("文章4")
u.publish("文章5")
u.publish("文章6")