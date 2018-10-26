import * as React from 'react';
import * as classNames from 'classnames';
import { observable, computed, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ClientsActions, ProjectsDetailsActions } from 'actions';
import { ButtonClose, ButtonEdit, ButtonSave } from 'components/Button';
import { Paragraph } from 'components/Content';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from 'components/Form';
import { IconEmail, IconPhone, IconBriefcase } from 'components/Icons';
import { AppOnlyStoreState } from 'store/AllStores';
import { ClientContact } from 'types/clients';
import { Section, Row, Col, ClearFix } from 'components/Section';
import { LoadingIndicator } from 'components/Loaders';

// Styles
const s = require('./ProjectBoardCampaignExecutive.css');

// Types
interface ExecutiveContactInfo {
    key: string;
    type: 'email' | 'address' | 'phone';
    label: string;
}

// Props
interface ProjectBoardCampaignExecutiveProps {
    userCanViewExecutive: boolean;
    userCanEditExecutive: boolean;
    userCanViewPORContact: boolean;
    userCanViewInvoiceContact: boolean;
    clientId: number;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
    executiveId: number | null;
}

// Component
@inject('store')
@observer
export class ProjectBoardCampaignExecutive extends React.Component<
    ProjectBoardCampaignExecutiveProps & AppOnlyStoreState,
    {}
