import { Dictionary } from "./dictionary";

const dic = new Dictionary<string, number>();

dic.set("a", 1);
dic.set("b", 2);
dic.set("a", 11);
dic.set("c", 33);

dic.forEach((k, v) => {
    console.log(`${k}:${v}`);
})
console.log("当前键值对数量：" + dic.size);
console.log("删除键b")

dic.delete("b");

dic.forEach((k, v) => {
    console.log(`${k}:${v}`);
})
console.log("当前键值对数量：" + dic.size);
