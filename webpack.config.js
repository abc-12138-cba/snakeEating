const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development' ;
module.exports = {
    entry: path.resolve('./src/demo.ts'),
    output: {
        filename: 'build.js',
        path: path.resolve('./dist')
    },
    resolve:{
        extensions:['.ts','.js']
    },   
    module: {
        rules: [
            {//js代码兼容
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            'ie': '11',
                                            'chrome': '60'
                                        },
                                        corejs: '3',
                                        useBuiltIns: 'usage'
                                    }
                                ]

                            ]
                        }
                    },
                    'ts-loader'
                ]
            }, 
            {//less 文件及兼容问题
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    require('postcss-preset-env')()
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        })
    ],
    mode: 'development',
    devServer:{
        contentBase:path.resolve('./dist'),
        compress:true,
        port:3000,
        open:true,
        inline:true
    },
    //配置代码映射技术
    // devtool:'source-map'//精确到某个文件行和列的错误信息
}

