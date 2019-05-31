const path = require("path");
const webpack = require('webpack');
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
  },
  plugins:[
    //开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer:{
    contentBase:path.join(__dirname,'./dist'), 
    host:'localhost',// 可以使用手机访问
    port:8080,
    historyApiFallback:true, // 所有的404都连接到index.html
    proxy: { // 代理到后端的服务地址
      "/api": "http://localhost:3000"
    }
  }
};
