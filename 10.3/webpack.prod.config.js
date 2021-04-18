var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');
// 清空基本配置的插件列表
webpackBaseConfig.plugins = [];

module.exports  =  merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css', // 提取css，并重命名为带有20位hash值得唯一文件
            allChunks: true
        }),
        // 定义当前 node环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: false
            }
        }),
        // 提取模板,并保存入口html文件
        new HtmlwebpackPlugin({ // 生产html文件, 通过template 选项来读取指定的index.ejs,r然后输出到filename指定目录
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ]
})