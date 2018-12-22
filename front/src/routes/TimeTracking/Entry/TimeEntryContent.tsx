import * as React from 'react';
import * as styles from './TimeEntryContent.scss';
import * as classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import { observer, inject } from 'mobx-react';
import { computed, observable, action, reaction } from 'mobx';
import { AppOnlyStoreState } from 'store/AllStores';
import { Section } from 'components/Section';
import { Activity } from 'types/activities';
import { TimeEntryActions } from 'actions';
import { TextArea, OptionsList, DropdownContainer, Input } from 'components/Form';
import { Paragraph } from 'components/Content';
import { ButtonSend, ButtonAdd, ButtonClose } from 'components/Button';
import { ProjectPicker, ProjectPickerValues } from 'components/Buddha';
import { TableRow, Table, TableCell } from 'components/Table';
// import { DurationPicker } from 'components/Calendar';
import { BottomBar } from 'components/Layout';
import { TimeEntryUserWithType } from 'types/timeEntry';
import TextAreaFile from '../../../components/Form/TextAreaFile';

enum SubmittingStatus {
    none,
    saving,
    success,
    error,
    errorDateTimeRequired,
    errorMinimumDurationRequired,
    errorActivityRequired,
    errorDescriptionRequired,
    errorProjectRequired,
    errorVersionRequired,
    errorFilesDurationWrong,
    errorFilesRequired,
    errorFilesNamesRequired
}

interface Props {
    onReset: () => void;
    onDeleteConfirmationOpen: () => void;
    forUser: TimeEntryUserWithType | null;
}

type ComponentProps = Props & AppOnlyStoreState;

@inject('store')
@observer
export class TimeEntryContent extends React.Component<ComponentProps, {}> {

    state = {
        textareaValue: '',
        textareaEmpty: true,
    };

    private realTimeValidation: boolean = false;
    private activityDropdown: DropdownContainer | null = null;

    @observable
    private submittingStatus: SubmittingStatus;

    public componentDidUpdate() {
        if (this.realTimeValidation) {
            this.isFormInvalid();
        }
    }

    @computed
    private get submitLabel(): string {
        switch (this.submittingStatus) {
            case SubmittingStatus.none:
                return 'Save time entry';
            case SubmittingStatus.success:
                return 'Saved';
            case SubmittingStatus.errorDateTimeRequired:
                return 'Date and time are required';
            case SubmittingStatus.errorMinimumDurationRequired:
                return 'Entry duration is too short';
            case SubmittingStatus.errorActivityRequired:
                return 'Activity type needs to be selected';
            case SubmittingStatus.errorDescriptionRequired:
                return 'Activity description is required';
            case SubmittingStatus.errorFilesRequired:
                return 'Files are required';
            case SubmittingStatus.errorFilesNamesRequired:
                return 'All files need a filename';
            case SubmittingStatus.errorFilesDurationWrong:
                return 'Files work time does not match entry duration';
            case SubmittingStatus.errorProjectRequired:
                return 'Project and campaign are required';
            case SubmittingStatus.errorVersionRequired:
                return 'Project, campaign, spot and version are required';
            default:
                return 'Save time entry';
        }
    }

    @computed
    private get activitiesForUser(): Activity[] {
        if (this.props.store && this.props.store.user.isLoggedIn && this.props.forUser) {
            return this.props.store.activities.activities.filter(activity => {
                if (!activity.isActive) {
                    return false;
                }

                const visibleToUserTypeIds: number[] = activity.userTypes.map(type => type.id);
                return visibleToUserTypeIds.indexOf(this.props.forUser!.typeId) !== -1;
            });
        }

        return [];
    }

    constructor(props: ComponentProps) {
        super(props);

        reaction(
            () => this.activitiesForUser,
            activities => {
                if (activities.length === 1) {
                    TimeEntryActions.setActivityTypeId(activities[0].id);
                }
            }
        );
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        return (
            <div className={styles.timeEntryContent}>
                <ProjectPicker
                    noSeparator={true}
                    onChange={this.handleProjectChange}
                    title="Pick the spot"
                    show="all"
                    forUserId={this.props.forUser ? this.props.forUser.id : 0}
                    requiredSelection={this.getProjectPickerRequiredSelection()}
                    value={this.props.store.timeEntry.values ? this.props.store.timeEntry.values.projectPicked : null}
                    obClearButtonClick={this.onClearFormHandler}
                />

                {this.getActivitySection()}
                {this.getDescriptionSection()}

                <AnimateHeight
                    height={
                        this.props.store.timeEntry.selectedActivity &&
                        this.props.store.timeEntry.selectedActivity.areFilesRequired ? 'auto' : 0
                    }
                >
                    {this.getFilesWorkOnSection()}
                </AnimateHeight>

                <br/>

                {this.getBottomBar()}
            </div>
        );
    }

