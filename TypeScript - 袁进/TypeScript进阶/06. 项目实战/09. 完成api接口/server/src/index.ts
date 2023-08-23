import "reflect-metadata";
import Express from "express";
import MovieRouter from "./routes/MovieRoute";

const app = Express();

app.use(Express.json()); // 配置中间件，用于解析请求消息体中的json格式数据

// 使用postman进行测试
app.use("/api/movie", MovieRouter);

app.listen(3000);
