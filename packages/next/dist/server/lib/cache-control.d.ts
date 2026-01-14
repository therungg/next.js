import type { ServerResponse } from 'http';
/**
 * The revalidate option used internally for pages. A value of `false` means
 * that the page should not be revalidated. A number means that the page
 * should be revalidated after the given number of seconds (this also includes
 * `1` which means to revalidate after 1 second). A value of `0` is not a valid
 * value for this option.
 */
export type Revalidate = number | false;
export interface CacheControl {
    revalidate: Revalidate;
    expire: number | undefined;
}
export interface CacheHeaders {
    'Cache-Control': string;
    cdnCacheControl?: string;
}
export declare function getCacheControlHeader({ revalidate, expire, }: CacheControl): CacheHeaders;
/**
 * The default header name used for CDN cache control.
 */
export declare const DEFAULT_CDN_CACHE_CONTROL_HEADER = "CDN-Cache-Control";
/**
 * Sets cache control headers on a ServerResponse object.
 * Use this helper to consistently set Cache-Control and CDN cache control headers.
 *
 * @param res - The ServerResponse object
 * @param cacheControl - The cache control configuration
 * @param cdnCacheControlHeader - Custom CDN cache control header name from config, falls back to 'CDN-Cache-Control' if undefined
 */
export declare function setResponseCacheControlHeaders(res: ServerResponse, cacheControl: CacheControl, cdnCacheControlHeader: string | undefined): void;
/**
 * Sets cache control headers on a Headers object (for Web API responses).
 * Use this helper to consistently set Cache-Control and CDN cache control headers.
 *
 * @param headers - The Headers object
 * @param cacheControl - The cache control configuration
 * @param cdnCacheControlHeader - Custom CDN cache control header name from config, falls back to 'CDN-Cache-Control' if undefined
 */
export declare function setCacheControlHeaders(headers: Headers, cacheControl: CacheControl, cdnCacheControlHeader: string | undefined): void;
