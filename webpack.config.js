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
            { test: /\.css$/, use: ['style-loader', 'css-loader', "postcss-loader"] },
            // css编译 单独分离出css文件
            // {
            //     test: /\.css$/,
            //     use: extractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: ["css-loader","postcss-loader"]
            //     })
            // },
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
                use: ['style-loader', 'css-loader', "postcss-loader", 'less-loader']
                // 分离css文件
                // use: extractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: ['css-loader',"postcss-loader", 'less-loader']
                // })
            },
            // scss 编译
            {
                test: /\.scss$/,
                // 编译scss 不分离文件
                use: ['style-loader', 'css-loader', "postcss-loader", 'sass-loader']
                // 分离css文件
                // use:extractTextPlugin.extract({
                //     fallback:'style-loader',
                //     use:['css-loader',"postcss-loader",'sass-loader']
                // })
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
        inline: true,
        open: 'http://127.0.0.1:8080'
    }
}