import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { debounce as _debounce, truncate as _truncuate } from 'lodash';
import { IconDropdownArrow, IconDropdownArrowYellow } from '../Icons';

// Styles
require('./DropdownContainer.css');

// Types
export type DropdownContainerAlignProp = 'left' | 'center' | 'right' | 'default';
export type DropdownContainerTypeProp = 'oneline' | 'twolines' | 'field';

// Props
interface DropdownContainerProps {
    className?: string | null;
    hide?: boolean;
    onOpenChange?: (() => void) | null;
    onMaxHeightChange?: ((maxHeight: number) => void) | null;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxLabelOnlyWidth?: number;
    maxHeight?: number;
    overflowAuto?: boolean;
    align?: DropdownContainerAlignProp;
    type?: DropdownContainerTypeProp;
    isWhite?: boolean;
    label: string;
    value?: string;
    truncuateValueTo?: number;
}

@observer
export class DropdownContainer extends React.Component<DropdownContainerProps, {}> {
    static get defaultProps(): DropdownContainerProps {
        return {
            className: null,
            hide: false,
            onOpenChange: null,
            onMaxHeightChange: null,
            minWidth: 0,
            minHeight: 0,
            maxWidth: 0,
            maxLabelOnlyWidth: 0,
            maxHeight: 0,
            overflowAuto: false,
            align: 'left',
            type: 'oneline',
            isWhite: false,
            label: '',
            value: '',
            truncuateValueTo: 0,
        };
    }

    public dropdownLabel: HTMLDivElement | null = null;

    @observable public isOpen: boolean = false;
    @observable private positionOnTop: boolean = false;
    @observable private positionMarginLeft: number = 0;
    @observable private positionMarginTop: number = 0;
    @observable private maxHeight: number = 440;

    @computed
    private get selectionText(): string {
        let selectionText = '';
        if (typeof this.props.value !== 'undefined' && this.props.value !== null && this.props.value) {
            selectionText =
                typeof this.props.truncuateValueTo !== 'undefined' && this.props.truncuateValueTo > 0
                    ? _truncuate(this.props.value, {
                          length: this.props.truncuateValueTo,
                          omission: '...',
                      })
                    : this.props.value || '';
        }
        return selectionText;
    }

    private openEvents: { type: string; handler: EventListenerOrEventListenerObject }[] = [];

    public closeDropdown = () => {
        // Change state to closed
        this.isOpen = false;
        this.positionMarginLeft = 0;
        this.positionMarginTop = 0;

        // Remove events associated with open dropdown
        this.removeOpenEvents();
    };

    @action
    public positionAndResizeDropdown = () => {
        if (this.dropdownLabel) {
            // Get window dimensions
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            // Get label dimensions
            const labelPosition = this.dropdownLabel.getBoundingClientRect();
            const labelWidth = this.dropdownLabel.offsetWidth;
            const labelHeight = this.dropdownLabel.offsetHeight;

            // Determine dropdown width
            const dropdownWidth = labelWidth > 192 ? labelWidth : 192;

            // Determine top or bottom position
            let positionOnTop = windowHeight * 0.8 < labelPosition.top;

            // Check if content will fit
            if (this.props.minHeight) {
                if (positionOnTop) {
                    if (labelPosition.top < this.props.minHeight) {
                        positionOnTop = false;
                    }
                } else {
                    if (windowHeight - labelPosition.bottom < this.props.minHeight) {
                        positionOnTop = true;
                    }
                }
            }

            // Determine left margin
            let positionMarginLeft = 0;
            if (typeof this.props.align && this.props.align && labelWidth < dropdownWidth) {
                switch (this.props.align) {
                    case 'right':
                        positionMarginLeft = -(dropdownWidth - labelWidth);
                        break;

                    case 'center':
                        positionMarginLeft = -((dropdownWidth - labelWidth) / 2);
                        break;

                    default:
                        break;
                }
            }

            // Check edge case for left margin position
            const rightDropdownEdgePosition = labelPosition.left + dropdownWidth + positionMarginLeft;
            if (windowWidth < rightDropdownEdgePosition) {
                positionMarginLeft = positionMarginLeft - (rightDropdownEdgePosition - windowWidth);
            }

            // Determine top margin
            let positionMarginTop = 0;
            if (positionOnTop === true) {
                positionMarginTop = -labelHeight - 8;
            } else {
                positionMarginTop = labelHeight + 8;
            }

            // Calculate max height
            let maxHeight =
                typeof this.props.maxHeight !== 'undefined' && this.props.maxHeight ? this.props.maxHeight : 0;
            if (positionOnTop) {
                const maxHeightOnTop = labelPosition.top + positionMarginTop - 12;
                if (maxHeightOnTop < maxHeight || maxHeight === 0) {
                    maxHeight = maxHeightOnTop;
                }
            } else {
                const maxHeightOnBottom = windowHeight - (labelPosition.top + positionMarginTop + 12);
                if (maxHeightOnBottom < maxHeight || maxHeight === 0) {
                    maxHeight = maxHeightOnBottom;
                }
            }

            // Check if maxHeight has changed
            if (this.props.onMaxHeightChange && this.maxHeight !== maxHeight) {
                this.props.onMaxHeightChange(maxHeight);
            }

            // Set open state
            this.isOpen = true;
            this.positionOnTop = positionOnTop;
            this.positionMarginLeft = positionMarginLeft;
            this.positionMarginTop = positionMarginTop;
            this.maxHeight = maxHeight;
        }
    };

