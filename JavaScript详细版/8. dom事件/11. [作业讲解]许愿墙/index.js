var zIndex = 1;
var container = document.getElementById("container");
var paperWidth = 170, paperHeight = 170;
var vWidth = document.documentElement.clientWidth; //视口宽度
var vHeight = document.documentElement.clientHeight; //视口宽度
var input = document.querySelector("input");
//实现拖拽功能
window.onmousedown = function (e) {
    var div = getMoveDiv(e.target);
    if (!div) {
        return;
    }
    div.style.zIndex = zIndex;
    zIndex++;
    var style = getComputedStyle(div);
    var divLeft = parseFloat(style.left);
    var divTop = parseFloat(style.top);
    var pageX = e.pageX;
    var pageY = e.pageY;
    window.onmousemove = function (e) {
        var disX = e.pageX - pageX;
        var disY = e.pageY - pageY;
        var newLeft = divLeft + disX;
        var newTop = divTop + disY;
        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft > document.documentElement.clientWidth - paperWidth) {
            newLeft = document.documentElement.clientWidth - paperWidth;
        }
        if (newTop < 0) {
            newTop = 0;
        }
        if (newTop > document.documentElement.clientHeight - paperHeight - 80) {
            newTop = document.documentElement.clientHeight - paperHeight - 80;
        }
        div.style.left = newLeft + "px";
        div.style.top = newTop + "px";
    }

    window.onmouseup = window.onmouseleave = function () {
        window.onmousemove = null;
    }
}

//实现关闭功能
window.onclick = function (e) {
    if (e.target.parentElement && e.target.parentElement.className === "paper" &&
        e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}

/**
 * 得到可移动的div
 */
function getMoveDiv(dom) {
    if (dom.className === "paper") {
        return dom;
    }
    else if (dom.parentElement && dom.parentElement.className === "paper" && dom.tagName === "P") {
        return dom.parentElement;
    }
}

/**
 * 创建一个愿望
 * @param {*} words 
 */
function createWish(words) {
    var div = document.createElement("div");
    div.className = "paper";
    div.innerHTML = `<p>${words}</p><span>X</span>`;
    //设置颜色
    div.style.background = `rgb(${getRandom(100, 200)}, ${getRandom(100, 200)}, ${getRandom(100, 200)})`;
    //设置位置
    var maxLeft = document.documentElement.clientWidth - paperWidth;
    var maxTop = document.documentElement.clientHeight - paperHeight - 80;
    div.style.left = getRandom(0, maxLeft) + "px";
    div.style.top = getRandom(0, maxTop) + "px";

    container.appendChild(div);
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }
}


function createInitPapers() {
    var arr = ["世界和平", "祝成哥和嫂子们生活性福"];
    arr.forEach(function (item) {
        createWish(item);
    })
}

window.onresize = function () {
    //重新调整所有的div.paper的位置
    var disX = document.documentElement.clientWidth - vWidth;
    var disY = document.documentElement.clientHeight - vHeight;
    for (var i = 0; i < container.children.length; i++) {
        var paper = container.children[i];
        //改变paper的left值
        var left = parseFloat(paper.style.left);
        var right = vWidth - paperWidth - left;
        var newLeft = left + left / (left + right) * disX;
        paper.style.left = newLeft + "px";

        //改变paper的top值
        var top = parseFloat(paper.style.top);
        var bottom = vHeight - paperHeight - top;
        var newTop = top + top / (top + bottom) * disY;
        paper.style.top = newTop + "px";
    }
    vWidth = document.documentElement.clientWidth;
    vHeight = document.documentElement.clientHeight;
}

input.onkeypress = function (e) {
    if (e.key === "Enter") {
        if (this.value) {
            createWish(this.value);
            this.value = "";
        }
    }
}

createInitPapers();