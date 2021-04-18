var path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry:{ // 配置的单入口
        main: './main' // 从main.js 从开始工作
    },
    output: { // 输出目录
        path: path.join(__dirname, './dist'),  // 指定输出目录路径
        publicPath: '/dist', // 输出目录资源文件的引用目录
        filename: 'main.js', // 指定指定输出文件的名称
        chunkFilename: '[name].chunk.js' // 设置名称以chunk命名
    },
    module: {
        rules: [ // rules属性指定loader，每个loader 都包含test 和 use两个选项
            {
                test: /\.vue$/,   // 由于.vue文件对template script和 style 分别处理，因此多了一项options进一步处理不同语言
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                } 
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ // node_modules不进行转化
            },
            { // 这句是当webpakc编译过程中遇到require 或者 import 导入后缀名为.css 文件时， 首先通过
                // css-loader 转化， 再通过style-loader 转化，然后继续打包
                // 这个打包之后是将css注入到html中的内联样式中，我们使用一个extract-text-webpck-plugin插件把散落的css提取生成一个mian.css文件，最终在index.html中通过link标签形式进行加载
               test: /\.css$/,
               use: ExtractTextPlugin.extract({
                   use: 'css-loader',
                   fallback: 'style-loader'
               })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024', // url-loader编译输出到dist目录下，?limit=1024如果这个文件小于1kb，就以base63形式加载，而不会生成一个文件 
            }
        ]
    },
    plugins:[
         // 重命名提取的css文件为main.css
         new ExtractTextPlugin({ // 有了chunk后每个页面.vue写的样式也需要配置后才会打包进main.css， 否则任然会通过JavaScript到动态加载style 标签形式写入
            filename: '[name].css',
            allChunks: true
         })
    ]
}
module.exports = config