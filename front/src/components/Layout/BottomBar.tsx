import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';

// Styles
const s = require('./BottomBar.css');

// Props
interface BottomBarProps {
    className?: string;
    classNameInner?: string;
    classNameHeader?: string;
    isWholeWidth?: boolean;
    show?: boolean;
    showHeader?: boolean;
    header?: JSX.Element;
}

// Component
@observer
export class BottomBar extends React.Component<BottomBarProps, {}> {
    static get defaultProps(): BottomBarProps {
        return {
            className: undefined,
            classNameInner: undefined,
            classNameHeader: undefined,
            isWholeWidth: false,
            show: true,
            showHeader: true,
            header: undefined,
        };
    }

    public render() {
        return (
            <div className={classNames(s.wrapper, { [s.wholeWidth]: this.props.isWholeWidth }, this.props.className)}>
                <AnimateHeight className={s.sidebarPusher} height={this.props.show ? 'auto' : 0}>
                    <div className={s.container}>
                        {this.props.header && (
                            <AnimateHeight height={this.props.showHeader ? 'auto' : 0}>
                                <div className={classNames(s.header, this.props.classNameHeader)}>
                                    {this.props.header}
                                </div>
                            </AnimateHeight>
                        )}

                        <div className={classNames(s.inner, this.props.classNameInner)}>{this.props.children}</div>
                    </div>
                </AnimateHeight>
            </div>
        );
    }
}
