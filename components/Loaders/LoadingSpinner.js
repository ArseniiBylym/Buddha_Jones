import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSize, getHalfOfSize, getStrokeWidth, getArcRadius, getArcDescription } from './LoadingSpinnerSelectors';

// Styles
import s from './LoadingSpinner.css';

// Props
const propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
};

// Default props
const defaultProps = {
    className: null,
    color: '#0768D8',
    size: 64
};

// Derived props
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        sizeHalf: getHalfOfSize(ownProps),
        strokeWidth: getStrokeWidth(ownProps),
        arcRadius: getArcRadius(ownProps),
        arcDescription: getArcDescription(ownProps)
    };
};

// Component
class LoadingSpinnerComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.exists = true;

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        // Show spinner
        setTimeout(() => {
            if (typeof this.exists !== typeof undefined && this.exists) {
                this.setState({
                    visible: true
                });
            }
        }, 128);
    }

    componentWillUnmount() {
        this.exists = false;
    }

    render() {
        // Destructure
        const { size, sizeHalf, strokeWidth, arcRadius, arcDescription, color } = this.props;

        // Render
        return (
            <svg
                ref={node => this.canvas = node}
                className={classNames(s.spinner, this.props.className, {
                    [s.visible]: this.state.visible
                })}
                width={size}
                height={size}
            >
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    d={arcDescription}
                />
                <circle
                    cx={sizeHalf}
                    cy={sizeHalf}
                    r={arcRadius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    opacity={0.2}
                />
            </svg>
        );
    }
}

LoadingSpinnerComponent.propsTypes = propTypes;
const LoadingSpinner = connect(mapStateToProps)(LoadingSpinnerComponent);
LoadingSpinner.defaultProps = defaultProps;

export default LoadingSpinner;
