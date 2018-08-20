import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import { get as _get, capitalize as _capitalize } from 'lodash';

// Styles
require('./Button.css');

// Types
export type ButtonOnClickPropType = ((e: React.MouseEvent<HTMLButtonElement>) => void) | null;
export type ButtonFloatPropType = 'left' | 'right' | 'none';
export type ButtonIconSizePropType = 'nopadding' | 'small' | 'large';
export type ButtonIconColorPropType = 'none' | 'none-alt' | 'white' | 'yellow' | 'blue' | 'orange' | 'green';
export type ButtonLabelSizePropType = 'small' | 'large';
export type ButtonLabelColorPropType = 'black' | 'white' | 'white' | 'yellow' | 'blue' | 'orange' | 'green';
export type ButtonTooltipPositionOnPropType = 'left' | 'top' | 'right' | 'bottom';

// Props
export interface ButtonProps {
    onClick?: ButtonOnClickPropType;
    onClickCapture?: ButtonOnClickPropType;
    className?: string | null;
    labelClassName?: string | null;
    float?: ButtonFloatPropType;
    isInBox?: boolean;
    icon?: {
        element: JSX.Element;
        size?: ButtonIconSizePropType;
        background?: ButtonIconColorPropType;
    } | null;
    label?: {
        text: string;
        size?: ButtonLabelSizePropType;
        color?: ButtonLabelColorPropType;
        onLeft?: boolean;
    } | null;
    tooltip?: {
        text: string;
        on?: ButtonTooltipPositionOnPropType;
    } | null;
    disabled?: boolean;
}

// Component
@observer
export class Button extends React.Component<ButtonProps, {}> {
    static get defaultProps(): ButtonProps {
        return {
            onClick: null,
            onClickCapture: null,
            className: null,
            labelClassName: null,
            float: 'none',
            isInBox: false,
            icon: null,
            label: null,
            tooltip: null,
            disabled: false,
        };
    }

    private exists: boolean = true;

    private tooltip: HTMLSpanElement | null = null;

    @observable private showTooltip: boolean = false;
    @observable private animateTooltip: boolean = false;

    @observable
    private tooltipStyle: React.CSSProperties = {
        opacity: 0,
        left: null,
        top: null,
        marginLeft: '0px',
        marginTop: '0px',
    };

    @observable private tooltipClassName: string = '';

    constructor(props: ButtonProps) {
        super(props);

        /** React to tooltip animation */
        reaction(
            () => this.animateTooltip,
            animateIn => {
                const tooltipOn: ButtonTooltipPositionOnPropType = _get(this.props, 'tooltip.on', 'left');
                const isOnTopOrBottom: boolean = ['top', 'bottom'].indexOf(tooltipOn) !== -1;
                const tooltipWidth: number = this.tooltip ? this.tooltip.offsetWidth : 0;
                const tooltipHeight: number = this.tooltip ? this.tooltip.offsetHeight : 0;

                if (animateIn) {
                    this.tooltipClassName =
                        tooltipOn === 'top'
                            ? 'buttonTooltipOntopIn'
                            : tooltipOn === 'bottom'
                                ? 'buttonTooltipOnbottomIn'
                                : tooltipOn === 'right'
                                    ? 'buttonTooltipOnrightIn'
                                    : 'buttonTooltipOnleftIn';
                } else {
                    this.tooltipClassName =
                        tooltipOn === 'top'
                            ? 'buttonTooltipOntopOut'
                            : tooltipOn === 'bottom'
                                ? 'buttonTooltipOnbottomOut'
                                : tooltipOn === 'right'
                                    ? 'buttonTooltipOnrightOut'
                                    : 'buttonTooltipOnleftOut';
                }

                this.tooltipStyle = {
                    opacity: animateIn ? 1 : 0,
                    top: isOnTopOrBottom ? null : '50%',
                    left: isOnTopOrBottom ? '50%' : null,
                    marginTop: isOnTopOrBottom
                        ? null
                        : tooltipHeight
                            ? -(tooltipHeight / 2) + 'px'
                            : this.tooltipStyle.marginTop,
                    marginLeft: isOnTopOrBottom
                        ? tooltipWidth
                            ? -(tooltipWidth / 2) + 'px'
                            : this.tooltipStyle.marginLeft
                        : null,
                };
            }
        );
    }

