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
        rules: [
            {
                enforce: 'pre',
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'image-webpack-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'file-loader?name=[name].optimized.[ext]'
            },
        ],
    }
};
