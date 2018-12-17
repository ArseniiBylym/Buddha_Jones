import * as React from 'react';
import * as styles from './ManualTimePicker.scss';
import * as classNames from 'classnames';
import padStart from 'lodash-es/padStart';
import { observer } from 'mobx-react';
import { OptionsListValuePropType } from '../Form';
import { observable, computed } from 'mobx';
import { DateHandler } from 'helpers/DateHandler';
import { TimeIncrements } from 'store';

// Props
interface TimePickerProps {
    className?: string | null;
    onChange?: (totalMinutes: number, formatted: { value: number; label: string }) => void;
    increments?: TimeIncrements;
    label?: string | null;
    totalMinutesValue: number;
    isOneLine?: boolean;
    isWhite?: boolean;
    defaultToCurrentTime?: boolean;
}

// Component
@observer
export class TimePicker extends React.Component<TimePickerProps, {}> {
    static get defaultProps(): TimePickerProps {
        return {
            className: null,
            onChange: undefined,
            increments: 15,
            totalMinutesValue: 0,
            isOneLine: false,
            isWhite: false,
            defaultToCurrentTime: false,
        };
    }

    @observable private valueUpdatesCounter: number = 0;

    @computed
    private get selectedHour(): number {
        const midDayMinutes = 60 * 12;
        return this.props.totalMinutesValue > midDayMinutes
            ? Math.floor((this.props.totalMinutesValue - midDayMinutes) / 60)
            : Math.floor(this.props.totalMinutesValue / 60);
    }

    @computed
    private get selectedPeriod(): 'AM' | 'PM' {
        const midDay = 60 * 12;
        return this.props.totalMinutesValue <= 0
            ? 'AM'
            : this.props.totalMinutesValue === midDay
                ? 'PM'
                : this.props.totalMinutesValue > midDay
                    ? 'PM'
                    : 'AM';
    }

    @computed
    private get selectedMinute(): number {
        const hours = Math.floor(this.props.totalMinutesValue / 60);
        return this.props.totalMinutesValue - hours * 60;
    }

    public componentDidMount() {
        if (this.props.defaultToCurrentTime && this.valueUpdatesCounter === 0) {
            const now = new Date();

            if (this.props.onChange) {
                const hours = Math.floor(now.getHours());
                const minutes = now.getMinutes();
                const totalMinutes = this.getValueClosestToIncrement(hours * 60 + minutes);
                this.props.onChange(totalMinutes, DateHandler.convertTotalMinutesToTimeLabel(totalMinutes));
            }
        }
    }

    public componentWillUpdate(nextProps: TimePickerProps) {
        if (this.props.totalMinutesValue !== nextProps.totalMinutesValue) {
            this.valueUpdatesCounter++;
        }
    }

    @computed
    private get parsedHoursAndMinutes(): { hours: string; minutes: string } {
        const hours = this.selectedHour === 0 ? 12 : this.selectedHour;

        return {
            hours: padStart(hours.toString(), 2, '0'),
            minutes: padStart(this.selectedMinute.toString(), 2, '0'),
        };
    }

    public render() {
        return (
            <>
                <div className={styles.manualTimePicker}>
                    <label className={styles.label}>
                        {this.props.label || ''}
                    </label>

                    <input
                        className={styles.manualTimeInput}
                        value={this.parsedHoursAndMinutes.hours}
                        onClick={this.selectInputValue}
                        onChange={this.onChangeTimeEntryInputs}
                        name="hours"
                        type="number"
                    />

                    <div className={styles.separator}/>

                    <input
                        className={styles.manualTimeInput}
                        value={this.parsedHoursAndMinutes.minutes}
                        onChange={this.onChangeTimeEntryInputs}
                        onClick={this.selectInputValue}
                        onBlur={this.handleMinutesManualInput}
                        name="minutes"
                        type="number"
                    />

                    <input
                        className={classNames(styles.manualTimeInput, styles.manualTimeInputWidth)}
                        value={this.selectedPeriod}
                        onClick={this.selectInputValue}
                        onChange={this.onChangeTimeEntryInputs}
                        name="period"
                    />
                </div>
            </>
        );
    }

