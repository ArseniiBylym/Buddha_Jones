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

export interface SpotSentValueForSubmit {
    full_lock: 0 | 1;
    notes: string;
    finishing_house: string;
    deadline: Date;
    finishing_request: 0 | 1;
    music_cue_sheet: 0 | 1;
    audio_prep: 0 | 1;
    video_prep: 0 | 1;
    graphics_finish: 0 | 1;
    framerate: string | null;
    raster_size: string | null;
    spec_note: string;
    tag_chart: string;
    delivery_to_client_id: number | null;
    delivery_note: string;
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
    private spotSentValues: SpotSentValueForSubmit = {
        full_lock: 0,
        notes: '',
        finishing_house: '',
        deadline: new Date(),
        finishing_request: 0,
        music_cue_sheet: 0,
        audio_prep: 0,
        video_prep: 0,
        graphics_finish: 0,
        framerate: null,
        raster_size: null,
        spec_note: '',
        tag_chart: '',
        delivery_to_client_id: null,
        delivery_note: '',
    };

    @observable private finishingOptionId: number | null = 1;
    @observable private finishingOptionChildId: number | null = 1;
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
        if (SpotSentStore.spotSentFinishingOptions && SpotSentStore.spotSentFinishingOptions.length > 0) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < SpotSentStore.spotSentFinishingOptions.length; i++) {
                if (SpotSentStore.spotSentFinishingOptions[i].id === this.finishingOptionId) {
                    children = SpotSentStore.spotSentFinishingOptions[i].children;
                    break;
                }
            }
            return children;
        } else {
            return null;
        }
    }

    @computed
    private get fetchedDeliverToClientOptionsChildren(): SpotSentOptionsChildrenFromApi[] | null {
        if (SpotSentStore.spotSentDeliveryToClientOptions && SpotSentStore.spotSentDeliveryToClientOptions.length > 0) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < SpotSentStore.spotSentDeliveryToClientOptions.length; i++) {
                if (SpotSentStore.spotSentDeliveryToClientOptions[i].id === this.finishingOptionChildId) {
                    children = SpotSentStore.spotSentDeliveryToClientOptions[i].children;
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
                                        label: (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[0].name : '',
                                        value: (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[0].id : null
                                    }}
                                    toggleOnRight={{
                                        label: (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[1].name : '',
                                        value: (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[1].id : null
                                    }}
                                    align="left"
                                />
                            </div>
                            <div className={s.sentViaMethodsContainer} style={{marginTop: '30px', marginBottom: '15px'}}>
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
                            <div className={s.finishRequestSection}>
                                <h3>Notes</h3>
                                <TextArea
                                    value={this.spotSentValues.notes}
                                    label="Notes..."
                                    width={1152}
                                    height={82}
                                />
                            </div>
                            <div className={s.finishRequestSection}>
                                <DatePicker
                                    key="date-picker"
                                    onChange={this.handleDateChange}
                                    label="Deadline"
                                    value={this.spotSentValues.deadline}
                                    align="left"
                                    maxDate={new Date()}
                                />
                            </div>
                            {this.finishingOptionId === 1 &&
                                <div className={s.finishRequestSection}>
                                    <h3>Finishing House</h3>
                                    <TextArea
                                        value={this.spotSentValues.finishing_house}
                                        label="Finishing House..."
                                        width={1152}
                                        height={82}
                                    />
                                </div>
                            }
                            {this.finishingOptionId === 2 &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Framerate</h3>
                                        {this.getFrameRate()}
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Raster Size</h3>
                                        {this.getRasterSize()}
                                    </div>
                                </>
                            }
                            <div className={s.finishRequestSection}>
                                <h3>Some title</h3>
                                {this.finishingOptionId === 2 &&
                                    <Checkmark
                                        onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'finishing_request')}
                                        checked={(this.spotSentValues.finishing_request === 0) ? true : false}
                                        label={'GFX finishing request'}
                                        type={'no-icon'}
                                    />
                                }
                                <Checkmark
                                    onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'music_cue_sheet')}
                                    checked={(this.spotSentValues.music_cue_sheet === 0) ? true : false}
                                    label={'Music Cue Sheet'}
                                    type={'no-icon'}
                                />
                                {this.finishingOptionId === 1 &&
                                    <>
                                        <Checkmark
                                            onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'audio_prep')}
                                            checked={(this.spotSentValues.audio_prep === 0) ? true : false}
                                            label={'Audio prep'}
                                            type={'no-icon'}
                                        />
                                        <Checkmark
                                            onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'video_prep')}
                                            checked={(this.spotSentValues.video_prep === 0) ? true : false}
                                            label={'Video prep'}
                                            type={'no-icon'}
                                        />
                                        <Checkmark
                                            onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'graphics_finish')}
                                            checked={(this.spotSentValues.graphics_finish === 0) ? true : false}
                                            label={'Graphics Finish'}
                                            type={'no-icon'}
                                        />
                                    </>
                                }
                            </div>
                            {this.finishingOptionId === 2 && this.finishingOptionChildId === 2 &&
                                <div className={s.finishRequestSection}>
                                    <h3>Tag chart</h3>
                                    <TextArea
                                        value={this.spotSentValues.tag_chart}
                                        label="Tag chart..."
                                        width={1152}
                                        height={82}
                                    />
                                </div>
                            }
                            {this.finishingOptionId === 2 &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Spec sheet</h3>
                                        <input type="file" id="file" name="file" multiple={true} />
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Spec Notes</h3>
                                        <TextArea
                                            value={this.spotSentValues.spec_note}
                                            label="Spec Notes..."
                                            width={1152}
                                            height={82}
                                        />
                                    </div>
                                </>
                            }
                            {this.finishingOptionId === 2 &&
                            (this.finishingOptionChildId === 2 || this.finishingOptionChildId === 3) &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Delivery to client</h3>
                                        {this.getDeliveryToClientChildren()}
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Delivery Notes</h3>
                                        <TextArea
                                            value={this.spotSentValues.delivery_note}
                                            label="Delivery Notes..."
                                            width={1152}
                                            height={82}
                                        />
                                    </div>
                                </>
                            }
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

    private getDeliveryToClientChildren(): JSX.Element[] {
        let fetchedDeliverToClientOptionsChildren: SpotSentOptionsChildrenFromApi[] | null = this.fetchedDeliverToClientOptionsChildren;
        if (fetchedDeliverToClientOptionsChildren) {
            return fetchedDeliverToClientOptionsChildren.map((children: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'delivery-to-client-option-' + index}
                        onClick={() => { this.spotSentValues.delivery_to_client_id = children.id; }}
                        checked={(children.id === this.spotSentValues.delivery_to_client_id) ? true : false}
                        label={children.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private getFrameRate(): JSX.Element[] {
        if (SpotSentStore.spotSentFramerateOptions && SpotSentStore.spotSentFramerateOptions.length > 0) {
            return SpotSentStore.spotSentFramerateOptions.map((frameRate: string, index: number) => {
                return (
                    <Checkmark
                        key={'frame-rate-' + index}
                        onClick={() => { this.spotSentValues.framerate = frameRate; }}
                        checked={(this.spotSentValues.framerate === frameRate) ? true : false}
                        label={frameRate}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private getRasterSize(): JSX.Element[] {
        if (SpotSentStore.spotSentRasterSizeOptions && SpotSentStore.spotSentRasterSizeOptions.length > 0) {
            return SpotSentStore.spotSentRasterSizeOptions.map((rasterSize: string, index: number) => {
                return (
                    <Checkmark
                        key={'raster-size-' + index}
                        onClick={() => { this.spotSentValues.raster_size = rasterSize; }}
                        checked={(this.spotSentValues.raster_size === rasterSize) ? true : false}
                        label={rasterSize}
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
        this.finishingOptionChildId = 1;
    };

    @action
    private showHideFinishingTypeSection = (): void =>  {
        this.isFinishingTypeSectionOpen = !this.isFinishingTypeSectionOpen;
    };

    @action
    private handleFinishingTypeChildSelect = (finishingOptionChildId: number | null): void => {
        this.finishingOptionChildId = finishingOptionChildId;
    };

    @action
    private handleFinishingTypeCheckmarkSelect = (param: string): void => {
        if (this.spotSentValues[param] === 0) {
            this.spotSentValues[param] = 1;
        } else {
            this.spotSentValues[param] = 0;
        }
    };

}

export default ProducerSpotSentForm;
