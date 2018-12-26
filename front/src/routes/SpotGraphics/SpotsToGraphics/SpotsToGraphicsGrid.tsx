import * as classNames from 'classnames';
import { Tag } from 'components/Content';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Card } from 'components/Section';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
// import { SpotToGraphicsFromApi, SpotToGraphicsProducer } from 'types/spotsToGraphics';
import { SpotProjectCampaignGroup } from './SpotsToGraphics';

const s = require('./SpotsToGraphicsGrid.css');

interface SpotsToGraphicsGridProps {
    loading: boolean;
    fetchError: boolean;
    retryFetch: () => void;
    onSpotSelectionToggle: (spotId: number, projectCampaignId: number) => void;
    // selectedSpots: any[];
    spots: {
        list: any[];
        count: number;
    };
}

interface ProjectCampaignCard {
    projectName: string;
    studioName: string;
    campaingnName: string;
    customerName: string;
    spots: {
        id: number;
        name: string;
        date: string;
        runtime: string;
        status: string;
    }[];
}

@observer
export class SpotsToGraphicsGrid extends React.Component<SpotsToGraphicsGridProps, {}> {
    @computed
    private get projectCampaignCards(): any[] {
        let cardsList: any[] = [];
        if (this.props.spots) {


        this.props.spots.list.forEach((item, i) => {
            console.log(item);
           let obj: {campaignName: string, customerName: string, spots?: any[]} = {
                campaignName: item.campaignName,
                customerName: item.customerName,
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

        // return this.props.spots.list.reduce((cards: ProjectCampaignCard[], spot) => {
        //     let index = cards.findIndex(c => c.projectCampaignId === spot.projectCampaignId);
        //     if (index === -1) {
        //         index = cards.length;

        //         cards.push({
                  
        //             projectName: spot.projectName,
        //             studioId: spot.studioId,
        //             studioName: spot.studioName,
        //             // producers: spot.producers,
        //             spots: [],
        //         });
        //     }

        //     cards[index].spots.push({
        //         id: spot.spotId,
        //         name: spot.spotName,
        //     });

        //     return cards;
        // }, []);
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

        console.log(this.props.spots.list);
        console.log(this.projectCampaignCards);
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
                                    <h3>{projectCampaign.campaignName}</h3>
                                    {/* <h4>
                                        {projectCampaign.campaignName +
                                            (projectCampaign.campaignNote ? ' - ' + projectCampaign.campaignNote : '')}
                                    </h4> */}
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

                            {/* {projectCampaign.producers && projectCampaign.producers.length > 0 && (
                                <div className={s.producers}>
                                    {projectCampaign.producers.map(producer => {
                                        const fullName = [producer.firstName, producer.lastName]
                                            .filter(p => p !== null)
                                            .join(' ');

                                        return (
                                            <p key={producer.userId}>
                                                <span>
                                                    {(producer.creativeRoleName || producer.creativeRoleId) + ': '}
                                                </span>
                                                <strong>{fullName}</strong>
                                            </p>
                                        );
                                    })}
                                </div>
                            )} */}

                            <div className={s.summary}>
                                <p>
                                    <span>Studio </span>
                                    <strong>{projectCampaign.customerName}</strong>
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
