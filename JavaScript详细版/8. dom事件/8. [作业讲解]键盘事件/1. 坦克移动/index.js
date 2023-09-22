var tank = {
    direction: "U",// U L R D
    left: 500,
    top: 400,
    dom: document.querySelector("img"),
    show: function () { //显示
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
        this.dom.src = "imgs/tank" + this.direction + ".gif";
    }
}

//切换方向 和 移动
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
        tank.direction = "U";
        tank.top -= 4;
    }
    else if (e.key === "ArrowDown") {
        tank.direction = "D";
        tank.top += 4;
    }
    else if (e.key === "ArrowLeft") {
        tank.direction = "L";
        tank.left -= 4;
    }
    else if (e.key === "ArrowRight") {
        tank.direction = "R";
        tank.left += 4;
    }
    tank.show();
})