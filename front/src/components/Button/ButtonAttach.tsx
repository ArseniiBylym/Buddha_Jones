import * as React from 'react';
import { Button, ButtonFloatPropType, ButtonOnClickPropType, ButtonIconColorPropType } from '.';

// Styles
import { IconAttach, IconPdf } from '../Icons';
import { observer } from 'mobx-react';
import { LoadingSpinner } from '../Loaders';

// Props
interface ButtonEditProps {
    className?: string | null;
    labelClassName?: string | null;
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelOnLeft?: boolean;
    float?: ButtonFloatPropType;
    iconBackground?: ButtonIconColorPropType;
    file: string | null;
    isLoading: boolean;
}

// Component
@observer
export class ButtonAttach extends React.Component<ButtonEditProps, {}> {
    static get defaultProps(): ButtonEditProps {
        return {
            isLoading: false,
            className: null,
            labelClassName: null,
            onClick: null,
            label: 'Edit',
            labelOnLeft: true,
            float: 'none',
            iconBackground: 'white',
            file: null,
        };
    }

    private handleFileClick = () => {
        if (this.props.file) {
            window.open(this.props.file, '_blank');
        }
    }

    public render() {
        if (this.props.isLoading) {
            return <LoadingSpinner size={20}/>;
        }
        if (this.props.file) {
            return (
                <Button
                    className={this.props.className}
                    onClick={this.handleFileClick}
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
                        element: <IconPdf width={20} height={20} />,
                    }}
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
                            color: 'black',
                            size: 'small',
                            onLeft: this.props.labelOnLeft,
                        }
                        : undefined
                }
                icon={{
                    size: 'small',
                    background: this.props.iconBackground,
                    element: <IconAttach width={20} height={20} />,
                }}
            />
        );
    }
}
