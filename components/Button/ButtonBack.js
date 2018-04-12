import React from 'react';
import PropTypes from 'prop-types';
import history from './../../core/history';
import { Button } from '.';

// Styles
import { IconArrowLeftYellow } from './../Icons';

// Props
const propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string
};

// Defaults
const defaultProps = {
    label: 'Back'
};

// Component
class ButtonBack extends React.Component {
    render() {
        return (
            <Button
                onClick={e => this.handleClick(e)}
                label={{
                    text: this.props.label,
                    color: 'white',
                    size: 'large',
                    onLeft: true
                }}
                icon={{
                    size: 'small',
                    background: 'none-alt',
                    element:
                        <IconArrowLeftYellow
                            width={15}
                            height={11}
                            marginTop={-5}
                            marginLeft={-7}
                        />
                }}
            />
        );
    }

    handleClick(e) {
        if (typeof e !== 'undefined' && typeof e.preventDefault !== 'undefined') {
            e.preventDefault();
        }

        if (typeof this.props.onClick !== 'undefined') {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(e);
            }
        } else {
            history.goBack();
        }
    }
}

ButtonBack.propTypes = propTypes;
ButtonBack.defaultProps = defaultProps;

export default ButtonBack;
