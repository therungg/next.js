"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createServerPathnameForMetadata", {
    enumerable: true,
    get: function() {
        return createServerPathnameForMetadata;
    }
});
const _dynamicrendering = require("../app-render/dynamic-rendering");
const _workunitasyncstorageexternal = require("../app-render/work-unit-async-storage.external");
const _dynamicrenderingutils = require("../dynamic-rendering-utils");
const _invarianterror = require("../../shared/lib/invariant-error");
function createServerPathnameForMetadata(underlyingPathname, workStore) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-legacy':
                {
                    return createPrerenderPathname(underlyingPathname, workStore, workUnitStore);
                }
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerPathnameForMetadata should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E740",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, createRenderPathname(underlyingPathname));
            case 'request':
                return createRenderPathname(underlyingPathname);
            default:
                workUnitStore;
        }
    }
    (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
}
function createPrerenderPathname(underlyingPathname, workStore, prerenderStore) {
    switch(prerenderStore.type){
        case 'prerender-client':
            throw Object.defineProperty(new _invarianterror.InvariantError('createPrerenderPathname was called inside a client component scope.'), "__NEXT_ERROR_CODE", {
                value: "E694",
                enumerable: false,
                configurable: true
            });
        case 'prerender':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams && fallbackParams.size > 0) {
                    return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`pathname`');
                }
                break;
            }
        case 'prerender-legacy':
            break;
        default:
            prerenderStore;
    }
    // We don't have any fallback params so we have an entirely static safe params object
    return Promise.resolve(underlyingPathname);
}
function createRenderPathname(underlyingPathname) {
    return Promise.resolve(underlyingPathname);
}

//# sourceMappingURL=pathname.js.map