//yarn add html-webpack-plugin@4.5.2 -D安装webpack官方的插件,用于编译 Webpack 项目中的 html 类型的文件，
//如果直接将 html 文件置于 ./src 目录中，用 Webpack 打包时是不会编译到生产环境中的
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
//yarn add copy-webpack-plugin -D
//用于webpack编译时指定需要把哪些文件或目录复制到指定的webpack项目目录中
const CopyPlugin = require("copy-webpack-plugin");
//CleanWebpackPlugin该插件每次webpack打包时会删除掉output输出/出口目录,在创建新的
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//把配置文件信息暴露出去
module.exports = {
    //配置环境为生产环境
    mode: "developent",

    devtool: "source-map",
    //配置入口
    entry: {
        app: path.join(__dirname, "./src/app.js")
    },
    //模式,设置当前为开发模式
    mode: "development",

    //配置出口,把需要打包的文件打包到哪个目录,哪个文件中
    //webpack会把文件都打包到dist目录中,访问资源时访问的是dist目录下的文件
    output: {
        path: path.join(__dirname, "./dist"),
        //[name]会自动读取原文件名使用,把入口中的js打包到出口目录的js目录下
        filename: "js/[name].js"
    },

    //配置loader：loader是webpack用来预处理模块的，在一个模块被引入之前，会预先使用loader处理模块的内容
    //默认webpack只会处理js代码，所以当我们想要去打包其他内容时，让webpack处理其他类型的内容，就要使用相应的loader
    module: {
        //配置规则,数组 可以配置多个
        rules: [
            {//正则表达式,以.art结尾的文件,使用art-template-loader对其进行处理后再对其进行打包
                test: /\.art$/,
                loader: "art-template-loader"
            },
            {
                //css-loader会把import require（） @import 引入的内容打包到js文件的一个数组中,数组中是我们写的各个样式,
                test: /\.css$/,
                //css-loader会处理 
                //style-loader 是通过一个JS脚本创建一个style标签，里面包含一些样式(js文件数组中的样式)。style-loader是不能单独使用的，应为它并不负责解析 css 之前的依赖关系，每个loader的功能都是单一的，各自拆分独立。
                //loader的顺序不能该变,数组后边的先加载
                loaders: ["style-loader","css-loader"]
            }
        ]

    },

    //配置插件,new该插件的实例,plugins数组中的都是webpack插件的实例
    plugins: [
        //该插件用于编译html
        new HtmlWebpackPlugin({
            //webpack编译哪个html文件,默认会把public目录下的html打包到dist下,但body没有内容
            template: path.join(__dirname, './public/index.html'),
            //编译后的文件名是什么
            filename: 'index.html',
            //是否把app.js文件引入到filename配置的index.html中,true会把js文件引入到body结束标签上方,false不会注入,head会注入到head标签中
            inject: true
        }),
        //该插件用于把指定文件或目录复制到webpack指定输出目录中
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "./public/images"),
                    to: path.join(__dirname, "./dist/images")
                },
                {
                    from: path.join(__dirname, "./public/libs"),
                    to: path.join(__dirname, "./dist/libs")
                }
            ]
        }),
        //
        // new CleanWebpackPlugin()
    ],
    //yarn add webpack-dev-server -D安装webpack的server服务
    //配置server后可以使用npx webpack-dev-server开启服务
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        port: 8080
    }
}