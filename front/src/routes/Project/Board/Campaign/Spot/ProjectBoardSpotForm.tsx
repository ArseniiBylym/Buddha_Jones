import * as React from 'react';
import * as styles from './ProjectBoardSpotForm.scss';
import { observer, inject } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { AppOnlyStoreState } from 'store/AllStores';
import { Row, Col } from 'components/Section';
import { IconCheckmarkGreen } from 'components/Icons';
import { Button } from 'components/Button';
import {
    Input,
    TextArea,
    DropdownContainer,
    OptionsList,
    Toggle,
    Counter,
    OptionsListValuePropType,
    OptionsListOptionProp,
} from 'components/Form';
import { DatePicker } from 'components/Calendar';
import { ProjectsCampaignsSpotsActions, ProjectsDetailsActions } from 'actions';
import { SpotBillingType, SpotBillingTypeName } from 'types/projectDetailsEnums';
import { SpotDetails } from 'types/projectDetails';
import { TRTItem } from '../../../../../types/projectsCampaignsSpots';

interface Props {
    innerRef?: (ref: HTMLDivElement) => void;
    userCanEditSpot: boolean;
    userCanEditFirstStateCost: boolean;
    userCanEditV1InternalDueDate: boolean;
    userCanEditV1ClientDueDate: boolean;
    userCanEditRevisionsAndVersions: boolean;
    userCanEditGraphicsRevisions: boolean;
    onFormHide: (() => void) | null;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
    spotId?: number | null;
    removeGutter?: boolean;
    showTopSeparator?: boolean;
}

// Component
@inject('store')
@observer
export class ProjectBoardSpotForm extends React.Component<Props & AppOnlyStoreState, {}> {
    static get defaultProps(): Props {
        return {
            userCanEditSpot: false,
            userCanEditFirstStateCost: false,
            userCanEditV1InternalDueDate: false,
            userCanEditV1ClientDueDate: false,
            userCanEditRevisionsAndVersions: false,
            userCanEditGraphicsRevisions: false,
            onFormHide: null,
            projectId: 0,
            projectCampaignId: 0,
            campaignId: 0,
            spotId: null,
            removeGutter: false,
            showTopSeparator: true,
        };
    }

    @observable private spotStatus: 'none' | 'saving' | 'success' | 'error' | 'error-nameisrequired' = 'none';

    @observable
    private form: SpotDetails = {
        id: this.spot ? this.spot.id : 0,
        name: this.spot ? this.spot.name || '' : '',
        notes: this.spot ? this.spot.notes || '' : '',
        billingNotes: this.spot ? this.spot.billingNotes || '' : '',
        billingType: this.spot && this.spot.billingType ? this.spot.billingType : SpotBillingType.Billable,
        numberOfRevisions: this.spot ? this.spot.numberOfRevisions : null,
        firstRevisionCost: this.spot ? this.spot.firstRevisionCost : null,
        graphicsIncluded: this.spot ? this.spot.graphicsIncluded : false,
        v1InternalDeadline: this.spot ? this.spot.v1InternalDeadline : null,
        v1ClientDeadline: this.spot ? this.spot.v1ClientDeadline : null,
        versions: this.spot ? this.spot.versions : [],
        justAdded: false,
        trtId: this.spot ? this.spot.trtId : null
    };

    @computed
    private get spot(): SpotDetails | null {
        if (!this.props.store) {
            return null;
        }

        if (typeof this.props.spotId !== 'undefined' && this.props.spotId) {
            const projectIndex = this.props.store.projectsDetails.fetchedProjectsIdsFlat.indexOf(this.props.projectId);

            if (projectIndex !== -1) {
                const campaign = this.props.store.projectsDetails.fetchedProjects[projectIndex].campaigns.find(
                    c => c.projectCampaignId === this.props.projectCampaignId
                );

                if (typeof campaign !== 'undefined') {
                    return campaign.spots.find(spot => spot.id === this.props.spotId) || null;
                }
            }
        }

        return null;
    }

