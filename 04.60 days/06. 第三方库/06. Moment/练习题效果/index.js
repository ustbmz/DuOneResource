/**
 * 设置全球各地区时间
 */
function setGlobalTime() {
  var divs = $('[zone]'); // 选中所有属性带有zone的元素
  var now = moment(); // 获取此刻的时间
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var zone = +$(div).attr('zone'); // 获取自定义属性zone的值
    var time = now.utcOffset(zone).format('YYYY-MM-DD HH:mm:ss');
    $(div).html(time);
  }
}

setGlobalTime();

/**
 * 根据当前文本框中填写的生日，生成生日信息，填充到#birthInfo的元素
 */
function setBirthInfo() {
  var txt = $('#birthInput').val();
  console.log(txt);
  var birthday = moment(txt); // 生成生日的moment对象
  var today = moment().startOf('day'); // 今日凌晨

  if (!birthday.isValid() || birthday > today) {
    // 如果日期无效 或者 生日大于今日
    $('#birthInfo').empty(); //清空元素内部
    return; // 结束
  }
  // 出生日期：xxxx-xx-xx
  var p1 = `<p><strong>出生日期：</strong><span>${birthday.format(
    'YYYY-MM-DD'
  )}</span></p>`;
  // 年龄
  var age = today.diff(birthday, 'years');
  var p2 = `<p><strong>年龄：</strong><span>${age}</span></p>`;
  // 存在的秒数
  var now = moment();
  var seconds = now.diff(birthday, 'seconds');
  var p3 = `<p>你在这个世界上已存在了 <strong>${seconds}</strong> 秒钟</p>`;

  // 你还有 364 天就会迎来你 72 岁的生日
  // 计算明年的生日
  // 之所以要包一个moment，是不希望改动原来的birthday
  var nextBirth; // 下一个生日的时间
  var thisYearBirth = moment(birthday).year(today.year()); // 今年的生日
  if (thisYearBirth > today) {
    // 还没有过
    nextBirth = thisYearBirth; // 下一个生日就是今年的生日
  } else {
    // 已过
    nextBirth = moment(birthday).year(today.year() + 1); // 计算明年的生日
  }
  var days = nextBirth.diff(today, 'days');
  var p4 = `<p>你还有 <strong>${days}</strong> 天就会迎来你 ${
    age + 1
  } 岁的生日</p>`;

  // 你已在 昨天 过了生日
  // 或
  // 你将在 星期二 迎来你下个生日
  var p5;
  var cal = thisYearBirth.calendar(null, {
    sameDay: '今天',
    nextDay: '明天',
    nextWeek: 'dddd',
    lastDay: '昨天',
    lastWeek: 'dddd',
    sameElse: 'YYYY-MM-DD',
  }); // 得到今年生日的日历显示
  if (thisYearBirth > today) {
    // 生日没有过
    p5 = `你将在 <strong>${cal}</strong> 迎来你下个生日`;
  } else {
    // 生日已经过了
    p5 = `你已在 <strong>${cal}</strong> 过了生日 `;
  }

  $('#birthInfo').html(p1 + p2 + p3 + p4 + p5);
}

setInterval(function () {
  setGlobalTime();
  setBirthInfo();
}, 1000);
$('#birthInput').blur(function () {
  setBirthInfo();
});
