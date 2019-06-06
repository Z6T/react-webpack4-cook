const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件


module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
        // 文件名称
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    },
    devtool: 'cheap-module-source-map',
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                // 公共代码打包分组配置
                jquery: {
                    name: 'jquery',
                    test: /[\\/]node_modules[\\/]jquery[\\/]/
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        },
    },
    plugins: [
        // 清除无用 css---生产环境---csstree-shaking
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, '..', 'src/*.html'),
                path.resolve(__dirname, '..', 'src/*.js'),
                path.resolve(__dirname, '..', 'src/**/*.jsx'),
            ])
        }),
        // PWA配置，生产环境才需要
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/jquery.dll.js') // 对应的 dll 文件路径
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '..', 'dll/jquery-manifest.json')
        })
    ]
});
