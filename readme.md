> 这个开发开发环境只是为了能够快速的使用`webpack`来进行`react`的开发的入门使用，并不（完全）适用用生产环境的实际应用
> 因为没有考虑webpack的配置分离、生产环境的配置等很多东西，但是对于入门使用`webpack`进行`react`开发来说，完全没啥问题

<img src="./src/images/logo.svg" width="100px" style="margin:0 auto;display:block;">


## 一、问题

最近入坑`react`

由于`react`的`create-react-app`本身不是使用webpack`，而也不像`vue`给了一个非常好用的`vue-cli`

所以在使用`webpack`构建`react`的开发环境的时候遇到了很多问题。

尤其是网上很多都是`webpack1.x / webpack2.x`的指导，`webpack3.x`之后很多东西都发生了变化，而`babel`的更新也不建议使用`preset-es201X`这样的操作，建议直接使用`babel-preset-env`进行操作.


实际上我在自己配置的过程中遇到的最关键问题就是`babel`对`jsx`语法的编译，一开始总是无法编译，后来发现自己的包安装有问题。（这算是自己给自己挖的坑吧）


## 二、安装依赖

`webpack`的开发环境就是对`webpack`的各种`loader`的配置及其他配置而已，因此还是很好理解的，如果熟悉`webpack`的话最好不过。

建议去看一下`webpack 3.x`的文档啥的。

### 依赖列表：

```javascript
"devDependencies": {
    "autoprefixer": "^7.1.5",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.1",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "html-withimg-loader": "^0.1.16",
    "less": "^3.0.0-alpha.3",
    "less-loader": "^4.0.5",
    "node-sass": "^4.5.3",
    "postcss-loader": "^2.0.8",
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.19.0",
    "uglifyjs-webpack-plugin": "^1.0.0-beta.3",
    "url-loader": "^0.6.2",
    "webpack": "^3.7.1",
    "webpack-dev-server": "^2.9.2"
  }
```

### 安装依赖：

#### webpack:
```bash
npm install webpack webpack-dev-server -D
```
#### babel：
```bash
npm install babel-core babel-loader babel-preset-env babel-preset-react -D
```
#### css：
```bash
npm install autoprefixer postcss-loader css-loader style-loader -D
```

#### less:

```bash
npm install less less-loader -D
```

#### sass:

```bash
npm install node-sass sass-loader -D
```

#### 文件/图片：

```bash
npm install style-loader url-loader html-withimg-loader -D
```

#### 一些有用的插件:

```bash
npm install extract-text-webpack-plugin html-webpack-plugin uglifyjs-webpack-plugin -D
```
#### react

```bash
npm install react react-dom -D
```

## 三、配置

### 1、babel配置文件 .babelrc

建议把babel的配置卸载`.babelrc`中，而不是在webpack中

```javascript
{
    "presets":["react",
        [
            "env", {
                "modules": false,
                "targets": {
                "browsers": ["last 2 Chrome versions","IE >= 9"]
                }
            }
        ]
    ]
}
```
### 2、postcss配置文件 postcss.config.js

```javascript
module.exports={
    plugins:[
        require('autoprefixer')
    ]
};
```
### 3、webpack.config.js

```javascript
const path = require('path');
const uglifyjs = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
// 公共目录
const website = {
    publicPath: '/'
}
module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/main.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: website.publicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.coffee']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            // css处理不进行分离
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // css编译 单独分离出css文件
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader"]
                })
            },
            // 图片处理
            {
                test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        'limit': 500,
                        outputPath: 'images/',
                    }
                }]
            },
            // less 编译
            {
                test: /\.less$/,
                // 不分离编译的css文件
                // use:['style-loader',"postcss-loader",'css-loader','less-loader']
                // 分离css文件
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader',"postcss-loader", 'less-loader']
                })
            },
            // scss 编译
            {
                test:/\.scss$/,
                // 编译scss 不分离文件
                // use:['style-loader',"postcss-loader",'css-loader','sass-loader']
                // 分离css文件
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader',"postcss-loader",'sass-loader']
                })
            },
        ]
    },
    // 插件
    plugins: [
        // new uglifyjs(),
        // new HtmlWebpackPlugin(),
        new extractTextPlugin("/css/index.css")
    ],
    // webpack-dev-server 
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，
        host: '0.0.0.0',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 8080,
        // 实时刷新
        inline: true
    }
}
```

## 四、源码

我把代码放在了`github`上，可以`git clone`查看源码，直接应用。

地址：
- https://github.com/postbird/webpack-react-development

## 五、本文最早发布于博文：

- http://www.ptbird.cn/webpack3-react-development.html