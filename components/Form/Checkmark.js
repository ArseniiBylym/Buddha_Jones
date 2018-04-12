import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { capitalizePhraseOrWord } from './../../helpers/text';

// Styles
import s from './Checkmark.css';
import { IconTickBlue, IconTickGreen, IconTickWhite } from './../Icons';

// Props
const propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['default', 'blue', 'green']),
    size: PropTypes.oneOf(['default', 'small']),
    readOnly: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    label: PropTypes.shape({
        text: PropTypes.string,
        onLeft: PropTypes.bool,
    }),
};

// Defaults
const defaultProps = {
    onClick: null,
    type: 'default',
    size: 'default',
    readOnly: false,
    defaultChecked: false,
    label: {
        text: '',
        onLeft: false,
    },
};

// Component
class Checkmark extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            checked: typeof this.props.checked !== 'undefined'
                ? this.props.checked
                : this.props.defaultChecked
        };
    }

    componentWillReceiveProps(nextProps) {
        // If it contains new checked value
        if (typeof nextProps.checked !== 'undefined') {
            this.setState({
                checked: nextProps.checked
            });
        }
    }

    render() {
        return (
            <label
                onClick={e => this.handleCheckmarkClick(e)}
                className={classNames(s.label, {
                    [s['label' + capitalizePhraseOrWord(this.props.type)]]: this.props.type !== 'default' && this.props.type !== 'blue',
                    [s['label' + capitalizePhraseOrWord(this.props.size)]]: this.props.size !== 'default'
                })}
            >
                {(this.props.label.onLeft === true) && this.renderLabel()}
                {this.renderCheckmark()}
                {(this.props.label.onLeft === false) && this.renderLabel()}
            </label>
        );
    }

    renderCheckmark() {
        return React.createElement(this.props.readOnly ? 'p' : 'button', {
            className: classNames(s.checkmark, {
                [s.active]: this.state.checked,
                [s.readonly]: this.props.readOnly,
            })
        }, this.renderIcon());
    }

    renderLabel() {
        return this.props.label.text ? (
            <span className={s.name}>
                {this.props.label.text}
            </span>
        ) : null;
    }

    renderIcon() {
        return (this.state.checked) ? (
            <IconTickWhite width={11} height={9} />
        ) : (this.props.type === 'green') ? (
            <IconTickGreen width={11} height={9} />
        ) : (
            <IconTickBlue width={11} height={9} />
        );
    }

    handleCheckmarkClick(e) {
        // Prevent default
        e.preventDefault();

        // Read only does not do anything
        if (!this.props.readOnly) {
            // Reverse checked state
            const checked = !this.state.checked;

            // Reverse state if state is not controlled
            if (typeof this.props.checked === 'undefined') {
                this.setState({
                    checked: checked
                });
            }

            // Pass event further
            if (this.props.onClick) {
                this.props.onClick(e, checked);
            }
        }
    }
}

Checkmark.propTypes = propTypes;
Checkmark.defaultProps = defaultProps;

export default Checkmark;
