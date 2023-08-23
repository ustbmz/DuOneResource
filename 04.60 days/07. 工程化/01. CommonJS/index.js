// 启动文件  通过node命令运行的文件
console.log('index start');

// 导入模块
const math = require('./math'); // 返回 { isOdd: fn,  sum: fn }
console.log(math.sum(1, 2));

require('./math');
require('./math');
require('./math');
require('./math');
require('./math');
