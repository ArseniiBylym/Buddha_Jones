import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderActions, SpotSentActions } from 'actions';
import { ButtonAdd, ButtonEdit } from 'components/Button';
import { history } from 'App';
import { computed, action, observable } from 'mobx';
import { SpotSentStore } from '../../../../store/AllStores';
import { Col, Row, Section } from '../../../../components/Section';
import { LoadingSpinner } from '../../../../components/Loaders';
import { Table, TableCell, TableRow } from '../../../../components/Table';
import { Paragraph } from '../../../../components/Content';
import { SpotSentAllSpotsSentSpotData } from '../../../../types/spotSent';
import { Checkmark } from '../../../../components/Form';
import * as dateFormat from 'date-fns/format';
import { APIPath, FetchQuery } from 'fetch';
import { SpotGraphicsApiQueryParams, SpotGraphicsApiResponse } from 'types/spotsToGraphics';
import { SpotsToGrapnicsFilters, SpotToGraphicsProducerOption } from '../../../SpotGraphics/SpotsToGraphics/SpotsToGraphicsFilters';

// Styles
require('./ProducerSpotSentList.css');

// Props
interface ProducerSpotSentListProps {
    
}

// Component
@inject('store')
@observer
class ProducerSpotSentList extends React.Component<any, {}> {
    private DATA_REFRESH_RATE_IN_MS: number = 1000 * 60;

    @observable private search: string = '';
    @observable private producer: SpotToGraphicsProducerOption | null = null;

    @computed
    private get essentialDataIsLoading(): boolean {
        return SpotSentStore.spotSentAllSpotsLoading;
    }

    public componentDidMount() {
        console.log('hello');
        this.fetchAllSpotSent();
        HeaderActions.setMainHeaderTitlesAndElements('Spots sent request', null, null, null, [
            <ButtonAdd
                key="create-spot-sent"
                onClick={this.handleCreateSpotSentCreate}
                label="Create new spot sent request"
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
        console.log(permissionId);
        return permissionId;
    }

    public render() {
        return this.essentialDataIsLoading === true ? (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        ) : (SpotSentStore.spotSentAllSpots && SpotSentStore.spotSentAllSpots.length > 0) ? (
            // <Section
            //     noSeparator={true}
            //     title="Spots sent"
            // >
            //     {this.getTableWithData()}
            // </Section>
        <FetchQuery<SpotGraphicsApiResponse, SpotGraphicsApiQueryParams>
            dataExpiresInMiliseconds={this.DATA_REFRESH_RATE_IN_MS}
            apiEndpoint={APIPath.SPOTS_TO_GRAPHICS}
            queryObject={{
                sub_module_id: this.getPermissionId(),
                // sub_module_id: 1,
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

    private getTableWithData(): JSX.Element {
        if (SpotSentStore.spotSentAllSpots && SpotSentStore.spotSentAllSpots.length > 0) {
            let tableHeaders: Array<{
                title: string;
                align?: 'left' | 'center' | 'right';
            }> = [];
            let spotTitles: string[] = Object.keys(SpotSentStore.spotSentAllSpots[0]);
            spotTitles.map((objectKey: string, ind: number) => {
                tableHeaders.push({
                    title: (SpotSentStore.spotSentAllSpots) ? SpotSentStore.spotSentAllSpots[0][objectKey].title : 'N/A',
                    align: (ind === 0) ? 'left' : (ind === (spotTitles.length - 1)) ? 'right' : 'center'
                });
            });
            let tableRowsArr: JSX.Element[] = SpotSentStore.spotSentAllSpots.map((spot: SpotSentAllSpotsSentSpotData, index: number) => {
                let tableCellsArr: JSX.Element[] = Object.keys(spot).map((objectKey: string, ind: number) => {
                    let checkMark: JSX.Element = (
                        <Checkmark
                            checked={(spot[objectKey].name === 1) ? true : false}
                            type={'no-icon'}
                        />
                    );
                    let editBlock: JSX.Element = (
                        <ButtonEdit
                            onClick={this.handleSpotSentDetails.bind(this, parseInt(spot[objectKey].name, 0))}
                            label="Edit"
                            labelOnLeft={false}
                        />
                    );
                    return (
                        <TableCell
                            key={`${objectKey}-${ind}`}
                            align={(ind === 0) ? 'left' : 'center'}
                        >
                            {objectKey === 'finishRequest' ? (
                                checkMark
                            ) : objectKey === 'changed' ? (
                                dateFormat(spot[objectKey].name, 'MM/DD/YY hh:ss')
                            ) : objectKey === 'edit' ? (
                                editBlock
                            ) : (
                                spot[objectKey].name
                            )}
                        </TableCell>
                    );
                });
                return (
                    <TableRow key={`spot-${index}`}>
                        {tableCellsArr}
                    </TableRow>
                );
            });
            return (
                <Table
                    header={tableHeaders}
                    columnsWidths={['15%', '15%', '15%', '10%', '10%', '15%', '15%', '5%']}
                >
                    {tableRowsArr}
                </Table>
            );
        } else {
            return (
                <></>
            );
        }
    }

    private handleCreateSpotSentCreate = (): void => {
        history.push('/portal/studio/producer-spot-sent-details/create');
    };

    private handleSpotSentDetails = (id: number): void => {
        history.push('/portal/studio/producer-spot-sent-details/' + id);
    };

}

export default ProducerSpotSentList;