    private selectInputValue = (event) => {
        event.target.select();
    };

    private onChangeTimeEntryInputs = (e): any => {
        const name: 'hours' | 'minutes' | 'period' = e.target.name;

        let value: number = Number(e.target.value);
        let valuePeriod: string = e.target.value.toLowerCase();

        if (name === 'hours' && value > 12) {
            return false;
        } else if (name === 'hours') {
            this.handleTimeChange(name)({
                value: [value, value + 12],
                label: padStart(value.toString(), 2, '0')
            });
        }

        if (name === 'minutes' && value > 60) {
            return false;
        } else if (name === 'minutes') {
            this.handleTimeChange(name)({
                value,
                label: padStart(value.toString(), 2, '0')
            });
        }

        if (name === 'period' && (valuePeriod.indexOf('a') > -1 || valuePeriod.indexOf('p') > -1)) {
            if (valuePeriod.indexOf('a') > -1) {
                valuePeriod = 'AM';
            }

            if (valuePeriod.indexOf('p') > -1) {
                valuePeriod = 'PM';
            }

            if (this.selectedPeriod !== valuePeriod) {
                this.handleTimeChange(name)({
                    value: valuePeriod,
                    label: valuePeriod
                });
            }
        }

    };

    private handleMinutesManualInput = (e): any => {
        const name: 'hours' | 'minutes' | 'period' = e.target.name;
        let value: number = Number(e.target.value);

        if (name !== 'minutes') {
            return false;
        }

        if (value <= 10) {
            value = 0;
        } else if (value > 10 && value < 23) {
            value = 15;
        } else if (value >= 23 && value <= 35) {
            value = 30;
        } else {
            value = 45;
        }

        this.handleTimeChange(name)({
            value,
            label: padStart(value.toString(), 2, '0')
        });
    };

    private handleTimeChange = (type: 'hours' | 'minutes' | 'period') => (option: {
        value: OptionsListValuePropType;
        label: string;
    }) => {
        const midDay: number = 60 * 12;
        let totalMinutes: number = 0;

        switch (type) {
            case 'hours':
                if (option.value !== this.selectedHour) {
                    const value: number[] = option.value as number[];
                    totalMinutes =
                        this.selectedPeriod === 'AM'
                            ? value[0] * 60 + this.selectedMinute
                            : value[1] * 60 + this.selectedMinute;
                }
                break;

            case 'minutes': {
                const value: number = option.value as number;
                const totalHoursInMinutes = this.selectedHour * 60;

                totalMinutes =
                    this.selectedPeriod === 'AM'
                        ? totalHoursInMinutes + value
                        : totalHoursInMinutes + value + midDay;

                break;
            }

            case 'period':
                if (option.value !== this.selectedPeriod) {
                    totalMinutes =
                        option.value === 'AM'
                            ? this.props.totalMinutesValue - midDay
                            : this.props.totalMinutesValue + midDay;
                }
                break;

            default:
                break;
        }

        if (this.props.totalMinutesValue !== totalMinutes && this.props.onChange) {
            this.props.onChange(totalMinutes, DateHandler.convertTotalMinutesToTimeLabel(totalMinutes));
        }
    };

    private getValueClosestToIncrement = (totalMinutes: number): number => {
        // Get increment
        const { increments } = this.props;

        if (typeof increments === 'undefined') {
            return totalMinutes;
        }

        // Calculate aligned value
        let alignedValue;
        if (totalMinutes <= 0) {
            alignedValue = 0;
        } else {
            const mod = totalMinutes % increments;
            alignedValue = totalMinutes - mod;
        }

        // Return aligned value
        return alignedValue;
    };
}
