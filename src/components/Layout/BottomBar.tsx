import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import AnimateHeight from 'react-animate-height';

// Styles
const s = require('./BottomBar.css');

// Props
interface BottomBarProps {
    className?: string;
    classNameInner?: string;
    isWholeWidth?: boolean;
    show?: boolean;
}

// Component
@observer
export class BottomBar extends React.Component<BottomBarProps, {}> {
    static get defaultProps(): BottomBarProps {
        return {
            className: undefined,
            classNameInner: undefined,
            isWholeWidth: false,
            show: true,
        };
    }

    public render() {
        return (
            <div className={classNames(s.wrapper, { [s.wholeWidth]: this.props.isWholeWidth }, this.props.className)}>
                <AnimateHeight className={s.sidebarPusher} height={this.props.show ? 'auto' : 0}>
                    <div className={s.container}>
                        <div className={classNames(s.inner, this.props.classNameInner)}>{this.props.children}</div>
                    </div>
                </AnimateHeight>
            </div>
        );
    }
}
