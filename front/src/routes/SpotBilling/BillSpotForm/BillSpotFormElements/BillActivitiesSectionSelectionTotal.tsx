import { DateHandler } from 'helpers/DateHandler';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./BillActivitiesSectionSelectionTotal.css');

export interface BillTimeEntriesSelectionTotals {
    // Total minutes clocked in by worker on selected time entries
    selectedBaseMinutes: number;
    // Total minutes entered by billing user to time fields
    selectedAdjustedMinutes: number;
    // Total minutes that have never been billed
    totalMinutes?: number;
    // Highlight total minutes with contrast color when they are unbilledj
    areTotalMinutesUnbilled?: boolean;
}

interface BillActivitiesSectionSelectionTotalProps extends BillTimeEntriesSelectionTotals {}

@observer
export class BillActivitiesSectionSelectionTotal extends React.Component<BillActivitiesSectionSelectionTotalProps, {}> {
    public render() {
        return (
            <div className={s.selection}>
                {this.props.totalMinutes && (
                    <p className={s.total}>
                        <span>{this.props.areTotalMinutesUnbilled ? 'Total unbilled: ' : 'Total: '}</span>
                        <strong>{DateHandler.convertTotalMinutesToHM(this.props.totalMinutes)}</strong>
                    </p>
                )}

                <p>
                    <span>Selected: </span>
                    <strong>{DateHandler.convertTotalMinutesToHM(this.props.selectedAdjustedMinutes)}</strong>
                </p>
            </div>
        );
    }
}
