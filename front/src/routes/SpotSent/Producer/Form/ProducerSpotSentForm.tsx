import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { HeaderActions, CampaignPeopleActions, SpotSentActions } from 'actions';
import { ProducerSpotSentFormProject } from './ProducerSpotSentFormProject';
import { ProjectPickerValues } from 'components/Buddha';
import { ButtonBack, ButtonAdd, ButtonSend } from 'components/Button';
import { history } from 'App';
import AnimateHeight from 'react-animate-height';
import { SpotSentVia, SpotSentSpot } from 'types/spotSent';
import { Section } from 'components/Section';
import { Paragraph } from 'components/Content';
import { ProducerSpotSentFormSpotCard } from '.';
import { Checkmark, Input, TextArea, Toggle } from 'components/Form';
import { ClientContact } from 'types/clients';
import { LoadingIndicator, LoadingSpinner } from 'components/Loaders';
import { ToggleSideContent } from '../../../../components/Form';
import { SpotSentAudioOptionsFromApi, SpotSentOptionsChildrenFromApi } from '../../../../types/spotSent';
import { ProjectPickerGroupValues } from '../../../../components/Buddha';
import { AppState, SpotSentStore } from '../../../../store/AllStores';
import { DatePicker } from '../../../../components/Calendar';
import { FinishingHousesPicker } from '../../../../components/Buddha/FinishingHousesPicker';
import { match } from 'react-router';
import * as dateFormat from 'date-fns/format';

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
    project_id: number | null;
    project_name?: string | null;
    spot_version: SpotSentVersionForSubmit[] | string;
    finish_option?: SpotSentValueParentChildForSubmit | string;
    notes?: string;
    internal_note?: string;
    studio_note?: string;
    status?: 1 | 2;
    full_lock?: 0 | 1;
    spot_sent_date?: Date | string | null;
    deadline?: Date | string | null;
    finishing_house?: number | null;
    finishing_house_name?: string | null;
    framerate?: string | null;
    framerate_note?: string;
    raster_size?: string | null;
    raster_size_note?: string;
    music_cue_sheet?: 0 | 1;
    audio_prep?: 0 | 1;
    video_prep?: 0 | 1;
    spec_note?: string;
    spec_sheet_file?: JSON | null;
    tag_chart?: string;
    delivery_to_client?: SpotSentValueParentChildForSubmit | string | null;
    delivery_note?: string;
    audio?: number[];
    audio_note?: string;
    graphics_finish?: 0 | 1;
    gfx_finish?: 0 | 1;
    customer_contact?: number[];
}

export interface SpotSentValueParentChildForSubmit {
    parent: number;
    child: number;
}

