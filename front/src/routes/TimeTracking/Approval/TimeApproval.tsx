import * as React from 'react';
import * as dateFormat from 'date-fns/format';
import * as dateParse from 'date-fns/parse';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { unformat } from 'accounting';
import { Section, Row, Col } from 'components/Section';
import { LoadingSpinner } from 'components/Loaders';
import { TimeApprovalActions, HeaderActions, ActivitiesActions } from 'actions';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from 'components/Form';
import { AppOnlyStoreState } from 'store/AllStores';
import { TimeApprovalFilterType, TimeApprovalDay } from 'types/timeApproval';
import { Paragraph } from 'components/Content';
import { TimeApprovalDayCard } from './TimeApprovalDayCard';
import { DateHandler } from 'helpers/DateHandler';
import {
    TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID,
    TIME_ENTRY_OVERTIME_AFTER_X_HOURS,
    TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS,
} from 'types/timeEntry';
import { TimeEntryModal } from '../Entry';

// Types
type TimeApprovalPropsTypes = TimeApprovalProps & AppOnlyStoreState;

// Props
interface TimeApprovalProps {}

// Component
@inject('store')
@observer
class TimeApproval extends React.Component<TimeApprovalPropsTypes, {}> {
    private OVERTIME_AFTER_X_MINUTES = TIME_ENTRY_OVERTIME_AFTER_X_HOURS * 60;
    private DOUBLETIME_AFTER_X_MINUTES = TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS * 60;
    private PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES =
        this.DOUBLETIME_AFTER_X_MINUTES - this.OVERTIME_AFTER_X_MINUTES;

    @computed
    private get isEssentialDataLoading(): boolean {
        if (!this.props.store) {
            return true;
        }

        const { timeApproval } = this.props.store;

        return timeApproval.allTimeEntriesLoading ||
            (timeApproval.allTimeEntries.length <= 0 && timeApproval.allTimeEntriesLastFetchTimestamp <= 0)
            ? true
            : false;
    }

