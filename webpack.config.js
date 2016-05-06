/**
 * Created by lt-llj on 2016/5/6.
 */
var webpack = require('webpack');
var htmlWebPackPlugin = require('html-webpack-plugin');
var config = {
    entry: {
        "index":"./es6/index.es6"
    },
    output: {
        publickPath: './js',
        path: './js',
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devServer: {
        inline: true,
        port: 3000,
        hot:true
    },
    module: {
        loaders: [{
    test: /\.js|\.es6$/,
    exclude: /node_modules/,
    loaders:[ 'babel']
},
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;
