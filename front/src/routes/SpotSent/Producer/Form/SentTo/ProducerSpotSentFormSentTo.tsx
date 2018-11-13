import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { AppOnlyStoreState } from '../../../../../store/AllStores';
import { ClientContact } from '../../../../../types/clients';
import { action, computed, observable, reaction } from 'mobx';
import { Col, Row, Section } from '../../../../../components/Section';
import { ButtonClose, ButtonEdit, ButtonSave } from '../../../../../components/Button';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from '../../../../../components/Form';

// Styles
import * as styles from './ProducerSpotSentFormSentTo.scss';
import { ClientsActions } from '../../../../../actions';

// Props
interface Props {
    onContactAdd: (customer: ClientContact) => void;
    onContactRemove: (index: number) => void;
    projectCampaignId: number | null;
    assignedCustomers: ClientContact[];
}

// Types
type PropsTypes = Props & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProducerSpotSentFormSentTo extends React.Component<PropsTypes, {}> {

    @observable private customerOptionsList: ClientContact[] = [];
    @observable private customerOptionsListLoading: boolean = false;
    @observable private isInEditMode: boolean = false;
    @observable private selectedContact: {id: number | null, name: string | null} = {
        id: null,
        name: null
    };

    @computed
    private get savedContact(): ClientContact | null {
        if (this.selectedContact && this.selectedContact.id && this.customerOptionsList) {
            for (let i = 0; i < this.customerOptionsList.length; i++) {
                if (this.customerOptionsList[i].id === this.selectedContact.id) {
                    return this.customerOptionsList[i];
                }
            }
        }
        return null;
    }

    private sentToOptionsDropdown: DropdownContainer | null = null;

    public constructor(props: PropsTypes) {
        super(props);

        reaction(
            () => this.isInEditMode,
            isInEditMode => {
                if (isInEditMode) {
                    this.loadCustomerOptionsList();
                }
            }
        );
    }

    public render() {
        return (
            <div className={classNames(styles.studioContactsContainer, { [styles.editing]: this.isInEditMode })}>
                <Section
                    title="Sent to"
                    noSeparator={true}
                    headerElements={[
                        {
                            key: 'sent-to-edit-button',
                            element: (
                                <>
                                    {this.isInEditMode &&
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
                                                label={'Save'}
                                                labelColor={'blue'}
                                                isSaving={false}
                                            />
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
                    {this.renderSentToList()}
                </Section>
            </div>
        );
    }

    private referenceStudioContactOptionsDropdown = (ref: DropdownContainer) => (this.sentToOptionsDropdown = ref);

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
                    onChange={this.handleSentToContactsChange}
                    value={(this.selectedContact && this.selectedContact.id) ? this.selectedContact.id : 0}
                    label={'Select contacts'}
                    options={[
                        ...this.customerOptionsList
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
                    loadingOptions={this.customerOptionsListLoading}
                    loadingOptionsLabel={'Loading contacts...'}
                />
            </DropdownContainer>
        );
    }

    private renderSentToList(): JSX.Element {
        return (
            <Row>
                <Col>
                    <ul className={styles.contactsList}>
                        {!this.isInEditMode && this.props.assignedCustomers.length === 0 &&
                            <li>
                                <p>No contacts selected</p>
                            </li>
                        }

                        {this.props.assignedCustomers.length > 0 && this.props.assignedCustomers.map((contact: ClientContact, ind: number) => (
                            <li key={`sent-to-contact-${ind}`}>
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

                        {this.isInEditMode &&
                            <li key={`sent-to-contact-${this.customerOptionsList.length + 1}`}>
                                {this.renderDropdownList()}
                            </li>
                        }
                    </ul>
                </Col>
            </Row>
        );
    }

    @action
    private handleEditingToggle = (): void => {
        this.isInEditMode = !this.isInEditMode;
    };

    @action
    private loadCustomerOptionsList = async () => {
        try {
            if (this.props.projectCampaignId) {
                this.customerOptionsListLoading = true;
                this.customerOptionsList = await ClientsActions.fetchCustomerContactsForProjectCampaign(this.props.projectCampaignId);
                this.customerOptionsListLoading = false;
            }
        } catch (e) {
            throw e;
        }
    };

    @action
    private handleSentToContactsChange = (option: { value: OptionsListValuePropType; label: string }) => {
        if (option.value === null || typeof option.value === 'number') {
            this.selectedContact = {
                id: option.value,
                name: option.label
            };
        }

        if (this.sentToOptionsDropdown && typeof this.sentToOptionsDropdown.closeDropdown === 'function') {
            this.sentToOptionsDropdown.closeDropdown();
        }
    };

    @action
    private onAssignContactHandler = () => {
        if (this.selectedContact && this.selectedContact.id) {
            if (this.savedContact) {
                this.props.onContactAdd(this.savedContact);
            }
            this.selectedContact = {
                id: null,
                name: null
            };
        }
    };

    @action
    private onRemoveContactHandler = (ind: number) => {
        if (ind > -1 && this.customerOptionsList[ind] && this.customerOptionsList[ind].id) {
            this.props.onContactRemove(ind);
            this.selectedContact = {
                id: null,
                name: null
            };
        }
    };

    private existingContactsFlatIds(): number[] {
        if (this.props.assignedCustomers) {
            return this.props.assignedCustomers.map((contact: ClientContact) => {
                return contact.id;
            });
        }
        return [];
    }

}
