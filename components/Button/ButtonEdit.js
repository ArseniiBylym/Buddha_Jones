import React from 'react';
import PropTypes from 'prop-types';
import history from './../../core/history';
import { Button } from '.';

// Styles
import { IconEditPencilBlue } from './../Icons';

// Props
const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    float: PropTypes.oneOf(['left', 'right', 'none']),
};

// Defaults
const defaultProps = {
    className: null,
    onClick: null,
    label: 'Edit',
    float: 'none'
};

// Component
class ButtonEdit extends React.Component {
    render() {
        return (
            <Button
                className={this.props.className}
                onClick={e => this.handleClick(e)}
                float={this.props.float}
                label={{
                    text: this.props.label,
                    color: 'black',
                    size: 'small',
                    onLeft: true
                }}
                icon={{
                    size: 'small',
                    background: 'none',
                    element:
                        <IconEditPencilBlue
                            width={12}
                            height={17}
                            marginTop={-11}
                            marginLeft={-6}
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

ButtonEdit.propTypes = propTypes;
ButtonEdit.defaultProps = defaultProps;

export default ButtonEdit;
