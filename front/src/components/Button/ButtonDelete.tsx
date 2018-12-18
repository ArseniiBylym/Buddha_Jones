import {
    Button,
    ButtonFloatPropType,
    ButtonIconColorPropType,
    ButtonOnClickPropType
    } from '.';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IconRemoveBlue } from '../Icons';
import { LoadingIndicator } from '../Loaders';
import { ButtonLabelColorPropType } from './Button';

// Styles

// Props
interface ButtonDeleteProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelOnLeft?: boolean;
    labelColor?: ButtonLabelColorPropType;
    labelIsBold?: boolean;
    float?: ButtonFloatPropType;
    iconBackground?: ButtonIconColorPropType;
    loading?: boolean;
}

// Component
@observer
export class ButtonDelete extends React.Component<ButtonDeleteProps, {}> {
    static get defaultProps(): ButtonDeleteProps {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Edit',
            labelOnLeft: true,
            labelColor: 'black',
            labelIsBold: false,
            float: 'none',
            iconBackground: 'white',
            loading: false,
        };
    }

    public render() {
        if (this.props.loading) {
            return (
                <LoadingIndicator
                    float={this.props.float}
                    labelOnRight={!this.props.labelOnLeft}
                    isInline={false}
                    spinnerSize={18}
                />
            );
        }
        return (
            <Button
                className={this.props.className}
                onClick={this.props.onClick}
                float={this.props.float}
                label={
                    this.props.label
                        ? {
                              text: this.props.label,
                              color: this.props.labelColor,
                              size: 'small',
                              onLeft: this.props.labelOnLeft,
                              isBold: this.props.labelIsBold,
                          }
                        : undefined
                }
                icon={{
                    size: 'small',
                    background: this.props.iconBackground,
                    element: <IconRemoveBlue width={18} height={18} />,
                }}
            />
        );
    }
}
