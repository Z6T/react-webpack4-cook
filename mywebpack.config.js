const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: "development",
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        filename:'main.[hash:4].js', // 输出的文件名 可以设置hash 
        path: path.resolve(__dirname,'build') // 输出的打包目录
    },
    // 对模块进行操作
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        // 解析loader必须写这个
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            
            // css-loader 是为了解析@import这种语法的 style-loader解析css放到style标签
            // use可以是字符串，对象或者数组
            // 从右向左执行
            {test:/\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader' ,'postcss-loader',]},
            // less less-loader
            // node-sass sass-loader
            // stylus stylus-loader
            {test:/\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']}
            // {test:/\.less$/, use: [{
            //     loader: 'style-loader',
            //     options: {
            //         insertAt: 'top' // 这个参数可以将css插到style的顶部。默认是底部，这样就不会覆盖你自己写的style了
            //     } //可以多传递参数
            // }, 'css-loader', 'less-loader']}
        ]
    },
    plugins: [ // 数组，放所有的插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 会根据这个html生成一个html放在内存中，并自动加script加到末尾
            filename: 'index.html',
            // 压缩html
            minify: {
                removeAttributeQuotes: true, // 去除双引号
                collapseWhitespace: true // 折叠成一行 
            },
            hash: true  //  src=main-1.js?fbde690f89bd234482c4> 类似这样的，不依赖缓存，加hsah
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css' // 将所有的css抽离成一个文件，并引入，它的loader可以代替style-loader
        })
    ],
    devServer: {
        port: 3000, // 端口
        open: true, // 是否自动打开浏览器
        progress: true, // 看到打包的进度条
        contentBase: './build', // 运行静态服务的目录
        compress: true, //是否启用gzip压缩
    }
}