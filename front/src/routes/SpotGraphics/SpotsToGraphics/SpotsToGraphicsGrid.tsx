import * as classNames from 'classnames';
import { Tag } from 'components/Content';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Card } from 'components/Section';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
// import { SpotToGraphicsFromApi, SpotToGraphicsProducer } from 'types/spotsToGraphics';
// import { SpotProjectCampaignGroup } from './SpotsToGraphics';

const s = require('./SpotsToGraphicsGrid.css');

interface SpotsToGraphicsGridProps {
    loading: boolean;
    fetchError: boolean;
    retryFetch: () => void;
    onSpotSelectionToggle: (spotId: number, projectCampaignId: number) => void;
    spots: {
        list: any[];
        count: number;
    };
    producerId: number | null;
}

// interface ProjectCampaignCard {
//     projectName: string;
//     studioName: string;
//     campaingnName: string;
//     customerName: string;
//     spots: {
//         id: number;
//         name: string;
//         date: string;
//         runtime: string;
//         status: string;
//     }[];
// }

@observer
export class SpotsToGraphicsGrid extends React.Component<SpotsToGraphicsGridProps, {}> {
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
                                            <p>Date spot sent</p>    
                                            <p>Spot name</p>    
                                            <p>Status</p>    
                                        </div>
                                    )}
                                    {projectCampaign.spots.map(spot => {
                                        return (
                                                <div key={spot.spotId} className={s.spotTable__row}>
                                                    <div className={s.spotDate}>
                                                        {spot.date}
                                                    </div>
                                                    <div className={s.spotItem}>
                                                        <Tag
                                                            key={spot.spotId}
                                                            className={classNames(s.tag )}
                                                            titleClassName={s.tagTitle}
                                                            onTagClick={this.handleSpotSelectionToggle(
                                                                
                                                            )}
                                                            title={`${spot.spotName} ${spot.runtime}`}
                                                        />
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

    private handleSpotSelectionToggle = () => e => {
        // this.props.onSpotSelectionToggle(spotId, projectCampaignId);

    };
}
