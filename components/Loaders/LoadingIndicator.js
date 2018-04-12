import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LoadingSpinner } from '.';

// Props
const propTypes = {
    className: PropTypes.string,
    float: PropTypes.oneOf(['left', 'right', 'none']),
    label: PropTypes.string,
    labelOnRight: PropTypes.bool,
    isInline: PropTypes.bool,
    spinnerColor: PropTypes.string,
    spinnerSize: PropTypes.number
};

// Defaults
const defaultProps = {
    className: null,
    float: 'none',
    label: null,
    labelOnRight: false,
    isInline: false,
    spinnerColor: null,
    spinnerSize: 21
};

// Styles
const s = require('./LoadingIndicator.css');

// Component
class LoadingIndicator extends React.Component {
    render() {
        return (
            <div
                className={classNames('comp-loading-indicator', this.props.className, {
                    ['comp-loading-indicator-inline']: this.props.isInline,
                    [s.floatLeft]: this.props.float === 'left',
                    [s.floatRight]: this.props.float === 'right',
                })}
            >
                {(this.props.labelOnRight === false) && this.renderLabel()}
                <LoadingSpinner size={this.props.spinnerSize} color={this.props.spinnerColor || undefined} />
                {(this.props.labelOnRight === true) && this.renderLabel()}
            </div>
        );
    }

    renderLabel() {
        return (
            <p>{this.props.label}</p>
        );
    }
}

LoadingIndicator.propTypes = propTypes;
LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
