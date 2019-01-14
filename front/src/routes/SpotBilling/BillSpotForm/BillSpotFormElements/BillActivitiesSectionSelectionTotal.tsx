import * as classNames from 'classnames';
import { DateHandler } from 'helpers/DateHandler';
import { computed } from 'mobx';
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
    areTotalMinutesUnbilled?: boolean;
}

interface BillActivitiesSectionSelectionTotalProps extends BillTimeEntriesSelectionTotals {}

@observer
export class BillActivitiesSectionSelectionTotal extends React.Component<BillActivitiesSectionSelectionTotalProps, {}> {
    @computed private get isPositive(): boolean {
        return this.props.selectedAdjustedMinutes >= this.props.selectedBaseMinutes;
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

                <p>
                    <span>Selected: </span>
                    <strong>{DateHandler.convertTotalMinutesToHM(this.props.selectedBaseMinutes)}</strong>
                </p>

                <p className={classNames({ [s.positive]: this.isPositive, [s.negative]: this.isPositive === false })}>
                    <strong>
                        {(this.isPositive ? '+' : '-') +
                            ' ' +
                            DateHandler.convertTotalMinutesToHM(
                                this.isPositive
                                    ? this.props.selectedAdjustedMinutes - this.props.selectedBaseMinutes
                                    : this.props.selectedBaseMinutes - this.props.selectedAdjustedMinutes
                            )}
                    </strong>
                </p>
            </div>
        );
    }
}
