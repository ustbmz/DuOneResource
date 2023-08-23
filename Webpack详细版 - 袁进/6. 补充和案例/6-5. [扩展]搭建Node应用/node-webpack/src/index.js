import fs from "fs"; // 支持 es6 的模块化
import { chunk } from "lodash-es"; // 支持 tree-shaking

const result = fs.readdirSync("./");
console.log(result);
console.log(chunk([1, 3, 4, 5, 8, 32], 2));
