import * as React from 'react';
import * as classNames from 'classnames';
import padStart from 'lodash-es/padStart';
import { observer } from 'mobx-react';
import { DropdownContainer, OptionsList, OptionsListOptionProp, OptionsListValuePropType } from '../Form';
import { Row, Col } from '../Section';
import { Button } from '../Button';
import { IconTickWhite } from '../Icons';
import { observable, computed } from 'mobx';
import { DateHandler } from 'helpers/DateHandler';
import { TimeIncrements } from 'store';

// Styles
const s = require('./TimePicker.css');

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
    private get hoursList(): OptionsListOptionProp[] {
        // Hours array
        let hours: OptionsListOptionProp[] = [];

        // Iterate hours
        hours.push({ value: [0, 12], label: '12' });
        for (let h = 1; h < 12; h++) {
            hours.push({
                value: [h, h + 12],
                label: padStart(h.toString(), 2, '0'),
            });
        }

        // Return
        return hours;
    }

    @computed
    private get minutesList(): OptionsListOptionProp[] {
        // Minutes array
        let minutes: any[] = [];

        // Get increment
        const { increments = 15 } = this.props;

        // Iterate before hour ends
        let minute: number = 0;

        while (minute < 60) {
            minutes.push({
                value: minute,
                label: padStart(minute.toString(), 2, '0'),
            });
            minute += increments;
        }

        // Return
        return minutes;
    }

    @computed
    private get periods(): OptionsListOptionProp[] {
        return [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }];
    }

    @computed
    private get valueLabel(): string {
        return DateHandler.convertTotalMinutesToTimeLabel(this.props.totalMinutesValue).label;
    }

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

    private dropdownContainer: DropdownContainer | null = null;

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

    public render() {
        return (
            <DropdownContainer
                ref={this.referenceDropdownContainer}
                className={classNames(s.timePickerDropdown, this.props.className)}
                align="right"
                minWidth={256}
                minHeight={430}
                type={this.props.isOneLine === true ? 'oneline' : 'twolines'}
                isWhite={this.props.isWhite}
                label={this.props.label || ''}
                value={this.valueLabel}
            >
                <Row className={s.entries} removeGutter={true} removeMargins={true}>
                    <Col size={4} removeGutter={true}>
                        <OptionsList
                            onChange={this.handleTimeChange('hours')}
                            options={this.hoursList}
                            value={this.selectedHour}
                            label="Hours"
                            align="center"
                        />
                    </Col>

                    <Col size={4} removeGutter={true}>
                        <OptionsList
                            onChange={this.handleTimeChange('minutes')}
                            options={this.minutesList}
                            value={this.selectedMinute}
                            label="Minutes"
                            align="center"
                        />
                    </Col>

                    <Col size={4} removeGutter={true}>
                        <OptionsList
                            onChange={this.handleTimeChange('period')}
                            options={this.periods}
                            value={this.valueLabel}
                            label="Period"
                            align="center"
                        />
                    </Col>
                </Row>

                <div className={s.summary}>
                    <Button
                        onClick={this.handleTimeSelectionConfirmation}
                        label={{
                            text: this.valueLabel,
                            size: 'large',
                            color: 'blue',
                            onLeft: true,
                        }}
                        icon={{
                            size: 'small',
                            background: 'green',
                            element: <IconTickWhite width={12} height={9}/>,
                        }}
                    />
                </div>
            </DropdownContainer>
        );
    }

    private referenceDropdownContainer = (ref: DropdownContainer) => (this.dropdownContainer = ref);

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

            case 'minutes':
                if (option.value !== this.selectedMinute) {
                    const value: number = option.value as number;
                    const totalHoursInMinutes = this.selectedHour * 60;
                    totalMinutes =
                        this.selectedPeriod === 'AM'
                            ? totalHoursInMinutes + value
                            : totalHoursInMinutes + value + midDay;
                }
                break;

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

    private handleTimeSelectionConfirmation = () => {
        if (this.dropdownContainer && typeof this.dropdownContainer.closeDropdown === 'function') {
            this.dropdownContainer.closeDropdown();
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