    public componentWillUnmount() {
        this.exists = false;
    }

    public render() {
        return (
            <button
                className={classNames(
                    'button',
                    {
                        ['float' + _capitalize(this.props.float || '')]: this.props.float !== 'none',
                        ['boxButton']: this.props.isInBox,
                        ['boxColor' +
                        _capitalize(
                            this.props.label && typeof this.props.label.color !== 'undefined'
                                ? this.props.label.color
                                : ''
                        )]:
                            this.props.isInBox && this.props.label && typeof this.props.label.color !== 'undefined',
                    },
                    this.props.className
                )}
                disabled={this.props.disabled}
                onClick={this.handleButtonClick}
                onClickCapture={this.handleButtonClickCapture}
                onMouseEnter={this.handleButtonHover(true)}
                onMouseLeave={this.handleButtonHover(false)}
            >
                {this.props.label &&
                    typeof this.props.label.text !== 'undefined' &&
                    this.props.label.text &&
                    (typeof this.props.label.onLeft === 'undefined' || this.props.label.onLeft === true) &&
                    this.renderLabel()}

                {this.props.icon &&
                    typeof this.props.icon.element !== 'undefined' &&
                    this.props.icon.element && (
                        <span
                            className={classNames('buttonIcon', {
                                ['buttonIcon' +
                                _capitalize(
                                    typeof this.props.icon.size !== 'undefined' ? this.props.icon.size : 'Large'
                                )]: true,
                                ['buttonIconBackground' +
                                _capitalize(
                                    typeof this.props.icon.background !== 'undefined'
                                        ? this.props.icon.background
                                        : 'Orange'
                                )]: true,
                            })}
                        >
                            {this.props.icon.element}
                        </span>
                    )}

                {this.props.label &&
                    typeof this.props.label.text !== 'undefined' &&
                    this.props.label.text &&
                    (typeof this.props.label.onLeft !== 'undefined' && this.props.label.onLeft === false) &&
                    this.renderLabel()}

                {this.props.tooltip &&
                    typeof this.props.tooltip.text !== 'undefined' && (
                        <span
                            ref={this.referenceTooltip}
                            style={{
                                ...this.tooltipStyle,
                                ...{ display: this.showTooltip ? 'block' : 'none' },
                            }}
                            className={classNames(
                                'buttonTooltip',
                                {
                                    ['buttonTooltipOn' +
                                    _capitalize(
                                        typeof this.props.tooltip.on !== 'undefined' ? this.props.tooltip.on : 'Left'
                                    )]: true,
                                },
                                this.tooltipClassName
                            )}
                        >
                            {this.props.tooltip.text}
                        </span>
                    )}
            </button>
        );
    }

    private renderLabel() {
        return (
            typeof this.props.label !== 'undefined' &&
            this.props.label &&
            typeof this.props.label.text !== 'undefined' &&
            this.props.label.text && (
                <span
                    className={classNames('buttonLabel', {
                        ['buttonLabelOn' +
                        (typeof this.props.label.onLeft === 'undefined' ||
                        (typeof this.props.label.onLeft !== 'undefined' && this.props.label.onLeft)
                            ? 'Left'
                            : 'Right')]: true,
                        ['buttonLabel' +
                        _capitalize(typeof this.props.label.color !== 'undefined' ? this.props.label.color : '')]:
                            typeof this.props.label.color !== 'undefined',
                        ['buttonLabel' +
                        _capitalize(typeof this.props.label.size !== 'undefined' ? this.props.label.size : '')]:
                            typeof this.props.label.size !== 'undefined',
                    })}
                >
                    {this.props.label.text}
                </span>
            )
        );
    }

    private referenceTooltip = (ref: HTMLSpanElement) => (this.tooltip = ref);

    private handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(e);
        }
    };

    private handleButtonClickCapture = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClickCapture && !this.props.disabled) {
            this.props.onClickCapture(e);
        }
    };

    private handleButtonHover = (enter: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (enter) {
            this.showTooltip = true;
            setTimeout(() => {
                if (this.exists && this.showTooltip) {
                    this.animateTooltip = true;
                }
            }, 64);
        } else {
            this.animateTooltip = false;
            setTimeout(() => {
                if (this.exists && this.showTooltip && this.animateTooltip === false) {
                    this.showTooltip = false;
                }
            }, 500);
        }
    };
}
