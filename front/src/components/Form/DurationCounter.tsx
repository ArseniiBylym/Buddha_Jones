import * as classNames from 'classnames';
import { ButtonPlusOrMinus } from 'components/Button';
import { DelayChildren } from 'components/Utility';
import { DateHandler } from 'helpers/DateHandler';
import { computed, observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { DurationCounterDropdown } from './DurationCounterDropdown';

const s = require('./DurationCounter.css');

export type DurationCounterExceedColor = 'default' | 'success' | 'alert';

export interface DurationCounterDropdownEntry {
    value: number | string;
    isSelected: boolean;
    label: string;
}

export interface DurationCounterDropdownOptions {
    optionsList: DurationCounterDropdownEntry[];
    positionX: number;
    positionY: number;
    width: number;
    height: number;
}

interface DurationCounterExceedProps {
    value: number;
    color: DurationCounterExceedColor;
}

interface DurationCounterProps {
    className?: string;
    onChange?: (totalMinutes: number) => void;
    incrementBy?: number;
    value?: number;
    valueMoreThan?: DurationCounterExceedProps;
    valueLessThan?: DurationCounterExceedProps;
    minValue?: number;
    maxValue?: number;
    readOnly?: boolean;
}

@observer
export class DurationCounter extends React.Component<DurationCounterProps, {}> {
    static get defaultProps(): DurationCounterProps {
        return {
            className: undefined,
            onChange: undefined,
            incrementBy: 15,
            value: 0,
            valueMoreThan: {
                value: 0,
                color: 'default',
            },
            valueLessThan: {
                value: 0,
                color: 'default',
            },
            minValue: 0,
            maxValue: undefined,
            readOnly: false,
        };
    }

    @observable private totalMinutes: number = this.props.value || 0;
    @observable private dropdown: DurationCounterDropdownOptions | null = null;

    @computed private get valueFormatted(): string {
        return DateHandler.convertTotalMinutesToHM(this.totalMinutes, true);
    }

    @computed private get isIncreaseAvailable(): boolean {
        if (this.props.readOnly) {
            return false;
        }

        if (typeof this.props.maxValue === 'number' && this.props.maxValue <= this.totalMinutes) {
            return false;
        }

        return true;
    }

    @computed private get isDecreaseAvailable(): boolean {
        if (this.props.readOnly) {
            return false;
        }

        if (typeof this.props.minValue === 'number' && this.props.minValue >= this.totalMinutes) {
            return false;
        }

        return true;
    }

    @computed private get className(): string {
        let isValueExceeded: boolean = this.totalMinutes > this.props.valueMoreThan!.value;
        let isValueShort: boolean = this.totalMinutes < this.props.valueLessThan!.value;

        return classNames(
            s.counter,
            {
                [s.success]:
                    (isValueExceeded && this.props.valueMoreThan!.color === 'success') ||
                    (isValueShort && this.props.valueLessThan!.color === 'success'),
                [s.alert]:
                    (isValueExceeded && this.props.valueMoreThan!.color === 'alert') ||
                    (isValueShort && this.props.valueLessThan!.color === 'alert'),
            },
            this.props.className
        );
    }

    public componentWillReceiveProps(nextProps: DurationCounterProps) {
        if (this.props.value !== nextProps.value && this.totalMinutes !== nextProps.value) {
            this.totalMinutes = nextProps.value || 0;
        }
    }

    public render() {
        return (
            <React.Fragment>
                <div className={this.className}>
                    <ButtonPlusOrMinus
                        className={s.minus}
                        onClick={this.handleDecrease}
                        isDisabled={!this.isDecreaseAvailable}
                        isPlus={false}
                    />

                    <input
                        className={!this.props.readOnly ? s.enabled : undefined}
                        tabIndex={-1}
                        onFocus={this.handleOpenDropdown}
                        onBlur={this.handleCloseDropdown}
                        onChange={this.handleFakeInputChange}
                        value={this.valueFormatted}
                    />

                    <ButtonPlusOrMinus
                        className={s.plus}
                        onClick={this.handleIncrease}
                        isDisabled={!this.isIncreaseAvailable}
                        isPlus={true}
                    />
                </div>

                <DelayChildren isMounted={this.dropdown !== null} delayUnmount={300}>
                    {({ isMounted }) => (
                        <DurationCounterDropdown
                            onClick={this.handleDirectChange}
                            options={this.dropdown}
                            isMounted={isMounted}
                        />
                    )}
                </DelayChildren>
            </React.Fragment>
        );
    }

    private handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (this.props.readOnly) {
            return;
        }

        if (this.isIncreaseAvailable) {
            const value = this.totalMinutes + (this.props.incrementBy || 15);
            this.totalMinutes = value;
            this.handleChange(value);
        }
    };

    private handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.readOnly) {
            return;
        }

        if (this.isDecreaseAvailable) {
            const value = this.totalMinutes - (this.props.incrementBy || 15);
            this.totalMinutes = value;
            this.handleChange(value);
        }
    };

    private handleDirectChange = (value: number) => {
        if (typeof value === 'number') {
            this.totalMinutes = value;
            this.handleChange(value);
        }
    };

    private handleChange = (value: number) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private handleFakeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    private handleCloseDropdown = (e: React.FocusEvent<HTMLInputElement>) => {
        this.dropdown = null;
    };

    private handleOpenDropdown = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (this.props.readOnly) {
            return;
        }

        const input = e.target;
        const node = input.parentElement ? input.parentElement : input;
        const rect = node.getBoundingClientRect();
        const scrollTop =
            document && document.documentElement && document.documentElement.scrollTop
                ? document.documentElement.scrollTop
                : 0;

        const options = this.generateListOfDropdownOptions();

        this.dropdown = {
            optionsList: options,
            positionX: rect.left,
            positionY: rect.top + scrollTop,
            width: rect.width,
            height: rect.height,
        };
    };

    private generateListOfDropdownOptions = (): DurationCounterDropdownEntry[] => {
        const value = toJS(this.totalMinutes);

        let options: DurationCounterDropdownEntry[] = [
            {
                value: value,
                label: DateHandler.convertTotalMinutesToHM(value, true),
                isSelected: true,
            },
        ];

        for (let i = 1; i <= 32; i++) {
            const earlier = value - i * (this.props.incrementBy || 15);
            const later = value + i * (this.props.incrementBy || 15);

            if (
                typeof this.props.minValue === 'undefined' ||
                (typeof this.props.minValue === 'number' && earlier >= this.props.minValue)
            ) {
                options = [
                    {
                        value: earlier,
                        label: DateHandler.convertTotalMinutesToHM(earlier, true),
                        isSelected: false,
                    },
                    ...options,
                ];
            }

            if (
                typeof this.props.maxValue === 'undefined' ||
                (typeof this.props.maxValue === 'number' && later <= this.props.maxValue)
            ) {
                options = [
                    ...options,
                    {
                        value: later,
                        label: DateHandler.convertTotalMinutesToHM(later, true),
                        isSelected: false,
                    },
                ];
            }
        }

        return options;
    };
}
