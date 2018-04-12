import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '.';

// Styles
import s from './Section.css';

// Props
const propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    noSeparator: PropTypes.bool,
    removeTitleGutter: PropTypes.bool,
    removeTitleMargins: PropTypes.bool,
    headerElements: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            element: PropTypes.element.isRequired,
            minWidth: PropTypes.number,
            maxWidth: PropTypes.number,
        })
    ),
};

// Default props
const defaultProps = {
    className: '',
    title: '',
    subTitle: '',
    removeTitleGutter: true,
    removeTitleMargins: false,
    noSeparator: false,
    headerElements: [],
};

// Component
class Section extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        // Section class name
        let sectionClassName = 'section';
        sectionClassName += this.props.className !== '' ? ' ' + this.props.className : '';

        // Render
        return (
            <div ref="container" className={sectionClassName}>

                {this.props.noSeparator === false && (
                    <hr />
                )}

                {(this.props.title || this.props.subTitle || this.props.headerElements.length > 0) && (
                    <Row
                        className={s.sectionHeader}
                        removeGutter={this.props.removeTitleGutter}
                        removeMargins={this.props.removeTitleMargins}
                    >
                        {(this.props.title || this.props.subTitle) && (
                            <Col className={s.sectionTitle}>
                                <h3>
                                    <strong>{this.props.title}</strong>
                                    {(this.props.title && this.props.subTitle) && (
                                        <em> — </em>
                                    )}
                                    <span>{this.props.subTitle + ':'}</span>
                                </h3>
                            </Col>
                        )}

                        {(this.props.headerElements.length > 0) && (
                            <Col className={s.sectionElements}>
                                <Row removeGutter={true}>
                                    {this.props.headerElements.map((el, index) => {
                                        if (typeof el !== 'undefined' && el !== null) {
                                            return (
                                                <Col
                                                    key={typeof el.key !== 'undefined' && el.key ? el.key : 'element-' + index}
                                                    minWidth={typeof el.minWidth !== 'undefined' ? el.minWidth : null}
                                                    maxWidth={typeof el.maxWidth !== 'undefined' ? el.maxWidth : null}
                                                >
                                                    {el.element}
                                                </Col>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Row>
                            </Col>
                        )}

                    </Row>
                )}

                {typeof this.props.children !== 'undefined' && (
                    <div className={s.sectionInner}>
                        {this.props.children}
                    </div>
                )}

            </div>
        );
    }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
