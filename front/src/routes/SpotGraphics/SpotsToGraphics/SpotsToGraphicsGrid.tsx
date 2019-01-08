import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Card } from 'components/Section';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { history } from 'App';
import * as moment from 'moment';
import { SpotsToGraphicsModal } from './SpotsToGraphicsModal/SpotsToGraphicsModal';

const s = require('./SpotsToGraphicsGrid.css');

// interface SpotsToGraphicsGridProps {
//     loading: boolean;
//     fetchError: boolean;
//     retryFetch: () => void;
//     onSpotSelectionToggle: (spotId: number, projectCampaignId: number) => void;
//     spots: {
//         list: any[];
//         count: number;
//     };
//     producerId: number | null;
// }

@inject('store')
@observer
export class SpotsToGraphicsGrid extends React.Component<any, {}> {
    @computed
    private get projectCampaignCards(): any[] {
        let cardsList: any[] = [];
        if (this.props.spots) {

        this.props.spots.list.forEach((item, i) => {
           let obj: {campaignName: string, customerName: string, projectName: string, studioName: string, studioId: number, projectId: number, projectCampaignId: number, spots?: any[]} = {
                campaignName: item.campaignName,
                customerName: item.customerName,
                projectName: item.projectName,
                studioName: item.studioName,
                studioId: item.studioId,
                projectId: item.projectId,
                projectCampaignId: item.projectCampaignId
           };

           let spots: any[] = [];

           let newSpotList = item.spot.filter((elem, index) => {
               return !!elem.spotId;
           });
           newSpotList.forEach((spot, j) => {
               let spotItem = {
                    spotId: spot.spotId,
                    spotName: spot.spotName,
                    date: spot.spotSentDate && spot.spotSentDate.date || '',
                    runtime: spot.runtime,
                    spotLineStatus: spot.spotLineStatus,
                    versionName: spot.versionName,
                    spotSentId: spot.spotSentId,
                    spotSentRequestId: spot.spotSentRequestId,
                    finishRequest: spot.finishRequest,
                    graphicsStatus: spot.graphicsStatus,
               };
               spots.push(spotItem);
           });

           spots.sort((a: any, b: any): any => {
               if (a.spotName > b.spotName) {
                   return 1; 
               }
               if (a.spotName < b.spotName) {
                   return -1;
               }
               if (a.spotName === b.spotName) {
                    if (a.versionName > b.versionName) {
                        return 1;
                    }
                    if (a.versionName < b.versionName) {
                        return -1;
                    }
                    if (a.versionName === b.versionName) {
                        if (a.date > b.date) {
                            return 1;
                        }
                        if (a.date < b.date) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
               }
           });

           obj.spots = spots;
           cardsList.push(obj);
        });
    }
        return cardsList;
    }

    public render() {
        const { fetchError, loading, retryFetch } = this.props;
        const { spotToGraphics } = this.props.store;

        if (fetchError) {
            return <DataFetchError errorLabel="Could not load spots" onRefetch={retryFetch} />;
        }

        if (loading && this.props.spots.count <= 0 || spotToGraphics.pending) {
            return (
                <LoadingShade isStatic={true} contentCentered={true} background="transparent">
                    <LoadingSpinner />
                </LoadingShade>
            );
        }

        return (
            <div className={s.grid}>
                <SpotsToGraphicsModal />
                {this.projectCampaignCards.map((projectCampaign, i) => (
                    <Card
                        className={s.card}
                        key={i}
                        isExpandable={false}
                        noPadding={true}
                    >
                        <React.Fragment>
                            <div className={s.content}>
                                <div className={s.headline}>
                                    <h3 onClick={this.handleProjectClick(projectCampaign)}>{projectCampaign.projectName}</h3>
                                    <h4 onClick={this.handleCampaignClick(projectCampaign)}>
                                        {projectCampaign.campaignName}
                                    </h4>
                                </div>

                                <div className={s.spots}>
                                    {projectCampaign.spots && projectCampaign.spots.length > 0 && (
                                        <div className={s.spots__header}>
                                            <p>Sent dt.</p>    
                                            <p>Spot name</p>   
                                            {this.props.routeType === 'edl' ?  <p>Confirm</p> : null}
                                            {this.props.routeType !== 'edl' ? <p className={s.spots__header__ver}>Ver.</p> : null}
                                            {this.props.routeType !== 'edl' ?  <p className={s.spots__header__status}>Status</p> : null}
                                        </div>
                                    )}
                                    {projectCampaign.spots.map((spot, index) => {
                                        let styleName = s.spotTable__row;
                                        if (this.props.routeType === 'edl') {
                                            styleName = s.spotTable__row__hidden;
                                        }
                                            return (
                                                <div key={spot.spotId} onClick={this.handleSpotSelectionToggle(this.props.routeType, spot)} className={styleName}>
                                                <div className={s.spotDate}>
                                                {spot.date && moment(spot.date).format('DD/MM/YYYY')}
                                                </div>
                                                <div className={s.spotItem}>
                                                {spot.spotName}{spot.runtime && ` (${spot.runtime})`}
                                                {spot.finishRequest && this.props.routeType === 'sent' ? <span>FINISH</span> : null}
                                                </div>
                                                {this.props.routeType === 'edl' ? (
                                                    <div onClick={this.onEDLClickHandler(spot.spotSentId, index)} className={s.edlButton}>
                                                        EDL Exported
                                                    </div>
                                                ) : null}
                                                {this.props.routeType !== 'edl' ? (
                                                    <div className={s.spotVer}>
                                                {spot.versionName}
                                                </div>
                                                )  : null}
                                                {this.props.routeType !== 'edl' ? (
                                                    <div className={s.spotStatus}>
                                                        {this.props.routeType === 'graphics' ? spot.graphicsStatus : spot.spotLineStatus}
                                                    </div>
                                                )  : null}
                                                
                                                </div>
                                            );
                                        // }
                                    })}
                                </div>
                            </div>

                            <div className={s.summary}>
                                <p>
                                    <span>Studio </span>
                                    <strong>{projectCampaign.studioName}</strong>
                                </p>
                                <p>
                                    <span>Client </span>
                                    <strong>{projectCampaign.customerName}</strong>
                                </p>

                            </div>
                        </React.Fragment>
                    </Card>
                ))}
            </div>
        );
    }

    private handleProjectClick = (project) => e => {
        let path = '/portal/project/' +
            project.studioId + '/' +
            project.studioName + '/' +
            project.projectId + '/' +
            project.projectName + '/1';

        let win = window.open(path, '_blank');
        if ( win) {
            win.focus();
        }
    }

    private handleCampaignClick = (project) => e => {
        let path = '/portal/project/' +
            project.studioId + '/' +
            project.studioName + '/' +
            project.projectId + '/' +
            project.projectName + '/1' +
            '?projectCampaignId=' +
            project.projectCampaignId;

        let win = window.open(path, '_blank');
        if ( win) {
            win.focus();
        }
    }

    private onEDLClickHandler = (spotSentId, index) => e => {
        this.props.store.spotToGraphics.changeEDLApi(spotSentId, index);
    }

    private handleSpotSelectionToggle = (type, spot) => e => {
        switch (type) {
            case 'graphics': 
                this.props.store.spotToGraphics.getSpotFromApi(spot.spotSentId);
                break;
            case 'sent': 
                history.push('/portal/studio/producer-spot-sent-details/' + spot.spotSentRequestId);
                break;
            default: 
                return;
        }
    };
}
