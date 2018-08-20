import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable, reaction } from 'mobx';

// Styles
const s = require('./Tooltip.css');

// Types
interface TooltipPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Props
interface TooltipContentProps {}

// Component
class TooltipContent extends React.Component<TooltipContentProps, {}> {
    public render() {
        return this.props.children;
    }
}

// Props
interface TooltipBoxProps {
    onMouseOver: () => void;
    onMouseOut: () => void;
    hiding: boolean;
    text: string;
    small: boolean;
    position: TooltipPosition;
}

// Component
@observer
class TooltipBox extends React.Component<TooltipBoxProps, {}> {
    @observable private show: boolean = false;
    @observable private dimensions: TooltipPosition | null = null;

    private tooltip: HTMLDivElement | null = null;

    public componentDidMount() {
        // Animate tooltip in after tiny delay
        setTimeout(() => {
            this.show = true;
        }, 16);

        // Get tooltip dimensions
        this.positionTooltip();
    }

    public componentWillReceiveProps(nextProps: TooltipBoxProps) {
        if (this.props.hiding !== nextProps.hiding) {
            this.positionTooltip();
        }
    }

    public render() {
        return this.props.text
            ? ReactDOM.createPortal(
                  <div
                      ref={this.referenceTooltip}
                      onMouseOver={this.handleMouseOver}
                      onMouseOut={this.handleMouseOut}
                      className={classNames(s.tooltip, {
                          [s.show]: this.show,
                          [s.hiding]: this.props.hiding,
                          [s.small]: this.props.small,
                      })}
                      style={
                          this.dimensions === null
                              ? {
                                    textOverflow: 'none',
                                }
                              : {
                                    left: this.dimensions.x + window.scrollX + 'px',
                                    top: this.dimensions.y - this.dimensions.height + window.scrollY + 'px',
                                    width: this.dimensions.width + 'px',
                                    height: this.dimensions.height ? this.dimensions.height + 'px' : undefined,
                                }
                      }
                  >
                      {this.props.text}
                  </div>,
                  document.body
              )
            : null;
    }

    private handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        this.props.onMouseOver();
    };

    private handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
        this.props.onMouseOut();
    };

    private referenceTooltip = (ref: HTMLDivElement) => (this.tooltip = ref);

    private positionTooltip = () => {
        if (this.tooltip) {
            const windowWidth = window.innerWidth;
            const dimensions = this.tooltip.getBoundingClientRect();
            const availableWidth = windowWidth - this.props.position.x;
            const keepOriginalWidth: boolean = availableWidth >= dimensions.width;
            this.dimensions = {
                x: this.props.position.x,
                y: this.props.position.y,
                width: keepOriginalWidth ? dimensions.width : availableWidth,
                height: dimensions.height,
            };
        }
    };
}

// Props
interface TooltipProps {
    text: string;
    isSmall?: boolean;
    forceShow?: boolean;
}

// Component
@observer
export class Tooltip extends React.Component<TooltipProps, {}> {
    @observable private show: boolean = false;
    @observable private hiding: boolean = false;
    @observable
    private position: TooltipPosition = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    private content: TooltipContent | null = null;
    private firstChild: Element | null = null;

    public constructor(props: TooltipProps) {
        super(props);

        reaction(
            () => this.show,
            showTooltip => {
                if (showTooltip) {
                    this.hiding = false;

                    if (this.firstChild) {
                        const rect = this.firstChild.getBoundingClientRect();
                        if (rect) {
                            this.position = {
                                x: rect.left,
                                y: rect.top,
                                width: rect.width,
                                height: rect.height,
                            };
                        }
                    }
                } else {
                    this.hiding = true;

                    setTimeout(() => {
                        this.hiding = false;
                    }, 400);
                }
            }
        );
    }

    public componentDidMount() {
        if (this.content) {
            this.firstChild = ReactDOM.findDOMNode(this.content);
            if (this.firstChild !== null) {
                this.firstChild.addEventListener('mouseover', this.handleShow);
                this.firstChild.addEventListener('mouseout', this.handleHide);
            }
        }
    }

    public componentWillReceiveProps(nextProps: TooltipProps) {
        this.show = typeof nextProps.forceShow !== 'undefined' && nextProps.forceShow ? nextProps.forceShow : this.show;
    }

    public componentWillUnmount() {
        if (this.content && this.firstChild) {
            this.firstChild.removeEventListener('mouseover', this.handleShow);
            this.firstChild.removeEventListener('mouseout', this.handleHide);
        }
    }

    public render() {
        return (
            <React.Fragment>
                <TooltipContent ref={this.referenceContent}>{this.props.children}</TooltipContent>

                {(this.show || this.hiding) && (
                    <TooltipBox
                        onMouseOver={this.handleShow}
                        onMouseOut={this.handleHide}
                        hiding={this.hiding}
                        position={this.position}
                        text={this.props.text}
                        small={typeof this.props.isSmall !== 'undefined' ? this.props.isSmall : false}
                    />
                )}
            </React.Fragment>
        );
    }

    private referenceContent = (ref: TooltipContent) => (this.content = ref);

    private handleShow = () => {
        this.show = true;
        this.hiding = false;
    };

    private handleHide = () => {
        this.show = false;
    };
}
