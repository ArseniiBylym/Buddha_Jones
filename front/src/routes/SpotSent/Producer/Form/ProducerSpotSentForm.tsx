import { CampaignPeopleActions, HeaderActions, SpotSentActions } from 'actions';
import { history } from 'App';
import { ProjectPickerValues } from 'components/Buddha';
import { ButtonAdd, ButtonBack } from 'components/Button';
import { Paragraph } from 'components/Content';
import { TextArea } from 'components/Form';
import { LoadingSpinner } from 'components/Loaders';
import { Section } from 'components/Section';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { ClientContact } from 'types/clients';
import { RemoveConfirmationModal } from '../../../../components/RemoveConfiramtionModal';
import { AppState } from '../../../../store/AllStores';
import { SpotSentVersionForSubmit } from '../../../../types/spotSentForm';
import FormJsonSection from './FormJsonSection';
import FormSendSection from './FormSendSection';
import ProducerSpotSentFormFinishRequest from './ProducerSpotSentFormFinishRequest';
import { ProducerSpotSentFormProject } from './ProducerSpotSentFormProject';
import { ProducerSpotSentFormSpotCard } from './ProducerSpotSentFormSpotCard';
import { ProducerSpotSentFormSentTo } from './SentTo/ProducerSpotSentFormSentTo';

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormProps {}

// Props
interface ProducerSpotSentFormState {
    currentSpotIndex: number;
    isRemoveConfirmationModalActive: boolean;
    prevLocation: string;
    files: [{ file_name: string; file_description: string }] | [];
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormProps & AppState;

// Component
@inject('store')
@observer
class ProducerSpotSentForm extends React.Component<ProducerSpotSentFormPropsTypes, ProducerSpotSentFormState> {
    constructor(props: ProducerSpotSentFormPropsTypes) {
        super(props);

        this.state = {
            currentSpotIndex: 0,
            isRemoveConfirmationModalActive: false,
            prevLocation: '',
            files: [],
        };
    }

    private get isFinishingTypeSectionOpen(): boolean {
        if (this.props.store && this.props.store.spotSent.spotSentDetails.spot_version instanceof Array) {
            return (this.props.store.spotSent.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).some(
                spot => spot.finish_request === 1
            );
        }
        return false;
    }

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

    private get assignedCustomers(): ClientContact[] {
        if (this.props.store) {
            const {
                spotSent: { spotSentDetails },
            } = this.props.store;
            return spotSentDetails && spotSentDetails.customer_contact
                ? (spotSentDetails.customer_contact as ClientContact[])
                : [];
        } else {
            return [];
        }
    }

    private getPrevLocation = () => {
        let prevLock: string | string[] | undefined = this.props.location && this.props.location.pathname.split('/');
        prevLock = prevLock && prevLock[prevLock.length - 1];
        return prevLock;
    };

