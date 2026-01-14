"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DEFAULT_CDN_CACHE_CONTROL_HEADER: null,
    getCacheControlHeader: null,
    setCacheControlHeaders: null,
    setResponseCacheControlHeaders: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_CDN_CACHE_CONTROL_HEADER: function() {
        return DEFAULT_CDN_CACHE_CONTROL_HEADER;
    },
    getCacheControlHeader: function() {
        return getCacheControlHeader;
    },
    setCacheControlHeaders: function() {
        return setCacheControlHeaders;
    },
    setResponseCacheControlHeaders: function() {
        return setResponseCacheControlHeaders;
    }
});
const _constants = require("../../lib/constants");
function getCacheControlHeader({ revalidate, expire }) {
    const swrHeader = typeof revalidate === 'number' && expire !== undefined && revalidate < expire ? `, stale-while-revalidate=${expire - revalidate}` : '';
    if (revalidate === 0) {
        return {
            'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate'
        };
    }
    // For non-zero revalidation, we want to leverage CDN stale-while-revalidate caching
    // semantics without allowing the browser to cache the response.
    const maxAge = typeof revalidate === 'number' ? revalidate : _constants.CACHE_ONE_YEAR;
    const cdnCacheControl = `max-age=${maxAge}${swrHeader}`;
    const cacheControl = `s-maxage=${maxAge}`;
    return {
        'Cache-Control': cacheControl,
        cdnCacheControl: cdnCacheControl
    };
}
const DEFAULT_CDN_CACHE_CONTROL_HEADER = 'CDN-Cache-Control';
function setResponseCacheControlHeaders(res, cacheControl, cdnCacheControlHeader) {
    const cacheHeaders = getCacheControlHeader(cacheControl);
    const headerName = cdnCacheControlHeader ?? DEFAULT_CDN_CACHE_CONTROL_HEADER;
    res.setHeader('Cache-Control', cacheHeaders['Cache-Control']);
    if (cacheHeaders.cdnCacheControl) {
        res.setHeader(headerName, cacheHeaders.cdnCacheControl);
    }
}
function setCacheControlHeaders(headers, cacheControl, cdnCacheControlHeader) {
    const cacheHeaders = getCacheControlHeader(cacheControl);
    const headerName = cdnCacheControlHeader ?? DEFAULT_CDN_CACHE_CONTROL_HEADER;
    headers.set('Cache-Control', cacheHeaders['Cache-Control']);
    if (cacheHeaders.cdnCacheControl) {
        headers.set(headerName, cacheHeaders.cdnCacheControl);
    }
}

//# sourceMappingURL=cache-control.js.map