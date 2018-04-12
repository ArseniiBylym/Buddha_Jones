import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '.';
import { LoadingIndicator } from './../Loaders';

// Styles
import { IconCheckmarkGreen } from './../Icons';

// Props
const propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    float: PropTypes.oneOf(['left', 'right', 'none']),
    label: PropTypes.string,
    labelColor: PropTypes.oneOf(['black', 'white', 'yellow', 'green', 'blue', 'orange']),
    labelOnLeft: PropTypes.bool,
    saving: PropTypes.bool,
};

// Defaults
const defaultProps = {
    onClick: null,
    className: null,
    float: 'none',
    label: 'Save',
    labelColor: 'blue',
    labelOnLeft: true,
    saving: false,
};

// Component
class ButtonSave extends React.Component {
    render() {
        return !this.props.saving ? (
            <Button
                onClick={e => this.handleClick(e)}
                float={this.props.float}
                label={this.props.label ? {
                    text: this.props.label,
                    color: this.props.labelColor,
                    onLeft: this.props.labelOnLeft,
                    size: 'small',
                } : undefined}
                icon={{
                    size: 'small',
                    background: 'none',
                    element:
                        <IconCheckmarkGreen
                            width={24}
                            marginLeft={-12}
                            height={24}
                            marginTop={-12}
                        />,
                }}
            />
        ) : (
            <LoadingIndicator
                float={this.props.float}
                label={this.props.label}
                labelOnRight={!this.props.labelOnLeft}
                isInline={false}
                spinnerSize={24}
            />
        );
    }

    handleClick(e) {
        e.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
}

ButtonSave.propTypes = propTypes;
ButtonSave.defaultProps = defaultProps;

export default ButtonSave;
