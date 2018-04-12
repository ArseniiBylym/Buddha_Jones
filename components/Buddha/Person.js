import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from './../Section';
import { Checkmark } from './../Form';

// Style
import s from './Person.css';
import { IconClose } from './../../components/Icons';

// Props
const propTypes = {
    onClick: PropTypes.func,
    checkmark: PropTypes.shape({
        display: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool
    }),
    displayRemoveIcon: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    labelOnLeft: PropTypes.string,
    labelOnRight: PropTypes.string,
    labelNoPadding: PropTypes.bool,
    name: PropTypes.string,
    nameOnLeft: PropTypes.bool,
    image: PropTypes.string,
    smallImage: PropTypes.bool,
    darkImage: PropTypes.bool
};

// Defaults
const defaultProps = {
    onClick: null,
    checkmark: {
        display: false,
        defaultChecked: false
    },
    displayRemoveIcon: false,
    labelOnLeft: null,
    labelOnRight: null,
    labelNoPadding: false,
    name: '',
    nameOnLeft: false,
    image: null,
    smallImage: false,
    darkImage: false
};

// Component
class Person extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Row
                className={classNames('person', {
                    smallImage: this.props.smallImage,
                    darkImage: this.props.darkImage,
                    personClickable: this.props.onClick !== null
                })}
                justifyContent={
                    typeof this.props.align !== 'undefined' && this.props.align !== null
                        ? this.props.align === 'center'
                            ? 'center'
                            : this.props.align === 'flex-end'
                                ? 'flex-end'
                                : 'flex-start'
                        : undefined
                }
                removeMargins={true}
                alignContent="center"
                alignItems="center"
            >

                {(this.props.labelOnLeft) && this.renderLabelOrTitle(this.props.labelOnLeft)}

                {this.props.nameOnLeft === false && this.renderProfilePicture()}

                <Col className="personName" size={0}>
                    {this.renderPersonContent()}
                </Col>

                {this.props.nameOnLeft === true && this.renderProfilePicture()}

                {(this.props.labelOnRight) && this.renderLabelOrTitle(this.props.labelOnRight)}

            </Row>
        );
    }

    renderLabelOrTitle(label) {
        return typeof label !== 'undefined' && label ? (
            <Col
                size={0}
                className={classNames('personLabel', {
                    personLabelNoPadding: this.props.labelNoPadding
                })}
            >
                <p>{label}</p>
            </Col>
        ) : null;
    }

    renderProfilePicture() {
        return (
            <Col className="personImage" size={0}>
                <span
                    style={{
                        backgroundImage: this.props.image
                            ? `url(${this.props.image})`
                            : undefined
                    }}
                />
            </Col>
        );
    }

    renderPersonContent() {
        if (this.props.checkmark.display === true) {
            return (
                <Checkmark
                    onClick={(e, checked) => this.handleCheckmarkClick(e, checked)}
                    checked={typeof this.props.checkmark.checked !== 'undefined' ? this.props.checkmark.checked : undefined}
                    defaultChecked={this.props.checkmark.defaultChecked}
                    label={{
                        text: this.props.name,
                        onLeft: this.props.nameOnLeft === true ? false : true
                    }}
                />
            );
        } else {
            return (
                <p onClick={e => this.handlePersonClick(e)}>
                    {this.props.name}
                    {(this.props.displayRemoveIcon) && (
                        <span className="personCloseIcon">
                            <IconClose width={8} height={8} />
                        </span>
                    )}
                </p>
            );
        }
    }

    handlePersonClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    handleCheckmarkClick(e, checked) {
        if (this.props.onClick) {
            this.props.onClick(e, checked);
        }
    }
}

Person.propTypes = propTypes;
Person.defaultProps = defaultProps;

export default Person;