    public componentDidMount() {
        // get prev location
        const lastLocation = this.getPrevLocation();
        if (lastLocation) {
            this.setState({
                prevLocation: lastLocation,
            });
        }

        // Fetch spot sent options
        SpotSentActions.fetchSpotSentOptions();

        // Load Spot Sent details if router has ID
        if (this.isEditMode) {
            this.setHeaderAndInitialData();
        } else {
            if (this.getPrevLocation() === 'graphics') {
                HeaderActions.replaceMainHeaderContent({
                    title: 'Graphics spot sent',
                    elements: [
                        <ButtonBack
                            key="button-back-to-list"
                            onClick={this.handleBackButtonClick}
                            label="Back to graphics spot sent"
                        />,
                    ],
                });
            } else {
                HeaderActions.replaceMainHeaderContent({
                    title: 'Initiate spot sent',
                    elements: [
                        <ButtonBack
                            key="button-back-to-list"
                            onClick={this.handleBackButtonClick}
                            label="Back to spots sent list"
                        />,
                    ],
                });
            }
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
                    isActive={this.state.isRemoveConfirmationModalActive}
                    onConfirmationModalClose={this.handleClosingSpotDeleteConfirmation}
                    onConfirmationSuccess={this.handleSpotRemove}
                    confirmationMessage={'Are you sure you want to delete this entry?'}
                />

                {this.essentialDataIsLoading && this.getLoadingSpinner()}
                {!this.essentialDataIsLoading && (
                    <ProducerSpotSentFormProject
                        onProjectChange={this.handleProjectChange}
                        onDateChange={SpotSentActions.handleDateChange}
                        project={
                            spotSentDetails.project_id
                                ? {
                                      id: spotSentDetails.project_id as number,
                                      name: spotSentDetails.project_name as string,
                                  }
                                : null
                        }
                        clientId={null}
                        date={spotSentDetails.spot_sent_date as Date}
                        isClosedWhenInit={this.isEditMode}
                    />
                )}

                <AnimateHeight height={spotSentDetails.project_id ? 'auto' : 0}>
                    {spotSentDetails.spot_version instanceof Array && (
                        <Section title="Spots" noSeparator={true}>
                            {(spotSentDetails.spot_version as SpotSentVersionForSubmit[]).map(
                                (spot: SpotSentVersionForSubmit, spotIndex: number) => {
                                    return (
                                        <ProducerSpotSentFormSpotCard
                                            key={spotIndex}
                                            onSpotRemove={this.onOpenRemoveConfirmationModalHandler}
                                            project={{
                                                id: spotSentDetails.project_id as number,
                                                name: spotSentDetails.project_name as string,
                                            }}
                                            clientId={null}
                                            spot={{
                                                projectCampaign: spot.project_campaign_id
                                                    ? {
                                                          id: spot.project_campaign_id as number,
                                                          name: spot.campaign_name as string,
                                                      }
                                                    : null,
                                                spot: spot.spot_id
                                                    ? {
                                                          id: spot.spot_id as number,
                                                          name: spot.spot_name as string,
                                                      }
                                                    : null,
                                                version: spot.version_id
                                                    ? {
                                                          id: spot.version_id as number,
                                                          name: spot.version_name as string,
                                                          finishAccept: spot.finish_accept === 1,
                                                          prodAccept: spot.prod_accept === 1,
                                                      }
                                                    : null,
                                                isResend: spot.spot_resend === 1 ? true : false,
                                                isPDF: spot.is_pdf === 1 ? true : false,
                                                isFinishingRequest: spot.finish_request === 1 ? true : false,
                                                selectedEditorsIds: spot.editors as number[],
                                                sentViaMethod: spot.sent_via_method
                                                    ? (spot.sent_via_method as number[])
                                                    : [],
                                                line_status_id: spot.line_status_id,
                                                sentGraphicsViaMethod: spot.graphics_sent_via_method
                                                    ? (spot.graphics_sent_via_method as number[])
                                                    : [],
                                                finishAccept: (spot.finish_accept === 1) ? true : false,
                                            }}
                                            spotIndex={spotIndex}
                                            forUserId={this.props.store!.user.data!.id}
                                            withGraphicsSection={this.state.prevLocation === 'graphics' ? true : false}
                                            updateFileList={this.updateFileList}
                                        />
                                    );
                                }
                            )}

                            {spotSentDetails.spot_version.length <= 0 && (
                                <Paragraph type="dim">No spots have been added.</Paragraph>
                            )}

                            {this.addSpotAllowed() && (
                                <div className={s.spotsSummary}>
                                    <ButtonAdd onClick={this.handleCreateSpot} label="Add spot" labelOnLeft={true} />
                                </div>
                            )}
                        </Section>
                    )}

                    {spotSentDetails.spot_version &&
                        spotSentDetails.spot_version.length > 0 &&
                        (spotSentDetails.spot_version[0] as SpotSentVersionForSubmit).project_campaign_id && (
                            <ProducerSpotSentFormSentTo
                                onContactAdd={this.handleSentToAdd}
                                onContactRemove={this.handleSentToRemove}
                                projectCampaignId={
                                    (spotSentDetails.spot_version[0] as SpotSentVersionForSubmit).project_campaign_id
                                }
                                assignedCustomers={this.assignedCustomers}
                            />
                        )}

                    <Section title="Internal notes">
                        <TextArea
                            onChange={SpotSentActions.handleTextChange.bind(this, 'internal_note')}
                            value={spotSentDetails.internal_note as string}
                            label="Internal notes..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <Section title="Studio notes">
                        <TextArea
                            onChange={SpotSentActions.handleTextChange.bind(this, 'studio_note')}
                            value={spotSentDetails.studio_note as string}
                            label="Notes for the studio..."
                            width={1152}
                            height={82}
                        />
                    </Section>

                    <AnimateHeight height={this.isFinishingTypeSectionOpen ? 'auto' : 0}>
                        <ProducerSpotSentFormFinishRequest />
                    </AnimateHeight>
                    <FormSendSection {...this.props} prevLocation={this.state.prevLocation} files={this.state.files} prodAccept={spotSentDetails.spot_version[0]} />
                </AnimateHeight>
                <FormJsonSection spotSentDetails={spotSentDetails} />
            </>
        );
    }