    @computed
    private get days(): TimeApprovalDay[] {
        if (!this.props.store) {
            return [];
        }

        const dates: string[] = [];

        return this.props.store.timeApproval.allTimeEntries.reduce((days: TimeApprovalDay[], entry) => {
            const date = dateParse(entry.startDate.date);
            const dateString = dateFormat(date, 'YYYY-MM-DD');

            let dateIndex = dates.findIndex(d => d === dateString);
            if (dateIndex === -1) {
                dateIndex = dates.length;
                dates.push(dateString);
                days.push({
                    date,
                    users: [],
                });
            }

            let userIndex = days[dateIndex].users.findIndex(u => u.userId === entry.userId);
            if (userIndex === -1) {
                userIndex = days[dateIndex].users.length;
                days[dateIndex].users.push({
                    userId: entry.userId,
                    userTypeId: entry.userTypeId,
                    userTypeName: entry.userTypeName,
                    userName: entry.username,
                    userInitials: entry.initials || '',
                    userFullName: [entry.firstName, entry.lastName].join(' '),
                    userMinHours: entry.minHour || 0,
                    entries: [],
                    summary: {
                        breakTimeInMinutes: 0,
                        regularTimeInMinutes: 0,
                        overTimeInMinutes: 0,
                        doubleTimeInMinutes: 0,
                    },
                });
            }

            const entryDurationTotalMinutes = DateHandler.convertHoursDotMinutesToTotalMinutes(entry.duration);

            days[dateIndex].users[userIndex].entries.push({
                entryId: entry.id,
                userId: entry.userId,
                userTypeId: entry.userTypeId,
                userTypeName: entry.userTypeName,
                activityId: entry.activityId,
                activityName: entry.activityValue,
                activityTypeId: entry.activityTypeId,
                selectedProject:
                    entry.projectId !== null ||
                    entry.campaignId !== null ||
                    entry.spotId !== null ||
                    entry.versionId !== null
                        ? {
                              project:
                                  entry.projectId !== null
                                      ? {
                                            id: entry.projectId,
                                            name: entry.projectName || entry.projectId.toString(),
                                        }
                                      : null,
                              projectCampaign:
                                  entry.projectCampaignId !== null
                                      ? {
                                            id: entry.projectCampaignId,
                                            name: entry.campaignName || entry.projectCampaignId.toString(),
                                        }
                                      : null,
                              spot:
                                  entry.spotId !== null
                                      ? {
                                            id: entry.spotId,
                                            name: entry.spotName || entry.spotId.toString(),
                                        }
                                      : null,
                              version:
                                  entry.versionId !== null
                                      ? {
                                            id: entry.versionId,
                                            name: entry.versionName || entry.versionId.toString(),
                                        }
                                      : null,
                              customerId: entry.customerId ? entry.customerId : null,
                          }
                        : null,
                notes: entry.activityDescription,
                files: [],
                startDate: dateParse(entry.startDate.date),
                durationInMinutes: entryDurationTotalMinutes,
            });

            if (entry.activityId === TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID) {
                // Assign to break minutes
                days[dateIndex].users[userIndex].summary.breakTimeInMinutes += entryDurationTotalMinutes;
            } else {
                let entryDurationInMinutesLeftToBeAssigned = entryDurationTotalMinutes;

                // Assign to regular minutes
                if (
                    entryDurationInMinutesLeftToBeAssigned > 0 &&
                    days[dateIndex].users[userIndex].summary.regularTimeInMinutes < this.OVERTIME_AFTER_X_MINUTES
                ) {
                    const minutesToAssignToRegularTime =
                        days[dateIndex].users[userIndex].summary.regularTimeInMinutes +
                            entryDurationInMinutesLeftToBeAssigned <=
                        this.OVERTIME_AFTER_X_MINUTES
                            ? entryDurationInMinutesLeftToBeAssigned
                            : this.OVERTIME_AFTER_X_MINUTES -
                              days[dateIndex].users[userIndex].summary.regularTimeInMinutes;
                    days[dateIndex].users[userIndex].summary.regularTimeInMinutes += minutesToAssignToRegularTime;
                    entryDurationInMinutesLeftToBeAssigned -= minutesToAssignToRegularTime;
                }

                // Assign to overtime minutes
                if (
                    entryDurationInMinutesLeftToBeAssigned > 0 &&
                    days[dateIndex].users[userIndex].summary.overTimeInMinutes <
                        this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES
                ) {
                    const minutesToAssignToOvertimeHours =
                        days[dateIndex].users[userIndex].summary.overTimeInMinutes +
                            entryDurationInMinutesLeftToBeAssigned <=
                        this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES
                            ? entryDurationInMinutesLeftToBeAssigned
                            : this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES -
                              days[dateIndex].users[userIndex].summary.overTimeInMinutes;
                    days[dateIndex].users[userIndex].summary.overTimeInMinutes += minutesToAssignToOvertimeHours;
                    entryDurationInMinutesLeftToBeAssigned -= minutesToAssignToOvertimeHours;
                }

                // Assign to doubletime minutes
                if (entryDurationInMinutesLeftToBeAssigned > 0) {
                    days[dateIndex].users[
                        userIndex
                    ].summary.doubleTimeInMinutes += entryDurationInMinutesLeftToBeAssigned;
                    entryDurationInMinutesLeftToBeAssigned = 0;
                }
            }

            return days;
        }, []);
    }

    private userFilterDropdown: DropdownContainer | null = null;
    private projectFilterDropdown: DropdownContainer | null = null;
    private dateFilterDropdown: DropdownContainer | null = null;

