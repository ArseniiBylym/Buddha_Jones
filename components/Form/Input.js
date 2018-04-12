import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { upperFirst } from 'lodash';

// Styles
import s from './Input.css';

// Props
const propTypes = {
    className: PropTypes.string,
    fieldClassName: PropTypes.string,
    onChange: PropTypes.func,
    onPaste: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    autoFocus: PropTypes.bool,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    color: PropTypes.oneOf(['default', 'blue', 'brown', 'blueFill', 'brownFill', 'greenFill', 'red']),
    type: PropTypes.oneOf(['text', 'email', 'password']),
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    name: PropTypes.string
};

// Defaults
const defaultProps = {
    className: null,
    fieldClassName: null,
    onChange: null,
    onPaste: null,
    onFocus: null,
    onBlur: null,
    disabled: false,
    readOnly: false,
    value: null,
    defaultValue: '',
    autoFocus: false,
    maxWidth: 0,
    minWidth: 0,
    align: null,
    color: 'default',
    type: 'text',
    label: '',
    icon: null,
    name: null
};

class Input extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.input = null;
    }

    render() {
        return (
            <div
                className={classNames(s.fieldGroup, this.props.className, {
                    [s[`fieldGroup${upperFirst(this.props.color)}`]]: this.props.color !== 'default'
                })}
            >
                <input
                    ref={ref => this.input = ref}
                    type={this.props.type}
                    style={{
                        maxWidth: this.props.maxWidth || undefined,
                        minWidth: this.props.minWidth || undefined,
                        textAlign: this.props.align || undefined,
                        paddingRight: this.props.icon && typeof this.props.icon.width !== 'undefined'
                            ? (16 + this.props.icon.width) + 'px'
                            : undefined
                    }}
                    className={classNames(this.props.fieldClassName)}
                    name={this.props.name ? this.props.name : undefined}
                    disabled={this.props.disabled === true ? true : null}
                    readOnly={this.props.readOnly === true ? true : null}
                    placeholder={this.props.label}
                    value={this.props.value !== null ? this.props.value : undefined}
                    defaultValue={this.props.value === null ? this.props.defaultValue : undefined}
                    autoFocus={this.props.autoFocus === true ? true : undefined}
                    onChange={e => this.handleChange(e)}
                    onPaste={e => this.handlePaste(e)}
                    onFocus={e => this.handleFocus(e)}
                    onBlur={e => this.handleBlur(e)}
                />

                {(this.props.icon) && this.props.icon}
            </div>
        );
    }

    handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    handlePaste(e) {
        if (this.props.onPaste) {
            this.props.onPaste(e);
        }
    }

    handleFocus(e) {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    handleBlur(e) {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    focus() {
        if (this.input && typeof this.input.focus !== 'undefined') {
            this.input.focus();
            this.handleFocus(this.input);
        }
    }

    clear() {
        if (typeof this.refs.input !== 'undefined') {
            this.refs.input.value = '';
        }
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
