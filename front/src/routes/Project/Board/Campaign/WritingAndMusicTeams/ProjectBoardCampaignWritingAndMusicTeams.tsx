import * as React from 'react';
import { observer } from 'mobx-react';
import { Section, Col, Row } from 'components/Section';
import { ProjectBoardCampaignWritingOrMusicTeamContent } from '.';

// Styles
const s = require('./ProjectBoardCampaignWritingAndMusicTeams.css');

// Props
interface ProjectBoardCampaignWritingAndMusicTeamsProps {
    userCanViewWriting: boolean;
    userCanEditWriting: boolean;
    userCanViewMusic: boolean;
    userCanEditMusic: boolean;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
}

// Component
@observer
export class ProjectBoardCampaignWritingAndMusicTeams extends React.Component<
    ProjectBoardCampaignWritingAndMusicTeamsProps,
    {}
> {
    public render() {
        return this.props.userCanViewMusic || this.props.userCanViewWriting ? (
            <Section className={s.container} noSeparator={false}>
                <Row removeMargins={true} removeGutter={true}>
                    {this.props.userCanViewMusic && (
                        <Col removeGutter={true} size={this.props.userCanViewWriting ? 6 : 12}>
                            <ProjectBoardCampaignWritingOrMusicTeamContent
                                userCanEdit={this.props.userCanEditMusic}
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.projectCampaignId}
                                campaignId={this.props.campaignId}
                                type="music"
                            />
                        </Col>
                    )}
                    {this.props.userCanViewWriting && (
                        <Col removeGutter={true} size={this.props.userCanViewMusic ? 6 : 12}>
                            <ProjectBoardCampaignWritingOrMusicTeamContent
                                userCanEdit={this.props.userCanEditWriting}
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.projectCampaignId}
                                campaignId={this.props.campaignId}
                                type="writing"
                            />
                        </Col>
                    )}
                </Row>
            </Section>
        ) : null;
    }
}
