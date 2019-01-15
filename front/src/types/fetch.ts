import { FetchQueryStatus } from 'store';

export interface FetchData<R = {}> {
    lastFetchTimeStamp: number;
    expiresAtTimeStamp: number;
    status: FetchQueryStatus;
    retriesCount: number;
    data: R | null;
}

export interface CachedQueriesData<R = {}> {
    [cacheKey: string]: FetchData<R>;
}
