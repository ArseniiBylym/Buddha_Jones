import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { AppOnlyStoreState } from '../../../../../store/AllStores';
import { ClientContact } from '../../../../../types/clients';
import { action, computed, observable, reaction } from 'mobx';
import { ClearFix, Col, Row, Section } from '../../../../../components/Section';
import { Button, ButtonClose, ButtonEdit, ButtonLabel, ButtonSave } from '../../../../../components/Button';
import { ProjectBoardCampaignStudioContactsForm } from './ProjectBoardCampaignStudioContactsForm';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from '../../../../../components/Form';
import { ClientsActions, ProjectsDetailsActions } from '../../../../../actions';

// Styles
import * as styles from './ProjectBoardCampaignStudioContacts.scss';
import { LoadingIndicator } from '../../../../../components/Loaders';

// Props
interface ProjectBoardCampaignStudioContactsProps {
    userCanViewExecutive: boolean;
    userCanEditExecutive: boolean;
    projectCampaignId: number;
    customerId: number | null;
    contactList: ClientContact[];
}

// Types
type ProjectBoardCampaignStudioContactsPropsTypes = ProjectBoardCampaignStudioContactsProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProjectBoardCampaignStudioContacts extends React.Component<ProjectBoardCampaignStudioContactsPropsTypes, {}> {

    @observable private contactList: ClientContact[] = [];
    @observable private isInEditMode: boolean = false;
    @observable private isStudioContactFormShow: boolean = false;
    @observable private isContactListLoading: boolean = false;
    @observable private status: string | null = null;
    @observable private selectedContact: {id: number | null, name: string | null} = {
        id: null,
        name: null
    };

    @computed
    private get studioContactsOptions(): {data: ClientContact[], loading: boolean} {
        let defaultReturn = {
            data: [],
            loading: false
        };
        if (this.props.store && this.props.customerId) {
            let clientMatch: number = this.props.store.clients.clientsDetailsFlatIds.findIndex(id => id === this.props.customerId);
            if (clientMatch !== -1 && this.props.store.clients.clientsDetails[clientMatch].contacts) {
                return {
                    data: this.props.store.clients.clientsDetails[clientMatch].contacts,
                    loading: this.props.store.clients.clientsDetails[clientMatch].loading
                };
            } else {
                return defaultReturn;
            }
        }
        return defaultReturn;
    }

    @computed
    private get savedContact(): ClientContact | null {
        if (this.props.store && this.selectedContact && this.selectedContact.id && this.studioContactsOptions && this.studioContactsOptions.data) {
            for (let i = 0; i < this.studioContactsOptions.data.length; i++) {
                if (this.studioContactsOptions.data[i].id === this.selectedContact.id) {
                    return this.studioContactsOptions.data[i];
                }
            }
        }
        return null;
    }

    private studioContactOptionsDropdown: DropdownContainer | null = null;

    public constructor(props: ProjectBoardCampaignStudioContactsPropsTypes) {
        super(props);

        reaction(
            () => this.isInEditMode,
            isInEditMode => {
                if (isInEditMode) {
                    this.loadStudioContactsOptions.call(this, false);
                }
            }
        );
    }

    public componentDidMount() {
        this.setInitialContactList(this.props.contactList);
    }

    public render() {
        return this.props.userCanViewExecutive || this.props.userCanEditExecutive ? (
            <div className={classNames(styles.studioContactsContainer, { [styles.editing]: this.isInEditMode })}>
                <Section
                    title="Studio contacts"
                    noSeparator={true}
                    headerElements={[
                        {
                            key: 'edit-studio-contacts-button',
                            element: (
                                <>
                                    {(this.isInEditMode && !this.isStudioContactFormShow) &&
                                        <>
                                            <ButtonClose
                                                float="right"
                                                onClick={this.handleEditingToggle}
                                                label={'Cancel'}
                                            />
                                            <ButtonSave
                                                className={styles.saveStudioContactButton}
                                                onClick={this.onAssignContactHandler}
                                                float="right"
                                                label={this.status === 'error' ? 'Could not save, please try again' : 'Save'}
                                                labelColor={this.status === 'error' ? 'orange' : 'blue'}
                                                savingLabel="Saving"
                                                isSaving={this.status === 'saving'}
                                            />
                                            <ClearFix/>
                                            {this.props.userCanEditExecutive &&
                                                <Button
                                                    className={styles.newStudioContactButton}
                                                    onClick={this.onStudioContactFormShowToggleHandler}
                                                    label={this.getAddNewStudioContactButtonLabel()}
                                                />
                                            }
                                        </>
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
                    ]}
                >
                    {this.isContactListLoading ? (
                        <LoadingIndicator label="Loading studio contacts"/>
                    ) : (
                        this.renderStudioContactsList()
                    )}
                </Section>
            </div>
        ) : null;
    }

    private referenceStudioContactOptionsDropdown = (ref: DropdownContainer) => (this.studioContactOptionsDropdown = ref);

    private renderDropdownList(): JSX.Element {
        return (
            <DropdownContainer
                ref={this.referenceStudioContactOptionsDropdown}
                label={'Select contacts'}
                value={(this.selectedContact && this.selectedContact.name) ? this.selectedContact.name : ''}
                align="left"
                minWidth={300}
                minHeight={200}
            >
                <OptionsList
                    onChange={this.handleStudioContactsChange}
                    value={(this.selectedContact && this.selectedContact.id) ? this.selectedContact.id : 0}
                    label={'Select contacts'}
                    options={[
                        ...this.studioContactsOptions.data
                            .filter((contact: ClientContact) => {
                                let contactMatch: number = this.existingContactsFlatIds().findIndex(id => id === contact.id);
                                return (contactMatch !== -1) ? false : true;
                            })
                            .map((contact: ClientContact) => {
                                return {
                                    value: contact.id,
                                    label: `${contact.name} - ${contact.title}`,
                                };
                            })
                    ]}
                    loadingOptions={this.studioContactsOptions.loading}
                    loadingOptionsLabel={'Loading contacts...'}
                />
            </DropdownContainer>
        );
    }

    private renderStudioContactsList(): JSX.Element {
        return (
            <>
                <Row>
                    <Col>
                        <ul className={styles.contactsList}>
                            {!this.isInEditMode && this.contactList.length === 0 &&
                                <li>
                                    <p>Studio has no contacts</p>
                                </li>
                            }

                            {this.contactList.length > 0 && this.contactList.map((contact: ClientContact, ind: number) => (
                                <li key={`studio-contact-${ind}`}>
                                    <span className={styles.container}>
                                        <p className={styles.name}>{contact.name}</p>
                                        <p className={styles.title}>
                                            <span>{(contact.title) ? contact.title : 'No role assigned'}</span>
                                            <span
                                                onClick={this.onRemoveContactHandler.bind(this, ind)}
                                                className={styles.studioContactRemoveButton}
                                            >
                                                &#x2716;
                                            </span>
                                        </p>
                                    </span>
                                </li>
                            ))}

                            {(this.isInEditMode && !this.isStudioContactFormShow) &&
                                <li key={`studio-contact-${this.contactList.length + 1}`}>
                                    {this.renderDropdownList()}
                                </li>
                            }
                        </ul>
                    </Col>
                </Row>

                {
                    this.isStudioContactFormShow &&
                    <Row>
                        <div className={styles.colWrapper}>
                            <ProjectBoardCampaignStudioContactsForm
                                onUpdateStudioContactOptions={this.loadStudioContactsOptions.bind(this, true)}
                                onToggleEditMode={this.onStudioContactFormShowToggleHandler}
                                customerId={this.props.customerId}
                            />
                        </div>
                    </Row>
                }

            </>
        );
    }

    @action
    private setInitialContactList = (contactList: ClientContact[]) => {
        this.contactList = contactList;
    };

    @action
    private handleEditingToggle = (): void => {
        this.isInEditMode = !this.isInEditMode;
    };

    @action
    private onStudioContactFormShowToggleHandler = (): void => {
        this.isStudioContactFormShow = !this.isStudioContactFormShow;
    };

    @action
    private handleStudioContactsChange = (option: { value: OptionsListValuePropType; label: string }) => {
        if (option.value === null || typeof option.value === 'number') {
            this.selectedContact = {
                id: Number(option.value),
                name: option.label
            };
        }

        if (this.studioContactOptionsDropdown && typeof this.studioContactOptionsDropdown.closeDropdown === 'function') {
            this.studioContactOptionsDropdown.closeDropdown();
        }
    };

    @action
    private onRemoveContactHandler = async (ind: number, event: any) => {
        if (ind > -1 && this.contactList[ind] && this.contactList[ind].id) {
            try {
                this.isContactListLoading = true;

                await ProjectsDetailsActions.changeProjectCampaignAssignCustomerContact(
                    this.props.projectCampaignId,
                    this.contactList[ind].id,
                    'remove'
                );

                this.contactList.splice(ind, 1);
                this.isContactListLoading = false;
                this.selectedContact = {
                    id: null,
                    name: null
                };
            } catch (error) {
                throw error;
            }
        }
    };

    @action
    private onAssignContactHandler = async (event: any) => {
        event.preventDefault();
        if (this.selectedContact && this.selectedContact.id) {
            try {
                this.isContactListLoading = true;
                this.status = 'saving';

                await ProjectsDetailsActions.changeProjectCampaignAssignCustomerContact(
                    this.props.projectCampaignId,
                    this.selectedContact.id,
                    'add'
                );

                this.status = 'success';
                if (this.savedContact) {
                    this.contactList.push(this.savedContact);
                }
                this.isContactListLoading = false;
                this.selectedContact = {
                    id: null,
                    name: null
                };
            } catch (error) {
                this.status = 'error';
                throw error;
            }
        }
    };

    private getAddNewStudioContactButtonLabel(): ButtonLabel {
        return {
            text: 'New studio contact',
            size: 'small',
            color: 'black',
            onLeft: false,
        };
    }

    private loadStudioContactsOptions = (force: boolean = false, e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.customerId) {
            ClientsActions.fetchCustomerDetails(this.props.customerId, force);
        }
    };

    private existingContactsFlatIds(): number[] {
        if (this.props.contactList) {
            return this.props.contactList.map((contact: ClientContact) => {
                return contact.id;
            });
        }
        return [];
    }

}
