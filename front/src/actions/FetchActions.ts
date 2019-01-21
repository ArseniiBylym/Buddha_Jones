import { API } from 'fetch';
import { AsyncHandler } from 'helpers/AsyncHandler';
import {
    action,
    extendObservable,
    has,
    set,
    toJS
    } from 'mobx';
import { FetchQueryStatus } from 'store';
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
                    ? now + 1000 * 60 * 60 * 24
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

    public constructCacheKey = (endPoint: string, queryObject?: object): string => {
        return endPoint + API.prepareUrlQuery(queryObject || {});
    };

    @action
    public initializeCacheKey = (endPoint: string, queryObject?: object): boolean => {
        // Ignore for empty endPoint
        if (endPoint.trim() === '') {
            return false;
        }

        const cacheKey = this.constructCacheKey(endPoint, queryObject);
        if (!has(FetchStore.cachedQueries, cacheKey)) {
            extendObservable(FetchStore.cachedQueries, {
                [cacheKey]: {
                    lastFetchTimeStamp: 0,
                    expiresAtTimeStamp: 0,
                    status: FetchQueryStatus.Loading,
                    retriesCount: 0,
                    data: null,
                },
            });
        }

        return true;
    };

    @action
    public setFetchRetryAttemptsCount = (cacheKey: string, retries: number = 0) => {
        if (has(FetchStore.cachedQueries, cacheKey)) {
            FetchStore.cachedQueries[cacheKey].retriesCount = retries;
        } else {
            this.initializeCacheKey(cacheKey);
        }
    };

    public fetchDataFromApi = async <R>(
        apiEndpoint: string,
        queryObject?: object,
        dataExpiresInMiliseconds: number | null | undefined = undefined,
        retryIncrementallyAfterMiliseconds: number = 0,
        retryAttemptsLimit: number = 0,
        withoutCaching: boolean = false,
    ): Promise<R> => {
        // Get cache key
        const cacheKey = this.constructCacheKey(apiEndpoint, queryObject);
        
        try {
            // Check if old cache exists, if not initialize
            if (!has(FetchStore.cachedQueries, cacheKey)) {
                this.initializeCacheKey(apiEndpoint, queryObject);
            }

            // Indicate loading status and increment retry attemp
            FetchStore.cachedQueries[cacheKey].status = FetchQueryStatus.Loading;
            FetchStore.cachedQueries[cacheKey].retriesCount++;

            // Check if current cache is fresh enough to not fetch new data
            const now = Date.now();
            if (withoutCaching === false) {
                if (FetchStore.cachedQueries[cacheKey].expiresAtTimeStamp > now) {
                    FetchStore.cachedQueries[cacheKey].status = FetchQueryStatus.Success;
                    FetchStore.cachedQueries[cacheKey].retriesCount = 0;
                    
                    return toJS(FetchStore.cachedQueries[cacheKey].data) as R;
                }
            }

            // Get retries count
            const retriesCount = toJS(FetchStore.cachedQueries[cacheKey].retriesCount);

            // Wait till incremental retry delay is done
            if (retriesCount > 1 && retryIncrementallyAfterMiliseconds > 0) {
                await AsyncHandler.timeout((retriesCount - 1) * retryIncrementallyAfterMiliseconds);
            }

            // Fetch actual data from server
            const response = await API.getData(apiEndpoint, queryObject || {}, false, true);
            this.setQueryCache(cacheKey, response, dataExpiresInMiliseconds);

            // Indicate success and reset retry attempts counter
            FetchStore.cachedQueries[cacheKey].status = FetchQueryStatus.Success;
            FetchStore.cachedQueries[cacheKey].retriesCount = 0;

            return (response as unknown) as R;
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error('Data fetch error: ', error);

            // Indicate error
            FetchStore.cachedQueries[cacheKey].status = FetchQueryStatus.Error;

            // Retry data fetch if attempts limit hasn't been exceeded
            if (
                retryAttemptsLimit > 0 &&
                has(FetchStore.cachedQueries, cacheKey) &&
                FetchStore.cachedQueries[cacheKey].retriesCount <= retryAttemptsLimit
            ) {
                this.fetchDataFromApi(apiEndpoint, queryObject);
            }

            throw error;
        }
    };
}