    private onClearFormHandler = (): void => {
        TimeEntryActions.cleanTimeEntryValueActivityId();
        this.realTimeValidation = false;
    };

    private getFilesWorkOnSection(): JSX.Element | null {
        if (!this.props.store) {
            return null;
        }

        const { timeEntry } = this.props.store;

        return (
            <Section title="Files worked on">
                <Table
                    type="compact"
                    header={[
                        { title: 'Filename', align: 'left' },
                        { title: 'Description', align: 'left' },
                        // { title: 'Duration', align: 'center' },
                        { title: 'Remove', align: 'right' },
                    ]}
                    // columnsWidths={['200px', '366px', '128px', '92px']}
                    columnsWidths={['200px', '494px', '92px']}
                >
                    {timeEntry.values &&
                    timeEntry.values.files.map((file, fileIndex) => (
                        <TableRow key={fileIndex}>
                            <TableCell>
                                <Input
                                    maxWidth={200}
                                    label="Filename"
                                    value={file.filename}
                                    onChange={this.handleFileChangeText('filename', fileIndex)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    minWidth={320}
                                    label="Description (optional)"
                                    value={file.description}
                                    onChange={this.handleFileChangeText('description', fileIndex)}
                                />
                            </TableCell>
                            {/* <TableCell>
                                <DurationPicker
                                    className={styles.fileDuration}
                                    onChange={this.handleFileWorkDurationChange(fileIndex)}
                                    totalMinutesValue={file.durationInMinutes}
                                    increments={timeEntry.durationIncrements}
                                />
                            </TableCell> */}
                            <TableCell align="right">
                                <ButtonClose
                                    onClick={this.handleFileRemove(fileIndex)}
                                    label="Remove"
                                    float="right"
                                />
                            </TableCell>
                        </TableRow>
                    ))}

                    {(timeEntry.values === null || timeEntry.values.files.length <= 0) && (
                        <TableRow key="no-files">
                            <TableCell colSpan={4}>
                                <Paragraph type="alert">Files are required</Paragraph>
                            </TableCell>
                        </TableRow>
                    )}

                    <TableRow key="add">
                        <TableCell colSpan={4} align="right">
                            <ButtonAdd
                                onClick={this.handleFileAdd}
                                label="Add file names"
                                labelOnLeft={true}
                                float="right"
                            />
                        </TableCell>
                    </TableRow>
                </Table>
                <TextAreaFile 
                    config={this.state} 
                    textareaOnFocusHandler={this.textareaOnFocusHandler} 
                    textareaOnBlurHandler={this.textareaOnBlurHandler}
                    textareaOnChangeHandler={this.textareaOnChangeHandler}
                />
            </Section>
        );
    }

    private getProjectPickerRequiredSelection(): 'all' | 'project-campaign' | null {
        if (!this.props.store) {
            return null;
        }

        if (this.props.store.timeEntry.selectedActivity) {
            if (this.props.store.timeEntry.selectedActivity.isSpotVersionRequired) {
                return 'all';
            } else if (this.props.store.timeEntry.selectedActivity.isProjectCampaignRequired) {
                return 'project-campaign';
            }
        }

        return null;
    }

    private getBottomBar(): JSX.Element | null {
        if (!this.props.store) {
            return null;
        }

        const isButtonCloseShow: boolean = Boolean(
            this.props.store.timeEntry.values &&
            this.props.store.timeEntry.values.editingEntryId
        );

        return (
            <BottomBar
                isWholeWidth={true}
                show={this.isBottomBarShow()}
            >
                <div className={styles.summary}>
                    <div className={styles.left}>
                        {
                            isButtonCloseShow &&
                            <ButtonClose
                                onClick={this.handleTimeEntryDeleteConfirmation}
                                label="Delete this time entry"
                                labelColor="orange"
                                labelOnLeft={false}
                            />
                        }

                        <Paragraph
                            className={classNames(styles.errorMessage, { [styles.show]: this.props.store.timeEntry.error.show })}
                            type="alert"
                        >
                            {this.props.store.timeEntry.error.message}
                        </Paragraph>
                    </div>

                    <ButtonSend
                        onClick={this.handleTimeEntrySubmit}
                        savingLabel="Saving"
                        saving={this.submittingStatus === SubmittingStatus.saving}
                        labelColor={
                            this.submittingStatus === SubmittingStatus.none
                                ? 'blue'
                                : this.submittingStatus === SubmittingStatus.success
                                ? 'green'
                                : 'orange'
                        }
                        label={this.submitLabel}
                    />
                </div>
            </BottomBar>
        );
    }

    private getDescriptionSection(): JSX.Element | null {
        if (!this.props.store) {
            return null;
        }

        const isRequired: boolean = Boolean(this.props.store.timeEntry.selectedActivity && this.props.store.timeEntry.selectedActivity.isDescriptionRequired);

        return (
            <Section title="Description">
                    <TextArea
                        onChange={this.handleDescriptionChange}
                        label={'Description ' + (isRequired ? '(required)' : '(optional)')}
                        value={this.props.store.timeEntry.values && this.props.store.timeEntry.values.description ? this.props.store.timeEntry.values.description : ''}
                        width={1152}
                        height={96}
                    />
            </Section>
        );
    }

    private getActivitySection(): JSX.Element | null {
        if (!this.props.store) {
            return null;
        }

        const { user, timeEntry } = this.props.store;

        return (
            <Section title="Activity">
                {
                    this.activitiesForUser.length > 0 &&
                    <DropdownContainer
                        ref={this.referenceActivityDropdown}
                        label={timeEntry.selectedActivity ? '' : 'Pick activity type'}
                        value={timeEntry.selectedActivity ? timeEntry.selectedActivity.name : undefined}
                        align="left"
                        type="field"
                    >
                        <OptionsList
                            onChange={this.handleActivitySelectionChange}
                            value={timeEntry.values ? timeEntry.values.activityId : 0}
                            options={this.activitiesForUser
                                .filter(activity => {
                                    if (
                                        timeEntry.values &&
                                        timeEntry.values.projectPicked &&
                                        timeEntry.values.projectPicked.project
                                    ) {
                                        return activity.isProjectCampaignRequired || activity.isSpotVersionRequired;
                                    } else {
                                        return !activity.isProjectCampaignRequired && !activity.isSpotVersionRequired;
                                    }
                                })
                                .map(activity => ({
                                    value: activity.id,
                                    label: activity.name,
                                }))}
                            search={{ autoFocus: true }}
                        />
                    </DropdownContainer>
                }

                {
                    this.activitiesForUser.length <= 0 &&
                    this.props.forUser && (
                        <Paragraph type="alert">
                            {
                                'No activities are available for your user type. ' +
                                'You will not be able to create time entry.'
                            }
                            {user.data && (
                                <>
                                    <br/>

                                    {'Please consult administrator to get access to activities for your user type:'}
                                    <strong>
                                        {'#' + this.props.forUser.typeId + ' - ' + this.props.forUser.typeName}
                                    </strong>
                                </>
                            )}
                        </Paragraph>
                    )
                }
            </Section>
        );
    }

    private isBottomBarShow(): boolean {
        if (!this.props.store) {
            return false;
        }

        return Boolean(
            this.props.store.timeEntry.error.show ||
            (
                this.props.store.timeEntry.values &&
                (
                    this.props.store.timeEntry.values.isModified ||
                    this.props.store.timeEntry.values.editingEntryId !== null
                )
            )
        );
    }

    private referenceActivityDropdown = (ref: DropdownContainer) => (this.activityDropdown = ref);

    private handleActivitySelectionChange = (option: { value: number; label: string }) => {
        if (!isNaN(option.value) && option.value > 0) {
            TimeEntryActions.setActivityTypeId(option.value);
            if (this.activityDropdown) {
                this.activityDropdown.closeDropdown();
            }
        }
    };

    private handleProjectChange = (value: ProjectPickerValues) => {
        TimeEntryActions.setProjectCampaignSpotVersionId(value);
    };

    private handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        TimeEntryActions.setDescription(e.target.value);
    };

