import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./CardContentBlock.css');

interface Props {
    className?: string;
    classNameForTitle?: string;
    title?: string;
    titleAlign?: 'left' | 'center' | 'right';
    titleFontWeight?: 300 | 400 | 600 | 700;
    titleBackground?: 'default' | 'light';
    titleElements?: JSX.Element;
    noBorderOnTop?: boolean;
    noBorderOnBottom?: boolean;
}

@observer
export class CardContentBlock extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            className: undefined,
            classNameForTitle: undefined,
            title: '',
            titleAlign: 'left',
            titleFontWeight: 600,
            titleBackground: 'default',
            noBorderOnTop: false,
            noBorderOnBottom: false,
        };
    }

    public render() {
        return (
            <div
                className={classNames(
                    s.block,
                    {
                        [s.noTopBorder]: this.props.noBorderOnTop,
                        [s.noBottomBorder]: this.props.noBorderOnBottom,
                    },
                    this.props.className
                )}
            >
                {this.props.title && (
                    <div
                        className={classNames(s.header, {
                            [s.center]: this.props.titleAlign === 'center',
                            [s.right]: this.props.titleAlign === 'right',
                            [s.backgroundLight]: this.props.titleBackground === 'light',
                        })}
                    >
                        <h4
                            className={classNames(s.title, {
                                [s.normal]: this.props.titleFontWeight === 400,
                                [s.bold]: this.props.titleFontWeight === 700,
                                [s.thin]: this.props.titleFontWeight === 300,
                            })}
                        >
                            {this.props.title}
                        </h4>

                        <div>{this.props.titleElements}</div>
                    </div>
                )}

                {this.props.children}
            </div>
        );
    }
}
