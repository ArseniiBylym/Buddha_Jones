import * as React from 'react';
import * as classNames from 'classnames';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

// Styles
const s = require('./LoadingBar.css');

// Types
export type LoadingBarSizePropType = 'default' | 'big';

// Props
interface LoadingBarProps {
    className?: string | null;
    background?: string;
    width?: number;
    height?: number;
    size?: LoadingBarSizePropType;
    opacity?: number;
    progress?: number;
    showProgress?: boolean;
    label?: string | null;
}

// Derived props

// Component
@observer
export class LoadingBar extends React.Component<LoadingBarProps, {}> {
    static get defaultProps(): LoadingBarProps {
        return {
            className: null,
            background: '#EEEAE7',
            width: 0,
            height: 0,
            size: 'default',
            opacity: 0.3,
            progress: 100,
            showProgress: false,
            label: null,
        };
    }

    private exists: boolean = false;

    @observable private visible: boolean = false;

    @computed
    private get formattedLabel(): string {
        return (
            (this.props.label || '') +
            (this.props.showProgress ? (this.props.label ? ' ' : '') : this.props.progress + '%')
        );
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
            <div
                className={classNames(s.container, this.props.className, {
                    [s.visible]: this.visible,
                    [s.sizeBig]: this.props.size === 'big',
                    [s.sizeNormal]: this.props.size === 'default',
                })}
                style={{
                    width:
                        typeof this.props.width === 'number' && this.props.width > 0 ? this.props.width + 'px' : null,
                    background: this.props.background,
                }}
            >
                <div className={s.progress} style={{ width: this.props.progress + '%' }}>
                    <div className={s.bar} style={{ opacity: this.props.opacity }} />
                </div>

                {(this.props.showProgress || this.props.label) && (
                    <div className={s.label}>
                        <p>{this.formattedLabel}</p>
                    </div>
                )}
            </div>
        );
    }
}
