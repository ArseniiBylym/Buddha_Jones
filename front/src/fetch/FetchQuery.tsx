import { FetchActions } from 'actions';
import _isEqual from 'lodash-es/isEqual';
import { computed, get } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { FetchQueryStatus } from 'store';
import { AppOnlyStoreState } from 'store/AllStores';
import { FetchData } from 'types/fetch';

export interface FetchQueryChildrenProps<R> {
    loading: boolean;
    fetchError: boolean;
    retry: () => void;
    response: R | null;
}

interface FetchQueryData<Q = {}> {
    /** API endpoint path name */
    apiEndpoint: string;
    /** Object representing query string to be appended to GET request */
    queryObject?: Q | undefined;
}

/** To skip caching set `dataExpiresInMiliseconds` to `null` */
interface FetchQueryProps<R, Q = {}> extends AppOnlyStoreState {
    /** Single or multiple queries to fetch data from */
    getQueries: FetchQueryData<Q>[];
    /** Ignore fetching data */
    skipFetching?: boolean;
    /** Do not automatically refresh data when it expires */
    skipRefreshingExpiredData?: boolean;
    /** Defaults to `0` - value `0` means never, `null` means always, number larger than 0 for specific time in ms */
    dataExpiresInMiliseconds?: number | null;
    /** Defaults to `300` - every retry will be delayed by this value × retry attempt */
    retryIncrementallyAfterMiliseconds?: number;
    /** Defaults to `5` - maximum amount of times automatic data fetch retry will be attempted */
    retryAttemptsLimit?: number;
    /** Render props return */
    children(props: FetchQueryChildrenProps<R>[]): JSX.Element;
}

@inject('store')
@observer
export class FetchQuery<R, Q = {}> extends React.Component<FetchQueryProps<R, Q>, {}> {
    static get defaultProps(): Partial<FetchQueryProps<{}>> {
        return {
            getQueries: [],
            skipFetching: false,
            skipRefreshingExpiredData: false,
            dataExpiresInMiliseconds: 0,
            retryIncrementallyAfterMiliseconds: 300,
            retryAttemptsLimit: 5,
        };
    }

    private timers: { [cacheKey: string]: NodeJS.Timer } = {};

    @computed
    private get data(): Array<FetchData<R> | null> {
        return this.props.getQueries.map(query => {
            const cacheKey = FetchActions.constructCacheKey(query.apiEndpoint, query.queryObject as object | undefined);

            if (this.props.store && cacheKey && get(this.props.store.fetch.cachedQueries, cacheKey)) {
                return get(this.props.store.fetch.cachedQueries, cacheKey) as FetchData<R>;
            }

            return null;
        });
    }

    componentDidMount() {
        // When queries are defined
        if (this.props.getQueries && this.props.getQueries.some(query => (query.apiEndpoint ? true : false))) {
            this.props.getQueries.forEach((query, index) => {
                FetchActions.initializeCacheKey(query.apiEndpoint, query.queryObject as object | undefined);
                this.fetchData(query.apiEndpoint, query.queryObject);
            });
        }
    }

    componentWillReceiveProps(nextProps: FetchQueryProps<R, Q>) {
        // When queries change, attempt loading new data
        if (!_isEqual(this.props.getQueries, nextProps.getQueries)) {
            nextProps.getQueries.forEach((query, index) => {
                if (
                    typeof this.props.getQueries[index] === 'undefined' ||
                    (typeof this.props.getQueries[index] !== 'undefined' &&
                        !_isEqual(this.props.getQueries[index], query))
                ) {
                    FetchActions.initializeCacheKey(query.apiEndpoint, query.queryObject as object | undefined);
                    this.fetchData(query.apiEndpoint, query.queryObject);
                }
            });
        }
    }

    componentWillUnmount() {
        // Remove any refresh expiring data timers when component unmounts
        Object.keys(this.timers).map(timerKey => {
            if (this.timers[timerKey]) {
                clearTimeout(this.timers[timerKey]);
            }
        });
    }

    render() {
        if (this.data === null) {
            return this.props.children(
                this.props.getQueries.map(query => ({
                    loading: true,
                    fetchError: false,
                    retry: () => false,
                    response: null,
                }))
            );
        }

        return this.props.children(
            this.data.map((data, index) => {
                return {
                    loading: data ? data.status === FetchQueryStatus.Loading : true,
                    fetchError: data ? data.status === FetchQueryStatus.Error : false,
                    retry: () =>
                        this.fetchData(
                            this.props.getQueries[index].apiEndpoint,
                            this.props.getQueries[index].queryObject
                        ),
                    response: data ? data.data : null,
                };
            })
        );
    }

    fetchData = async (apiEndpoint: string, queryObject: Q | undefined): Promise<boolean> => {
        try {
            // Construct cache key
            const cacheKey = FetchActions.constructCacheKey(apiEndpoint, queryObject as object | undefined);

            // Do not request if API endpoint is not defined
            if (!apiEndpoint || this.props.skipFetching) {
                return false;
            }

            // Clear previous refresh timer
            if (this.timers[cacheKey]) {
                clearTimeout(this.timers[cacheKey]);
            }

            // Fetch data
            await FetchActions.fetchDataFromApi(
                apiEndpoint,
                queryObject as object | undefined,
                this.props.dataExpiresInMiliseconds,
                this.props.retryIncrementallyAfterMiliseconds,
                this.props.retryAttemptsLimit
            );

            // Set next refresh timer
            if (!this.props.skipRefreshingExpiredData && typeof this.props.dataExpiresInMiliseconds === 'number') {
                this.timers[cacheKey] = setTimeout(() => {
                    this.fetchData(apiEndpoint, queryObject);
                }, this.props.dataExpiresInMiliseconds);
            }

            return true;
        } catch (error) {
            throw error;
        }
    };
}
