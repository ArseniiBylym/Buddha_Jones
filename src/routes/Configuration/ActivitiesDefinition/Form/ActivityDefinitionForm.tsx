import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HeaderActions, ActivitiesActions, UsersActions } from 'actions';
import { ButtonBack, ButtonSave } from 'components/Button';
import { history } from 'App';
import { AppState } from 'store/AllStores';
import { unformat } from 'accounting';
import { observable, computed, action } from 'mobx';
import { Activity, ActivityData } from 'types/activities';
import { Row, Col, Section } from 'components/Section';
import { LoadingSpinner } from 'components/Loaders';
import { Input, Select, ToggleButtonsValueProp, Checkmark } from 'components/Form';
import { Paragraph } from 'components/Content';
import { Table, TableRow, TableCell } from 'components/Table';
import { Modal } from 'components/Modals';
import { BottomBar } from 'components/Layout';

// Styles
const s = require('./ActivityDefinitionForm.css');

// Types
export enum ActivityTypeId {
    Billable = 1,
    NonBillableTimesheet = 2,
    Internal = 3,
}

type ActivityDefinitionFormPropsTypes = ActivityDefinitionFormProps & AppState;

// Props
interface ActivityDefinitionFormProps {
}

// Component
@inject('store')
@observer
class ActivityDefinitionForm extends React.Component<ActivityDefinitionFormPropsTypes, {}> {
    @observable
    private activity: ActivityData = {
        id: null,
        name: '',
        activityType: 1,
        isProjectCampaignRequired: false,
        isSpotVersionRequired: false,
        isDescriptionRequired: false,
        areFilesRequired: false,
        selectedUserTypesIds: [],
        isActive: true,
        isModified: false,
        uploadStatus: 'none',
    };

