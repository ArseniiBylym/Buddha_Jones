import * as React from 'react';
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
import { DurationPicker } from 'components/Calendar';
import { BottomBar } from 'components/Layout';
import { TimeEntryUserWithType } from 'types/timeEntry';

// Styles
import * as styles from './TimeEntryContent.scss';

interface Props {
    onReset: () => void;
    onDeleteConfirmationOpen: () => void;
    forUser: TimeEntryUserWithType | null;
}

type ComponentProps = Props & AppOnlyStoreState;

enum SubmittingStatus {
    none = 'none',
    saving = 'saving',
    success = 'success',
    error = 'error',
    errorDateTimeRequired = 'error-datetimerequired',
    errorMiniminumDurationRequired = 'error-miniminumdurationrequired',
    errorActivityRequired = 'error-activityrequired',
    errorDescriptionRequired = 'error-descriptionrequired',
    errorProjectRequired = 'error-projectrequired',
    errorVersionRequired = 'error-versionrequired',
    errorFilesDurationWrong = 'error-filesdurationwrong',
    errorFilesRequired = 'error-filesrequired',
    errorFilesNamesRequired = 'error-filesnamesrequired'
}

@inject('store')
@observer
export class TimeEntryContent extends React.Component<ComponentProps, {}> {
    private activityDropdown: DropdownContainer | null = null;

    @observable
    private submittingStatus: SubmittingStatus;

