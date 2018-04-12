import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from './../Section';

// Styles
import s from './LoadingShade.css';

// Props
const propTypes = {
    className: PropTypes.string,
    background: PropTypes.string,
    border: PropTypes.string,
    contentCentered: PropTypes.bool,
    contentCenteredToTop: PropTypes.bool
};

// Default props
const defaultProps = {
    className: '',
    background: null,
    border: null,
    contentCentered: true,
    contentCenteredToTop: true
};

// Component
class LoadingShade extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.exists = true;

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
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
            <Row
                style={this.props.background !== null || this.props.border !== null ? {
                    background: this.props.background,
                    border: this.props.border
                } : null}
                className={classNames(s.shade, this.props.className, {
                    [s.visible]: this.state.visible,
                    [s.alignLeft]: !this.props.contentCentered,
                    [s.alignTop]: this.props.contentCentered && this.props.contentCenteredToTop
                })}
                removeGutter={true}
                removeMargins={true}
            >
                <Col size={0}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }
};

export default LoadingShade;
