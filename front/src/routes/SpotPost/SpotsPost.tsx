import { HeaderActions } from 'actions';
import { APIPath, FetchQuery } from 'fetch';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { SpotGraphicsApiQueryParams } from 'types/spotsToGraphics';
import './SpotsPost.css';
import { SpotsPostFilter } from './SpotsPostFilter';

export interface SpotsPostPorps {}

@inject('store')
@observer
class SpotsPost extends React.Component<SpotsPostPorps, {}> {
    @observable private search: string = '';

    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Spot post / finish request',
            isLayoutWide: true,
        });
    }

    render() {
        return (
            <FetchQuery<any, SpotGraphicsApiQueryParams>
                dataExpiresInMiliseconds={null}
                getQueries={[
                    {
                        apiEndpoint: APIPath.SPOTS_POST,
                        queryObject: undefined,
                    },
                ]}
            >
                {([spotsFromApi]) => (
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
    };

    @action
    private changeSearch = (search: string) => {
        this.search = search;
    };
}

export default SpotsPost;
