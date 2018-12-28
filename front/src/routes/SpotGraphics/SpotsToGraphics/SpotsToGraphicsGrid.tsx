import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Card } from 'components/Section';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import * as React from 'react';
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
           let obj: {campaignName: string, customerName: string, projectName: string, studioName: string, spots?: any[]} = {
                campaignName: item.campaignName,
                customerName: item.customerName,
                projectName: item.projectName,
                studioName: item.studioName,
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
                    graphicsStatus: spot.graphicsStatus,
                    versionName: spot.versionName,
                    spotSentId: spot.spotSentId
               };
               spots.push(spotItem);
           });
           obj.spots = spots;
           cardsList.push(obj);
        });
    }
        return cardsList;
    }

    public render() {
        const { fetchError, loading, retryFetch } = this.props;

        if (fetchError) {
            return <DataFetchError errorLabel="Could not load spots" onRefetch={retryFetch} />;
        }

        if (loading && this.props.spots.count <= 0) {
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
                                    <h3>{projectCampaign.projectName}</h3>
                                    <h4>
                                        {projectCampaign.campaignName}
                                    </h4>
                                </div>

                                <div className={s.spots}>
                                    {projectCampaign.spots && projectCampaign.spots.length > 0 && (
                                        <div className={s.spots__header}>
                                            <p>Sent dt.</p>    
                                            <p>Spot name</p>   
                                            <p>Ver.</p>   
                                            <p>Status</p>    
                                        </div>
                                    )}
                                    {projectCampaign.spots.map(spot => {
                                        return (
                                                <div key={spot.spotId} onClick={this.handleSpotSelectionToggle(spot)} className={s.spotTable__row}>
                                                    <div className={s.spotDate}>
                                                        {spot.date && moment(spot.date).format('DD/MM/YYYY')}
                                                    </div>
                                                    <div className={s.spotItem}>
                                                        {spot.spotName}{spot.runtime && ` (${spot.runtime})`}
                                                    </div>
                                                    <div className={s.spotStatus}>
                                                        {spot.versionName}
                                                    </div>
                                                    <div className={s.spotStatus}>
                                                        {spot.graphicsStatus}
                                                    </div>
                                                </div>
                                        );
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

    private handleSpotSelectionToggle = (spot) => e => {
        this.props.store.spotToGraphics.getSpotFromApi(spot.spotSentId);
        this.props.store.spotToGraphics.setCurrentSpot(spot);
        this.props.store.spotToGraphics.toggleModal();
    };
}
