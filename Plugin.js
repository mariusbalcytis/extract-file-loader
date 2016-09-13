'use strict';

class ExtractFilePlugin {
    apply(compiler) {
        compiler.plugin('this-compilation', (compilation) => {
            compilation.plugin('normal-module-loader', (loaderContext, module) => {
                loaderContext[__dirname] = () => {
                    module.meta[__dirname] = true;
                };
            });

            compilation.plugin('additional-assets', callback => {
                compilation.chunks.forEach(chunk => {
                    chunk.modules.forEach(module => processModule(chunk, module));
                });

                callback();
            });
        });
    }
}

function processModule(chunk, ourModule) {
    if (ourModule.meta && ourModule.meta[__dirname]) {
        // let's find module, which was issued by ours (proxied module)
        chunk.modules.some((module) => {
            if (module.reasons.some(reason => reason.module === ourModule)) {
                // add assets from that module
                addAssets(chunk, module);
                // break cycle
                return true;
            }
        });
    }
}

function addAssets(chunk, module) {
    // add any emitted assets via proxied module to this chunk
    for (var file in module.assets) {
        chunk.files.push(file);
    }
}

module.exports = ExtractFilePlugin;
