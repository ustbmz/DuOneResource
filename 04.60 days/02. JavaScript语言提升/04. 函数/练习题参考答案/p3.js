const counter = {
  count: 0,
  // 完成该函数，调用该函数后，每隔一秒就会增加count的值，然后输出它
  startIncrease() {
    setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000);
  },
};

counter.startIncrease();
