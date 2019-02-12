import { toFixed, unformat } from 'accounting';
import * as classNames from 'classnames';
import { ButtonPlusOrMinus } from 'components/Button';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Paragraph } from '../Content';

const s = require('./Counter.css');

interface CounterProps {
    className?: string | null;
    onChange?: ((count: { value: number; text: string }) => void) | null;
    align?: 'left' | 'center' | 'right';
    label?: string | null;
    fieldMaxWidth?: number;
    multipleOf?: number | null;
    incrementBy?: number;
    decimals?: number;
    showPlusMinus?: boolean;
    value: number;
    minValue?: number | null;
    maxValue?: number | null;
    readOnly?: boolean;
    showAddedTextOnInput?: boolean;
    readOnlyTextAfterValue?: string;
    readOnlyTextBeforeValue?: string;
}

@observer
export class Counter extends React.Component<CounterProps, {}> {
    static get defaultProps(): CounterProps {
        return {
            className: null,
            onChange: null,
            align: 'left',
            label: null,
            fieldMaxWidth: 64,
            multipleOf: null,
            incrementBy: 1,
            decimals: 0,
            showPlusMinus: true,
            value: 0,
            minValue: null,
            maxValue: null,
            readOnly: false,
            showAddedTextOnInput: false,
            readOnlyTextAfterValue: '',
            readOnlyTextBeforeValue: '',
        };
    }

    @observable private value: number = this.props.value || 0;
    @observable private valueText: string = this.props.value ? this.props.value.toString() : '0';

    @computed private get isIncreaseAvailable(): boolean {
        if (this.props.readOnly) {
            return false;
        }

        if (typeof this.props.maxValue === 'number' && this.props.maxValue <= this.value) {
            return false;
        }

        return true;
    }

    @computed private get isDecreaseAvailable(): boolean {
        if (this.props.readOnly) {
            return false;
        }

        if (typeof this.props.minValue === 'number' && this.props.minValue >= this.value) {
            return false;
        }

        return true;
    }

    public componentDidMount() {
        if (this.props.value !== null && typeof this.props.value === 'number') {
            this.valueText = this.prepareValueAsText(this.props.value, this.props);
        }
    }

    public componentWillReceiveProps(nextProps: CounterProps) {
        let valueChanged: boolean = false;

        if (typeof nextProps.value !== 'undefined' && this.value !== nextProps.value) {
            const newValue = this.alignValueToLimits(nextProps.value);
            const newValueText = this.prepareValueAsText(newValue, this.props);

            this.value = newValue;
            this.valueText = newValueText;
            valueChanged = true;
        }

        if (typeof nextProps.maxValue === 'number' && nextProps.maxValue < this.value) {
            this.value = nextProps.maxValue;
            this.valueText = this.prepareValueAsText(nextProps.maxValue, nextProps);
            valueChanged = true;
        } else if (typeof nextProps.minValue === 'number' && nextProps.minValue > this.value) {
            this.value = nextProps.minValue;
            this.valueText = this.prepareValueAsText(nextProps.minValue, nextProps);
            valueChanged = true;
        }

        if (
            this.props.showAddedTextOnInput !== nextProps.showAddedTextOnInput ||
            this.props.readOnlyTextBeforeValue !== nextProps.readOnlyTextBeforeValue ||
            this.props.readOnlyTextAfterValue !== nextProps.readOnlyTextAfterValue
        ) {
            this.valueText = this.prepareValueAsText(this.value, nextProps);
            valueChanged = true;
        }

        if (valueChanged && this.props.onChange) {
            this.props.onChange({
                value: this.value,
                text: this.valueText,
            });
        }
    }

