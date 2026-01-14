import { delayUntilRuntimeStage } from '../app-render/dynamic-rendering';
import { throwInvariantForMissingStore, workUnitAsyncStorage } from '../app-render/work-unit-async-storage.external';
import { makeHangingPromise } from '../dynamic-rendering-utils';
import { InvariantError } from '../../shared/lib/invariant-error';
export function createServerPathnameForMetadata(underlyingPathname, workStore) {
    const workUnitStore = workUnitAsyncStorage.getStore();
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
                throw Object.defineProperty(new InvariantError('createServerPathnameForMetadata should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E740",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                return delayUntilRuntimeStage(workUnitStore, createRenderPathname(underlyingPathname));
            case 'request':
                return createRenderPathname(underlyingPathname);
            default:
                workUnitStore;
        }
    }
    throwInvariantForMissingStore();
}
function createPrerenderPathname(underlyingPathname, workStore, prerenderStore) {
    switch(prerenderStore.type){
        case 'prerender-client':
            throw Object.defineProperty(new InvariantError('createPrerenderPathname was called inside a client component scope.'), "__NEXT_ERROR_CODE", {
                value: "E694",
                enumerable: false,
                configurable: true
            });
        case 'prerender':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams && fallbackParams.size > 0) {
                    return makeHangingPromise(prerenderStore.renderSignal, workStore.route, '`pathname`');
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