import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { unformat, toFixed } from 'accounting';
import { observable } from 'mobx';
import { Row, Col } from '../Section';
import { IconPlusWhite, IconMinusWhite } from '../Icons';
import { Paragraph } from '../Content';
import { Input } from '.';

// Styles
const s = require('./Counter.css');

// Props
interface CounterProps {
    className?: string | null;
    onChange?: ((count: { value: number; text: string }) => void) | null;
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

// Component
@observer
export class Counter extends React.Component<CounterProps, {}> {
    static get defaultProps(): CounterProps {
        return {
            className: null,
            onChange: null,
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

    public componentDidMount() {
        if (this.props.value !== null && typeof this.props.value === 'number') {
            this.valueText = this.prepareValueAsText(this.props.value);
        }
    }

    public componentWillReceiveProps(nextProps: CounterProps) {
        if (typeof nextProps.value !== 'undefined' && this.value !== nextProps.value) {
            const newValue = this.alignValueToLimits(nextProps.value);
            const newValueText = this.prepareValueAsText(newValue);

            this.value = newValue;
            this.valueText = newValueText;
        }
    }

    public render() {
        return (
            <Row className={classNames(s.counterField, { [s.readOnly]: this.props.readOnly })} removeGutter={true}>
                {this.props.label && (
                    <Col className={s.counterLabelCol} removeGutter={true}>
                        <p className={s.counterLabel}>{this.props.label}</p>
                    </Col>
                )}

                {this.props.showPlusMinus && (
                    <Col removeGutter={true}>
                        <button
                            className={classNames(s.incrementButton, s.incrementMinusButton, {
                                [s.incrementButtonDisabled]:
                                    typeof this.props.minValue !== 'undefined' && this.props.minValue !== null
                                        ? this.value <= this.props.minValue
                                        : false,
                            })}
                            onClick={this.handleIncrement(false)}
                        >
                            <IconMinusWhite />
                        </button>
                    </Col>
                )}

                {(this.props.readOnly === false && (
                    <Col className={s.fieldCol} removeGutter={true}>
                        <Input
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            value={this.valueText}
                            maxWidth={this.props.fieldMaxWidth}
                            label={this.props.label ? this.props.label : ''}
                            align="center"
                        />
                    </Col>
                )) || (
                    <Col removeGutter={true}>
                        <Paragraph>{this.valueText}</Paragraph>
                    </Col>
                )}

                {this.props.showPlusMinus && (
                    <Col removeGutter={true}>
                        <button
                            className={classNames(s.incrementButton, s.incrementPlusButton, {
                                [s.incrementButtonDisabled]:
                                    typeof this.props.maxValue !== 'undefined' && this.props.maxValue !== null
                                        ? this.value >= this.props.maxValue
                                        : false,
                            })}
                            onClick={this.handleIncrement(true)}
                        >
                            <IconPlusWhite />
                        </button>
                    </Col>
                )}
            </Row>
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
            const newValueText = this.prepareValueAsText(newValue);

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
            this.valueText = this.prepareValueAsText(this.value);
        } else {
            newNumber = this.alignValueToLimits(newNumber);
            const newNumberText = this.prepareValueAsText(newNumber);

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

    private prepareValueAsText = (value: number): string => {
        return this.props.showAddedTextOnInput
            ? this.props.readOnlyTextBeforeValue +
                  toFixed(value, this.props.decimals || 0) +
                  this.props.readOnlyTextAfterValue
            : toFixed(value, this.props.decimals || 0);
    };
}
