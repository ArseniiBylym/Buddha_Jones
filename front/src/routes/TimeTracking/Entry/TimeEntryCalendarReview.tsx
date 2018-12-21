import * as React from 'react';
import { computed, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TimeApprovalDayEntries, TimeApprovalDaySummary } from '../Approval';
import { TimeApprovalEntry, TimeApprovalDayHoursSummary } from 'types/timeApproval';
import { TimeEntryActions } from 'actions';
import {
    TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID,
    TIME_ENTRY_OVERTIME_AFTER_X_HOURS,
    TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS,
    TimeEntryUserWithType,
} from 'types/timeEntry';
import { Paragraph } from 'components/Content';
import { ButtonSend } from 'components/Button';
import { Modal } from '../../../components/Modals/index';

// Styles
const s = require('./TimeEntryCalendarReview.css');

// Props
interface TimeEntryCalendarReviewProps {
    entries: TimeApprovalEntry[];
    forUser: TimeEntryUserWithType;
    now: Date;
}

// Component
@observer
export class TimeEntryCalendarReview extends React.Component<TimeEntryCalendarReviewProps, {}> {
    @observable private submittingForReview: boolean = false;
    @observable private submitError: boolean = false;
    @observable private modalShow: boolean = false;

    @action
    private modalShowSwitch = () => {
        this.modalShow = !this.modalShow;
    }

    @computed
    private get OVERTIME_AFTER_X_MINUTES(): number {
        return TIME_ENTRY_OVERTIME_AFTER_X_HOURS * 60;
    }

    @computed
    private get DOUBLETIME_AFTER_X_MINUTES(): number {
        return TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS * 60;
    }

    @computed
    private get PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES(): number {
        return this.DOUBLETIME_AFTER_X_MINUTES - this.OVERTIME_AFTER_X_MINUTES;
    }

    @computed
    private get summary(): TimeApprovalDayHoursSummary {
        const minutes: TimeApprovalDayHoursSummary = {
            breakTimeInMinutes: 0,
            regularTimeInMinutes: 0,
            overTimeInMinutes: 0,
            doubleTimeInMinutes: 0,
        };

        this.props.entries.forEach(entry => {
            const entryDurationTotalMinutes = entry.durationInMinutes;
            if (entry.activityId === TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID) {
                // Assign to break minutes
                minutes.breakTimeInMinutes += entryDurationTotalMinutes;
            } else {
                let entryDurationInMinutesLeftToBeAssigned = entryDurationTotalMinutes;

                // Assign to regular minutes
                if (
                    entryDurationInMinutesLeftToBeAssigned > 0 &&
                    minutes.regularTimeInMinutes < this.OVERTIME_AFTER_X_MINUTES
                ) {
                    const minutesToAssignToRegularTime =
                        minutes.regularTimeInMinutes + entryDurationInMinutesLeftToBeAssigned <=
                        this.OVERTIME_AFTER_X_MINUTES
                            ? entryDurationInMinutesLeftToBeAssigned
                            : this.OVERTIME_AFTER_X_MINUTES - minutes.regularTimeInMinutes;
                    minutes.regularTimeInMinutes += minutesToAssignToRegularTime;
                    entryDurationInMinutesLeftToBeAssigned -= minutesToAssignToRegularTime;
                }

                // Assign to overtime minutes
                if (
                    entryDurationInMinutesLeftToBeAssigned > 0 &&
                    minutes.overTimeInMinutes < this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES
                ) {
                    const minutesToAssignToOvertimeHours =
                        minutes.overTimeInMinutes + entryDurationInMinutesLeftToBeAssigned <=
                        this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES
                            ? entryDurationInMinutesLeftToBeAssigned
                            : this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES - minutes.overTimeInMinutes;
                    minutes.overTimeInMinutes += minutesToAssignToOvertimeHours;
                    entryDurationInMinutesLeftToBeAssigned -= minutesToAssignToOvertimeHours;
                }

                // Assign to doubletime minutes
                if (entryDurationInMinutesLeftToBeAssigned > 0) {
                    minutes.doubleTimeInMinutes += entryDurationInMinutesLeftToBeAssigned;
                }
            }
        });

        return minutes;
    }

    public render() {
        return (
            <div className={s.container}>
                <TimeApprovalDayEntries
                    entries={this.props.entries}
                    areEditable={true}
                    forUser={this.props.forUser}
                    now={this.props.now}
                />

                <TimeApprovalDaySummary
                    summary={this.summary}
                    addAction={{
                        onClick: this.handleAddNewEntryAction,
                        label: 'Add new time entry',
                    }}
                />

                <div className={s.bottom}>
                    <div>
                        <Paragraph type="alert">Time once submitted for review cannot be changed</Paragraph>
                    </div>
                    <div>
                        <ButtonSend
                            onClick={this.modalShowSwitch}
                            label={
                                !this.submitError
                                    ? 'Submit day for review'
                                    : 'Could not submit for review, try again'
                            }
                            savingLabel="Submitting"
                            saving={this.submittingForReview}
                        />
                    </div>
                </div>
                <Modal
                    show={this.modalShow}
                    title="Confirm"
                    closeButton={false}
                    type="alert"
                    text="Time once submitted for review cannot be changed"
                    actions={[
                        {
                            onClick: () => { this.modalButtonHandler(true); },
                            closeOnClick: false,
                            label: 'Confirm',
                            type: 'default',
                        },
                        {
                            onClick: () => { this.modalButtonHandler(false); },
                            closeOnClick: false,
                            label: 'Reject',
                            type: 'alert',
                        },
                    ]}
                />
            </div>
        );
    }

    private modalButtonHandler = (value: boolean) => {
        this.modalShowSwitch();
        if (value) {
            this.handleSubmitDayForReview();
        }
    }

    private handleAddNewEntryAction = () => {
        if (this.props.entries && this.props.entries[0]) {
            TimeEntryActions.setEntryStartDate(this.props.forUser, this.props.entries[0].startDate, true);
        }
    };

    private handleSubmitDayForReview = async () => {
        try {
            this.submitError = false;
            this.submittingForReview = true;

            const date = this.props.entries[0].startDate;

            await TimeEntryActions.submitDayForReview(this.props.forUser, date);

            this.submittingForReview = false;

            TimeEntryActions.closeTimeEntryModal();
            TimeEntryActions.setCurrentViewToWeek(this.props.forUser, date);
        } catch (error) {
            this.submitError = true;
            this.submittingForReview = false;
        }
    };
}
