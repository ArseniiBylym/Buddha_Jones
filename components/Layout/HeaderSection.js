import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from './../Section';

// Styles
import s from './HeaderSection.css';

// Props
const propTypes = {
    className: PropTypes.string,
    marginBottom: PropTypes.bool
};

// Default props
const defaultProps = {
    className: null,
    marginBottom: false
};

// Component
class HeaderSection extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        // Section class name
        let headerSectionClassName = 'headerSection';
        headerSectionClassName += typeof this.props.className !== 'undefined' && this.props.className !== null ? ' ' + this.props.className : '';
        headerSectionClassName += this.props.marginBottom === true ? ' ' + s.margin : '';

        // Render
        return (
            <div className={headerSectionClassName}>
                <hr className={s.separator} />
                <Row className={s.contentRow} removeGutter={true}>
                    <Col>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}

HeaderSection.propTypes = propTypes;
HeaderSection.defaultProps = defaultProps;

export default HeaderSection;
