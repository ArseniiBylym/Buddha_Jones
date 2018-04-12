import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '.';

// Styles
import { IconClose } from './../Icons';

// Props
const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    labelColor: PropTypes.oneOf(['black', 'white', 'yellow', 'green', 'blue', 'orange']),
    float: PropTypes.oneOf(['left', 'right', 'none']),
    tooltipText: PropTypes.string,
    tooltipOn: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    iconBackground: PropTypes.oneOf(['none', 'none-alt', 'white', 'yellow', 'blue', 'orange', 'green']),
};

// Defaults
const defaultProps = {
    className: null,
    onClick: null,
    label: 'Close',
    labelColor: 'orange',
    float: 'none',
    tooltipText: null,
    tooltipOn: 'left',
    iconBackground: 'white',
};

// Component
class ButtonClose extends React.Component {
    render() {
        return (
            <Button
                className={classNames(this.props.className)}
                onClick={e => this.handleClick(e)}
                float={this.props.float}
                label={this.props.label ? {
                    onLeft: true,
                    color: this.props.labelColor,
                    text: this.props.label
                } : undefined}
                tooltip={this.props.tooltipText ? {
                    text: this.props.tooltipText,
                    on: this.props.tooltipOn
                } : undefined}
                icon={{
                    size: 'small',
                    background: this.props.iconBackground,
                    element:
                        <IconClose
                            width={10}
                            marginLeft={-5}
                            height={10}
                            marginTop={-5}
                        />
                }}
            />
        );
    }

    handleClick(e) {
        if (typeof e !== 'undefined' && typeof e.preventDefault !== 'undefined') {
            e.preventDefault();
        }

        if (typeof this.props.onClick === 'function') {
            this.props.onClick(e);
        }
    }
}

ButtonClose.propTypes = propTypes;
ButtonClose.defaultProps = defaultProps;

export default ButtonClose;

