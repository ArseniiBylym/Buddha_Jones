import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { AppOnlyStoreState } from '../../../../../store/AllStores';
import { ClientContact } from '../../../../../types/clients';
import { action, observable } from 'mobx';
import { Col, Row, Section } from '../../../../../components/Section';
import { Button, ButtonClose, ButtonEdit, ButtonLabel } from '../../../../../components/Button';
import { LoadingIndicator } from '../../../../../components/Loaders';
import { Paragraph } from '../../../../../components/Content';

// Styles
import * as styles from './ProjectBoardCampaignStudioContacts.scss';
import { ProjectBoardCampaignStudioContactsForm } from './ProjectBoardCampaignStudioContactsForm';

// Props
interface ProjectBoardCampaignStudioContactsProps {
    customerId: number | null;
    contactsData: ClientContact[];
    contactsLoading: boolean;
    onUpdateContacts: () => void | null;
}

// Types
type ProjectBoardCampaignStudioContactsPropsTypes = ProjectBoardCampaignStudioContactsProps & AppOnlyStoreState;

// Component
@observer
export class ProjectBoardCampaignStudioContacts extends React.Component<ProjectBoardCampaignStudioContactsPropsTypes, {}> {

    @observable private isInEditMode: boolean = false;
    @observable private isStudioContactFormShow: boolean = false;

    public render() {
        return (
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
                                        <Button
                                            className={styles.newStudioContactButton}
                                            onClick={this.onStudioContactFormShowToggleHandler}
                                            label={this.getAddNewStudioContactButtonLabel()}
                                        />
                                    }
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
                    ]}
                >
                    {this.props.contactsLoading ? (
                        <LoadingIndicator label="Loading studio contacts"/>
                    ) : (
                        this.renderStudioContactsList()
                    )}
                </Section>
            </div>
        );
    }

    private renderStudioContactsList(): JSX.Element {
        return (
            <>
                <Row>
                    <Col>
                        {this.props.contactsData.length === 0 &&
                            <div className={styles.noContacts}>
                                <Paragraph
                                    align="left"
                                    type={'dim'}
                                >
                                    <span>Studio has no contacts</span>
                                </Paragraph>
                            </div>
                        }

                        {this.props.contactsData.length > 0 && (
                            <ul className={styles.contactsList}>
                                {this.props.contactsData.map((contact: ClientContact, ind: number) => (
                                    <li key={`studio-contact-${ind}`}>
                                        <span className={styles.container}>
                                            <p className={styles.name}>{contact.name}</p>
                                            <p className={styles.title}>
                                                <span>{(contact.title) ? contact.title : 'No role assigned'}</span>
                                            </p>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Col>
                </Row>

                {
                    this.isStudioContactFormShow &&
                    <Row>
                        <div className={styles.colWrapper}>
                            <ProjectBoardCampaignStudioContactsForm
                                onUpdateContacts={this.props.onUpdateContacts}
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
    private handleEditingToggle = (): void => {
        this.isInEditMode = !this.isInEditMode;
    };

    @action
    private onStudioContactFormShowToggleHandler = (): void => {
        this.isStudioContactFormShow = !this.isStudioContactFormShow;
    };

    private getAddNewStudioContactButtonLabel(): ButtonLabel {
        return {
            text: 'New studio contact',
            size: 'small',
            color: 'black',
            onLeft: false,
        };
    }

/*    private referenceChannelSelectorDropdown = (ref: DropdownContainer) => (this.channelDropdown = ref);

    @action
    private handleProjectBoardPermissionToggle = () => {
        this.approvedByBilling = !this.approvedByBilling;
    };

    @action
    private setInitialLocalState = (props: ProjectBoardCampaignChannelPropsTypes) => {
        this.approvedByBilling = props.approvedByBilling;
        this.channelId = props.channelId;
        this.channelName = props.channelName;
    };

    @action
    private handleCampaignChannelEdit = async () => {
        this.isInEditMode = true;
        try {
            this.channelOptions = (await ChannelsActions.fetchChannelsByCampaignId(this.props.campaignId) as ChannelsList);
        } catch (error) {
            throw error;
        }
    };

    @action
    private handleCampaignChannelCancel = () => {
        this.setInitialLocalState(this.props);
        this.isInEditMode = false;
        this.saveStatus = 'default';
    };

    @action
    private handleChannelSelectorChange = (option: ProjectBoardCampaignChannelSelected) => {
        this.channelId = option.value;
        this.channelName = option.label;
        if (this.channelDropdown) {
            this.channelDropdown.closeDropdown();
        }
    };

    @action
    private handleSaveChanges = async () => {
        try {
            if (this.props.projectCampaignId && this.channelId) {
                this.saveStatus = 'saving';
                await ChannelsActions.changeProjectCampaignChannel(
                    this.props.projectCampaignId,
                    this.props.customerId,
                    this.channelId,
                    this.approvedByBilling
                );
                this.saveStatus = 'success';
                this.isInEditMode = false;
            }
        } catch (error) {
            this.setInitialLocalState(this.props);
            this.saveStatus = 'error';
            throw error;
        }
    };*/

}
