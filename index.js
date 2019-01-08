'use strict';

const loaderUtils = require('loader-utils');

module.exports = function (content) {
    if (this.cacheable) {
        this.cacheable();
    }

    // this is defined in the Plugin.js - mark this module as being loaded with this loader
    if (this[__dirname]) {
        this[__dirname]();
    }

    const query = getOptions(this);

    if (!query.q) {
        throw new Error('proxy-loader requires "q" query parameter');
    }

    // just require the string passed via "q" parameter
    return 'module.exports = require(' + JSON.stringify(query.q) + ');';
};

module.exports.raw = true;


function getOptions(loaderContext) {
    const query = loaderContext.query;

    if (typeof query === 'string' && query !== '') {
        return loaderUtils.parseQuery(loaderContext.query);
    }

    if (!query || typeof query !== 'object') {
        // Not object-like queries are not supported.
        return null;
    }

    return query;
}
