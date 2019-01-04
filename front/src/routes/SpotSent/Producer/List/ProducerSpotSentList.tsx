import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderActions, SpotSentActions } from 'actions';
import { ButtonAdd } from 'components/Button';
import { history } from 'App';
// import { AppStoreState, SpotSentStore } from '../../../../store/AllStores';
import { Col, Row } from '../../../../components/Section';
import { LoadingSpinner } from '../../../../components/Loaders';
import { Paragraph } from '../../../../components/Content';
// import { SpotSentAllSpotsSentSpotData } from '../../../../types/spotSent';
// import { Checkmark } from '../../../../components/Form';
// import * as dateFormat from 'date-fns/format';
import {  action, observable } from 'mobx';
import { APIPath, FetchQuery } from 'fetch';
import { SpotGraphicsApiQueryParams, SpotGraphicsApiResponse } from 'types/spotsToGraphics';
import { SpotsToGrapnicsFilters } from '../../../SpotGraphics/SpotsToGraphics/SpotsToGraphicsFilters';

// Styles
require('./ProducerSpotSentList.css');

// Props
// interface ProducerSpotSentListProps {
//     store: AppStoreState;
// }

// Component
@inject('store')
@observer
class ProducerSpotSentList extends React.Component<any, {}> {

    private DATA_REFRESH_RATE_IN_MS: number = 1000 * 60;

    @observable private search: string = '';

    private get essentialDataIsLoading(): boolean {
        // if (!this.props.store || !this.props.store.spotSent) {
        //     return true;
        // }
        return this.props.store.spotSent.spotSentAllSpotsLoading;
    }

    public componentDidMount() {
        this.fetchAllSpotSent();
        HeaderActions.setMainHeaderTitlesAndElements('Spots sent request', null, null, null, [
            <ButtonAdd
                key="create-spot-sent"
                onClick={this.handleCreateSpotSentCreate}
                label="Create new spot sent report"
                labelOnLeft={true}
                isWhite={true}
            />,
        ]);
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
                const moduleAccessItem = moduleAccessArray.subModule.find(elem => elem.subModuleName === 'Initiate Spot Sent');
                if (moduleAccessItem && moduleAccessItem.canAccess === true) {
                    permissionId = moduleAccessItem.id;
                }
            }
        }
        return permissionId;
    }

    public render() {
        return this.essentialDataIsLoading === true ? (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        ) : (this.props.store.spotSent.spotSentAllSpots && this.props.store.spotSent.spotSentAllSpots.length > 0) ? (
            <FetchQuery<SpotGraphicsApiResponse, SpotGraphicsApiQueryParams>
                dataExpiresInMiliseconds={this.DATA_REFRESH_RATE_IN_MS}
                apiEndpoint={APIPath.SPOTS_TO_GRAPHICS}
                queryObject={{
                    sub_module_id: this.getPermissionId(),
                }}
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
                            routeType="sent"
                        />
                    </React.Fragment>
                )}
            </FetchQuery>
        ) : (
            <Paragraph type="dim">No spots sent exist yet.</Paragraph>
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

    private handleCreateSpotSentCreate = (): void => {
        history.push('/portal/studio/producer-spot-sent-details/create');
    };

    // private handleSpotSentDetails = (id: number): void => {
    //     history.push('/portal/studio/producer-spot-sent-details/' + id);
    // };

}

export default ProducerSpotSentList;