    private handleFileChangeText = (type: 'filename' | 'description', fileIndex: number) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        TimeEntryActions.setFileDetails(
            {
                ...(type === 'filename'
                    ? {
                        filename: e.target.value,
                    }
                    : type === 'description'
                        ? { description: e.target.value }
                        : {}),
            },
            fileIndex
        );
    };

    // private handleFileWorkDurationChange = (fileIndex: number) => (totalTimeInMinutes: number) => {
    //     TimeEntryActions.setFileDetails(
    //         {
    //             durationInMinutes: totalTimeInMinutes,
    //         },
    //         fileIndex
    //     );
    // };

    private handleFileAdd = () => {
        if (this.state.textareaValue) {
            const arr: string[] | null = this.state.textareaValue.match(/[^\r\n]+/g);
            if (arr) {
                TimeEntryActions.setFileDetailsArray(arr);
                this.setState({
                    textareaValue: '',
                    textareaEmpty: true,
                });
            }
        } else {
            TimeEntryActions.setFileDetails({}, null);
        }
    };

    textareaOnChangeHandler = e => {
        this.setState({
            textareaValue: e.target.value,
        });
    }

    textareaOnBlurHandler = () => {
        if (!this.state.textareaValue) {
            this.setState({
                textareaEmpty: true
            });
        }
    }

    textareaOnFocusHandler = () => {
        if (this.state.textareaEmpty) {
            this.setState({
                textareaEmpty: false
            });
        }
    }

    private handleFileRemove = (fileIndex: number) => () => {
        TimeEntryActions.removeFile(fileIndex);
    };

    private handleTimeEntryDeleteConfirmation = () => {
        this.props.onDeleteConfirmationOpen();
    };

    @action
    private isFormInvalid(): boolean {
        if (!this.props.store) {
            this.submittingStatus = SubmittingStatus.error;
            return true;
        }

        const { timeEntry } = this.props.store;

        // Date and time are required
        if (timeEntry.values === null) {
            this.submittingStatus = SubmittingStatus.errorDateTimeRequired;
            return true;
        }

        // Minimum duration is required
        if (timeEntry.durationInMinutes < timeEntry.durationIncrements) {
            this.submittingStatus = SubmittingStatus.errorMinimumDurationRequired;
            return true;
        }

        // Activity type is required
        if (timeEntry.selectedActivity === null) {
            this.submittingStatus = SubmittingStatus.errorActivityRequired;
            return true;
        }

        // For some activities description is required
        if (
            timeEntry.selectedActivity.isDescriptionRequired &&
            (timeEntry.values.description === null || timeEntry.values.description.trim().length <= 0)
        ) {
            this.submittingStatus = SubmittingStatus.errorDescriptionRequired;
            return true;
        }

        // For some activities project is required
        if (
            timeEntry.selectedActivity.isProjectCampaignRequired &&
            (timeEntry.values.projectPicked === null ||
                timeEntry.values.projectPicked.project === null ||
                timeEntry.values.projectPicked.projectCampaign === null)
        ) {
            this.submittingStatus = SubmittingStatus.errorProjectRequired;
            return true;
        }

        // For some activities version is required
        if (
            timeEntry.selectedActivity.isSpotVersionRequired &&
            (timeEntry.values.projectPicked === null ||
                timeEntry.values.projectPicked.project === null ||
                timeEntry.values.projectPicked.projectCampaign === null ||
                timeEntry.values.projectPicked.spot === null ||
                timeEntry.values.projectPicked.version === null)
        ) {
            this.submittingStatus = SubmittingStatus.errorVersionRequired;
            return true;
        }

        // For some activities files are required
        if (timeEntry.selectedActivity.areFilesRequired && timeEntry.values.files.length <= 0) {
            this.submittingStatus = SubmittingStatus.errorFilesRequired;
            return true;
        }

        // Check if included files' work time is the same as time entry time
        if (timeEntry.values.files.length > 0) {
            const minutesSum = timeEntry.values.files.reduce((sum: number, file) => {
                if (file.durationInMinutes) {
                    sum += file.durationInMinutes;
                }

                return sum;
            }, 0);

            if (minutesSum !== timeEntry.durationInMinutes) {
                this.submittingStatus = SubmittingStatus.errorFilesDurationWrong;
                return true;
            }

            const fileNameMissing = timeEntry.values.files.find(file => file.filename.trim() === '');
            if (fileNameMissing) {
                this.submittingStatus = SubmittingStatus.errorFilesNamesRequired;
                return true;
            }
        }

        this.realTimeValidation = false;
        this.submittingStatus = SubmittingStatus.none;

        return false;
    }

    @action
    private handleTimeEntrySubmit = async () => {
        try {
            if (!this.props.store) {
                this.submittingStatus = SubmittingStatus.error;
                return;
            }
            
            if (this.isFormInvalid()) {
                this.realTimeValidation = true;
                return;
            }

            this.realTimeValidation = false;

            // Submit
            this.submittingStatus = SubmittingStatus.saving;
            await TimeEntryActions.submitActivity();
            this.submittingStatus = SubmittingStatus.success;

            setTimeout(() => {
                if (this.submittingStatus === SubmittingStatus.success) {
                    this.submittingStatus = SubmittingStatus.none;
                    this.props.onReset();
                }
            }, 1024);
            return;
        } catch (error) {
            if (this.submittingStatus === SubmittingStatus.saving) {
                this.submittingStatus = SubmittingStatus.error;
            }
        }
    };
}
