import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { upperFirst as _upperFirst } from 'lodash';

// Styles
const s = require('./Input.css');

// Types
type InputAlignProp = 'left' | 'center' | 'right';
export type InputColorProp = 'default' | 'blue' | 'brown' | 'blueFill' | 'brownFill' | 'greenFill' | 'red';
type InputType = 'text' | 'email' | 'password';

// Props
export interface InputProps {
    className?: string | null;
    fieldClassName?: string | null;
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | null;
    onPaste?: ((e: React.ClipboardEvent<HTMLInputElement>) => void) | null;
    onFocus?: ((e: React.FocusEvent<HTMLInputElement> | null) => void) | null;
    onBlur?: ((e: React.FocusEvent<HTMLInputElement> | null) => void) | null;
    disabled?: boolean;
    readOnly?: boolean;
    label: string;
    name?: string | null;
    icon?: JSX.Element | null;
    value?: string | null;
    defaultValue?: string;
    autoFocus?: boolean;
    maxWidth?: number;
    minWidth?: number;
    align?: InputAlignProp | null;
    color?: InputColorProp;
    type?: InputType;
}

// Component
@observer
export class Input extends React.Component<InputProps, {}> {
    static get defaultProps(): InputProps {
        return {
            className: null,
            fieldClassName: null,
            onChange: null,
            onPaste: null,
            onFocus: null,
            onBlur: null,
            disabled: false,
            readOnly: false,
            label: '',
            icon: null,
            name: null,
            value: null,
            defaultValue: '',
            autoFocus: false,
            maxWidth: 0,
            minWidth: 0,
            align: null,
            color: 'default',
            type: 'text',
        };
    }

    public input: HTMLInputElement | null = null;

    public clear = () => {
        if (this.input) {
            this.input.value = '';
        }
    };

    public focus = () => {
        if (this.input && typeof this.input.focus !== 'undefined') {
            this.input.focus();

            if (this.props.onFocus) {
                this.props.onFocus(null);
            }
        }
    };

    public render() {
        return (
            <div
                className={classNames(s.fieldGroup, this.props.className, {
                    [s['fieldGroup' + _upperFirst(this.props.color)]]: this.props.color !== 'default',
                })}
            >
                <input
                    ref={this.referenceInputField}
                    type={this.props.type}
                    style={{
                        maxWidth: this.props.maxWidth || undefined,
                        minWidth: this.props.minWidth || undefined,
                        textAlign: this.props.align || undefined,
                        paddingRight: undefined /*this.props.icon && typeof this.props.icon.width !== 'undefined'
                            ? (16 + this.props.icon.width) + 'px'
                            : undefined*/,
                    }}
                    className={classNames(this.props.fieldClassName)}
                    name={this.props.name ? this.props.name : undefined}
                    disabled={this.props.disabled === true ? true : false}
                    readOnly={this.props.readOnly === true ? true : false}
                    placeholder={this.props.label}
                    value={this.props.value !== null ? this.props.value : undefined}
                    defaultValue={this.props.value === null ? this.props.defaultValue : undefined}
                    autoFocus={this.props.autoFocus === true ? true : undefined}
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />

                {this.props.icon && this.props.icon}
            </div>
        );
    }

    private referenceInputField = (ref: HTMLInputElement) => (this.input = ref);

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    private handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (this.props.onPaste) {
            this.props.onPaste(e);
        }
    };

    private handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };
}