    @observable private showCancelModal: boolean = false;

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return this.props.store.activities.activitiesLoading
                ? true
                : this.props.store.activities.activitiesTypesLoading
                    ? true
                    : this.props.store.users.typesLoading;
        }

        return true;
    }

    @computed
    private get userTypesList(): Array<{ id: number; name: string; isSelected: boolean }> {
        if (this.props.store) {
            return this.props.store.users.types.map(type => ({
                id: type.id,
                name: type.name,
                isSelected: this.activity.selectedUserTypesIds.indexOf(type.id) !== -1,
            }));
        }

        return [];
    }

    @computed
    private get isAnyActivityVisibleToAnyUser(): boolean {
        return this.userTypesList.findIndex(u => u.isSelected) !== -1;
    }

    public constructor(props: ActivityDefinitionFormPropsTypes) {
        super(props);
    }

    public componentDidMount() {
        // Fetch required data
        Promise.all([
            ActivitiesActions.fetchActivityList(),
            ActivitiesActions.fetchActivitiesTypes(),
            UsersActions.fetchUsersTypes(),
        ]).then(() => {
            // Set header and initial data
            this.setHeaderAndInitialData();
        });
    }

    public componentDidUpdate(prevProps: ActivityDefinitionFormPropsTypes) {
        if (prevProps.location && this.props.location && prevProps.location.pathname !== this.props.location.pathname) {
            this.setHeaderAndInitialData();
        }
    }

    public render() {
        return !this.essentialDataIsLoading && this.props.store ? (
            <>
                <Row>
                    <Col size={4}>
                        <Paragraph bold={true} type="brown">
                            Activity name:
                        </Paragraph>
                        <Input
                            onChange={this.handleNameChange}
                            autoFocus={true}
                            value={this.activity.name}
                            label="Enter activity name"
                        />
                    </Col>

                    <Col size={4}>
                        <Paragraph bold={true} type="brown">
                            Type:
                        </Paragraph>
                        <Select
                            onChange={this.handleActivityTypeChange}
                            value={this.activity.activityType !== null ? this.activity.activityType.toString() : ''}
                            options={this.props.store.activities.activitiesTypes.map(activityType => ({
                                value: activityType.id.toString(),
                                label: activityType.name,
                            }))}
                        />
                    </Col>

                    <Col size={4}>
                        <Paragraph bold={true} type="brown">
                            Status:
                        </Paragraph>
                        <Select
                            onChange={this.handleStatusChange}
                            value={this.activity.isActive ? '1' : '0'}
                            options={[{ value: '0', label: 'Disabled' }, { value: '1', label: 'Enabled' }]}
                        />
                    </Col>
                </Row>

                <Section title="Activity requirements">
                    <Table type="compact" removeFirstRowTopPadding={true} removeLastRowBottomPadding={true}>
                        <TableRow>
                            <TableCell>
                                <Paragraph>Activity description</Paragraph>
                            </TableCell>
                            <TableCell align="right">
                                <Checkmark
                                    onClick={this.handleNotesRequirementChange}
                                    checked={this.activity.isDescriptionRequired}
                                    label={this.activity.isDescriptionRequired ? 'Required' : 'Not required'}
                                    labelOnLeft={true}
                                    type={'no-icon'}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Paragraph>Files worked on</Paragraph>
                            </TableCell>
                            <TableCell align="right">
                                <Checkmark
                                    onClick={this.handleFilesRequirementChange}
                                    checked={this.activity.areFilesRequired}
                                    label={this.activity.areFilesRequired ? 'Required' : 'Not required'}
                                    labelOnLeft={true}
                                    type={'no-icon'}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Paragraph>Project and campaign</Paragraph>
                            </TableCell>
                            <TableCell align="right">
                                <Checkmark
                                    onClick={this.handleProjectCampaignRequirementChange}
                                    checked={this.activity.isProjectCampaignRequired}
                                    label={this.activity.isProjectCampaignRequired ? 'Required' : 'Not required'}
                                    labelOnLeft={true}
                                    type={'no-icon'}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Paragraph>Spot and version</Paragraph>
                            </TableCell>
                            <TableCell align="right">
                                <Checkmark
                                    onClick={this.handleSpotVersionRequirementsChange}
                                    checked={this.activity.isSpotVersionRequired}
                                    label={this.activity.isSpotVersionRequired ? 'Required' : 'Not required'}
                                    labelOnLeft={true}
                                    type={'no-icon'}
                                />
                            </TableCell>
                        </TableRow>
                    </Table>
                </Section>

                {this.userTypesList.length > 0 && (
                    <Section
                        title="Enabled for user types"
                        headerElements={[
                            {
                                key: 'toggle-all',
                                element: (
                                    <Checkmark
                                        className={s.toggleAllUserTypesVisibility}
                                        onClick={this.handleAllUserTypesToggle}
                                        checked={this.isAnyActivityVisibleToAnyUser}
                                        labelOnLeft={true}
                                        label={
                                            this.isAnyActivityVisibleToAnyUser
                                                ? 'Hide for all users'
                                                : 'Show for all users'
                                        }
                                        type={'no-icon'}
                                    />
                                ),
                            },
                        ]}
                    >
                        <Table
                            type="compact"
                            removeFirstRowTopPadding={true}
                            removeLastRowBottomPadding={true}
                            className={s.userTypesTable}
                        >
                            {this.userTypesList.map(type => (
                                <TableRow key={type.id}>
                                    <TableCell align="left">
                                        <Paragraph type={type.isSelected ? 'default' : 'brown'}>
                                            <strong>{`#${type.id} - ${type.name}`}</strong>
                                        </Paragraph>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkmark
                                            onClick={this.handleUserTypeToggle(type.id)}
                                            checked={type.isSelected}
                                            label="Visible: "
                                            labelOnLeft={true}
                                            type={'no-icon'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    </Section>
                )}

                <BottomBar show={!!(this.activity.isModified && this.activity.name)}>
                    <div className={s.summary}>
                        <ButtonSave
                            onClick={this.handleSaveChanges}
                            labelColor={
                                this.activity.uploadStatus === 'none'
                                    ? 'blue'
                                    : this.activity.uploadStatus === 'success'
                                    ? 'green'
                                    : this.activity.uploadStatus === 'saving'
                                        ? 'black'
                                        : 'orange'
                            }
                            isSaving={this.activity.uploadStatus === 'saving'}
                            savingLabel="Saving"
                            label={
                                this.activity.uploadStatus === 'success'
                                    ? 'Saved successfully'
                                    : this.activity.uploadStatus === 'error'
                                    ? 'Could not save, try again'
                                    : this.activity.uploadStatus === 'error-nameisrequired'
                                        ? 'Could not save, name is required'
                                        : 'Save changes'
                            }
                        />
                    </div>
                </BottomBar>

                <Modal
                    show={this.showCancelModal}
                    title="Warning"
                    closeButton={false}
                    type="alert"
                    text="Going back to activities list will revert changes you've made!"
                    actions={[
                        {
                            onClick: this.handleClosingModal,
                            closeOnClick: false,
                            label: 'Stay on activity edit page, let me save changes',
                            type: 'default',
                        },
                        {
                            onClick: this.handleGoingBackToActivitiesList,
                            closeOnClick: false,
                            label: 'Revert changes and go back to activities list',
                            type: 'alert',
                        },
                    ]}
                />
            </>
        ) : (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64}/>
                </Col>
            </Row>
        );
    }

    @action
    private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.activity.name = e.target.value;
        this.activity.isModified = true;

        if (this.activity.uploadStatus === 'error-nameisrequired') {
            this.activity.uploadStatus = 'none';
        }
    };

    @action
    private handleStatusChange = (value: string) => {
        this.activity.isActive = value === '1';
        this.activity.isModified = true;
    };

    @action
    private handleActivityTypeChange = (value: string) => {
        const typeId = unformat(value);
        this.activity.activityType = typeId;
        this.activity.isModified = true;
    };

    @action
    private handleNotesRequirementChange = (selected: ToggleButtonsValueProp) => {
        this.activity.isDescriptionRequired = !!selected;
        this.activity.isModified = true;
    };

    @action
    private handleFilesRequirementChange = (selected: ToggleButtonsValueProp) => {
        this.activity.areFilesRequired = !!selected;
        this.activity.isModified = true;
    };

    @action
    private handleProjectCampaignRequirementChange = (selected: ToggleButtonsValueProp) => {
        this.activity.isProjectCampaignRequired = !!selected;
        this.activity.isModified = true;

        if (selected === false) {
            this.activity.isSpotVersionRequired = false;
        }
    };

    @action
    private handleSpotVersionRequirementsChange = (selected: ToggleButtonsValueProp) => {
        this.activity.isSpotVersionRequired = !!selected;
        this.activity.isModified = true;

        if (selected) {
            this.activity.isProjectCampaignRequired = true;
        }
    };

    @action
    private handleAllUserTypesToggle = () => {
        this.activity.isModified = true;
        if (this.isAnyActivityVisibleToAnyUser) {
            this.activity.selectedUserTypesIds = [];
        } else {
            this.activity.selectedUserTypesIds = this.userTypesList.map(userType => userType.id);
        }
    };

    @action
    private handleUserTypeToggle = (id: number) => (checked: boolean) => {
        if (checked) {
            this.activity.selectedUserTypesIds.push(id);
            this.activity.isModified = true;
        } else {
            const valueIndex = this.activity.selectedUserTypesIds.findIndex(typeId => id === typeId);
            if (valueIndex !== -1) {
                this.activity.selectedUserTypesIds = [
                    ...this.activity.selectedUserTypesIds.slice(0, valueIndex),
                    ...this.activity.selectedUserTypesIds.slice(valueIndex + 1),
                ];
                this.activity.isModified = true;
            }
        }
    };

    private handleSaveChanges = async () => {
        try {
            if (this.activity.isModified) {
                if (this.activity.name.trim() === '') {
                    this.activity.uploadStatus = 'error-nameisrequired';
                    throw new Error('Name is required');
                }

                this.activity.uploadStatus = 'saving';
                await ActivitiesActions.saveActivity(this.activity);
            }

            this.activity.uploadStatus = 'success';

            setTimeout(() => {
                this.goBackToActivitiesList();
            }, 1024);
        } catch (error) {
            if (this.activity.uploadStatus === 'saving') {
                this.activity.uploadStatus = 'error';
            }
            throw error;
        }
    };

    private handleGoingBackToActivitiesList = () => {
        if (this.activity.isModified && !this.showCancelModal) {
            this.showCancelModal = true;
            return;
        }

        this.goBackToActivitiesList();
        this.showCancelModal = false;
    };

    private handleClosingModal = () => {
        this.showCancelModal = false;
    };

    private goBackToActivitiesList = () => {
        const id = this.activity && this.activity.id !== null ? '/' + this.activity.id : '';
        history.push('/portal/configuration/activities' + id);
    };

    private setHeaderAndInitialData = () => {
        // Get location param for the activity ID
        const id: number | null =
            this.props.match && this.props.match.params && this.props.match.params['id']
                ? !isNaN(unformat(this.props.match.params['id']))
                ? unformat(this.props.match.params['id'])
                : null
                : null;

        // Get existing activity details
        let activity: Activity | null = null;
        if (id !== null && this.props.store) {
            activity =
                this.props.store.activities.activities.find(existingActivity => existingActivity.id === id) || null;
        }

        // Populate edit state
        this.activity = {
            id: activity !== null ? activity.id : null,
            name: activity !== null ? activity.name : '',
            activityType: activity !== null ? activity.typeId : 1,
            isProjectCampaignRequired: activity !== null ? activity.isProjectCampaignRequired : false,
            isSpotVersionRequired: activity !== null ? activity.isSpotVersionRequired : false,
            isDescriptionRequired: activity !== null ? activity.isDescriptionRequired : false,
            areFilesRequired: activity !== null ? activity.areFilesRequired : false,
            selectedUserTypesIds: activity !== null ? activity.userTypes.map(userType => userType.id) : [],
            isActive: activity !== null ? activity.isActive : true,
            isModified: false,
            uploadStatus: 'none',
        };

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            activity !== null ? `#${activity.id} - ${activity.name}` : 'Define activity',
            'Configuration - activities',
            null,
            null,
            [
                <ButtonBack
                    key="back-button"
                    onClick={this.handleGoingBackToActivitiesList}
                    label="Back to activities list"
                />,
            ]
        );
    };
}

export default ActivityDefinitionForm;
