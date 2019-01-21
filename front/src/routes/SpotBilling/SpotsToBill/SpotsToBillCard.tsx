import { ProjectsActions } from 'actions';
import { LinkButton } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Checkbox } from 'components/Form';
import { Card, CardContentBlock, CardContentTable } from 'components/Section';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ProjectCampaignCard, SpotToBillSelectionToggle } from './SpotsToBillGrid';

const s = require('./SpotsToBillCard.css');

interface Props {
    onSpotSelectionToggle: SpotToBillSelectionToggle;
    projectCampaign: ProjectCampaignCard;
}

@observer
export class SpotsToBillCard extends React.Component<Props, {}> {
    public render() {
        const { projectCampaign } = this.props;

        return (
            <Card className={s.card} key={projectCampaign.projectCampaignId} isExpandable={false} noPadding={true}>
                <React.Fragment>
                    <div className={s.summary}>
                        <p>
                            <span>Studio </span>
                            <strong>{projectCampaign.studioName}</strong>
                        </p>
                    </div>

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

                        {projectCampaign.producers && projectCampaign.producers.length > 0 && (
                            <div className={s.producers}>
                                {projectCampaign.producers.map(producer => {
                                    const fullName = [producer.firstName, producer.lastName]
                                        .filter(p => p !== null)
                                        .join(' ');

                                    return (
                                        <p key={producer.userId}>
                                            <span>{(producer.creativeRoleName || producer.creativeRoleId) + ': '}</span>
                                            <strong>{fullName}</strong>
                                        </p>
                                    );
                                })}
                            </div>
                        )}

                        <CardContentBlock
                            className={s.spots}
                            title="Select spots to bill:"
                            titleBackground="light"
                            titleFontWeight={400}
                            noBorderOnBottom={true}
                        >
                            {projectCampaign.spots.map(spot => (
                                <CardContentBlock
                                    key={spot.id}
                                    title={spot.name}
                                    noBorderOnBottom={true}
                                    titleElements={
                                        <Checkbox
                                            onChange={this.handleSpotSelectionToggle(
                                                spot.id,
                                                projectCampaign.projectCampaignId
                                            )}
                                            checked={spot.isSelected}
                                            label={spot.isSelected ? 'In bill' : 'Add to bill'}
                                            labelOnLeft={true}
                                        />
                                    }
                                >
                                    <CardContentTable
                                        header={[
                                            { title: 'Date spot sent', align: 'left' },
                                            { title: 'Editorial', align: 'left' },
                                            { title: 'Graphics', align: 'left' },
                                        ]}
                                    >
                                        <div className={s.spotSentCol}>
                                            <Paragraph>2019-01-21</Paragraph>
                                        </div>
                                        <div className={s.spotSentCol}>
                                            <Paragraph>Billed (ver. 1)</Paragraph>
                                        </div>
                                        <div className={s.spotSentCol}>
                                            <Paragraph>Pending (descriptions)</Paragraph>
                                        </div>
                                    </CardContentTable>
                                </CardContentBlock>
                            ))}
                        </CardContentBlock>
                    </div>
                </React.Fragment>
            </Card>
        );
    }

    private handleSpotSelectionToggle = (spotId: number, projectCampaignId: number) => e => {
        this.props.onSpotSelectionToggle(spotId, projectCampaignId);
    };
}
