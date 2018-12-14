import * as React from 'react';
import { observer } from 'mobx-react';
import {
    Button,
    ButtonOnClickPropType,
    ButtonLabelColorPropType,
    ButtonFloatPropType,
    ButtonTooltipPositionOnPropType,
    ButtonIconColorPropType,
} from '.';

// Styles
import { IconClose } from '../Icons';

// Props
interface ButtonCloseProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelColor?: ButtonLabelColorPropType;
    labelOnLeft?: boolean;
    float?: ButtonFloatPropType;
    tooltipText?: string | null;
    tooltipOn?: ButtonTooltipPositionOnPropType;
    iconBackground?: ButtonIconColorPropType;
}

// Component
@observer
export class ButtonClose extends React.Component<ButtonCloseProps, {}> {
    static get defaultProps(): ButtonCloseProps {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Close',
            labelColor: 'orange',
            labelOnLeft: true,
            float: 'none',
            tooltipText: null,
            tooltipOn: 'left',
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
                              onLeft: this.props.labelOnLeft!,
                              color: this.props.labelColor,
                              text: this.props.label,
                          }
                        : undefined
                }
                tooltip={
                    this.props.tooltipText
                        ? {
                              text: this.props.tooltipText,
                              on: this.props.tooltipOn,
                          }
                        : undefined
                }
                icon={{
                    size: 'small',
                    background: this.props.iconBackground,
                    element: <IconClose width={11} height={11} />,
                }}
            />
        );
    }
}
