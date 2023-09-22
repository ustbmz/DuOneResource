if (!this.myPlugin) {
    this.myPlugin = {};
}
/**
 * 动画
 * @param {object} option 配置对象
 */
this.myPlugin.Animate = function (option) {
    //默认配置
    var defaultOption = {
        duration: 16, //默认间隔时间，单位毫秒
        total: 1000, //默认总时间
        begin: {}, //初始值
        end: {} //终止值
    };
    this.option = myPlugin.mixin(defaultOption, option);
    this.timer = null; //计时器的id
    //运动总次数
    this.number = Math.ceil(this.option.total / this.option.duration);
    //当前运动次数
    this.curNumber = 0;
    //当前状态
    this.curData = myPlugin.clone(this.option.begin);
    //所有属性运动的总距离
    this.distance = {};
    //所有属性每次运动的距离
    this.everyDistance = {};
    for (var prop in this.option.begin) {
        this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
        this.everyDistance[prop] = this.distance[prop] / this.number;
    }
}
/**
 * 开始动画
 */
this.myPlugin.Animate.prototype.start = function () {
    if (this.timer || this.curNumber === this.number) {
        return; //如果之前已经存在计时器，则不做任何处理
    }
    if (this.option.onstart) {
        this.option.onstart.call(that);
    }
    var that = this;
    this.timer = setInterval(function () {
        //改变that.curData
        that.curNumber++;//当前运动次数+1
        for (var prop in that.curData) {
            if (that.curNumber === that.number) {
                //最后一次运动
                that.curData[prop] = that.option.end[prop];
            }
            else {
                that.curData[prop] += that.everyDistance[prop];
            }
        }
        if (that.option.onmove) {
            that.option.onmove.call(that);
        }
        if (that.curNumber === that.number) {
            //等于了总次数
            that.stop();
            if (that.option.onover) {
                that.option.onover.call(that);
            }
        }
    }, this.option.duration);
}

/**
 * 停止动画
 */
this.myPlugin.Animate.prototype.stop = function () {
    clearInterval(this.timer);
    this.timer = null;
}

