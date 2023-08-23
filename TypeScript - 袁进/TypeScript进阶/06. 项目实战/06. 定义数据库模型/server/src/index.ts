import "reflect-metadata";
import { MovieModel } from "./db";

MovieModel.find().then(ms => {
    console.log(ms);
});
