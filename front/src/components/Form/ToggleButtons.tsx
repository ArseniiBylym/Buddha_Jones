import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { Button, ButtonLabelColorPropType } from '../Button';

// Styles
const s = require('./ToggleButtons.css');

// Types
export type ToggleButtonsValueProp = string | number | boolean | string[] | number[] | object | null;
interface ToggleButtonsSideContent {
    value: ToggleButtonsValueProp;
    label: string;
    color?: ButtonLabelColorPropType;
}
type ToggleButtonsAlignProp = 'left' | 'center' | 'right';

// Props
interface ToggleButtonsProps {
    className?: string | null;
    onChange?: ((selected: ToggleButtonsValueProp) => void) | null;
    isBlock?: boolean;
    align?: ToggleButtonsAlignProp;
    toggleIsSetToRight?: boolean;
    toggleOnLeft?: ToggleButtonsSideContent;
    toggleOnRight?: ToggleButtonsSideContent;
}

// Component
@observer
export class ToggleButtons extends React.Component<ToggleButtonsProps, {}> {
    static get defaultProps(): ToggleButtonsProps {
        return {
            className: null,
            onChange: null,
            isBlock: false,
            align: 'left',
            toggleIsSetToRight: true,
            toggleOnLeft: {
                value: false,
                label: 'No',
            },
            toggleOnRight: {
                value: true,
                label: 'Yes',
            },
        };
    }

    public render() {
        return (
            <div
                className={classNames(
                    s.container,
                    {
                        [s.alignCenter]: this.props.align! === 'center',
                        [s.alignRight]: this.props.align! === 'right',
                        [s.block]: this.props.isBlock,
                    },
                    this.props.className
                )}
            >
                {this.props.toggleOnLeft!.label && (
                    <Button
                        onClick={this.handleLeftClick}
                        label={{
                            text: this.props.toggleOnLeft!.label,
                            size: 'small',
                            color: this.props.toggleOnLeft!.color ? this.props.toggleOnLeft!.color : 'blue',
                            onLeft: false,
                        }}
                    />
                )}

                {this.props.toggleOnLeft!.label && this.props.toggleOnRight!.label && (
                    <i>/</i>
                )}

                {this.props.toggleOnRight!.label && (
                    <Button
                        onClick={this.handleRightClick}
                        label={{
                            text: this.props.toggleOnRight!.label,
                            size: 'small',
                            color: this.props.toggleOnRight!.color ? this.props.toggleOnRight!.color : 'blue',
                            onLeft: true,
                        }}
                    />
                )}
            </div>
        );
    }

    private handleLeftClick = () => {
        if (this.props.onChange) {
            this.props.onChange(this.props.toggleOnLeft!.value);
        }
    };

    private handleRightClick = () => {
        if (this.props.onChange) {
            this.props.onChange(this.props.toggleOnRight!.value);
        }
    };
}
