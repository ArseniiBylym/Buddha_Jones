import * as React from 'react';
import { observer } from 'mobx-react';

// Styles
const s = require('./Select.css');

// Types
type SelectValuePropType = string | number | undefined;

interface SelectOptionPropType {
    key?: string;
    value: string;
    label: string;
}

// Props
interface SelectProps {
    onChange?: (value: string) => void;
    label?: string;
    loadingLabel?: string;
    value: SelectValuePropType;
    options: SelectOptionPropType[];
}

// Component
@observer
export class Select extends React.Component<SelectProps, {}> {
    static get defaultProps(): SelectProps {
        return {
            onChange: undefined,
            label: '',
            loadingLabel: 'Loading...',
            value: undefined,
            options: [],
        };
    }

    public render() {
        return (
            <select className={s.select} value={this.props.value} onChange={this.handleChange}>
                {this.props.label && (
                    <option key="label" value="">
                        {this.props.label}
                    </option>
                )}

                {this.props.options &&
                    this.props.options.map(
                        option =>
                            option.value !== null ? (
                                <option
                                    key={option.key ? option.key : option.value + ' ' + option.label}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ) : null
                    )}

                {(typeof this.props.options === 'undefined' || this.props.options.length <= 0) && (
                    <option key="loading" value="">
                        {this.props.loadingLabel || ''}
                    </option>
                )}
            </select>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    };
}
