import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonOnClickPropType, ButtonFloatPropType, ButtonLabelColorPropType } from '.';
import { LoadingIndicator } from './../Loaders';

// Styles
import { IconSendSubmit } from '../Icons';

// Types
type SendButtonIconColorPropType = 'orange' | 'blue' | 'green';

// Props
interface ButtonSendProps {
    onClick?: ButtonOnClickPropType;
    className?: string | null;
    float?: ButtonFloatPropType;
    label?: string | null;
    savingLabel?: string | null;
    iconColor?: SendButtonIconColorPropType;
    labelColor?: ButtonLabelColorPropType;
    labelOnLeft?: boolean;
    saving?: boolean;
}

// Component
@observer
export class ButtonSend extends React.Component<ButtonSendProps, {}> {
    static get defaultProps() {
        return {
            className: null,
            onClick: null,
            float: 'none',
            label: 'Send',
            savingLabel: 'Sending',
            iconColor: 'orange',
            labelColor: 'blue',
            labelOnLeft: true,
            saving: false,
        };
    }

    public render() {
        return this.props.saving === false ? (
            <Button
                onClick={this.props.onClick}
                className={this.props.className}
                float={this.props.float}
                label={
                    this.props.label
                        ? {
                              text: this.props.label,
                              color: this.props.labelColor,
                              onLeft: this.props.labelOnLeft,
                              size: 'small',
                          }
                        : undefined
                }
                icon={{
                    size: 'large',
                    background: this.props.iconColor,
                    element: <IconSendSubmit width={25} height={26} />,
                }}
            />
        ) : (
            <LoadingIndicator
                float={this.props.float}
                label={this.props.savingLabel}
                labelOnRight={!this.props.labelOnLeft}
                isInline={false}
                spinnerSize={24}
            />
        );
    }
}
