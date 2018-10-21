import * as React from 'react';
import { observer } from 'mobx-react';
import * as dateFormat from 'date-fns/format';
import { Project } from 'types/project';
import { Row, Col } from 'components/Section';
import { IconArrowRight } from 'components/Icons';
import { Paragraph, Tag, Tooltip } from 'components/Content';
import { Person } from 'components/Buddha';

// Styles
const s = require('./ProjectsList.css');

// Props
interface ProjectsListCardProps {
    onProjectClick:
        | ((
              clientId: number,
              clientName: string,
              projectId: number,
              projectName: string,
              projectCampaignId?: number
          ) => void)
        | null;
    project: Project;
    userCanViewCampaignDescription: boolean;
}

// Component
@observer
export class ProjectsListCard extends React.Component<ProjectsListCardProps, {}> {
    public render() {
        return (
            <div className={s.project} onClickCapture={this.handleProjectClick}>
                <Row className={s.title} removeMargins={true}>
                    <Col>
                        <h3 className={s.name}>
                            {this.props.project.name}
                            <IconArrowRight width={15} height={11} marginTop={-5} marginLeft={-7} />
                        </h3>
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
                            {dateFormat(this.props.project.lastUpdatedAt, 'MM/DD/YYYY hh:mm A')}
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

    private handleProjectClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onProjectClick) {
            this.props.onProjectClick(
                this.props.project.clientId,
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
                this.props.project.clientId,
                this.props.project.studioName,
                this.props.project.id,
                this.props.project.name,
                projectCampaignId
            );
        }
    };
}
