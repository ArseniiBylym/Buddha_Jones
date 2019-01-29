import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { DateHandler } from 'helpers/DateHandler';
import { SortHandler } from 'helpers/SortHandler';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotToBillFromApi, SpotToBillProducer, SpotToBillSentFromApi } from 'types/spotsToBill';
import { SpotProjectCampaignGroup } from './SpotsToBill';
import { SpotsToBillCard } from './SpotsToBillCard';

const s = require('./SpotsToBillGrid.css');

export type SpotToBillSelectionToggle = (spotId: number, projectCampaignId: number) => void;

interface SpotsToBillGridProps {
    loading: boolean;
    fetchError: boolean;
    retryFetch: () => void;
    onSpotSelectionToggle: SpotToBillSelectionToggle;
    selectedSpots: SpotProjectCampaignGroup[];
    spots: {
        list: SpotToBillFromApi[];
        count: number;
    };
}

export interface ProjectCampaignCard {
    projectCampaignId: number;
    campaignName: string;
    campaignNote: string | null;
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    customerId: number | null;
    customerName: string | null;
    customerTitle: string | null;
    producers: SpotToBillProducer[];
    spots: Array<{
        id: number;
        name: string;
        isSelected: boolean;
        spotsSent: SpotToBillSentFromApi[];
    }>;
}

@observer
export class SpotsToBillGrid extends React.Component<SpotsToBillGridProps, {}> {
    @computed
    private get projectCampaignCards(): ProjectCampaignCard[] {
        return this.props.spots.list.reduce((cards: ProjectCampaignCard[], spot) => {
            // When there is no spot ID, do not include the data
            if (spot.spotId === null) {
                return cards;
            }

            // Check if project campaign already exists in the accumulated array
            let index = cards.findIndex(c => c.projectCampaignId === spot.projectCampaignId);
            if (index === -1) {
                index = cards.length;

                cards.push({
                    projectCampaignId: spot.projectCampaignId,
                    campaignName: spot.campaignName,
                    campaignNote: spot.projectCampaignName,
                    projectId: spot.projectId,
                    projectName: spot.projectName,
                    studioId: spot.studioId,
                    studioName: spot.studioName,
                    customerId: spot.customerId,
                    customerName: spot.customerName,
                    customerTitle: spot.customerTitle,
                    producers: spot.producers,
                    spots: [],
                });
            }

            // Add spot to project campaign
            cards[index].spots.push({
                id: spot.spotId,
                name: spot.spotName,
                isSelected: this.props.selectedSpots.findIndex(group => group.spotId === spot.spotId) !== -1,
                spotsSent:
                    spot.spotSent && spot.spotSent.length > 0
                        ? spot.spotSent.sort((spotSentA, spotSentB) => {
                              const dateA = spotSentA.spotSentDate
                                  ? DateHandler.parseDateStringAsDateObject(spotSentA.spotSentDate)
                                  : null;
                              const dateB = spotSentB.spotSentDate
                                  ? DateHandler.parseDateStringAsDateObject(spotSentB.spotSentDate)
                                  : null;

                              const verA = spotSentA.versionId
                                  ? { id: spotSentA.versionId, seq: spotSentA.versionSeq }
                                  : null;
                              const verB = spotSentB.versionId
                                  ? { id: spotSentB.versionId, seq: spotSentB.versionSeq }
                                  : null;

                              if (dateA === null && dateB === null) {
                                  return SortHandler.sortVersionsBySequenceOrId(verA, verB);
                              }

                              if (dateA !== null && dateB !== null) {
                                  const datesAreSameDay = DateHandler.checkIfDatesAreSameDay(dateA, dateB);
                                  return datesAreSameDay
                                      ? SortHandler.sortVersionsBySequenceOrId(verA, verB)
                                      : DateHandler.checkIfDateIsOlderThanOtherDate(dateA, dateB)
                                      ? 1
                                      : -1;
                              }

                              if (dateA === null || dateB === null) {
                                  return dateA === null && dateB !== null ? 1 : dateB === null ? -1 : 0;
                              }

                              return 0;
                          })
                        : [],
            });

            return cards;
        }, []);
    }

    public render() {
        const { fetchError, loading, retryFetch } = this.props;

        if (fetchError) {
            return <DataFetchError errorLabel="Could not load spots" onRefetch={retryFetch} />;
        }

        if (loading && this.props.spots.count <= 0) {
            return (
                <LoadingShade className={s.loader} isStatic={true} contentCentered={true} background="transparent">
                    <LoadingSpinner />
                </LoadingShade>
            );
        }

        return (
            <div className={s.grid}>
                {this.projectCampaignCards.map(projectCampaign => (
                    <SpotsToBillCard
                        key={projectCampaign.projectId + '-' + projectCampaign.projectCampaignId}
                        onSpotSelectionToggle={this.props.onSpotSelectionToggle}
                        projectCampaign={projectCampaign}
                    />
                ))}
            </div>
        );
    }
}
