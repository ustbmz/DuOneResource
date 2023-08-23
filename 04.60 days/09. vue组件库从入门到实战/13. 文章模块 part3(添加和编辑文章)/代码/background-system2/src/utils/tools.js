// 工具函数库

export function formatDate(timestamp){
    var date = new Date(parseInt(timestamp));

    var year = date.getFullYear(); // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日

    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds(); // 秒

    var weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    var week = weekArr[date.getDay()];

    // 需要给一位数前面加 0 
    // 9 点 ----> 09:45:03

    if(month >= 1 && month <= 9){
        // month += '0'; // a += b ----> a = a + b 
        month = '0' + month;
    }

    if(day >= 0 && day <= 9){
        day = '0' + day;
    }

    if(hour >= 0 && hour <= 9){
        hour = '0' + hour;
    }

    if(minutes >= 0 && minutes <= 9){
        minutes = '0' + minutes;
    }

    if(seconds >= 0 && seconds <= 9){
        seconds = '0' + seconds;
    }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + ' ' + week;
}