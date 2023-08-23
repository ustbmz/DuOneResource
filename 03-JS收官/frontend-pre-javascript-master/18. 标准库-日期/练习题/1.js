/**
 * 将日期格式化为字符串
 * @param {Date} date 要格式化的日期对象
 * @param {string} format 格式化字符串 yyyy-年  MM-月  dd-日 HH-小时 mm-分钟 ss-秒 ms-毫秒
 * @return {string} 日期字符串
 */
function formatDate(date, format) {
  var year = date.getFullYear().toString().padStart(4, '0');
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');

  var hour = date.getHours().toString().padStart(2, '0');
  var minute = date.getMinutes().toString().padStart(2, '0');
  var second = date.getSeconds().toString().padStart(2, '0');
  var millisecond = date.getMilliseconds();

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
    .replace('ms', millisecond);
}

var d = new Date();
console.log(formatDate(d, 'yyyy年MM月dd日 HH时mm分ss秒'));
