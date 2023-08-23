import "reflect-metadata";
import { Movie } from "./entities/Movie";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

const m: any = {}; // plain Object
m.name = 2343;
m.types = "sdf";
m.areas = ["中国大陆"];
m.isClassic = true;
m.timeLong = 2;

// 将plain Object转换为Movie的对象
const movie = plainToClass(Movie, m as object);
// console.log(movie, typeof movie.name);
validate(movie).then(errors => {
    console.log(errors);
});

// reflect-metadata
