import { Person } from 'components/Buddha';
import { LinkButton } from 'components/Button';
import { Paragraph, Tag, Tooltip } from 'components/Content';
import { Col, Row } from 'components/Section';
import * as dateFormat from 'date-fns/format';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Project } from 'types/project';

const s = require('./ProjectsList.css');

interface ProjectsListCardProps {
    onProjectClick:
        | ((
              studioId: number,
              studioName: string,
              projectId: number,
              projectName: string,
              projectCampaignId?: number
          ) => void)
        | null;
    project: Project;
    userCanViewCampaignDescription: boolean;
}

@observer
export class ProjectsListCard extends React.Component<ProjectsListCardProps, {}> {
    public render() {
        return (
            <div className={s.project} onClickCapture={this.handleProjectClick}>
                <Row className={s.title} removeMargins={true}>
                    <Col>
                        <LinkButton
                            className={s.name}
                            onClick={this.handleProjectClick}
                            label={this.props.project.name}
                        />
                        <h4 className={s.client}>{this.props.project.studioName}</h4>
                    </Col>
                </Row>

                <Row className={s.campaigns} doWrap={true} removeMargins={true}>
                    <Col className={s.label} size={0}>
                        {this.props.project.campaigns.length > 0 ? 'Campaigns:' : 'No campaigns'}
                    </Col>
                    {this.props.project.campaigns.map(campaign => (
                        <Tooltip
                            key={`project-${this.props.project.id}-campaign-${campaign.projectCampaignId}`}
                            text={this.props.userCanViewCampaignDescription && campaign.note ? campaign.note : ''}
                        >
                            <Tag
                                className={s.tag}
                                onTagClickCapture={this.handleCampaignClick(campaign.projectCampaignId)}
                                title={campaign.campaignName}
                                isTitleBold={false}
                            />
                        </Tooltip>
                    ))}
                </Row>

                <Row className={s.summary} removeMargins={true}>
                    <Col className={s.dateCol}>
                        <Paragraph>
                            <span>Last update</span>
                            {this.props.project.lastUpdatedAt &&
                                dateFormat(this.props.project.lastUpdatedAt, 'MM/DD/YYYY hh:mm A')}
                        </Paragraph>
                    </Col>
                    <Col className={s.nameCol}>
                        <Person
                            align="left"
                            showPersonNameOnLeft={true}
                            labelHasNoPadding={true}
                            textOfLabelOnLeft="by"
                            personName={this.props.project.lastUpdatedByUserName}
                            personImage={this.props.project.lastUpdatedByUserImage}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    private handleProjectClick = () => {
        if (this.props.onProjectClick) {
            this.props.onProjectClick(
                this.props.project.studioId,
                this.props.project.studioName,
                this.props.project.id,
                this.props.project.name
            );
        }
    };

    private handleCampaignClick = (projectCampaignId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onProjectClick) {
            this.props.onProjectClick(
                this.props.project.studioId,
                this.props.project.studioName,
                this.props.project.id,
                this.props.project.name,
                projectCampaignId
            );
        }
    };
}
