import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { AppOnlyStoreState } from '../../../../../store/AllStores';
import { ClientContact } from '../../../../../types/clients';
import { action, observable } from 'mobx';
import { Col, Row, Section } from '../../../../../components/Section';
import { ButtonClose, ButtonEdit, ButtonSave } from '../../../../../components/Button';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from '../../../../../components/Form';

// Styles
import * as styles from './ProducerSpotSentFormSentTo.scss';
import { LoadingIndicator } from '../../../../../components/Loaders';

// Props
interface ProjectBoardCampaignStudioContactsProps {
    onContactAdd: (id: number) => void;
    onContactRemove: (index: number) => void;
    assignedCustomers: number[];
    customerOptionsList: ClientContact[];
}

// Types
type ProjectBoardCampaignStudioContactsPropsTypes = ProjectBoardCampaignStudioContactsProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProducerSpotSentFormSentTo extends React.Component<ProjectBoardCampaignStudioContactsPropsTypes, {}> {

    @observable private assignedCustomers: ClientContact[] = [];
    @observable private customerOptionsList: ClientContact[] = [];
    @observable private isInEditMode: boolean = false;
    @observable private isContactListLoading: boolean = false;
    @observable private selectedContact: {id: number | null, name: string | null} = {
        id: null,
        name: null
    };

    private sentToOptionsDropdown: DropdownContainer | null = null;

    public componentDidMount() {
        this.setInitialContactList(this.props);
    }

    public componentWillReceiveProps(nextProps: ProjectBoardCampaignStudioContactsPropsTypes) {
        if (this.props.assignedCustomers.length !== nextProps.assignedCustomers.length) {
            this.setInitialContactList(nextProps);
        }
    }

    public render() {
        return (
            <>
                <pre>
                    {JSON.stringify(this.assignedCustomers, null, 2)}
                </pre>
                <pre>
                    {JSON.stringify(this.customerOptionsList, null, 2)}
                </pre>
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
                        {this.isContactListLoading ? (
                            <LoadingIndicator label="Loading contacts"/>
                        ) : (
                            this.renderSentToList()
                        )}
                    </Section>
                </div>
            </>
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
                />
            </DropdownContainer>
        );
    }

    private renderSentToList(): JSX.Element {
        return (
            <Row>
                <Col>
                    <ul className={styles.contactsList}>
                        {!this.isInEditMode && this.assignedCustomers.length === 0 &&
                            <li>
                                <p>Studio has no contacts</p>
                            </li>
                        }

                        {this.assignedCustomers.length > 0 && this.assignedCustomers.map((contact: ClientContact, ind: number) => (
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
    private setInitialContactList = (props: ProjectBoardCampaignStudioContactsPropsTypes): void => {
        this.assignedCustomers = this.getAssignedCustomers(props.assignedCustomers);
        this.customerOptionsList = props.customerOptionsList;
    };

    @action
    private handleEditingToggle = (): void => {
        this.isInEditMode = !this.isInEditMode;
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
    private onRemoveContactHandler = (ind: number, event: any) => {
        event.preventDefault();
        if (ind > -1 && this.customerOptionsList[ind] && this.customerOptionsList[ind].id) {
            this.isContactListLoading = true;

            /*this.customerOptionsList.splice(ind, 1);*/
            this.props.onContactRemove(ind);
            this.selectedContact = {
                id: null,
                name: null
            };
        }
    };

    @action
    private onAssignContactHandler = (event: any) => {
        event.preventDefault();
        if (this.selectedContact && this.selectedContact.id) {
            this.isContactListLoading = true;

            this.props.onContactAdd(this.selectedContact.id);
            this.selectedContact = {
                id: null,
                name: null
            };
        }
    };

    private getAssignedCustomers = (assignedCustomers: number[]): ClientContact[] => {
        return this.props.customerOptionsList
            .filter((option: ClientContact) => {
                for (let i = 0; i < assignedCustomers.length; i++) {
                    if (assignedCustomers[i] === option.id) {
                        debugger;
                        return true;
                    }
                }
                return false;
            });
    };

    private existingContactsFlatIds(): number[] {
        if (this.props.customerOptionsList) {
            return this.props.customerOptionsList.map((contact: ClientContact) => {
                return contact.id;
            });
        }
        return [];
    }

}
