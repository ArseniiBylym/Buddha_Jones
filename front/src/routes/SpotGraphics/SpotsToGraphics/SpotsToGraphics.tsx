import { HeaderActions } from 'actions';
import { APIPath, FetchQuery } from 'fetch';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { SpotGraphicsApiQueryParams, SpotGraphicsApiResponse } from 'types/spotsToGraphics';
import { SpotsToGrapnicsFilters, SpotToGraphicsProducerOption } from './SpotsToGraphicsFilters';

const s = require('./SpotsToGraphics.scss');

interface SpotsToGraphicsProps extends AppState {}

export interface SpotProjectCampaignGroup {
    spotId: number;
    projectCampaignId: number;
}

@inject('store')
@observer
class SpotsToGraphics extends React.Component<SpotsToGraphicsProps, {}> {
    private DATA_REFRESH_RATE_IN_MS: number = 1000 * 60;

    @observable private search: string = '';
    @observable private producer: SpotToGraphicsProducerOption | null = null;

    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Spots ready for graphics',
        });
    }

    public render() {
        return (
            <FetchQuery<SpotGraphicsApiResponse, SpotGraphicsApiQueryParams>
                dataExpiresInMiliseconds={this.DATA_REFRESH_RATE_IN_MS}
                apiEndpoint={APIPath.SPOTS_TO_GRAPHICS}
                queryObject={{
                    offset: 0,
                    length: 999999999,
                }}
            >
                {spotsToGraphicsFromApi => (
                    <React.Fragment>
                        <SpotsToGrapnicsFilters
                            onChangeSearch={this.changeSearch}
                            onChangeProducer={this.changeProducer}
                            onSpotSelectionToggle={this.toggleSpotSelection}
                            search={this.search}
                            producer={this.producer}
                            loading={spotsToGraphicsFromApi.loading}
                            fetchError={spotsToGraphicsFromApi.fetchError}
                            retryFetch={spotsToGraphicsFromApi.retry}
                            totalCountResponse={
                                spotsToGraphicsFromApi.response && spotsToGraphicsFromApi.response.data.length
                                    ? spotsToGraphicsFromApi.response.data[0].campaign.length
                                    : 0
                            }
                            spotsResponse={
                                spotsToGraphicsFromApi.response && spotsToGraphicsFromApi.response.data
                                    ? spotsToGraphicsFromApi.response.data[0].campaign
                                    : []
                            }
                        />
                    </React.Fragment>
                )}
            </FetchQuery>
        );
    }

    @action
    private changeSearch = (search: string) => {
        this.search = search;
    };

    @action
    private changeProducer = (producer: SpotToGraphicsProducerOption | null) => {
        this.producer = producer;
    };

    @action
    private toggleSpotSelection = (spotId: number, projectCampaignId: number) => {
        // const index = this.selectedSpots.findIndex(group => group.spotId === spotId);
        // if (index === -1) {
        //     this.selectedSpots = this.selectedSpots.filter(group => group.projectCampaignId === projectCampaignId);
        //     this.selectedSpots.push({ spotId, projectCampaignId });
        // } else {
        //     this.selectedSpots = [...this.selectedSpots.slice(0, index), ...this.selectedSpots.slice(index + 1)];
        // }
        console.log(spotId);
    };

    private openNewBill = () => {
        // TODO
    };
}

export default SpotsToGraphics;
