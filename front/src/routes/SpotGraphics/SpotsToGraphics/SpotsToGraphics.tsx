import { HeaderActions } from 'actions';
import { APIPath, FetchQuery } from 'fetch';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { SpotGraphicsApiQueryParams, SpotGraphicsApiResponse } from 'types/spotsToGraphics';
import { SpotsToGrapnicsFilters, SpotToGraphicsProducerOption } from './SpotsToGraphicsFilters';
// import { truncate } from 'fs';

// const s = require('./SpotsToGraphics.scss');

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

    formatSpotsList = (data: any) => {
        let arr: any[] = [];
        data.forEach((project, i) => {
            project.campaign.forEach((elem, j) => {
                let spot = {
                    projectName: project.projectName,
                    studioName: project.studioName,
                    projectId: project.projectId,
                    studioId: project.studioId,
                    ...elem,
                };
                arr.push(spot);
            });
        });
        return {
            spots: arr,
            len: arr.length,
        };
    }
    getPermissionId = () => {
        let permissionId: number | null = null;
        if (this.props.store && 
            this.props.store.user.data && 
            this.props.store.user.data.moduleAccess) {
            const moduleAccessArray = this.props.store.user.data.moduleAccess.find(elem => elem.moduleName === 'Spot Sent');
            if (moduleAccessArray && moduleAccessArray.subModule && moduleAccessArray.subModule.length > 0) {
                const moduleAccessItem = moduleAccessArray.subModule.find(elem => elem.subModuleName === 'Graphics for Spot');
                if (moduleAccessItem && moduleAccessItem.canAccess === true) {
                    permissionId = moduleAccessItem.id;
                }
            }
        }
        return permissionId;
    }

    updateComponent = () => {
        this.forceUpdate();
    }

    public render() {
        return (
            <FetchQuery<SpotGraphicsApiResponse, SpotGraphicsApiQueryParams>
                dataExpiresInMiliseconds={this.DATA_REFRESH_RATE_IN_MS}
                apiEndpoint={APIPath.SPOTS_TO_GRAPHICS}
                queryObject={{
                    sub_module_id: this.getPermissionId(),
                }}
                withoutCaching={true}
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
                                    ? this.formatSpotsList(spotsToGraphicsFromApi.response.data).len
                                    : 0
                            }
                            spotsResponse={
                                spotsToGraphicsFromApi.response && spotsToGraphicsFromApi.response.data
                                    ? this.formatSpotsList(spotsToGraphicsFromApi.response.data).spots
                                    : []
                            }
                            routeType="graphics"
                            forceUpdating={this.updateComponent}
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
    };

    // private openNewBill = () => {
    // };
}

export default SpotsToGraphics;
