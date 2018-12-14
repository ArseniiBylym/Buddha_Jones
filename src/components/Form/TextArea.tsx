import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';

// Styles
const s = require('./TextArea.css');

// Types
type TextAreaAlignProp = 'left' | 'center' | 'right';

// Props
interface TextAreaProps {
    className?: string | null;
    fieldClassName?: string | null;
    onChange?: ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) | null;
    onPaste?: ((e: React.ClipboardEvent<HTMLTextAreaElement>) => void) | null;
    onFocus?: ((e: React.FocusEvent<HTMLTextAreaElement>) => void) | null;
    onBlur?: ((e: React.FocusEvent<HTMLTextAreaElement>) => void) | null;
    disabled?: boolean;
    value: string;
    label: string;
    width?: number;
    height?: number;
    align?: TextAreaAlignProp | null;
    autoFocus?: boolean;
}

// Component
@observer
export class TextArea extends React.Component<TextAreaProps, {}> {
    static get defaultProps(): TextAreaProps {
        return {
            className: null,
            fieldClassName: null,
            onChange: null,
            onPaste: null,
            onFocus: null,
            onBlur: null,
            disabled: false,
            value: '',
            label: '',
            width: 0,
            height: 0,
            align: null,
            autoFocus: false,
        };
    }

    public render() {
        return (
            <div className={classNames(s.fieldGroup, this.props.className)}>
                <textarea
                    style={{
                        textAlign:
                            this.props.align !== null && this.props.align !== 'left' ? this.props.align : undefined,
                        maxWidth: this.props.width ? this.props.width + 'px' : undefined,
                        minHeight: this.props.height ? this.props.height + 'px' : undefined,
                        height: this.props.height && this.props.height < 64 ? this.props.height + 'px' : undefined,
                    }}
                    className={classNames(this.props.fieldClassName)}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autoFocus}
                    placeholder={this.props.label}
                    value={this.props.value}
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    private handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        if (this.props.onPaste) {
            this.props.onPaste(e);
        }
    };

    private handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    private handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };
}
