import { AdjustedMinutesAboveOrBelow } from 'components/Buddha';
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
    // Show selected minutes
    showSelectedMinutes?: boolean;
    // Show plus minus calculation
    showPlusMinusCalculation?: boolean;
}

interface BillActivitiesSectionSelectionTotalProps extends BillTimeEntriesSelectionTotals {}

@observer
export class BillActivitiesSectionSelectionTotal extends React.Component<BillActivitiesSectionSelectionTotalProps, {}> {
    static get defaultProps(): BillActivitiesSectionSelectionTotalProps {
        return {
            selectedBaseMinutes: 0,
            selectedAdjustedMinutes: 0,
            totalMinutes: 0,
            areTotalMinutesUnbilled: false,
            showSelectedMinutes: false,
            showPlusMinusCalculation: false,
        };
    }

    public render() {
        return (
            <div className={s.selection}>
                {this.props.totalMinutes && (
                    <p className={s.total}>
                        <span>{this.props.areTotalMinutesUnbilled ? 'Total unbilled: ' : 'Total: '}</span>
                        <strong>{DateHandler.convertTotalMinutesToHM(this.props.totalMinutes)}</strong>
                    </p>
                )}

                {this.props.showSelectedMinutes && (
                    <p>
                        <span>Selected: </span>
                        <strong>{DateHandler.convertTotalMinutesToHM(this.props.selectedBaseMinutes)}</strong>
                    </p>
                )}

                {this.props.showPlusMinusCalculation && (
                    <AdjustedMinutesAboveOrBelow
                        className={s.adjusted}
                        minutes={(this.props.selectedBaseMinutes - this.props.selectedAdjustedMinutes) * -1}
                    />
                )}
            </div>
        );
    }
}
