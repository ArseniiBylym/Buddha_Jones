import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './ProjectBoardCampaignHeader.scss';
import truncate from 'lodash-es/truncate';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'components/Section';
import { Button, ButtonIcon, ButtonLabel } from 'components/Button';
import { CampaignDetails } from 'types/projectDetails';
import { IconDropdownArrow, IconArrowTopBlue } from 'components/Icons';
import { action, observable, computed } from 'mobx';
import { ProjectsDetailsActions } from 'actions';
import { Paragraph } from 'components/Content';
import { AppOnlyStoreState, ClientsStore } from 'store/AllStores';
import { NewCustomerForm } from '../CustomerSelector/CustomerForm';
import { CustomerSelector } from '../CustomerSelector';

interface Props {
    innerRef?: (ref: HTMLDivElement) => void;
    onExpansionToggle: () => void;
    onClientChange?: ((option: { id: number; name: string } | null) => void) | null;
    isExpanded: boolean;
    isFixed: boolean;
    fixedWidth: number;
    projectId: number;
    campaign: CampaignDetails;
    userCanViewNotes: boolean;
}

@inject('store')
@observer
export class ProjectBoardCampaignHeader extends React.Component<Props & AppOnlyStoreState, {}> {
    @observable public removing: 'default' | 'saving' | 'success' | 'error' = 'default';
    @observable private isHeaderEditMode: boolean = false;

    @computed
    private get isHeaderFixed(): boolean {
        return this.props.isExpanded && this.props.isFixed;
    }

    public render() {
        return (
            <Row
                innerRef={this.referenceHeaderContainer}
                removeMargins={true}
                className={classNames(styles.campaignHeader, {
                    [styles.campaignHeaderFixed]: this.isHeaderFixed,
                })}
                style={this.getMainRowStyle()}
            >
                <div className={styles.colWrapper}>
                    <Row
                        className={styles.campaignInfo}
                        removeMargins={true}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Col className={styles.campaignName}>
                            <Button
                                onClick={this.handleCampaignExpandOrCollapse}
                                label={this.getCampaignNameButtonLabel()}
                                icon={this.getCampaignNameButtonIcon()}
                            />

                            {
                                this.props.campaign.notes &&
                                this.props.userCanViewNotes &&
                                this.props.campaign.notes !== this.props.campaign.name &&
                                (
                                    <Paragraph type="dim">
                                        {truncate(this.props.campaign.notes, { length: 64 })}
                                    </Paragraph>
                                )}
                        </Col>

                        <Col className={styles.campaignRemoveButtonContainer}>
                            <CustomerSelector
                                onChange={this.props.onClientChange}
                                options={ClientsStore.allClientsForStudio}
                                value={this.props.campaign.clientSelected}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                isEditMode={this.isHeaderEditMode}
                                onToggleEditMode={this.onEditModeToggleHandler}
                            />

                            {
                                this.isShowRemoveButton() &&
                                <Button
                                    className={styles.inlineBlock}
                                    onClick={this.handleCampaignRemoval}
                                    label={this.getRemoveButtonLabel()}
                                />
                            }
                        </Col>
                    </Row>

                    {
                        this.isHeaderEditMode &&
                        <Row>
                            <div className={styles.colWrapper}>
                                <NewCustomerForm
                                    onToggleEditMode={this.onEditModeToggleHandler}
                                    studioId={this.props.store ? this.props.store.studios.currentStudioId : null}
                                />
                            </div>
                        </Row>
                    }
                </div>
            </Row>
        );
    }

    private getCampaignNameButtonIcon(): ButtonIcon {
        return {
            size: 'small',
            background: this.props.isExpanded ? 'none-alt' : 'white',
            element: this.props.isExpanded ? (
                <IconArrowTopBlue width={10} height={16}/>
            ) : (
                <IconDropdownArrow width={12} height={8}/>
            ),
        };
    }

    private getCampaignNameButtonLabel(): ButtonLabel {
        return {
            text: this.props.campaign.name || 'Campaign',
            size: 'large',
            color: 'black',
            onLeft: false,
        };
    }

    private getRemoveButtonLabel(): ButtonLabel {
        return {
            text:
                this.removing === 'default'
                    ? 'Remove'
                    : this.removing === 'error'
                    ? 'Could not remove, try again'
                    : 'Removing...',
            color: 'orange',
            size: 'small',
        };
    }

    private getMainRowStyle(): { [id: string]: string } | null {
        return this.isHeaderFixed && this.props.fixedWidth ?
            { width: this.props.fixedWidth + 'px', } :
            null;
    }

    private isShowRemoveButton(): boolean {
        return Boolean(
            this.props.campaign.spots.length <= 0 &&
            this.props.campaign.creativeTeam.length <= 0 &&
            this.props.campaign.billingTeam.length <= 0 &&
            this.props.campaign.designTeam.length <= 0 &&
            this.props.campaign.editorialTeam.length <= 0
        );
    }

    @action
    private onEditModeToggleHandler = (): void => {
        this.isHeaderEditMode = !this.isHeaderEditMode;
    };

    private referenceHeaderContainer = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private handleCampaignExpandOrCollapse = () => {
        this.props.onExpansionToggle();
    };

    @action
    private handleCampaignRemoval = async () => {
        if (this.removing !== 'saving') {
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
        }
    };
}
