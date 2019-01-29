import { ProjectsActions } from 'actions';
import { LinkButton } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Checkbox } from 'components/Form';
import { Card, CardContentBlock, CardContentTable } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
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
                            <span>Studio: </span>
                            <strong>{projectCampaign.studioName}</strong>
                        </p>

                        <p>
                            {(projectCampaign.customerName && projectCampaign.customerTitle && (
                                <span>{projectCampaign.customerTitle + ': '}</span>
                            )) ||
                                (projectCampaign.customerName && <span>Customer: </span>)}

                            {projectCampaign.customerName && <strong>{projectCampaign.customerName}</strong>}
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
                            {projectCampaign.spots
                                .filter(spot => spot.spotsSent && spot.spotsSent.length > 0)
                                .map(spot => (
                                    <CardContentBlock
                                        key={spot.id}
                                        classNameForContent={s.spotsSentBlock}
                                        title={spot.name}
                                        noBorderOnBottom={true}
                                        isExpandable={true}
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
                                                { title: 'Version', align: 'left' },
                                                { title: 'Editorial', align: 'left' },
                                                { title: 'Graphics', align: 'left' },
                                            ]}
                                        >
                                            {spot.spotsSent.map(spotSent => (
                                                <div className={s.spotSentRow} key={spotSent.spotSentId}>
                                                    <div className={s.spotSentCol}>
                                                        <Paragraph
                                                            type={spotSent.spotSentDate ? 'default' : 'dim'}
                                                            size="small"
                                                        >
                                                            {spotSent.spotSentDate
                                                                ? DateHandler.printDateObjectAsString(
                                                                      DateHandler.parseDateStringAsDateObject(
                                                                          spotSent.spotSentDate
                                                                      )
                                                                  )
                                                                : 'N/A'}
                                                        </Paragraph>
                                                    </div>

                                                    <div>
                                                        <Paragraph type="default" size="small" align="left">
                                                            {spotSent.versionName || spotSent.versionId
                                                                ? 'Ver. ' +
                                                                  (spotSent.versionName
                                                                      ? spotSent.versionName
                                                                      : spotSent.versionId || '1')
                                                                : ''}
                                                        </Paragraph>
                                                    </div>

                                                    <div className={s.spotSentCol}>
                                                        <Paragraph
                                                            type={spotSent.spotLineStatus ? 'default' : 'dim'}
                                                            size="small"
                                                            align="left"
                                                        >
                                                            {spotSent.spotLineStatus || 'N/A'}
                                                        </Paragraph>
                                                    </div>

                                                    <div className={s.spotSentCol}>
                                                        <Paragraph
                                                            type={spotSent.graphicsStatus ? 'default' : 'dim'}
                                                            size="small"
                                                            align="left"
                                                        >
                                                            {spotSent.graphicsStatus || 'N/A'}
                                                        </Paragraph>
                                                    </div>
                                                </div>
                                            ))}
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
