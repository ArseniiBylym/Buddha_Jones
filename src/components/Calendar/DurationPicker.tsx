import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './DurationPicker.scss';
import padStart from 'lodash-es/padStart';
import { observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import { Button } from '../Button';
import { IconArrowTopBlue } from '../Icons';
import { TimeIncrements } from 'store';

interface DurationPickerProps {
    onChange?: (totalMinutes: number) => void;
    className?: string | null;
    label?: string | null;
    increments?: TimeIncrements;
    totalMinutesValue: number;
}

@observer
export class DurationPicker extends React.Component<DurationPickerProps, {}> {
    static get defaultProps(): DurationPickerProps {
        return {
            onChange: undefined,
            className: null,
            label: null,
            increments: 15,
            totalMinutesValue: 60,
        };
    }

    @observable private isHoursActive: boolean = false;

    @computed
    private get hours(): number {
        return this.props.totalMinutesValue > 0 ? Math.floor(this.props.totalMinutesValue / 60) : 0;
    }

    @computed
    private get minutes(): number {
        return this.props.totalMinutesValue > 0 ? this.props.totalMinutesValue % 60 : 0;
    }

    @computed
    private get parsedHoursAndMinutes(): { hours: string; minutes: string } {
        return {
            hours: padStart(this.hours.toString(), 2, '0'),
            minutes: padStart(this.minutes.toString(), 2, '0'),
        };
    }

    public render() {
        return (
            <div className={classNames('durationPicker', this.props.className)}>
                {this.props.label && <p className="durationPickerLabel">{this.props.label}</p>}

                <Button
                    className={styles.decreaseArrow}
                    onClick={this.handleDurationChange(false)}
                    icon={{
                        size: 'nopadding',
                        background: 'none',
                        element: <IconArrowTopBlue width={15} height={20} transform={'rotateZ(180deg)'}/>,
                    }}
                />

                <p className="durationPickerTime">
                    <strong>
                        <input
                            type="number"
                            value={this.getHoursValue()}
                            onChange={this.handleDurationHoursManualChange}
                            onClick={this.selectInputValue}
                            className={styles.manualTypeInput}
                        />
                    </strong>
                    <span>H</span>
                    <strong>
                        <input
                            type="number"
                            value={this.parsedHoursAndMinutes.minutes}
                            onChange={this.handleDurationMinutesManualChange}
                            onClick={this.selectInputValue}
                            onBlur={this.handleMinutesManualInput}
                            className={styles.manualTypeInput}
                        />
                    </strong>
                    <span>M</span>
                </p>

                <Button
                    className={styles.increaseArrow}
                    onClick={this.handleDurationChange(true)}
                    icon={{
                        size: 'nopadding',
                        background: 'none',
                        element: <IconArrowTopBlue width={15} height={20}/>,
                    }}
                />
            </div>
        );
    }

    @action
    private handleDurationHoursManualChange = (event) => {
        const currentValue: number = event.target.value;

        if (currentValue >= 0 && currentValue <= 12) {
            const newTotalMinutes: number = (currentValue * 60) + Number(this.minutes);

            if (this.props.onChange) {
                this.props.onChange(Number(newTotalMinutes));
            }
        }
    };

    @action
    private handleDurationMinutesManualChange = (event) => {
        this.setMinutes(event.target.value);
    };

    private getHoursValue(): string {
        if (this.isHoursActive) {
            return this.hours.toString();
        } else {
            return this.parsedHoursAndMinutes.hours.toString();
        }
    }

    private selectInputValue = (event) => {
        event.target.select();
    };

    private handleMinutesManualInput = () => {
        if (this.minutes <= 10) {
            this.setMinutes(0);
        } else if (this.minutes > 10 && this.minutes < 23) {
            this.setMinutes(15);
        } else if (this.minutes >= 23 && this.minutes <= 35) {
            this.setMinutes(30);
        } else {
            this.setMinutes(45);
        }
    };

    private setMinutes(minutes: number) {
        const newTotalMinutes: number = (this.hours * 60) + Number(minutes);

        if (this.props.onChange && minutes <= 45) {
            this.props.onChange(Number(newTotalMinutes));
        }
    }

    private handleDurationChange = (increase: boolean) => () => {
        if (typeof this.props.increments === 'undefined') {
            return;
        }

        // Copy minutes
        let newTotalMinutes: number = increase
            ? this.props.totalMinutesValue + this.props.increments
            : this.props.totalMinutesValue - this.props.increments;

        // Check if minutes are aligned with increments value
        const modulo = newTotalMinutes % this.props.increments;
        if (modulo !== 0) {
            newTotalMinutes = newTotalMinutes - modulo;
        }

        // Check if minutes aren't below 0
        if (newTotalMinutes < 0) {
            newTotalMinutes = 0;
        }

        if (this.props.onChange && newTotalMinutes <= (12 * 60 + 45)) {
            this.props.onChange(newTotalMinutes);
        }
    };
}
