import express from "express";
import path from "path";
const app = express();
const staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));

const port = 9527;
app.listen(port, () => {
  console.log("server listening on " + port);
});
