import { CACHE_ONE_YEAR } from '../../lib/constants';
export function getCacheControlHeader({ revalidate, expire }) {
    const swrHeader = typeof revalidate === 'number' && expire !== undefined && revalidate < expire ? `, stale-while-revalidate=${expire - revalidate}` : '';
    if (revalidate === 0) {
        return {
            'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate'
        };
    }
    // For non-zero revalidation, we want to leverage CDN stale-while-revalidate caching
    // semantics without allowing the browser to cache the response.
    const maxAge = typeof revalidate === 'number' ? revalidate : CACHE_ONE_YEAR;
    const cdnCacheControl = `max-age=${maxAge}${swrHeader}`;
    const cacheControl = `s-maxage=${maxAge}`;
    return {
        'Cache-Control': cacheControl,
        cdnCacheControl: cdnCacheControl
    };
}
/**
 * The default header name used for CDN cache control.
 */ export const DEFAULT_CDN_CACHE_CONTROL_HEADER = 'CDN-Cache-Control';
/**
 * Sets cache control headers on a ServerResponse object.
 * Use this helper to consistently set Cache-Control and CDN cache control headers.
 *
 * @param res - The ServerResponse object
 * @param cacheControl - The cache control configuration
 * @param cdnCacheControlHeader - Custom CDN cache control header name from config, falls back to 'CDN-Cache-Control' if undefined
 */ export function setResponseCacheControlHeaders(res, cacheControl, cdnCacheControlHeader) {
    const cacheHeaders = getCacheControlHeader(cacheControl);
    const headerName = cdnCacheControlHeader ?? DEFAULT_CDN_CACHE_CONTROL_HEADER;
    res.setHeader('Cache-Control', cacheHeaders['Cache-Control']);
    if (cacheHeaders.cdnCacheControl) {
        res.setHeader(headerName, cacheHeaders.cdnCacheControl);
    }
}
/**
 * Sets cache control headers on a Headers object (for Web API responses).
 * Use this helper to consistently set Cache-Control and CDN cache control headers.
 *
 * @param headers - The Headers object
 * @param cacheControl - The cache control configuration
 * @param cdnCacheControlHeader - Custom CDN cache control header name from config, falls back to 'CDN-Cache-Control' if undefined
 */ export function setCacheControlHeaders(headers, cacheControl, cdnCacheControlHeader) {
    const cacheHeaders = getCacheControlHeader(cacheControl);
    const headerName = cdnCacheControlHeader ?? DEFAULT_CDN_CACHE_CONTROL_HEADER;
    headers.set('Cache-Control', cacheHeaders['Cache-Control']);
    if (cacheHeaders.cdnCacheControl) {
        headers.set(headerName, cacheHeaders.cdnCacheControl);
    }
}

//# sourceMappingURL=cache-control.js.map