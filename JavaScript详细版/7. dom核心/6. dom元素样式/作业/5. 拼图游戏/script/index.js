/**
 * 全局配置
 */
var config = {
    width: 500,
    height: 500,
    row: 3, //行数
    col: 3, //列数
    img: "./img/lol.png", //图片路径
    gameDom: document.getElementById("game") //游戏的根元素
}
// 每一个小块的宽度
config.blockWidth = config.width / config.col;
// 每一个小块的高度
config.blockHeight = config.height / config.row;

config.total = config.row * config.col; //总数

var emptyBlock; //空白元素

/**
 * 生成一个小方块的函数，直接添加到gameDom中
 */
function createBlockDom(x, y, apendToPage, correctX, correctY) {
    var dom = document.createElement("div");
    dom.style.width = config.blockWidth + "px";
    dom.style.height = config.blockHeight + "px";
    dom.style.background = `url(${config.img})`;
    dom.style.border = "1px solid #fff";
    //设置该样式，是为了让宽高包含边框的尺寸
    dom.style.boxSizing = "border-box";
    dom.style.position = "absolute";
    //1. 元素位置？ 从一个有限的坐标中随机取一个
    dom.style.left = x + "px";
    dom.style.top = y + "px";
    dom.correctX = correctX;
    dom.correctY = correctY;
    //2. 背景图位置？根据正确位置来算
    dom.style.backgroundPosition = `-${correctX}px -${correctY}px`;
    dom.style.cursor = "pointer";

    dom.onclick = function () {
        // 将当前元素的坐标，与空白元素的坐标交换
        //判断是否相邻
        var xdis = Math.abs(parseFloat(dom.style.left) - parseFloat(emptyBlock.style.left))
        xdis = parseInt(xdis);
        var ydis = Math.abs(parseFloat(dom.style.top) - parseFloat(emptyBlock.style.top))
        ydis = parseInt(ydis);

        if (xdis + ydis !== parseInt(config.blockHeight) &&
            xdis + ydis !== parseInt(config.blockWidth)) {
            return;
        }

        var x = dom.style.left;
        var y = dom.style.top;
        dom.style.left = emptyBlock.style.left;
        dom.style.top = emptyBlock.style.top;
        emptyBlock.style.left = x;
        emptyBlock.style.top = y;
        if (isWin()) {
            document.querySelector("h1").innerHTML = "德玛西亚！！！";
        }
    }

    if (apendToPage) {
        config.gameDom.appendChild(dom);
    }
    else {
        emptyBlock = dom;
    }
}

function isWin() {
    for (let i = 0; i < config.gameDom.children.length; i++) {
        const dom = config.gameDom.children[i];
        if (parseInt(dom.correctX) !== parseInt(dom.style.left) ||
            parseInt(dom.correctY) !== parseInt(dom.style.top)) {
            return false;
        }
    }
    return true;
}

/**
 * 得到一个数组，数组中包含所有正确的坐标
 */
function getCorrectPoints() {
    var arr = [];
    //循环行和列
    for (var i = 0; i < config.row; i++) {
        for (var j = 0; j < config.col; j++) {
            arr.push({
                x: j * config.blockWidth,
                y: i * config.blockHeight
            })
        }
    }
    return arr;
}

/**
 * 根据最小值和最大值（取不到）得到一个随机数
 * @param {*} min 
 * @param {*} max 
 */
function getRandom(min, max) {
    var dec = max - min;
    return Math.floor(Math.random() * dec + min);
}

/**
 * 洗牌
 */
function shuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        const ele = arr[i];
        //随机生成下标，交换
        var index = getRandom(0, arr.length - 1);
        arr[i] = arr[index];
        arr[index] = ele;
    }
}

/**
 * 生成游戏区域
 */
function setGameArea() {
    //1. 初始化游戏根元素
    config.gameDom.style.width = config.width + "px";
    config.gameDom.style.height = config.height + "px";
    config.gameDom.style.border = "2px solid #ccc";
    config.gameDom.style.position = "relative";
    //2. 生成所有小方块（gameDom的子元素）
    var points = getCorrectPoints(); //得到正确坐标的数组
    shuffle(points);
    var correctPoints = getCorrectPoints();
    for (let i = 0; i < config.total; i++) {
        if (i < config.total - 1) {
            //不是最后生成的方块
            createBlockDom(points[i].x, points[i].y, true, correctPoints[i].x, correctPoints[i].y);
        }
        else {
            createBlockDom(points[i].x, points[i].y, false, correctPoints[i].x, correctPoints[i].y);
        }
    }
}

setGameArea();