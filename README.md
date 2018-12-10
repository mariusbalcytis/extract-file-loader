# Extract file loader for webpack

Reason for this module:

- [assets-webpack-plugin](https://github.com/kossnocorp/assets-webpack-plugin)
generates a manifest of emitted files for each chunk
- [file-loader](https://github.com/webpack/file-loader) emits files, but they are
not added to the chunk files
- this loader is used as a proxy to include this emitted file in the chunk
so it's available in generated manifest

# Install

```bash
# for webpack 4
npm install --save-dev extract-text-webpack-plugin
# for webpack 3
npm install --save-dev extract-text-webpack-plugin@0.2.0
# for webpack 1, 2
npm install --save-dev extract-text-webpack-plugin@0.1.0
```

## Usage

```js
require('extract-file?q=file%3Fname=[name].[hash].[ext]%21image.png!');
//                       %3F = ?                    %21 = !
```

### Why did you put asset in the query string?!

Asset to require internally is provided via `q` query string parameter.

This is to avoid collisions with rules in your configuration file, where you configure
loaders by their extensions.

Keep in mind that you have to fully URL-encode the asset as webpack will not parse
it correctly if you don't (there cannot be any literal `!` inside the query)


## Example configuration

See [example configuration](test/webpack.config.js) in `test` directory.

Test is functional - it checks if that configuration produces manifest
with correct `png` file entry.

## Use cases

Use this for requiring binary files (like images) as entry points.

This module is to be used with some pre/post-processing, as by default
this loader still produces javascript file - path to asset is only added
in the manifest.
