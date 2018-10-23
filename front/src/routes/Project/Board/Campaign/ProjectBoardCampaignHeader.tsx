import * as React from 'react';
import * as classNames from 'classnames';
import truncate from 'lodash-es/truncate';
import { observer } from 'mobx-react';
import { Row, Col } from 'components/Section';
import { Button } from 'components/Button';
import { CampaignDetails } from 'types/projectDetails';
import { IconDropdownArrow, IconArrowTopBlue } from 'components/Icons';
import { action, observable, computed } from 'mobx';
import { ProjectsDetailsActions } from 'actions';
import { Paragraph } from 'components/Content';
import { CustomerSelector } from '../CustomerSelector';
import { ClientsStore } from '../../../../store/AllStores';

// Styles
const s = require('./ProjectBoardCampaignHeader.css');

// Props
interface ProjectBoardCampaignHeaderProps {
    innerRef?: (ref: HTMLDivElement) => void;
    onExpansionToggle: () => void;
    onClientChange?: ((option: { id: number; name: string } | null) => void) | null;
    isExpanded: boolean;
    isFixed: boolean;
    fixedWidth: number;
    projectId: number;
    studioId: number | null;
    clientSelected: {
        id: number | null;
        name: string;
    };
    campaign: CampaignDetails;
    userCanViewNotes: boolean;
}

// Component
@observer
export class ProjectBoardCampaignHeader extends React.Component<ProjectBoardCampaignHeaderProps, {}> {
    @observable public removing: 'default' | 'saving' | 'success' | 'error' = 'default';

    @computed
    private get isHeaderFixed(): boolean {
        return this.props.isExpanded && this.props.isFixed;
    }

    public render() {
        const { campaign } = this.props;

        return (
            <Row
                innerRef={this.referenceHeaderContainer}
                removeMargins={true}
                className={classNames(s.campaignHeader, {
                    [s.campaignHeaderFixed]: this.isHeaderFixed,
                })}
                style={
                    this.isHeaderFixed && this.props.fixedWidth
                        ? {
                              width: this.props.fixedWidth + 'px',
                          }
                        : undefined
                }
            >
                <Col>
                    <Row
                        className={s.campaignInfo}
                        removeMargins={true}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Col className={s.campaignName}>
                            <Button
                                onClick={this.handleCampaignExpandOrCollapse}
                                label={{
                                    text: this.props.campaign.name || 'Campaign',
                                    size: 'large',
                                    color: 'black',
                                    onLeft: false,
                                }}
                                icon={{
                                    size: 'small',
                                    background: this.props.isExpanded ? 'none-alt' : 'white',
                                    element: this.props.isExpanded ? (
                                        <IconArrowTopBlue width={10} height={16} />
                                    ) : (
                                        <IconDropdownArrow width={12} height={8} />
                                    ),
                                }}
                            />

                            {this.props.campaign.notes &&
                                this.props.userCanViewNotes &&
                                this.props.campaign.notes !== this.props.campaign.name && (
                                    <Paragraph type="dim">
                                        {truncate(this.props.campaign.notes, { length: 64 })}
                                    </Paragraph>
                                )}
                        </Col>

                        <Col className={s.campaignRemoveButtonContainer}>
                            <CustomerSelector
                                label={'Edit Client'}
                                onChange={this.props.onClientChange}
                                options={ClientsStore.allClientsForStudio}
                                value={this.props.clientSelected}
                                studioId={this.props.studioId}
                            />
                            {campaign.spots.length <= 0 &&
                                campaign.creativeTeam.length <= 0 &&
                                campaign.billingTeam.length <= 0 &&
                                campaign.designTeam.length <= 0 &&
                                campaign.editorialTeam.length <= 0 && (
                                        <Button
                                            onClick={this.removing !== 'saving' ? this.handleCampaignRemoval : undefined}
                                            label={{
                                                text:
                                                    this.removing === 'default'
                                                        ? 'Remove'
                                                        : this.removing === 'error'
                                                            ? 'Could not remove, try again'
                                                            : 'Removing...',
                                                color: 'orange',
                                                size: 'small',
                                            }}
                                        />
                                )
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    private referenceHeaderContainer = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private handleCampaignExpandOrCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onExpansionToggle();
    };

    @action
    private handleCampaignRemoval = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            this.removing = 'saving';
            await ProjectsDetailsActions.removeProjectCampaign(
                this.props.projectId,
                this.props.campaign.projectCampaignId
            );
        } catch (error) {
            this.removing = 'error';
            throw error;
        }
    };
}
