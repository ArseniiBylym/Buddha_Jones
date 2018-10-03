import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { HeaderActions, CampaignPeopleActions, ClientsActions, SpotSentActions } from 'actions';
import { ProducerSpotSentFormProject } from './ProducerSpotSentFormProject';
import { ProjectPickerValues } from 'components/Buddha';
import { ButtonBack, ButtonAdd, ButtonSend } from 'components/Button';
import { history } from 'App';
import AnimateHeight from 'react-animate-height';
import { SpotSentVia, SpotSentSpot } from 'types/spotSent';
import { Section } from 'components/Section';
import { AppOnlyStoreState } from 'store/AllStores';
import { Paragraph } from 'components/Content';
import { ProducerSpotSentFormSpotCard } from '.';
import { Checkmark, TextArea, Toggle } from 'components/Form';
import { ClientContact } from 'types/clients';
import { LoadingIndicator } from 'components/Loaders';
import { ToggleSideContent } from '../../../../components/Form';
import { SentViaOption, SpotSentOptionsChildrenFromApi } from '../../../../types/spotSent';
import { ProjectPickerGroupValues } from '../../../../components/Buddha';
import { SpotSentStore } from '../../../../store/AllStores';
import { DatePicker } from '../../../../components/Calendar';

export interface ProducerSpotSentValue {
    date: Date;
    project: {
        selectedProject: ProjectPickerGroupValues | null;
        clientId: number;
    } | null;
    spots: SpotSentSpot[];
    sentVia: SpotSentVia[];
    studioContacts: number[];
    internalNotes: string;
    studioNotes: string;
}

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormProps {}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
class ProducerSpotSentForm extends React.Component<ProducerSpotSentFormPropsTypes, {}> {
    @observable
    private values: ProducerSpotSentValue = {
        date: new Date(),
        project: null,
        spots: [],
        sentVia: [],
        studioContacts: [],
        internalNotes: '',
        studioNotes: '',
    };

    @observable
    private spotSentValues = {
        full_lock: 0,
        notes: '',
        finishing_house: '',
        deadline: new Date()
    };

    @observable private finishingOptionId: number | null = 1;
    @observable private finishingOptionChildId: number | null = null;
    @observable private isFinishingTypeSectionOpen: boolean = false;
    @observable private isFinal: boolean = false;

    @computed
    private get clientContacts(): { isLoading: boolean; contacts: ClientContact[] } | null {
        if (this.values.project === null || this.values.project.clientId === null) {
            return null;
        }

        const { clientsDetails, clientsDetailsFlatIds } = this.props.store!.clients;

        const clientDetailsIndex = clientsDetailsFlatIds.indexOf(this.values.project.clientId);
        if (
            clientDetailsIndex !== -1 &&
            clientsDetails[clientDetailsIndex] &&
            clientsDetails[clientDetailsIndex].customer !== null
        ) {
            const details = clientsDetails[clientDetailsIndex];
            return {
                isLoading: details.loading,
                contacts: details.customer ? details.customer.contacts : [],
            };
        } else {
            return {
                isLoading: true,
                contacts: [],
            };
        }
    }

