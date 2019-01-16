import {
    Button,
    ButtonFloatPropType,
    ButtonLabelColorPropType,
    ButtonOnClickPropType
    } from '.';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IconArrowRight, IconArrowRightWhite } from '../Icons';

interface ButtonArrowProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelColor?: ButtonLabelColorPropType;
    labelOnLeft?: boolean;
    isWhite?: boolean;
    float?: ButtonFloatPropType;
    labelSize?: 'large' | 'small';
}

@observer
export class ButtonArrow extends React.Component<ButtonArrowProps, {}> {
    static get defaultProps(): ButtonArrowProps {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Go',
            labelColor: 'blue',
            labelOnLeft: true,
            isWhite: false,
            float: 'none',
        };
    }

    private get iconSize(): number {
        return 12;
    }

    public render() {
        return (
            <Button
                onClick={this.props.onClick}
                className={this.props.className}
                labelClassName={this.props.labelClassName}
                float={this.props.float}
                label={
                    this.props.label
                        ? {
                              text: this.props.label,
                              color:
                                  this.props.isWhite && this.props.labelColor === 'blue'
                                      ? 'white'
                                      : this.props.labelColor,
                              size: this.props.labelSize
                                  ? this.props.labelSize
                                  : this.props.isWhite
                                  ? 'large'
                                  : 'small',
                              onLeft: this.props.labelOnLeft,
                          }
                        : null
                }
                icon={{
                    size: 'small',
                    background: this.props.isWhite ? 'yellow' : 'white',
                    element: this.props.isWhite ? (
                        <IconArrowRightWhite width={this.iconSize} height={this.iconSize} />
                    ) : (
                        <IconArrowRight width={this.iconSize} height={this.iconSize} />
                    ),
                }}
            />
        );
    }
}
