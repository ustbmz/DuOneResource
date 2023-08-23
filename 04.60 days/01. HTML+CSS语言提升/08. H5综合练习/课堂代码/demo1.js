var doms = {
  // 视频元素
  video: document.querySelector('video'),
  btnPlay: document.querySelector('#btnPlay'),
  // 进度条相关元素
  progress: {
    // 进度条
    range: document.querySelector('#progress'),
    // 当前播放时间
    current: document.querySelector('#current'),
    // 总时间
    total: document.querySelector('#total'),
  },
  // 播放倍率的容器
  rate: document.querySelector('#rate'),
  // 音量相关元素
  volume: {
    // 滑动块
    range: document.querySelector('#volume input'),
    // 文本
    text: document.querySelector('#volume span'),
  },
  // 保存和设置按钮
  buttons: {
    save: document.querySelector('#save'),
    load: document.querySelector('#load'),
  },
  controls: document.querySelectorAll('.controls'),
};

// 初始化
doms.video.addEventListener('loadeddata', init);

function init() {
  setProgress();
  setRate();
  setVolume();
  for (var i = 0; i < doms.controls.length; i++) {
    doms.controls[i].style.display = 'block';
  }
}
/**
 * 根据当前视频的进度，设置进度条的状态
 */
function setProgress() {
  //1. 设置文本
  doms.progress.current.innerText = formatTime(doms.video.currentTime);
  doms.progress.total.innerText = formatTime(doms.video.duration);
  //2. 设置进度条
  doms.progress.range.value =
    (doms.video.currentTime / doms.video.duration) * 100;
}

/**
 * 根据当前的视频，设置播放速率的状态
 */
function setRate() {
  var btns = doms.rate.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    var rate = btns[i].dataset.rate;
    if (+rate === doms.video.playbackRate) {
      btns[i].classList.add('active');
    } else {
      btns[i].classList.remove('active');
    }
  }
}

/**
 * 设置音量的状态
 */
function setVolume() {
  //1. 设置文本
  var percent = Math.floor(doms.video.volume * 100);
  if (doms.video.muted) {
    percent = 0;
  }
  doms.volume.text.innerText = percent + '%';
  //2. 设置进度条
  doms.volume.range.value = percent;
}

/**
 * 格式化时间
 * @param {*} sec
 */
function formatTime(sec) {
  var hour = Math.floor(sec / 3600);
  sec -= hour * 3600;
  var minute = Math.floor(sec / 60);
  sec -= minute * 60;
  sec = Math.floor(sec);
  function _format(n) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }
  return _format(hour) + ':' + _format(minute) + ':' + _format(sec);
}

// 交互
doms.btnPlay.addEventListener('click', function () {
  if (doms.video.paused) {
    doms.video.play();
  } else {
    doms.video.pause();
  }
});

doms.progress.range.addEventListener('input', function () {
  doms.video.currentTime = (this.value / 100) * doms.video.duration;
  setProgress();
});

doms.video.addEventListener('timeupdate', function () {
  setProgress();
});

var btnRates = doms.rate.querySelectorAll('button');
for (var i = 0; i < btnRates.length; i++) {
  btnRates[i].addEventListener('click', function () {
    doms.video.playbackRate = +this.dataset.rate;
    setRate();
  });
}

doms.volume.range.addEventListener('input', function () {
  doms.video.volume = this.value / 100;
  setVolume();
});

doms.buttons.save.addEventListener('click', function () {
  var obj = {
    currentTime: doms.video.currentTime,
    rate: doms.video.playbackRate,
    volume: doms.video.volume,
  };
  var json = JSON.stringify(obj);
  localStorage.setItem('vdo', json);
  alert('保存设置成功');
});

doms.buttons.load.addEventListener('click', function () {
  var json = localStorage.getItem('vdo');
  var obj = JSON.parse(json);
  doms.video.currentTime = obj.currentTime;
  doms.video.playbackRate = obj.rate;
  doms.video.volume = obj.volume;

  setProgress();
  setRate();
  setVolume();

  doms.video.play();
});
