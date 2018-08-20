import * as React from 'react';
import * as classNames from 'classnames';
import * as dateFormat from 'date-fns/format';
import { observer } from 'mobx-react';
import { TimeApprovalDay, TimeApprovalEntry } from 'types/timeApproval';
import { observable } from 'mobx';
import AnimateHeight from 'react-animate-height';
import { PersonWithRole } from 'components/Buddha';
import { Button, ButtonSend } from 'components/Button';
import { DateHandler } from 'helpers/DateHandler';
import { Tag } from 'components/Content';
import { TimeApprovalDayEntries } from './TimeApprovalDayEntries';
import { TimeApprovalDaySummary } from './TimeApprovalDaySummary';
import { TimeApprovalActions } from 'actions';

// Styles
const s = require('./TimeApprovalDayCard.css');

// Props
interface TimeApprovalDayCardProps {
    now: Date;
    day: TimeApprovalDay | null;
}

// Component
@observer
export class TimeApprovalDayCard extends React.Component<TimeApprovalDayCardProps, {}> {
    @observable private expandedUserIds: number[] = [];
    @observable private editingUserIds: number[] = [];
    @observable private approvingUserIds: number[] = [];
    @observable private errorsApprovingUserIds: number[] = [];

    public render() {
        return this.props.day === null ? null : (
            <>
                <div className={s.card}>
                    <div className={s.header}>
                        <h3>{dateFormat(this.props.day.date, 'MMMM Do, YYYY')}</h3>
                        <h5>
                            {this.props.day.users.length > 0
                                ? this.props.day.users.length +
                                  ' pending user' +
                                  (this.props.day.users.length > 1 ? 's' : '')
                                : ''}
                        </h5>
                    </div>

                    <div className={s.entries}>
                        {this.props.day.users.map(user => {
                            if (this.props.day === null) {
                                return null;
                            }

                            const areUserEntriesExpanded = this.expandedUserIds.indexOf(user.userId) !== -1;
                            const areUserEntriesInEditMode = this.editingUserIds.indexOf(user.userId) !== -1;
                            const areUserEntriesBeingApproved = this.approvingUserIds.indexOf(user.userId) !== -1;
                            const areUserEntriesReturnedErrorApproving =
                                this.errorsApprovingUserIds.indexOf(user.userId) !== -1;

                            const totalTimeAcrossAllEntriesInMinutes = Object.keys(user.summary).reduce(
                                (sum: number, key) => {
                                    const value = user.summary[key] as number;
                                    return sum + value;
                                },
                                0
                            );

                            return (
                                <div
                                    className={classNames(s.user, { [s.expanded]: areUserEntriesExpanded })}
                                    key={this.props.day.date.toISOString() + '-' + user.userId}
                                >
                                    <div className={s.userHeader}>
                                        <PersonWithRole
                                            selected={false}
                                            userId={user.userId}
                                            userFullName={user.userFullName || user.userName}
                                            hideRole={true}
                                        />

                                        <div className={s.userHeaderRight}>
                                            <Tag
                                                className={s.userHeaderTag}
                                                title={
                                                    'Total: ' +
                                                    DateHandler.convertTotalMinutesToHM(
                                                        totalTimeAcrossAllEntriesInMinutes
                                                    )
                                                }
                                            />

                                            <Button
                                                onClick={this.handleToggleUserDayEntriesExpansion(user.userId)}
                                                label={{
                                                    color: areUserEntriesExpanded ? 'orange' : 'blue',
                                                    text: areUserEntriesExpanded ? 'Hide entries' : 'Review entries',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <AnimateHeight height={areUserEntriesExpanded ? 'auto' : 0}>
                                        <TimeApprovalDayEntries
                                            entries={user.entries}
                                            areEditable={areUserEntriesInEditMode}
                                            forUser={{
                                                id: user.userId,
                                                typeId: user.userTypeId,
                                                typeName: user.userTypeName,
                                            }}
                                            now={this.props.now}
                                        />

                                        <TimeApprovalDaySummary summary={user.summary} />

                                        <div className={s.actions}>
                                            <div>
                                                <Button
                                                    onClick={this.handleEntriesEdit(user.userId)}
                                                    label={{
                                                        color: areUserEntriesInEditMode ? 'black' : 'blue',
                                                        text: areUserEntriesInEditMode
                                                            ? 'Stop editing user entries'
                                                            : `Edit user entries`,
                                                    }}
                                                />
                                            </div>

                                            <ButtonSend
                                                onClick={this.handleEntriesApprove(user.userId, user.entries)}
                                                labelColor={areUserEntriesReturnedErrorApproving ? 'orange' : 'blue'}
                                                iconColor="green"
                                                label={
                                                    areUserEntriesReturnedErrorApproving
                                                        ? 'Could not approve, try again'
                                                        : 'Approve'
                                                }
                                                saving={areUserEntriesBeingApproved}
                                                savingLabel="Approving"
                                            />
                                        </div>
                                    </AnimateHeight>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }

    private handleToggleUserDayEntriesExpansion = (userId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        const userIdFound = this.expandedUserIds.indexOf(userId);

        if (userIdFound !== -1) {
            this.expandedUserIds = [
                ...this.expandedUserIds.slice(0, userIdFound),
                ...this.expandedUserIds.slice(userIdFound + 1),
            ];
        } else {
            this.expandedUserIds.push(userId);
        }
    };

    private handleEntriesEdit = (userId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        const userEditIndex = this.editingUserIds.indexOf(userId);
        if (userEditIndex === -1) {
            this.editingUserIds.push(userId);
        } else {
            this.editingUserIds = [
                ...this.editingUserIds.slice(0, userEditIndex),
                ...this.editingUserIds.slice(userEditIndex + 1),
            ];
        }
    };

    private handleEntriesApprove = (userId: number, entries: TimeApprovalEntry[]) => async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            const errorIndex = this.errorsApprovingUserIds.indexOf(userId);
            if (errorIndex !== -1) {
                this.errorsApprovingUserIds = [
                    ...this.errorsApprovingUserIds.slice(0, errorIndex),
                    ...this.errorsApprovingUserIds.slice(errorIndex + 1),
                ];
            }

            this.approvingUserIds.push(userId);

            await TimeApprovalActions.approveDay(entries.map(entry => entry.entryId));

            const approveIndex = this.approvingUserIds.indexOf(userId);
            if (approveIndex !== -1) {
                this.approvingUserIds = [
                    ...this.approvingUserIds.slice(0, approveIndex),
                    ...this.approvingUserIds.slice(approveIndex + 1),
                ];
            }
        } catch (error) {
            this.errorsApprovingUserIds.push(userId);
            throw error;
        }
    };
}
