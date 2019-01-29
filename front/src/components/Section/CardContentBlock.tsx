import * as classNames from 'classnames';
import { ButtonExpand } from 'components/Button';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';

const s = require('./CardContentBlock.css');

interface Props {
    className?: string;
    classNameForTitle?: string;
    classNameForContent?: string;
    title?: string;
    titleAlign?: 'left' | 'center' | 'right';
    titleFontWeight?: 300 | 400 | 600 | 700;
    titleBackground?: 'default' | 'light';
    titleElements?: JSX.Element;
    isExpandable?: boolean;
    noBorderOnTop?: boolean;
    noBorderOnBottom?: boolean;
}

@observer
export class CardContentBlock extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            className: undefined,
            classNameForTitle: undefined,
            classNameForContent: undefined,
            title: '',
            titleAlign: 'left',
            titleFontWeight: 600,
            titleBackground: 'default',
            isExpandable: false,
            noBorderOnTop: false,
            noBorderOnBottom: false,
        };
    }

    @observable private isExpanded: boolean = !this.props.isExpandable;

    public render() {
        return (
            <div
                className={classNames(
                    s.block,
                    {
                        [s.noTopBorder]: this.props.noBorderOnTop,
                        [s.noBottomBorder]: this.props.noBorderOnBottom,
                        [s.isExpandable]: this.props.isExpandable,
                        [s.isExpanded]: this.isExpanded,
                    },
                    this.props.className
                )}
            >
                {this.props.title && (
                    <div
                        className={classNames(
                            s.header,
                            {
                                [s.center]: this.props.titleAlign === 'center',
                                [s.right]: this.props.titleAlign === 'right',
                                [s.backgroundLight]: this.props.titleBackground === 'light',
                            },
                            this.props.classNameForTitle
                        )}
                    >
                        <ButtonExpand
                            className={classNames(s.title, {
                                [s.normal]: this.props.titleFontWeight === 400,
                                [s.bold]: this.props.titleFontWeight === 700,
                                [s.thin]: this.props.titleFontWeight === 300,
                            })}
                            onToggle={this.props.isExpandable ? this.handleToggleExpansion : undefined}
                            isExpanded={this.props.isExpandable && this.isExpanded ? true : false}
                            title={this.props.title}
                        />

                        <div className={s.titleElements}>{this.props.titleElements}</div>
                    </div>
                )}

                <AnimateHeight
                    className={classNames(this.props.classNameForContent)}
                    height={this.isExpanded ? 'auto' : 0}
                >
                    {this.props.children}
                </AnimateHeight>
            </div>
        );
    }

    @action
    private handleToggleExpansion = (isExpanded: boolean) => {
        this.isExpanded = isExpanded;
    };
}
