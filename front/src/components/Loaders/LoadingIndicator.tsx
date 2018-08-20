import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { LoadingSpinner } from '.';

// Types
export type LoadingIndicatorFloatPropType = 'left' | 'right' | 'none';

// Props
interface LoadingIndicatorProps {
    className?: string | null;
    float?: LoadingIndicatorFloatPropType;
    label?: string | null;
    labelOnRight?: boolean;
    isInline?: boolean;
    spinnerColor?: string | null;
    spinnerSize?: number;
}

// Styles
const s = require('./LoadingIndicator.css');

// Component
@observer
export class LoadingIndicator extends React.Component<LoadingIndicatorProps, {}> {
    static get defaultProps(): LoadingIndicatorProps {
        return {
            className: null,
            float: 'none',
            label: null,
            labelOnRight: false,
            isInline: false,
            spinnerColor: null,
            spinnerSize: 21,
        };
    }

    public render() {
        return (
            <div
                className={classNames('comp-loading-indicator', this.props.className, {
                    ['comp-loading-indicator-inline']: this.props.isInline,
                    [s.floatLeft]: this.props.float === 'left',
                    [s.floatRight]: this.props.float === 'right',
                })}
            >
                {this.props.labelOnRight === false && this.renderLabel()}
                <LoadingSpinner size={this.props.spinnerSize} color={this.props.spinnerColor || undefined} />
                {this.props.labelOnRight === true && this.renderLabel()}
            </div>
        );
    }

    private renderLabel() {
        return <p>{this.props.label}</p>;
    }
}
