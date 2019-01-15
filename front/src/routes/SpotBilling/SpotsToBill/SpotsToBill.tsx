import { HeaderActions } from 'actions';
import { history } from 'App';
import { ButtonAdd } from 'components/Button';
import { BottomBar } from 'components/Layout';
import { APIPath, FetchQuery } from 'fetch';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { SpotBillingApiQueryParams, SpotBillingApiResponse } from 'types/spotsToBill';
import { SpotsToBillFilters, SpotToBillProducerOption } from './SpotsToBillFilters';

const s = require('./SpotsToBill.css');

interface SpotsToBillPageProps extends AppState {}

export interface SpotProjectCampaignGroup {
    spotId: number;
    projectCampaignId: number;
}

@inject('store')
@observer
class SpotsToBillPage extends React.Component<SpotsToBillPageProps, {}> {
    private DATA_REFRESH_RATE_IN_MS: number = 1000 * 60;

    @observable private search: string = '';
    @observable private producer: SpotToBillProducerOption | null = null;
    @observable private selectedSpots: SpotProjectCampaignGroup[] = [];

    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Spots ready for billing',
        });
    }

    public render() {
        return (
            <FetchQuery<SpotBillingApiResponse, SpotBillingApiQueryParams>
                dataExpiresInMiliseconds={this.DATA_REFRESH_RATE_IN_MS}
                getQueries={[
                    {
                        apiEndpoint: APIPath.SPOTS_TO_BILL,
                        queryObject: {
                            offset: 0,
                            length: 999999999,
                        },
                    },
                ]}
            >
                {([spotsToBillFromApi]) => (
                    <React.Fragment>
                        <SpotsToBillFilters
                            onChangeSearch={this.changeSearch}
                            onChangeProducer={this.changeProducer}
                            onSpotSelectionToggle={this.toggleSpotSelection}
                            selectedSpots={this.selectedSpots}
                            search={this.search}
                            producer={this.producer}
                            loading={spotsToBillFromApi.loading}
                            fetchError={spotsToBillFromApi.fetchError}
                            retryFetch={spotsToBillFromApi.retry}
                            totalCountResponse={
                                spotsToBillFromApi.response && spotsToBillFromApi.response.total_count
                                    ? spotsToBillFromApi.response.total_count
                                    : 0
                            }
                            spotsResponse={
                                spotsToBillFromApi.response && spotsToBillFromApi.response.data
                                    ? spotsToBillFromApi.response.data
                                    : []
                            }
                        />

                        <BottomBar show={this.selectedSpots.length > 0}>
                            <div className={s.actions}>
                                <p>Only spots from a single campaign can be selected</p>
                                <ButtonAdd onClick={this.openNewBill} label="Bill selected spots" />
                            </div>
                        </BottomBar>
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
    private changeProducer = (producer: SpotToBillProducerOption | null) => {
        this.producer = producer;
    };

    @action
    private toggleSpotSelection = (spotId: number, projectCampaignId: number) => {
        const index = this.selectedSpots.findIndex(group => group.spotId === spotId);
        if (index === -1) {
            this.selectedSpots = this.selectedSpots.filter(group => group.projectCampaignId === projectCampaignId);
            this.selectedSpots.push({ spotId, projectCampaignId });
        } else {
            this.selectedSpots = [...this.selectedSpots.slice(0, index), ...this.selectedSpots.slice(index + 1)];
        }
    };

    private openNewBill = () => {
        // TODO
        history.push('/portal/bill-spot-form/1');
    };
}

export default SpotsToBillPage;
