const fs = require('fs');
const webpack = require('webpack');

describe('extract-file-loader', () => {

    before(cleanup);
    after(cleanup);

    function cleanup() {
        [
            __dirname + '/output/cat.optimized.png',
            __dirname + '/output/manifest.json',
            __dirname + '/output/result.js',
        ].forEach(path => {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        });
    }

    it('Should add entry to manifest if configured with file-loader and assets-webpack-plugin', (done) => {
        const compiler = webpack(require('./webpack.config'));
        compiler.run((err) => {
            if (err) {
                done(err);
                return;
            }

            const path = __dirname + '/output/manifest.json';
            if (!fs.existsSync(path)) {
                done('Manifest file not found');
                return;
            }

            const manifest = JSON.parse(fs.readFileSync(path));
            if (manifest.image.png === undefined) {
                done('Manifest does not have png file');
            } else if (manifest.image.png !== 'cat.optimized.png') {
                done('Manifest has wrong png file');
            } else {
                done();
            }
        });
    });
});