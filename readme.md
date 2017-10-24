
> 这个开发开发环境只是为了能够快速的使用`webpack`来进行`react`的开发的入门使用，并不（完全）适用用生产环境的实际应用
> 因为没有考虑webpack的配置分离、生产环境的配置等很多东西，但是对于入门使用`webpack`进行`react`开发来说，没啥问题

<img src="./src/images/logo.svg" width="100px" style="margin:0 auto;display:block;">


## 一、问题

由于`react`的`create-react-app`本身不是使用`webpack`，而也不像`vue`给了一个非常好用的`vue-cli`

所以在使用`webpack`构建`react`的开发环境的时候遇到了很多问题。

尤其是网上很多都是`webpack1.x / webpack2.x`的指导，`webpack3.x`之后很多东西都发生了变化，而`babel`的更新也不建议使用`preset-es201X`这样的操作，建议直接使用`babel-preset-env`进行操作.


实际上我在自己配置的过程中遇到的最关键问题就是`babel`对`jsx`语法的编译，一开始总是无法编译，后来发现自己的包安装有问题。（这算是自己给自己挖的坑吧）


## 二、使用的依赖

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

安装完成后，可以直接通过`npm install 安装依赖`

```bash
npm install 
```

## 四、源码

地址：
- https://github.com/postbird/webpack-react-development

## 五、最早发布于博文：

- http://www.ptbird.cn/webpack3-react-development.html

## 六、更新记录：

- 2017-10-20 
  - 修改基本的结构，通过与入口文件`main.js`同级的`App.jsx`引入其他组件
- 2017-10-21
  - 修复`webpack`中`postcss-loader`的错误配置导致无法编译 less/sass 的问题
- 2017-10-24
  - 增加`webpack-dev-server`自动打开浏览器`open`配置