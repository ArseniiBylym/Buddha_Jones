import * as classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IconTickWhite } from '../Icons';

const s = require('./Checkbox.css');

export type CheckboxValue = string | number | boolean | null;

interface CheckboxProps {
    onChange?: (checked: boolean, value: CheckboxValue) => void;
    className?: string;
    align?: 'left' | 'center' | 'right';
    checked?: boolean;
    disabled?: boolean;
    value?: CheckboxValue;
    valueUnchecked?: CheckboxValue;
    label?: string;
    labelOnLeft?: boolean;
}

@observer
export class Checkbox extends React.Component<CheckboxProps, {}> {
    static get defaultProps(): CheckboxProps {
        return {
            onChange: undefined,
            className: undefined,
            align: 'left',
            checked: false,
            disabled: false,
            value: true,
            valueUnchecked: null,
            label: '',
            labelOnLeft: false,
        };
    }

    @observable private isChecked: boolean = this.props.checked || false;

    public componentWillUpdate(nextProps: CheckboxProps) {
        if (this.props.checked !== nextProps.checked && nextProps.checked !== this.isChecked) {
            this.isChecked = nextProps.checked || false;
        }
    }

    public render() {
        return (
            <label
                className={classNames(s.checkbox, this.props.className, {
                    [s.alignLeft]: this.props.align === 'left',
                    [s.alignCenter]: this.props.align === 'center',
                    [s.alignRight]: this.props.align === 'right',
                    [s.labelOnLeft]: this.props.labelOnLeft,
                    [s.checked]: this.isChecked,
                    [s.disabled]: this.props.disabled,
                })}
            >
                {this.props.labelOnLeft === true && this.renderLabel()}

                <input
                    tabIndex={-1}
                    onChange={this.handleCheckboxToggle}
                    disabled={this.props.disabled}
                    type="checkbox"
                    value={
                        this.props.value === null
                            ? 'null'
                            : this.props.value === true
                            ? 'true'
                            : this.props.value === false
                            ? 'false'
                            : this.props.value
                    }
                    checked={this.isChecked}
                />

                {this.props.labelOnLeft === false && this.renderLabel()}

                <button
                    tabIndex={this.props.disabled ? -1 : undefined}
                    onClick={this.handleIconButtonClick}
                    className={s.icon}
                >
                    <IconTickWhite width={12} height={9} />
                </button>
            </label>
        );
    }

    private renderLabel = () => {
        return <p>{this.props.label}</p>;
    };

    private handleIconButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.handleCheckboxToggle();
    };

    private handleCheckboxToggle = () => {
        if (this.props.disabled === false) {
            const isChecked = !this.isChecked;
            this.isChecked = isChecked;

            if (this.props.onChange) {
                this.props.onChange(isChecked, isChecked ? this.props.value! : this.props.valueUnchecked!);
            }
        }
    };
}