    @computed
    private get revisionsOptions(): OptionsListOptionProp[] {
        return [
            { value: 0, label: 'Not included' },
            { value: null, label: 'Unlimited' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
            { value: 9, label: '9' },
            { value: 10, label: '10' },
        ];
    }

    private revisionsDropdown: DropdownContainer | null = null;
    private TRTDropdown: DropdownContainer | null = null;
    private spotBillingDropdown: DropdownContainer | null = null;

    public componentDidMount() {
        if (this.getTrtListOptions().length === 0) {
            ProjectsCampaignsSpotsActions.fetchTRT();
        }
    }

    public render() {
        return this.props.spotId || this.props.userCanEditSpot ? (
            <Row
                key={'new-spot-fields-' + this.props.campaignId}
                innerRef={this.referenceFormContainer}
                className={styles.newSpotFields}
                removeMargins={true}
            >
                <Col removeGutter={this.props.removeGutter}>
                    {this.props.showTopSeparator && <hr/>}

                    {(typeof this.props.spotId === 'undefined' || this.props.spotId === null) && (
                        <p>Creating new spot:</p>
                    )}

                    <div className={styles.trtBlock}>
                        <DropdownContainer
                            ref={this.referenceTRTDropdown}
                            label="TRT"
                            value={this.getTrtValue()}
                        >
                            <OptionsList
                                onChange={this.handleTRTChange}
                                value={this.form.trtId}
                                options={this.getTrtListOptions()}
                            />
                        </DropdownContainer>
                    </div>

                    {this.props.userCanEditSpot && (
                        <Input
                            onChange={this.handleSpotNameChange}
                            value={this.form.name}
                            label="Spot name..."
                            autoFocus={true}
                        />
                    )}

                    {this.props.userCanEditSpot && (
                        <TextArea
                            className={styles.spotNotes}
                            onChange={this.handleSpotNotesChange}
                            value={this.form.notes || ''}
                            label="Spot notes..."
                            width={1152}
                            height={64}
                        />
                    )}

                    {(this.props.userCanEditV1ClientDueDate || this.props.userCanEditV1InternalDueDate) && (
                        <Row className={styles.spotDates}>
                            <Col>
                                {this.props.userCanEditV1InternalDueDate && (
                                    <DatePicker
                                        onChange={this.handleV1InternalDeadlineChange}
                                        closeOnChange={true}
                                        type="field"
                                        isAmerican={true}
                                        label="V.1 internal deadline"
                                        value={this.form.v1InternalDeadline}
                                        noValueText="No deadline"
                                        maxWidth={520}
                                    />
                                )}

                                {this.props.userCanEditV1ClientDueDate && (
                                    <DatePicker
                                        onChange={this.handleV1ClientDeadlineChange}
                                        closeOnChange={true}
                                        type="field"
                                        isAmerican={true}
                                        label="V.1 studio deadline"
                                        value={this.form.v1ClientDeadline}
                                        noValueText="No deadline"
                                        maxWidth={520}
                                    />
                                )}
                            </Col>
                        </Row>
                    )}

                    {(this.props.userCanEditRevisionsAndVersions || this.props.userCanEditGraphicsRevisions) && (
                        <div className={styles.revisionsContainer}>
                            <div>
                                {this.props.userCanEditRevisionsAndVersions && (
                                    <DropdownContainer
                                        ref={this.referenceRevisionsDropdown}
                                        label="Revisions"
                                        value={
                                            this.form.numberOfRevisions === null
                                                ? 'unlimited'
                                                : this.form.numberOfRevisions === 0
                                                ? 'none'
                                                : this.form.numberOfRevisions.toString()
                                        }
                                    >
                                        <OptionsList
                                            onChange={this.handleRevisionsCountChange}
                                            value={this.form.numberOfRevisions}
                                            options={this.revisionsOptions}
                                        />
                                    </DropdownContainer>
                                )}
                            </div>
                            <div>
                                {this.props.userCanEditGraphicsRevisions &&
                                this.form.numberOfRevisions !== 0 && (
                                    <Toggle
                                        align="right"
                                        label="Graphics included:"
                                        labelIsOnLeft={true}
                                        onChange={this.handleGraphicsIncludeToggle}
                                        toggleIsSetToRight={this.form.graphicsIncluded}
                                        toggleOnLeft={{
                                            value: false,
                                            label: 'No',
                                        }}
                                        toggleOnRight={{
                                            value: true,
                                            label: 'Yes',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {this.props.userCanEditFirstStateCost && (
                        <div className={styles.firstRevisionCostContainer}>
                            <DropdownContainer
                                ref={this.referenceSpotBillingDropdown}
                                label="Spot billing"
                                value={SpotBillingTypeName[this.form.billingType]}
                                type="field"
                            >
                                <OptionsList
                                    onChange={this.handleSpotBillingChange}
                                    value={this.form.billingType}
                                    options={[
                                        {
                                            value: SpotBillingType.Billable,
                                            label: SpotBillingTypeName[SpotBillingType.Billable],
                                        },
                                        {
                                            value: SpotBillingType.NonBillable,
                                            label: SpotBillingTypeName[SpotBillingType.NonBillable],
                                        },
                                        {
                                            value: SpotBillingType.SpecUnlessRevised,
                                            label: SpotBillingTypeName[SpotBillingType.SpecUnlessRevised],
                                        },
                                        {
                                            value: SpotBillingType.SpecRevisedBillable,
                                            label: SpotBillingTypeName[SpotBillingType.SpecRevisedBillable],
                                        },
                                    ]}
                                />
                            </DropdownContainer>

                            {this.form.billingType !== SpotBillingType.NonBillable && (
                                <Counter
                                    onChange={this.handleFirstStageCostChange}
                                    value={this.form.firstRevisionCost || 0}
                                    label="First stage rate:"
                                    readOnly={this.form.billingType === SpotBillingType.SpecUnlessRevised}
                                    fieldMaxWidth={512}
                                    multipleOf={0.01}
                                    incrementBy={100}
                                    decimals={2}
                                    showPlusMinus={false}
                                    minValue={0}
                                    readOnlyTextBeforeValue="$"
                                    showAddedTextOnInput={true}
                                />
                            )}

                            <TextArea
                                className={styles.spotNotes}
                                onChange={this.handleBillingNotesChange}
                                value={this.form.billingNotes || ''}
                                label="Billing notes..."
                                width={1152}
                                height={64}
                            />
                        </div>
                    )}

                    <Row className={styles.summary}>
                        <Col>
                            <Button
                                className={styles.cancelSpotFormButton}
                                onClick={this.handleSpotFormCancel}
                                label={{
                                    text: 'Cancel',
                                    color: 'orange',
                                    size: 'small',
                                }}
                            />
                        </Col>
                        <Col>
                            <Button
                                onClick={this.handleSpotSave}
                                float="right"
                                label={{
                                    text:
                                        this.spotStatus === 'none'
                                            ? typeof this.props.spotId !== 'undefined' && this.props.spotId
                                            ? 'Save changes'
                                            : 'Create spot'
                                            : this.spotStatus === 'saving'
                                            ? typeof this.props.spotId !== 'undefined' && this.props.spotId
                                                ? 'Saving changes...'
                                                : 'Creating spot...'
                                            : this.spotStatus === 'error'
                                                ? typeof this.props.spotId !== 'undefined' && this.props.spotId
                                                    ? 'Could not save, try again'
                                                    : 'Could not create, try again'
                                                : this.spotStatus === 'error-nameisrequired'
                                                    ? 'Spot name is required'
                                                    : this.spot !== null
                                                        ? 'Saved changes'
                                                        : 'Created spot',
                                    color:
                                        this.spotStatus === 'none'
                                            ? 'blue'
                                            : this.spotStatus === 'saving'
                                            ? 'black'
                                            : this.spotStatus === 'success'
                                                ? 'green'
                                                : 'orange',
                                    size: 'small',
                                    onLeft: true,
                                }}
                                icon={{
                                    element: <IconCheckmarkGreen width={24} height={24}/>,
                                    size: 'small',
                                    background: 'none',
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        ) : (
            <Row key={'new-spot-fields-' + this.props.campaignId} className={styles.newSpotFields} removeMargins={true}>
                <Col removeGutter={this.props.removeGutter}>
                    <Row className={styles.summary}>
                        <Col>
                            <Button
                                className={styles.cancelSpotFormButton}
                                onClick={this.handleSpotFormCancel}
                                label={{
                                    text: 'You have no permissions to create new spots - cancel',
                                    color: 'orange',
                                    size: 'small',
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    private getTrtValue(): string {
        const rttOption: OptionsListOptionProp[] = this.getTrtListOptions();

        if (rttOption.length === 0) {
            return 'Loading...';
        }

        if (!this.form.trtId) {
            return 'not selected';
        }

        const foundOption: OptionsListOptionProp | undefined = rttOption.find(
            (item: OptionsListOptionProp) => {
                return item.value === this.form.trtId;
            }
        );

        if (foundOption) {
            return foundOption.label;
        }

        return 'TRT list error';
    }

    private getTrtListOptions(): OptionsListOptionProp[] {
        if (this.props.store && this.props.store.projectsCampaignsSpots) {
            return this.props.store.projectsCampaignsSpots.trtList.map((item: TRTItem) => {
                return {
                    value: item.id,
                    label: item.runtime
                };
            });
        }

        return [];
    }

    private referenceFormContainer = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private referenceRevisionsDropdown = (ref: DropdownContainer) => (this.revisionsDropdown = ref);

    private referenceTRTDropdown = (ref: DropdownContainer) => (this.TRTDropdown = ref);

    private referenceSpotBillingDropdown = (ref: DropdownContainer) => (this.spotBillingDropdown = ref);

    @action
    private handleSpotNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.form.name = e.target.value;
    };

    @action
    private handleSpotNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.form.notes = e.target.value;
    };

    @action
    private handleBillingNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.form.billingNotes = e.target.value;
    };

    @action
    private handleV1InternalDeadlineChange = (date: Date | null) => {
        this.form.v1InternalDeadline = date;
    };

    @action
    private handleV1ClientDeadlineChange = (date: Date | null) => {
        this.form.v1ClientDeadline = date;
    };

    @action
    private handleRevisionsCountChange = (option: { value: OptionsListValuePropType; label: string }) => {
        this.form.numberOfRevisions = option.value as number | null;

        if (this.revisionsDropdown) {
            this.revisionsDropdown.closeDropdown();
        }
    };

    @action
    private handleTRTChange = (option: { value: OptionsListValuePropType; label: string }) => {
        this.form.trtId = Number(option.value);

        if (this.TRTDropdown) {
            this.TRTDropdown.closeDropdown();
        }
    };

    @action
    private handleGraphicsIncludeToggle = (isSetToRight: boolean) => {
        this.form.graphicsIncluded = isSetToRight;
    };

    @action
    private handleSpotBillingChange = (option: { value: OptionsListValuePropType; label: string }) => {
        this.form.billingType = option.value as SpotBillingType;

        if (this.spotBillingDropdown) {
            this.spotBillingDropdown.closeDropdown();
        }
    };

    @action
    private handleFirstStageCostChange = (count: { value: number; text: string }) => {
        this.form.firstRevisionCost = count.value;
    };

    private handleSpotFormCancel = () => {
        if (this.props.onFormHide) {
            this.props.onFormHide();
        }
    };

    @action
    private handleSpotSave = async () => {
        try {
            this.spotStatus = 'saving';

            if (this.form.name === null || this.form.name.trim() === '') {
                this.spotStatus = 'error-nameisrequired';
                throw new Error('Spot name is required');
            }

            await ProjectsDetailsActions.addOrUpdateSpotInProjectCampaign(
                this.props.projectId,
                this.props.projectCampaignId,
                this.form
            );

            this.spotStatus = 'success';
            if (this.props.onFormHide) {
                this.props.onFormHide();
            }

            setTimeout(() => {
                this.spotStatus = 'none';
            }, 2048);
        } catch (error) {
            if (this.spotStatus === 'saving') {
                this.spotStatus = 'error';
            }
        }
    };
}
