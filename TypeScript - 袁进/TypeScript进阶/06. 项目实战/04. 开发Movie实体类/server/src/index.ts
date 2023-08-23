import { Movie } from "./entities/Movie";
import { validate } from "class-validator";

const m = new Movie();
m.name = "asdfsdf";
m.types = ["喜剧"];
m.areas = ["中国大陆"];
m.isClassic = true;
m.timeLong = 2;
validate(m).then(errors => {
    console.log(errors);
});
