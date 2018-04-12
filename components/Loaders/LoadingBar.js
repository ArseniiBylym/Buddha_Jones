import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getFormattedLabel } from './LoadingBarSelectors';

// Styles
import s from './LoadingBar.css';

// Props
const propTypes = {
    background: PropTypes.string,
    width: PropTypes.number,
    size: PropTypes.oneOf(['default', 'big']),
    height: PropTypes.number,
    opacity: PropTypes.number,
    progress: PropTypes.number,
    showProgress: PropTypes.bool,
    label: PropTypes.string
};

// Default props
const defaultProps = {
    background: '#EEEAE7',
    width: 0,
    size: 'default',
    opacity: 0.3,
    progress: 100,
    showProgress: false,
    label: ''
};

// Derived props
const mapStateToProps = (state, props) => {
    return {
        ...props,
        formattedLabel: getFormattedLabel(props)
    };
};

// Component
class LoadingBarComponent extends React.Component {
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
        return (
            <div
                className={classNames(s.container, {
                    [s.visible]: this.state.visible,
                    [s.sizeBig]: this.props.size === 'big',
                    [s.sizeNormal]: this.props.size !== 'default'
                })}
                style={{
                    width: this.props.width > 0 ? this.props.width + 'px' : null,
                    background: this.props.background
                }}
            >
                <div className={s.progress} style={{ width: this.props.progress + '%' }}>
                    <div className={s.bar} style={{ opacity: this.props.opacity }}></div>
                </div>

                {(this.props.showProgress || this.props.label) && (
                    <div className={s.label}>
                        <p>{this.props.formattedLabel}</p>
                    </div>
                )}
            </div>
        );
    }
}

LoadingBarComponent.propsTypes = propTypes;
const LoadingBar = connect(mapStateToProps)(LoadingBarComponent);
LoadingBar.defaultProps = defaultProps;

export default LoadingBar;
