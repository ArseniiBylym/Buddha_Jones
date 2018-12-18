import { observable } from 'mobx';
import { CachedQueriesData } from 'types/fetch';

export enum FetchQueryStatus {
    Loading,
    Error,
    Success,
}

export class Fetch {
    @observable public cachedQueries: CachedQueriesData = {};
}
