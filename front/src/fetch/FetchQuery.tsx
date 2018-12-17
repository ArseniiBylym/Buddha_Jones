import { FetchActions } from 'actions';
import { AsyncHandler } from 'helpers/AsyncHandler';
import _isEqual from 'lodash-es/isEqual';
import {
    computed,
    extendObservable,
    get,
    has,
    observable,
    reaction,
    toJS
    } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { FetchData } from 'store';
import { AppOnlyStoreState } from 'store/AllStores';
import { API } from './API';

interface FetchQueryChildrenProps<R> {
    loading: boolean;
    fetchError: boolean;
    retry: () => void;
    response: R | null;
}

interface FetchQueryProps<R, Q = {}> extends AppOnlyStoreState {
    /** API endpoint path name */
    apiEndpoint: string;
    /** Object representing query string to be appended to GET request */
    queryObject: Q;
    /** Defaults to `0` - value `0` means never, `null` means always, number larger than 0 for specific time in ms */
    dataExpiresInMiliseconds?: number | null;
    /** Defaults to `300` - every retry will be delayed by this value × retry attempt */
    retryIncrementallyAfterMiliseconds?: number;
    /** Defaults to `5` - maximum amount of times automatic data fetch retry will be attempted */
    retryAttemptsLimit?: number;
    children(props: FetchQueryChildrenProps<R>): JSX.Element;
}

enum FetchQueryStatus {
    Loading,
    Error,
    Success,
}

interface FetchQuerySummary {
    status: FetchQueryStatus;
    retriesCount: number;
}

interface FetchQuerySummaries {
    [cacheKey: string]: FetchQuerySummary;
}

@inject('store')
@observer
export class FetchQuery<R, Q = {}> extends React.Component<FetchQueryProps<R, Q>, {}> {
    @observable private queryStatus: FetchQuerySummaries = {};
    @observable private dataCacheKey: string = '';

    @observable private retryIncrementallyAfterMiliseconds: number = 0;
    @observable private retryAttemptsLimit: number = 0;

    @computed
    private get data(): R | null {
        const key = this.dataCacheKey;
        if (this.props.store && key && get(this.props.store.fetch.cachedQueries, key)) {
            const cache = get(this.props.store.fetch.cachedQueries, key);
            return (cache.data as unknown) as R;
        }

        return null;
    }

    constructor(props: FetchQueryProps<R, Q>) {
        super(props);

        this.retryIncrementallyAfterMiliseconds =
            typeof this.props.retryIncrementallyAfterMiliseconds !== 'undefined'
                ? this.props.retryIncrementallyAfterMiliseconds
                : 300;

        this.retryAttemptsLimit =
            typeof this.props.retryAttemptsLimit !== 'undefined' ? this.props.retryAttemptsLimit : 5;

        reaction(
            () => this.props.retryIncrementallyAfterMiliseconds,
            ms => (this.retryIncrementallyAfterMiliseconds = ms || 0)
        );
        reaction(() => this.props.retryAttemptsLimit, num => (this.retryAttemptsLimit = num || 0));
    }

    componentDidMount() {
        if (this.props.apiEndpoint) {
            this.fetchData(this.props.apiEndpoint, this.props.queryObject);
        }
    }

    componentWillReceiveProps(nextProps: FetchQueryProps<R, Q>) {
        if (
            this.props.apiEndpoint !== nextProps.apiEndpoint ||
            !_isEqual(this.props.queryObject, nextProps.queryObject)
        ) {
            this.fetchData(nextProps.apiEndpoint, nextProps.queryObject);
        }
    }

    render() {
        const key = this.dataCacheKey;
        const querySummary: FetchQuerySummary = has(this.queryStatus, key)
            ? toJS(get(this.queryStatus, key))
            : {
                  status: FetchQueryStatus.Loading,
                  retriesCount: 0,
              };

        return this.props.children({
            loading: querySummary.status === FetchQueryStatus.Loading,
            fetchError: querySummary.status === FetchQueryStatus.Error,
            retry: this.retryFetch,
            response: this.data,
        });
    }

    fetchData = async (apiEndpoint: string, queryObject: Q): Promise<boolean> => {
        try {
            // Do not request if API endpoint is not defined
            if (!apiEndpoint) {
                return false;
            }

            // Create cacheKey
            const cacheKey = FetchActions.createCacheKey(apiEndpoint, (queryObject as unknown) as object);
            this.dataCacheKey = cacheKey;

            // Check if current cache is fresh enough to not fetch new data
            if (this.props.store && get(this.props.store.fetch.cachedQueries, cacheKey)) {
                const cache = toJS(get(this.props.store.fetch.cachedQueries, cacheKey)) as FetchData;
                const now = Date.now();

                if (now <= cache.expiresAtTimeStamp) {
                    return true;
                }
            }

            // Indicate loading status and increment retry attemp
            if (has(this.queryStatus, cacheKey)) {
                this.queryStatus[cacheKey].status = FetchQueryStatus.Loading;
                this.queryStatus[cacheKey].retriesCount++;
            } else {
                extendObservable(this.queryStatus, {
                    [cacheKey]: {
                        status: FetchQueryStatus.Loading,
                        retriesCount: 1,
                    },
                });
            }

            // Get summary
            const summary = get(this.queryStatus, cacheKey) as FetchQuerySummary;

            // Set next data expiration
            const dataExpiration: number | null | undefined =
                this.props.dataExpiresInMiliseconds === null || typeof this.props.dataExpiresInMiliseconds === 'number'
                    ? this.props.dataExpiresInMiliseconds
                    : undefined;

            // Set retries information
            const { retriesCount } = summary;

            // Wait till incremental retry delay is done
            if (retriesCount > 1 && this.retryIncrementallyAfterMiliseconds > 0) {
                await AsyncHandler.timeout((retriesCount - 1) * this.retryIncrementallyAfterMiliseconds);
            }

            // Fetch actual data from server
            const response = await API.getData(apiEndpoint, queryObject || {}, false, true);
            FetchActions.setQueryCache(cacheKey, response, dataExpiration);

            // Indicate success and reset retry attempts counter
            this.queryStatus[cacheKey].status = FetchQueryStatus.Success;
            this.queryStatus[cacheKey].retriesCount = 0;

            return true;
        } catch (error) {
            const cacheKey = FetchActions.createCacheKey(apiEndpoint, (queryObject as unknown) as object);

            // Retry data fetch if attempts limit hasn't been crossed
            if (this.retryAttemptsLimit > 0 && this.queryStatus[cacheKey].retriesCount <= this.retryAttemptsLimit) {
                this.fetchData(apiEndpoint, queryObject);
                throw error;
            }

            this.queryStatus[cacheKey].status = FetchQueryStatus.Error;
            throw error;
        }
    };

    retryFetch = () => {
        const cacheKey = this.dataCacheKey;

        this.queryStatus[cacheKey].retriesCount = 0;
        this.fetchData(this.props.apiEndpoint, this.props.queryObject);
    };
}
