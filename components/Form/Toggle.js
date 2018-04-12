import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './../Button';

// Styles
import s from './Toggle.css';

// Props
const propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    isWhite: PropTypes.bool,
    isLarge: PropTypes.bool,
    disabled: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    label: PropTypes.string,
    labelOnLeft: PropTypes.bool,
    isRight: PropTypes.bool,
    defaultRight: PropTypes.bool,
    left: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
        icon: PropTypes.element
    }),
    right: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
        icon: PropTypes.element
    })
};

// Default props
const defaultProps = {
    onChange: null,
    className: '',
    isWhite: false,
    isLarge: false,
    disabled: false,
    align: 'right',
    isRight: null,
    defaultRight: false,
    label: '',
    labelOnLeft: true,
    left: {
        label: '',
        value: 0
    },
    right: {
        label: '',
        value: 1
    }
};

// Component
class Toggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isRight: this.props.isRight !== null
                ? this.props.isRight
                : this.props.defaultRight
                    ? this.props.defaultRight
                    : false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.isRight !== 'undefined' && nextProps.isRight !== null && this.state.isRight !== nextProps.isRight) {
            this.setState({
                isRight: nextProps.isRight
            });
        }
    }

    handleLeftClick(e) {
        if (this.props.disabled !== true) {
            // Check if it's not already on left
            if (this.state.isRight === true) {
                // Pass event further
                if (this.props.onChange) {
                    this.props.onChange(this.props.left.value);
                }

                // Check if component value is controlled and change state if it's not
                if (this.props.isRight === null) {
                    this.setState({
                        isRight: false
                    });
                }
            }
        }
    }

    handleRightClick(e) {
        if (this.props.disabled !== true) {
            // Check if it's not already on right
            if (this.state.isRight === false) {
                // Pass event further
                if (this.props.onChange) {
                    this.props.onChange(this.props.right.value);
                }

                // Check if component value is controlled and change state if it's not
                if (this.props.isRight === null) {
                    this.setState({
                        isRight: true
                    });
                }
            }
        }
    }

    handleToggleClick(e) {
        if (this.props.disabled !== true) {
            // Get current side
            const isRight = !this.state.isRight;

            // Pass event further
            if (this.props.onChange) {
                if (isRight === true) {
                    this.props.onChange(this.props.right.value);
                } else {
                    this.props.onChange(this.props.left.value);
                }
            }

            // Check if component value is controlled and change state if it's not
            if (this.props.isRight === null) {
                this.setState({
                    isRight
                });
            }
        }
    }

    render() {
        // Prepare class name
        let toggleClassName = s.toggleGroup;
        toggleClassName += this.props.isWhite === true ? ' ' + s.whiteToggleGroup : '';
        toggleClassName += this.state.isRight === true ? ' ' + s.toggleOnRight : '';
        toggleClassName += this.props.disabled === true ? ' ' + s.toggleDisabled : '';
        toggleClassName += this.props.className !== '' ? ' ' + this.props.className : '';
        toggleClassName += ' ' + s['align' + this.props.align.charAt(0).toUpperCase() + this.props.align.slice(1)];

        // Render
        return (
            <div className={toggleClassName}>

                {this.props.label && this.props.labelOnLeft === true && (
                    <p>{this.props.label}</p>
                )}

                <Button
                    onClick={e => this.handleLeftClick(e)}
                    icon={
                        typeof this.props.left.icon !== 'undefined'
                            ? {
                                element: this.props.left.icon,
                                size: 'nopadding',
                                background: 'none'
                            }
                            : undefined
                    }
                    label={{
                        text: this.props.left.label,
                        size: this.props.isLarge === true ? 'large' : 'small',
                        color: this.props.isWhite === true ? 'white' : 'blue',
                        onLeft: true
                    }}
                />

                <button className={s.toggleOutline} onClick={e => this.handleToggleClick(e)}>
                    <span className={s.toggleCircle}></span>
                </button>

                <Button
                    onClick={e => this.handleRightClick(e)}
                    icon={
                        typeof this.props.right.icon !== 'undefined'
                            ? {
                                element: this.props.right.icon,
                                size: 'nopadding',
                                background: 'none'
                            }
                            : undefined
                    }
                    label={{
                        text: this.props.right.label,
                        size: this.props.isLarge === true ? 'large' : 'small',
                        color: this.props.isWhite === true ? 'white' : 'blue',
                        onLeft: false
                    }}
                />

                {this.props.label && this.props.labelOnLeft === false && (
                    <p>{this.props.label}</p>
                )}

            </div>
        );
    }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default Toggle;
