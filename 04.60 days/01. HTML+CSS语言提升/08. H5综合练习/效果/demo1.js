var doms = {
  video: document.querySelector('video'),
  progress: document.querySelector('#progress'),
  rate: document.querySelector('#rate'),
  volume: document.querySelector('#volume'),
};

doms.video.addEventListener('loadeddata', init);

function init() {
  showProgress();
  showVolume();
  showRate();
  var controls = document.querySelectorAll('.controls');
  for (var i = 0; i < controls.length; i++) {
    controls[i].style.display = 'block';
  }
}

// 显示进度
function showProgress() {
  const spans = doms.progress.querySelectorAll('span');
  var range = doms.progress.querySelector('input');
  var spanCurrent = spans[0],
    spanTotal = spans[1];
  spanCurrent.innerText = formatTime(doms.video.currentTime);
  spanTotal.innerText = formatTime(doms.video.duration);
  range.value = (doms.video.currentTime / doms.video.duration) * 100;
}

function showVolume() {
  var range = doms.volume.querySelector('input');
  var span = doms.volume.querySelector('span');
  range.value = doms.video.volume * 100;
  span.innerText = parseInt(range.value) + '%';
}

function showRate() {
  var rate = doms.video.playbackRate;
  var btns = doms.rate.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    var btnRate = +btns[i].dataset.rate;
    if (btnRate === rate) {
      btns[i].classList.add('active');
    } else {
      btns[i].classList.remove('active');
    }
  }
}

function formatTime(sec) {
  var hour = parseInt(sec / 3600);
  if (hour < 10) {
    hour = '0' + hour;
  }
  sec -= hour * 3600;
  var minute = parseInt(sec / 60);
  if (minute < 10) {
    minute = '0' + minute;
  }
  sec -= minute * 60;
  sec = parseInt(sec);
  if (sec < 10) {
    sec = '0' + sec;
  }
  return hour + ':' + minute + ':' + sec;
}

// 注册事件

// 播放/暂停按钮
var btnPlay = document.querySelector('#btnPlay');
btnPlay.addEventListener('click', function () {
  if (doms.video.paused) {
    //当前是暂停
    doms.video.play();
  } else {
    doms.video.pause();
  }
});

// 进度滑块
var progressRange = doms.progress.querySelector('input');
progressRange.addEventListener('input', function () {
  doms.video.currentTime = (this.value / 100) * doms.video.duration;
  showProgress();
});

// 音量滑块
var volumeRange = doms.volume.querySelector('input');
volumeRange.addEventListener('input', function () {
  doms.video.volume = this.value / 100;
  showVolume();
});

// 播放事件
doms.video.addEventListener('timeupdate', showProgress);

// 倍速点击事件
var rateBtns = doms.rate.querySelectorAll('button[data-rate]');
for (var i = 0; i < rateBtns.length; i++) {
  rateBtns[i].addEventListener('click', function () {
    doms.video.playbackRate = this.dataset.rate;
    showRate();
  });
}

// 保存设置
var btnSave = document.querySelector('#save');
btnSave.addEventListener('click', function () {
  var obj = {
    rate: doms.video.playbackRate,
    progress: doms.video.currentTime,
    volume: doms.video.volume,
  };
  localStorage.setItem('play', JSON.stringify(obj));
  alert('保存成功');
});

// 加载设置
var btnLoad = document.querySelector('#load');
btnLoad.addEventListener('click', function () {
  var saveStr = localStorage.getItem('play');
  if (!saveStr) {
    alert('未保存有数据');
  }
  var obj = JSON.parse(saveStr);
  doms.video.volume = obj.volume;
  doms.video.currentTime = obj.progress;
  doms.video.playbackRate = obj.rate;
  doms.video.play();
  showProgress();
  showVolume();
  showRate();
});