    public componentDidMount() {
        HeaderActions.setMainHeaderTitlesAndElements('Time approval');
        TimeApprovalActions.fetchTimeEntriesPendingReview();
        ActivitiesActions.fetchActivitiesTypes();
        ActivitiesActions.fetchActivityList();
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { timeApproval } = this.props.store;

        return (
            <>
                <Section
                    noSeparator={true}
                    title="Entries"
                    headerElements={[
                        {
                            key: 'user-filter',
                            element: (
                                <DropdownContainer
                                    ref={this.referenceUserFilterDropdown}
                                    label="Filter by user"
                                    minWidth={256}
                                    value={timeApproval.filters.user ? timeApproval.filters.user.name : 'All'}
                                >
                                    <OptionsList
                                        onChange={this.handleFilterChange('userId')}
                                        value={timeApproval.filters.user ? timeApproval.filters.user.id : null}
                                        options={[
                                            {
                                                value: null,
                                                label: 'All',
                                            },
                                            ...timeApproval.allTimeEntriesUsers.map(user => ({
                                                value: user.userId,
                                                label: TimeApprovalActions.constructUserName(user),
                                            })),
                                        ]}
                                    />
                                </DropdownContainer>
                            ),
                        },
                        {
                            key: 'project-filter',
                            element: (
                                <DropdownContainer
                                    ref={this.referenceProjectFilterDropdown}
                                    label="Filter by project"
                                    value={timeApproval.filters.project ? timeApproval.filters.project.name : 'All'}
                                >
                                    <OptionsList
                                        onChange={this.handleFilterChange('project')}
                                        value={timeApproval.filters.project ? timeApproval.filters.project.name : null}
                                        options={[
                                            {
                                                value: null,
                                                label: 'All',
                                            },
                                            {
                                                value: 0,
                                                label: 'Internal activities',
                                            },
                                            ...timeApproval.allTimeEntriesProjects.map(project => ({
                                                value: project.projectId,
                                                label: project.projectName || '',
                                            })),
                                        ]}
                                    />
                                </DropdownContainer>
                            ),
                        },
                        {
                            key: 'date-filter',
                            element: (
                                <DropdownContainer
                                    ref={this.referenceDateFilterDropdown}
                                    label="Filter by date"
                                    value={
                                        timeApproval.filters.daysAgo === null
                                            ? 'All'
                                            : timeApproval.filters.daysAgo === 0
                                                ? 'Today'
                                                : timeApproval.filters.daysAgo === 1
                                                    ? 'Yesterday'
                                                    : timeApproval.filters.daysAgo + ' days ago'
                                    }
                                >
                                    <OptionsList
                                        onChange={this.handleFilterChange('daysAgo')}
                                        value={timeApproval.filters.daysAgo}
                                        options={[
                                            {
                                                value: null,
                                                label: 'All',
                                            },
                                            {
                                                value: 0,
                                                label: 'Today',
                                            },
                                            {
                                                value: 1,
                                                label: 'Yesterday',
                                            },
                                            {
                                                value: 2,
                                                label: '2 days ago',
                                            },
                                            {
                                                value: 3,
                                                label: '3 days ago',
                                            },
                                        ]}
                                    />
                                </DropdownContainer>
                            ),
                        },
                    ]}
                >
                    {this.isEssentialDataLoading === false ? (
                        <>
                            {(this.days.length > 0 &&
                                this.days.map(day => (
                                    <TimeApprovalDayCard
                                        key={day.date.toISOString()}
                                        day={day}
                                        now={this.props.store!.time.now}
                                    />
                                ))) || (
                                <Paragraph type="dim">
                                    {'There are no time entries pending approval' +
                                        (timeApproval.isUsingFilters ? ' matching current filters' : '') +
                                        '.'}
                                </Paragraph>
                            )}
                        </>
                    ) : (
                        this.renderLoading()
                    )}
                </Section>

                <TimeEntryModal openOnPage="time-approve" />
            </>
        );
    }

    private renderLoading() {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64} />
                </Col>
            </Row>
        );
    }

    private referenceUserFilterDropdown = (ref: DropdownContainer) => (this.userFilterDropdown = ref);
    private referenceProjectFilterDropdown = (ref: DropdownContainer) => (this.projectFilterDropdown = ref);
    private referenceDateFilterDropdown = (ref: DropdownContainer) => (this.dateFilterDropdown = ref);

    private handleFilterChange = (type: TimeApprovalFilterType) => (option: {
        value: OptionsListValuePropType;
        label: string;
    }) => {
        TimeApprovalActions.changeTimeEntriesFilter(
            type,
            typeof option.value === 'string'
                ? unformat(option.value)
                : typeof option.value === 'number'
                    ? option.value
                    : null
        );

        if (this.userFilterDropdown) {
            this.userFilterDropdown.closeDropdown();
        }

        if (this.projectFilterDropdown) {
            this.projectFilterDropdown.closeDropdown();
        }

        if (this.dateFilterDropdown) {
            this.dateFilterDropdown.closeDropdown();
        }

        TimeApprovalActions.fetchTimeEntriesPendingReview(true);
    };
}

export default TimeApproval;
