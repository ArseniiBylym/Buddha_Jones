import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './ProjectBoardCampaignHeader.scss';
import truncate from 'lodash-es/truncate';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'components/Section';
import { Button, ButtonEdit, ButtonIcon, ButtonLabel } from 'components/Button';
import { CampaignDetails } from 'types/projectDetails';
import { IconDropdownArrow, IconArrowTopBlue, IconClose } from 'components/Icons';
import { action, observable, computed } from 'mobx';
import { ProjectsDetailsActions } from 'actions';
import { Paragraph } from 'components/Content';
import { AppOnlyStoreState } from 'store/AllStores';
import { NewCustomerForm } from '../CustomerSelector/CustomerForm';
import { CustomerSelector } from '../CustomerSelector';
import { ClientForStudio } from '../../../../types/clients';
import { ClientsActions } from '../../../../actions';
import { Checkmark } from '../../../../components/Form';
import { Modal } from 'components/Modals';

interface Props {
    innerRef?: (ref: HTMLDivElement) => void;
    onExpansionToggle: () => void;
    onClientChange?: ((option: { id: number; name: string } | null) => void) | null;
    isExpanded: boolean;
    isFixed: boolean;
    fixedWidth: number;
    approvedByBilling: boolean;
    projectId: number;
    campaign: CampaignDetails;
    userCanViewNotes: boolean;
    studioId: number;
}

@inject('store')
@observer
export class ProjectBoardCampaignHeader extends React.Component<Props & AppOnlyStoreState, {}> {
    @observable public removing: 'default' | 'saving' | 'success' | 'error' = 'default';
    @observable private approvedByBilling: boolean = false;
    @observable private isEditMode: boolean = false;
    @observable private isCustomerFormShow: boolean = false;
    @observable private customerSelectorOptions: ClientForStudio[] = [];
    @observable private customerSelectorOptionsLoading: boolean = false;
    @observable private modalConfirmOpen: boolean = false;

    @action
    private modalConfirmToggle = () => {
        this.modalConfirmOpen = !this.modalConfirmOpen;
    }

    @computed
    private get isHeaderFixed(): boolean {
        return this.props.isExpanded && this.props.isFixed;
    }

    public render() {
        let userType: number = 0;
        if (this.props.store && this.props.store.user && this.props.store.user.data) {
            userType = this.props.store.user.data.typeId;
        }
        return (
            <>
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
                                    )
                                }
                                {userType !== 24 && !this.approvedByBilling && <span className={styles.pendingLabel}>pending</span>}
                                {userType === 24 && !this.approvedByBilling && <span className={styles.pendingLabel}>pending</span>}
                            </Col>
                            {userType === 24 && !this.approvedByBilling && 
                                <Col className={styles.campaignIsApproved}>
                                    <span style={{paddingRight: '10px'}}>mark as Approved</span>
                                    <Checkmark
                                        onClick={this.modalConfirmToggle}
                                        checked={this.approvedByBilling}
                                        type={'no-icon'}
                                    />
                                </Col> 
                            }
                            <Col className={styles.campaignRemoveButtonContainer}>
                                {
                                    !this.isEditMode &&
                                    this.getEditButtonWithClientName()
                                }

                                {
                                    (this.isEditMode && !this.isCustomerFormShow) &&
                                    <Button
                                        className={styles.newCustomerButton}
                                        onClick={this.onCustomerFormShowToggleHandler}
                                        label={this.getAddNewCustomerButtonLabel()}
                                    />
                                }

                                {
                                    this.isEditMode &&
                                    <CustomerSelector
                                        onChange={this.props.onClientChange}
                                        options={this.customerSelectorOptions as Array<{ id: number; name: string }>}
                                        optionsLoading={this.customerSelectorOptionsLoading}
                                        value={this.props.campaign.clientSelected}
                                        approvedByBilling={this.approvedByBilling}
                                        projectCampaignId={this.props.campaign.projectCampaignId}
                                        onToggleEditModeButton={this.onCustomerSelectorEditModeToggleHandler}
                                        isCustomerFormShow={this.isCustomerFormShow}
                                    />
                                }
                            </Col>
                        </Row>

