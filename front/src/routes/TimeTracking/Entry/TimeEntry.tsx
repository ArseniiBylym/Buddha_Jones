import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from 'store/AllStores';
import { HeaderActions, ActivitiesActions, TimeEntryActions } from 'actions';
import { computed } from 'mobx';
import { LoadingSpinner } from 'components/Loaders';
import { Row, Col } from 'components/Section';
import { TimeEntryCalendar } from '.';
import { Modal } from 'components/Modals';
import { TimeEntryModal } from './TimeEntryModal';

interface TimeEntryUserWithType {
    id: number;
    typeId: number;
    typeName: string;
}

@inject('store')
@observer
class TimeEntry extends React.Component<AppState, {}> {
    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return this.props.store.activities.activitiesLoading || this.props.store.activities.activitiesTypesLoading;
        }

        return true;
    }

    @computed
    private get forUser(): TimeEntryUserWithType {
        if (this.props.store && this.props.store.user.data) {
            return {
                id: this.props.store.user.data.id,
                typeId: this.props.store.user.data.typeId,
                typeName: this.props.store.user.data.typeName,
            };
        }

        return {
            id: 0,
            typeId: 0,
            typeName: '',
        };
    }

    public componentDidMount() {
        HeaderActions.setMainHeaderTitlesAndElements('Time entry', 'Activities');
        ActivitiesActions.fetchActivitiesTypes();
        ActivitiesActions.fetchActivityList();

        if (this.props.store && this.props.store.user.data) {
            TimeEntryActions.setCurrentViewToWeek(this.forUser, this.props.store.time.now);
        }
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { timeEntry } = this.props.store;

        return !this.essentialDataIsLoading ? (
            <>
                <TimeEntryCalendar/>
                <TimeEntryModal openOnPage="time-entry"/>

                <Modal
                    show={timeEntry.minimumHoursNotMetModal.show && timeEntry.minimumHoursNotMetModal.minHours > 0}
                    title="Minimum work time not met"
                    text={
                        'You are required to account for at least ' +
                        timeEntry.minimumHoursNotMetModal.minHours +
                        ' hours of activity time during a work day.'
                    }
                    actions={[
                        {
                            closeOnClick: true,
                            label: 'OK',
                            type: 'default',
                        },
                    ]}
                    closeButton={true}
                    onClose={this.handleMinimumHoursNotMetModalClose}
                />

                <Modal
                    show={timeEntry.lunchBreakNotTakenModal.show}
                    title="Lunch break not taken"
                    text={'You have not entered hours of lunch break. Have you had it?'}
                    actions={[
                        {
                            closeOnClick: true,
                            onClick: this.handleLunchBreakModalClick(false),
                            label: 'Yes, let me enter lunch break activity',
                            type: 'default',
                        },
                        {
                            closeOnClick: true,
                            onClick: this.handleLunchBreakModalClick(true),
                            label: 'No break, submit the day for review without it',
                            type: 'alert',
                        },
                    ]}
                    closeButton={false}
                />

                <Modal
                    show={timeEntry.editsWillGetLostModal.show && timeEntry.editsWillGetLostModal.dayIndex >= 0}
                    title="Your changes will be lost"
                    text={`You've made changed to editing entry.`}
                    actions={[
                        {
                            closeOnClick: true,
                            onClick: this.handleEditsWillGetLostModalClick(false),
                            label: 'Let me save changes',
                            type: 'default',
                        },
                        {
                            closeOnClick: true,
                            onClick: this.handleEditsWillGetLostModalClick(true),
                            label: 'Discard changes',
                            type: 'alert',
                        },
                    ]}
                    closeButton={false}
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

    private handleMinimumHoursNotMetModalClose = (e?: React.MouseEvent<HTMLButtonElement>) => {
        this.props.store!.timeEntry.minimumHoursNotMetModal.show = false;
        this.props.store!.timeEntry.minimumHoursNotMetModal.minHours = 0;
    };

    private handleLunchBreakModalClick = (forceSubmit: boolean) => (e?: React.MouseEvent<HTMLButtonElement>) => {
        TimeEntryActions.closeLunchBreakNotTakenModal(forceSubmit);
    };

    private handleEditsWillGetLostModalClick = (forceChange: boolean) => (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (!this.props.store) {
            return;
        }

        const { timeEntry } = this.props.store;

        timeEntry.editsWillGetLostModal.show = false;

        if (forceChange && timeEntry.editsWillGetLostModal.forUser) {
            const day =
                typeof timeEntry.viewDays[timeEntry.editsWillGetLostModal.forUser.id] !== 'undefined'
                    ? timeEntry.viewDays[timeEntry.editsWillGetLostModal.forUser.id]
                    : null;

            if (day) {
                TimeEntryActions.setEntryStartDate(timeEntry.editsWillGetLostModal.forUser, day.date, true);
            }
        }

        timeEntry.editsWillGetLostModal.forUser = null;
        timeEntry.editsWillGetLostModal.dayIndex = -1;
    };
}

export default TimeEntry;