    @computed
    private get submitLabel(): string {
        switch (this.submittingStatus) {
            case SubmittingStatus.none:
                return 'Save time entry';
            case SubmittingStatus.success:
                return 'Saved';
            case SubmittingStatus.errorDateTimeRequired:
                return 'Date and time are required';
            case SubmittingStatus.errorMiniminumDurationRequired:
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
                return 'We could not save the entry, please try again';
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

        const { user, timeEntry } = this.props.store;

        return (
            <div className={styles.timeEntryContent}>
                <ProjectPicker
                    noSeparator={true}
                    onChange={this.handleProjectChange}
                    title="Pick the spot"
                    show="all"
                    forUserId={this.props.forUser ? this.props.forUser.id : 0}
                    requiredSelection={
                        timeEntry.selectedActivity
                            ? timeEntry.selectedActivity.isSpotVersionRequired
                            ? 'all'
                            : timeEntry.selectedActivity.isProjectCampaignRequired
                                ? 'project-campaign'
                                : null
                            : null
                    }
                    value={timeEntry.values ? timeEntry.values.projectPicked : null}
                />

                <Section title="Activity">
                    {this.activitiesForUser.length > 0 && (
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
                    )}

                    {this.activitiesForUser.length <= 0 &&
                    this.props.forUser && (
                        <Paragraph type="alert">
                            {'No activities are available for your user type. ' +
                            'You will not be able to create time entry.'}
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
                    )}
                </Section>

                <Section title="Description">
                    <TextArea
                        onChange={this.handleDescriptionChange}
                        label={
                            'Description ' +
                            (timeEntry.selectedActivity && timeEntry.selectedActivity.isDescriptionRequired
                                ? '(required)'
                                : '(optional)')
                        }
                        value={timeEntry.values && timeEntry.values.description ? timeEntry.values.description : ''}
                        width={1152}
                        height={96}
                    />
                </Section>

                <AnimateHeight
                    height={timeEntry.selectedActivity && timeEntry.selectedActivity.areFilesRequired ? 'auto' : 0}
                >
                    <Section title="Files worked on">
                        <Table
                            type="compact"
                            header={[
                                { title: 'Filename', align: 'left' },
                                { title: 'Description', align: 'left' },
                                { title: 'Duration', align: 'center' },
                                { title: 'Remove', align: 'right' },
                            ]}
                            columnsWidths={['200px', '366px', '128px', '92px']}
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
                                    <TableCell>
                                        <DurationPicker
                                            className={styles.fileDuration}
                                            onChange={this.handleFileWorkDurationChange(fileIndex)}
                                            totalMinutesValue={file.durationInMinutes}
                                            increments={timeEntry.durationIncrements}
                                        />
                                    </TableCell>
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
                                        label="Add file"
                                        labelOnLeft={true}
                                        float="right"
                                    />
                                </TableCell>
                            </TableRow>
                        </Table>
                    </Section>
                </AnimateHeight>

                <br/>

                <BottomBar
                    isWholeWidth={true}
                    show={this.isBottomBarShow()}
                >
                    <div className={styles.summary}>
                        <div className={styles.left}>
                            {timeEntry.values &&
                            timeEntry.values.editingEntryId && (
                                <ButtonClose
                                    onClick={this.handleTimeEntryDeleteConfirmation}
                                    label="Delete this time entry"
                                    labelColor="orange"
                                    labelOnLeft={false}
                                />
                            )}

                            <Paragraph
                                className={classNames(styles.errorMessage, { [styles.show]: timeEntry.error.show })}
                                type="alert"
                            >
                                {timeEntry.error.message}
                            </Paragraph>
                        </div>

                        <ButtonSend
                            onClick={this.handleTimeEntrySubmit}
                            savingLabel="Saving"
                            saving={this.submittingStatus === 'saving'}
                            labelColor={
                                this.submittingStatus === 'none'
                                    ? 'blue'
                                    : this.submittingStatus === 'success'
                                    ? 'green'
                                    : 'orange'
                            }
                            label={this.submitLabel}
                        />
                    </div>
                </BottomBar>
            </div>
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

    private handleFileWorkDurationChange = (fileIndex: number) => (totalTimeInMinutes: number) => {
        TimeEntryActions.setFileDetails(
            {
                durationInMinutes: totalTimeInMinutes,
            },
            fileIndex
        );
    };

    private handleFileAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        TimeEntryActions.setFileDetails({}, null);
    };

    private handleFileRemove = (fileIndex: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        TimeEntryActions.removeFile(fileIndex);
    };

    private handleTimeEntryDeleteConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onDeleteConfirmationOpen();
    };

    @action
    private handleTimeEntrySubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (!this.props.store) {
                this.submittingStatus = SubmittingStatus.error;
                return;
            }

            const { timeEntry } = this.props.store;

            this.submittingStatus = SubmittingStatus.saving;

            // Date and time are required
            if (timeEntry.values === null) {
                this.submittingStatus = SubmittingStatus.errorDateTimeRequired;
                return;
            }

            // Minimum duration is required
            if (timeEntry.durationInMinutes < timeEntry.durationIncrements) {
                this.submittingStatus = SubmittingStatus.errorMiniminumDurationRequired;
                return;
            }

            // Activity type is required
            if (
                timeEntry.selectedActivity === null ||
                (timeEntry.selectedActivity &&
                    timeEntry.selectedActivity.isProjectCampaignRequired === false &&
                    timeEntry.values &&
                    timeEntry.values.projectPicked &&
                    timeEntry.values.projectPicked.project) ||
                (timeEntry.selectedActivity &&
                    timeEntry.selectedActivity.isSpotVersionRequired === false &&
                    timeEntry.values &&
                    timeEntry.values.projectPicked &&
                    timeEntry.values.projectPicked.version)
            ) {
                this.submittingStatus = SubmittingStatus.errorActivityRequired;
                return;
            }

            // For some activities description is required
            if (
                timeEntry.selectedActivity.isDescriptionRequired &&
                (timeEntry.values.description === null || timeEntry.values.description.trim().length <= 0)
            ) {
                this.submittingStatus = SubmittingStatus.errorDescriptionRequired;
                return;
            }

            // For some activities project is required
            if (
                timeEntry.selectedActivity.isProjectCampaignRequired &&
                (timeEntry.values.projectPicked === null ||
                    timeEntry.values.projectPicked.project === null ||
                    timeEntry.values.projectPicked.projectCampaign === null)
            ) {
                this.submittingStatus = SubmittingStatus.errorProjectRequired;
                return;
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
                return;
            }

            // For some activities files are required
            if (timeEntry.selectedActivity.areFilesRequired && timeEntry.values.files.length <= 0) {
                this.submittingStatus = SubmittingStatus.errorFilesRequired;
                return;
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
                    return;
                }

                const fileNameMissing = timeEntry.values.files.find(file => file.filename.trim() === '');
                if (fileNameMissing) {
                    this.submittingStatus = SubmittingStatus.errorFilesNamesRequired;
                    return;
                }
            }

            // Submit
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