    public componentDidMount() {
        this.windowResizeDebounced = _debounce(this.windowResizeDebounced, 256);
    }

    public componentWillUnmount() {
        this.removeOpenEvents();
    }

    public render() {
        return (
            <div
                className={classNames('dropdown', this.props.className, this.props.align, this.props.type, {
                    open: this.isOpen,
                    white: this.props.isWhite,
                })}
                style={{
                    maxWidth:
                        typeof this.props.maxLabelOnlyWidth !== 'undefined' && this.props.maxLabelOnlyWidth > 0
                            ? this.props.maxLabelOnlyWidth + 'px'
                            : typeof this.props.maxWidth !== 'undefined' && this.props.maxWidth > 0
                                ? this.props.maxWidth + 'px'
                                : undefined,
                    margin: this.props.align === 'center' ? '0 auto' : undefined,
                    marginLeft: this.props.align === 'right' ? 'auto' : undefined,
                    marginRight: this.props.align === 'left' ? 'auto' : undefined,
                    display: this.props.hide ? 'none' : undefined,
                }}
            >
                <div
                    ref={this.referenceDropdownLabel}
                    className={classNames('dropdownLabel', this.props.align)}
                    onClick={this.handleLabelClick}
                >
                    <p>
                        {this.props.label && <span>{this.props.label}</span>}
                        {this.selectionText && <strong>{this.selectionText}</strong>}
                    </p>
                    <div className="dropdownIcon">
                        {(this.props.isWhite && <IconDropdownArrowYellow width={11} height={8} />) || (
                            <IconDropdownArrow width={11} height={8} />
                        )}
                    </div>
                </div>

                {typeof this.props.children !== 'undefined' &&
                    this.props.children && (
                        <div
                            className={classNames('dropdownGroup', {
                                top: this.positionOnTop,
                            })}
                            style={{
                                marginLeft: this.positionMarginLeft !== 0 ? this.positionMarginLeft + 'px' : undefined,
                                marginTop: this.positionMarginTop !== 0 ? this.positionMarginTop + 'px' : undefined,
                                maxWidth:
                                    typeof this.props.maxWidth !== 'undefined' && this.props.maxWidth > 0
                                        ? this.props.maxWidth + 'px'
                                        : undefined,
                                minWidth:
                                    typeof this.props.minWidth !== 'undefined' && this.props.minWidth > 0
                                        ? this.props.minWidth + 'px'
                                        : undefined,
                                maxHeight: this.maxHeight + 'px',
                                overflow: this.props.overflowAuto ? 'auto' : undefined,
                            }}
                            onClick={this.handleDropdownGroupClick}
                        >
                            {this.isOpen && this.props.children}
                        </div>
                    )}
            </div>
        );
    }

    private referenceDropdownLabel = (ref: HTMLDivElement) => (this.dropdownLabel = ref);

    private handleLabelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.addOpenEvents();
            this.positionAndResizeDropdown();
        }
    };

    private handleDropdownGroupClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    private addOpenEvents = () => {
        // Create window click event
        const windowClick = this.windowClicked.bind(this);
        this.openEvents.push({ type: 'click', handler: windowClick });
        window.addEventListener('click', windowClick, false);

        // Create window key up event
        const windowKeyUp = this.windowKeyedUp.bind(this);
        this.openEvents.push({ type: 'keyup', handler: windowKeyUp });
        window.addEventListener('keyup', windowKeyUp, false);

        // Create window resize event
        const windowResize = this.windowResize.bind(this);
        this.openEvents.push({ type: 'resize', handler: windowResize });
        window.addEventListener('resize', windowResize, false);
    };

    private removeOpenEvents = () => {
        // Remove window events
        this.openEvents.map(evt => {
            window.removeEventListener(evt.type, evt.handler);
        });
    };

    private windowClicked = () => {
        this.closeDropdown();
    };

    private windowKeyedUp = (e: React.KeyboardEvent<Window>) => {
        // Base behavior on the logged key
        switch (e.keyCode) {
            // ESC key
            case 27:
                this.closeDropdown();
                break;
            default:
                break;
        }
    };

    private windowResize = (e: React.UIEvent<Window>) => {
        this.positionAndResizeDropdown();
    };

    private windowResizeDebounced = (e: React.UIEvent<Window>) => {
        this.positionAndResizeDropdown();
    };
}
