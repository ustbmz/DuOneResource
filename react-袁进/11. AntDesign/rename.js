var fs = require("fs");

var names = fs.readdirSync("./");
names.pop();

names = names.sort((a, b) => {
  var [i1] = a.split(".");
  var [i2] = b.split(".");

  return Number(i1.split("-")[1]) - Number(i2.split("-")[1]);
});
// console.log(names);
names.forEach((item, i) => {
  var [index, name] = item.split(".");
  if (name === "js") {
    return;
  }
  fs.renameSync(item, `${i + 1}`.padStart(2, "0") + ". " + name);
});
