import * as React from 'react';
import { observer } from 'mobx-react';
import { InputProps, Input } from '.';
import { IconSearchLoupe } from '../Icons';

// Props
interface InputSearchProps extends InputProps {}

// Component
@observer
export class InputSearch extends React.Component<InputSearchProps, {}> {
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
            label: 'Search...',
            icon: null,
            name: null,
            value: null,
            defaultValue: '',
            autoFocus: false,
            maxWidth: 0,
            minWidth: 320,
            align: null,
            color: 'default',
            type: 'text',
        };
    }

    public render() {
        return (
            <Input
                onChange={this.handleChange}
                onPaste={this.handlePaste}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                label={this.props.label}
                value={this.props.value}
                minWidth={this.props.minWidth}
                icon={
                    this.props.icon !== null
                        ? this.props.icon
                        :  <IconSearchLoupe width={13} height={13} marginTop={-6} />
                }
            />

        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    private handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (this.props.onPaste) {
            this.props.onPaste(e);
        }
    }

    private handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }
}
