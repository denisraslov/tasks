var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.js'
    ],
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ["react-hot", 'jsx?harmony', "babel-loader"]
            },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
    }
};