    private getLoadingSpinner = (): JSX.Element => <LoadingSpinner className={s.loadingSpinner} size={64} />;

    private handleBackButtonClick = () => {
        if (this.state.prevLocation === 'graphics') {
            history.push('/portal/graphics-spot-sent');
        } else if (this.state.prevLocation === 'spotPost') {
            history.push('/portal/spot-post-finish-request');
        } else {
            history.push('/portal/studio/producer-spot-sent-list');
        }
    };

    private handleClosingSpotDeleteConfirmation = () =>
        this.setState({
            isRemoveConfirmationModalActive: false,
        });

    private onOpenRemoveConfirmationModalHandler = (spotIndex: number) =>
        this.setState({
            isRemoveConfirmationModalActive: true,
            currentSpotIndex: spotIndex,
        });

    private handleProjectChange = (values: ProjectPickerValues | null) =>
        SpotSentActions.handleProjectChange(values, this.isEditMode);

    private handleSentToAdd = (customer: ClientContact): void => SpotSentActions.handleSentToAdd(customer);

    private handleSentToRemove = (index: number): void => SpotSentActions.handleSentToRemove(index);

    private handleSpotRemove = () => {
        SpotSentActions.handleSpotRemove(this.state.currentSpotIndex);
        this.setState({
            isRemoveConfirmationModalActive: false,
        });
    };

    private handleCreateSpot = () => SpotSentActions.handleCreateSpot();

    private setHeaderAndInitialData = async (): Promise<boolean> => {
        try {
            if (!this.props.match) {
                return false;
            }

            HeaderActions.replaceMainHeaderContent({
                title: 'Spot sent #' + this.props.match.params['id'],
                elements: [
                    <ButtonBack
                        key="button-back-to-list"
                        onClick={this.handleBackButtonClick}
                        label="Back to spots sent list"
                    />,
                ],
            });

            await this.fetchSpotSentDetails(this.props.match.params['id']);

            if (this.props.store) {
                const {
                    spotSent: { spotSentDetails },
                } = this.props.store;

                if (spotSentDetails.spot_version && spotSentDetails.spot_version.length > 0) {
                    (spotSentDetails.spot_version as SpotSentVersionForSubmit[]).forEach(
                        (spot: SpotSentVersionForSubmit) => {
                            CampaignPeopleActions.fetchEditorsFromProjectCampaign(spot.project_campaign_id as number);
                        }
                    );
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    private get isEditMode(): boolean {
        return this.props.match && this.props.match.params['id'] && this.props.match.params['id'] !== 'create';
    }

    private fetchSpotSentDetails = async (id: number): Promise<boolean> => {
        try {
            await SpotSentActions.fetchSpotSentDetails(id, true);
            return true;
        } catch (error) {
            throw error;
        }
    };

    private updateFileList = (arr: [{ file_name: string; file_description: string }] | []) => {
        this.setState({
            files: arr,
        });
    };

    private addSpotAllowed = () => {
        if (this.props.store) {
            let spots = this.props.store.spotSent.spotSentDetails.spot_version;
            if (spots && spots.length > 0) {
                const lastSpot: any = spots[spots.length - 1];
                if (!lastSpot.campaign_id || !lastSpot.spot_id) {
                    return false;
                }
            }
        }
        return true;
    };
}

export default ProducerSpotSentForm;
