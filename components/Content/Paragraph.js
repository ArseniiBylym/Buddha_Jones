import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { capitalize } from 'lodash';

// Styles
import s from './Paragraph.css';

const propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    float: PropTypes.oneOf(['none', 'left', 'right']),
    type: PropTypes.oneOf(['default', 'white', 'dim', 'blue', 'alert', 'success']),
    bold: PropTypes.bool
};

const defaultProps = {
    className: null,
    style: {},
    align: null,
    float: 'none',
    type: 'default',
    bold: false
};

class Paragraph extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <p
                className={classNames(this.props.className, {
                    [s['type' + capitalize(this.props.type)]]: this.props.type !== 'default',
                    [s.styleBold]: this.props.bold
                })}
                style={{
                    textAlign: this.props.align ? this.props.align : null,
                    float: this.props.float !== 'none' ? this.props.flaot : null,
                    ...this.props.style
                }}
            >
                {this.props.children}
            </p>
        );
    }
}

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;
