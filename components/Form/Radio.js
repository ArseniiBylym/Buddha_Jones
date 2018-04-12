import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { Row, Col } from './../Section';
import Dropdown from './Dropdown';

// Styles
import s from './Radio.css';

// Props
const propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.any.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string,
    dropdown: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
            truncuateLabelTo: PropTypes.number
        }),
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.any.isRequired,
                label: PropTypes.string.isRequired
            })
        )
    })
};

// Default props
const defaultProps = {
    onClick: null,
    className: null,
    checked: false,
    label: '',
    dropdown: null
};

// Component
class Radio extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleLabelClick(e) {
        // Forward
        if (this.props.onClick) {
            this.props.onClick();
        }

        // Stop propagation
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        // Label class name
        const labelClassName = classNames('radio', s.label, this.props.className, {
            [s.checked]: this.props.checked,
            [s.hasDropdown]:
                typeof this.props.dropdown !== 'undefined' &&
                this.props.dropdown &&
                typeof this.props.dropdown.options !== 'undefined' &&
                this.props.dropdown.options &&
                this.props.dropdown.options.length > 0
        });

        // With dropdown
        if (typeof this.props.dropdown !== 'undefined' && this.props.dropdown.options.length > 0) {
            return (
                <label className={labelClassName} onClick={e => this.handleLabelClick(e)}>
                    <button className={s.icon}>
                        <i></i>
                    </button>
                    <Dropdown
                        onChange={this.props.dropdown.onChange}
                        align="left"
                        type="twolines"
                        label={this.props.dropdown.label}
                        selected={typeof this.props.dropdown.selected !== 'undefined' ? this.props.dropdown.selected : undefined}
                        options={typeof this.props.dropdown.options !== 'undefined' ? this.props.dropdown.options : undefined}
                    />
                </label>
            );
        // Only text label
        } else {
            return (
                <label className={labelClassName} onClick={e => this.handleLabelClick(e)}>
                    <button className={s.icon}>
                        <i></i>
                    </button>
                    <p className={s.text}>{this.props.label}</p>
                </label>
            );
        }
    };
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
