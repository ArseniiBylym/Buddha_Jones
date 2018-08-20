import * as React from 'react';
import { observer } from 'mobx-react';
import { TimeApprovalDayHoursSummary } from 'types/timeApproval';
import { DateHandler } from 'helpers/DateHandler';
import { ButtonAdd } from 'components/Button';

// Styles
const s = require('./TimeApprovalDaySummary.css');

// Props
interface TimeApprovalDaySummaryProps {
    addAction?: {
        onClick: () => void;
        label: string;
    } | null;
    summary: TimeApprovalDayHoursSummary;
}

// Component
@observer
export class TimeApprovalDaySummary extends React.Component<TimeApprovalDaySummaryProps, {}> {
    static get defaultProps(): TimeApprovalDaySummaryProps {
        return {
            addAction: null,
            summary: {
                breakTimeInMinutes: 0,
                regularTimeInMinutes: 0,
                overTimeInMinutes: 0,
                doubleTimeInMinutes: 0,
            },
        };
    }

    public render() {
        return (
            <div className={s.summary}>
                <div className={s.actions}>
                    {this.props.addAction && (
                        <ButtonAdd onClick={this.handleAddAction} label={this.props.addAction.label} />
                    )}
                </div>

                <div className={s.hours}>
                    {this.props.summary.breakTimeInMinutes > 0 && (
                        <p>
                            {'Break hours: '}
                            <strong>
                                {DateHandler.convertTotalMinutesToHM(this.props.summary.breakTimeInMinutes)}
                            </strong>
                        </p>
                    )}

                    {this.props.summary.regularTimeInMinutes !== null &&
                        this.props.summary.regularTimeInMinutes > 0 && (
                            <p className={s.regular}>
                                {'Regular hours: '}
                                <strong>
                                    {DateHandler.convertTotalMinutesToHM(this.props.summary.regularTimeInMinutes)}
                                </strong>
                            </p>
                        )}

                    {this.props.summary.overTimeInMinutes !== null &&
                        this.props.summary.overTimeInMinutes > 0 && (
                            <p className={s.overtime}>
                                {'Overtime hours: '}
                                <strong>
                                    {DateHandler.convertTotalMinutesToHM(this.props.summary.overTimeInMinutes)}
                                </strong>
                            </p>
                        )}

                    {this.props.summary.doubleTimeInMinutes !== null &&
                        this.props.summary.doubleTimeInMinutes > 0 && (
                            <p className={s.doubletime}>
                                {'Double time hours: '}
                                <strong>
                                    {DateHandler.convertTotalMinutesToHM(this.props.summary.doubleTimeInMinutes)}
                                </strong>
                            </p>
                        )}
                </div>
            </div>
        );
    }

    private handleAddAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.addAction) {
            this.props.addAction.onClick();
        }
    };
}
