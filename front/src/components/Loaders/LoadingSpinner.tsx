import * as React from 'react';
import * as classNames from 'classnames';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Canvas } from '../../helpers/Canvas';

// Styles
const s = require('./LoadingSpinner.css');

// Props
interface LoadingSpinnerProps {
    className?: string | null;
    color?: string;
    size?: number;
}

// Component
@observer
export class LoadingSpinner extends React.Component<LoadingSpinnerProps, {}> {
    static get defaultProps(): LoadingSpinnerProps {
        return {
            className: null,
            color: '#0768D8',
            size: 64,
        };
    }

    private exists: boolean = true;
    @observable private visible: boolean = false;

    @computed
    private get sizeHalf(): number {
        return typeof this.props.size !== 'undefined' && this.props.size ? this.props.size / 2 : 0;
    }

    @computed
    private get strokeWidth(): number {
        return typeof this.props.size !== 'undefined' && this.props.size ? this.props.size / 10 : 0;
    }

    @computed
    private get arcRadius(): number {
        return this.sizeHalf - this.strokeWidth;
    }

    @computed
    private get arcDescription(): string {
        return Canvas.describeArc(this.sizeHalf, this.sizeHalf, this.arcRadius, -45, 45);
    }

    public componentDidMount() {
        // Show spinner
        setTimeout(() => {
            if (this.exists) {
                this.visible = true;
            }
        }, 128);
    }

    public componentWillUnmount() {
        this.exists = false;
    }

    public render() {
        return (
            <svg
                ref={this.referenceSvgNode}
                className={classNames(s.spinner, this.props.className, {
                    [s.visible]: this.visible,
                })}
                width={this.props.size}
                height={this.props.size}
            >
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke={this.props.color}
                    strokeWidth={this.strokeWidth}
                    d={this.arcDescription}
                />
                <circle
                    cx={this.sizeHalf}
                    cy={this.sizeHalf}
                    r={this.arcRadius}
                    fill="none"
                    stroke={this.props.color}
                    strokeWidth={this.strokeWidth}
                    opacity={0.2}
                />
            </svg>
        );
    }

    private referenceSvgNode = (ref: SVGSVGElement) => (ref);
}
