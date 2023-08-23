import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";
Mongoose.connect("mongodb://localhost:27017/moviedb", {
    useNewUrlParser: true
}).then(() => console.log("连接数据库成功"));

export { MovieModel };
