var container = document.querySelector(".container");
var zindex = 1;
/**
 * 创建一个愿望
 * @param {*} words 愿望的文字
 */
function createWish(words) {
    var div = document.createElement("div");

    container.appendChild(div);
    //设置文字
    div.innerHTML = words;
    div.className = "item";

    //颜色随机
    div.style.background = `rgb(${getRandom(150, 256)}, ${getRandom(150, 256)}, ${getRandom(150, 256)})`;

    //位置随机
    //确定位置的范围
    //横坐标范围
    var maxX = window.innerWidth - div.offsetWidth;
    div.style.left = `${getRandom(0, maxX)}px`;
    // div.style.left = getRandom(0, maxX)+"px";

    var maxY = window.innerHeight - div.offsetHeight - 100;
    div.style.top = `${getRandom(0, maxY)}px`;

    //div的点击事件
    div.onclick = function(){
        div.style.zIndex = zindex;
        zindex++;
    }

    //关闭按钮
    var span = document.createElement("span");
    span.innerHTML = "X";
    span.className = "close";
    div.appendChild(span);

    //关闭事件
    span.onclick = function () {
        container.removeChild(div);
    }
}

/**
 * 产生 min ~ max 之间的随机数
 * @param {*} min 
 * @param {*} max 不能取到最大值
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 生成默认愿望
 */
function createDefaultWishes(){
    var wishes = [
        "asdfasdfasf",
        "dfgdfg",
        "Asdfasdfaf"
    ];
    for (var i = 0; i < wishes.length; i++) {
        var wish = wishes[i];
        createWish(wish);
    }
}

createDefaultWishes();

//注册文本框的回车事件

var txt = document.querySelector(".txt");
txt.onkeydown = function (e) {
    if (e.keyCode !== 13) { //判断是否是回车按键
        return;
    }
    if(txt.value){
        createWish(txt.value);
        txt.value = "";
    }
}

