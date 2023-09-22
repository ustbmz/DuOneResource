//单对象模式，也叫做命名空间模式
var MyFunctions = {
    /**
     * 判断一个数是不是奇数
     * @param {number} n 要判断的数字
     * @returns {boolean}
     */
    isOdd: function (n) {
        return n % 2 !== 0;
    },

    /**
     * 判断一个数是不是素数
     * @param {*} n 
     */
    isPrime: function (n) {
        if (n < 2) {
            return false;
        }
        for (var i = 2; i < n; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    },

    /**
     * 对数组求和
     * @param {*} arr 
     */
    sumOfArray: function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    },

    /**
     * 得到数组中的最大值，如果数组长度为0，则返回undefined
     * @param {*} arr 
     */
    maxOfArray: function (arr) {
        if (arr.length === 0) {
            return;
        }
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    },


    /**
     * 得到数组中的最小值，如果数组长度为0，则返回undefined
     * @param {*} arr 
     */
    minOfArray: function (arr) {
        if (arr.length === 0) {
            return;
        }
        var min = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    },

    /**
     * 判断一个数组是不是稀松数组
     * @param {*} arr 
     */
    hasEmptyInArray: function (arr) {
        // 稀松数组的特点：下标连续
        for (var i = 0; i < arr.length; i++) {
            if (!(i in arr)) {
                return true;
            }
        }
        return false;
    },

    /**
     * 判断某年是不是闰年
     * @param {*} year 
     */
    isLeap: function (year) {
        // 4年一闰，百年不闰；400年一闰
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    /**
     * 得到某年某月的天数
     * @param {*} year 
     * @param {*} month 
     */
    getDays: function (year, month) {
        if (month === 2) {
            return this.isLeap(year) ? 29 : 28;
        }
        else if (month < 8 && this.isOdd(month) || month >= 8 && !this.isOdd(month)) {
            return 31;
        }
        else {
            return 30;
        }
    },

    /**
     * 得到数组中出现频率最高的数字或字符串和频率
     * 返回一个对象
     * @param {*} arr 
     */
    getTopFreqInArray: function (arr) {
        var records = {}; //记录出现频率
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            if (records[n]) {
                records[n]++;
            }
            else {
                records[n] = 1;
            }
        }
        var result; //记录最终结果的对象
        for (var prop in records) {
            if (!result || records[prop] > result.frequency) {
                result = {
                    number: prop,
                    frequency: records[prop]
                };
            }
        }
        return result;
    },

    /**
     * 给指定的数组升序排序
     * @param {*} arr 
     * @param {Function} compare 比较大小，
     * 该函数有两个参数，代表数组中的两个元素，
     * 该函数返回一个数字，如果是正数，则第一个元素比第二个元素大，
     * 如果是0，则相等，
     * 如果是负数，则第一个元素比第二个元素小
     */
    sort: function (arr, compare) {
        if (!compare) {
            compare = function (a, b) {
                if (a > b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
        }

        for (var i = 1; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i; j++) {
                //比较arr[j] 和 arr[j+1]
                if (compare(arr[j], arr[j + 1]) > 0) {
                    //交换
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    },
    /**
     * 筛选数组
     * @param {*} arr 
     * @param {Function} callback 回调函数，接收两个参数，
     * 分别表示数组的某一项和其下标，返回boolean
     * 满足条件返回true，否则返回false
     */
    filter: function (arr, callback) {
        //遍历数组，看每一项是否满足条件
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },
    /**
     * 从指定的数组中，查找第一个满足条件的元素，如果没有找到，返回undefined
     * @param {*} arr 
     * @param {*} callback 回调函数，接收两个参数，
     * 分别表示数组的某一项和其下标，返回boolean
     * 满足条件返回true，否则返回false
     */
    find: function (arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                return arr[i];
            }
        }
    },
    /**
     * 按照指定的条件，得到某个数组中满足条件的元素数量
     * @param {*} arr 
     * @param {*} callback 回调函数，接收两个参数，
     * 分别表示数组的某一项和其下标，返回boolean
     * 满足条件返回true，否则返回false
     */
    count: function (arr, callback) {
        var num = 0;
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                num++;
            }
        }
        return num;
    },
    /**
     * 得到一个最小值到最大值之间的随机整数
     * @param {*} min 最小值
     * @param {*} max 最大值
     */
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    },
    /**
     * 根据出生年月日，计算年龄
     * @param {*} year 
     * @param {*} month 
     * @param {*} day 
     */
    getAge: function (year, month, day) {
        //得到当前日期
        var now = new Date(2016, 1, 28);
        var dec = now.getFullYear() - year;
        //处理闰年
        if (month === 2 && day === 29 && !this.isLeap(now.getFullYear())) {
            day = 28;
        }
        //得到今年的生日
        var birthdayThisYear = new Date(now.getFullYear(), month - 1, day);
        if (birthdayThisYear > now) {
            dec--;
        }
        return dec;
    },
    getDateString: function (date) {
        var year = date.getFullYear().toString().padStart(4, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var day = date.getDate().toString().padStart(2, "0");

        var hour = date.getHours().toString().padStart(2, "0");
        var minute = date.getMinutes().toString().padStart(2, "0");
        var second = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}

