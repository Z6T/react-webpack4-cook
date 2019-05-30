const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    // 输出目录
    path: path.join(__dirname, "dist"),
    // 文件名称
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        // cnpm i babel-loader @babel/core @babel/preset-env -D
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // 指定babel预处理转义
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      }
    ]
  }
};
