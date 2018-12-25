import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { HeaderActions, CampaignPeopleActions, SpotSentActions } from 'actions';
import { ProducerSpotSentFormProject } from './ProducerSpotSentFormProject';
import { ProjectPickerSections, ProjectPickerValues } from 'components/Buddha';
import { ButtonBack, ButtonAdd, ButtonSend } from 'components/Button';
import { history } from 'App';
import AnimateHeight from 'react-animate-height';
import { Section } from 'components/Section';
import { Paragraph } from 'components/Content';
import { ProducerSpotSentFormSpotCard } from '.';
import { Checkmark, TextArea } from 'components/Form';
import { ClientContact } from 'types/clients';
import { LoadingSpinner } from 'components/Loaders';
import { AppState } from '../../../../store/AllStores';
import { match } from 'react-router';
import * as dateFormat from 'date-fns/format';
import { ProducerSpotSentFormSentTo } from './SentTo/ProducerSpotSentFormSentTo';
import { RemoveConfirmationModal } from '../../../../components/RemoveConfiramtionModal';
import { SpotSentValueForSubmit, SpotSentVersionForSubmit } from '../../../../types/spotSentForm';
import ProducerSpotSentFormFinishRequest from './ProducerSpotSentFormFinishRequest';

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormProps {
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormProps & AppState;

// Component
@inject('store')
@observer
class ProducerSpotSentForm extends React.Component<ProducerSpotSentFormPropsTypes, {}> {
    @observable private currentSpotIndex: number = 0;
    @observable private isRemoveConfirmationModalActive: boolean = false;
    @observable private showJson: boolean = false;

    @computed
    private get isFinishingTypeSectionOpen(): boolean {
        if (!this.props.store) {
            return false;
        }
        return (this.props.store.spotSent.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).some(spot => spot.finish_request === 1);
    }

    @computed
    private get essentialDataIsLoading(): boolean {
        if (!this.props.store || !this.props.store.spotSent) {
            return true;
        }

        if (this.isEditMode) {
            return this.props.store.spotSent.spotSentDetailsLoading;
        } else {
            return false;
        }
    }

    @computed
    private get assignedCustomers(): ClientContact[] {
        if (this.props.store) {
            const {
                spotSent: {
                    spotSentDetails
                }
            } = this.props.store;
            return (spotSentDetails && spotSentDetails.customer_contact) ? spotSentDetails.customer_contact as ClientContact[] : [];
        } else {
            return [];
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
        if (!this.props.store) {
            return null;
        }
        const { spotSentDetails } = this.props.store.spotSent;
        return (
            <>
                <RemoveConfirmationModal
                    isActive={this.isRemoveConfirmationModalActive}
                    onConfirmationModalClose={this.handleClosingSpotDeleteConfirmation}
                    onConfirmationSuccess={this.handleSpotRemove}
                    confirmationMessage={'Are you sure you want to delete this entry?'}
                />

                {this.essentialDataIsLoading &&
                <>
                    {this.getLoadingSpinner()}
                </>
                }
                {!this.essentialDataIsLoading &&
                <ProducerSpotSentFormProject
                    onProjectChange={this.handleProjectChange}
                    onDateChange={SpotSentActions.handleDateChange}
                    project={(spotSentDetails.project_id) ? {
                        id: spotSentDetails.project_id as number,
                        name: spotSentDetails.project_name as string
                    } : null}
                    clientId={null}
                    date={spotSentDetails.spot_sent_date as Date}
                    isClosedWhenInit={this.isEditMode}
                />
                }

                <AnimateHeight
                    height={spotSentDetails.project_id ? 'auto' : 0}
                >
                    {spotSentDetails.spot_version instanceof Array &&
                    <Section title="Spots">
                        {(spotSentDetails.spot_version as SpotSentVersionForSubmit[]).map(
                            (spot: SpotSentVersionForSubmit, spotIndex: number) => {
                                return (
                                    <ProducerSpotSentFormSpotCard
                                        key={spotIndex}
                                        onSpotResendToggle={this.handleSpotResendToggle(spotIndex)}
                                        onSpotRemove={this.onOpenRemoveConfirmationModalHandler(spotIndex)}
                                        onSpotChange={this.handleSpotChange(spotIndex)}
                                        onFinishingRequestToggle={this.handleFinishingRequestToggle(spotIndex)}
                                        onSentViaMethodChange={this.handleSentViaMethodsChange(spotIndex)}
                                        onEditorAdd={this.handleSpotAddingEditor(spotIndex)}
                                        onEditorRemove={this.handleSpotRemovingEditor(spotIndex)}
                                        project={{
                                            id: spotSentDetails.project_id as number,
                                            name: spotSentDetails.project_name as string
                                        }}
                                        clientId={null}
                                        spot={{
                                            projectCampaign: (spot.project_campaign_id) ? {
                                                id: spot.project_campaign_id as number,
                                                name: spot.campaign_name as string
                                            } : null,
                                            spot: (spot.spot_id) ? {
                                                id: spot.spot_id as number,
                                                name: spot.spot_name as string
                                            } : null,
                                            version: (spot.version_id) ? {
                                                id: spot.version_id as number,
                                                name: spot.version_name as string,
                                                finishAccept: spot.finish_accept === 1,
                                                prodAccept: spot.prod_accept === 1,
                                            } : null,
                                            isResend: (spot.spot_resend === 1) ? true : false,
                                            isFinishingRequest: (spot.finish_request === 1) ? true : false,
                                            selectedEditorsIds: spot.editors as number[],
                                            sentViaMethod: (spot.sent_via_method) ? spot.sent_via_method as number[] : []
                                        }}
                                        spotIndex={spotIndex}
                                        forUserId={this.props.store!.user.data!.id}
                                        handleFinishAccept={this.handleFinishAccept(spotIndex)}
                                        handleProdAccept={this.handleProdAccept(spotIndex)}
                                    />
                                );
                            }
                        )}

                        {spotSentDetails.spot_version.length <= 0 &&
                        <Paragraph type="dim">No spots have been added.</Paragraph>}

                        <div className={s.spotsSummary}>
                            <ButtonAdd onClick={this.handleCreateSpot} label="Add spot" labelOnLeft={true}/>
                        </div>
                    </Section>
                    }

                    {
                        spotSentDetails.spot_version &&
                        spotSentDetails.spot_version.length > 0 &&
                        (spotSentDetails.spot_version[0] as SpotSentVersionForSubmit).project_campaign_id &&
                        <ProducerSpotSentFormSentTo
                            onContactAdd={this.handleSentToAdd}
                            onContactRemove={this.handleSentToRemove}
                            projectCampaignId={(spotSentDetails.spot_version[0] as SpotSentVersionForSubmit).project_campaign_id}
                            assignedCustomers={this.assignedCustomers}
                        />
                    }

                    <Section title="Internal notes">
                        <TextArea
                            onChange={SpotSentActions.handleTextChange.bind(this, 'internal_note')}
                            value={(spotSentDetails.internal_note as string)}
                            label="Internal notes..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <Section title="Studio notes">
                        <TextArea
                            onChange={SpotSentActions.handleTextChange.bind(this, 'studio_note')}
                            value={(spotSentDetails.studio_note as string)}
                            label="Notes for the studio..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <AnimateHeight
                        height={(this.isFinishingTypeSectionOpen) ? 'auto' : 0}
                    >
                        <ProducerSpotSentFormFinishRequest/>
                    </AnimateHeight>

                    <Section>
                        <div className={s.summary}>
                            <Checkmark
                                onClick={SpotSentActions.handleFinalToggle}
                                checked={spotSentDetails.status === 2}
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
                    <button
                        onClick={() => {
                            this.showJson = !this.showJson;
                        }}
                    >
                        Show/Hide JSON
                    </button>
                </Section>
                {this.showJson &&
                <Section>
                        <pre>
                            {JSON.stringify(spotSentDetails.spot_version instanceof Array, null, 2)}
                        </pre>
                    <pre>
                            {JSON.stringify(spotSentDetails, null, 2)}
                        </pre>
                </Section>
                }
            </>
        );
    }

    private handleClosingSpotDeleteConfirmation = (): void => {
        this.isRemoveConfirmationModalActive = false;
    };

    @action
    private onOpenRemoveConfirmationModalHandler = (spotIndex: number) => (): void => {
        this.isRemoveConfirmationModalActive = true;
        this.currentSpotIndex = spotIndex;
    };

    private getLoadingSpinner = (): JSX.Element => <LoadingSpinner className={s.loadingSpinner} size={64}/>;

    private handleBackButtonClick = () => history.push('/portal/studio/producer-spot-sent-list');

    private fetchSpotSentOptions = () => SpotSentActions.fetchSpotSentOptions();

    private handleProjectChange = (values: ProjectPickerValues | null) => SpotSentActions.handleProjectChange(values, this.isEditMode);

    private handleSpotResendToggle = (spotIndex: number) => (checked: boolean) => SpotSentActions.handleSpotResendToggle(spotIndex, checked);

    private handleSentToAdd = (customer: ClientContact): void => SpotSentActions.handleSentToAdd(customer);

    private handleSentToRemove = (index: number): void => SpotSentActions.handleSentToRemove(index);

    private handleSpotRemove = () => {
        SpotSentActions.handleSpotRemove(this.currentSpotIndex);
        this.isRemoveConfirmationModalActive = false;
    };

    private handleCreateSpot = () => SpotSentActions.handleCreateSpot();

    private handleFinishingRequestToggle = (spotIndex: number) =>
        (checked: boolean) =>
            SpotSentActions.handleFinishingRequestToggle(spotIndex, checked);

    private handleSpotChange = (spotIndex: number) =>
        (values: ProjectPickerValues | null, type?: ProjectPickerSections) =>
            SpotSentActions.handleSpotChange(spotIndex, values, type);

    private handleSentViaMethodsChange = (spotIndex: number) =>
        (method: number) =>
            SpotSentActions.handleSentViaMethodsChange(spotIndex, method);

    private handleSpotAddingEditor = (spotIndex: number) =>
        (userId: number) =>
            SpotSentActions.handleSpotAddingEditor(spotIndex, userId);

    private handleSpotRemovingEditor = (spotIndex: number) =>
        (editorIndex: number) =>
            SpotSentActions.handleSpotRemovingEditor(spotIndex, editorIndex);

    private handleFinishAccept = (spotIndex: number) =>
        (checked: boolean) =>
            SpotSentActions.handleFinishAccept(spotIndex, checked);

    private handleProdAccept = (spotIndex: number) =>
        (checked: boolean) =>
            SpotSentActions.handleProdAccept(spotIndex, checked);

    private handleSubmit = async () => {
        try {
            let data: SpotSentValueForSubmit = this.props.store!.spotSent.spotSentDetails;
            (data.spot_version as string) = JSON.stringify((data.spot_version as SpotSentVersionForSubmit[]).map((spot: SpotSentVersionForSubmit) => {
                delete spot.campaign_name;
                delete spot.spot_name;
                delete spot.version_name;
                return spot;
            }));
            (data.finish_option as string) = JSON.stringify(data.finish_option);
            (data.delivery_to_client as string) = JSON.stringify(data.delivery_to_client);
            (data.customer_contact as string) = JSON.stringify((data.customer_contact as ClientContact[]).map(contact => {
                return contact.id;
            }));
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

            if (this.props.store) {
                const {
                    spotSent: {
                        spotSentDetails
                    }
                } = this.props.store;

                if (spotSentDetails.spot_version && spotSentDetails.spot_version.length > 0) {
                    (spotSentDetails.spot_version as SpotSentVersionForSubmit[]).forEach((spot: SpotSentVersionForSubmit) => {
                        CampaignPeopleActions.fetchEditorsFromProjectCampaign(spot.project_campaign_id as number);
                    });
                }
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
        if (this.props.store && this.props.store.spotSent.spotSentDetails.status === 2) {
            return 'Upload and send';
        } else {
            return 'Save draft';
        }
    }

    private fetchSpotSentDetails = async (id: number): Promise<boolean> => {
        try {
            await SpotSentActions.fetchSpotSentDetails(id, true);
            return true;
        } catch (error) {
            throw error;
        }
    };
}

export default ProducerSpotSentForm;
