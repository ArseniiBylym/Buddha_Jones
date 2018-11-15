import * as React from 'react';
import * as classNames from 'classnames';
import padStart from 'lodash-es/padStart';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { Button } from '../Button';
import { IconArrowTopBlue } from '../Icons';
import { TimeIncrements } from 'store';

// Styles
const s = require('./DurationPicker.css');

// Props
interface DurationPickerProps {
    onChange?: (totalMinutes: number) => void;
    className?: string | null;
    label?: string | null;
    increments?: TimeIncrements;
    totalMinutesValue: number;
}

// Component
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
                    className={s.decreaseArrow}
                    onClick={this.handleDurationChange(false)}
                    icon={{
                        size: 'nopadding',
                        background: 'none',
                        element: <IconArrowTopBlue width={15} height={20} transform={'rotateZ(180deg)'} />,
                    }}
                />

                <p className="durationPickerTime">
                    <strong>{this.parsedHoursAndMinutes.hours}</strong>
                    <span>H</span>
                    <strong>{this.parsedHoursAndMinutes.minutes}</strong>
                    <span>M</span>
                </p>

                <Button
                    className={s.increaseArrow}
                    onClick={this.handleDurationChange(true)}
                    icon={{
                        size: 'nopadding',
                        background: 'none',
                        element: <IconArrowTopBlue width={15} height={20} />,
                    }}
                />
            </div>
        );
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

        if (this.props.onChange) {
            this.props.onChange(newTotalMinutes);
        }
    };
}
