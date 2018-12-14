import * as React from 'react';
import { observer } from 'mobx-react';
import {
    Button,
    ButtonOnClickPropType,
    ButtonFloatPropType,
    ButtonLabelColorPropType,
    ButtonIconColorPropType,
} from '.';
import { LoadingIndicator } from './../Loaders';

// Styles
import { IconCheckmarkGreen } from '../Icons';

// Props
interface ButtonSaveProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    float?: ButtonFloatPropType;
    label?: string | null;
    savingLabel?: string | null;
    labelColor?: ButtonLabelColorPropType;
    labelOnLeft?: boolean;
    iconBackground?: ButtonIconColorPropType;
    isSaving?: boolean;
}

// Component
@observer
export class ButtonSave extends React.Component<ButtonSaveProps, {}> {
    static get defaultProps() {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            float: 'none',
            label: 'Save',
            savingLabel: 'Saving',
            labelColor: 'blue',
            labelOnLeft: true,
            iconBackground: 'none',
            saving: false,
        };
    }

    public render() {
        return this.props.isSaving === false ? (
            <Button
                className={this.props.className}
                onClick={this.props.onClick}
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
                    size: 'small',
                    background: this.props.iconBackground,
                    element: <IconCheckmarkGreen width={25} height={25} />,
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
