import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, ButtonLabelColorPropType } from '../Button';

// Styles
const s = require('./Toggle.css');

// Types
type ToggleAlignPropType = 'left' | 'center' | 'right';

export interface ToggleSideContent {
    label: string;
    value: string | number | boolean | null;
    color?: ButtonLabelColorPropType;
    icon?: JSX.Element;
}

// Props
interface ToggleProps {
    className?: string | null;
    onChange?: ((isSetToRight: boolean, selectedSideContent: ToggleSideContent) => void) | null;
    isWhite?: boolean;
    isLarge?: boolean;
    isDisabled?: boolean;
    align?: ToggleAlignPropType;
    label?: string;
    labelIsOnLeft?: boolean;
    toggleIsSetToRight?: boolean;
    toggleDefaultsToRight?: boolean;
    toggleOnLeft?: ToggleSideContent;
    toggleOnRight?: ToggleSideContent;
}

// Component
@observer
export class Toggle extends React.Component<ToggleProps, {}> {
    static get defaultProps(): ToggleProps {
        return {
            onChange: null,
            className: null,
            isWhite: false,
            isLarge: false,
            isDisabled: false,
            align: 'right',
            toggleIsSetToRight: undefined,
            toggleDefaultsToRight: false,
            label: '',
            labelIsOnLeft: true,
            toggleOnLeft: {
                label: '',
                value: false,
                color: 'blue',
            },
            toggleOnRight: {
                label: '',
                value: true,
                color: 'blue',
            },
        };
    }

    @observable
    private isSetToRight: boolean =
        typeof this.props.toggleIsSetToRight !== 'undefined'
            ? this.props.toggleIsSetToRight
            : typeof this.props.toggleDefaultsToRight !== 'undefined'
                ? this.props.toggleDefaultsToRight
                : false;

    public componentWillReceiveProps(nextProps: ToggleProps) {
        if (
            typeof nextProps.toggleIsSetToRight !== 'undefined' &&
            nextProps.toggleIsSetToRight !== null &&
            this.isSetToRight !== nextProps.toggleIsSetToRight
        ) {
            this.isSetToRight = nextProps.toggleIsSetToRight;
        }
    }

    public render() {
        return (
            <div
                className={classNames(
                    s.toggleGroup,
                    {
                        [s.whiteToggleGroup]: this.props.isWhite,
                        [s.toggleOnRight]: this.isSetToRight,
                        [s.toggleDisabled]: this.props.isDisabled,
                        [s[
                            'align' +
                                (typeof this.props.align !== 'undefined'
                                    ? this.props.align.charAt(0).toUpperCase() + this.props.align.slice(1)
                                    : 'Right')
                        ]]: true,
                    },
                    this.props.className
                )}
            >
                {this.props.label && this.props.labelIsOnLeft && <p>{this.props.label}</p>}

                <Button
                    onClick={this.handleLeftClick}
                    icon={
                        this.props.toggleOnLeft && typeof this.props.toggleOnLeft.icon !== 'undefined'
                            ? {
                                  element: this.props.toggleOnLeft.icon,
                                  size: 'nopadding',
                                  background: 'none',
                              }
                            : undefined
                    }
                    label={{
                        text:
                            this.props.toggleOnLeft && this.props.toggleOnLeft.label
                                ? this.props.toggleOnLeft.label
                                : '',
                        size: this.props.isLarge === true ? 'large' : 'small',
                        color: this.props.isWhite === true ? 'white' : this.props.toggleOnLeft!.color,
                        onLeft: true,
                    }}
                />

                <button className={s.toggleOutline} onClick={this.handleToggleClick}>
                    <span className={s.toggleCircle} />
                </button>

                <Button
                    onClick={this.handleRightClick}
                    icon={
                        this.props.toggleOnRight && typeof this.props.toggleOnRight.icon !== 'undefined'
                            ? {
                                  element: this.props.toggleOnRight.icon,
                                  size: 'nopadding',
                                  background: 'none',
                              }
                            : undefined
                    }
                    label={{
                        text:
                            this.props.toggleOnRight && this.props.toggleOnRight.label
                                ? this.props.toggleOnRight.label
                                : '',

                        size: this.props.isLarge === true ? 'large' : 'small',
                        color: this.props.isWhite === true ? 'white' : this.props.toggleOnRight!.color,
                        onLeft: false,
                    }}
                />

                {this.props.label && this.props.labelIsOnLeft === false && <p>{this.props.label}</p>}
            </div>
        );
    }

    private handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.isDisabled !== true && this.props.toggleOnLeft && this.isSetToRight !== false) {
            this.isSetToRight = false;

            if (this.props.onChange) {
                this.props.onChange(false, this.props.toggleOnLeft);
            }
        }
    };

    private handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.isDisabled !== true && this.props.toggleOnRight && this.isSetToRight !== true) {
            this.isSetToRight = true;

            if (this.props.onChange) {
                this.props.onChange(true, this.props.toggleOnRight);
            }
        }
    };

    private handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.isDisabled !== true && this.props.toggleOnLeft && this.props.toggleOnRight) {
            const isTogglingToRight: boolean = !this.isSetToRight;

            if (isTogglingToRight) {
                this.handleRightClick(e);
            } else {
                this.handleLeftClick(e);
            }
        }
    };
}
