import { ProjectsActions } from 'actions';
import * as classNames from 'classnames';
import { LinkButton } from 'components/Button';
import { Tag } from 'components/Content';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Card } from 'components/Section';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotToBillFromApi, SpotToBillProducer } from 'types/spotsToBill';
import { SpotProjectCampaignGroup } from './SpotsToBill';

const s = require('./SpotsToBillGrid.css');

interface SpotsToBillGridProps {
    loading: boolean;
    fetchError: boolean;
    retryFetch: () => void;
    onSpotSelectionToggle: (spotId: number, projectCampaignId: number) => void;
    selectedSpots: SpotProjectCampaignGroup[];
    spots: {
        list: SpotToBillFromApi[];
        count: number;
    };
}

interface ProjectCampaignCard {
    projectCampaignId: number;
    campaignName: string;
    campaignNote: string | null;
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    producers: SpotToBillProducer[];
    spots: {
        id: number;
        name: string;
    }[];
}

@observer
export class SpotsToBillGrid extends React.Component<SpotsToBillGridProps, {}> {
    @computed
    private get projectCampaignCards(): ProjectCampaignCard[] {
        return this.props.spots.list.reduce((cards: ProjectCampaignCard[], spot) => {
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
                    producers: spot.producers,
                    spots: [],
                });
            }

            cards[index].spots.push({
                id: spot.spotId,
                name: spot.spotName,
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
                <LoadingShade isStatic={true} contentCentered={true} background="transparent">
                    <LoadingSpinner />
                </LoadingShade>
            );
        }

        return (
            <div className={s.grid}>
                {this.projectCampaignCards.map(projectCampaign => (
                    <Card
                        className={s.card}
                        key={projectCampaign.projectCampaignId}
                        isExpandable={false}
                        noPadding={true}
                    >
                        <React.Fragment>
                            <div className={s.content}>
                                <div className={s.headline}>
                                    <LinkButton
                                        goToUrlOnClick={ProjectsActions.constructProjectUrl(
                                            projectCampaign.studioId,
                                            projectCampaign.studioName,
                                            projectCampaign.projectId,
                                            projectCampaign.projectName
                                        )}
                                        label={projectCampaign.projectName}
                                    />

                                    <h4>
                                        {projectCampaign.campaignName +
                                            (projectCampaign.campaignNote ? ' - ' + projectCampaign.campaignNote : '')}
                                    </h4>
                                </div>

                                <div className={s.spots}>
                                    <p>Select spots to bill:</p>

                                    {projectCampaign.spots.map(spot => {
                                        const isSelected: boolean =
                                            this.props.selectedSpots.findIndex(group => group.spotId === spot.id) !==
                                            -1;

                                        return (
                                            <Tag
                                                key={spot.id}
                                                className={classNames(s.tag, { [s.selected]: isSelected })}
                                                titleClassName={s.tagTitle}
                                                onTagClick={this.handleSpotSelectionToggle(
                                                    spot.id,
                                                    projectCampaign.projectCampaignId
                                                )}
                                                title={spot.name}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {projectCampaign.producers && projectCampaign.producers.length > 0 && (
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
                            )}

                            <div className={s.summary}>
                                <p>
                                    <span>Studio </span>
                                    <strong>{projectCampaign.studioName}</strong>
                                </p>
                            </div>
                        </React.Fragment>
                    </Card>
                ))}
            </div>
        );
    }

    private handleSpotSelectionToggle = (spotId: number, projectCampaignId: number) => e => {
        this.props.onSpotSelectionToggle(spotId, projectCampaignId);
    };
}