    @computed
    private get fetchedFinishingOptionsChildren(): SpotSentOptionsChildrenFromApi[] | null {
        if (SpotSentStore.spotSentOptions && SpotSentStore.spotSentOptions.finishing_option) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < SpotSentStore.spotSentOptions.finishing_option.length; i++) {
                if (SpotSentStore.spotSentOptions.finishing_option[i].id === this.finishingOptionId) {
                    children = SpotSentStore.spotSentOptions.finishing_option[i].children;
                    break;
                }
            }
            return children;
        } else {
            return null;
        }
    }

    public componentDidMount() {

        // Fetch spot options
        SpotSentActions.fetchSpotSentOptions();

        HeaderActions.setMainHeaderTitlesAndElements('Initiate spot sent', null, null, null, [
            <ButtonBack
                key="button-back-to-list"
                onClick={this.handleBackButtonClick}
                label="Back to spots sent list"
            />,
        ]);
    }

    public render() {
        return (
            <>
                <ProducerSpotSentFormProject
                    onProjectChange={this.handleProjectChange}
                    onDateChange={this.handleDateChange}
                    project={this.values.project ? this.values.project.selectedProject : null}
                    clientId={this.values.project ? this.values.project.clientId : null}
                    date={this.values.date}
                />

                <AnimateHeight
                    height={
                        this.values.project !== null &&
                        this.values.project.selectedProject !== null &&
                        this.values.project.selectedProject.id
                            ? 'auto'
                            : 0
                    }
                >
                    <Section title="Spots">
                        {this.values.spots.map((spot, spotIndex) => (
                            <ProducerSpotSentFormSpotCard
                                key={spotIndex}
                                onSpotResendToggle={this.handleSpotResendToggle(spotIndex)}
                                onSpotRemove={this.handleSpotRemove(spotIndex)}
                                onSpotChange={this.handleSpotChange(spotIndex)}
                                onEditorAdd={this.handleSpotAddingEditor(spotIndex)}
                                project={this.values.project ? this.values.project.selectedProject : null}
                                clientId={this.values.project ? this.values.project.clientId : null}
                                spot={spot}
                                spotIndex={spotIndex}
                                forUserId={this.props.store!.user.data!.id}
                            />
                        ))}

                        {this.values.spots.length <= 0 && <Paragraph type="dim">No spots have been added.</Paragraph>}

                        <div className={s.spotsSummary}>
                            <ButtonAdd onClick={this.handleCreateSpot} label="Add spot" labelOnLeft={true} />
                        </div>
                    </Section>

                    <Section title="Sent via">
                        <div className={s.sentViaMethodsContainer}>
                            {this.sentViaMethods.map((sentVia: SentViaOption) => (
                                <Checkmark
                                    key={sentVia.key}
                                    onClick={this.handleSentViaMethodToggle(sentVia.key)}
                                    checked={sentVia.isSelected}
                                    label={sentVia.name}
                                    type={'no-icon'}
                                />
                            ))}
                        </div>
                    </Section>

                    <Section title="Finish Request">
                        <Checkmark
                            onClick={this.showHideFinishingTypeSection}
                            checked={this.isFinishingTypeSectionOpen}
                            label={'Show details'}
                            type={'no-icon'}
                        />
                        <AnimateHeight
                            height={(this.isFinishingTypeSectionOpen) ? 'auto' : 0}
                        >
                            <div style={{marginTop: '30px'}}>
                                <div className={s.typeFinishingOptions}>
                                    {this.getTypeFinishingChildren()}
                                </div>
                                <Toggle
                                    onChange={this.handleTogglingRequest}
                                    toggleIsSetToRight={(this.finishingOptionId === 1) ? false : true}
                                    toggleOnLeft={{
                                        label: (SpotSentStore.spotSentOptions) ? SpotSentStore.spotSentOptions.finishing_option[0].name : '',
                                        value: (SpotSentStore.spotSentOptions) ? SpotSentStore.spotSentOptions.finishing_option[0].id : null
                                    }}
                                    toggleOnRight={{
                                        label: (SpotSentStore.spotSentOptions) ? SpotSentStore.spotSentOptions.finishing_option[1].name : '',
                                        value: (SpotSentStore.spotSentOptions) ? SpotSentStore.spotSentOptions.finishing_option[1].id : null
                                    }}
                                    align="left"
                                />
                            </div>
                            <div className={s.sentViaMethodsContainer} style={{marginTop: '30px'}}>
                                <Checkmark
                                    onClick={() => { this.spotSentValues.full_lock = 0; }}
                                    checked={(this.spotSentValues.full_lock === 0) ? true : false}
                                    label={'Soft Lock'}
                                    type={'no-icon'}
                                />
                                <Checkmark
                                    onClick={() => { this.spotSentValues.full_lock = 1; }}
                                    checked={(this.spotSentValues.full_lock === 1) ? true : false}
                                    label={'Hard Lock'}
                                    type={'no-icon'}
                                />
                            </div>
                            <DatePicker
                                key="date-picker"
                                onChange={this.handleDateChange}
                                label="Deadline"
                                value={this.spotSentValues.deadline}
                                align="left"
                                maxDate={new Date()}
                            />
                            <TextArea
                                value={this.spotSentValues.notes}
                                label="Notes..."
                                width={1152}
                                height={82}
                            />
                            {/*<TextArea
                                value={this.spotSentValues.finishing_house}
                                label="Finishing House..."
                                width={1152}
                                height={82}
                            />*/}

                        </AnimateHeight>
                    </Section>

                    <Section title="Sent to">
                        {this.clientContacts === null && <Paragraph type="dim">Project is not selected.</Paragraph>}

                        {this.clientContacts &&
                            this.clientContacts.isLoading && <LoadingIndicator label="Loading studio contacts" />}

                        {this.clientContacts &&
                            this.clientContacts.isLoading === false &&
                            this.clientContacts.contacts.length <= 0 && (
                                <Paragraph type="dim">Studio has no contacts.</Paragraph>
                            )}

                        {this.clientContacts &&
                            this.clientContacts.isLoading === false && (
                                <div className={s.studioContactsContainer}>
                                    {this.clientContacts.contacts.map(contact => (
                                        <Checkmark
                                            key={contact.id}
                                            onClick={this.handleSentToContactToggle(contact)}
                                            label={contact.name || contact.email || contact.id.toString()}
                                            checked={this.values.studioContacts.indexOf(contact.id) !== -1}
                                        />
                                    ))}
                                </div>
                            )}
                    </Section>

                    <Section title="Internal notes">
                        <TextArea
                            onChange={this.handleInternalNotesChange}
                            value={this.values.internalNotes}
                            label="Internal notes..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <Section title="Studio notes">
                        <TextArea
                            onChange={this.handleStudioNotesChange}
                            value={this.values.studioNotes}
                            label="Notes for the studio..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <Section>
                        <div className={s.summary}>
                            <Checkmark
                                onClick={this.handleFinalToggle}
                                checked={this.isFinal}
                                label="Ready to be sent"
                                labelOnLeft={true}
                                type={'no-icon'}
                            />

                            <ButtonSend
                                onClick={this.handleSubmit}
                                label={this.isFinal ? 'Upload and send' : 'Save draft'}
                                iconColor="orange"
                            />
                        </div>
                    </Section>
                </AnimateHeight>
            </>
        );
    }

    private handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/portal/studio/producer-spot-sent');
    };

    private handleDateChange = (date: Date | null) => {
        if (date !== null) {
            this.values.date = date;
        }
    };

    private handleProjectChange = (values: ProjectPickerValues | null) => {
        if (
            values &&
            values.project &&
            (this.values.project === null ||
                this.values.project.selectedProject === null ||
                this.values.project.selectedProject.id !== values.project.id)
        ) {
            this.createFirstSpot();
        } else if (values === null || values.project === null) {
            this.values.spots = [];
            this.values.sentVia = [];
            this.values.studioContacts = [];
            this.values.studioNotes = '';
            this.values.internalNotes = '';
        }

        if (values && this.values.project === null) {
            this.values.project = {
                selectedProject: null,
                clientId: 0,
            };
        }

        if (values && values.customerId) {
            this.values.project = {
                selectedProject: values.project,
                clientId: values.customerId,
            };

            if (values.customerId) {
                ClientsActions.fetchCustomerDetails(values.customerId);
            }
        } else {
            this.values.project = null;
        }
    };

    private handleSpotResendToggle = (spotIndex: number) => (checked: boolean) => {
        this.values.spots[spotIndex].isResend = checked;
    };

    private handleSpotRemove = (spotIndex: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        this.values.spots = [...this.values.spots.slice(0, spotIndex), ...this.values.spots.slice(spotIndex + 1)];
    };

    private handleCreateSpot = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.values.spots.push(this.defaultSpot);
    };

    private handleSpotChange = (spotIndex: number) => (values: ProjectPickerValues | null) => {
        if (values && values.projectCampaign) {
            CampaignPeopleActions.fetchEditorsFromProjectCampaign(values.projectCampaign.id);
        }

        this.values.spots[spotIndex].projectCampaign = values && values.projectCampaign ? values.projectCampaign : null;
        this.values.spots[spotIndex].spot = values && values.spot ? values.spot : null;
        this.values.spots[spotIndex].version = values && values.version ? values.version : null;
    };

    private handleSpotAddingEditor = (spotIndex: number) => (userId: number) => {
        if (this.values.spots[spotIndex].selectedEditorsIds.indexOf(userId) === -1) {
            this.values.spots[spotIndex].selectedEditorsIds.push(userId);
        }
    };

    private handleSentViaMethodToggle = (sentViaKey: SpotSentVia) => (checked: boolean) => {
        if (checked && this.values.sentVia.indexOf(sentViaKey) === -1) {
            this.values.sentVia.push(sentViaKey);
        } else if (checked === false) {
            const sentViaIndex = this.values.sentVia.findIndex(v => v === sentViaKey);
            if (sentViaIndex !== -1) {
                this.values.sentVia = [
                    ...this.values.sentVia.slice(0, sentViaIndex),
                    ...this.values.sentVia.slice(sentViaIndex + 1),
                ];
            }
        }
    };

    private handleSentToContactToggle = (contact: ClientContact) => (checked: boolean) => {
        if (checked && this.values.studioContacts.indexOf(contact.id) === -1) {
            this.values.studioContacts.push(contact.id);
        } else if (checked === false) {
            const studioContactIndex = this.values.studioContacts.indexOf(contact.id);
            if (studioContactIndex !== -1) {
                this.values.studioContacts = [
                    ...this.values.studioContacts.slice(0, studioContactIndex),
                    ...this.values.studioContacts.slice(studioContactIndex + 1),
                ];
            }
        }
    };

    private handleInternalNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.values.internalNotes = e.target.value;
    };

    private handleStudioNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.values.studioNotes = e.target.value;
    };

    private handleFinalToggle = (checked: boolean) => {
        this.isFinal = checked;
    };

    private handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };

    private createFirstSpot = () => {
        this.values.spots = [this.defaultSpot];
    };

    private get defaultSpot(): SpotSentSpot {
        return {
            projectCampaign: null,
            spot: null,
            version: null,
            isResend: false,
            selectedEditorsIds: [],
        };
    }

    private get sentViaMethods(): SentViaOption[] {
        return [
            {
                key: SpotSentVia.FiberFlex,
                name: 'Fiber/Flex',
                isSelected: this.values.sentVia.indexOf(SpotSentVia.FiberFlex) !== -1,
            },
            {
                key: SpotSentVia.Post,
                name: 'Post',
                isSelected: this.values.sentVia.indexOf(SpotSentVia.Post) !== -1,
            },
            {
                key: SpotSentVia.EmailLink,
                name: 'Email link',
                isSelected: this.values.sentVia.indexOf(SpotSentVia.EmailLink) !== -1,
            },
            {
                key: SpotSentVia.InternalLink,
                name: 'Internal link',
                isSelected: this.values.sentVia.indexOf(SpotSentVia.InternalLink) !== -1,
            },
            {
                key: SpotSentVia.InHousePresentation,
                name: 'In house presentation',
                isSelected: this.values.sentVia.indexOf(SpotSentVia.InHousePresentation) !== -1,
            },
        ];
    }

    private getTypeFinishingChildren(): JSX.Element[] {
        let fetchedFinishingOptionsChildren: SpotSentOptionsChildrenFromApi[] | null = this.fetchedFinishingOptionsChildren;
        if (fetchedFinishingOptionsChildren) {
            return fetchedFinishingOptionsChildren.map((children: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'type-finishing-children-' + index}
                        onClick={this.handleFinishingTypeChildSelect.bind(this, children.id)}
                        checked={(children.id === this.finishingOptionChildId) ? true : false}
                        label={children.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    @action
    private handleTogglingRequest = (isSetToRight: boolean, selectedSideContent: ToggleSideContent) => {
        this.finishingOptionId = (selectedSideContent.value as number);
        this.finishingOptionChildId = null;
    };

    @action
    private showHideFinishingTypeSection = (): void =>  {
        this.isFinishingTypeSectionOpen = !this.isFinishingTypeSectionOpen;
    };

    @action
    private handleFinishingTypeChildSelect = (finishingOptionChildId: number | null): void => {
        this.finishingOptionChildId = finishingOptionChildId;
    };

}

export default ProducerSpotSentForm;
