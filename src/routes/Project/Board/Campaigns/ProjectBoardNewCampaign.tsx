import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from 'components/Section';
import { Paragraph } from 'components/Content';
import { CampaignPicker } from 'components/Buddha';
import { LoadingIndicator } from 'components/Loaders';
import { CampaignsActions } from 'actions';

// Styles
const s = require('./ProjectBoardNewCampaign.css');

// Props
interface ProjectBoardNewCampaignProps {
    userCanCreateCampaigns: boolean;
    projectId: number;
    projectsCampaignsFlatIds: number[];
}

// Component
@observer
export class ProjectBoardNewCampaign extends React.Component<ProjectBoardNewCampaignProps, {}> {
    @observable private status: 'default' | 'saving' | 'error' | 'success' = 'default';

    public render() {
        return this.props.userCanCreateCampaigns ? (
            <div className={s.newCampaignField} key="new-campaign-fields">
                <Row removeMargins={true}>
                    <Col>
                        <div className={s.newCampaignBox}>
                            {this.status === 'saving' && <LoadingIndicator label="Saving new campaign" />}

                            {this.status !== 'default' &&
                                this.status !== 'saving' && (
                                    <Paragraph
                                        type={
                                            this.status === 'error'
                                                ? 'alert'
                                                : this.status === 'success'
                                                    ? 'success'
                                                    : 'default'
                                        }
                                    >
                                        {this.status === 'error'
                                            ? 'Could not create new campaign, try again'
                                            : 'Campaign added to project'}
                                    </Paragraph>
                                )}

                            {this.status !== 'saving' && (
                                <CampaignPicker
                                    onChange={this.handleExistingCampaignSelected}
                                    value={0}
                                    valueLabel=""
                                    align="left"
                                    label="Add new campaign"
                                    projectId={this.props.projectId}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        ) : null;
    }

    private handleExistingCampaignSelected = async (campaign: { id: number; name: string }) => {
        try {
            this.status = 'saving';

            await CampaignsActions.assignExistingCampaignToProject(this.props.projectId, campaign.id);

            this.status = 'success';

            setTimeout(() => {
                if (this.status === 'success') {
                    this.status = 'default';
                }
            }, 2048);
        } catch (error) {
            this.status = 'error';
            throw error;
        }
    };
}