> {
    private executiveDropdown: DropdownContainer | null = null;

    @observable private loading: boolean = false;
    @observable private editSelectedExecutiveId: number | null = null;
    @observable private isInEditMode: boolean = false;
    @observable private changingExecutive: 'none' | 'saving' | 'success' | 'error' = 'none';

    @computed
    private get editSelectedExecutive(): ClientContact | null {
        if (this.editSelectedExecutiveId === null) {
            return null;
        }

        return this.clientExecutives.find(executive => executive.id === this.editSelectedExecutiveId) || null;
    }

    @computed
    private get clientExecutives(): ClientContact[] {
        if (!this.props.store) {
            return [];
        }

        const clientMatch = this.props.store.clients.clientsDetailsFlatIds.findIndex(
            clientId => clientId === this.props.clientId
        );
        if (clientMatch !== -1) {
            const clientDetails = this.props.store.clients.clientsDetails[clientMatch];
            if (clientDetails && clientDetails.customer) {
                return clientDetails.customer.contacts;
            }
        }

        return [];
    }

    @computed
    private get selectedExecutive(): ClientContact | null {
        if (this.props.executiveId === null || this.clientExecutives === null || this.clientExecutives.length <= 0) {
            return null;
        }

        return this.clientExecutives.find(executive => executive.id === this.props.executiveId) || null;
    }

    @computed
    private get selectedExecutiveContactInfo(): ExecutiveContactInfo[] {
        if (this.selectedExecutive === null) {
            return [];
        }

        const contactInfo: ExecutiveContactInfo[] = [];

        if (this.selectedExecutive && this.selectedExecutive.email) {
            contactInfo.push({
                key: 'email',
                type: 'email',
                label: this.selectedExecutive.email,
            });
        }

        if (this.selectedExecutive && this.selectedExecutive.mobilePhone) {
            contactInfo.push({
                key: 'mobile-phone',
                type: 'phone',
                label: this.selectedExecutive.mobilePhone,
            });
        }

        if (this.selectedExecutive && this.selectedExecutive.officePhone) {
            contactInfo.push({
                key: 'office-phone',
                type: 'phone',
                label: this.selectedExecutive.officePhone,
            });
        }

        if (this.selectedExecutive && this.selectedExecutive.postalAddress) {
            contactInfo.push({
                key: 'postal-address',
                type: 'address',
                label: this.selectedExecutive.postalAddress,
            });
        }

        return contactInfo;
    }

    public componentDidMount() {
        if (this.props.userCanViewExecutive || this.props.userCanEditExecutive) {
            this.loading = true;
            ClientsActions.fetchCustomerDetails(this.props.clientId).then(() => {
                this.loading = false;
            });
        }
    }

    public render() {
        return this.props.userCanViewExecutive || this.props.userCanEditExecutive ? (
            <div className={classNames(s.executiveContainer, { [s.editing]: this.isInEditMode })}>
                <Section
                    title="Studio contacts"
                    noSeparator={true}
                    headerElements={
                        this.props.userCanEditExecutive && this.clientExecutives.length > 0
                            ? [
                                  {
                                      key: 'edit-creative-executive-button',
                                      element: (
                                          <>
                                              {this.isInEditMode &&
                                                  <ButtonClose
                                                      float="right"
                                                      onClick={this.handleEditingToggle}
                                                      label={'Cancel'}
                                                  />
                                              }
                                              {!this.isInEditMode &&
                                                  <ButtonEdit
                                                      float="right"
                                                      onClick={this.handleEditingToggle}
                                                      label={'Edit contacts'}
                                                  />
                                              }
                                          </>
                                      ),
                                  },
                              ]
                            : []
                    }
                >
                    {this.loading ? (
                        <LoadingIndicator label="Loading studio contacts" />
                    ) : this.isInEditMode ? (
                        this.renderEditable()
                    ) : (
                        this.renderViewable()
                    )}
                </Section>
            </div>
        ) : null;
    }

    private renderViewable() {
        return (
            <Row className={s.container}>
                <Col>
                    <div className={s.contacts}>
                        <Paragraph
                            className={classNames(s.creativeExecutiveName, {
                                [s.bold]: this.selectedExecutive !== null,
                            })}
                            align="left"
                            type={this.clientExecutives.length > 0 ? 'default' : 'dim'}
                        >
                            <span>
                                {this.selectedExecutive !== null
                                    ? 'Creative executive: '
                                    : this.clientExecutives.length > 0
                                        ? 'No creative executive assigned'
                                        : 'Studio has no contacts'}
                            </span>
                            {this.selectedExecutive !== null && <strong>{this.selectedExecutive.name}</strong>}
                        </Paragraph>

                        {this.props.userCanViewPORContact &&
                            this.selectedExecutive && (
                                <Paragraph>
                                    <span>PO contact: </span>
                                    <strong>{this.selectedExecutive.name}</strong>
                                </Paragraph>
                            )}

                        {this.props.userCanViewInvoiceContact &&
                            this.selectedExecutive && (
                                <Paragraph>
                                    <span>Invoice contact: </span>
                                    <strong>{this.selectedExecutive.name}</strong>
                                </Paragraph>
                            )}
                    </div>

                    {this.selectedExecutiveContactInfo.length > 0 && (
                        <ul className={s.addresses}>
                            {this.selectedExecutiveContactInfo.map(info => (
                                <li key={`value-${info.key}`}>
                                    {(info.type === 'email' && <IconEmail width={15} height={12} />) ||
                                        (info.type === 'address' && <IconBriefcase width={14} height={12} />) ||
                                        (info.type === 'phone' && <IconPhone width={14} height={12} />)}
                                    {(info.type === 'email' && <a href={`mailto:${info.label}`}>{info.label}</a>) || (
                                        <p>{info.label}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </Col>
            </Row>
        );
    }

    private renderEditable() {
        return (
            <Row>
                <Col>
                    <DropdownContainer
                        ref={this.referenceExecutiveDropdown}
                        label={this.editSelectedExecutive !== null ? 'Creative executive' : 'Assign creative executive'}
                        value={this.editSelectedExecutive ? this.editSelectedExecutive.name : ''}
                        align="left"
                    >
                        <OptionsList
                            onChange={this.handleExecutiveChange}
                            label="Select creative executive"
                            value={this.editSelectedExecutiveId ? this.editSelectedExecutiveId : 0}
                            options={[
                                ...this.clientExecutives.map(exec => ({
                                    value: exec.id,
                                    label: exec.name,
                                })),
                                ...(this.editSelectedExecutive !== null
                                    ? [{ value: 'separator', label: '------' }]
                                    : []),
                                {
                                    value: null,
                                    label:
                                        this.editSelectedExecutive !== null
                                            ? 'Deselect creative executive'
                                            : 'No creative executive',
                                },
                            ]}
                        />
                    </DropdownContainer>

                    <ButtonSave
                        float="right"
                        onClick={this.handleSave}
                        label="Save studio contact"
                        savingLabel="Saving studio contact"
                        isSaving={this.changingExecutive === 'saving'}
                    />

                    <ClearFix />
                </Col>
            </Row>
        );
    }

    private referenceExecutiveDropdown = (ref: DropdownContainer) => (this.executiveDropdown = ref);

    @action
    private handleEditingToggle = () => {
        if (this.isInEditMode) {
            this.isInEditMode = false;
            this.editSelectedExecutiveId = null;
        } else {
            this.editSelectedExecutiveId = this.selectedExecutive !== null ? this.selectedExecutive.id : null;
            this.isInEditMode = true;
        }
    };

    @action
    private handleExecutiveChange = (option: { value: OptionsListValuePropType; label: string }) => {
        if (option.value === null || typeof option.value === 'number') {
            this.editSelectedExecutiveId = option.value;
        }

        if (this.executiveDropdown && typeof this.executiveDropdown.closeDropdown === 'function') {
            this.executiveDropdown.closeDropdown();
        }
    };

    @action
    private handleSave = async () => {
        try {
            this.changingExecutive = 'saving';
            this.changingExecutive = 'saving';

            await ProjectsDetailsActions.changeProjectCampaignCreativeExecutive(
                this.props.projectId,
                this.props.projectCampaignId,
                this.editSelectedExecutiveId
            );

            this.changingExecutive = 'success';
            this.changingExecutive = 'none';

            this.isInEditMode = false;
        } catch (error) {
            this.changingExecutive = 'error';
        }
    };
}
