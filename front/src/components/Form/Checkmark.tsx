import * as React from 'react';
import * as classNames from 'classnames';
import { capitalize as _capitalize } from 'lodash';

// Styles
const s = require('./Checkmark.css');
import { IconTickBlue, IconTickGreen, IconTickWhite } from '../Icons';
import { observer } from 'mobx-react';

// Types
type CheckmarkTypeProp = 'default' | 'green' | 'blue';
type CheckmarkSizeProp = 'default' | 'small';

// Props
interface CheckmarkProps {
    className?: string;
    onClick?: ((checked: boolean) => void) | null;
    type?: CheckmarkTypeProp;
    size?: CheckmarkSizeProp;
    readOnly?: boolean;
    checked: boolean;
    label?: string | null;
    labelOnLeft?: boolean;
}

// Component
@observer
export class Checkmark extends React.Component<CheckmarkProps, {}> {
    static get defaultProps(): CheckmarkProps {
        return {
            className: undefined,
            onClick: null,
            type: 'default',
            size: 'default',
            readOnly: false,
            checked: false,
            label: null,
            labelOnLeft: false,
        };
    }

    public render() {
        return (
            <label
                onClick={this.handleCheckmarkClick}
                className={classNames(
                    s.label,
                    {
                        [s['label' + _capitalize(this.props.type)]]:
                            this.props.type !== 'default' && this.props.type !== 'blue',
                        [s['label' + _capitalize(this.props.size)]]: this.props.size !== 'default',
                    },
                    this.props.className
                )}
            >
                {this.props.labelOnLeft === true && this.renderLabel()}
                {this.renderCheckmark()}
                {this.props.labelOnLeft === false && this.renderLabel()}
            </label>
        );
    }

    private renderCheckmark() {
        return React.createElement(
            this.props.readOnly ? 'p' : 'button',
            {
                className: classNames(s.checkmark, {
                    [s.active]: this.props.checked,
                    [s.readonly]: this.props.readOnly,
                }),
            },
            this.renderIcon()
        );
    }

    private renderLabel() {
        return this.props.label ? <span className={s.name}>{this.props.label}</span> : null;
    }

    private renderIcon() {
        return this.props.checked ? (
            <IconTickWhite width={11} height={9} />
        ) : this.props.type === 'green' ? (
            <IconTickGreen width={11} height={9} />
        ) : (
            <IconTickBlue width={11} height={9} />
        );
    }

    private handleCheckmarkClick = (e: React.MouseEvent<HTMLLabelElement>) => {
        // Prevent default
        e.preventDefault();

        // Read only does not do anything
        if (!this.props.readOnly && this.props.onClick) {
            this.props.onClick(!this.props.checked);
        }
    };
}