export interface SpotSentVersionForSubmit {
    campaign_id: number | null;
    campaign_name?: string;
    spot_id: number | null;
    spot_name?: string;
    version_id: number | null;
    version_name?: string;
    editors: number[];
    spot_resend: 0 | 1;
    finish_request: 0 | 1;
    line_status_id: number | null;
    sent_via_method: number[] | null;
}

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormProps {}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormProps & AppState;

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
        project_id: null,
        project_name: null,
        spot_version: [],
        finish_option: {
            parent: 1,
            child: 1
        },
        notes: '',
        internal_note: '',
        studio_note: '',
        status: 1,
        full_lock: 0,
        deadline: null,
        spot_sent_date: null,
        finishing_house: null,
        finishing_house_name: null,
        framerate: null,
        framerate_note: '',
        raster_size: null,
        raster_size_note: '',
        music_cue_sheet: 0,
        audio_prep: 0,
        video_prep: 0,
        spec_note: '',
        spec_sheet_file: null,
        tag_chart: '',
        delivery_to_client: null,
        delivery_note: '',
        audio: [],
        audio_note: '',
        graphics_finish: 0,
        gfx_finish: 0,
        customer_contact: []
    };

    @observable private isFinishingTypeSectionOpen: boolean = false;
    @observable private showJson: boolean = false;

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
        if (SpotSentStore.spotSentFinishingOptions && SpotSentStore.spotSentFinishingOptions.length > 0 && this.spotSentValues.finish_option) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < SpotSentStore.spotSentFinishingOptions.length; i++) {
                if (SpotSentStore.spotSentFinishingOptions[i].id === (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent) {
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
        if (this.spotSentValues.finish_option && SpotSentStore.spotSentDeliveryToClientOptions && SpotSentStore.spotSentDeliveryToClientOptions.length > 0) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < SpotSentStore.spotSentDeliveryToClientOptions.length; i++) {
                if (SpotSentStore.spotSentDeliveryToClientOptions[i].id === (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).child) {
                    children = SpotSentStore.spotSentDeliveryToClientOptions[i].children;
                    break;
                }
            }
            return children;
        } else {
            return null;
        }
    }

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.isEditMode) {
            return SpotSentStore.spotSentDetailsLoading;
        } else {
            return false;
        }
    }

    public componentDidMount() {

        // Fetch spot sent options
        this.fetchSpotSentOptions();

        // Load Spot Sent details if router has ID
        if (this.isEditMode) {
            this.setHeaderAndInitialData();
        } else {
            HeaderActions.setMainHeaderTitlesAndElements('Initiate spot sent', null, null, null, [
                <ButtonBack
                    key="button-back-to-list"
                    onClick={this.handleBackButtonClick}
                    label="Back to spots sent list"
                />,
            ]);
        }

    }

    public render() {
        return (
            <>
                {this.essentialDataIsLoading &&
                    <>
                        {this.getLoadingSpinner()}
                    </>
                }
                {!this.essentialDataIsLoading &&
                    <ProducerSpotSentFormProject
                        onProjectChange={this.handleProjectChange}
                        onDateChange={this.handleDateChange}
                        project={(this.spotSentValues.project_id) ? {id: this.spotSentValues.project_id as number, name: this.spotSentValues.project_name as string} : null}
                        clientId={this.values.project ? this.values.project.clientId : null}
                        date={this.spotSentValues.spot_sent_date as Date}
                        isClosedWhenInit={this.isEditMode}
                    />
                }

                <AnimateHeight
                    height={this.spotSentValues.project_id ? 'auto' : 0}
                >
                    {this.spotSentValues.spot_version instanceof Array &&
                        <Section title="Spots">
                            {(this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).map((spot: SpotSentVersionForSubmit, spotIndex: number) => (
                                <ProducerSpotSentFormSpotCard
                                    key={spotIndex}
                                    onSpotResendToggle={this.handleSpotResendToggle(spotIndex)}
                                    onSpotRemove={this.handleSpotRemove(spotIndex)}
                                    onSpotChange={this.handleSpotChange(spotIndex)}
                                    onFinishingRequestToggle={this.handleFinishingRequestToggle(spotIndex)}
                                    onSentViaMethodChange={this.handleSentViaMethodsChange(spotIndex)}
                                    onEditorAdd={this.handleSpotAddingEditor(spotIndex)}
                                    project={{
                                        id: this.spotSentValues.project_id as number,
                                        name: this.spotSentValues.project_name as string
                                    }}
                                    clientId={this.values.project ? this.values.project.clientId : null}
                                    spot={{
                                        projectCampaign: (spot.campaign_id) ? {
                                            id: spot.campaign_id as number,
                                            name: spot.campaign_name as string
                                        } : null,
                                        spot: (spot.spot_id) ? {
                                            id: spot.spot_id as number,
                                            name: spot.spot_name as string
                                        } : null,
                                        version: (spot.version_id) ? {
                                            id: spot.version_id as number,
                                            name: spot.version_name as string
                                        } : null,
                                        isResend: (spot.spot_resend === 1) ? true : false,
                                        isFinishingRequest: (spot.finish_request === 1) ? true : false,
                                        selectedEditorsIds: spot.editors as number[],
                                        sentViaMethod: (spot.sent_via_method) ? spot.sent_via_method as number[] : []
                                    }}
                                    spotIndex={spotIndex}
                                    forUserId={this.props.store!.user.data!.id}
                                />
                            ))}

                            {/*{this.values.spots.length <= 0 && <Paragraph type="dim">No spots have been added.</Paragraph>}*/}
                            {this.spotSentValues.spot_version.length <= 0 && <Paragraph type="dim">No spots have been added.</Paragraph>}

                            <div className={s.spotsSummary}>
                                <ButtonAdd onClick={this.handleCreateSpot} label="Add spot" labelOnLeft={true}/>
                            </div>
                        </Section>
                    }

                    <Section title="Sent to">
                        {this.clientContacts === null && <Paragraph type="dim">Project is not selected.</Paragraph>}

                        {this.clientContacts &&
                        this.clientContacts.isLoading && <LoadingIndicator label="Loading studio contacts"/>
                        }

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
                            onChange={this.handleTextChange.bind(this, 'internal_note')}
                            value={(this.spotSentValues.internal_note as string)}
                            label="Internal notes..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <Section title="Studio notes">
                        <TextArea
                            onChange={this.handleTextChange.bind(this, 'studio_note')}
                            value={(this.spotSentValues.studio_note as string)}
                            label="Notes for the studio..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <AnimateHeight
                        height={(this.isFinishingTypeSectionOpen) ? 'auto' : 0}
                    >
                        <Section title="Finish Request">

                            <div style={{marginTop : '30px'}}>
                                <div className={s.typeFinishingOptions}>
                                    {this.getTypeFinishingChildren()}
                                </div>
                                <Toggle
                                    onChange={this.handleTogglingRequest}
                                    toggleIsSetToRight={(this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 1) ? false : true}
                                    toggleOnLeft={{
                                        label : (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[0].name : '',
                                        value : (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[0].id : null
                                    }}
                                    toggleOnRight={{
                                        label : (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[1].name : '',
                                        value : (SpotSentStore.spotSentFinishingOptions) ? SpotSentStore.spotSentFinishingOptions[1].id : null
                                    }}
                                    align="left"
                                />
                            </div>
                            <div className={s.sentViaMethodsContainer} style={{marginTop : '30px', marginBottom : '15px'}}>
                                <Checkmark
                                    onClick={() => {
                                        this.spotSentValues.full_lock = 0;
                                    }}
                                    checked={(this.spotSentValues.full_lock === 0) ? true : false}
                                    label={'Soft Lock'}
                                    type={'no-icon'}
                                />
                                <Checkmark
                                    onClick={() => {
                                        this.spotSentValues.full_lock = 1;
                                    }}
                                    checked={(this.spotSentValues.full_lock === 1) ? true : false}
                                    label={'Full Lock'}
                                    type={'no-icon'}
                                />
                            </div>
                            <div className={s.finishRequestSection}>
                                <h3>Notes</h3>
                                <TextArea
                                    onChange={this.handleTextChange.bind(this, 'notes')}
                                    value={(this.spotSentValues.notes as string)}
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
                                    value={(this.spotSentValues.deadline instanceof Date) ? (this.spotSentValues.deadline as Date) : null}
                                    align="left"
                                />
                            </div>
                            {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 1 &&
                                <div className={s.finishRequestSection}>
                                    <h3>Finishing House</h3>
                                    <FinishingHousesPicker
                                        onChange={this.handleExistingFinishingHouseSelected}
                                        onNewCreating={this.handleExistingFinishingHouseSelected}
                                        value={0}
                                        valueLabel=""
                                        align="left"
                                        label={(this.spotSentValues.finishing_house_name) ? this.spotSentValues.finishing_house_name : 'Select finishing house'}
                                        projectId={this.spotSentValues.finishing_house}
                                    />
                                </div>
                            }
                            {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Framerate</h3>
                                        <div className={s.sentViaMethodsContainer}>
                                            {this.getFrameRate()}
                                        </div>
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Framerate Notes</h3>
                                        <Input
                                            onChange={this.handleTextChange.bind(this, 'framerate_note')}
                                            value={(this.spotSentValues.framerate_note) as string}
                                            label="Framerate Notes..."
                                        />
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Raster Size</h3>
                                        <div className={s.sentViaMethodsContainer}>
                                            {this.getRasterSize()}
                                        </div>
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Raster Size Notes</h3>
                                        <Input
                                            onChange={this.handleTextChange.bind(this, 'raster_size_note')}
                                            value={(this.spotSentValues.raster_size_note as string)}
                                            label="Raster Size Notes..."
                                        />
                                    </div>
                                </>
                            }
                            <div className={s.finishRequestSection}>
                                <h3>Additional Finishing needs</h3>
                                <div className={s.sentViaMethodsContainer}>
                                    {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                                    <Checkmark
                                        onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'gfx_finish')}
                                        checked={(this.spotSentValues.gfx_finish === 1) ? true : false}
                                        label={'GFX finishing request'}
                                        type={'no-icon'}
                                    />
                                    }
                                    <Checkmark
                                        onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'music_cue_sheet')}
                                        checked={(this.spotSentValues.music_cue_sheet === 1) ? true : false}
                                        label={'Music Cue Sheet'}
                                        type={'no-icon'}
                                    />
                                    {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 1 &&
                                    <>
                                        <Checkmark
                                            onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'audio_prep')}
                                            checked={(this.spotSentValues.audio_prep === 1) ? true : false}
                                            label={'Audio prep'}
                                            type={'no-icon'}
                                        />
                                        <Checkmark
                                            onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'video_prep')}
                                            checked={(this.spotSentValues.video_prep === 1) ? true : false}
                                            label={'Video prep'}
                                            type={'no-icon'}
                                        />
                                        <Checkmark
                                            onClick={this.handleFinishingTypeCheckmarkSelect.bind(this, 'graphics_finish')}
                                            checked={(this.spotSentValues.graphics_finish === 1) ? true : false}
                                            label={'Graphics Finish'}
                                            type={'no-icon'}
                                        />
                                    </>
                                    }
                                </div>
                            </div>
                            {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Audio</h3>
                                        <div className={s.sentViaMethodsContainer}>
                                            {this.getAudioOptions()}
                                        </div>
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Audio Notes</h3>
                                        <Input
                                            onChange={this.handleTextChange.bind(this, 'audio_note')}
                                            value={(this.spotSentValues.audio_note) as string}
                                            label="Audio Notes..."
                                        />
                                    </div>
                                </>
                            }
                            {this.spotSentValues.finish_option &&
                            (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                            (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).child === 2 &&
                                <div className={s.finishRequestSection}>
                                    <h3>Tag chart</h3>
                                    <TextArea
                                        onChange={this.handleTextChange.bind(this, 'tag_chart')}
                                        value={(this.spotSentValues.tag_chart) as string}
                                        label="Tag chart..."
                                        width={1152}
                                        height={82}
                                    />
                                </div>
                            }
                            {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Spec sheet</h3>
                                        <input type="file" id="file" name="file" multiple={true}/>
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Spec Notes</h3>
                                        <TextArea
                                            onChange={this.handleTextChange.bind(this, 'spec_note')}
                                            value={(this.spotSentValues.spec_note as string)}
                                            label="Spec Notes..."
                                            width={1152}
                                            height={82}
                                        />
                                    </div>
                                </>
                            }
                            {this.spotSentValues.finish_option && (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                            ((this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).child === 2 ||
                                (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).child === 3) &&
                                <>
                                    <div className={s.finishRequestSection}>
                                        <h3>Delivery to client</h3>
                                        <div className={s.sentViaMethodsContainer}>
                                            {this.getDeliveryToClientChildren()}
                                        </div>
                                    </div>
                                    <div className={s.finishRequestSection}>
                                        <h3>Delivery Notes</h3>
                                        <Input
                                            onChange={this.handleTextChange.bind(this, 'delivery_note')}
                                            value={(this.spotSentValues.delivery_note) as string}
                                            label="Delivery Notes..."
                                        />
                                    </div>
                                </>
                            }
                        </Section>
                    </AnimateHeight>

                    <Section>
                        <div className={s.summary}>
                            <Checkmark
                                onClick={this.handleFinalToggle}
                                checked={this.spotSentValues.status === 2}
                                label="Ready to be sent"
                                labelOnLeft={true}
                                type={'no-icon'}
                            />

                            <ButtonSend
                                onClick={this.handleSubmit}
                                label={this.saveButtonText}
                                iconColor="orange"
                            />
                        </div>
                    </Section>
                </AnimateHeight>
                <Section>
                    <button onClick={() => { this.showJson = !this.showJson; }}>Show/Hide JSON</button>
                </Section>
                {this.showJson &&
                    <Section>
                        <pre>
                            {JSON.stringify(this.spotSentValues.spot_version instanceof Array, null, 2)}
                        </pre>
                        <pre>
                            {JSON.stringify(this.spotSentValues, null, 2)}
                            {/*{JSON.stringify(this.values, null, 2)}*/}
                        </pre>
                    </Section>
                }
            </>
        );
    }

    private getLoadingSpinner(): JSX.Element {
        return (
            <LoadingSpinner className={s.loadingSpinner} size={64} />
        );
    }

    private fetchSpotSentOptions = () => {
        SpotSentActions.fetchSpotSentOptions();
    };

    private handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/portal/studio/producer-spot-sent-list');
    };

    private handleDateChange = (date: Date | null) => {
        if (date !== null) {
            /*this.spotSentValues.deadline = dateFormat(date, 'MM/DD/YYYY');*/
            this.spotSentValues.deadline = date;
        }
    };

    @action
    private handleProjectChange = (values: ProjectPickerValues | null) => {
        if (values && values.project && values.project.id && values.project.name) {
            this.spotSentValues.project_id = values.project.id;
            this.spotSentValues.project_name = values.project.name;
            if (!this.isEditMode) {
                this.createFirstSpot();
            }
        } else {
            this.spotSentValues.project_id = null;
            this.spotSentValues.project_name = null;
        }
        /*if (
            values &&
            values.project &&
            (this.values.project === null ||
                this.values.project.selectedProject === null ||
                this.values.project.selectedProject.id !== values.project.id)
        ) {
            this.createFirstSpot();
        } else if (values === null || values.project === null) {
            this.values.spots = [];
            this.spotSentValues.spot_version = [];
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
            this.spotSentValues.project_id = null;
        }

        if (values && values.customerId) {
            this.values.project = {
                selectedProject: values.project,
                clientId: values.customerId,
            };
            this.spotSentValues.project_id = (values.project && values.project.id) ? values.project.id : null;

            if (values.customerId) {
                ClientsActions.fetchCustomerDetails(values.customerId);
            }
        } else {
            this.values.project = null;
            this.spotSentValues.project_id = null;
        }*/
    };

    private handleSpotResendToggle = (spotIndex: number) => (checked: boolean) => {
        /*this.values.spots[spotIndex].isResend = checked;*/

        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_resend = checked ? 1 : 0;
    };

    @action
    private handleFinishingRequestToggle = (spotIndex: number) => (checked: boolean) =>  {
        /*this.values.spots[spotIndex].isFinishingRequest = checked;*/

        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).finish_request = checked ? 1 : 0;
        this.isFinishingTypeSectionOpen = (this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).some(spot => spot.finish_request === 1);
    };

    @action
    private handleSpotRemove = (spotIndex: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        this.values.spots = [...this.values.spots.slice(0, spotIndex), ...this.values.spots.slice(spotIndex + 1)];

        this.spotSentValues.spot_version = [
            ...(this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).slice(0, spotIndex),
            ...(this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).slice(spotIndex + 1)
        ];

    };

    @action
    private handleCreateSpot = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.values.spots.push(this.defaultSpot);

        (this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).push(this.defaultSpotElement);
    };

    @action
    private handleSpotChange = (spotIndex: number) => (values: ProjectPickerValues | null) => {
        if (values && values.projectCampaign) {
            CampaignPeopleActions.fetchEditorsFromProjectCampaign(values.projectCampaign.id);
        }

        /*this.values.spots[spotIndex].projectCampaign = values && values.projectCampaign ? values.projectCampaign : null;
        this.values.spots[spotIndex].spot = values && values.spot ? values.spot : null;
        this.values.spots[spotIndex].version = values && values.version ? values.version : null;*/

        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).campaign_id = (values && values.projectCampaign && values.projectCampaign.id) ? values.projectCampaign.id : null;
        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).campaign_name = (values && values.projectCampaign && values.projectCampaign.name) ? values.projectCampaign.name : '';
        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_id = (values && values.spot && values.spot.id) ? values.spot.id : null;
        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_name = (values && values.spot && values.spot.name) ? values.spot.name : '';
        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).version_id = (values && values.version && values.version.id) ? values.version.id : null;
        (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).version_name = (values && values.version && values.version.name) ? values.version.name : '';

    };

    @action
    private handleSentViaMethodsChange = (spotIndex: number) => (method: number) => {
        /*this.values.spots[spotIndex].sentViaMethod = methods;*/
        const sentViaMethod: number[] = ((this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method as number[]);
        if (sentViaMethod.includes(method)) {
            const i: number = sentViaMethod.indexOf(method);
            if (i !== -1) {
                ((this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method as number[]).splice(i, 1);
            }
        } else if (!sentViaMethod.includes(method)) {
            ((this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method as number[]).push(method);
        }
        /*(this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method = methods;*/
    };

    @action
    private handleSpotAddingEditor = (spotIndex: number) => (userId: number) => {
/*        if (this.values.spots[spotIndex].selectedEditorsIds.indexOf(userId) === -1) {
            this.values.spots[spotIndex].selectedEditorsIds.push(userId);
        }*/

        if ((this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).editors.indexOf(userId) === -1) {
            (this.spotSentValues.spot_version[spotIndex] as SpotSentVersionForSubmit).editors.push(userId);
        }
    };

    @action
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

    @action
    private handleFinalToggle = (checked: boolean) => {
        this.spotSentValues.status = (checked) ? 2 : 1;
    };

    private handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            let data: SpotSentValueForSubmit = this.spotSentValues;
            (data.spot_version as string) = JSON.stringify((data.spot_version as SpotSentVersionForSubmit[]).map((spot: SpotSentVersionForSubmit) => {
                delete spot.campaign_name;
                delete spot.spot_name;
                delete spot.version_name;
                return spot;
            }));
            (data.finish_option as string) = JSON.stringify(data.finish_option);
            (data.delivery_to_client as string) = JSON.stringify(data.delivery_to_client);
            delete data.finishing_house_name;
            data.deadline = (data.deadline) ? dateFormat(data.deadline, 'YYYY-MM-DD') : null;
            if (this.isEditMode) {
                await SpotSentActions.updateSpotSent((this.props.match as match<string>).params['id'], data);
            } else {
                await SpotSentActions.createNewSpotSent(data);
            }
            history.push('/portal/studio/producer-spot-sent-list');
        } catch (error) {
            throw error;
        }
    };

    private createFirstSpot = () => {
        /*this.values.spots = [this.defaultSpot];*/
        this.spotSentValues.spot_version = [this.defaultSpotElement];
    };

    private get defaultSpot(): SpotSentSpot {
        return {
            projectCampaign: null,
            spot: null,
            version: null,
            isResend: false,
            selectedEditorsIds: [],
            isFinishingRequest: false,
            sentViaMethod: []
        };
    }

    private get defaultSpotElement(): SpotSentVersionForSubmit {
        return {
            campaign_id: null,
            spot_id: null,
            version_id: null,
            editors: [],
            spot_resend: 0,
            finish_request: 0,
            line_status_id: null,
            sent_via_method: []
        };
    }

    private getAudioOptions(): JSX.Element[] {
        if (SpotSentStore.spotSentAudioOptions && SpotSentStore.spotSentAudioOptions.length > 0) {
            return SpotSentStore.spotSentAudioOptions.map((audio: SpotSentAudioOptionsFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'audio-option-' + index}
                        onClick={() => {
                            if (this.spotSentValues.audio && this.spotSentValues.audio.includes(audio.id)) {
                                let i: number = this.spotSentValues.audio.indexOf(audio.id);
                                if (i !== -1) {
                                    this.spotSentValues.audio.splice(i, 1);
                                }
                            } else if (this.spotSentValues.audio && !this.spotSentValues.audio.includes(audio.id)) {
                                this.spotSentValues.audio.push(audio.id);
                            }}
                        }
                        checked={(this.spotSentValues.audio) ? this.spotSentValues.audio.includes(audio.id) : false}
                        label={audio.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private getTypeFinishingChildren(): JSX.Element[] {
        let fetchedFinishingOptionsChildren: SpotSentOptionsChildrenFromApi[] | null = this.fetchedFinishingOptionsChildren;
        if (fetchedFinishingOptionsChildren) {
            return fetchedFinishingOptionsChildren.map((children: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'type-finishing-children-' + index}
                        onClick={this.handleFinishingTypeChildSelect.bind(this, children.id)}
                        checked={(this.spotSentValues.finish_option && children.id === (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).child) ? true : false}
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
                        onClick={() => {
                            if (this.spotSentValues.delivery_to_client) { (this.spotSentValues.delivery_to_client as SpotSentValueParentChildForSubmit).child = children.id; }
                        }}
                        checked={(this.spotSentValues.delivery_to_client && children.id === (this.spotSentValues.delivery_to_client as SpotSentValueParentChildForSubmit).child) ? true : false}
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
    private setHeaderAndInitialData = async (): Promise<boolean> => {
        try {
            if (!this.props.match) {
                return false;
            }

            HeaderActions.setMainHeaderTitlesAndElements(`Spot Sent #${this.props.match.params['id']}`, null, null, null, [
                <ButtonBack
                    key="button-back-to-list"
                    onClick={this.handleBackButtonClick}
                    label="Back to spots sent list"
                />,
            ]);

            await this.fetchSpotSentDetails(this.props.match.params['id']);

            if ((this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).some((spot: SpotSentVersionForSubmit) => spot.finish_request === 1)) {
                this.isFinishingTypeSectionOpen = true;
            }

            if (this.spotSentValues.spot_version && this.spotSentValues.spot_version.length > 0) {
                (this.spotSentValues.spot_version as SpotSentVersionForSubmit[]).forEach((spot: SpotSentVersionForSubmit) => {
                    CampaignPeopleActions.fetchEditorsFromProjectCampaign(spot.campaign_id as number);
                });
            }

            return true;
        } catch (error) {
            throw error;
        }

    };

    private get isEditMode(): boolean {
        return (this.props.match && this.props.match.params['id'] && this.props.match.params['id'] !== 'create');
    }

    private get saveButtonText(): string {
        return (this.spotSentValues.status === 2) ? 'Upload and send' : 'Save draft';
    }

    @action
    private fetchSpotSentDetails = async (id: number): Promise<boolean> => {
        try {
            await SpotSentActions.fetchSpotSentDetails(id, true);
            this.spotSentValues = SpotSentStore.spotSentDetails as SpotSentValueForSubmit;
            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    private resetFinishRequestForm = (): void => {
        this.spotSentValues.full_lock = 0;
        this.spotSentValues.notes = '';
        this.spotSentValues.finishing_house = null;
        this.spotSentValues.finishing_house_name = null;
        this.spotSentValues.deadline = null;
        this.spotSentValues.gfx_finish = 0;
        this.spotSentValues.music_cue_sheet = 0;
        this.spotSentValues.audio_prep = 0;
        this.spotSentValues.video_prep = 0;
        this.spotSentValues.graphics_finish = 0;
        this.spotSentValues.framerate = null;
        this.spotSentValues.framerate_note = '';
        this.spotSentValues.raster_size = null;
        this.spotSentValues.raster_size_note = '';
        this.spotSentValues.spec_note = '';
        this.spotSentValues.spec_sheet_file = null;
        this.spotSentValues.tag_chart = '';
        this.spotSentValues.delivery_to_client = null;
        this.spotSentValues.delivery_note = '';
        this.spotSentValues.audio = [];
        this.spotSentValues.audio_note = '';
        this.spotSentValues.customer_contact = [];
    };

    @action
    private handleTogglingRequest = (isSetToRight: boolean, selectedSideContent: ToggleSideContent) => {
        this.spotSentValues.finish_option = {
            parent: (selectedSideContent.value as number),
            child: 1
        };
        this.resetFinishRequestForm();
    };

    @action
    private handleFinishingTypeChildSelect = (finishingOptionChildId: number | null): void => {
        if (this.spotSentValues.finish_option) {
            (this.spotSentValues.finish_option as SpotSentValueParentChildForSubmit).child = finishingOptionChildId as number;
        }
    };

    @action
    private handleFinishingTypeCheckmarkSelect = (param: string): void => {
        if (this.spotSentValues[param] === 0) {
            this.spotSentValues[param] = 1;
        } else {
            this.spotSentValues[param] = 0;
        }
    };

    @action
    private handleExistingFinishingHouseSelected = (finishingHouse: { id: number; name: string }) => {
        this.spotSentValues.finishing_house = finishingHouse.id;
        this.spotSentValues.finishing_house_name = finishingHouse.name;
    };

    @action
    private handleTextChange = (param: string, e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        this.spotSentValues[param] = e.target.value;
    };

}

export default ProducerSpotSentForm;
