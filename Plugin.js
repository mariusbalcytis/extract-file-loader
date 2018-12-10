'use strict'

class ExtractFilePlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('ExtractFilePlugin', (compilation) => {
            compilation.hooks.normalModuleLoader.tap('ExtractFilePlugin', (loaderContext, module) => {
                loaderContext[__dirname] = () => {
                    module.buildMeta[__dirname] = true;
                };
            });

            compilation.hooks.additionalAssets.tap('ExtractFilePlugin', () => {
                for (const chunk of compilation.chunks) {
                    for (const module of chunk.modulesIterable) {
                        processModule(chunk, module);
                    }
                }
            });
        });
    }
}

function processModule(chunk, ourModule) {
    if (!ourModule.buildMeta || !ourModule.buildMeta[__dirname]) {
        return;
    }

    // let's find module, which was issued by ours (proxied module)
    for (const module of chunk.modulesIterable) {
        if (module.reasons.some(reason => reason.module === ourModule)) {
            addAssets(chunk, module);
            break;
        }
    }
}

function addAssets(chunk, module) {
    if (!module.buildInfo || !module.buildInfo.assets) {
        return;
    }
    
    // add any emitted assets via proxied module to this chunk
    for (const file of Object.keys(module.buildInfo.assets)) {
        chunk.files.push(file);
    }
}

module.exports = ExtractFilePlugin;
