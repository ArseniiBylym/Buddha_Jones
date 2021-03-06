import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonOnClickPropType, ButtonLabelColorPropType, ButtonFloatPropType } from '.';

// Styles
import { IconPlusBlue, IconPlusWhite } from '../Icons';
import { LoadingIndicator } from '../Loaders';

// Props
interface ButtonAddProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelColor?: ButtonLabelColorPropType;
    labelOnLeft?: boolean;
    isWhite?: boolean;
    float?: ButtonFloatPropType;
    labelSize?: 'large' | 'small';
    adding?: boolean;
    addingLabel?: string;
}

// Component
@observer
export class ButtonAdd extends React.Component<ButtonAddProps, {}> {
    static get defaultProps(): ButtonAddProps {
        return {
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Add',
            labelColor: 'blue',
            labelOnLeft: true,
            isWhite: false,
            float: 'none',
            adding: false,
            addingLabel: 'Adding',
        };
    }

    private get iconSize(): number {
        return 12;
    }

    public render() {
        if (this.props.adding) {
            return (
                <LoadingIndicator
                    float={this.props.float}
                    label={this.props.addingLabel}
                    labelOnRight={!this.props.labelOnLeft}
                    isInline={false}
                    spinnerSize={24}
                />
            );
        }

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
                            size: this.props.labelSize ? this.props.labelSize : this.props.isWhite ? 'large' : 'small',
                            onLeft: this.props.labelOnLeft,
                        }
                        : null
                }
                icon={{
                    size: 'small',
                    background: this.props.isWhite ? 'yellow' : 'white',
                    element: this.props.isWhite ? (
                        <IconPlusWhite width={this.iconSize} height={this.iconSize} />
                    ) : (
                        <IconPlusBlue width={this.iconSize} height={this.iconSize} />
                    ),
                }}
            />
        );
    }
}
