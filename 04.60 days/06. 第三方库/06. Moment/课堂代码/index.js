/**
 * 设置各个时区的时间文本
 */
function setNow() {
  // const xiwuqu = moment().utcOffset(-5).format('YYYY-MM-DD HH:mm:ss');
  // console.log(xiwuqu);

  $('[data-zone]').each((i, ele) => {
    const zone = +ele.dataset.zone;
    ele.innerHTML = moment().utcOffset(zone).format('YYYY-MM-DD HH:mm:ss');
  });
}

/**
 * 设置和生日相关的信息
 * 生日数据来源于文本框的值
 */
function setBirthInfo() {
  const birthTxt = $('#birthInput').val();
  if (!birthTxt) {
    $('#birthInfo').empty(); // 不正确的日期文本
    return;
  }
  const birthday = moment(birthTxt);
  const now = moment();
  if (birthday > now) {
    // 生日有问题
    $('#birthInfo').html('生日不正确！'); // 不正确的日期文本
    return;
  }
  // 出生日期
  const p1 = `<p>
  <strong>出生日期：</strong>
  <span>${birthday.format('YYYY年MM月DD日')}</span>
</p>`;

  // 年龄
  const age = now.diff(birthday, 'years');
  const p2 = ` <p>
  <strong>年龄：</strong>
  <span>${age}</span>
</p>`;

  // 生存时长
  const seconds = now.diff(birthday, 'seconds');
  const p3 = `<p>
  你在这个世界上已存在了
  <strong>${seconds}</strong>
  秒钟
</p>`;

  // 生日相对时间
  let targetDate;
  const thisYearBirth = birthday.years(now.years()); // 今年的生日
  if (thisYearBirth < now) {
    // 今年的生日已经过了
    targetDate = moment(thisYearBirth).add(1, 'years');
  } else {
    targetDate = thisYearBirth;
  }

  const p4 = `<p>
  你还有
  <strong>${targetDate.diff(now, 'days')}</strong>
  天就会迎来你 ${age + 1} 岁的生日
</p>`;

  // 什么时候过的生日
  let p5;
  const cal = thisYearBirth.calendar(null, {
    sameDay: '今天',
    nextDay: '明天',
    nextWeek: '下个 dddd',
    lastDay: '昨天',
    lastWeek: '上个 dddd',
    sameElse: 'YYYY年MM月DD',
  });

  if (thisYearBirth < now) {
    // 今年的生日过了
    p5 = `<p>你已在
    <strong>${cal}</strong>
    过了生日</p>`;
  } else {
    // 今年的生日还没有过
    p5 = `<p>你将在
    <strong>${cal}</strong>
    迎来下一个生日</p>`;
  }

  $('#birthInfo').html(p1 + p2 + p3 + p4 + p5);
}

$('#birthInput').on('input', setBirthInfo);

setNow();
setInterval(() => {
  setNow();
}, 1000);