    public render() {
        return (
            <div
                className={classNames(
                    s.counterField,
                    {
                        [s.center]: this.props.align === 'center',
                        [s.right]: this.props.align === 'right',
                        [s.showPlusMinus]: this.props.showPlusMinus,
                        [s.readOnly]: this.props.readOnly,
                    },
                    this.props.className
                )}
            >
                {this.props.label && (
                    <div className={s.label}>
                        <p>{this.props.label}</p>
                    </div>
                )}

                <div className={s.field}>
                    {(!this.props.readOnly && (
                        <React.Fragment>
                            <input
                                className={classNames({ [s.enabled]: !this.props.readOnly })}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                value={this.valueText}
                                placeholder={this.props.label || ''}
                            />

                            {this.props.showPlusMinus && !this.props.readOnly && (
                                <div className={s.buttons}>
                                    <ButtonPlusOrMinus
                                        className={s.button}
                                        onClick={this.handleIncrement(true)}
                                        isDisabled={!this.isIncreaseAvailable}
                                        isPlus={true}
                                    />

                                    <ButtonPlusOrMinus
                                        className={s.button}
                                        onClick={this.handleIncrement(false)}
                                        isDisabled={!this.isDecreaseAvailable}
                                        isPlus={false}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    )) || <Paragraph>{this.valueText}</Paragraph>}
                </div>
            </div>
        );
    }

    private handleIncrement = (isIncrease: boolean) => () => {
        if (typeof this.props.incrementBy === 'undefined') {
            return;
        }

        const newValue = this.alignValueToLimits(
            isIncrease ? this.value + this.props.incrementBy : this.value - this.props.incrementBy
        );

        if (!isNaN(newValue)) {
            const newValueText = this.prepareValueAsText(newValue, this.props);

            this.value = newValue;
            this.valueText = newValueText;

            if (this.props.onChange) {
                this.props.onChange({
                    value: newValue,
                    text: newValueText,
                });
            }
        }
    };

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.valueText = e.target.value;
    };

    private handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        // Select whole field
        e.target.setSelectionRange(0, e.target.value.length);

        let newValueText = this.valueText;

        // Remove read only beginning of the string
        if (this.props.readOnlyTextBeforeValue && newValueText.indexOf(this.props.readOnlyTextBeforeValue) === 0) {
            newValueText = newValueText.slice(this.props.readOnlyTextBeforeValue.length);
        }

        // Remove read only ending of the string
        if (
            this.props.readOnlyTextAfterValue &&
            newValueText.indexOf(this.props.readOnlyTextAfterValue) >= newValueText.length - 1
        ) {
            newValueText = newValueText.slice(0, newValueText.length - this.props.readOnlyTextAfterValue.length);
        }

        this.valueText = newValueText;
    };

    private handleBlur = () => {
        // Parse value
        let newNumber = unformat(this.valueText);
        if (isNaN(newNumber)) {
            this.valueText = this.prepareValueAsText(this.value, this.props);
        } else {
            newNumber = this.alignValueToLimits(newNumber);
            const newNumberText = this.prepareValueAsText(newNumber, this.props);

            this.value = newNumber;
            this.valueText = newNumberText;

            if (this.props.onChange) {
                this.props.onChange({ value: newNumber, text: newNumberText });
            }
        }
    };

    private alignValueToLimits = (num: number): number => {
        if (typeof this.props.maxValue === 'undefined' || typeof this.props.minValue === 'undefined') {
            return num;
        }

        // Parse value is if's not a number
        let newNumber: number =
            typeof num !== 'undefined' ? (typeof num === 'number' ? num : unformat(num)) : this.props.incrementBy || 0;

        // If number is too big
        if (this.props.maxValue !== null && newNumber > this.props.maxValue) {
            newNumber = this.props.maxValue;
        }

        // If number is too small
        if (this.props.minValue !== null && newNumber < this.props.minValue) {
            newNumber = this.props.minValue;
        }

        // If number is not incremental
        if (this.props.multipleOf) {
            const mod = newNumber % this.props.multipleOf;
            if (mod !== 0) {
                const roundTo = 1 / this.props.multipleOf;
                newNumber = Math.round(newNumber * roundTo) / roundTo;
            }
        }

        return newNumber;
    };

    private prepareValueAsText = (value: number, props: CounterProps): string => {
        return props.showAddedTextOnInput
            ? props.readOnlyTextBeforeValue + toFixed(value, props.decimals || 0) + props.readOnlyTextAfterValue
            : toFixed(value, props.decimals || 0);
    };
}
