import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderActions, SpotSentActions } from 'actions';
import { computed, action, observable } from 'mobx';
import { SpotSentStore } from '../../../store/AllStores';
import { Col, Row } from '../../../components/Section';
import { LoadingSpinner } from '../../../components/Loaders';
import { Paragraph } from '../../../components/Content';
import { APIPath, FetchQuery } from 'fetch';
import { SpotGraphicsApiQueryParams, SpotGraphicsApiResponse } from 'types/spotsToGraphics';
import { SpotsToGrapnicsFilters } from '../../SpotGraphics/SpotsToGraphics/SpotsToGraphicsFilters';

// Styles
// const s = require('./SpotsToEDL.css');

// Component
@inject('store')
@observer
class SpotsToEDL extends React.Component<any, {}> {
    private DATA_REFRESH_RATE_IN_MS: number = 1000 * 60;

    @observable private search: string = '';

    @computed
    private get essentialDataIsLoading(): boolean {
        return SpotSentStore.spotSentAllSpotsLoading;
    }

    public componentDidMount() {
        this.fetchAllSpotSent();
        HeaderActions.replaceMainHeaderContent({
            title: 'Spots waiting for EDL',
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
                const moduleAccessItem = moduleAccessArray.subModule.find(elem => elem.subModuleName === 'EDL for Spot');
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
        return this.essentialDataIsLoading === true ? (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        ) : (SpotSentStore.spotSentAllSpots && SpotSentStore.spotSentAllSpots.length > 0) ? (
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
                        search={this.search}
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
                        routeType="edl"
                        forceUpdating={this.updateComponent}
                    />
                </React.Fragment>
            )}
        </FetchQuery>
        ) : (
            <Paragraph type="dim">No spots waiting for EDL exist yet.</Paragraph>
        );
    }

    @action
    private changeSearch = (search: string) => {
        this.search = search;
    };

    private fetchAllSpotSent(): void {
        SpotSentActions.fetchAllSpots(true);
    }

    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64}/>
                </Col>
            </Row>
        );
    }
}

export default SpotsToEDL;