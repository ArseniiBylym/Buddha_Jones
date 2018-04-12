import React from 'react';
import { connect } from 'react-redux';
import { isNil as _isNil } from 'lodash';
import { Row, Col } from './../Section';

// Styles
import s from './Header.css';

// Deriviations
const mapStateToProps = (state) => {
    return {
        header: state.header
    };
};

// Component
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { title, preTitleSpan, subTitle, preSubTitleSpan, elements } = this.props.header;

        return (
            <div className={s.header}>

                <Col className={s.headerText}>
                    {(!_isNil(title) && title.trim() !== '') && (
                        <h1 className={s.headerTitle}>
                            {(!_isNil(preTitleSpan) && preTitleSpan.trim() !== '') && (
                                <span>{preTitleSpan}</span>
                            )}
                            {title}
                        </h1>
                    )}
                    {(!_isNil(subTitle) && subTitle.trim() !== '') && (
                        <h3 className={s.headerSubTitle}>
                            {(!_isNil(preSubTitleSpan) && preSubTitleSpan.trim() !== '') && (
                                <span>{preSubTitleSpan}</span>
                            )}
                            {subTitle}
                        </h3>
                    )}
                </Col>

                {(typeof elements !== 'undefined' && elements && typeof elements.length !== 'undefined' && elements.length > 0) && (
                    <Col size={1} className={s.headerElements}>
                        <Row removeGutter={true}>
                            {this.props.header.elements.map((element, index) => {
                                return (
                                    <Col key={index}>
                                        {element}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);
