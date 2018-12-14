import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { Row, Col } from '../Section';
import { Checkmark } from '../Form';

// Style
require('./Person.css');
import { IconClose } from '../Icons';

// Types
type PersonAlignProp = 'left' | 'center' | 'right';

// Props
interface PersonProps {
    onClick?: ((checked?: boolean) => void) | null;
    showCheckmark?: boolean;
    checkmarkIsChecked?: boolean;
    showRemoveIcon?: boolean;
    align?: PersonAlignProp | null;
    textOfLabelOnLeft?: string | null;
    textOfLabelOnRight?: string | null;
    labelHasNoPadding?: boolean;
    personId?: number | null;
    personName?: string | null;
    personImage: string | null;
    showPersonNameOnLeft?: boolean;
    showSmallPersonImage?: boolean;
    showDarkPersonImage?: boolean;
}

// Component
@observer
export class Person extends React.Component<PersonProps, {}> {
    static get defaultProps(): PersonProps {
        return {
            onClick: null,
            showCheckmark: false,
            checkmarkIsChecked: false,
            align: null,
            textOfLabelOnLeft: null,
            textOfLabelOnRight: null,
            labelHasNoPadding: false,
            personId: null,
            personName: null,
            personImage: null,
            showSmallPersonImage: false,
            showDarkPersonImage: false,
        };
    }

    public render() {
        return (
            <Row
                className={classNames('person', {
                    smallImage: this.props.showSmallPersonImage,
                    darkImage: this.props.showDarkPersonImage,
                    personClickable: this.props.onClick !== null,
                })}
                justifyContent={
                    this.props.align !== null
                        ? this.props.align === 'center'
                        ? 'center'
                        : this.props.align === 'right' ? 'flex-end' : 'flex-start'
                        : undefined
                }
                alignContent="center"
                alignItems="center"
                removeMargins={true}
            >
                {this.props.textOfLabelOnLeft && this.renderLabelOrTitle(this.props.textOfLabelOnLeft)}

                {this.props.showPersonNameOnLeft === false && this.renderProfilePicture()}

                <Col className="personName" size={0}>
                    {this.renderPersonContent()}
                </Col>

                {this.props.showPersonNameOnLeft === true && this.renderProfilePicture()}

                {this.props.textOfLabelOnRight && this.renderLabelOrTitle(this.props.textOfLabelOnRight)}
            </Row>
        );
    }

    private renderLabelOrTitle(label: string) {
        return label ? (
            <Col
                size={0}
                className={classNames('personLabel', {
                    personLabelNoPadding: this.props.labelHasNoPadding,
                })}
            >
                <p>{label}</p>
            </Col>
        ) : null;
    }

    private renderProfilePicture() {
        return (
            <Col className="personImage" size={0}>
                <span
                    style={{
                        backgroundImage: this.props.personImage ? `url(${this.props.personImage})` : undefined,
                    }}
                />
            </Col>
        );
    }

    private renderPersonContent() {
        if (this.props.showCheckmark) {
            return (
                <Checkmark
                    onClick={this.handleCheckmarkClick}
                    checked={
                        typeof this.props.checkmarkIsChecked !== 'undefined' ? this.props.checkmarkIsChecked : false
                    }
                    label={this.props.personName}
                    labelOnLeft={!this.props.showPersonNameOnLeft}
                />
            );
        } else {
            return (
                <p onClick={this.handlePersonClick}>
                    {this.props.personName}
                    {this.props.showRemoveIcon && (
                        <span className="personCloseIcon">
                            <IconClose width={8} height={8}/>
                        </span>
                    )}
                </p>
            );
        }
    }

    private handlePersonClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    private handleCheckmarkClick = (checked: boolean) => () => {
        if (this.props.onClick) {
            this.props.onClick(checked);
        }
    };
}
