/**
 * 得到一个计时器对象，该对象提供了两个方法：
 * 1. start，启动计时器
 * 2. stop，停止计时器
 * @param {*} callback 每隔一段时间运行的函数
 * @param {*} thisArg this指向的对象
 */
function getTimer(duration, thisArg, callback) {
    var timer;
    return {
        start: function () {
            if (timer) {
                return;
            }
            timer = setInterval(callback.bind(thisArg), duration)
        },
        stop: function () {
            clearInterval(timer);
            timer = null;
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

/**
 * 游戏对象
 */
var game = {
    dom: document.querySelector(".game"), //游戏dom元素
    overDom: document.querySelector(".game .over"), //游戏结束的dom对象
    isPause: true, //是否处于暂停状态
    isOver: false,//游戏是否结束
    start: function () {
        sky.timer.start(); //天空开始移动
        land.timer.start(); //大地开始移动
        bird.swingTimer.start();//小鸟煽动翅膀
        bird.dropTimer.start();//小鸟下坠
        pipeManager.produceTimer.start();//生产柱子
        pipeManager.moveTimer.start();//移动柱子
        hitManager.timer.start();//碰撞检测器
        this.isPause = false;
    },
    stop: function () {
        sky.timer.stop();
        land.timer.stop();
        bird.swingTimer.stop();
        bird.dropTimer.stop();
        pipeManager.produceTimer.stop();
        pipeManager.moveTimer.stop();
        hitManager.timer.stop();
        this.isPause = true;
    }
}
game.width = game.dom.clientWidth; //面板宽度
game.height = game.dom.clientHeight;

//天空对象
var sky = {
    left: 0, //当前的横坐标
    dom: document.querySelector(".game .sky")
};

sky.timer = getTimer(16, sky, function () {
    this.left--;
    if (this.left === -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
})

//大地对象
var land = {
    left: 0, //当前的横坐标
    dom: document.querySelector(".game .land")
};

land.height = land.dom.clientHeight;//大地的高度
land.top = game.height - land.height;//大地的纵坐标

land.timer = getTimer(16, land, function () {
    this.left -= 2;
    if (this.left === -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
})

//小鸟
var bird = {
    dom: document.querySelector(".game .bird"),
    left: 150,
    top: 150,
    width: 33,
    height: 26,
    swingIndex: 0, //翅膀的状态：0~2
    a: 0.002, //重力加速度
    v: 0, //当前速度
    t: 16, //时间间隔
    show() {    //显示小鸟
        //处理翅膀
        if (this.swingIndex === 0) {
            this.dom.style.backgroundPosition = "-8px -10px";
        }
        else if (this.swingIndex === 1) {
            this.dom.style.backgroundPosition = "-60px -10px";
        }
        else {
            this.dom.style.backgroundPosition = "-113px -10px";
        }
        //设置小鸟的位置
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    },
    setTop(top) { //设置小鸟的top值
        if (top < 0) {
            top = 0;
        }
        else if (top > land.top - this.height) {
            top = land.top - this.height;
            // this.jump();
        }
        this.top = top;
        this.show();
    },
    jump() {
        this.v = -0.5;
    }
}

bird.show();
//翅膀计时器
bird.swingTimer = getTimer(200, bird, function () {
    this.swingIndex = (this.swingIndex + 1) % 3;
    this.show();
})
//下坠计时器
bird.dropTimer = getTimer(bird.t, bird, function () {
    //计算移动距离
    var dis = this.v * this.t + 0.5 * this.a * this.t * this.t;
    //改变速度
    this.v = this.v + this.a * this.t;
    //改变top
    this.setTop(this.top + dis);
})

/**
 * 柱子的构造函数
 * @param {*} direction up,down
 * @param {*} height 高度
 */
function Pipe(direction, height) {
    this.width = Pipe.width; //方便访问，给对象加上宽度属性
    this.left = game.width;
    this.height = height;
    this.direction = direction;
    //纵坐标
    if (direction === "up") {
        this.top = 0;
    }
    else {
        this.top = land.top - this.height;
    }
    this.dom = document.createElement("div");
    this.dom.className = "pipe " + direction;
    this.dom.style.height = this.height + "px";
    this.dom.style.top = this.top + "px";
    this.show();
    game.dom.appendChild(this.dom);
}
/**
 * 显示柱子
 */
Pipe.prototype.show = function () {
    this.dom.style.left = this.left + "px";
}

Pipe.width = 52;//柱子的宽度

/**
 * 一对柱子的构造函数
 */
function PipePair() {
    var minHeight = 60; //最小高度
    var gap = 150; //空隙
    var maxHeight = land.top - minHeight - gap;//最大高度
    var h = getRandom(minHeight, maxHeight);//随机高度
    this.up = new Pipe("up", h);
    this.down = new Pipe("down", land.top - h - gap);
    this.left = this.up.left;
}

/**
 * 显示一对柱子
 */
PipePair.prototype.show = function () {
    this.up.left = this.left;
    this.down.left = this.left;
    this.up.show();
    this.down.show();
}

/**
 * 移除一对柱子
 */
PipePair.prototype.remove = function () {
    this.up.dom.remove();
    this.down.dom.remove();
}

//柱子管理器
var pipeManager = {
    pairs: [] //保存所有的柱子对
};

//生产柱子的计时器
pipeManager.produceTimer = getTimer(1500, pipeManager, function () {
    this.pairs.push(new PipePair());
})

//移动柱子的计时器
pipeManager.moveTimer = getTimer(16, pipeManager, function () {
    for (var i = 0; i < this.pairs.length; i++) {
        var pair = this.pairs[i];
        pair.left -= 2;
        if (pair.left <= -Pipe.width) {
            //移除
            pair.remove();//移动dom对象
            this.pairs.splice(i, 1);//从数组中移除
            i--;
        }
        else {
            pair.show();
        }
    }
})

//碰撞检测器
var hitManager = {
    //验证是否发生碰撞，true：碰撞了，false：没有碰撞
    validate: function () {
        if (bird.top >= land.top - bird.height) {
            //与大地亲吻
            return true;
        }
        //检查是否与柱子发生碰撞
        for (var i = 0; i < pipeManager.pairs.length; i++) {
            var pair = pipeManager.pairs[i];
            if (this.validateBirdAndPipe(pair.up) || this.validateBirdAndPipe(pair.down)) {
                return true;
            }
        }
        return false;
    },
    validateBirdAndPipe(pipe) {//判断某根柱子与小鸟是否发生碰撞
        //bird  pipe
        var bx = bird.left + bird.width / 2; //小鸟中心点x
        var by = bird.top + bird.height / 2; //小鸟中心点y
        var px = pipe.left + pipe.width / 2; //柱子中心点x
        var py = pipe.top + pipe.height / 2; //柱子中心点y
        if ((Math.abs(px - bx) <= (bird.width + pipe.width) / 2) &&
            (Math.abs(py - by) <= (bird.height + pipe.height) / 2)) {
            return true;
        }
        else {
            return false;
        }
    }
};
hitManager.timer = getTimer(16, hitManager, function () {
    //检测是否碰撞
    if (this.validate()) {
        //碰撞了，游戏结束
        game.stop();
        game.overDom.style.display = "block";
        game.isOver = true;
    }
})

//注册事件
window.onkeydown = function (e) {
    if (e.key === "Enter") {
        if (game.isOver) {
            location.reload();//刷新页面
            return;
        }
        //开始/暂停
        if (game.isPause) {
            game.start();
        }
        else {
            game.stop();
        }
    }
    else if (e.key === " ") {
        console.log("asdfasf");
        bird.jump();
    }
}