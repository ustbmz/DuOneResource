//配置对象
var config = {
    imgWidth: 520, //图片的宽度
    dotWidth: 12, //圆点的宽度
    doms: { //涉及的dom对象
        divBanner:document.querySelector(".banner"),
        divImgs: document.querySelector(".banner .imgs"),
        divDots: document.querySelector(".banner .dots"),
        divArrow: document.querySelector(".banner .arrow")
    },
    currentIndex: 0, //实际的图片索引，0 ~ imgNumber-1
    timer: { //运动计时器配置
        duration: 16, //运动间隔的时间，单位毫秒
        total: 300, //运动的总时间，单位毫秒
        id: null //计时器id
    },
    autoTimer:null //自动移动的计时器
};
//图片数量
config.imgNumber = config.doms.divImgs.children.length;

/**
 * 初始化元素尺寸
 */
function initSize() {
    config.doms.divDots.style.width = config.dotWidth * config.imgNumber + "px";
    config.doms.divImgs.style.width = config.imgWidth * (config.imgNumber + 2) + "px";
}

/**
 * 初始化元素
 */
function initElements() {
    //创建小圆点
    for (var i = 0; i < config.imgNumber; i++) {
        var span = document.createElement("span");
        config.doms.divDots.appendChild(span);
    }
    //复制图片
    var children = config.doms.divImgs.children;
    var first = children[0], last = children[children.length - 1];
    var newImg = first.cloneNode(true); //深度克隆
    config.doms.divImgs.appendChild(newImg);
    newImg = last.cloneNode(true);
    config.doms.divImgs.insertBefore(newImg, first);
}

/**
 * 初始化位置
 */
function initPosition() {
    var left = (-config.currentIndex - 1) * config.imgWidth;
    config.doms.divImgs.style.marginLeft = left + "px";
}

/**
 * 设置小圆点的状态
 */
function setDotStatus() {
    for (var i = 0; i < config.doms.divDots.children.length; i++) {
        var dot = config.doms.divDots.children[i];
        if (i === config.currentIndex) {
            dot.className = "active";
        }
        else {
            dot.className = "";
        }
    }
}


/**
 * 初始化汇总方法
 */
function init() {
    initSize();
    initElements();
    initPosition();
    setDotStatus();
}

init();

/**
 * 切换到某一个图片索引
 * @param {*} index 切换到的图片索引
 * @param {*} direction 方向  "left"  "right"
 */
function switchTo(index, direction) {
    if (index === config.currentIndex) {
        return;
    }
    if (!direction) {
        direction = "left";
    }
    //最终的marginLeft
    var newLeft = (-index - 1) * config.imgWidth;
    animateSwitch();

    //重新设置当前索引
    config.currentIndex = index;
    setDotStatus();


    /**
     * 逐步改变marginLeft
     */
    function animateSwitch() {
        stopAnimate();//先停止之前的动画
        //1. 计算运动的次数
        var number = Math.ceil(config.timer.total / config.timer.duration);
        var curNumber = 0;//当前的运动次数
        //2. 计算总距离
        var distance,
            marginLeft = parseFloat(getComputedStyle(config.doms.divImgs).marginLeft),
            totalWidth = config.imgNumber * config.imgWidth;
        if (direction === "left") {
            if (newLeft < marginLeft) {
                distance = newLeft - marginLeft;
            }
            else {
                distance = -(totalWidth - Math.abs(newLeft - marginLeft));
            }
        }
        else {
            if (newLeft > marginLeft) {
                distance = newLeft - marginLeft;
            }
            else {
                distance = totalWidth - Math.abs(newLeft - marginLeft);
            }
        }
        //3. 计算每次改变的距离
        var everyDistance = distance / number;

        config.timer.id = setInterval(function () {
            //改变div的marginleft
            marginLeft += everyDistance;
            if (direction === "left" && Math.abs(marginLeft) > totalWidth) {
                marginLeft += totalWidth;
            }
            else if (direction === "right" && Math.abs(marginLeft) < config.imgWidth) {
                marginLeft -= totalWidth;
            }
            config.doms.divImgs.style.marginLeft = marginLeft + "px";
            curNumber++;
            if (curNumber === number) {
                stopAnimate();
            }
        }, config.timer.duration);
    }

    function stopAnimate() {
        clearInterval(config.timer.id);
        config.timer.id = null;
    }
}

config.doms.divArrow.onclick = function (e) {
    if (e.target.classList.contains("left")) {
        toLeft();
    }
    else if (e.target.classList.contains("right")) {
        toRight();
    }
}

config.doms.divDots.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
        var index = Array.from(this.children).indexOf(e.target);
        switchTo(index, index > config.currentIndex ? "left" : "right");
    }
}

function toLeft() {
    var index = config.currentIndex - 1;
    if (index < 0) {
        index = config.imgNumber - 1;
    }
    switchTo(index, "right");
}

function toRight() {
    var index = (config.currentIndex + 1) % config.imgNumber;
    switchTo(index, "left");
}

config.autoTimer = setInterval(toRight, 2000);

config.doms.divBanner.onmouseenter = function(){
    clearInterval(config.autoTimer);
    config.autoTimer = null;
}

config.doms.divBanner.onmouseleave = function(){
    if(config.autoTimer){
        return;
    }
    config.autoTimer = setInterval(toRight, 2000);
}