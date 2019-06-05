const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    // 输出目录
    path: path.join(__dirname, "dist"),
    // 文件名称
    filename: "bundle.[hash:8].js"
  },
  resolve: {
    extensions: [ ".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "src"),
      pages: path.join(__dirname, "src/pages"),
      router: path.join(__dirname, "src/router")
    }
  },
  optimization: {
    usedExports:true,
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // 编译css
          "postcss-loader",
          "sass-loader" // 编译scss
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images/", // 图片输出的路径
            limit: 10 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devtool: 'cheap-module-eval-soure-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    host: "0.0.0.0", // 可以使用手机访问
    port: 8080,
    historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址
      "/api": "http://localhost:3000"
    }
  }
};
