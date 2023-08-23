(async function () {
  /**
   * 从网络获取歌词数据
   * @returns Promise
   */
  async function getLrc() {
    return await fetch('https://study.duyiedu.com/api/lyrics')
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }

  const doms = {
    ul: document.querySelector('.lrc'),
    audio: document.querySelector('audio'),
  };
  const size = {
    liHeight: 30,
    containerHeight: 420,
  };
  let lrcData;
  // 1. 初始化
  async function init() {
    // 拿到歌词，生成li，放入到ul中
    const lrc = await getLrc();
    // 将lrc -> [ { time: 86.09, words: '这沙滚滚水皱皱笑着浪荡' } ....]
    lrcData = lrc
      .split('\n')
      .filter((s) => s)
      .map((s) => {
        const parts = s.split(']');
        const timeParts = parts[0].replace('[', '').split(':');
        return {
          time: +timeParts[0] * 60 + +timeParts[1],
          words: parts[1],
        };
      });
    // 生成li，加入到ul中
    doms.ul.innerHTML = lrcData.map((lrc) => `<li>${lrc.words}</li>`).join('');
  }

  await init();

  // 2. 交互事件
  // 1) 什么事件  2) 如何处理
  // audio元素的播放进度变化的事件
  doms.audio.addEventListener('timeupdate', function () {
    setStatus(this.currentTime);
  });

  /**
   * 根据播放时间，设置好歌词的状态
   * @param {*} time
   */
  function setStatus(time) {
    // 微调
    time += 0.5;
    //1. 根据时间找到对应的li，高亮
    // 消除之前的active
    const activeLi = document.querySelector('.active');
    activeLi && activeLi.classList.remove('active');
    const index = lrcData.findIndex((lrc) => lrc.time > time) - 1;
    if (index < 0) {
      return;
    }
    doms.ul.children[index].classList.add('active');
    //2. 设置ul的滚动位置
    let top =
      size.liHeight * index + size.liHeight / 2 - size.containerHeight / 2;
    top = -top;
    if (top > 0) {
      top = 0;
    }
    doms.ul.style.transform = `translateY(${top}px)`;
  }
})();
