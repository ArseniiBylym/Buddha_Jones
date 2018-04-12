import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '.';

// Styles
import { IconPlusBlue } from './../Icons';

// Props
const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    labelColor: PropTypes.oneOf(['black', 'white', 'yellow', 'green', 'blue', 'orange']),
    labelOnLeft: PropTypes.bool,
    float: PropTypes.oneOf(['left', 'right', 'none']),
};

// Defaults
const defaultProps = {
    className: null,
    onClick: null,
    label: 'Add',
    labelColor: 'blue',
    labelOnLeft: true,
    float: 'none',
};

// Component
class ButtonAdd extends React.Component {
    render() {
        return (
            <Button
                onClick={e => this.handleClick(e)}
                className={classNames(this.props.className)}
                float={this.props.float}
                label={this.props.label ? {
                    text: this.props.label,
                    color: this.props.labelColor,
                    onLeft: this.props.labelOnLeft
                } : undefined}
                icon={{
                    size: 'small',
                    background: 'white',
                    element:
                        <IconPlusBlue
                            width={12}
                            marginLeft={-6}
                            height={12}
                            marginTop={-6}
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

ButtonAdd.propTypes = propTypes;
ButtonAdd.defaultProps = defaultProps;

export default ButtonAdd;