                        {
                            this.isCustomerFormShow &&
                            <Row>
                                <div className={styles.colWrapper}>
                                    <NewCustomerForm
                                        onToggleEditMode={this.onCustomerFormShowToggleHandler}
                                        studioId={this.props.store ? this.props.store.studios.currentStudioId : null}
                                        mode={'newCustomer'}
                                    />
                                </div>
                            </Row>
                        }
                    </div>
                </Row>
                <Modal
                    show={this.modalConfirmOpen}
                    title={`Please confirm that you wish to Approve this Campaign`}
                    closeButton={false}
                    type="alert"
                    actions={[
                        {
                            onClick: () => { this.modalButtonHandler(true); },
                            closeOnClick: false,
                            label: 'Approve',
                            type: 'default',
                        },
                        {
                            onClick: () => { this.modalButtonHandler(false); },
                            closeOnClick: false,
                            label: 'Cancel',
                            type: 'alert',
                        },
                    ]}
                />
            </>
        );
    }

    private modalButtonHandler = (value) => {
        if (value) {
            this.modalConfirmToggle();
            this.handleProjectBoardPermissionToggle();
        } else {
            this.modalConfirmToggle();
        }
    }

    private getEditButtonWithClientName(): JSX.Element {
        return (
            <div className={styles.editButtonWithLabel}>
                <h5>{this.props.campaign.clientSelected.name}</h5>

                <ButtonEdit
                    float="right"
                    onClick={this.onCustomerSelectorEditModeToggleHandler}
                    label={(this.props.campaign.clientSelected.name) ? '' : 'Edit Client'}
                />

                {
                    this.isShowRemoveButton() &&
                    <Button
                        icon={this.getRemoveButtonIcon()}
                        className={styles.removeButton}
                        onClick={this.handleCampaignRemoval}
                        label={this.getRemoveButtonLabel()}
                    />
                }
            </div>
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

    private getRemoveButtonIcon(): ButtonIcon {
        return {
            size: 'small',
            background: 'white',
            element: (<IconClose width={10} height={16}/>)
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

    private getAddNewCustomerButtonLabel(): ButtonLabel {
        return {
            text: 'New client',
            size: 'small',
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

    public componentDidMount(): void {
        this.setInitialLocalState(this.props);
    }

    @action
    private setInitialLocalState = (props: any) => {
        this.approvedByBilling = props.approvedByBilling;
    };

    @action
    private onCustomerSelectorEditModeToggleHandler = (): void => {
        this.getOptionsForCustomerSelectors();
        this.isEditMode = !this.isEditMode;
        this.isCustomerFormShow = false;
    };

    @action
    private handleProjectBoardPermissionToggle = () => {
        // if (!this.isEditMode) {
        //     return;
        // }
        this.approvedByBilling = !this.approvedByBilling;
        this.handleSaveApprovalChanges();
    };

    @action
    private getOptionsForCustomerSelectors = async (): Promise<boolean> => {
        try {
            if (this.props.campaign.clientSelected.id) {
                this.customerSelectorOptionsLoading = true;
                this.customerSelectorOptions = await ClientsActions.fetchClientsForStudioOptions(this.props.studioId);
                this.customerSelectorOptionsLoading = false;
            }
            return true;
        } catch (e) {
            throw e;
        }
    };

    @action
    private onCustomerFormShowToggleHandler = (): void => {
        this.isCustomerFormShow = !this.isCustomerFormShow;
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

    @action
    private handleSaveApprovalChanges = async () => {
        try {
                await ProjectsDetailsActions.changeProjectCampaignApproved(
                    this.props.campaign.projectCampaignId,
                    this.approvedByBilling,
                );
        } catch (error) {
            throw error;
        }
    };
}
