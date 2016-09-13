const ExtractFilePlugin = require('../Plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const outputDir = __dirname + '/output';

module.exports = {
    resolve: {
        alias: {
            '@root': __dirname
        }
    },
    entry: {
        image: __dirname + '/../index?q=@root/cat.png!'
    },
    output: {
        path: outputDir,
        filename: 'result.js',
    },
    plugins: [
        new ExtractFilePlugin(),
        new AssetsPlugin({filename: 'manifest.json', path: outputDir})
    ],
    module: {
        preLoaders: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            loader: 'image-webpack'
        }],
        loaders: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            loader: 'file?name=[name].optimized.[ext]'
        }]
    }
};