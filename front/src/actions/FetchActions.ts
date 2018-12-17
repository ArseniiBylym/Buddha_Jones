import { API } from 'fetch';
import {
    action,
    extendObservable,
    has,
    set
    } from 'mobx';
import { FetchStore } from '../store/AllStores';

export class FetchActionsClass {
    @action
    public setQueryCache = (cacheKey: string, data: object, expireInMiliseconds: number | null = 0) => {
        const now = Date.now();

        const cache = {
            lastFetchTimeStamp: now,
            expiresAtTimeStamp:
                expireInMiliseconds === null
                    ? 0
                    : expireInMiliseconds <= 0
                    ? now + 86400000
                    : now + expireInMiliseconds,
            data: data,
        };

        if (has(FetchStore.cachedQueries, cacheKey)) {
            set(FetchStore.cachedQueries, cacheKey, cache);
        } else {
            extendObservable(FetchStore.cachedQueries, {
                [cacheKey]: cache,
            });
        }
    };

    public createCacheKey = (endPoint: string, queryObject?: object): string => {
        return endPoint + (queryObject ? API.prepareUrlQuery(queryObject) : '');
    };
}
