# 安装
```javascript
cnpm init -y 初始化项目
cnpm i webpack webpack-cli -D 安装依赖
```
# webpack4的0配置（先体验一把）
- 新建src目录，在src下新建str.js和index.js，index.html

str.js
```javascript
// 遵循commonjs规范
module.exports = '张不怂教你学英语'
```
index.js
```javascript
const str = require('./str.js') // 正常浏览器是不识别的，打包后才认识require
console.log(str);
```
index.html
```html
<script src="../dist/main.js"></script>
```

运行
```javascript
npx webpack 
```
发现多了一个dist目录，dist下多了一个main.js,因为如果不配
打包后运行index.html可以发现在console界面输出了我们指定的字符串
好了，接下来的所有事就基于这个基础:

1. 输出的目录必须是dist吗
