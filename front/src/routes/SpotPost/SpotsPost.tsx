import { HeaderActions } from 'actions';
import { APIPath, FetchQuery } from 'fetch';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { SpotGraphicsApiQueryParams } from 'types/spotsToGraphics';
import { SpotsPostFilter } from './SpotsPostFilter';
import './SpotsPost.css';

export interface SpotsPostPorps {

}

@inject('store')
@observer
class SpotsPost extends React.Component<SpotsPostPorps, {}> {
    private DATA_REFRESH_RATE_IN_MS: number = 1000 * 60;

    @observable private search: string = '';

    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Spot post / finish request',
        });
    }

    render() {
        return (
            <FetchQuery<any, SpotGraphicsApiQueryParams>
                dataExpiresInMiliseconds={this.DATA_REFRESH_RATE_IN_MS}
                apiEndpoint={APIPath.SPOTS_POST}
                queryObject={{
                    // sub_module_id: this.getPermissionId(),
                }}
                withoutCaching={true}
            >
            {spotsFromApi => (
                <React.Fragment>
                    <SpotsPostFilter
                        onChangeSearch={this.changeSearch}
                        search={this.search}
                        loading={spotsFromApi.loading}
                        fetchError={spotsFromApi.fetchError}
                        retryFetch={spotsFromApi.retry}
                        spots={spotsFromApi.response}
                        routeType="spotSent"
                        forceUpdating={this.updateComponent}
                    />
                </React.Fragment>
            )}
            </FetchQuery>
        );
    }

    updateComponent = () => {
        this.forceUpdate();
    }

    @action
    private changeSearch = (search: string) => {
        this.search = search;
    };
}

export default SpotsPost;