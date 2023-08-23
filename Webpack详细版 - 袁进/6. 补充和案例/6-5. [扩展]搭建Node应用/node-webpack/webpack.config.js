const path = require("path");
const isDev = process.env.NODE_ENV === "development";
module.exports = {
  mode: isDev ? "development" : "production",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devtool: isDev ? "source-map" : "none",
  entry: "./src/index.js",
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
};
