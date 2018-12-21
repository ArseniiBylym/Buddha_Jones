import * as React from 'react';
import { observer } from 'mobx-react';
import { TimeApprovalEntry } from 'types/timeApproval';
import { TimeApprovalDayEntry } from './TimeApprovalDayEntry';
import { TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID, TimeEntryUserWithType } from 'types/timeEntry';

// Props
interface TimeApprovalDayEntriesProps {
    entries: TimeApprovalEntry[];
    forUser: TimeEntryUserWithType;
    now: Date;
    areEditable?: boolean;
}

// Component
@observer
export class TimeApprovalDayEntries extends React.Component<TimeApprovalDayEntriesProps, {}> {
    static get defaultProps(): TimeApprovalDayEntriesProps {
        return {
            entries: [],
            forUser: {
                id: 0,
                typeId: 0,
                typeName: '',
            },
            now: new Date(),
            areEditable: false,
        };
    }

    public render() {
        let totalBilledDayMinutesAfterEntry: number = 0;

        return (
            <div>
                {this.props.entries.map((entry, i) => {
                    totalBilledDayMinutesAfterEntry +=
                        entry.activityId !== TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID ? entry.durationInMinutes : 0;

                    return (
                        <React.Fragment key={i}>
                        <TimeApprovalDayEntry
                            key={entry.entryId}
                            entry={entry}
                            forUser={this.props.forUser}
                            now={this.props.now}
                            isEditable={this.props.areEditable ? true : false}
                            totalDayMinutesAfterEntry={totalBilledDayMinutesAfterEntry}
                        />
                        <hr/>
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }
}
