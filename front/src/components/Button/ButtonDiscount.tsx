import {
    Button,
    ButtonFloatPropType,
    ButtonIconColorPropType,
    ButtonOnClickPropType
    } from '.';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IconDiscountBlue } from '../Icons';

interface ButtonDiscountProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelOnLeft?: boolean;
    float?: ButtonFloatPropType;
    iconBackground?: ButtonIconColorPropType;
}

@observer
export class ButtonDiscount extends React.Component<ButtonDiscountProps, {}> {
    static get defaultProps(): ButtonDiscountProps {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Discount',
            labelOnLeft: true,
            float: 'none',
            iconBackground: 'white',
        };
    }

    public render() {
        return (
            <Button
                className={this.props.className}
                onClick={this.props.onClick}
                float={this.props.float}
                label={
                    this.props.label
                        ? {
                              text: this.props.label,
                              color: 'black',
                              size: 'small',
                              onLeft: this.props.labelOnLeft,
                          }
                        : undefined
                }
                icon={{
                    size: 'small',
                    background: this.props.iconBackground,
                    element: <IconDiscountBlue width={14} height={14} />,
                }}
            />
        );
    }
}
