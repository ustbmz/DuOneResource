import "reflect-metadata";
import { MovieService } from "./services/MovieService";

// const m: any = {
//     name: "流浪地球",
//     timeLong: 120,
//     areas: ["中国大陆", "美国"],
//     types: ["灾难", "科幻"]
// };

// MovieService.add(m).then(result => {
//     console.log(result);
// });

// MovieService.delete("5cd239d19fadff149cdea37c").then(() => {
//     console.log("删除成功");
// });

MovieService.findById("5cd23fd83cc5205f0c1c7e9b").then(result => {
    console.log(result);
});
