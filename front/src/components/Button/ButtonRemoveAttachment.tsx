import * as React from 'react';
import { Button, ButtonFloatPropType, ButtonOnClickPropType, ButtonIconColorPropType } from '.';

// Styles
import { IconRemoveAttachment } from '../Icons';
import { observer } from 'mobx-react';

// Props
interface ButtonRemoveAttachmentProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelOnLeft?: boolean;
    float?: ButtonFloatPropType;
    iconBackground?: ButtonIconColorPropType;
}

// Component
@observer
export class ButtonRemoveAttachment extends React.Component<ButtonRemoveAttachmentProps, {}> {
    static get defaultProps(): ButtonRemoveAttachmentProps {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Edit',
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
                    element: <IconRemoveAttachment width={20} height={20} />,
                }}
            />
        );
    }
}
