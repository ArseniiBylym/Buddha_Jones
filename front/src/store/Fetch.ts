import { observable } from 'mobx';

export interface FetchData {
    lastFetchTimeStamp: number;
    expiresAtTimeStamp: number;
    data: object;
}

export interface CachedQueriesData {
    [cacheKey: string]: FetchData;
}

export class Fetch {
    @observable public cachedQueries: CachedQueriesData = {};
}
